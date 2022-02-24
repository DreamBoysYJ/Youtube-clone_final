import express from "express";
import {
  myProfile,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.route(`/edit-profile`).get(getEdit).post(postEdit);
userRouter.get(`/my-profile`, myProfile);
userRouter
  .route(`/edit-profile/change-password`)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get(`/github/start`, startGithubLogin);
userRouter.get(`/github/callback`, finishGithubLogin);

export default userRouter;
