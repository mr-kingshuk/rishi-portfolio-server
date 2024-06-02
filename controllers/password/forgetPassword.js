import { userModel } from "../../models/User/User.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

//token to verify email
const createToken = (data) => {
    return jwt.sign(data, process.env.SECRET, { expiresIn: '3m' });
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await userModel.findOne({ email });
        if (!oldUser) {
            return res.status(404).json({ state: "error", message: "Email is not found" });
        }
        const token = createToken({ email: oldUser.email, password: oldUser.password });
        const link = `http://localhost:3000/api/password/reset-password/${oldUser._id}/${token}`;

        //send email to client
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: 'mrkingshukg@gmail.com',
                pass: 'llygsyaapidflyew'
            }
        });

        var mailOptions = {
            from: 'mrkingshukg@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: `${link}` 
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).json({ state: "success", message: "Reset Mail sent" });
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

export default forgetPassword;