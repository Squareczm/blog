'use client';

import { useState, useEffect } from 'react';
import { QrCode, Users } from 'lucide-react';
import Image from 'next/image';

interface FollowButtonProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export default function FollowButton({ className = '', variant = 'default' }: FollowButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [wechatQRCode, setWechatQRCode] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        console.log('FollowButton: 开始获取设置...');
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
        console.log('FollowButton: 设置获取成功', data);
        setWechatQRCode(data.wechatQRCode || '');
      } catch (error) {
        console.error('FollowButton: 获取设置失败:', error);
      }
    };

    fetchSettings();
  }, []);

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center px-3 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors shadow-lg hover:shadow-xl ${className}`}
      >
        <QrCode className="w-4 h-4 mr-1" />
        关注
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center justify-center px-6 py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors shadow-lg hover:shadow-xl w-full ${className}`}
      >
        <Users className="w-5 h-5 mr-2" />
        关注公众号
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">关注公众号</h3>
              <p className="text-gray-600 mb-6 text-center">关注我们的公众号，不错过每一次更新</p>
              
              {wechatQRCode ? (
                <div className="mb-6">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <Image
                      src={wechatQRCode}
                      alt="公众号二维码"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    请用微信扫描上方二维码关注公众号
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm text-center">暂无公众号二维码</p>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    请联系管理员上传公众号二维码
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
                {wechatQRCode && (
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500"
                  >
                    已关注
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