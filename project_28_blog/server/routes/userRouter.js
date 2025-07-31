const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get('/', userController.usersGetAll);
userRouter.post('/', userController.usersPost);
userRouter.post("/login", userController.usersLogin);
userRouter.post('/logout', userController.usersLogOutPost);
userRouter.put('/:userid', userController.usersPut);
userRouter.delete('/:userid', userController.usersDelete);


module.exports = userRouter; 