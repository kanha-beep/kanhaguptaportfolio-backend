import express from 'express';
import { getProjects, addProject, deleteProject, singleProject, editProject } from '../controllers/projectController.js';
import WrapAsync from '../middleware/WrapAsync.js';

const router = express.Router();

router.get('/', WrapAsync(getProjects));
router.post('/', WrapAsync(addProject));
router.get('/:id', WrapAsync(singleProject));
router.patch('/:id/edit', WrapAsync(editProject))
router.delete('/:id', WrapAsync(deleteProject));

export default router;
