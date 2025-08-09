const { Router } = require("express");
const postController = require("../controllers/postController");
const { post } = require("./userRouter");
const postRouter = Router();

postRouter.get('/', postController.postsGetAll);
postRouter.get("/:postid", postController.postsGet);
postRouter.post('/:postid/like', postController.postsLikeByUser)
postRouter.post('/:postid/unlike', postController.postsUnlikeByUser)
postRouter.post('/', postController.postsPost);
postRouter.put('/:postid', postController.postsPut);
postRouter.delete('/:postid', postController.postsDelete);

module.exports = postRouter; 