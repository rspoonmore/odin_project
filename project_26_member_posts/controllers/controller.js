const db = require('../db/queries');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



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
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.userCreate({email, firstName, lastName, membership: false, admin: false, password: hashedPassword})

        res.redirect("/");
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
        const user = await db.userLogin(email);
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
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await db.userLogin(email);
        done(null, user);
    } catch(err) {
        done(err);
    }
});


module.exports = {
    postsAllGet,
    userSignUpGet,
    userSignUpPost,
    userLogInGet,
    userLogInPost,
    userLogOutGet
}