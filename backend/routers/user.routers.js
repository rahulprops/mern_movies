import express from 'express'
import { createUser, loginUser, logoutUser } from '../controller/user.controller.js';
const userRouter=express.Router()

userRouter.post("/create",createUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout",logoutUser)

export default userRouter;