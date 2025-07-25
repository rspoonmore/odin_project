const db = require('../db/queries');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {decryptUserID} = require('../public/scripts/scripts')



const validateUser = [
    body('email').trim()
        .isLength({ min: 1, max: 255 }).withMessage('email must be between 1 and 255 characters'),
    body("firstName").trim()
        .isAlpha().withMessage(`First Name must only contain letters`)
        .isLength({ min: 1, max: 255 }).withMessage(`First Name must be between 1 and 255 characters`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last Name must only contain letters`)
        .isLength({ min: 1, max: 255 }).withMessage(`Last Name must be between 1 and 255 characters`)
];

async function postsAllGet(req, res) {
    const posts = await db.postsAllRead();
    res.render('index', {
        title: 'Posts',
        posts: posts
    });
};

async function userSignUpGet(req, res) {
    res.render('user-sign-up', {title: 'Sign Up a New User'});
}

async function userSignUpPostFunc(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("user-sign-up", {
            title: "Sign Up a New User",
            errors: errors.array(),
            });
        }
        const { email, firstName, lastName, password } = req.body;
        const admin = 'admin' in req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.userCreate({email, firstName, lastName, membership: false, admin: admin, password: hashedPassword})

        userLogInPost(req, res, next);

        // res.redirect("/");
    } catch(error) {
        console.error(error);
        next(error);
    }
}

const userSignUpPost = [
    validateUser,
    userSignUpPostFunc
];

async function userLogInGet(req, res) {
    res.render('log-in', {title: 'Please Log In'});
}

async function userLogInPost(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in'
    })(req, res, next);
} 

function userLogOutGet(req, res, next) {
    req.logout( (error) => {
        if (error) {
            return next(error);
        }
        res.redirect('/');
    })
};

async function verifyUser(email, password, done) {
    try {
        const user = await db.userLogin(email.toLowerCase());
        if (!user) {
            // user not found
            return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        // const match = password == user.password;
        if (!match) {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
    } catch(err) {
        return done(err);
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email', // If your form uses 'email' instead of 'username'
        passwordField: 'password'
    }, verifyUser)
);

passport.serializeUser((user, done) => {
    done(null, user.email.toLowerCase());
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await db.userLogin(email.toLowerCase());
        done(null, user);
    } catch(err) {
        done(err);
    }
});

async function userMembershipPost(req, res) {
    const {password} = req.body;
    const {userid} = req.params;
    if (password == process.env.secretcode) {
        db.userJoin(Number(userid));
    }
    res.redirect("/");
}


async function createPostGet(req, res) {
    res.render('create-post', {title: 'Create a New Post'});
}

const validatePost = [
    body('title').trim()
        .isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters.'),
    body('text').trim()
        .isLength({ min: 1 }).withMessage('Please put something in the post itself.')
];

async function createPostPostFunc(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("create-post", {
            title: "Create a New Post",
            errors: errors.array(),
            });
        }
        const { userid, title, text } = req.body;
        const createDate = new Date();
        await db.postCreate({userid, title, text, createDate})
        
        res.redirect("/");
    } catch(error) {
        console.error(error);
        next(error);
    }
}

const createPostPost = [
    validatePost,
    createPostPostFunc
];

async function deletePostPost(req, res) {
    try {
        const { postid, encrypteduserid } = req.query;
        const userid = decryptUserID(encrypteduserid);
        const user = await db.userRead({userid});
        if(user.admin) {
            await db.postDelete({postid})
        }
        res.redirect("/");
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    postsAllGet,
    userSignUpGet,
    userSignUpPost,
    userLogInGet,
    userLogInPost,
    userLogOutGet,
    userMembershipPost,
    createPostGet,
    createPostPost,
    deletePostPost
}