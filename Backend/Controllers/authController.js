const mssql  = require("mssql");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sqlConfig } = require("../Config/config");
const dotenv=require('dotenv');
const { loginSchema } = require("../Validators/userValidators");
dotenv.config();


const regUser = async(req,res)=>{
    try {
        const {fullname,profpic, username, email, password} = req.body
        console.log(password);
        const hashedPwd = await bcrypt.hash(password, 4);

        const pool = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('fullname', mssql.VarChar, fullname)
        .input('profPic', mssql.NVarChar(mssql.MAX), profpic)
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('Password', mssql.VarChar, hashedPwd)
        .execute('registerUser')

        if(out.rowsAffected==1){
            return res.status(200).json({message: "User registered successfully"})
        }
    } catch (error) {
        console.log(error);
        if (error.message.includes("UNIQUE KEY")) {
            return res.status(400).json({ message: "Email or username already exists" });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
}
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;


        const pool = await mssql.connect(sqlConfig);
        const user = (await pool
            .request()
            .input('username', mssql.VarChar, username)
            .execute('userLogin')).recordset[0];

        console.log(user); 

        if (!user) {
            return res.status(400).json({
                message: 'user not found', 
            });
        }
        const hashedPwd = user.Password;
        if(user){
            const comparePwd = await bcrypt.compare(password, hashedPwd);
            console.log(comparePwd); 
            if (comparePwd) {
                const {Password, ...payload} = user

                const token = jwt.sign(payload, process.env.SECRET, { 
                    expiresIn: '3600s' })
                return res.status(200).json({
                    message: 'Logged in',
                    token
                });
                } else {
                    return res.status(400).json({
                        message: 'incorrect password',
                });
            }
        }
                
    } catch (error) {
        console.error('Error:', error); 
        return res.status(500).json({ error: error.message });
    }
};
const checkUser = async(req, res)=>{
    if(req.info){
        res.json({
            info:req.info
            // name:req.info.e_name,
            // email: req.info.email,
            // role: req.info.role
        })
    }
}

const updateUser = async (req , res )=>{
    try {
        const userID = req.params.userID
        const {fullname, coverpic,profpic, email, password} = req.body
        console.log(password);
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password, 4);

        const pool = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('userID', mssql.Int, userID)
        .input('fullname', mssql.NVarChar(255), fullname)
        .input('coverPic', mssql.NVarChar(mssql.MAX), coverpic)
        .input('profPic', mssql.NVarChar(mssql.MAX), profpic)
        .input('email', mssql.NVarChar(100), email)
        .input('password', mssql.NVarChar(255), hashedPwd)
        .execute('UpdateUserProfile')
        console.log(out)
        if(out.rowsAffected==1){
            return res.status(200).json({message: "User updated successfully"})
        }
        else{
            return res.status(200).json({message: "User not updated"})
        }
    } catch (error) {
        if(error.message.includes("UNIQUE KEY")){
            return res.status(400).json({error: "email already in use"})
        }
        return res.json({error:error.message })   
    }
}

const followUser = async(req ,res)=>{
    try {

        const {FollowUserID, FollowedUserID} = req.body;
        console.log("follow inside")
        
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('FollowUserID',mssql.Int, FollowUserID)
        .input('FollowedUserID',mssql.Int, FollowedUserID)
        .execute('FollowUser')
        
        console.log("follow proc")

        if(result.rowsAffected==1){
            return res.status(200).json({message: "followed user"})
        }
        
    } catch (error) {
        return res.json({error:error.message })
    }
}

const unfollowUser = async(req ,res)=>{
    try {

        const {FollowerUserID, FollowedUserID} = req.body;
        console.log("follow inside")
        
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('FollowerUserID',mssql.Int, FollowerUserID)
        .input('FollowedUserID',mssql.Int, FollowedUserID)
        .execute('UnfollowUser')

        if(result.rowsAffected==1){
            return res.status(200).json({message: "unfollowed user"})
        }
        else{
            return res.status(200).json({message: "no such user"})
        }
        
    } catch (error) {
        return res.json({error:error.message })
    }
}
const getAllUsers = async (req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))
        const allUsers = (await pool.request().execute('getAllUsers')).recordset
        res.json({allUsers: allUsers})
    } catch (error) {
        return res.json({error})
    }
}
const getOneUser = async (req, res) => {

try {
    const userID = req.params.userID
        const pool = await mssql.connect(sqlConfig)
        const users = (await pool.request().input('userID', userID).execute('getOneUser')).recordset
        res.json({
            users:users
        })
    
} catch (error) {
    return res.json(error)
    
}

}

const getAllFollows = async (req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))
        const allUser = (await pool.request().execute('getAllFollows')).recordset
        res.json({allUser: allUser})
    } catch (error) {
        return res.json({error:error.message})
    }
}
const suggestedFollowers = async (req, res) => {

    try {
        const userID = req.params.userID
            const pool = await mssql.connect(sqlConfig)
            const users = (await pool.request().input('userID', userID)
            .execute('ShowUsersNotFollowingMe')).recordset
            res.json({
                users:users
            })
        
    } catch (error) {
        return res.json(error)
        
    }
    
}

const followers = async (req, res) => {

    try {
        const userID = req.params.userID
            const pool = await mssql.connect(sqlConfig)
            const users = (await pool.request()
            .input('FollowedUserID', userID)
            .execute('ShowFollowers')).recordset
            res.json({
                users:users
            })
        
    } catch (error) {
        return res.json(error)
        
    }
    
}

module.exports = {
    regUser,
    userLogin,
    updateUser,
    followUser,
    unfollowUser,
    getAllUsers,
    getOneUser,
    getAllFollows,
    checkUser,
    suggestedFollowers,
    followers
}