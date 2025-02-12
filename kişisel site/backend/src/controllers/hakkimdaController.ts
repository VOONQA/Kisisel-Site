import { Request, Response } from 'express';
import Hakkimda from '../models/Hakkimda';

export const getAbout = async (_req: Request, res: Response) => {
  try {
    console.log('getAbout çağrıldı');
    
    const about = await Hakkimda.findOne();
    console.log('Bulunan veri:', about);
    
    if (!about) {
      const defaultAbout = new Hakkimda({
        name: '',
        title: '',
        bio: '',
        skills: {
          frontend: [],
          backend: [],
          tools: []
        },
        experiences: [],
        contact: {
          email: '',
          github: '',
          linkedin: '',
          customLinks: [],
          socialLinks: []
        }
      });

      console.log('Yeni veri oluşturuluyor:', defaultAbout);
      await defaultAbout.save();
      return res.json(defaultAbout);
    }

    res.json(about);
  } catch (error) {
    console.error('Hata detayı:', error);
    res.status(500).json({ error: 'Bilgiler alınırken bir hata oluştu' });
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  try {
    const { name, title, bio, skills, experiences, contact } = req.body;
    
    const aboutData = {
      name,
      title,
      bio,
      skills: JSON.parse(skills),
      experiences: JSON.parse(experiences),
      contact: JSON.parse(contact),
      ...(req.file && { image: `/images/${req.file.filename}` })
    };

    const about = await Hakkimda.findOne();
    
    if (about) {
      const updatedAbout = await Hakkimda.findByIdAndUpdate(
        about._id,
        aboutData,
        { new: true }
      );
      return res.json(updatedAbout);
    } else {
      const newAbout = new Hakkimda(aboutData);
      await newAbout.save();
      return res.status(201).json(newAbout);
    }
  } catch (error) {
    console.error('Hata:', error);
    return res.status(500).json({ 
      error: 'Bilgiler güncellenirken bir hata oluştu', 
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
}; 