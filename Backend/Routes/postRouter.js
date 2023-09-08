const {Router} = require('express');
const { createPost, getAllPosts, getOnePost, updatePost, deletePost } = require('../Controllers/postController');
const { verifyToken } = require('../Middleware/verifyToken');


const postRouter =Router();

postRouter.post('/',verifyToken,createPost)
postRouter.get('/',getAllPosts)
postRouter.get('/:postID',getOnePost)
postRouter.put('/:postID',updatePost)
postRouter.delete('/:postID',deletePost)

module.exports={
    postRouter
}