import express from 'express'
import 'dotenv/config.js'
import db from './config/db.js';


const app=express()
const port=process.env.PORT || 3000;

//! server start
app.listen(port,()=>{
    console.log(` server is running on http://localhost:${port}`)
    db()
})