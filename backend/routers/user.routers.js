import express from 'express'
import { allUsers, createUser, getCurrentUsersProfile, loginUser, logoutUser } from '../controller/user.controller.js';
import { authMiddleware, isAdmin } from '../middleware/auth.middleware.js';
const userRouter=express.Router()

userRouter.post("/create",createUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout",logoutUser)
userRouter.get("/",authMiddleware,isAdmin,allUsers)
userRouter.get("/profile",authMiddleware,getCurrentUsersProfile)

export default userRouter;