const db = require('../db/queries');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

async function usersGet(req, res) {
    res.json({
        action: 'get',
        body: req.body,
        host: req.headers.origin
    })
}

async function usersPut(req, res) {
    res.json({
        action: 'put',
        body: req.body
    })
}

async function usersPost(req, res) {
    res.json({
        action: 'post',
        body: req.body
    })
}

async function usersDelete(req, res) {
    res.json({
        action: 'delete',
        body: req.body
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}

