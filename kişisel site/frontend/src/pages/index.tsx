import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Kişisel Sitem - Ana Sayfa</title>
        <meta name="description" content="Kişisel blog ve portfolyo sitem" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8 md:py-16 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24">
            {/* Profil Fotoğrafı */}
            <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/images/profile.png"
                alt="Profil Fotoğrafı"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* İçerik */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
                Hoş Geldiniz 👋
              </h1>
              
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-600">
                <p>
                  Merhaba! Ben Talha Yılmaz, fullstack geliştirici olarak modern teknolojiler 
                  ile çalışmaktan keyif alan bir yazılımcıyım.
                </p>
                
                <p>
                  Bu sitede, proje geliştirme deneyimlerimi, teknik blog yazılarımı ve 
                  geliştirdiğim projeleri paylaşıyorum. Amacım, öğrendiklerimi paylaşarak 
                  topluluk ile bilgi alışverişinde bulunmak.
                </p>

                <p className="hidden md:block">
                  Menüden blog yazılarıma göz atabilir, portfolyo sayfamdan projelerimi 
                  inceleyebilir veya hakkımda sayfasından daha fazla bilgi edinebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
