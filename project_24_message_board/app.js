require('dotenv').config();
const {getMessages, addMessageFromForm, getMessageByID} = require('./controllers/messageController')

const express = require("express");
const app = express();
const path = require('node:path');
const messageRouter = require('./routes/router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.get("/", (req, res) => {
    res.render('index', {messages: getMessages()})
});

app.get('/new', (req, res) => {
    res.render('form')
});

app.post('/new', (req, res) => {
    addMessageFromForm(req.body)
    res.redirect('/')
})

app.use('/messages', messageRouter);

app.get("/{*splat}", (req, res) => res.send("This is the catch-all page."))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});