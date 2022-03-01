import Video from "../models/Video";
import fetch from "node-fetch";
import multer from "multer";
import User from "../models/User";
import "dotenv/config";

// HOME PAGE
export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { videos });
};

// SEARCH
export const search = async (req, res) => {
  let videos = [];
  const { keyword } = req.query;
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`^.*${keyword}.*`, "i"),
      },
    }).populate("owner");
  }

  return res.render("search", { videos });
};

// CREATE (UPLOAD)
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
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.status(201).redirect(`/`);
  } catch (error) {
    console.log(error);
    return res.status(500).render("upload", { errorMessage: error._message });
  }
};

// READ
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");

  return res.render("watch", { video });
};

// UPDATE (EDIT)
export const getEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id).populate("owner");

  if (String(video.owner._id) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.status(200).render("edit-video", { video });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
  } = req;

  const video = await Video.findById(id).populate("owner");
  if (String(video.owner._id) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: await Video.formatHashtags(hashtags),
  });
  return res.status(200).redirect(`/videos/${id}`);
};

// DELETE

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndRemove(id);
  return res.status(200).redirect("/");
};
