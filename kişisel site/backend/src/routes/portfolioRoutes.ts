import express from 'express';
import { createPortfolio, getPortfolio, deletePortfolio } from '../controllers/portfolioController';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/', upload.single('image'), createPortfolio);
router.get('/', getPortfolio);
router.delete('/:id', deletePortfolio);

export default router; 