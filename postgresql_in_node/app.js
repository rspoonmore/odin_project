require('dotenv').config();

const express = require("express");
const app = express();
const path = require('node:path');
const router = require('./routes/router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use('/', router);

app.get("/{*splat}", (req, res) => res.send("This is the catch-all page."))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});