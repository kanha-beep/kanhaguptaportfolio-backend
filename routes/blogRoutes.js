import express from 'express';
import { getBlogs, addBlog, deleteBlog, editBlog , singleBlog} from '../controllers/blogController.js';
import WrapAsync from '../middleware/WrapAsync.js';
import {verifyAuth} from "../middleware/verifyAuth.js"

const router = express.Router();

router.get('/', verifyAuth, WrapAsync(getBlogs));
router.post('/', verifyAuth, WrapAsync(addBlog));
router.get('/:id', verifyAuth, WrapAsync(singleBlog));
router.patch('/:id/edit', verifyAuth, WrapAsync(editBlog));
router.delete('/:id', verifyAuth, WrapAsync(deleteBlog));

export default router;