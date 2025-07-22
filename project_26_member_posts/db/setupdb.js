const { Client } = require("pg");
require('dotenv').config();

const setupSQL = `
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    userid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR ( 255 ),
    firstName VARCHAR ( 255 ),
    lastName VARCHAR ( 255 ),
    membership BOOL,
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

const populateSQL = `
INSERT INTO users (email, firstName, lastName, membership, admin, password)
VALUES
    ('test@test.com', 'Testy', 'McGee', TRUE, FALSE, 'password')
;

INSERT INTO posts (userid, title, text, createDate)
VALUES
    (1, 'Test Title', 'This message was generated as a test of the system', DATE('2025/07/22'))
;
`;

async function main({populate = true}) {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.user}:${process.env.user}@${process.env.host || 'localhost'}:${process.env.sqlport || 5432}/p26`,
  });
  await client.connect();
  await client.query(setupSQL);
  if (populate) {
    await client.query(populateSQL);
  }
  await client.end();
  console.log("done");
}

main({populate: true});
