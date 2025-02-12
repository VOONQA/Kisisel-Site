import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

// Örnek blog yazısı verisi
const blogPost = {
  title: "React Hooks'a Derinlemesine Bakış",
  content: `
    <div class="prose lg:prose-xl">
      <p>
        React Hooks, fonksiyonel bileşenlerde state ve yaşam döngüsü özelliklerini kullanmamızı sağlayan özelliklerdir.
        Bu yazıda React Hooks'un derinlemesine incelemesini yapacağız.
      </p>
      
      <h2>useState Hook'u</h2>
      <p>
        useState, fonksiyonel bileşenlerde state yönetimini sağlayan en temel hook'tur.
        Basit bir sayaç örneği ile başlayalım:
      </p>

      <pre><code>
        const [count, setCount] = useState(0);
      </code></pre>

      <h2>useEffect Hook'u</h2>
      <p>
        useEffect, bileşenin yaşam döngüsü olaylarını yönetmemizi sağlar.
        Örneğin, bir API'den veri çekmek için useEffect kullanabiliriz.
      </p>
    </div>
  `,
  date: "1 Mart 2024",
  author: "Yazar Adı",
  readTime: "8 dk",
  tags: ["React", "JavaScript", "Web Geliştirme"]
}

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  // Gerçek uygulamada burada slug'a göre blog yazısını çekeceğiz
  // Şimdilik örnek veriyi kullanıyoruz

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>{blogPost.title} - Blog</title>
        <meta name="description" content={blogPost.content.substring(0, 160)} />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-16 flex-grow">
        <article className="max-w-3xl mx-auto">
          {/* Blog Başlığı */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {blogPost.title}
            </h1>
            
            <div className="flex items-center text-gray-600 gap-4">
              <span>{blogPost.date}</span>
              <span>•</span>
              <span>{blogPost.author}</span>
              <span>•</span>
              <span>{blogPost.readTime} okuma</span>
            </div>
          </div>

          {/* Etiketler */}
          <div className="flex gap-2 mb-8">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Blog İçeriği */}
          <div 
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </article>
      </main>

      <Footer />
    </div>
  )
}
