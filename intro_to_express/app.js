require('dotenv').config();
const express = require("express");
const app = express();
const messageRouter = require('./routes/messagesRouter');

console.log(process.env.PORT)

app.get("/", (req, res) => res.send("Hello, world!"));
app.use('/messages', messageRouter);

app.get("/{*splat}", (req, res) => res.send("This is the catch-all page."))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
