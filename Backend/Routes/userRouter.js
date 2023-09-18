const {Router} = require('express')
const { regUser, userLogin, updateUser, followUser, unfollowUser, getAllUsers, getAllFollows, checkUser, getOneUser, suggestedFollowers, followers } = require('../Controllers/authController')
const { verifyToken } = require('../Middleware/verifyToken')

const userRouter = Router()

userRouter.post('/', regUser)
userRouter.post('/login',userLogin)
// userRouter.get('/:userID',verifyToken,getOneUser)
userRouter.get('/', getAllUsers)

userRouter.get('/check',verifyToken, checkUser)
userRouter.put('/:userID',verifyToken, updateUser)
userRouter.post('/follow',followUser)
userRouter.post('/unfollow',unfollowUser)
userRouter.get('/follows', getAllFollows)
userRouter.get('/follows/:userID', suggestedFollowers)
userRouter.get('/follow/:userID', followers)



module.exports = {
    userRouter
}