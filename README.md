# AInovalife - 个人网站系统

🚀 一个现代化的个人网站系统，基于 Next.js 15 和 TypeScript 构建，具有完整的前后台管理功能和强大的安全机制。

## ✨ 主要特性

### 🎨 前台功能
- **响应式设计** - 完美适配各种设备
- **动态内容管理** - 实时更新网站内容
- **文章系统** - 支持分类、标签、富文本编辑
- **项目展示** - 作品集展示和管理
- **联系表单** - 用户留言和联系方式收集
- **赞赏系统** - 支持二维码赞赏

### 🔧 后台管理
- **仪表盘** - 数据统计和快速操作
- **文章管理** - 完整的 CRUD 操作
- **内容管理** - 个人资料、技能、时间线
- **用户管理** - 联系方式、留言管理
- **站点设置** - 网站配置和个性化

### 🛡️ 安全机制
- **JWT 认证** - 安全的身份验证系统
- **多层保护** - 客户端、服务器端、中间件三重保护
- **路由保护** - 自动重定向未认证用户
- **Cookie 安全** - HttpOnly + Secure + SameSite
- **API 保护** - 所有管理员 API 需要认证

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

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

3. **环境配置**
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量（可选）
# JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
# NODE_ENV=development
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
- 前台: http://localhost:3001
- 后台: http://localhost:3001/admin
- 默认管理员账号: `admin` / `password123`

## 🧪 测试

### 运行单元测试
```bash
npm test
```

### 运行安全测试
```bash
npm run test:security
```

### 测试覆盖率
```bash
npm run test:coverage
```

## 📁 项目结构

```
personalweb/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # 后台管理页面
│   │   │   ├── about/         # 个人资料管理
│   │   │   ├── dashboard/     # 仪表盘
│   │   │   ├── messages/      # 留言管理
│   │   │   ├── posts/         # 文章管理
│   │   │   ├── settings/      # 站点设置
│   │   │   ├── subscribers/   # 联系方式管理
│   │   │   ├── account/       # 账号管理
│   │   │   └── login/         # 登录页面
│   │   ├── api/               # API 路由
│   │   │   ├── about/         # 关于页面API
│   │   │   ├── admin/         # 管理员API（JWT认证）
│   │   │   ├── contact/       # 联系方式API
│   │   │   ├── messages/      # 留言API
│   │   │   ├── posts/         # 文章API
│   │   │   ├── settings/      # 设置API
│   │   │   ├── subscribe/     # 订阅API
│   │   │   ├── sitemap/       # 站点地图API
│   │   │   └── upload/        # 文件上传API
│   │   ├── about/             # 关于页面
│   │   ├── archive/           # 文章归档
│   │   ├── category/          # 分类页面
│   │   ├── contact/           # 联系页面
│   │   ├── posts/             # 文章页面
│   │   ├── projects/          # 项目详情页
│   │   └── subscribe/         # 订阅页面
│   ├── components/            # React 组件
│   │   ├── CategorySection.tsx # 分类组件
│   │   ├── ContactForm.tsx    # 联系方式表单
│   │   ├── Footer.tsx         # 页脚组件
│   │   ├── Header.tsx         # 头部组件
│   │   ├── HeroSection.tsx    # 英雄区域
│   │   ├── ImageUpload.tsx    # 图片上传组件
│   │   ├── PostCard.tsx       # 文章卡片
│   │   ├── RichTextEditor.tsx # 富文本编辑器
│   │   ├── SubscribeForm.tsx  # 订阅表单
│   │   ├── SupportButton.tsx  # 赞赏按钮
│   │   └── SupportModal.tsx   # 赞赏弹窗
│   ├── lib/                   # 工具函数
│   │   ├── auth.ts           # JWT认证工具
│   │   ├── data.ts           # 数据管理
│   │   └── markdown.ts       # Markdown处理
│   ├── types/                # TypeScript类型定义
│   └── __tests__/            # 测试文件
├── public/                   # 静态资源
│   └── uploads/              # 上传文件
├── scripts/                  # 脚本文件
│   └── security-test.js      # 安全测试脚本
├── middleware.ts             # Next.js中间件
├── SECURITY.md              # 安全文档
└── package.json
```

