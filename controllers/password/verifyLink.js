import { userModel } from "../../models/User/User.js";
import jwt from 'jsonwebtoken';

//verififies and redirects to page
const verifyLink = async (req, res) =>{
    const {id, token} = req.params;
    try{
        const oldUser = await userModel.findOne({ _id : id });
        if(!oldUser){
            return res.status(404).json({state: "error", message:"User is not found"});
        }
        const verify = jwt.verify(token, process.env.SECRET);
        if(verify.email === oldUser.email){
            //redirects to frontend route
            return res.redirect(`http://localhost:5173/reset-password/${oldUser._id}`);
        }
        return res.status(404).json({state: "error", message : "Invalid Link!!"});
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
};

export default verifyLink;