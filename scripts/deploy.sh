#!/bin/bash

# 部署脚本 - 确保数据同步和正确构建

echo "🚀 开始部署流程..."

# 1. 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 2. 安装依赖
echo "📦 安装依赖..."
npm ci

# 3. 检查数据文件是否存在
echo "🔍 检查数据文件..."
if [ ! -f "data/posts.json" ]; then
    echo "⚠️  警告: data/posts.json 不存在，创建默认文件..."
    mkdir -p data
    echo '[]' > data/posts.json
fi

if [ ! -f "data/settings.json" ]; then
    echo "⚠️  警告: data/settings.json 不存在，创建默认文件..."
    echo '{}' > data/settings.json
fi

# 4. 确保上传目录存在
echo "📁 确保上传目录存在..."
mkdir -p public/uploads

# 5. 运行测试
echo "🧪 运行测试..."
npm test

# 6. 构建项目
echo "🔨 构建项目..."
npm run build

# 7. 启动生产服务器
echo "🌟 启动生产服务器..."
npm start

echo "✅ 部署完成！"