import { NextRequest, NextResponse } from 'next/server';

interface SiteSettings {
  title: string;
  subtitle: string;
  titleAlign: string;
  subtitleAlign: string;
  copyright: string;
  aboutText: string;
  bannerImage: string;
  wechatQRCode: string;
  coffeeQRCode: string;
}

// 使用全局变量确保数据持久化
declare global {
  var siteSettings: SiteSettings | undefined;
}

// 初始化或使用现有的全局数据
if (!global.siteSettings) {
  global.siteSettings = {
    title: 'AInovalife',
    subtitle: '在代码与山水间，寻找内心的宁静与成长',
    titleAlign: 'center',
    subtitleAlign: 'center',
    copyright: 'Copyright © 2025 AInovalife. All rights reserved.',
    aboutText: '一个融合科技洞察、个人成长与生活美学的个人博客空间。在这里，科技与人文交织，理性与感性共存。',
    bannerImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    wechatQRCode: '',
    coffeeQRCode: ''
  };
}

let siteSettings = global.siteSettings;

export async function GET() {
  return NextResponse.json(siteSettings);
}

export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json();
    
    // 更新设置
    siteSettings = { ...siteSettings, ...newSettings };
    global.siteSettings = siteSettings; // 更新全局变量
    
    console.log('站点设置已更新:', siteSettings);
    
    return NextResponse.json(
      { message: '设置已保存', settings: siteSettings },
      { status: 200 }
    );
  } catch (error) {
    console.error('保存设置错误:', error);
    return NextResponse.json(
      { error: '保存失败，请稍后重试' },
      { status: 500 }
    );
  }
}