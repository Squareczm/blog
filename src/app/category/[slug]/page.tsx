import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
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

const categoryInfo = {
  ai: {
    name: 'AI',
    title: '人工智能',
    description: '探索前沿技术，分享AI领域的深度思考与实践经验'
  },
  nova: {
    name: 'Nova',
    title: '成长记录',
    description: '记录学习轨迹，见证每一次蜕变与突破'
  },
  life: {
    name: 'Life',
    title: '生活点滴',
    description: '捕捉美好瞬间，传递温暖与诗意的生活感悟'
  }
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryKey = slug.toLowerCase();
  const category = categoryInfo[categoryKey as keyof typeof categoryInfo];

  if (!category) {
    notFound();
  }

  // 从API获取该分类的文章
  let categoryPosts: Post[] = [];
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/posts?category=${categoryKey}&status=published`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      categoryPosts = data.posts || [];
    }
  } catch (error) {
    console.error('获取分类文章失败:', error);
  }

  return (
    <>
      <Header />
      
      <main className="pt-20 min-h-screen">
        {/* Category Header */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              {category.title}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {category.description}
            </p>
            <p className="text-gray-500">
              共 {categoryPosts.length} 篇文章
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categoryPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  该分类下暂无文章
                </p>
              </div>
            )}
            
            {/* Load More Button */}
            {categoryPosts.length > 0 && (
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
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}