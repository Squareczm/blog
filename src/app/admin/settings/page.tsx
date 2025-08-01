'use client';

import { useState, useEffect } from 'react';

interface SiteSettings {
  title: string;
  subtitle: string;
  titleAlign: 'left' | 'center' | 'right';
  subtitleAlign: 'left' | 'center' | 'right';
  copyright: string;
  bannerImage: string;
  wechatQRCode: string;
  coffeeQRCode: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    title: 'AInovalife',
    subtitle: '在代码与山水间，寻找内心的宁静与成长',
    titleAlign: 'center',
    subtitleAlign: 'center',
    copyright: 'Copyright © 2025 AInovalife. All rights reserved.',
    bannerImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    wechatQRCode: '',
    coffeeQRCode: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // 从API获取设置
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('获取设置失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: 'bannerImage' | 'wechatQRCode' | 'coffeeQRCode', file: File) => {
    // 这里应该实现文件上传逻辑
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleInputChange(field, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (response.ok) {
        alert('设置已保存');
      } else {
        alert(data.error || '保存失败');
      }
    } catch (error) {
      alert('保存失败，请稍后重试');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">站点设置</h1>
        <p className="text-gray-600">配置网站的基本信息和外观</p>
      </div>

      <div className="max-w-4xl">
        {/* Basic Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                网站标题
              </label>
              <textarea
                value={settings.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="支持换行，使用Shift+Enter换行"
              />
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题对齐方式
                </label>
                <select
                  value={settings.titleAlign}
                  onChange={(e) => handleInputChange('titleAlign', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="left">左对齐</option>
                  <option value="center">居中</option>
                  <option value="right">右对齐</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                副标题
              </label>
              <textarea
                value={settings.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="支持换行，使用Shift+Enter换行"
              />
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  副标题对齐方式
                </label>
                <select
                  value={settings.subtitleAlign}
                  onChange={(e) => handleInputChange('subtitleAlign', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="left">左对齐</option>
                  <option value="center">居中</option>
                  <option value="right">右对齐</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              版权信息
            </label>
            <input
              type="text"
              value={settings.copyright}
              onChange={(e) => handleInputChange('copyright', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Image Settings */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">图片设置</h3>
          
          <div className="space-y-6">
            {/* Banner Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                首页横幅图片
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  {settings.bannerImage && (
                    <img
                      src={settings.bannerImage}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload('bannerImage', file);
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* QR Codes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公众号二维码
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {settings.wechatQRCode ? (
                      <img
                        src={settings.wechatQRCode}
                        alt="WeChat QR"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">暂无图片</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload('wechatQRCode', file);
                        }
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  请杯咖啡二维码
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {settings.coffeeQRCode ? (
                      <img
                        src={settings.coffeeQRCode}
                        alt="Coffee QR"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">暂无图片</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload('coffeeQRCode', file);
                        }
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? '保存中...' : '保存设置'}
          </button>
        </div>
      </div>
    </div>
  );
} 