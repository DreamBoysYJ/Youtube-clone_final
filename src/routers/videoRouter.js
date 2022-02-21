import express from "express";
import { watch } from "../controllers/videoControllers";

const videoRouter = express.Router();

const handlehome = (req, res) => {
  return res.send("hi");
};

videoRouter.get(`/`, handlehome);
videoRouter.get("/:id", watch);

export default videoRouter;
