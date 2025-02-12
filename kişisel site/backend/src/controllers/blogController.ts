import { Request, Response } from 'express';
import Blog from '../models/Blog';
import fs from 'fs';
import path from 'path';

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, link } = req.body;
    const blog = new Blog({
      title,
      content,
      link,
      image: req.file ? `/images/${req.file.filename}` : undefined
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Blog eklenirken bir hata oluştu' });
  }
};

export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Bloglar getirilemedi' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog bulunamadı' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Blog getirilemedi' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog yazısı bulunamadı' });
    }

    // Frontend'deki resmi sil
    if (blog.image) {
      const frontendImagePath = path.join(__dirname, '../../../frontend/public', blog.image);
      if (fs.existsSync(frontendImagePath)) {
        fs.unlinkSync(frontendImagePath);
        console.log('Frontend resim silindi:', blog.image);
      }
    }

    // Blog yazısını sil
    await Blog.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Blog yazısı ve resmi başarıyla silindi' });
  } catch (error) {
    console.error('Silme hatası:', error);
    res.status(500).json({ error: 'Blog yazısı silinirken bir hata oluştu' });
  }
}; 