## 🔒 安全特性

### 认证系统
- **JWT 令牌** - 使用 `jose` 库实现安全的 JWT
- **HttpOnly Cookie** - 防止 XSS 攻击
- **Secure Flag** - 生产环境强制 HTTPS
- **SameSite Strict** - 防止 CSRF 攻击
- **自动过期** - 24 小时令牌有效期

### 保护机制
- **中间件保护** - 自动拦截未认证请求
- **API 保护** - 所有管理员 API 需要认证
- **路由保护** - 自动重定向到登录页面
- **客户端保护** - 前端状态管理

### 安全测试
```bash
# 运行安全测试
npm run test:security

# 测试结果示例
✅ 未登录访问管理员页面 - 自动重定向
✅ 未登录访问管理员仪表盘 - 自动重定向  
✅ 访问登录页面 - 正常显示
✅ 访问公开页面 - 正常显示
```

## 📖 使用指南

### 前台功能

#### 首页
- 动态横幅图片
- 可编辑的网站标题和副标题
- 最新文章展示
- 联系方式提交功能

#### 关于页面
- 个性化头像和背景
- 可编辑的个人信息
- 技能标签展示
- 时间线展示
- 项目作品展示
- 动态联系信息
- 赞赏支持功能

#### 文章系统
- 分类浏览（AI、Nova、Life）
- 文章详情页
- 相关文章推荐
- 阅读时间估算
- 赞赏支持功能

#### 项目展示
- 项目列表展示
- 项目详情页
- 技术栈标签
- 演示和代码链接

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

#### 内容管理
- 个人资料编辑
- 技能标签管理
- 时间线管理
- 项目作品管理

#### 用户管理
- 联系方式管理
- 留言管理
- 订阅用户管理

#### 站点设置
- 网站标题和副标题
- 横幅图片配置
- 二维码设置
- 其他个性化配置

## 🔧 配置说明

### 环境变量
```bash
# JWT 配置
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024

# 应用配置
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3001

# NextAuth 配置
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3001
```

### 端口配置
默认使用 3001 端口，可在 `package.json` 中修改：
```json
{
  "scripts": {
    "dev": "next dev --turbopack -p 3001",
    "dev:3001": "next dev -p 3001"
  }
}
```

## 📝 API 文档

### 认证相关
- `POST /api/admin` - 管理员登录/验证/退出
- `GET /api/admin` - 获取管理员信息
- `PUT /api/admin` - 更新管理员信息

### 内容管理
- `GET /api/posts` - 获取文章列表
- `POST /api/posts` - 创建新文章
- `PUT /api/posts` - 更新文章
- `DELETE /api/posts` - 删除文章

### 用户管理
- `GET /api/contact` - 获取联系方式列表
- `POST /api/contact` - 添加联系方式
- `DELETE /api/contact` - 删除联系方式
- `GET /api/messages` - 获取留言列表
- `POST /api/messages` - 添加留言
- `DELETE /api/messages` - 删除留言

### 设置管理
- `GET /api/settings` - 获取站点设置
- `POST /api/settings` - 更新站点设置
- `GET /api/about` - 获取关于页面数据
- `PUT /api/about` - 更新关于页面数据

### 文件上传
- `POST /api/upload` - 上传图片文件

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

### 安全开发
- 所有管理员路由都需要认证
- 使用 JWT 令牌进行身份验证
- 实现多层安全保护机制

## 🐛 最近修复

- ✅ **安全漏洞修复** - 实现完整的 JWT 认证系统
- ✅ **路由保护** - 添加中间件保护所有管理员路由
- ✅ **API 安全** - 所有管理员 API 添加认证验证
- ✅ **Cookie 安全** - 使用 HttpOnly 和 Secure 标志
- ✅ **测试覆盖** - 添加完整的单元测试和安全测试

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 图标库
- [Jose](https://github.com/panva/jose) - JWT 库

## 📞 联系方式

- 项目地址: https://github.com/Squareczm/personalweb
- 问题反馈: [Issues](https://github.com/Squareczm/personalweb/issues)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！ 