import Image from 'next/image';
import Link from 'next/link';

export default function CategorySection() {
  const categories = [
    {
      name: 'AI',
      description: '探索人工智能的无限可能，分享前沿技术与深度思考',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      href: '/category/ai',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Nova',
      description: '记录成长的足迹，见证每一次蜕变与突破',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      href: '/category/nova',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Life',
      description: '捕捉生活中的美好瞬间，传递温暖与诗意',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      href: '/category/life',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            探索我的世界
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            在这里，科技与人文交织，理性与感性共存
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href}>
              <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-96">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                </div>

                {/* Category Label - 左上角 */}
                <div className={`absolute top-6 left-6 z-20 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${category.color} shadow-lg`}>
                  <span className="text-xl font-bold text-white">{category.name.charAt(0)}</span>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-3 group-hover:translate-x-2 transition-transform">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-200 group-hover:translate-x-2 transition-transform">
                    {category.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm">
                    <span className="mr-2">探索更多</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-2 transition-transform"
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
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}