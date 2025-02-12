import { useEffect, useState } from 'react';
import Head from 'next/head'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import ProjectCard from '../../components/portfolio/ProjectCard'

interface Portfolio {
  _id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  createdAt: string;
  technologies?: string[];
  githubLink?: string;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio')
      .then(res => res.json())
      .then(data => setPortfolios(data))
      .catch(err => console.error('Portfolyo verileri alınamadı:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Portfolyo - Kişisel Sitem</title>
        <meta name="description" content="Geliştirdiğim projeler ve çalışmalarım" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-16 flex-grow">
        {/* Portfolyo Başlığı */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Projelerim
          </h1>
          <p className="text-xl text-gray-600">
            Geliştirdiğim projeler ve çalışmalarımdan örnekler
          </p>
        </div>

        {/* Projeler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map(project => (
            <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {project.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={`/images/${project.image.split('/').pop()}`}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4">
                  {project.description.length > 100 
                    ? `${project.description.substring(0, 100)}...` 
                    : project.description}
                </p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-blue-500 hover:text-blue-600 inline-flex items-center"
                >
                  Devamını Oku
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Detay Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="p-6">
              {selectedProject.image && (
                <img 
                  src={`/images/${selectedProject.image.split('/').pop()}`}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold mb-4">{selectedProject.title}</h2>
              <p className="text-gray-600 mb-4">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies?.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              {selectedProject.githubLink && (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 mr-4"
                >
                  GitHub
                </a>
              )}
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Projeyi İncele
                </a>
              )}
              
              {/* Kapat butonu - beyaz alanın sağ altında */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute bottom-6 right-6 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 shadow-lg"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
