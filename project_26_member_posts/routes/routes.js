const { Router } = require("express");
const controller = require("../controllers/controller");
const mainRouter = Router();

mainRouter.get("/", controller.postsAllGet);


// User Routes
mainRouter.get('/create-user', controller.userSignUpGet);
mainRouter.post('/create-user', controller.userSignUpPost);
mainRouter.get('/log-in', controller.userLogInGet);
mainRouter.post('/log-in', controller.userLogInPost);
mainRouter.get('/log-out', controller.userLogOutGet);
mainRouter.post('/:userid/join', controller.userMembershipPost);

// Post Routes
mainRouter.get('/create-post', controller.createPostGet);
mainRouter.post('/create-post', controller.createPostPost);
mainRouter.post('/delete', controller.deletePostPost);

/*
mainRouter.get('/:userid/update')
mainRouter.post('/:userid/update')
mainRouter.post('/:userid/delete')


mainRouter.get('/:post-id/update')
mainRouter.post('/:post-id/update')


*/


module.exports = mainRouter;