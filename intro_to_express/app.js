require('dotenv').config();
const express = require("express");
const app = express();
const messageRouter = require('./routes/messagesRouter');
const path = require('node:path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

const links = [
    {href: "/", text: 'Home'},
    {href: '/messages', text: 'Messages'}
];

const users = ['Ryan', 'Carson', 'Rio'];

app.get("/", (req, res) => {
    res.render('index', {users: users, links: links})
});
app.use('/messages', messageRouter);

app.get("/{*splat}", (req, res) => res.send("This is the catch-all page."))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});