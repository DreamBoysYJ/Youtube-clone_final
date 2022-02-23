import express from "express";
import {
  myProfile,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.route(`/edit-profile`).get(getEdit).post(postEdit);
userRouter.get(`/my-profile`, myProfile);
userRouter
  .route(`/edit-profile/change-password`)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
