import { withAuth } from '../../../components/admin/withAuth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Experience {
  title: string      // Pozisyon
  company: string    // Şirket adı
  period: string     // Tarih aralığı
  description: string // Açıklama
}

interface Skills {
  frontend: string[]
  backend: string[]
  tools: string[]
}

interface SocialLink {
  id: string
  icon: string
  url: string
}

interface Contact {
  email: string
  github: string
  linkedin: string
  customLinks: {
    id: string
    icon: string
    url: string
  }[]
  socialLinks: SocialLink[]
}

function EditAbout() {
  const router = useRouter()
  
  // Başlangıç state'lerini boş objelerle başlat
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [skills, setSkills] = useState({
    frontend: [] as string[],
    backend: [] as string[],
    tools: [] as string[]
  })
  const [experiences, setExperiences] = useState<Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>>([])
  const [contact, setContact] = useState({
    email: '',
    github: '',
    linkedin: '',
    customLinks: [] as { id: string; icon: string; url: string }[],
    socialLinks: [] as { id: string; icon: string; url: string }[]
  })

  // Veritabanından verileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/about');
        if (!response.ok) {
          throw new Error('Veri çekme hatası');
        }
        const data = await response.json();
        if (data) {
          setName(data.name || '');
          setTitle(data.title || '');
          setBio(data.bio || '');
          setSkills(data.skills || { frontend: [], backend: [], tools: [] });
          setExperiences(data.experiences || []);
          setContact(data.contact || {
            email: '',
            github: '',
            linkedin: '',
            customLinks: [],
            socialLinks: []
          });
        }
      } catch (err) {
        console.error('Veri çekme hatası:', err);
      }
    };

    fetchData();
  }, []);

  // Yeni deneyim ekleme
  const addExperience = () => {
    setExperiences([...experiences, {
      title: "",
      company: "",
      period: "",
      description: ""
    }])
  }

  // Deneyim silme
  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index))
    }
  }

  // Beceri ekleme/silme fonksiyonları
  const addSkill = (category: keyof Skills, skill: string) => {
    if (skill.trim()) {
      setSkills({
        ...skills,
        [category]: [...skills[category], skill.trim()]
      })
    }
  }

  const removeSkill = (category: keyof Skills, index: number) => {
    setSkills({
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index)
    })
  }

  // Kullanılabilir ikonlar
  const availableIcons = [
    { id: 'website', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { id: 'twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { id: 'instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'youtube', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z' },
    { id: 'medium', icon: 'M19 24h-14a2 2 0 0 1 -2 -2v-20a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v20a2 2 0 0 1 -2 2z' }
  ]

  // Yeni özel link ekleme
  const addCustomLink = () => {
    const newId = Math.random().toString(36).substr(2, 9)
    setContact({
      ...contact,
      customLinks: [...contact.customLinks, { id: newId, icon: 'website', url: '' }]
    })
  }

  // Özel link silme
  const removeCustomLink = (id: string) => {
    setContact({
      ...contact,
      customLinks: contact.customLinks.filter(link => link.id !== id)
    })
  }

  // Kullanılabilir sosyal medya platformları
  const socialPlatforms = [
    { id: 'website', label: 'Website' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'medium', label: 'Medium' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'discord', label: 'Discord' }
  ]

  // Yeni sosyal medya platform ekleme
  const addSocialLink = () => {
    setContact({
      ...contact,
      socialLinks: [...contact.socialLinks, { id: Math.random().toString(36).substr(2, 9), icon: 'website', url: '' }]
    })
  }

  // Sosyal medya platform silme
  const removeSocialLink = (id: string) => {
    setContact({
      ...contact,
      socialLinks: contact.socialLinks.filter(link => link.id !== id)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      if (image) formData.append('image', image);
      
      formData.append('name', name);
      formData.append('title', title);
      formData.append('bio', bio);
      formData.append('skills', JSON.stringify(skills));
      formData.append('experiences', JSON.stringify(experiences));
      formData.append('contact', JSON.stringify(contact));

      const response = await fetch('http://localhost:5000/api/about', {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Güncelleme başarısız');
      }

      const result = await response.json();
      console.log('Güncelleme başarılı:', result);
      alert('Bilgiler başarıyla güncellendi!')
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Hata:', error);
      alert(error instanceof Error ? error.message : 'Bilgiler güncellenirken bir hata oluştu')
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Hakkımda Sayfasını Düzenle</h1>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-8 bg-white p-6 rounded-lg shadow">
          {/* Profil Bilgileri */}
          <div className="space-y-6 border-b border-gray-200 pb-6">
            <h2 className="text-xl font-medium text-gray-900">Profil Bilgileri</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">İsim Soyisim</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ünvan</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Biyografi</label>
              <textarea
                rows={4}
                required
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profil Fotoğrafı</label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          {/* Beceriler */}
          <div className="space-y-6 border-b border-gray-200 pb-6">
            <h2 className="text-xl font-medium text-gray-900">Beceriler</h2>
            
            {/* Frontend */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Frontend</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills?.frontend?.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill('frontend', index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  placeholder="Yeni beceri ekle ve Enter'a bas"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill('frontend', (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                />
              </div>
            </div>

            {/* Backend */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Backend</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills?.backend?.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill('backend', index)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  placeholder="Yeni beceri ekle ve Enter'a bas"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill('backend', (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                />
              </div>
            </div>

            {/* Araçlar */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Araçlar</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills?.tools?.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill('tools', index)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  placeholder="Yeni araç ekle ve Enter'a bas"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill('tools', (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Deneyimler */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-900">Deneyimler</h2>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Yeni Deneyim Ekle
              </button>
            </div>

            {experiences?.map((exp, index) => (
              <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Pozisyon</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    value={exp.title}
                    onChange={(e) => {
                      const newExps = [...experiences]
                      newExps[index].title = e.target.value
                      setExperiences(newExps)
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Şirket</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    value={exp.company}
                    onChange={(e) => {
                      const newExps = [...experiences]
                      newExps[index].company = e.target.value
                      setExperiences(newExps)
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tarih Aralığı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: 2022 - Günümüz"
                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    value={exp.period}
                    onChange={(e) => {
                      const newExps = [...experiences]
                      newExps[index].period = e.target.value
                      setExperiences(newExps)
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                  <textarea
                    rows={3}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    value={exp.description}
                    onChange={(e) => {
                      const newExps = [...experiences]
                      newExps[index].description = e.target.value
                      setExperiences(newExps)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* İletişim Bölümü */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-900">İletişim Bilgileri</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  value={contact?.email || ''}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">GitHub Profili</label>
                <input
                  type="url"
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  placeholder="https://github.com/..."
                  value={contact?.github || ''}
                  onChange={(e) => setContact({ ...contact, github: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn Profili</label>
                <input
                  type="url"
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  placeholder="https://linkedin.com/in/..."
                  value={contact?.linkedin || ''}
                  onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                />
              </div>

              {/* Sosyal Medya Platformları */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Sosyal Medya Platformları</label>
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Platform Ekle
                  </button>
                </div>

                {contact?.socialLinks?.map((link) => (
                  <div key={link.id} className="flex items-center space-x-4">
                    <select
                      value={link.icon}
                      onChange={(e) => {
                        const newLinks = contact.socialLinks.map(l => 
                          l.id === link.id ? { ...l, icon: e.target.value } : l
                        )
                        setContact({ ...contact, socialLinks: newLinks })
                      }}
                      className="w-40 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    >
                      {socialPlatforms.map((platform) => (
                        <option key={platform.id} value={platform.id}>
                          {platform.label}
                        </option>
                      ))}
                    </select>

                    <input
                      type="url"
                      required
                      placeholder="https://"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = contact.socialLinks.map(l => 
                          l.id === link.id ? { ...l, url: e.target.value } : l
                        )
                        setContact({ ...contact, socialLinks: newLinks })
                      }}
                      className="flex-1 rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    />

                    <button
                      type="button"
                      onClick={() => removeSocialLink(link.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withAuth(EditAbout) 