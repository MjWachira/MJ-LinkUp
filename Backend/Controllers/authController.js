const mssql  = require("mssql");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sqlConfig } = require("../Config/config");
const dotenv=require('dotenv');
const { loginSchema } = require("../Validators/userValidators");
dotenv.config();

const regUser = async(req,res)=>{
    try {
        const {fullname, username, email, password} = req.body
        console.log(password);
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password, 4);

        const pool = await mssql.connect(sqlConfig)
        const out = await pool.request()
        .input('fullname', mssql.VarChar, fullname)
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
            return res.status(500).json({ error: error });
        }
    }
}
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // const error = loginSchema.valid(req.body)
        // if(error){
        //     return res.status(422).json(error.details)
        // }

        const pool = await mssql.connect(sqlConfig);
        const user = (await pool
            .request()
            .input('username', mssql.VarChar, username)
            .execute('userLogin')).recordset[0];

        console.log(user); 

        if (!user) {
            return res.status(400).json({
                message: 'User not found', 
            });
        }
        const hashedPwd = user.Password;
        if(user){
            const comparePwd = await bcrypt.compare(password, hashedPwd);
            console.log(comparePwd); 
            if (comparePwd) {
                const {password , ...payload}=user
                const token = jwt.sign(payload, process.env.SECRET, { 
                    expiresIn: '3600s' })
                return res.status(200).json({
                    message: 'Logged in',
                    token,
                });
                } else {
                    return res.status(400).json({
                        message: 'Incorrect password',
                });
            }
        }
                
    } catch (error) {
        console.error('Error:', error); 
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    regUser,
    userLogin
}