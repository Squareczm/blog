'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PostCard from '@/components/PostCard';
import CategorySection from '@/components/CategorySection';

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

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch('/api/posts?status=published&limit=3', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setLatestPosts(data.posts || []);
        }
      } catch (error) {
        console.error('获取最新文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
    
    // 每60秒自动刷新一次
    const interval = setInterval(fetchLatestPosts, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Latest Posts Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                最新文章
              </h2>
              <p className="text-lg text-gray-600">
                分享最新的思考与见解
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a
                href="/archive"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                查看所有文章
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
        
        <CategorySection />
      </main>
      
      <Footer />
    </>
  );
}
