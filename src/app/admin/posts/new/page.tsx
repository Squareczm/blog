'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';

interface PostForm {
  title: string;
  content: string;
  category: 'ai' | 'nova' | 'life';
  status: 'draft' | 'published';
  excerpt: string;
  coverImage: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState<PostForm>({
    title: '',
    content: '',
    category: 'ai',
    status: 'draft',
    excerpt: '',
    coverImage: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: keyof PostForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);
    
    const postData = {
      ...form,
      status: publish ? 'published' : 'draft'
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        if (publish) {
          alert('文章已发布！');
        } else {
          alert('草稿已保存！');
        }
        router.push('/admin/posts');
      } else {
        alert(data.error || '保存失败');
      }
    } catch (error) {
      console.error('保存文章失败:', error);
      alert('保存失败，请稍后重试');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">新建文章</h1>
            <p className="text-gray-600">创建一篇新的博客文章</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {isSaving ? '保存中...' : '保存草稿'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSaving ? '发布中...' : '发布文章'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                文章标题
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="输入文章标题..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                文章摘要
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="输入文章摘要..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Cover Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                封面图片
              </label>
              <ImageUpload
                onImageUploaded={(url) => handleInputChange('coverImage', url)}
                currentImage={form.coverImage}
              />
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  或者输入图片URL：
                </label>
                <input
                  type="url"
                  value={form.coverImage}
                  onChange={(e) => handleInputChange('coverImage', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                文章内容
              </label>
              <RichTextEditor
                value={form.content}
                onChange={(value) => handleInputChange('content', value)}
                placeholder="在这里输入文章内容..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">发布设置</h3>
            
            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类
              </label>
              <select
                value={form.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ai">AI (人工智能)</option>
                <option value="nova">Nova (成长记录)</option>
                <option value="life">Life (生活点滴)</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                状态
              </label>
              <select
                value={form.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">草稿</option>
                <option value="published">已发布</option>
              </select>
            </div>

            {/* Word Count */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                统计信息
              </label>
              <div className="text-sm text-gray-600 space-y-1">
                <div>字符数: {form.content.replace(/<[^>]*>/g, '').length}</div>
                <div>预估阅读时间: {Math.ceil(form.content.replace(/<[^>]*>/g, '').length / 500)} 分钟</div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                预览
              </label>
              <button
                onClick={() => {
                  // 这里应该打开预览模态框
                  alert('预览功能开发中...');
                }}
                className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                预览文章
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 