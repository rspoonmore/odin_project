const express = require("express");
const path = require('path');
require('dotenv').config();
const session = require("express-session");
const passport = require("passport");


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
  res.locals.currentUser = req.user;
  next();
});


app.use("/", mainRouter);


// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');
// const db = require('./db/queries');

// app.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/create-user",

//   })
// );

// async function verify(email, password, done) {
//     alert(message = `${email}, ${password}`);
//     try {
//         const user = await db.userLogin(email);
//         if (!user) {
//             // user not found
//             return done(null, false, { message: "Incorrect username" });
//         }
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             // passwords do not match!
//             return done(null, false, { message: "Incorrect password" })
//         }
//         return done(null, user);
//     } catch(err) {
//         return done(err);
//     }
// }

// passport.use(
//     new LocalStrategy(verify)
// );

// passport.serializeUser((user, done) => {
//     done(null, user.email);
// });

// passport.deserializeUser(async (email, done) => {
//     try {
//         const user = await db.userLogin(email);
//         done(null, user);
//     } catch(err) {
//         done(err);
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));