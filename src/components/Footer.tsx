import Link from 'next/link';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';

export default function Footer() {
  const [settings, setSettings] = useState({
    aboutText: '一个融合科技洞察、个人成长与生活美学的个人博客空间。在这里，科技与人文交织，理性与感性共存。',
    wechatQRCode: '',
    coffeeQRCode: ''
  });
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentQR, setCurrentQR] = useState({ type: '', url: '', title: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        setSettings({
          aboutText: data.aboutText || settings.aboutText,
          wechatQRCode: data.wechatQRCode || '',
          coffeeQRCode: data.coffeeQRCode || ''
        });
      } catch (error) {
        console.error('获取设置失败:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleQRClick = (type: string, url: string, title: string) => {
    if (url) {
      setCurrentQR({ type, url, title });
      setShowQRModal(true);
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于 AInovalife</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {settings.aboutText}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">留下联系方式</h3>
            <p className="text-gray-600 text-sm mb-4">
              留下您的联系方式，我们会及时与您沟通
            </p>
            <ContactForm />
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
                <div 
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() => handleQRClick('wechat', settings.wechatQRCode, '关注公众号')}
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                    {settings.wechatQRCode ? (
                      <Image
                        src={settings.wechatQRCode}
                        alt="公众号二维码"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">公众号</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">关注公众号</p>
                    <p className="text-xs text-gray-500">不错过每一次更新</p>
                  </div>
                </div>
                
                <div 
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  onClick={() => handleQRClick('coffee', settings.coffeeQRCode, '请杯咖啡')}
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                    {settings.coffeeQRCode ? (
                      <Image
                        src={settings.coffeeQRCode}
                        alt="请杯咖啡二维码"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">咖啡</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">请杯咖啡</p>
                    <p className="text-xs text-gray-500">支持创作</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-start-4">
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

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{currentQR.title}</h3>
              {currentQR.url ? (
                <div className="mb-6">
                  <div className="relative w-64 h-64 mx-auto mb-4">
                    <Image
                      src={currentQR.url}
                      alt={`${currentQR.title}二维码`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {currentQR.type === 'wechat' ? '请用微信扫描上方二维码关注公众号' : '请用微信扫描上方二维码进行赞赏'}
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-64 h-64 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm">暂无二维码</p>
                  </div>
                  <p className="text-sm text-gray-600">请联系管理员上传二维码</p>
                </div>
              )}
              <button
                onClick={() => setShowQRModal(false)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}