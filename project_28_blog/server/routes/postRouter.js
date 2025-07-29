const { Router } = require("express");
const postController = require("../controllers/postController");
const postRouter = Router();

postRouter.get("/:postid", postController.postsGet);
postRouter.post('/', postController.postsPost);
postRouter.put('/:postid', postController.postsPut);
postRouter.delete('/:postid', postController.postsDelete);

module.exports = postRouter; 