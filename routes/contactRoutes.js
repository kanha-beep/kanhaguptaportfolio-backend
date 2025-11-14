import express from 'express';
import WrapAsync from '../middleware/WrapAsync.js';
import { contact } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', WrapAsync(contact));

export default router;
