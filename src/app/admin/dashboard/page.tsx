'use client';
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Users, MessageSquare, TrendingUp } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  status: string;
  publishedAt: string | null;
}

interface Message {
  id: string;
  email: string;
  content: string;
  receivedAt: string;
  status: string;
}

export default function AdminDashboard() {
  const [postCount, setPostCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取文章统计
        const postsRes = await fetch('/api/posts');
        const postsData = await postsRes.json();
        const posts = postsData.posts || [];
        setPostCount(posts.length);
        setRecentPosts(posts.slice(0, 3));

        // 获取订阅用户统计
        const subRes = await fetch('/api/subscribe');
        const subData = await subRes.json();
        setSubscriberCount((subData.subscribers || []).length);

        // 获取留言统计
        const msgRes = await fetch('/api/messages');
        const msgData = await msgRes.json();
        const messages = msgData.messages || [];
        setMessageCount(messages.length);
        setUnreadMessageCount(messages.filter((msg: Message) => msg.status === 'unread').length);
        setRecentMessages(messages.slice(0, 2));
      } catch (error) {
        console.error('获取统计数据失败:', error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: '文章总数',
      value: String(postCount),
      change: '+0',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: '订阅用户',
      value: String(subscriberCount),
      change: '+0',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: '未读留言',
      value: String(unreadMessageCount),
      change: '+0',
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
    {
      title: '本月访问',
      value: String(postCount * 42),
      change: '+0%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="mt-1 text-sm text-gray-600">
          管理您的内容和数据统计
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">最新文章</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentPosts.length > 0 ? recentPosts.map((post) => (
              <div key={post.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '草稿'}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.status === 'published' ? '已发布' : '草稿'}
                  </span>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-500">
                暂无文章
              </div>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
            <a
              href="/admin/posts"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              查看所有文章 →
            </a>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">最新留言</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentMessages.length > 0 ? recentMessages.map((message) => (
              <div key={message.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {message.status === 'unread' && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      )}
                      <p className="text-sm font-medium text-gray-900">{message.email}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {message.content.substring(0, 50)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.receivedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-500">
                暂无留言
              </div>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
            <a
              href="/admin/messages"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              查看所有留言 →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/admin/posts/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            新建文章
          </a>
          <a
            href="/admin/posts"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            管理文章
          </a>
          <a
            href="/admin/messages"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            查看留言
          </a>
          <a
            href="/admin/settings"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Users className="w-4 h-4 mr-2" />
            站点设置
          </a>
        </div>
      </div>
    </div>
  );
}