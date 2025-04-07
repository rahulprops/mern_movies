import errorHandler from "../middleware/errorHandler.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/createToken.js";
 export const createUser=async (req,res)=>{
    const {username,email,password}=req.body;
       
    if(!username || !email || !password ){
        return errorHandler(res,404,"all feilds requed")
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