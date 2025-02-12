import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

// Örnek proje verisi
const project = {
  title: "E-Ticaret Platformu",
  description: "Next.js ve Tailwind CSS kullanılarak geliştirilmiş, tam kapsamlı bir e-ticaret platformu.",
  longDescription: `
    <div class="prose lg:prose-xl">
      <p>
        Modern bir e-ticaret deneyimi sunmak için tasarlanmış bu platform, 
        performans ve kullanıcı deneyimini ön planda tutuyor.
      </p>

      <h2>Özellikler</h2>
      <ul>
        <li>Gelişmiş ürün filtreleme ve arama</li>
        <li>Gerçek zamanlı sepet güncellemesi</li>
        <li>Güvenli ödeme entegrasyonu</li>
        <li>Admin paneli ve stok yönetimi</li>
        <li>SEO optimizasyonu</li>
      </ul>

      <h2>Teknik Detaylar</h2>
      <p>
        Proje Next.js framework'ü üzerine inşa edildi ve Vercel üzerinde host ediliyor.
        Veritabanı olarak MongoDB kullanıldı ve state management için Redux tercih edildi.
      </p>
    </div>
  `,
  images: [
    "/images/projects/ecommerce-1.jpg",
    "/images/projects/ecommerce-2.jpg",
    "/images/projects/ecommerce-3.jpg"
  ],
  technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Redux", "Stripe"],
  projectUrl: "https://example.com/ecommerce",
  githubUrl: "https://github.com/username/ecommerce",
  completionDate: "Mart 2024"
}

export default function ProjectDetail() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>{project.title} - Portfolyo</title>
        <meta name="description" content={project.description} />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-16 flex-grow">
        <article className="max-w-4xl mx-auto">
          {/* Proje Başlığı */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600">
              {project.description}
            </p>
          </div>

          {/* Proje Görselleri */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} görsel ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Teknolojiler */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Kullanılan Teknolojiler</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Proje Detayları */}
          <div 
            className="prose lg:prose-xl max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: project.longDescription }}
          />

          {/* Proje Linkleri */}
          <div className="flex gap-6 justify-center">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <span>Canlı Demo</span>
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              >
                <span>GitHub</span>
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
