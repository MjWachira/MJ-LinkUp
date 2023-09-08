const {Router} = require('express');
const { addComment, getAllComments, getOneComment, editComment, deleteComment } = require('../Controllers/commentsController');

const commentRouter = Router();

commentRouter.post('/',addComment)
commentRouter.get('/',getAllComments)
commentRouter.get('/:id',getOneComment)
commentRouter.put('/:id',editComment)
commentRouter.delete('/:id', deleteComment)


module.exports={
    commentRouter
}