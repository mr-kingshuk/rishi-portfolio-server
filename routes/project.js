import express from 'express';

import addProject from '../controllers/project/addProject.js';
import top3Proj from '../controllers/project/top3Proj.js';
import allProj from '../controllers/project/allProj.js';
import projectHeaders from '../controllers/project/projectHeaders.js';
import getProject from '../controllers/project/getProject.js';
import updateProject from '../controllers/project/updateProject.js';
import reorderProject from '../controllers/project/reorderProject.js';
import deleteProject from '../controllers/project/deleteProject.js';

import requireAuth from '../middlewares/requireAuth.js';

const projectRouter = express.Router();

projectRouter.post('/', requireAuth, addProject);

projectRouter.get('/top3Proj', top3Proj);

projectRouter.get('/allProj', allProj);

projectRouter.get('/projectHeaders', projectHeaders);

projectRouter.put('/reorder', requireAuth, reorderProject);

projectRouter.get('/:id', getProject);

projectRouter.put('/:id', requireAuth, updateProject);

projectRouter.delete('/:id', requireAuth, deleteProject);


export default projectRouter;