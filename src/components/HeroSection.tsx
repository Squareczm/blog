'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SiteSettings {
  title: string;
  subtitle: string;
  titleAlign: 'left' | 'center' | 'right';
  subtitleAlign: 'left' | 'center' | 'right';
  bannerImage: string;
}

export default function HeroSection() {
  const [settings, setSettings] = useState<SiteSettings>({
    title: 'AInovalife',
    subtitle: '在代码与山水间，寻找内心的宁静与成长',
    titleAlign: 'center',
    subtitleAlign: 'center',
    bannerImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        setSettings({
          title: data.title,
          subtitle: data.subtitle,
          titleAlign: data.titleAlign || 'center',
          subtitleAlign: data.subtitleAlign || 'center',
          bannerImage: data.bannerImage
        });
      } catch (error) {
        console.error('获取设置失败:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={settings.bannerImage}
          alt="Mountain landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-white px-4 ${settings.titleAlign === 'center' ? 'text-center' : settings.titleAlign === 'right' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fadeIn whitespace-pre-line">
          {settings.title}
        </h1>
        <p className={`text-xl md:text-2xl font-light max-w-2xl animate-fadeIn whitespace-pre-line ${settings.subtitleAlign === 'center' ? 'mx-auto text-center' : settings.subtitleAlign === 'right' ? 'ml-auto text-right' : 'text-left'}`} style={{ animationDelay: '0.2s' }}>
          {settings.subtitle}
        </p>
      </div>
    </section>
  );
}