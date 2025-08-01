import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

// JWT 密钥 - 在生产环境中应该使用环境变量
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
);

// JWT 配置
const JWT_CONFIG = {
  issuer: 'ainovalife-admin',
  audience: 'ainovalife-admin',
  expiresIn: '24h',
};

// 生成 JWT Token
export async function generateToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_CONFIG.issuer)
    .setAudience(JWT_CONFIG.audience)
    .setExpirationTime(JWT_CONFIG.expiresIn)
    .sign(JWT_SECRET);
}

// 验证 JWT Token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
    });
    return payload;
  } catch (error) {
    return null;
  }
}

// 从请求中提取 Token
export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // 也支持从 cookie 中获取
  const token = request.cookies.get('admin-token')?.value;
  return token || null;
}

// 认证中间件
export async function authenticateRequest(request: NextRequest) {
  const token = extractToken(request);
  
  if (!token) {
    return { success: false, error: '未提供认证令牌' };
  }
  
  const payload = await verifyToken(token);
  if (!payload) {
    return { success: false, error: '无效的认证令牌' };
  }
  
  return { success: true, user: payload };
}

// 设置认证 Cookie
export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });
  return response;
}

// 清除认证 Cookie
export function clearAuthCookie(response: NextResponse) {
  response.cookies.delete('admin-token');
  return response;
} 