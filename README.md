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
- **文章系统** - 支持分类、标签、富文本编辑、相关文章推荐
- **项目展示** - 项目详情页、技术栈展示、演示链接
- **用户交互** - 联系方式提交、留言反馈、赞赏支持
- **二维码功能** - 公众号关注、请杯咖啡二维码展示
- **SEO优化** - 针对搜索引擎优化

### 🔧 后台管理
- **内容管理** - 文章的增删改查、状态管理、富文本编辑
- **联系方式管理** - 支持邮箱、微信、电话等多种联系方式
- **留言管理** - 留言查看、回复、删除
- **个人资料** - 头像、背景、联系信息、技能标签编辑
- **时间线管理** - 个人经历时间线增删改查
- **项目管理** - 项目作品增删改查、详情编辑
- **站点设置** - 网站标题、副标题、关于文字、图片等配置
- **账号管理** - 管理员密码修改

### 📱 技术特性
- **实时数据同步** - 前后台数据实时更新，支持文章删除后前台立即更新
- **图片上传** - 支持本地图片上传和URL输入
- **富文本编辑** - 内置富文本编辑器，支持格式化
- **数据持久化** - 开发环境数据持久化
- **自动刷新** - 智能数据刷新机制
- **编辑状态管理** - 防止编辑时数据被覆盖
- **缓存优化** - 使用 `cache: 'no-store'` 确保数据实时性
- **错误处理** - 完善的错误处理和用户反馈机制

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

### 🐛 最近修复的问题

- ✅ **前台数据同步问题** - 修复了后台删除文章后前台页面不更新的问题
- ✅ **客户端组件错误** - 修复了 `Footer.tsx` 缺少 `"use client"` 指令的问题
- ✅ **HTML 结构错误** - 修复了嵌套 `<a>` 标签的 HTML 验证错误
- ✅ **图片配置警告** - 更新了 `next.config.ts` 中的 `images.domains` 为 `images.remotePatterns`
- ✅ **API 错误处理** - 增强了 API 调用的错误处理和调试信息

## 📖 使用指南

### 前台功能

#### 首页
- 动态横幅图片
- 可编辑的网站标题和副标题
- 支持换行和文字对齐
- 最新文章展示
- 联系方式提交功能

#### 关于页面
- 个性化头像和背景
- 可编辑的个人信息
- 技能标签展示
- 时间线展示
- 项目作品展示（支持详情页）
- 动态联系信息
- 赞赏支持功能

#### 文章系统
- 分类浏览（AI、Nova、Life）
- 文章详情页
- 相关文章推荐
- 阅读时间估算
- 赞赏支持功能
- 实时数据同步（删除文章后前台立即更新）

#### 项目展示
- 项目列表展示
- 项目详情页
- 技术栈标签
- 演示和代码链接
- 赞赏支持功能

#### 用户交互
- 联系方式提交（支持邮箱、微信、电话）
- 留言反馈系统
- 二维码查看功能

### 后台管理

#### 仪表盘
- 数据统计概览
- 最新文章和留言
- 快速操作入口

#### 文章管理
- 文章列表查看
- 新增文章（支持富文本编辑）
- 编辑现有文章
- 文章状态管理
- 封面图片上传

#### 联系方式管理
- 联系方式列表（邮箱、微信、电话）
- 联系方式类型筛选
- 联系方式删除
- 数据导出功能

#### 留言管理
- 留言列表查看
- 留言详情查看
- 留言删除功能

#### 个人资料
- 头像上传
- 背景图片设置
- 基本信息编辑
- 技能标签管理
- 时间线管理（增删改查）
- 项目作品管理（增删改查）

#### 站点设置
- 网站标题和副标题
- 文字对齐设置
- 关于AInovalife介绍文字
- 横幅图片配置
- 公众号二维码设置
- 请杯咖啡二维码设置

#### 账号管理
- 管理员密码修改
- 登录验证

## 📁 项目结构

```
ainova-life/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # 后台管理页面
│   │   │   ├── about/         # 个人资料管理
│   │   │   ├── messages/      # 留言管理
│   │   │   ├── posts/         # 文章管理
│   │   │   ├── settings/      # 站点设置
│   │   │   ├── subscribers/   # 联系方式管理
│   │   │   └── login/         # 登录页面
│   │   ├── api/               # API 路由
│   │   │   ├── about/         # 关于页面API
│   │   │   ├── admin/         # 管理员API
│   │   │   ├── contact/       # 联系方式API
│   │   │   ├── messages/      # 留言API
│   │   │   ├── posts/         # 文章API
│   │   │   ├── settings/      # 设置API
│   │   │   ├── subscribe/     # 订阅API
│   │   │   └── upload/        # 文件上传API
│   │   ├── about/             # 关于页面
│   │   ├── contact/           # 联系页面
│   │   ├── posts/             # 文章页面
│   │   ├── projects/          # 项目详情页
│   │   └── category/          # 分类页面
│   ├── components/            # React 组件
│   │   ├── ContactForm.tsx    # 联系方式表单
│   │   ├── Footer.tsx         # 页脚组件
│   │   ├── Header.tsx         # 头部组件
│   │   ├── ImageUpload.tsx    # 图片上传组件
│   │   ├── RichTextEditor.tsx # 富文本编辑器
│   │   └── SupportButton.tsx  # 赞赏按钮
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

### 联系方式管理
- `GET /api/contact` - 获取联系方式列表
- `POST /api/contact` - 添加联系方式
- `DELETE /api/contact` - 删除联系方式

### 留言管理
- `GET /api/messages` - 获取留言列表
- `POST /api/messages` - 添加留言
- `DELETE /api/messages` - 删除留言

### 订阅管理
- `GET /api/subscribe` - 获取订阅用户
- `POST /api/subscribe` - 添加订阅用户
- `DELETE /api/subscribe` - 删除订阅用户

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
  var posts: any[] | undefined;
  var contacts: any[] | undefined;
  var messages: any[] | undefined;
  var aboutData: any | undefined;
  var adminAccount: any | undefined;
}
```

### 样式定制
使用 Tailwind CSS 进行样式定制，支持响应式设计。

### 编辑状态管理
为防止编辑时数据被自动刷新覆盖，实现了编辑状态管理：
```typescript
const [isEditing, setIsEditing] = useState(false);
// 编辑时暂停自动刷新
useEffect(() => {
  if (!isEditing) {
    fetchData();
  }
}, [isEditing]);
```

### 数据同步机制
为确保前后台数据实时同步，实现了以下机制：
```typescript
// 使用 cache: 'no-store' 避免缓存
const response = await fetch('/api/posts?status=published', {
  cache: 'no-store',
  headers: {
    'Cache-Control': 'no-cache',
  },
});
```

### 错误处理
完善的错误处理和用户反馈机制：
- API 调用错误处理
- 加载状态显示
- 用户友好的错误提示
- 重试机制

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