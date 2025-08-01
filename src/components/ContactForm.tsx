'use client';

import { useState } from 'react';

interface ContactFormProps {
  className?: string;
  source?: string;
}

export default function ContactForm({ className = '', source = 'footer' }: ContactFormProps) {
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getContactType = (contact: string): 'email' | 'wechat' | 'phone' => {
    if (contact.includes('@')) return 'email';
    if (contact.includes('微信') || contact.includes('wx') || contact.includes('wechat')) return 'wechat';
    return 'phone';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const contactType = getContactType(contact);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          contact,
          type: contactType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setContact('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || '提交失败，请稍后重试');
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
          ✓ 联系方式提交成功！我们会尽快与您联系。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex gap-2">
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          placeholder="邮箱或微信号"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isSubmitting ? '提交中...' : '提交'}
        </button>
      </div>
      
      {submitStatus === 'error' && (
        <p className="text-red-600 text-sm">
          {errorMessage}
        </p>
      )}
      
      <p className="text-xs text-gray-500">
        留下您的联系方式，我们会及时与您沟通。
      </p>
    </form>
  );
} 