import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {type: String, required: true, min : 6},
    password: {type=String, required: true, min : 8 },
    username: {type: String, required: true, min : 2},
    email: {type: String, required: true, min : 6},

});

const User = mongoose.model("user",userSchema );

export default User;