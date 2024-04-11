import { userModel } from "../../models/User/User.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({
        _id 
    }, process.env.SECRET, {
        expiresIn: '3d'
    })
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await userModel.login(email, password);

        //creating a jwt token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }
    catch(error){
        res.status(400).json({ error: error.message})
    }
}

export default loginUser;