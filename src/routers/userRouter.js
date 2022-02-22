import express from "express";
import { myProfile, getEdit, postEdit } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.route(`/edit-profile`).get(getEdit).post(postEdit);
userRouter.get(`/my-profile`, myProfile);

export default userRouter;
