const express = require("express");
const path = require('path');
require('dotenv').config();
const session = require("express-session");
const passport = require("passport");
const {encryptUserID, decryptUserID} = require('./public/scripts/scripts.js');


const app = express();
const mainRouter = require("./routes/routes");

// Setup for reading html and CSS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// Setup for Passport
app.use(session({ secret: process.env.sessionSecret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Pass currentUser to each view
app.use((req, res, next) => {
    if(req.user) {
        res.locals.currentUser = {...req.user, 'encryptedUserID': encryptUserID(req.user.userid)};
    }
    else {
        res.locals.currentUser = req.user;
    }
    next();
});

app.use("/", mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));