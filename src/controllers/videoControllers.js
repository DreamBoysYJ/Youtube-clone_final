import Video from "../models/Video";
import fetch from "node-fetch";
import multer from "multer";
import User from "../models/User";

const uploadVideo = multer({ dest: "uploads/" });

export const search = (req, res) => {
  return res.render("search");
};

export const watch = (req, res) => {
  const { id } = req.params;

  return res.render("watch", { id });
};

export const home = (req, res) => {
  return res.render("home");
};

export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    files: { video, thumb },
  } = req;
  const { _id } = req.session.user;
  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect(`/`);
  } catch (error) {
    console.log(error);
    return res.render("upload", { errorMessage: error._message });
  }
};
