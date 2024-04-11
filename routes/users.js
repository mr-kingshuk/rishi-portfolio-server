import express from 'express';

import loginUser from '../controllers/user/loginUser.js';
import signupUser from '../controllers/user/signupUser.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);

userRouter.post('/signup', signupUser);

export default userRouter;