import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI':
        return 'bg-blue-100 text-blue-800';
      case 'Nova':
        return 'bg-purple-100 text-purple-800';
      case 'Life':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <article className="group cursor-pointer">
      <Link href={`/posts/${post.slug}`}>
        <div className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-48 md:h-64 overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="p-6 bg-white">
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
              <time className="text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
              </time>
              <span className="text-sm text-gray-500">
                · {post.readingTime} 分钟阅读
              </span>
            </div>
            
            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-gray-600 line-clamp-3">
              {post.excerpt}
            </p>
            
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}