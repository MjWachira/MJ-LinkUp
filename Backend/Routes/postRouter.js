const {Router} = require('express');
const { createPost, getAllPosts, getOnePost, updatePost, deletePost } = require('../Controllers/postController');


const postRouter =Router();

postRouter.post('/',createPost)
postRouter.get('/',getAllPosts)
postRouter.get('/:postID',getOnePost)
postRouter.put('/:id',updatePost)
postRouter.delete('/:id',deletePost)

module.exports={
    postRouter
}