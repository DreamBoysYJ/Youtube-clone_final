import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, minlength: 3 },
  createdAt: { type: Number },
  comments: [{ type: String, minlength: 1 }],
  hashtags: [{ type: String, minlength: 1 }],
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: `User` }],
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
