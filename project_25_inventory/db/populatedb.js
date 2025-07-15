const { Client } = require("pg");
require('dotenv').config();

const SQL = `
DROP TABLE IF EXISTS inventory;
CREATE TABLE inventory (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR ( 255 ),
    item_desc VARCHAR ( 255 ),
    quantity int
);

INSERT INTO inventory (category, item_desc, quantity)
VALUES
    ('Produce', 'Lettuce', 10),
    ('Produce', 'Tomato', 25),
    ('Produce', 'Avocado', 5),
    ('Produce', 'Watermelon', 2),
    ('Dairy', 'String Cheese', 12),
    ('Dairy', 'Skim Milk', 20),
    ('Dairy', '2% Milk', 20),
    ('Dairy', 'Cottage Cheese', 5),
    ('Dairy', 'Chocolate Milk', 15)
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.user}:${process.env.user}@localhost:${process.env.sqlport || 5432}/p25`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
