const express = require("express");
require('dotenv').config();
const app = express();
const mainRouter = require("./routes/routes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
