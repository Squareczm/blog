import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于 AInovalife</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              一个融合科技洞察、个人成长与生活美学的个人博客空间。
              在这里，科技与人文交织，理性与感性共存。
            </p>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-4">订阅更新</h3>
            <p className="text-gray-600 text-sm mb-4">
              订阅获取最新文章推送
            </p>
            <SubscribeForm />
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/archive"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                所有文章
              </Link>
              <Link
                href="/category/ai"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                AI 专栏
              </Link>
              <Link
                href="/category/nova"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                成长记录
              </Link>
              <Link
                href="/category/life"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                生活点滴
              </Link>
            </div>
          </div>

          {/* Contact & QR Codes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系与支持</h3>
            <div className="space-y-4">
              <Link
                href="/contact"
                className="block text-gray-600 hover:text-gray-900 transition-colors text-sm mb-4"
              >
                给我留言
              </Link>
              
              {/* QR Codes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">公众号</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">关注公众号</p>
                    <p className="text-xs text-gray-500">不错过每一次更新</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">咖啡</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">请杯咖啡</p>
                    <p className="text-xs text-gray-500">支持创作</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              Copyright © {new Date().getFullYear()} AInovalife. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                隐私政策
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                使用条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}