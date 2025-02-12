import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
  coverImage?: string
  readTime?: string
}

export default function BlogCard({ 
  title, 
  excerpt, 
  date, 
  slug, 
  coverImage = '/images/default-blog.jpg',
  readTime = '5 dk'
}: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      {coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={`http://localhost:5000${coverImage}`}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime} okuma</span>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600">
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4">
          {excerpt}
        </p>

        <Link 
          href={`/blog/${slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          Devamını Oku 
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
