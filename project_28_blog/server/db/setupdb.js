const { Client } = require("pg");
require('dotenv').config();

const setupSQL = `
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    userid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR ( 255 ),
    firstName VARCHAR ( 255 ),
    lastName VARCHAR ( 255 ),
    admin BOOL,
    password VARCHAR ( 255 )
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    postid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userid INTEGER,
    title VARCHAR ( 255 ),
    text VARCHAR ( 100000 ),
    createDate DATE
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.RENDERSTRING
  });
  await client.connect();
  await client.query(setupSQL);
  await client.end();
  console.log("done");
}

main();