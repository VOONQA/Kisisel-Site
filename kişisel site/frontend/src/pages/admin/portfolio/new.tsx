import { useState, useEffect } from 'react';
import { withAuth } from '../../../components/admin/withAuth';
import { useRouter } from 'next/router';

interface Portfolio {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

function NewPortfolio() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [link, setLink] = useState('')
  const router = useRouter()
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])

  useEffect(() => {
    // Mevcut portfolyo projelerini çek
    fetch('http://localhost:5000/api/portfolio')
      .then(res => res.json())
      .then(data => setPortfolios(data))
      .catch(err => console.error('Portfolyo verileri alınamadı:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    if (link) {
      formData.append('link', link);
    }

    try {
      const response = await fetch('http://localhost:5000/api/portfolio', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Proje başarıyla eklendi!');
        router.push('/admin/dashboard');
      } else {
        throw new Error('Proje eklenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Proje eklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/portfolio/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPortfolios(portfolios.filter(portfolio => portfolio._id !== id));
        alert('Proje başarıyla silindi!');
      }
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Proje silinirken bir hata oluştu!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Yeni Proje</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Başlık</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Açıklama</label>
            <textarea
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Görsel</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
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

        {/* Portfolyo Listesi */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Mevcut Projeler</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlık</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {portfolios.map(portfolio => (
                  <tr key={portfolio._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {portfolio.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(portfolio.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(portfolio._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(NewPortfolio); 