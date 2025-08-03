/**
 * 为图片URL添加缓存破坏参数
 * @param src 原始图片URL
 * @param forceRefresh 是否强制刷新（添加时间戳）
 * @returns 处理后的图片URL
 */
export function getImageUrl(src: string, forceRefresh: boolean = false): string {
  if (!src) return '';
  
  // 如果是外部URL，直接返回
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // 如果是本地上传的图片且需要强制刷新，添加时间戳
  if (src.startsWith('/uploads/') && forceRefresh) {
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}t=${Date.now()}`;
  }
  
  return src;
}

/**
 * 检查图片是否为本地上传的图片
 * @param src 图片URL
 * @returns 是否为本地上传图片
 */
export function isLocalUpload(src: string): boolean {
  return src.startsWith('/uploads/');
}

/**
 * 获取图片的完整URL（用于测试）
 * @param src 图片路径
 * @param baseUrl 基础URL（可选）
 * @returns 完整的图片URL
 */
export function getFullImageUrl(src: string, baseUrl?: string): string {
  if (!src) return '';
  
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}${src}`;
}