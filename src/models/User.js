import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, min: 6, unique: true },
  password: { type: String, required: true, min: 8 },
  username: { type: String, required: true, min: 2 },
  email: { type: String, required: true, min: 6, unique: true },
});

const User = mongoose.model("User", userSchema);

export default User;
