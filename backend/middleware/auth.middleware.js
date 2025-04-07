import User from "../models/user.model.js";
import errorHandler from "./errorHandler.js";
import jwt from 'jsonwebtoken'

//! auth middleware
export const authMiddleware = async (req,res,next)=>{
    const token =req.cookies.jwt;
    if(!token){
        return errorHandler(res,400,"user not autorized")
    }
    
    const decode =   jwt.verify( token,process.env.JWT_SECRET)
    if(!decode){
        return errorHandler(res,400,"jwt not verify")
    }
    const isUser=await User.findById(decode.userId)
    if(!isUser){
        return errorHandler(res,404,"token not valid userid")
    }
    // console.log(isUser)
    req.user=isUser
    next()
}