'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold mb-6">支持创作</h3>
          <p className="text-gray-600 mb-8">
            如果我的文章对你有帮助，欢迎支持我继续创作
          </p>

          <div className="grid grid-cols-2 gap-6">
            {/* WeChat QR */}
            <div>
              <div className="w-32 h-32 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">公众号二维码</span>
              </div>
              <p className="text-sm text-gray-600">
                扫码关注，不错过每一次思想的更新
              </p>
            </div>

            {/* Payment QR */}
            <div>
              <div className="w-32 h-32 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">付款码</span>
              </div>
              <p className="text-sm text-gray-600">
                若有触动，一杯咖啡足以温暖创作之心
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-8 px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}