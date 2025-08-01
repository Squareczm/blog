import { NextRequest, NextResponse } from 'next/server';
import { generateToken, authenticateRequest, setAuthCookie, clearAuthCookie } from '@/lib/auth';

interface AdminAccount {
  username: string;
  password: string;
  email: string;
  name: string;
  lastLoginAt?: string;
}

// 使用全局变量确保数据持久化
declare global {
  var adminAccount: AdminAccount | undefined;
}

// 初始化或使用现有的全局数据
if (!global.adminAccount) {
  global.adminAccount = {
    username: 'admin',
    password: 'password123',
    email: 'admin@ainovalife.com',
    name: '管理员',
    lastLoginAt: '2025-08-01T10:00:00Z'
  };
}

let adminAccount = global.adminAccount;

export async function GET(request: NextRequest) {
  // 验证认证
  const authResult = await authenticateRequest(request);
  if (!authResult.success) {
    return NextResponse.json(
      { error: authResult.error },
      { status: 401 }
    );
  }

  // 返回账号信息（不包含密码）
  const { password, ...accountInfo } = adminAccount;
  return NextResponse.json(accountInfo);
}

export async function PUT(request: NextRequest) {
  try {
    // 验证认证
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { action, ...updateData } = data;

    if (action === 'change-password') {
      const { currentPassword, newPassword } = updateData;
      
      if (adminAccount.password !== currentPassword) {
        return NextResponse.json(
          { error: '当前密码不正确' },
          { status: 400 }
        );
      }

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: '新密码长度至少为6位' },
          { status: 400 }
        );
      }

      adminAccount.password = newPassword;
      global.adminAccount = adminAccount; // 更新全局变量
      
      console.log('管理员密码已更新');
      
      return NextResponse.json(
        { message: '密码修改成功' },
        { status: 200 }
      );
    }

    if (action === 'update-profile') {
      const { username, email, name } = updateData;
      
      if (username) adminAccount.username = username;
      if (email) adminAccount.email = email;
      if (name) adminAccount.name = name;
      global.adminAccount = adminAccount; // 更新全局变量
      
      console.log('管理员信息已更新:', adminAccount);
      
      const { password, ...accountInfo } = adminAccount;
      return NextResponse.json(
        { message: '信息更新成功', data: accountInfo },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: '无效的操作' },
      { status: 400 }
    );
  } catch (error) {
    console.error('更新管理员信息失败:', error);
    return NextResponse.json(
      { error: '更新失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { action, username, password } = data;

    if (action === 'login') {
      if (adminAccount.username === username && adminAccount.password === password) {
        adminAccount.lastLoginAt = new Date().toISOString();
        global.adminAccount = adminAccount; // 更新全局变量
        
        // 生成 JWT Token
        const token = await generateToken({
          username: adminAccount.username,
          email: adminAccount.email,
          name: adminAccount.name,
          role: 'admin'
        });
        
        const { password: pwd, ...accountInfo } = adminAccount;
        
        const response = NextResponse.json(
          { success: true, message: '登录成功', data: accountInfo },
          { status: 200 }
        );
        
        // 设置认证 Cookie
        setAuthCookie(response, token);
        
        return response;
      } else {
        return NextResponse.json(
          { success: false, error: '用户名或密码错误' },
          { status: 401 }
        );
      }
    }

    if (action === 'logout') {
      const response = NextResponse.json(
        { success: true, message: '退出成功' },
        { status: 200 }
      );
      
      // 清除认证 Cookie
      clearAuthCookie(response);
      
      return response;
    }

    if (action === 'verify') {
      // 验证当前认证状态
      const authResult = await authenticateRequest(request);
      if (!authResult.success) {
        return NextResponse.json(
          { success: false, error: authResult.error },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { success: true, user: authResult.user },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: '无效的操作' },
      { status: 400 }
    );
  } catch (error) {
    console.error('登录验证失败:', error);
    return NextResponse.json(
      { success: false, error: '登录失败' },
      { status: 500 }
    );
  }
}