const {Router} = require('express')
const { regUser, userLogin } = require('../Controllers/authController')

const userRouter = Router()

userRouter.post('/', regUser)
userRouter.post('/login',userLogin)

module.exports = {
    userRouter
}