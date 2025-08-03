'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: 'AI' | 'Nova' | 'Life';
  status: string;
  publishedAt: Date;
  updatedAt: Date;
  published: boolean;
  slug: string;
  featuredImage?: string;
  tags: string[];
  readingTime: number;
}

export default function ArchivePage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts?status=published', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          // 按发布时间倒序排列
          const sortedPosts = (data.posts || []).sort((a: Post, b: Post) => 
            new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime()
          );
          setAllPosts(sortedPosts);
        } else {
          setError('获取文章失败');
        }
      } catch (error) {
        console.error('获取文章失败:', error);
        setError('获取文章失败');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <>
      <Header />
      
      <main className="pt-20 min-h-screen">
        {/* Page Header */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                所有文章
              </h1>
              <p className="text-lg text-gray-600">
                共 {allPosts.length} 篇文章
              </p>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  重试
                </button>
              </div>
            ) : allPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">暂无文章</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                
                {/* Load More Button */}
                <div className="text-center mt-12">
                  <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    加载更多
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}