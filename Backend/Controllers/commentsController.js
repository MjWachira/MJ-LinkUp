const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');


const addComment = async (req, res)=>{
    try {
        const {commentDescription,postID, userID, dateCreated} = req.body
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('commentDescription', mssql.VarChar, commentDescription)
        .input('postID', mssql.VarChar, postID)
        .input('userID', mssql.VarChar, userID)
        .input('dateCreated', mssql.Date, dateCreated)
        .execute('addcomment')
        console.log(result);


        if(result.rowsAffected[0] == 1){
        return res.json({
            message: "comment added Successfully",
        
        })  
        }else{
            return res.json({message: "comment not added"})
        }   

    } catch(error){
        return res.json({error})
    }
}
const getAllComments = async (req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))
        const allComments = (await pool.request().execute('getAllComments')).recordset
        res.json({allComments: allComments})
    } catch (error) {
        return res.json({error})
    }
}
const getOnePostComments = async (req, res)=>{
    try {
        const postID = req.params.postID
        const pool = await mssql.connect(sqlConfig)
        const comments = (await pool.request()
        .input('postID', postID)
        .execute('getCommentsForPost')).recordset
        res.json({
            comments:comments
        })
    } catch (error) {
        return res.json({error})
    }
}
const getOneComment = async (req, res)=>{
    try {
        const commentID = req.params.commentID
        const pool = await mssql.connect(sqlConfig)
        const comment = (await pool.request()
        .input('commentID', commentID)
        .execute('getOneComment')).recordset
        res.json({
            comment:comment
        })
    } catch (error) {
        return res.json({error})
    }
}
const editComment = async (req, res)=>{
    try {
        const commentID = req.params.commentID
        const {commentDescription} = req.body
        const pool = await mssql.connect(sqlConfig)
        const result = (await pool.request()
        .input('commentID',mssql.Int,commentID)
        .input('commentDescription', mssql.VarChar, commentDescription)
        .execute('UpdateComment'));
        console.log(result);

        console.log(result);
        if(result.rowsAffected == 1){
            res.json({
                message: 'comment updated successfully'
            })
        }else{
            res.json({
                message: 'comment not found'
            })
        }
        
    } catch (error) {
        return res.json({error:error.message})
    }
}
const deleteComment = async (req, res)=>{
    try {
        const commentID = req.params.commentID
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('commentID', commentID)
        .execute('deleteComment')
        console.log(result)
        if(result.rowsAffected == 1){
            res.json({
                    message: 'comment deleted successfully'
            })
        }else{
            res.json({
                message: 'comment not found'
        })
        }
        
    } catch (error) {
        return res.json({error})
    }
}

module.exports={
    addComment,
    getAllComments,
    getOnePostComments,
    getOneComment,
    editComment,
    deleteComment
}