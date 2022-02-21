import express from "express";

const videoRouter = express.Router();

const handlehome = (req, res) => {
  return res.send("hi");
};

videoRouter.get(`/`, handlehome);

export default videoRouter;
