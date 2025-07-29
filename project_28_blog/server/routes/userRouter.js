const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/login", userController.usersGet);
userRouter.post('/logout', userController.usersLogOutPost);
userRouter.post('/', userController.usersPost);
userRouter.put('/:userid', userController.usersPut);
userRouter.delete('/:userid', userController.usersDelete);

module.exports = userRouter; 