import express from "express";
import {
  seeProfile,
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
  avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter
  .route(`/edit-profile`)
  .all(privateMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route(`/edit-profile/change-password`)
  .all(privateMiddleware, socialLoginMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get(`/github/start`, publicOnlyMiddleware, startGithubLogin);
userRouter.get(`/github/callback`, publicOnlyMiddleware, finishGithubLogin);
userRouter.get(`/:id/profile`, seeProfile);

export default userRouter;
