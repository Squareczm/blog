# 数据目录说明

这个目录包含项目的持久化数据文件。

## 文件说明

- `about.json` - 个人信息和简介数据
- `posts.json` - 博客文章数据
- `settings.json` - 网站设置数据
- `contacts.json` - 联系方式数据
- `subscribers.json` - 订阅者数据
- `admin.json` - 管理员账户数据
- `messages.json` - 留言数据

## 初始化说明

如果你是第一次克隆项目，这些文件可能不存在或为空。项目会自动创建默认数据。

## 图片文件

项目中的示例图片位于 `public/uploads/demo-*` 文件中，这些是为了演示目的而包含的示例图片。

实际使用时，用户上传的图片会保存在 `public/uploads/` 目录中，但不会被 Git 跟踪（除了 demo- 前缀的示例文件）。