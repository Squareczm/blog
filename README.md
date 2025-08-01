# AInovalife - 个人博客系统

一个现代化的个人博客平台，基于 Next.js 15 和 TypeScript 构建，支持内容管理、用户交互和个性化定制。

![AInovalife](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ 功能特性

### 🎨 前台功能
- **响应式设计** - 完美适配桌面端和移动端
- **动态内容管理** - 支持多行标题、文字对齐、换行显示
- **个性化设置** - 可自定义头像、背景图片、联系信息
- **文章系统** - 支持分类、标签、富文本编辑
- **用户交互** - 邮箱订阅、留言反馈
- **SEO优化** - 针对搜索引擎优化

### 🔧 后台管理
- **内容管理** - 文章的增删改查、状态管理
- **用户管理** - 订阅用户管理、留言处理
- **个人资料** - 头像、背景、联系信息编辑
- **站点设置** - 网站标题、副标题、图片等配置
- **账号管理** - 管理员密码修改

### 📱 技术特性
- **实时数据同步** - 前后台数据实时更新
- **图片上传** - 支持本地图片上传和URL输入
- **富文本编辑** - 内置富文本编辑器
- **数据持久化** - 开发环境数据持久化
- **自动刷新** - 智能数据刷新机制

## 🛠️ 技术栈

### 前端
- **Next.js 15** - React 全栈框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 现代化图标库

### 后端
- **Next.js API Routes** - 服务端 API
- **Node.js** - JavaScript 运行时
- **内存存储** - 开发环境数据存储

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **SWC** - 快速编译

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/Squareczm/personalweb.git
cd personalweb
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev:3001
```

4. **访问应用**
- 前台: http://localhost:3001
- 后台: http://localhost:3001/admin
- 默认管理员账号: `admin` / `admin123`

## 📖 使用指南

### 前台功能

#### 首页
- 动态横幅图片
- 可编辑的网站标题和副标题
- 支持换行和文字对齐
- 最新文章展示

#### 关于页面
- 个性化头像和背景
- 可编辑的个人信息
- 技能标签展示
- 时间线展示
- 项目作品展示
- 动态联系信息

#### 文章系统
- 分类浏览
- 文章详情页
- 相关文章推荐
- 阅读时间估算

#### 用户交互
- 邮箱订阅功能
- 留言反馈系统

### 后台管理

#### 仪表盘
- 数据统计概览
- 最新文章和留言
- 快速操作入口

#### 文章管理
- 文章列表查看
- 新增文章（支持富文本编辑）
- 文章状态管理
- 封面图片上传

#### 用户管理
- 订阅用户列表
- 留言管理
- 用户状态处理

#### 个人资料
- 头像上传
- 背景图片设置
- 基本信息编辑
- 技能标签管理
- 时间线管理
- 项目作品管理

#### 站点设置
- 网站标题和副标题
- 文字对齐设置
- 横幅图片配置
- 二维码设置

## 📁 项目结构

```
ainova-life/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # 后台管理页面
│   │   ├── api/               # API 路由
│   │   ├── about/             # 关于页面
│   │   ├── contact/           # 联系页面
│   │   ├── posts/             # 文章页面
│   │   └── category/          # 分类页面
│   ├── components/            # React 组件
│   └── lib/                   # 工具函数
├── public/                    # 静态资源
│   └── uploads/               # 上传文件
├── package.json
└── README.md
```

## 🔧 配置说明

### 环境变量
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### 端口配置
默认使用 3001 端口，可在 `package.json` 中修改：
```json
{
  "scripts": {
    "dev:3001": "next dev -p 3001"
  }
}
```

## 📝 API 文档

### 文章管理
- `GET /api/posts` - 获取文章列表
- `POST /api/posts` - 创建新文章
- `PUT /api/posts` - 更新文章
- `DELETE /api/posts` - 删除文章

### 用户管理
- `GET /api/subscribe` - 获取订阅用户
- `POST /api/subscribe` - 添加订阅用户
- `GET /api/messages` - 获取留言
- `POST /api/messages` - 添加留言

### 设置管理
- `GET /api/settings` - 获取站点设置
- `POST /api/settings` - 更新站点设置
- `GET /api/about` - 获取关于页面数据
- `PUT /api/about` - 更新关于页面数据

### 文件上传
- `POST /api/upload` - 上传图片文件

### 管理员
- `GET /api/admin` - 获取管理员信息
- `PUT /api/admin` - 更新管理员信息
- `POST /api/admin` - 管理员登录

## 🎯 开发指南

### 添加新功能
1. 在 `src/app/api/` 下创建 API 路由
2. 在 `src/components/` 下创建组件
3. 在 `src/app/` 下创建页面
4. 更新类型定义和接口

### 数据持久化
项目使用全局变量进行数据持久化：
```typescript
declare global {
  var siteSettings: any | undefined;
}
```

### 样式定制
使用 Tailwind CSS 进行样式定制，支持响应式设计。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 图标库
- [Unsplash](https://unsplash.com/) - 示例图片

## 📞 联系方式

- 项目地址: [https://github.com/Squareczm/personalweb](https://github.com/Squareczm/personalweb)
- 问题反馈: [Issues](https://github.com/Squareczm/personalweb/issues)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！ 