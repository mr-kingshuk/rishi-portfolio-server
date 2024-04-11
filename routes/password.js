import express from 'express';

import forgetPassword from '../controllers/password/forgetPassword.js';
import verifyLink from '../controllers/password/verifyLink.js';
import resetPassword from '../controllers/password/resetPassword.js';

const passwordRouter = express.Router();

//send reset password link
passwordRouter.post('/forget-password', forgetPassword);

passwordRouter.post('/reset-password/:id', resetPassword);

passwordRouter.get('/reset-password/:id/:token', verifyLink);

export default passwordRouter;