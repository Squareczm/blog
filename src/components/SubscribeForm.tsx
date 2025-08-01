'use client';

import { useState } from 'react';

interface SubscribeFormProps {
  className?: string;
  source?: string;
}

export default function SubscribeForm({ className = '', source = 'footer' }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || '订阅失败，请稍后重试');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('网络错误，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-green-600 font-medium">
          ✓ 订阅成功！感谢您的关注。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="输入邮箱地址"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isSubmitting ? '提交中...' : '订阅'}
        </button>
      </div>
      
      {submitStatus === 'error' && (
        <p className="text-red-600 text-sm">
          {errorMessage}
        </p>
      )}
      
      <p className="text-xs text-gray-500">
        订阅即表示您同意我们的隐私政策。
      </p>
    </form>
  );
}