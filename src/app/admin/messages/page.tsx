'use client';

import { useState, useEffect } from 'react';

interface Message {
  id: string;
  email: string;
  content: string;
  receivedAt: string;
  status: 'unread' | 'read';
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');

  // 从API获取消息数据
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error('获取消息失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    
    // 每5秒自动刷新一次
    const interval = setInterval(fetchMessages, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredMessages = messages.filter(message => 
    statusFilter === 'all' || message.status === statusFilter
  );

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' as const } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">消息中心</h1>
        <p className="text-gray-600">查看和管理来自读者的留言</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">所有消息</option>
            <option value="unread">未读消息</option>
            <option value="read">已读消息</option>
          </select>
          <div className="text-sm text-gray-600">
            共 {filteredMessages.length} 条消息
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">消息列表</h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.status === 'unread') {
                        markAsRead(message.id);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.receivedAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {message.content}
                        </p>
                      </div>
                      {message.status === 'unread' && (
                        <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  暂无消息
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {selectedMessage ? (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedMessage.email}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(selectedMessage.receivedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedMessage.status === 'unread' && (
                        <button
                          onClick={() => markAsRead(selectedMessage.id)}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                        >
                          标记已读
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.content}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  选择一条消息
                </h3>
                <p className="text-gray-500">
                  从左侧列表中选择一条消息来查看详情
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 