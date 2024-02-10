import express from "express";
import {
  createUser,
  logOut,
  loginUser,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/auth/registration", createUser);
userRouter.post("/auth/login", loginUser);
userRouter.get("/auth/logout", logOut);
