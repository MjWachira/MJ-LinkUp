const {Router} = require('express');
const { addComment, getAllComments, getOneComment, editComment, deleteComment } = require('../Controllers/commentsController');
const { verifyToken } = require('../Middleware/verifyToken');

const commentRouter = Router();

commentRouter.post('/',addComment)
commentRouter.get('/',getAllComments)
commentRouter.get('/:commentID',getOneComment)
commentRouter.put('/:commentID',verifyToken,editComment)
commentRouter.delete('/:commentID',deleteComment)


module.exports={
    commentRouter
}