import { NextRequest, NextResponse } from 'next/server';

// 使用全局变量确保数据在服务器重启时持久化
declare global {
  var subscribers: Array<{ id: string; email: string; subscribedAt: string; status: 'confirmed' | 'pending' }> | undefined;
}

// 初始化或使用现有的全局数据
if (!global.subscribers) {
  global.subscribers = [];
}

let subscribers = global.subscribers;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    // 检查是否已经订阅
    const existingSubscriber = subscribers.find(sub => sub.email === email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: '该邮箱已经订阅过了' },
        { status: 400 }
      );
    }

    // 添加新订阅者
    const newSubscriber = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      status: 'confirmed' as const // 简化流程，直接设为已确认
    };

    subscribers.push(newSubscriber);
    global.subscribers = subscribers; // 更新全局变量

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
  return NextResponse.json({ subscribers });
} 