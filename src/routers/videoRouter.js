import express from "express";
import multer from "multer";
import {
  watch,
  getUpload,
  postUpload,
  getEdit,
  postEdit,
  deleteVideo,
} from "../controllers/videoControllers";
import { videoUpload, avatarUpload, privateMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .get(getUpload)
  .post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postUpload);

videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
export default videoRouter;
