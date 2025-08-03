# 图片上传无法显示问题诊断与解决方案

## 环境说明
- 部署方式：PM2 `npm start`
- 上传接口：`POST /api/upload`
- 访问接口：`GET /uploads/[fileName]`

## 问题现象
1. 图片上传接口返回 `200`，并带有 `url` 字段（如 `http://localhost:3000/uploads/xxxx.png`）。
2. 页面尝试加载该 URL 时出现 `ERR_CONNECTION_REFUSED` 或 `404`，图片无法显示。
3. 创建页面、文章等功能正常。

## 根本原因
### 1. 绝对 URL 指向错误域名/端口（最常见）
`src/app/api/upload/route.ts` 生成链接时：
```ts
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const fileUrl = `${baseUrl}/uploads/${fileName}`;
```
生产环境未设置 `NEXT_PUBLIC_BASE_URL` → 默认 `http://localhost:3000` → 浏览器请求本机而非服务器。

### 2. 上传目录的持久化与权限
- 图片写入 `public/uploads`；若目录不可写或容器/CI 部署覆盖，文件可能丢失。

### 3. 反向代理端口不一致
- Nginx/Caddy 将 80/443 转发到 3000，但上传 URL 包含 3000 端口，直接通过 80/443 访问会 404/拒绝连接。

## 解决方案一览
| 优先级 | 方案 | 说明 |
| ------ | ---- | ---- |
| ★★★ | 设置 `NEXT_PUBLIC_BASE_URL` | `.env.production` 或 PM2 json 中设置实际域名，如 `https://your-domain.com`，重新构建并重启 |
| ★★☆ | 改为返回 **相对路径** | 上传接口返回 `/uploads/${fileName}`，前端直接使用，天然兼容域名与端口 |
| ★★☆ | 前端使用 `window.location.origin` 拼接 | 客户端构造绝对地址，无需后端硬编码 |
| ★★☆ | 反向代理映射 `/uploads` | Nginx `alias /app/public/uploads/` 确保静态文件可访问 |
| ★☆☆ | 持久化 `public/uploads` | 挂载卷或云存储，确保文件不会因重启丢失 |

## 推荐实施步骤
1. **✅ 已实施：接口改造（相对路径）**
   ```ts
   // upload/route.ts - 已修改
   // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; (已删除)
   const fileUrl = `/uploads/${fileName}`; // 现在返回相对路径
   ```
   **优势**：自动适配任何域名和端口，无需配置环境变量

2. **(备选) 环境变量方案**
   ```bash
   export NEXT_PUBLIC_BASE_URL=https://your-domain.com
   npm run build
   pm2 restart app
   ```
3. **(可选) Nginx 配置**
   ```nginx
   location /uploads/ {
     alias /path/to/app/public/uploads/;
   }
   ```
4. **权限与持久化**
   ```bash
   chmod -R 755 public/uploads
   ```
   或 Docker `-v uploads:/app/public/uploads`。
5. **验证**
   上传图片 → 访问 `https://your-domain.com/uploads/<file>` 应返回 200 并显示。

完成以上步骤后，图片上传与显示问题应得到彻底解决，并保证在多实例/重启场景下依然可用。