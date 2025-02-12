# Kişisel Website & Blog

Modern ve minimalist bir kişisel web sitesi ve blog uygulaması.

## 🚀 Özellikler

### 📝 Blog Yönetimi
- Blog yazıları oluşturma
- Resim yükleme desteği
- Okuma süresi hesaplama
- Yazıları düzenleme ve silme

### 💼 Portfolyo
- Proje ekleme ve düzenleme
- Teknoloji stack'i belirtme
- GitHub ve canlı demo linkleri
- Proje görselleri

### 👨‍💻 Admin Paneli
- Güvenli yönetim arayüzü
- Blog ve portfolyo yönetimi
- Hakkımda sayfası düzenleme
- Google Analytics entegrasyonu ile ziyaretçi istatistikleri
  - Toplam ziyaret
  - Günlük ziyaret
  - Aktif kullanıcılar
  - Ortalama geçirilen süre
  - En çok ziyaret edilen sayfalar

## 🛠️ Teknolojiler

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Google Analytics API

### Backend
- Node.js
- Express
- TypeScript
- MongoDB

### Deployment
- Docker
- Docker Compose

## 🚀 Kurulum

1. Repoyu klonlayın
bash
git clone https://github.com/kullaniciadi/Kisisel-Site.git
cd Kisisel-Site

2. MongoDB Kurulumu
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)'a gidin
- Ücretsiz hesap oluşturun
- Yeni bir cluster oluşturun
- Database Access menüsünden kullanıcı oluşturun
- Network Access menüsünden IP adresinizi ekleyin (veya 0.0.0.0/0 ile tüm IP'lere izin verin)
- Clusters menüsünden "Connect" butonuna tıklayın
- "Connect your application" seçin
- Verilen bağlantı URL'ini kopyalayın

3. Google Analytics Kurulumu
- [Google Analytics](https://analytics.google.com/)'e gidin
- Hesap oluşturun
- Yeni bir property ekleyin
- [Google Cloud Console](https://console.cloud.google.com/)'a gidin
- Yeni bir proje oluşturun
- Analytics API'yi etkinleştirin
- Credentials menüsünden Service Account oluşturun
- Service Account için bir key oluşturun (JSON formatında)
- JSON dosyasındaki bilgileri kullanarak .env.local dosyasını doldurun

4. Environment Değişkenlerini Ayarlayın

## Backend için .env dosyası
  - PORT=5000
  - MONGODB_URI=mongodb+srv://<kullanıcı>:<şifre>@cluster0.xxxxx.mongodb.net/veritabani-adi


## Frontend için .env.local dosyası
- GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Google Analytics'ten alacağınız ölçüm ID'si
- GOOGLE_CLIENT_EMAIL=xxx@xxx.iam.gserviceaccount.com  # Service Account email
- GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXXX\n-----END PRIVATE KEY-----\n"  # Service Account private key
- GA_VIEW_ID=12345678  # Google Analytics View ID
  - 
## 3. Docker ile çalıştırma
- docker-compose up --build
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin/login
- AD:admin ŞİFRE:123456
- AD ve Sifreyi değiştirmek isterseniz, frontend/src/pages/admin/login.tsx dosyasından değiştirebilirsiniz.
