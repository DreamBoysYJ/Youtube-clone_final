import express from "express";
import { logout, edit } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get(`/logout`, logout);
userRouter.get(`/edit`, edit);

export default userRouter;
