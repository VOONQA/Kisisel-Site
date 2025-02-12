import { withAuth } from '../../components/admin/withAuth'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Stats {
  totalVisits: number
  todayVisits: number
  activeUsers: number
  averageTime: string
  topPages: Array<{
    path: string
    views: number
  }>
}

interface Blog {
  _id: string;
  title: string;
  createdAt: string;
}

interface Portfolio {
  _id: string;
  title: string;
  createdAt: string;
}

function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalVisits: 0,
    todayVisits: 0,
    activeUsers: 0,
    averageTime: '0:00',
    topPages: []
  })

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])

  useEffect(() => {
    // Burada API'den istatistikleri çekeceğiz
    fetchStats()
    // Blog ve portfolyo verilerini çek
    Promise.all([
      fetch('http://localhost:5000/api/blogs').then(res => res.json()),
      fetch('http://localhost:5000/api/portfolio').then(res => res.json())
    ]).then(([blogData, portfolioData]) => {
      setBlogs(blogData)
      setPortfolio(portfolioData)
    })
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('İstatistikler alınamadı:', error)
    }
  }

  const handleDelete = async (type: 'blog' | 'portfolio', id: string) => {
    if (!confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`http://localhost:5000/api/${type}s/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        if (type === 'blog') {
          setBlogs(blogs.filter(blog => blog._id !== id))
        } else {
          setPortfolio(portfolio.filter(item => item._id !== id))
        }
        alert('Başarıyla silindi!')
      }
    } catch (error) {
      console.error('Silme hatası:', error)
      alert('Silme işlemi başarısız oldu!')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Paneli</h1>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <span className="text-gray-500">Toplam Ziyaret</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{stats.totalVisits}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <span className="text-gray-500">Bugünkü Ziyaret</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{stats.todayVisits}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <span className="text-gray-500">Aktif Kullanıcılar</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{stats.activeUsers}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <span className="text-gray-500">Ort. Geçirilen Süre</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{stats.averageTime} dk</span>
          </div>
        </div>
      </div>

      {/* En Çok Ziyaret Edilen Sayfalar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">En Çok Ziyaret Edilen Sayfalar</h2>
        </div>
        <div className="p-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">SAYFA</span>
            <span className="font-medium">GÖRÜNTÜLENME</span>
          </div>
          {stats.topPages?.map((page, index) => (
            <div key={index} className="flex justify-between py-2">
              <span>{page.path}</span>
              <span>{page.views}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Yönetim Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Blog Yönetimi</h3>
          <Link href="/admin/blog/new">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Yeni Yazı Ekle
            </button>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Portfolyo Yönetimi</h3>
          <Link href="/admin/portfolio/new">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Yeni Proje Ekle
            </button>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Hakkımda Yönetimi</h3>
          <Link href="/admin/about/edit">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Düzenle
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Dashboard) 