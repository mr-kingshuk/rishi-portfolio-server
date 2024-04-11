import express from 'express';
import  getGeneral  from '../controllers/general/getGeneral.js';
import putGeneral from '../controllers/general/putGeneral.js';

import requireAuth from '../middlewares/requireAuth.js';

const generalRouter = express.Router();

generalRouter.get('/', getGeneral);

generalRouter.put('/', requireAuth, putGeneral);

export default generalRouter;