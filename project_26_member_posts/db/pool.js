const { Pool } = require("pg");
require('dotenv').config();

// module.exports = new Pool({
//   host: process.env.host,
//   user: process.env.user,
//   database: "p26",
//   password: process.env.password,
//   port: process.env.sqlport || 5432 // 5432 is the default port
// });

module.exports = new Pool({
  connectionString: process.env.RENDERSTRING
})
