const express= require('express');
const { postRouter } = require('./Routes/postRouter');


const app=express()

app.use(express.json())
app.use('/post',postRouter)


app.use((err, req, res, next)=>{
    res.json({error:err})
})
const port=4200;
app.listen(port,()=>{
    console.log('server running on port '+ port)
});