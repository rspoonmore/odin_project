const db = require('../db/queries');
const jwt = require('jsonwebtoken');
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
        // Read JWT cookie from header
        const cookies = req.headers.cookie
        if(!cookies) {
            return res.json({
                success: false,
                message: 'No cookies were found in the header'
            })
        }
        let token = undefined;
        if(typeof cookies == 'string') {
            token = cookies.slice(4)
        } else if('jwt' in cookies) {
            token = cookies['jwt']
        } else {
            return res.json({
                success: false,
                message: 'No JWT cookie was found'
            })
        }
        // const { jwt: token } = req.headers.cookie;
        const decodedToken = jwt.decode(token);
        // Get UserID from cookie
        const { userid } = decodedToken;
        if(!userid) {
            return res.json({
                success: false,
                message: 'User was not found from the cookie of the request to create post'
            })
        }
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

