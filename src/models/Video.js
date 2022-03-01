import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },

  description: { type: String, required: true, minlength: 3 },
  createdAt: { type: Date, required: true, default: Date.now },
  comments: [{ type: String, minlength: 1 }],
  hashtags: [{ type: String, minlength: 1 }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: `User` },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
