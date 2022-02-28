import Video from "../models/Video";
import fetch from "node-fetch";
import multer from "multer";
import User from "../models/User";

const uploadVideo = multer({ dest: "uploads/" });

export const search = (req, res) => {
  return res.render("search");
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  return res.render("watch", { video });
};

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { videos });
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
      hashtags: Video.formatHashtags(hashtags),
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

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  return res.render("edit-video", { video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: await Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = (req, res) => {
  return res.render("edit-video");
};
