const { Pool } = require("pg");
require('dotenv').config();

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: process.env.user,
  database: "p25",
  password: process.env.password,
  port: process.env.sqlport || 5432 // 5432 is the default port
});
