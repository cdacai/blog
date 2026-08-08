# Cai Xiaohu Blog System

[简体中文](./README.md) | English

[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE)
[![Vue](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://github.com/vuejs/vue)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.2.7-brightgreen.svg)](https://github.com/spring-projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-blue.svg)](https://www.mysql.com/)
[![Redis](https://img.shields.io/badge/Redis-6.0+-red.svg)](https://redis.io/)

A personal blog system built with Spring Boot + Vue, featuring complete functionality and simple configuration.
Includes article management, comment system, album management, theme switching and other common features.

## Key Features
- Low configuration requirements, easy deployment
- Provides 8 different theme styles, freely switchable
- Stable functionality, continuously updated
- Suitable for personal blog use

## Featured Functions

### 1. Theme System
- Provides 8 different style themes
- One-click switching in admin panel
- Support for theme configuration saving

### 2. Album Management
- Image management and one-click insertion
- Album categorization and batch operations
- Support for both local and Upyun cloud storage

### 3. Content Security
- Integration with Baidu AI text review
- Support for content reporting and processing
- Result notification mechanism

### 4. Message Notifications
- Internal message reminders
- Email notification functionality
- Unified message management

### 5. Administrator Comment Mode
- After signing in to the admin panel, the administrator can reply on the public blog without entering a nickname or email address
- Administrator comments display an "Administrator" badge, and the avatar can be selected from existing avatars under Site Management
- Supports an HttpOnly identity cookie shared between `set.caixiaohu.com` and `www.caixiaohu.com`
- Comment content accepts 1–500 characters, including exactly 500 characters

### 6. Admin Interface Appearance
- [EXTEND] Dark mode covers the entire admin interface, including navigation, dashboard, lists, tables, forms, pagination, dialogs, notifications, album management, and Markdown editors
- System mode is the default, and the setting is stored as `site_setting.adminEditorAppearance`
- This setting applies only to `blog-cms` administration and does not change the public blog theme

Preview URLs:
- Blog Frontend: [https://caixiaohu.com](https://caixiaohu.com)
- Admin Backend: [https://set.caixiaohu.com](https://set.caixiaohu.com) (Guest username: guest, password: 123456)

## Theme Gallery

System provides 8 different style themes for selection:

<table>
  <tr>
    <td align="center">
      <strong>Elegant Theme</strong><br>
      <img src="./pic/theme-1-yazhi.png" width="400" alt="Elegant Theme"/>
    </td>
    <td align="center">
      <strong>Minimal Theme</strong><br>
      <img src="./pic/theme-2-jijian.png" width="400" alt="Minimal Theme"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Natural Theme</strong><br>
      <img src="./pic/theme-3-ziran.png" width="400" alt="Natural Theme"/>
    </td>
    <td align="center">
      <strong>Jade Theme</strong><br>
      <img src="./pic/theme-4-feicui.png" width="400" alt="Jade Theme"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Cyber Theme</strong><br>
      <img src="./pic/theme-5-saibo.png" width="400" alt="Cyber Theme"/>
    </td>
    <td align="center">
      <strong>Anime Theme</strong><br>
      <img src="./pic/theme-6-erciyuan.png" width="400" alt="Anime Theme"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Nightfall Theme</strong><br>
      <img src="./pic/theme-7-yemu.png" width="400" alt="Nightfall Theme"/>
    </td>
    <td align="center">
      <strong>Amber Theme</strong><br>
      <img src="./pic/theme-8-hupo.png" width="400" alt="Amber Theme"/>
    </td>
  </tr>
</table>

*One-click theme switching in admin panel to meet different usage needs*

## Table of Contents

- [Function List](#function-list)
- [System Screenshots](#system-screenshots)
- [Quick Start](#quick-start)
- [Changelog](#changelog)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Function List

**Content Management**
- Article editing (Markdown support)
- Dynamic publishing
- Album management
- Content review

**Comment System**
- Comment replies
- Administrator replies without visitor fields and with an administrator badge
- Selectable administrator comment avatar
- 1–500 character validation
- Like functionality
- Report processing
- Message notifications

**System Functions**
- Responsive design
- Mobile adaptation
- Theme switching
- Light and dark appearance across the entire admin interface
- Data statistics

## System Screenshots

### Frontend Pages
![Blog Homepage](./pic/blog1.jpg)
![Article Detail](./pic/blog2.jpg)
![Dynamic Page](./pic/blog3.jpg)
![Archive Page](./pic/blog4.jpg)
![Comment Report](./pic/report.png)
![Message Center](./pic/msgCenter.png)

### Admin Management
![Login Page](./pic/cms1.png)
![Management Interface](./pic/cms2.jpg)
![Article Editor](./pic/cms3.png)
![Album Management](./pic/cms4.jpg)

## Quick Start

1. On a fresh environment, import `blog-api/nblog.sql`. It creates the `nblog` database, 35 application and Quartz tables, and required seed data.
2. Start local MySQL and a passwordless local Redis, then verify that the datasource in the production base configuration can connect to the local database.
3. Start the backend from `blog-api` with the development overrides:
   ```powershell
   mvn spring-boot:run "-Dspring-boot.run.profiles=prd,dev"
   ```
4. Install dependencies and start `blog-cms` and `blog-view` separately:
   ```bash
   npm install
   npm run serve
   ```

Do not reverse the `prd,dev` order. `prd` supplies the complete base properties, and `dev` overrides local Redis, CORS, cookie, and storage settings last.

## Environment Requirements
- JDK 1.8+
- MySQL 5.7+ (utf8mb4 charset)
- Redis 6.0+
- Node.js 12.x+
- Maven 3.6+

## Configuration Guide

**Basic Configuration**
- JWT key: modify `token.secretKey` configuration
- Default admin: username `Admin`, password `123456`
- Local backend: use the combined `prd,dev` profiles and do not remove the production Redis password
- Production backend: use only the `prd` profile

**Storage Configuration**
- Local storage: configure `upload.path` directory
- Cloud storage: configure Upyun cloud related information

**Optional Configuration**
- Content review: configure Baidu AI API (optional)
- Email service: default QQ email, can be changed to other providers
- Scheduled tasks: configuration stored in database

## Deployment Steps

### 1. Database Initialization
For a fresh deployment, import the complete initialization file directly:
```bash
mysql -u root -p < blog-api/nblog.sql
```

`nblog.sql` drops and recreates tables with the same names. Never run it against an existing production database that contains data. Existing databases must use the incremental scripts under `blog-api/src/main/resources/db`.

### 2. Backend Configuration
Configure MySQL, Redis, CORS, JWT, cookie domain, and external service secrets in the production `application-prd.properties`. Local differences are stored in `application-dev.properties`, which contains no passwords.

### 3. Start Services
Local development:

```powershell
cd blog-api
mvn spring-boot:run "-Dspring-boot.run.profiles=prd,dev"
```

Production:

```bash
java -jar blog-api-0.0.1.jar --spring.profiles.active=prd
```

### 4. Frontend Deployment
Install dependencies in `blog-cms` and `blog-view` directories respectively:
```bash
cd blog-cms && npm install
cd blog-view && npm install
```

Start development services in `blog-cms` and `blog-view` directories respectively:
```bash
# Admin backend
cd blog-cms && npm run serve

# Blog frontend  
cd blog-view && npm run serve
```

Production build:
```bash
# Build admin backend
cd blog-cms && npm run build

# Build blog frontend
cd blog-view && npm run build
```

## Changelog

### v2.2.0 (2026-08-07)
- Added administrator comment mode, administrator badges, and a selectable comment avatar
- Standardized comment length validation to 1–500 characters
- Fixed administrator identity loss in nested replies and corrected cross-subdomain cookie behavior
- [EXTEND] Added system, light, and dark appearances across the entire admin interface
- Completed single-file database initialization, incremental upgrades, and the local `prd,dev` startup workflow

### v2.1.0 (2025-09-20)
- Added 4 new themes (Cyber, Anime, Nightfall, Amber) based on the original 4 themes
- Continued to improve theme system and switching functionality

### v2.0.0 (2025-06-09)
- Added theme saving and switching functionality, supporting multiple theme templates with one-click switching and saving, enhancing personalization experience. Entry: Admin Panel - System Management - Theme Settings

### v1.1.0 (2025-05-21)
- Added message center functionality
- Optimized scheduled task system
- Improved user interface

### v1.0.0 (2025-02-13)
- Improved frontend interaction functionality
- Redesigned interface
- Support for local image storage
- Added album management
- Integrated content review

### Development Plan
- Enhanced theme personalization features
- Editor functionality upgrades  
- Dynamic comment functionality improvements

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

Thanks to the following open source projects:
- [Spring Boot](https://github.com/spring-projects/spring-boot)
- [Vue](https://github.com/vuejs/vue)  
- [Element UI](https://github.com/ElemeFE/element)

---
[![GitHub stars](https://img.shields.io/github/stars/cdacai/blog.svg?style=social)](https://github.com/cdacai/blog)

If you have any questions, please submit an issue. Thank you for your support!
