import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, min: 6 },
  password: { type: String, required: true, min: 8 },
  username: { type: String, required: true, min: 2 },
  email: { type: String, required: true, min: 6 },
});

const User = mongoose.model("User", userSchema);

export default User;
