import express from 'express';
import { login, currentUser, logout } from '../controllers/authController.js';
import WrapAsync from '../middleware/WrapAsync.js';
import { verifyAuth } from '../middleware/verifyAuth.js';

const router = express.Router();
router.post('/login', WrapAsync(login));
router.get("/me", verifyAuth, WrapAsync(currentUser))
router.post("/logout", verifyAuth, WrapAsync(logout));
export default router;
