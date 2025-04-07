import mongoose from "mongoose";

const db = async ()=>{
    try {
        
        const db= await mongoose.connect(process.env.DB)
    if(db){
        console.log("database connect sucessful")
    }else{
        console.log("database connect failed")
    }
    } catch (err) {
        throw new Error(err.message)
    }
}
export default db;