const db = require('../db/queries');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const strategy = require('../passport/jwtStrategy.js')
const authenticator = require('../passport/authenticator.js');

passport.use('jwt', strategy);

const cookieOptions = {
	maxAge: 1000 * 60 * 60 * 24 * 30,
	httpOnly: false,
	secure: false,
	// sameSite: 'none',
    // 'Access-Control-Allow-Credentials': true
}

async function usersLogin(req, res) {
    const { email, password } = req.body;
    let user = null;
    // If email and password provided
    if(email) {
        user = await db.userLogin(email.toLowerCase());
        if (!user) {
            return res.json({
                success: false,
                message: `An account with email: "${email.toLowerCase()}" does not exist. Please register your account.`
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.json({
                success: false,
                message: 'The password does not match'
            });
        }
        const jwtToken = jwt.sign({ userid: user.userid}, process.env.PASSPORT_SESSION_SECRET);
        res.cookie('jwt', jwtToken, cookieOptions)
    } else {
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if (cookieSearchJson.success && cookieSearchJson.userid) {
            user = await db.userRead(cookieSearchJson.userid);
        }
    }
    if(!user) {
        return res.json({
            success: false,
            message: 'User not found'
        })
    }
    return res.json({
        success: true,
        message: 'User logged in!',
        user: user
    })
    // res.set("Set-Cookie", `jwt=${jwtToken}`)
    // res.set("Access-Control-Allow-Credentials", "true")
    // return res.json({
    //     success: true,
    //     message: 'User logged in!',
    //     user: user
    // })
}

async function usersPut(req, res) {
    try {
        const params = req.params;
        const userid = Number(params.userid);
        const { email, firstName, lastName, adminCode } = req.body;
        const admin = adminCode === process.env.ADMIN_CODE;

        const existingUser = await db.userRead(userid);
        // Does user exist
        if(!existingUser) {
            return res.json({
                success: false,
                message: 'User does not exist',
                userid: userid
            });
        };
        // Is the requesting user the same or an admin
        let reqAllowed = false;
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if (cookieSearchJson.success && cookieSearchJson.userid) {
            const requestingUser = await db.userRead(cookieSearchJson.userid);
            if(requestingUser && requestingUser.userid == existingUser.userid) {
                reqAllowed = true;
            }
            else if(requestingUser && requestingUser.admin) {
                reqAllowed = true;
            }
        }
        if(!reqAllowed) {
            return res.json({
                success: false,
                message: 'The user requesting the update is not an admin and does not match the user being updated.'
            })
        }
        // Update user
        const user = await db.userUpdate({userid, email, firstName, lastName, admin})
        if(!user) {
            res.json({
                success: false,
                message: 'User does not exist',
                userid: userid
            })
        } else {
            res.json({
                success: true,
                message: 'User Updated!',
                user: user
            })
        }
    } catch (error) {
        console.log(error)
    }
}

async function usersPost(req, res) {
    try {
        const { email, firstName, lastName, password, adminCode } = req.body;
        const admin = adminCode === process.env.ADMIN_CODE;
        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
        const user = await db.userCreate({email, firstName, lastName, admin, password: hashedPassword})
        if(!user) {
            res.json({
                success: false,
                message: `An account for ${email} already exists.`,
                email: email
            })
        } else {
            res.json({
                success: true,
                message: 'User registered!',
                user: user
            })
        }
    } catch (error) {
        console.log(error)
    }
}

async function usersLogOutPost(req, res) {
    res.clearCookie('jwt', cookieOptions);
    res.json({
        success: true,
        message: 'User logged out'
    })
}

async function usersDelete(req, res) {
    const {userid} = req.params;
    // Is the requesting user the same or an admin
    let reqAllowed = false;
    const cookieSearchJson = authenticator.getUserIDFromCookie(req);
    if (cookieSearchJson.success && cookieSearchJson.userid) {
        const requestingUser = await db.userRead(cookieSearchJson.userid);
        if(requestingUser && requestingUser.userid == userid) {
            reqAllowed = true;
        }
        else if(requestingUser && requestingUser.admin) {
            reqAllowed = true;
        }
    }
    if(!reqAllowed) {
        return res.json({
            success: false,
            message: 'The user requesting the delete is not an admin and does not match the user being deleted.'
        })
    }
    try {
        await db.userDelete(userid);
        await db.postByUserDelete({userid});
        return res.json({
            success: true,
            message: `User ${userid} deleted`
        })
    } catch(error) {
        console.log(error)
    }
}

async function usersGetAll(req, res) {
    try {
        let admin = false;
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if (cookieSearchJson.success && cookieSearchJson.userid) {
            const requestingUser = await db.userRead(cookieSearchJson.userid);
            if(requestingUser && requestingUser.admin) {
                
                admin = true;
            }
        }

        const users = await db.userAllRead();
        if(!users) {
            return res.json({
                success: false,
                message: 'Users not found'
            });
        };
        const filteredUsers = users.map(user => {
            let filteredJSON = {};
            filteredJSON['userid'] = user.userid;
            filteredJSON['email'] = user.email;
            filteredJSON['firstname'] = user.firstname;
            filteredJSON['lastname'] = user.lastname;
            filteredJSON['admin'] = user.admin;

            return filteredJSON;
        })
        return res.json({
            success: true,
            message: 'Users found',
            users: admin ? users : filteredUsers
        });
    } catch(error) {
        console.log(error)
    };
}

async function usersGet(req, res) {
    try {
        const params = req.params;
        const userid = Number(params.userid);
        const existingUser = await db.userRead(userid);
        // Does user exist
        if(!existingUser) {
            return res.json({
                success: false,
                message: 'User does not exist',
                userid: userid
            });
        };
        // Is the requesting user the same or an admin
        let reqAllowed = false;
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if (cookieSearchJson.success && cookieSearchJson.userid) {
            const requestingUser = await db.userRead(cookieSearchJson.userid);
            if(requestingUser && requestingUser.userid == existingUser.userid) {
                reqAllowed = true;
            }
            else if(requestingUser && requestingUser.admin) {
                reqAllowed = true;
            }
        }
        if(!reqAllowed) {
            return res.json({
                success: false,
                message: 'The requesting user is not an admin and does not match the user being requested.'
            })
        }
        // Return user
        const user = await db.userRead(userid)
        if(!user) {
            res.json({
                success: false,
                message: 'User does not exist',
                userid: userid
            })
        } else {
            res.json({
                success: true,
                message: 'User found!',
                user: user
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    usersLogin,
    usersPut,
    usersPost,
    usersDelete,
    usersLogOutPost,
    usersGetAll,
    usersGet
}

