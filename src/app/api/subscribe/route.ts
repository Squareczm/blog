import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'confirmed' | 'pending';
}

const subscribersFilePath = path.join(process.cwd(), 'data', 'subscribers.json');

function readSubscribers(): Subscriber[] {
  try {
    const data = fs.readFileSync(subscribersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取订阅者文件失败:', error);
    return [];
  }
}

function writeSubscribers(subscribers: Subscriber[]): void {
  try {
    fs.writeFileSync(subscribersFilePath, JSON.stringify(subscribers, null, 2));
  } catch (error) {
    console.error('写入订阅者文件失败:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    const subscribers = readSubscribers();
    
    // 检查是否已经订阅
    const existingSubscriber = subscribers.find((sub: Subscriber) => sub.email === email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: '该邮箱已经订阅过了' },
        { status: 400 }
      );
    }

    // 添加新订阅者
    const newSubscriber: Subscriber = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      status: 'confirmed' // 简化流程，直接设为已确认
    };

    subscribers.push(newSubscriber);
    writeSubscribers(subscribers);

    // 这里应该发送确认邮件，暂时跳过
    console.log('新订阅者:', newSubscriber);

    return NextResponse.json(
      { message: '订阅成功！感谢您的关注' },
      { status: 200 }
    );
  } catch (error) {
    console.error('订阅错误:', error);
    return NextResponse.json(
      { error: '订阅失败，请稍后重试' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = readSubscribers();
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error('获取订阅者失败:', error);
    return NextResponse.json(
      { error: '获取订阅者失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: '缺少订阅者ID' },
        { status: 400 }
      );
    }

    const subscribers = readSubscribers();
    const subscriberIndex = subscribers.findIndex((sub: Subscriber) => sub.id === id);
    if (subscriberIndex === -1) {
      return NextResponse.json(
        { error: '订阅者不存在' },
        { status: 404 }
      );
    }

    subscribers.splice(subscriberIndex, 1);
    writeSubscribers(subscribers);

    console.log('订阅者已删除:', id);

    return NextResponse.json(
      { message: '订阅者删除成功' },
      { status: 200 }
    );
  } catch (error) {
    console.error('删除订阅者失败:', error);
    return NextResponse.json(
      { error: '删除失败' },
      { status: 500 }
    );
  }
}