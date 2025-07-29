const db = require('../db/queries');
const jwt = require('jsonwebtoken');
const authenticator = require('../passport/authenticator.js');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// const strategy = require('../passport/jwtStrategy.js')

// passport.use('jwt', strategy);

async function postsGet(req, res) {
    res.json({
        action: 'get',
        body: req.body
    })
}

async function postsPut(req, res) {
    res.json({
        action: 'put',
        body: req.body
    })
}

async function postsPost(req, res) {
    try {
        const { title, text } = req.body;
        const cookieSearchJson = authenticator.getUserIDFromCookie(req);
        if (!cookieSearchJson.success || !cookieSearchJson.userid) {
            return res.json(cookieSearchJson)
        }
        const userid = cookieSearchJson.userid;
        // Post new Blog Post
        db.postCreate({userid, title, text, createDate: new Date()})
        return res.json({
            success: true,
            message: 'Post Created!'
        })
    } catch (error) {
        console.log(error)
    }
}

async function postsDelete(req, res) {
    res.json({
        action: 'delete',
        body: req.body
    })
}

module.exports = {
    postsGet,
    postsPut,
    postsPost,
    postsDelete
}

