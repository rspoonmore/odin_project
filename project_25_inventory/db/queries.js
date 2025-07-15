const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM inventory");
  return rows;
}

async function getItem({category, item_desc}) {
  const { rows } = await pool.query("SELECT * FROM inventory WHERE category = $1 and item_desc = $2 order by category, id;", [category, item_desc]);
  return rows;
}

async function getItemByID(id) {
  const { rows } = await pool.query("SELECT * FROM inventory WHERE id = $1;", [id]);
  return rows;
}

async function insertItem({category, item_desc, quantity=0}) {
  await pool.query("INSERT INTO inventory (category, item_desc, quantity) VALUES ($1, $2, $3);", [category, item_desc, quantity]);
}

async function deleteItem({category, item_desc}) {
    await pool.query("DELETE FROM inventory WHERE category = $1 and item_desc = $2;", [category, item_desc])
}

async function deleteItemByID(id) {
    await pool.query("DELETE FROM inventory WHERE id = $1;", [id]);
}

async function updateItemByID({id, category, item_desc, quantity=0}) {
    await pool.query("UPDATE inventory SET category = $1, item_desc = $2, quantity = $3 WHERE id = $4;", [category, item_desc, quantity, id])
}

module.exports = {
  getAllItems,
  getItem,
  getItemByID,
  insertItem,
  deleteItem,
  deleteItemByID,
  updateItemByID
};
