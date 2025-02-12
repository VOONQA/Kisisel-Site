import { Request, Response } from 'express';
import Portfolio from '../models/Portfolio';
import fs from 'fs';
import path from 'path';

// Tüm portfolyo projelerini getir
export const getPortfolio = async (_req: Request, res: Response) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: 'Portfolyo verileri alınamadı' });
  }
};

// Yeni proje ekle
export const createPortfolio = async (req: Request, res: Response) => {
  try {
    const { title, description, link } = req.body;
    const portfolio = new Portfolio({
      title,
      description,
      link,
      image: req.file ? `/images/${req.file.filename}` : undefined
    });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Proje eklenirken bir hata oluştu' });
  }
};

// Proje sil
export const deletePortfolio = async (req: Request, res: Response) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ error: 'Proje bulunamadı' });
    }

    // Frontend'deki resmi sil
    if (portfolio.image) {
      const frontendImagePath = path.join(__dirname, '../../../frontend/public', portfolio.image);
      if (fs.existsSync(frontendImagePath)) {
        fs.unlinkSync(frontendImagePath);
        console.log('Frontend resim silindi:', portfolio.image);
      }
    }

    // Projeyi sil
    await Portfolio.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Proje ve resmi başarıyla silindi' });
  } catch (error) {
    console.error('Silme hatası:', error);
    res.status(500).json({ error: 'Proje silinirken bir hata oluştu' });
  }
}; 