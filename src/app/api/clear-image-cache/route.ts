import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // 清理 Next.js 图片缓存目录（如果存在）
    const cacheDir = path.join(process.cwd(), '.next/cache/images');
    
    if (fs.existsSync(cacheDir)) {
      // 递归删除缓存目录中的所有文件
      const deleteRecursive = (dir: string) => {
        if (fs.existsSync(dir)) {
          fs.readdirSync(dir).forEach((file) => {
            const curPath = path.join(dir, file);
            if (fs.lstatSync(curPath).isDirectory()) {
              deleteRecursive(curPath);
            } else {
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(dir);
        }
      };
      
      deleteRecursive(cacheDir);
      console.log('图片缓存已清理');
    }

    return NextResponse.json({ 
      success: true, 
      message: '图片缓存已清理',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('清理图片缓存失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: '清理图片缓存失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // 检查上传目录中的图片文件
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    const files = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
    
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    ).map(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        modified: stats.mtime.toISOString(),
        url: `/uploads/${file}`
      };
    });

    return NextResponse.json({
      success: true,
      images: imageFiles,
      total: imageFiles.length
    });
  } catch (error) {
    console.error('获取图片列表失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: '获取图片列表失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}