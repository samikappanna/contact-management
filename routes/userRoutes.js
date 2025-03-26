import express from "express";
import { Router } from "express";
import {registerUser,loginUser,currentUser} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const userRouter = Router();

userRouter.post("/register",registerUser );

userRouter.post("/login",loginUser )

userRouter.get("/current",validateToken,currentUser )

export default userRouter;

