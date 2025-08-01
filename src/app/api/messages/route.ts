import { NextRequest, NextResponse } from 'next/server';

// 使用全局变量确保数据持久化
declare global {
  var messages: Array<{ id: string; email: string; content: string; receivedAt: string; status: 'unread' | 'read' }> | undefined;
}

// 初始化或使用现有的全局数据
if (!global.messages) {
  global.messages = [];
}

let messages = global.messages;

export async function POST(request: NextRequest) {
  try {
    const { email, content } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    if (!content || content.trim().length < 10) {
      return NextResponse.json(
        { error: '留言内容至少需要10个字符' },
        { status: 400 }
      );
    }

    // 添加新留言
    const newMessage = {
      id: Date.now().toString(),
      email,
      content: content.trim(),
      receivedAt: new Date().toISOString(),
      status: 'unread' as const
    };

    messages.push(newMessage);
    global.messages = messages; // 更新全局变量

    console.log('新留言:', newMessage);

    return NextResponse.json(
      { message: '留言已收到，感谢您的反馈！' },
      { status: 200 }
    );
  } catch (error) {
    console.error('留言错误:', error);
    return NextResponse.json(
      { error: '留言失败，请稍后重试' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ messages });
} 