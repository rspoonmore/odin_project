const db = require('../db/queries');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const strategy = require('../passport/jwtStrategy.js')

passport.use('jwt', strategy);

const cookieOptions = {
	maxAge: 1000 * 60 * 60 * 24 * 30,
	// httpOnly: true,
	secure: true,
	sameSite: 'none',
}

async function usersGet(req, res) {
    const { email, password } = req.body;
    const user = await db.userLogin(email.toLowerCase());
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
    return res.json({
        success: true,
        message: 'User logged in!',
        user: user
    })
}

async function usersPut(req, res) {
    try {
        const params = req.params;
        const userid = Number(params.userid);
        const { email, firstName, lastName, password, adminCode } = req.body;
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
        // Does password match
        const match = await bcrypt.compare(password, existingUser.password);
        if(!match) {
            return res.json({
                success: false,
                message: 'The password does not match'
            });
        };
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
                message: 'User already exists!',
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
    res.json({
        message: 'Still need to implement this'
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersLogOutPost
}

