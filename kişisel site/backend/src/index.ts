import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import hakkimdaRoutes from './routes/hakkimdaRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint'i
app.get('/test', (_req, res) => {
  res.json({ message: 'Backend çalışıyor!' });
});

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/about', hakkimdaRoutes);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://talhaylmz111:Talha.123@cluster0.648mv.mongodb.net/personal-website?retryWrites=true&w=majority')
  .then(() => {
    console.log('✅ MongoDB bağlantısı başarılı!');
    // Temizleme sistemini başlat
  })
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

app.listen(port, () => {
  console.log('\n=== API ENDPOINTS ===');
  console.log(`🚀 Server: http://localhost:${port}`);
  console.log(`📝 Bloglar: http://localhost:${port}/api/blogs`);
  console.log(`💼 Portfolyo: http://localhost:${port}/api/portfolio`);
  console.log(`👤 Hakkımda: http://localhost:${port}/api/about`);
  console.log(`🔍 Test: http://localhost:${port}/test`);
  console.log('==================\n');
}); 