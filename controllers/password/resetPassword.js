import mongoose from "mongoose";
import { userModel } from "../../models/User/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from 'jsonwebtoken';

const resetPassword =  async (req, res) =>{
    const { id, token } = req.params;
    const { password } = req.body;

    if(!password.password || !password.passwordAgain){
        return res.status(400).json({error: "All feilds must be filled"});
    }

    if(password.password !== password.passwordAgain){
        return res.status(404).json({error: "Passwords doesn't match"});
    }

    if(!validator.isStrongPassword(password.password))
        return res.status(404).json({error: "Password is not strong enough, must be atleast 8 characters long, must contain capital, lowercase, special character and number"});

    try{
        const oldUser = await userModel.findOne({ _id : id });
        if(!oldUser){
            return res.status(404).json({state: "error", message:"User is not found"});
        }
        const verify = jwt.verify(token, process.env.SECRET);
        if(verify.email !== oldUser.email){
            //invalid reset password link
            return res.status(404).json({state: "error", message : "Invalid Link!!"});
        }
       
        //checking if user exists
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error : "Reset Email Link has expired!!"})
        }
        
        if(!oldUser){
            return res.status(404).json({error : "Reset Email Link has expired!!"});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password.password, salt);

        const updatedUser = await userModel.findOneAndUpdate(
            { _id: id },
            { password : hash },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    }
    catch(err){
        return res.status(500).json(err);
    }
};

export default resetPassword;