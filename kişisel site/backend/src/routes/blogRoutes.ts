import express from 'express';
import { createBlog, getBlogs, getBlogById, deleteBlog } from '../controllers/blogController';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/', upload.single('image'), createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.delete('/:id', deleteBlog);

export default router; 