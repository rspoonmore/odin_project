const JwtStrategy = require('passport-jwt').Strategy;
const db = require('../db/queries')

function cookieExtractor(req) {
    if (req && req.cookies) {
        const { jwt } = req.cookies;
        return jwt;
    }
}

const strategyOptions = {
    secretOrKey: process.env.PASSPORT_SESSION_SECRET,
    jwtFromRequest: cookieExtractor

}

async function verify(jwt_payload, done) {
    try {
        const { userid } = jwt_payload;
        const user = await db.userRead(userid);

        if(!user) {
            return done(null, false);
        } 
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    } catch (error) {
        return done(error);
    }
}

module.exporst = {strategy: new JwtStrategy(strategyOptions, verify)};