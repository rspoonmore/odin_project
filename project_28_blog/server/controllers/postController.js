const db = require('../db/queries');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

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
    res.json({
        action: 'post',
        body: req.body
    })
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

