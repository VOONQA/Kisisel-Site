import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import aboutRoutes from './routes/hakkimdaRoutes';

const app = express();

// Debug için tüm route'ları kontrol et
console.log('Import edilen routelar:', { 
  blogRoutes, 
  portfolioRoutes, 
  aboutRoutes 
});

// CORS ve JSON middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`🔍 İstek geldi: ${req.method} ${req.url}`);
  next();
});

// Statik dosya servisini düzgün şekilde ayarlayalım
app.use(express.static(path.join(__dirname, '../public')));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'API çalışıyor' });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test başarılı' });
});

// API routes
app.use('/api/blogs', blogRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/about', aboutRoutes);

console.log('🔄 Routes yüklendi:', [
  '/api/blogs',
  '/api/portfolio',
  '/api/about'
]);

// Hata yakalama
app.use((req, res) => {
  console.log('❌ 404:', req.url);
  res.status(404).json({ error: 'Sayfa bulunamadı' });
});

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-website')
  .then(() => console.log('✅ MongoDB bağlantısı başarılı!'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

export default app; 