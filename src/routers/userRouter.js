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
import {
  publicOnlyMiddleware,
  privateMiddleware,
  socialLoginMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter
  .route(`/edit-profile`)
  .all(privateMiddleware)
  .get(getEdit)
  .post(postEdit);
userRouter.get(`/my-profile`, privateMiddleware, myProfile);
userRouter
  .route(`/edit-profile/change-password`)
  .all(privateMiddleware, socialLoginMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get(`/github/start`, publicOnlyMiddleware, startGithubLogin);
userRouter.get(`/github/callback`, publicOnlyMiddleware, finishGithubLogin);

export default userRouter;
