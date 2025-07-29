const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/", userController.usersGet);
userRouter.post('/', userController.usersPost);
userRouter.put('/', userController.usersPut);
userRouter.delete('/', userController.usersDelete);

module.exports = userRouter; 