import { useEffect, useState } from 'react';
import Head from 'next/head'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import BlogCard from '../../components/blog/BlogCard'

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  link?: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Blog verileri alınamadı:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Blog - Kişisel Sitem</title>
        <meta name="description" content="Web geliştirme, teknoloji ve yazılım hakkında blog yazılarım" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-16 flex-grow">
        {/* Blog Başlığı */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Blog Yazılarım
          </h1>
          <p className="text-xl text-gray-600">
            Web geliştirme, teknoloji ve kişisel deneyimlerim hakkında yazılar
          </p>
        </div>

        {/* Blog Yazıları Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {blog.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={`/images/${blog.image.split('/').pop()}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">
                  {blog.content.length > 100 
                    ? `${blog.content.substring(0, 100)}...` 
                    : blog.content}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-blue-500 hover:text-blue-600 inline-flex items-center"
                  >
                    Devamını Oku
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Detay Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="p-6">
              {selectedBlog.image && (
                <img 
                  src={`/images/${selectedBlog.image.split('/').pop()}`}
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold mb-4">{selectedBlog.title}</h2>
              <p className="text-gray-600 mb-4">{selectedBlog.content}</p>
              {selectedBlog.link && (
                <a
                  href={selectedBlog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Kaynak
                </a>
              )}
              <div className="mt-4 text-sm text-gray-500">
                {new Date(selectedBlog.createdAt).toLocaleDateString('tr-TR')}
              </div>
              
              {/* Kapat butonu - beyaz alanın sağ altında */}
              <button
                onClick={() => setSelectedBlog(null)}
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
