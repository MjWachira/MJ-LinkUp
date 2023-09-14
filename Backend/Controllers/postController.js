const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');


class Post{
    constructor(postID,postDescription,postImage, userID, dateCreated){
        this.postID=postID,
        this.postDescription=postDescription, 
        this.postImage=postImage,
        this.userID= userID, 
        this.dateCreated=dateCreated
    }
}

const createPost = async (req, res)=>{
    try {
        const {postDescription,postImage, userID, dateCreated} = req.body
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('postDescription', mssql.VarChar, postDescription)
        .input('postImage', mssql.VarChar, postImage)
        .input('userID', mssql.VarChar, userID)
        .input('dateCreated', mssql.Date, dateCreated)
        .execute('createPost')
        console.log(result)

        if(result.rowsAffected[0] == 1){
        return res.json({
            message: "post created Successfully",
        
        })  
        }else{
            return res.json({message: "creation failed"})
        }   

    } catch(error){
        return res.json({error})
    }
}
const getAllPosts = async(req, res)=>{
    try{
        const pool = await (mssql.connect(sqlConfig))
        const allPosts = (await pool.request().execute('getAllPosts')).recordset
        res.json({posts: allPosts})

    }catch(error){
        return res.json({error})
    }
}
const getOnePost = async(req, res)=>{
    try{
        const postID = req.params.postID
        const pool = await mssql.connect(sqlConfig)
        const post = (await pool.request().input('postID', postID).execute('getOnePost')).recordset
        res.json({
            post:post
        })
    }catch(error){
        return res.json({error})
    }
}
const updatePost = async(req, res)=>{
    try {
        const postID = req.params.postID
        const {postDescription,postImage} = req.body
        const pool = await mssql.connect(sqlConfig)
        const result = (await pool.request()
        .input('postID',mssql.Int,postID)
        .input('postDescription', mssql.VarChar, postDescription)
        .input('postImage', mssql.VarChar, postImage)
        .execute('updatePost'));
        console.log(result);

        console.log(result);
        if(result.rowsAffected == 1){
            res.json({
                message: 'post updated successfully'
            })
        }else{
            res.json({
                message: 'post not found'
            })
        }
    } catch (error) {
        return res.json({Error: error.message})
    }
}
const deletePost =async(req, res)=>{
    try{

        const postID = req.params.postID
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('postID', postID)
        .execute('deletePost')
        console.log(result)
        if(result.rowsAffected [1]== 1){
            res.json({
                    message: 'post deleted successfully'
            })
        }else{
            res.json({
                message: 'post not found'
        })
        }
        
    }catch(error){
        return res.json({Error:error})
    }
}
const likePost =async(req, res)=>{
    try {
        const {postID, userID} = req.body;
        console.log("like inside")
        
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('postID',mssql.Int, postID)
        .input('userID',mssql.Int, userID)
        .execute('LikePost')


        console.log(result)

        if(result.rowsAffected==1){
            return res.status(200).json({
                message: "post liked"})
        }else{
            return res.status(200).json({message: "already liked"})
        }
    } catch (error) {
        
    }
}
const unlikePost =async(req, res)=>{
    try {
        const {likeID} = req.body;
        console.log("like inside")
        
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('likeID',mssql.Int, likeID)
        .execute('Unlike')
        console.log("like inside")

        if(result.rowsAffected==1){
            return res.status(200).json({message: "post unliked"})
        }else{
            return res.status(200).json({message: "could not unlike post"})
        }
    } catch (error) {
        
    }
}


module.exports={
    createPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost,
    likePost,
    unlikePost
}