import { NextRequest, NextResponse } from 'next/server';

// 初始化全局变量
declare global {
  var contacts: any[] | undefined;
}

if (!global.contacts) {
  global.contacts = [];
}

export async function GET() {
  try {
    return NextResponse.json(
      { contacts: global.contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error('获取联系方式失败:', error);
    return NextResponse.json(
      { error: '获取联系方式失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { contact, type = 'phone' } = await request.json();

    if (!contact || contact.trim().length === 0) {
      return NextResponse.json(
        { error: '联系方式不能为空' },
        { status: 400 }
      );
    }

    const newContact = {
      id: Date.now().toString(),
      contact: contact.trim(),
      type: type as 'email' | 'wechat' | 'phone',
      createdAt: new Date().toISOString(),
    };

    global.contacts.push(newContact);

    return NextResponse.json(
      { success: true, message: '联系方式提交成功', data: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error('提交联系方式失败:', error);
    return NextResponse.json(
      { error: '提交联系方式失败' },
      { status: 500 }
    );
  }
} 