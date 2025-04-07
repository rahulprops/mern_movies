import errorHandler from "../middleware/errorHandler.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/createToken.js";
import validator from 'validator'
//! create user
 export const createUser=async (req,res)=>{
    const {username,email,password}=req.body;
       
    if(!username || !email || !password ){
        return errorHandler(res,404,"all feilds requed")
    }
    if(!validator.isEmail(email)){
        return errorHandler(res,400,"please enter valid email")
    }
    
    try {
        const  isUser =  await User.findOne({email})
    if(isUser){
        return errorHandler(res,400,"user already exists")
    }

    // hash password
    const hashPassword= await bcrypt.hash(password,12)
    const user=new User({
        username,
        email,
        password:hashPassword
    })
    if(user){
             await user.save()
          const token= generateToken(res,user._id)
          console.log( token)
             return errorHandler(res,201,"create user",user) 
    }else{
        return errorHandler(res,400,"user create failed")
    }
        
    } catch (err) {
        return  errorHandler(res,500,`server error ${err.message}`)
    }
}
//! login user
 export const loginUser =async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password ){
        return errorHandler(res,400,"all feilds required")
    }
    if(!validator.isEmail(email)){
        return errorHandler(res,400,"please enter valid email")
    }
    try {
        const isUser=await User.findOne({email})
        if(!isUser) return errorHandler(res,404,"this email not fonund user")
        
        //! check password
        const isPassword=await bcrypt.compare(password,isUser.password)
        if(isPassword){
            generateToken(res,isUser._id)
            const message={
                id:isUser._id,
                name:isUser.username,
                email:isUser.email,
                isAdmin:isUser.isAdmin,
            }
            return errorHandler(res,200,"login sucessful",message)
        }else{
            return errorHandler(res,400,"please enter valid password")
        }
    } catch (err) {
        return errorHandler(res,500,`server error ${err.message}`)
    }
 }
 //!logout user
 export const logoutUser=async (req,res)=>{
    try {
         res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
         })
         return errorHandler(res,200,"logout sucessful")
    } catch (err) {
        return errorHandler(res,500,`server error ${err.message}`)
    }
 }
 //! ALL USERS
 export const allUsers=async (req,res)=>{
    try {
        const users=await User.find({})
        if(users){
            return errorHandler(res,200,"get all users",users)
        }else{
            return errorHandler(res,400,"users not found")
        }
        
    } catch (err) {
        return errorHandler(res,500,`server error ${err.message}`)
    }
 }