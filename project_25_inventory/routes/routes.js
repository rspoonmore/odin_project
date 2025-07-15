const { Router } = require("express");
const controller = require("../controllers/controller");
const mainRouter = Router();

mainRouter.get("/", controller.itemsListGet);
mainRouter.get("/create", controller.itemCreateGet);
mainRouter.post("/create", controller.itemCreatePost);
mainRouter.get("/:id/update", controller.itemUpdateGet);
mainRouter.post("/:id/update", controller.itemUpdatePost);
mainRouter.post("/:id/delete", controller.itemDeletePost);


module.exports = mainRouter;
