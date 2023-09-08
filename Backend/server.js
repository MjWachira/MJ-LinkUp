const express= require('express');
const { postRouter } = require('./Routes/postRouter');
const { userRouter } = require('./Routes/userRouter');
const { commentRouter } = require('./Routes/commentRouter');


const app=express()

app.use(express.json())
app.use('/post',postRouter)
app.use('/user', userRouter)
app.use('/comment',commentRouter)

app.use((err, req, res, next)=>{
    res.json({error:err})
})
const port=4200;
app.listen(port,()=>{
    console.log('server running on port '+ port)
});