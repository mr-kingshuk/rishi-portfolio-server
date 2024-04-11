import { userModel } from "../../models/User/User.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({
        _id 
    }, process.env.SECRET, {
        expiresIn: '3d'
    })
};


//saving the data in database, and sending the jwt token to user along with teh email
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    //the try...catch block throws an error, be it cutom made by us, or by mongodb and we print it using error.message
    //if any error is thrown, be it system or custom error, we will catch it. 
    try{
        const user = await userModel.signup(email, password);

        //creating a jwt token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }
    catch(error){
        res.status(400).json({ error: error.message})
    }
}

export default signupUser;