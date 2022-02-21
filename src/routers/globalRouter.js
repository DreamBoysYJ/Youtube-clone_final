import express from "express";
import { login, join } from "../controllers/userControllers";
import { search } from "../controllers/videoControllers";

const globalRouter = express.Router();

globalRouter.get(`/login`, login);
globalRouter.get(`/join`, join);
globalRouter.get(`/search`, search);

export default globalRouter;
