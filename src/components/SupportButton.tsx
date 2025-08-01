'use client';

import { useState, useEffect } from 'react';
import { Heart, Coffee, Gift } from 'lucide-react';
import Image from 'next/image';

interface SupportButtonProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export default function SupportButton({ className = '', variant = 'default' }: SupportButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [coffeeQRCode, setCoffeeQRCode] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        console.log('SupportButton: 开始获取设置...');
        const response = await fetch('/api/settings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('SupportButton: 设置获取成功', data);
        setCoffeeQRCode(data.coffeeQRCode || '');
      } catch (error) {
        console.error('SupportButton: 获取设置失败:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleSupport = () => {
    // 这里可以集成实际的支付功能
    alert('感谢您的支持！');
    setShowModal(false);
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center px-3 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl ${className}`}
      >
        <Heart className="w-4 h-4 mr-1" />
        赞赏
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl ${className}`}
      >
        <Heart className="w-5 h-5 mr-2" />
        赞赏作者
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">请杯咖啡</h3>
              <p className="text-gray-600 mb-6">如果这篇文章对您有帮助，请给作者一些鼓励</p>
              
              {coffeeQRCode ? (
                <div className="mb-6">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <Image
                      src={coffeeQRCode}
                      alt="请杯咖啡二维码"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    请用微信扫描上方二维码进行赞赏
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm">暂无赞赏二维码</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    请联系管理员上传赞赏二维码
                  </p>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  关闭
                </button>
                {coffeeQRCode && (
                  <button
                    onClick={handleSupport}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600"
                  >
                    已赞赏
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}