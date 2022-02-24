import express from "express";
import multer from "multer";
import { watch, getUpload, postUpload } from "../controllers/videoControllers";
import { videoUpload, avatarUpload, privateMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .get(getUpload)
  .post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postUpload);
videoRouter.get("/:id", watch);

export default videoRouter;
