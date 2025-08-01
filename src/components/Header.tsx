'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const categories = [
    { name: 'AI', href: '/category/ai', description: '人工智能洞察' },
    { name: 'Nova', href: '/category/nova', description: '成长记录' },
    { name: 'Life', href: '/category/life', description: '生活点滴' },
  ];

  // 判断当前激活的标签
  const getActiveCategory = () => {
    if (pathname.includes('/category/ai')) return 'AI';
    if (pathname.includes('/category/nova')) return 'Nova';
    if (pathname.includes('/category/life')) return 'Life';
    return null;
  };

  const activeCategory = getActiveCategory();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold">
            <span className={activeCategory === 'AI' ? 'text-gray-900' : (activeCategory ? 'text-gray-400' : 'text-gray-900')}>AI</span>
            <span className={activeCategory === 'Nova' ? 'text-gray-900' : (activeCategory ? 'text-gray-400' : 'text-gray-900')}>nova</span>
            <span className={activeCategory === 'Life' ? 'text-gray-900' : (activeCategory ? 'text-gray-400' : 'text-gray-900')}>life</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              作者简介
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                作者简介
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}