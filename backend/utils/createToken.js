import jwt from 'jsonwebtoken'

const generateToken= async ( res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT,{expiresIn:"2d"})

    //set token HTTP-Only cookies
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
      });
    return token;

}
export default generateToken;