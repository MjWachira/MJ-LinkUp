const {Router} = require('express');
const { createPost, getAllPosts, getOnePost, updatePost, deletePost, likePost, unlikePost, getOneUserPost, getOneUserPosts } = require('../Controllers/postController');
const { verifyToken } = require('../Middleware/verifyToken');


const postRouter =Router();

postRouter.post('/',createPost)
postRouter.get('/',getAllPosts)
postRouter.get('/:postID',getOnePost)
postRouter.get('/user/:userID',getOneUserPosts)
postRouter.put('/:postID',verifyToken,updatePost)
postRouter.delete('/:postID',deletePost)
postRouter.post('/like',verifyToken,likePost)
postRouter.delete('/unlike/:likeID',verifyToken,unlikePost)

module.exports={
    postRouter
}