import express from "express";
import {
  postLogin,
  getLogin,
  getJoin,
  postJoin,
  logout,
} from "../controllers/userControllers";
import { search, home } from "../controllers/videoControllers";
import { avatarUpload } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(`/logout`, logout);
globalRouter.route(`/login`).get(getLogin).post(postLogin);
globalRouter
  .route(`/join`)
  .get(getJoin)
  .post(avatarUpload.single("avatar"), postJoin);
globalRouter.get(`/search`, search);
globalRouter.get(`/`, home);

export default globalRouter;
