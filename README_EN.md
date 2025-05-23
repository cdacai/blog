# Cai Xiaohu Blog System

[English](./README_EN.md) | [简体中文](./README.md)

[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE)
[![Vue](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://github.com/vuejs/vue)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.2.7-brightgreen.svg)](https://github.com/spring-projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-blue.svg)](https://www.mysql.com/)
[![Redis](https://img.shields.io/badge/Redis-6.0+-red.svg)](https://redis.io/)

> A modern personal blog system built with Spring Boot + Vue, featuring content management, photo albums, and social interactions. The system adopts a front-end and back-end separation architecture, provides a complete admin panel, and supports both local and cloud storage.

Preview:
- Blog Frontend: [https://caixiaohu.com](https://caixiaohu.com)
- Admin Panel: [https://set.caixiaohu.com](https://set.caixiaohu.com) (Guest username: guest, password: 123456)

## Table of Contents

- [Main Features](#main-features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Notes](#notes)
- [Changelog](#changelog)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Main Features

- Content Management
  - Article Management: Markdown editing, auto-save, draft box
  - Dynamic Management: Post dynamics, image upload
  - Photo Album: Image management, one-click insertion, album categorization
  - Content Moderation: Text content review

- Social Interaction
  - Comment System: Comments, replies, likes
  - Comment Management: Comment moderation, report handling
  - Report System: Content reporting, report processing, result notification
  - Message System: Internal messages, email notifications

- User Experience
  - Mobile Adaptation: Responsive design, multi-device support
  - Interaction Optimization: Touch optimization, performance optimization
  - Interface Design: Clean and intuitive interface

## Screenshots

### Blog Frontend
- Home Page
  - ![Home Page](./pic/blog1.jpg)
- Article Detail
  - ![Article Detail](./pic/blog2.jpg)
- Dynamics
  - ![Dynamics](./pic/blog3.jpg)
- Archive
  - ![Archive](./pic/blog4.jpg)
- Comment Report
  - ![Comment Report](./pic/report.png)

### Admin Panel
- Login Page
  - ![Login Page](./pic/cms1.png)
- Admin Dashboard
  - ![Admin Dashboard](./pic/cms2.jpg)
- Editor Interface
  - ![Editor Interface](./pic/cms3.png)
- Photo Album Management
  - ![Photo Album Management](./pic/cms4.jpg)
- Message Center
  - ![Message Center](./pic/msgCenter.png)

## Quick Start

### Environment Requirements
- **Basic Environment**
  - JDK: 1.8+
  - MySQL: 5.7+ (utf8mb4 charset)
  - Redis: 6.0+
  - Node.js: 12.x+
  - Maven: 3.6+
  - NPM: 6.x+

- **Backend Technology**
  - Core Framework: Spring Boot 2.2.7.RELEASE
  - Security Framework: Spring Security
  - Database: MySQL 5.7+
  - Cache: Redis 6.0+
  - Token: jjwt 0.9.1
  - ORM: MyBatis + PageHelper
  - Content Moderation: Baidu Cloud Text Review API
  - Object Storage: Upyun SDK / Local File System
  - Task Scheduling: Quartz 2.3.2
  - Others:
    - Markdown Rendering: commonmark-java
    - IP Database: ip2region
    - UA Parser: yauaa

- **Frontend Technology**
  - Core Framework: Vue 2.6.x + Vue Router + Vuex
  - UI Components: Element UI 2.x
  - Build Tool: Vue CLI 4.x
  - HTTP: axios
  - Editor: mavonEditor
  - Visualization: echarts
  - Utilities:
    - dayjs (time handling)
    - lodash (utility functions)
    - v-viewer (image preview)
    - prismjs (code highlighting)

### Configuration

#### Core Configuration
- **Security Configuration**
  - `token.secretKey`: JWT key (modify default value)
  - Default admin: username `Admin`, password `123456`

- **Storage Configuration**
  - Local Storage: Configure `upload.path` and permissions
  - Upyun: Configure `bucketName` and other information

- **Third-party Services**
  - Baidu Content Moderation: Configure `baidu.content.*` (optional)
  - Email Service: Default QQ email, can switch to other providers

- **Task Scheduling Configuration**
  - Use database for task configuration
  - Table structure included in nblog.sql

### Development Environment Setup

1. Create MySQL database:
```sql
CREATE DATABASE nblog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Then execute `/blog-api/nblog.sql` to initialize table data

2. Create configuration file `/blog-api/src/main/resources/application-dev.properties` (for production environment, create `application-prd.properties`)
3. Copy `/blog-api/src/main/resources/application-dev.properties.template` to `application-dev.properties`
4. Modify and replace configuration information in `application-dev.properties`
5. Install and start Redis
6. Start backend service
7. Execute `npm install` in `blog-cms` and `blog-view` directories to install dependencies
8. Execute `npm run serve` in `blog-cms` and `blog-view` directories to start frontend and admin pages

## Notes

### Configuration Notes
- **Third-party Service Configuration**
  - Baidu Content Moderation: Apply for API key, optional
  - Upyun Storage: Apply for account and configure space, can use local storage
  - Email Service: Default QQ email configuration, can switch to other providers

## Changelog

### v2.0.0 (2025-05-21)
- Added message center, unified collection of comment/like/report history
- Optimized task scheduling system (based on Quartz), preventing constant restarts
- Optimized navigation paths, updated system icons, improved user interface

### v1.0.0 (2025-02-13)
- Optimized frontend interaction experience
- Redesigned interface style
- Added local image storage support
- Added photo album management module
- Integrated content moderation functionality

### Development Plan
- Editor upgrade: Replace with rich text editor
- Dynamic module enhancement: Support dynamic comments
- Theme customization: Support multiple theme templates

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

Thanks to the following open source projects:
- [Spring Boot](https://github.com/spring-projects/spring-boot)
- [Vue](https://github.com/vuejs/vue)
- [Element UI](https://github.com/ElemeFE/element)
- And all other open source dependencies mentioned in this README 