import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { mockPosts } from '@/lib/data';

export default function ArchivePage() {
  // 获取所有文章并按发布时间倒序排列
  const allPosts = [...mockPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

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
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}