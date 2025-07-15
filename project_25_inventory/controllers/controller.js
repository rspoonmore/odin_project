const db = require('../db/queries');
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 200 characters.";
const numErr = "must be a number";

const validateItem = [
    body("category").trim()
        .isAlpha().withMessage(`Category ${alphaErr}`)
        .isLength({ min: 1, max: 200 }).withMessage(`Category ${lengthErr}`),
    body("item_desc").trim()
        .isLength({ min: 1, max: 200 }).withMessage(`Item Description ${lengthErr}`),
    body('quantity').trim()
        .isNumeric().withMessage(`Quantity ${numErr}`)
];

async function itemsListGet(req, res) {
    const items = await db.getAllItems();
    let groupedItems = {}
    items.forEach(item => {
        const itemInfo = {'id': item.id, 'item_desc': item.item_desc, 'quantity': item.quantity};
        if(item.category in groupedItems) {
            groupedItems[item.category].push(itemInfo)
        }
        else {
            groupedItems[item.category] = [itemInfo]
        }
    })
    res.render("index", {
        title: "Item list",
        items: groupedItems,
    });
};

async function itemCreateGet(req, res) {
  res.render("createItem", {
    title: "Create Item",
  });
};

async function itemCreatePostFunc(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("createItem", {
        title: "Create Item",
        errors: errors.array(),
        });
    }
    const { category, item_desc, quantity } = req.body;
    await db.insertItem({ category, item_desc, quantity });
    res.redirect("/");
}

const itemCreatePost = [
    validateItem,
    itemCreatePostFunc
];

async function itemUpdateGet(req, res) {
    const item = await db.getItemByID(req.params.id);
    res.render("updateItem", {
        title: "Update Item",
        item: item,
    });
};

async function itemUpdatePostFunc(req, res) {
    const id = req.params.id;
    const item = await db.getItemByID(rid);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("updateItem", {
        title: "Update Item",
        item: item,
        errors: errors.array(),
        });
    }
    const { updatedCategory, updatedItem_desc, quantity } = req.body;
    await db.updateItemByID({id, updatedCategory, updatedItem_desc, quantity})
    res.redirect("/");
}

const itemUpdatePost = [
    validateItem,
    itemUpdatePostFunc
];

// Tell the server to delete a matching item, if any. Otherwise, respond with an error.
async function itemDeletePost(req, res) {
    await db.deleteItemByID(req.params.id);
    res.redirect("/");
};


module.exports = {
    itemsListGet,
    itemCreateGet,
    itemCreatePost,
    itemUpdateGet,
    itemUpdatePost,
    itemDeletePost
}