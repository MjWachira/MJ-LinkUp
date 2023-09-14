const {Router} = require('express')
const { regUser, userLogin, updateUser, followUser, unfollowUser, getAllUsers, getAllFollows, checkUser } = require('../Controllers/authController')
const { verifyToken } = require('../Middleware/verifyToken')

const userRouter = Router()

userRouter.post('/', regUser)
userRouter.post('/login',userLogin)
userRouter.get('/', getAllUsers)
userRouter.get('/check',verifyToken, checkUser)
userRouter.put('/:userID',verifyToken, updateUser)
userRouter.post('/follow',verifyToken,followUser)
userRouter.post('/unfollow',verifyToken,unfollowUser)
userRouter.get('/follows', getAllFollows)


module.exports = {
    userRouter
}