const { Router } = require("express");
const postController = require("../controllers/postController");
const postRouter = Router();

postRouter.get("/", postController.postsGet);
postRouter.post('/', postController.postsPost);
postRouter.put('/', postController.postsPut);
postRouter.delete('/', postController.postsDelete);

module.exports = postRouter; 