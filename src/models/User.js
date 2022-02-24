import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, minlength: 6, unique: true },
  password: { type: String, required: true, minlength: 8 },
  username: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

export default User;
