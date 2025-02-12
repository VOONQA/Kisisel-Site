import express from 'express';
import { getAbout, updateAbout } from '../controllers/hakkimdaController';
import upload from '../middleware/upload';

const router = express.Router();

router.get('/', getAbout);
router.put('/', upload.single('image'), updateAbout);

export default router; 