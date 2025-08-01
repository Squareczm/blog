import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupportModal from '@/components/SupportModal';
import SupportButton from '@/components/SupportButton';
import { markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: string;
  publishedAt: string | null;
  slug: string;
  featuredImage: string;
  tags: string[];
  readingTime: number;
}

// 获取相关文章
async function getRelatedPosts(currentPost: Post): Promise<Post[]> {
  try {
    const response = await fetch(`/api/posts?category=${currentPost.category}&status=published&limit=4`);
    const data = await response.json();
    return (data.posts || []).filter((post: Post) => post.id !== currentPost.id).slice(0, 3);
  } catch (error) {
    console.error('获取相关文章失败:', error);
    return [];
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/posts?slug=${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      notFound();
    }
    
    const data = await response.json();
    const post = data.post;
    
    if (!post) {
      notFound();
    }

    const relatedPosts = await getRelatedPosts(post);

    return (
      <>
        <Header />
        
        <main className="pt-20">
          {/* Article Header */}
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  post.category === 'ai' ? 'bg-blue-100 text-blue-800' :
                  post.category === 'nova' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {post.category.toUpperCase()}
                </span>
              <time className="text-gray-500">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : '草稿'}
              </time>
              <span className="text-gray-500">· {post.readingTime} 分钟阅读</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Support Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                如果这篇文章对你有帮助，欢迎支持我继续创作
              </p>
              <SupportButton />
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>
              本文采用 <a href="#" className="text-blue-600 hover:underline">CC BY-NC-SA 4.0</a> 协议进行许可。
              转载请注明出处。
            </p>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-serif font-bold text-center mb-12">
                相关文章
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/posts/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {relatedPost.featuredImage && (
                        <div className="h-48 overflow-hidden">
                          <Image
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
        <Footer />
      </>
    );
  } catch (error) {
    console.error('获取文章失败:', error);
    notFound();
  }
}
