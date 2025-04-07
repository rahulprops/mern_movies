import express from 'express'
import 'dotenv/config.js'
import db from './config/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './routers/user.routers.js';


const app=express()
const port=process.env.PORT || 3000;

//! moiddlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//! api 
app.use("/api/v1/user",userRouter)

//! server start
app.listen(port,()=>{
    console.log(` server is running on http://localhost:${port}`)
    db()
})