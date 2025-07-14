const { Router } = require('express');
const controller = require('../controllers/topUserController');

const userRouter = Router();

userRouter.get('/', controller.getUsernames)

module.exports = userRouter;

