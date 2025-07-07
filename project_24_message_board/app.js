require('dotenv').config();
const express = require("express");
const app = express();
const router = require('./routes/router');
// const messageRouter = require('./routes/messagesRouter');
const path = require('node:path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.get("/", (req, res) => {
    res.render('index', {messages: messages})
});
// app.use('/new', router);

app.get('/new', (req, res) => {
    res.render('form')
});

app.post('/new', (req, res) => {
    messages.push({
        text: req.body.message,
        user: req.body.user,
        added: new Date()
    })

    res.redirect('/')
})

app.get("/{*splat}", (req, res) => res.send("This is the catch-all page."))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});