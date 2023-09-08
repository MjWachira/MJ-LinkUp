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
        const {postID} = req.params
        const {postDescription,postImage, userID, dateCreated} = req.body
        const pool = await mssql.connect(sqlConfig)
        const result = (await pool.request()
        .input('postID',postID)
        .input('postDescription', mssql.VarChar, postDescription)
        .input('postImage', mssql.VarChar, postImage)
        // .input('userID', mssql.VarChar, userID)
        // .input('dateCreated', mssql.Date, dateCreated)
        .execute('UpdatePost'));

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
        return res.json({Error: error})
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
        if(result.rowsAffected == 1){
            res.json({
                    message: 'Post deleted successfully'
            })
        }else{
            res.json({
                message: 'Post not found'
        })
        }
        
    }catch(error){
        return res.json({Error:error})
    }
}

module.exports={
    createPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost
}