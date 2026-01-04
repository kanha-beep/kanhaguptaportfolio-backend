import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { connectDB } from './init/db.js';
import ExpressError from './middleware/ExpressError.js';
import cookieParser from 'cookie-parser';
connectDB();
const app = express();
const allowedOrigins = process.env.CLIENT_URL?.split(',')
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
})
);
app.set("trust proxy", 1);
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes);
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"))
})
app.use((error, req, res, next) => {
    const { status = 400, message = "wrong" } = error;
    res.status(status).json({ message });
})
export default app;
