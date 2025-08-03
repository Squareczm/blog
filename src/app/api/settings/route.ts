import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');

function readSettings(): SiteSettings {
  try {
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取设置文件失败:', error);
    // 返回默认设置
    return {
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
}

function writeSettings(settings: SiteSettings): void {
  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('写入设置文件失败:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const settings = readSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('获取设置失败:', error);
    return NextResponse.json(
      { error: '获取设置失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json();
    const currentSettings = readSettings();
    
    // 更新设置
    const updatedSettings = { ...currentSettings, ...newSettings };
    writeSettings(updatedSettings);
    
    console.log('站点设置已更新:', updatedSettings);
    
    return NextResponse.json(
      { message: '设置已保存', settings: updatedSettings },
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