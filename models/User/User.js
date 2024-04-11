import mongoose from "mongoose";

import signup from "./signup.js";
import login from "./login.js";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
});

userSchema.statics.signup = signup;
userSchema.statics.login = login;

export const userModel = mongoose.model('user', userSchema);