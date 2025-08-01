import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 只对管理员路由进行保护
  if (pathname.startsWith('/admin')) {
    // 登录页面不需要验证
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // 检查认证 Cookie
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      // 没有认证令牌，重定向到登录页面
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // 验证令牌（这里我们只做基本检查，详细验证在API层面）
    try {
      // 简单的令牌格式检查
      if (!token.includes('.')) {
        throw new Error('Invalid token format');
      }
      
      // 继续到下一个中间件或页面
      return NextResponse.next();
    } catch (error) {
      // 令牌无效，重定向到登录页面
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      
      // 清除无效的认证 Cookie
      response.cookies.delete('admin-token');
      
      return response;
    }
  }

  // 非管理员路由，继续正常处理
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下开头的路径：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 