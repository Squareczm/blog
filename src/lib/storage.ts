import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const DATA_DIR = join(process.cwd(), 'data');

// 确保数据目录存在
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// 读取JSON文件
export async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    await ensureDataDir();
    const filePath = join(DATA_DIR, filename);
    
    if (!existsSync(filePath)) {
      // 如果文件不存在，创建默认文件
      await writeJsonFile(filename, defaultValue);
      return defaultValue;
    }
    
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`读取文件 ${filename} 失败:`, error);
    return defaultValue;
  }
}

// 写入JSON文件
export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  try {
    await ensureDataDir();
    const filePath = join(DATA_DIR, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`数据已保存到 ${filename}`);
  } catch (error) {
    console.error(`写入文件 ${filename} 失败:`, error);
    throw error;
  }
}

// 数据文件名常量
export const DATA_FILES = {
  ABOUT: 'about.json',
  POSTS: 'posts.json',
  ADMIN: 'admin.json',
  SUBSCRIBERS: 'subscribers.json',
  CONTACTS: 'contacts.json',
  SETTINGS: 'settings.json'
} as const;