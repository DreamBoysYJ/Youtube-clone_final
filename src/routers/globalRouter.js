import express from "express";
import {
  postLogin,
  getLogin,
  getJoin,
  postJoin,
} from "../controllers/userControllers";
import { search } from "../controllers/videoControllers";

const globalRouter = express.Router();

globalRouter.route(`/login`).get(getLogin).post(postLogin);
globalRouter.route(`/join`).get(getJoin).post(postJoin);
globalRouter.get(`/search`, search);

export default globalRouter;
