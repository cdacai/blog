# 蔡小虎博客系统

[English](./README_EN.md) | 简体中文

[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE)
[![Vue](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://github.com/vuejs/vue)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.2.7-brightgreen.svg)](https://github.com/spring-projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-blue.svg)](https://www.mysql.com/)
[![Redis](https://img.shields.io/badge/Redis-6.0+-red.svg)](https://redis.io/)

基于Spring Boot与Vue的现代化博客系统，适合个人和团队快速搭建高颜值、可定制的内容平台。
支持主题切换、文章与评论管理、相册展示、数据统计、内容审核、消息通知、定时任务等丰富功能，助你高效运营和美化个人博客。

## 为什么选择蔡小虎博客系统？
- 极致轻量，低配置要求，适合大多数环境
- 多套主题模板，后台一键切换，个性化十足
- 持续维护，功能持续升级
- 完善的内容与互动体验

## 特色功能

### 1. 主题切换与个性化
- 内置4套精美预置主题，后台一键切换，实时预览
- 支持主题保存，后续将支持主题色自定义、背景点缀等个性化设置
- 让你轻松美化专属博客

### 2. 消息中心
- 统一收纳评论、点赞、举报等历史消息
- 支持站内消息和邮件通知
- 消息分类展示和状态管理

### 3. 相册管理
- 图片管理与一键插入
- 相册分类与批量操作
- 支持本地和又拍云双存储

### 4. 内容安全
- 集成百度智能云文本审核
- 支持内容举报与处理
- 结果通知机制

### 5. 存储方案
- 本地文件系统与又拍云对象存储灵活切换
- 可配置存储策略

预览地址：
- 博客前台：[https://caixiaohu.com](https://caixiaohu.com)
- 管理后台：[https://set.caixiaohu.com](https://set.caixiaohu.com)（访客用户名：guest，密码：123456）

## 目录

- [主要功能](#主要功能)
- [系统截图](#系统截图)
- [快速开始](#快速开始)
- [注意事项](#注意事项)
- [更新日志](#更新日志)
- [许可证](#许可证)
- [致谢](#致谢)

主要功能：
- 内容管理
  - 文章管理：支持Markdown编辑、自动保存、草稿箱
  - 动态管理：支持发布动态、图片上传
  - 相册管理：支持图片管理、一键插入、相册分类
  - 内容审核：支持文本内容审核

- 评论互动
  - 评论功能：支持评论、回复、点赞
  - 评论管理：支持评论审核、举报处理
  - 举报功能：支持内容举报、举报处理、结果通知
  - 消息通知：支持站内消息、邮件通知

- 用户体验
  - 移动端适配：响应式设计，支持各种设备
  - 交互优化：触摸操作优化，性能优化
  - 界面设计：简洁美观，操作便捷

## 系统截图

### 博客前台
- 博客首页
  - ![博客首页](./pic/blog1.jpg)
- 文章详情
  - ![文章详情](./pic/blog2.jpg)
- 动态
  - ![动态](./pic/blog3.jpg)
- 归档
  - ![归档](./pic/blog4.jpg)
- 评论举报
  - ![评论举报](./pic/report.png)
- 消息中心
  - ![消息中心](./pic/msgCenter.png)
- 主题切换
  - ![主题切换](./pic/theme-switch.png)

### 后台管理
- 登录首页
  - ![登录首页](./pic/cms1.png)
- 后台管理
  - ![后台管理](./pic/cms2.jpg)
- 撰写界面
  - ![撰写界面](./pic/cms3.png)
- 相册管理
  - ![相册管理](./pic/cms4.jpg)

## 快速开始

1. 初始化数据库并导入表结构（/blog-api/nblog.sql）
2. 复制并配置 /blog-api/src/main/resources/application-dev.properties
3. 前后端（blog-cms、blog-view）分别安装依赖并启动：
   ```bash
   npm install
   npm run serve
   ```

## 环境要求
- **基础环境**
  - JDK: 1.8+（低配置要求，适合大多数电脑和服务器）
  - MySQL: 5.7+（utf8mb4字符集）
  - Redis: 6.0+
  - Node.js: 12.x+
  - Maven: 3.6+
  - NPM: 6.x+

## 核心配置
- **安全配置**
  - `token.secretKey`: JWT密钥（需修改默认值）
  - 默认管理员：用户名`Admin`，密码`123456`

- **存储配置**
  - 本地存储：配置`upload.path`和权限
  - 又拍云：配置`bucketName`等信息

- **第三方服务**
  - 百度内容审核：配置`baidu.content.*`（可选）
  - 邮件服务：默认QQ邮箱，可切换其他服务商

- **定时任务配置**
  - 使用数据库存储任务配置
  - 表结构已内置在nblog.sql中

## 开发环境搭建
1. 创建 MySQL 数据库：
```sql
CREATE DATABASE nblog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
然后执行`/blog-api/nblog.sql`初始化表数据

2. 创建配置文件`/blog-api/src/main/resources/application-dev.properties`（生产环境需要创建`application-prd.properties`）
3. 复制`/blog-api/src/main/resources/application-dev.properties.template`到`application-dev.properties`
4. 修改替换`application-dev.properties`中的配置信息
5. 安装 Redis 并启动
6. 启动后端服务
7. 分别在`blog-cms`和`blog-view`目录下执行`npm install`安装依赖
8. 分别在`blog-cms`和`blog-view`目录下执行`npm run serve`启动前后台页面

## 更新日志

### v2.0.0 (2025-06-09)
- 新增主题保存与切换功能，支持多套主题模板一键切换并保存，提升个性化体验，美化你的网站。入口：后台管理-系统管理-主题设置

### v1.1.0 (2025-05-21)
- 新增消息中心功能，统一收纳评论点赞举报的历史消息
- 优化定时任务系统（基于Quartz），防止不断重启
- 优化导航路径,更新系统图标,优化用户界面

### v1.0.0 (2025-02-13)
- 优化前端交互体验
- 重新设计界面风格
- 支持本地图片存储
- 增加相册管理模块
- 集成内容审核功能

### 开发计划
- 主题个性化升级：即将支持主题色自定义、背景点缀图案开关等功能
- 编辑器升级：替换为富文本编辑器
- 动态模块完善：支持动态评论功能
- 欢迎star和issue，功能持续更新中！

## 许可证

本项目基于MIT许可证开源，详见 [LICENSE](./LICENSE) 文件。

## 致谢

感谢以下开源项目：
- [Spring Boot](https://github.com/spring-projects/spring-boot)
- [Vue](https://github.com/vuejs/vue)
- [Element UI](https://github.com/ElemeFE/element)
- 以及 README 中提到的所有开源依赖项目
- 你的star和建议是我们持续优化的动力！

---
如果你喜欢本项目，欢迎star支持！你的支持是我们持续优化的动力！[![GitHub stars](https://img.shields.io/github/stars/cdacai/blog.svg?style=social)](https://github.com/cdacai/blog)

欢迎反馈和参与贡献！
