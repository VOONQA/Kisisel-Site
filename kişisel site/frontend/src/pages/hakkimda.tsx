import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

// Örnek beceriler verisi
const defaultSkills = {
  frontend: ['React', 'React Native', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
  backend: ['Node.js', 'Express', 'MongoDB', 'Microsoft SQL'],
  tools: ['Git', 'VS Code', 'Docker']
}

// Örnek deneyim verisi
const defaultExperiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Şirketi",
    period: "2022 - Günümüz",
    description: "React ve Next.js ile modern web uygulamaları geliştirme."
  },
  {
    title: "Frontend Developer",
    company: "Yazılım Şirketi",
    period: "2020 - 2022",
    description: "E-ticaret projeleri ve dashboard uygulamaları geliştirme."
  }
]

export default function About() {
  const [aboutData, setAboutData] = useState({
    name: 'Talha Yılmaz',
    title: 'Fullstack Developer',
    bio: 'Merhaba! Ben Talha Yılmaz...',
    image: '/images/profile.png',
    skills: defaultSkills,
    experiences: defaultExperiences,
    contact: {
      email: 'talhaylmz111@gmail.com',
      github: 'https://github.com/VOONQA',
      linkedin: 'https://www.linkedin.com/in/talha-yılmaz-495482295/'
    }
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setAboutData(data);
        }
      })
      .catch(err => console.error('Hata:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Hakkımda - {aboutData.name}</title>
        <meta name="description" content={aboutData.bio} />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Profil Bölümü */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
            <div className="w-48 h-48 relative rounded-full overflow-hidden">
              <Image
                src={aboutData.image}
                alt="Profil Fotoğrafı"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {aboutData.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {aboutData.title}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {aboutData.bio}
              </p>
            </div>
          </div>

          {/* Beceriler */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Beceriler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Frontend */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.skills.frontend.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.skills.backend.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Araçlar */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Araçlar</h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.skills.tools.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Deneyim */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Deneyim</h2>
            <div className="space-y-6">
              {aboutData.experiences.map((exp, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-lg text-gray-800">{exp.title}</h3>
                  <p className="text-blue-600 mb-2">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-3">{exp.period}</p>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* İletişim */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <a 
                  href={`mailto:${aboutData.contact.email}`}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {aboutData.contact.email}
                </a>
                <a 
                  href={aboutData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a 
                  href={aboutData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
