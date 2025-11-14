import express from 'express';
import { register, login } from '../controllers/authController.js';
import WrapAsync from '../middleware/WrapAsync.js';

const router = express.Router();

router.post('/register',WrapAsync( register));
router.post('/login', WrapAsync(login));

export default router;
