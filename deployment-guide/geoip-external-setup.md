# GeoIP数据库外部部署指南

## 概述

系统使用GeoIP数据库进行IP地址解析，必须配置外部GeoIP数据库文件。本指南将帮助您正确部署GeoIP数据库文件。

## 步骤

### 1. 准备GeoIP数据库文件

从MaxMind官方网站下载GeoLite2-City数据库：
- 访问 https://dev.maxmind.com/geoip/geolite2-free-geolocation-data
- 注册账号并下载`GeoLite2 City`数据库

### 2. 创建外部存储目录

在服务器上创建目录用于存放GeoIP数据库文件。可以使用绝对路径或相对路径：

**绝对路径：**

**Linux环境：**
```bash
sudo mkdir -p /opt/blog/data
sudo chown -R your_app_user:your_app_group /opt/blog/data
```

**Windows环境：**
```cmd
mkdir D:\data
```

**相对路径：**

在项目根目录或与blog-api同级的目录中创建：
```bash
# 在项目根目录创建
mkdir -p geoip

# 或在blog-api同级目录创建
mkdir -p ../geoip
```

### 3. 复制数据库文件

将GeoIP数据库文件复制到创建的目录中：

**绝对路径：**

**Linux环境：**
```bash
sudo cp GeoLite2-City.mmdb /opt/blog/data/
sudo chmod 644 /opt/blog/data/GeoLite2-City.mmdb
```

**Windows环境：**
```cmd
copy GeoLite2-City.mmdb D:\data\
```

**相对路径：**
```bash
# 复制到项目根目录下的geoip目录
cp GeoLite2-City.mmdb ./geoip/

# 或复制到blog-api同级的geoip目录
cp GeoLite2-City.mmdb ../geoip/
```

### 4. 配置应用程序

在应用程序的配置文件中设置GeoIP数据库的路径：

**绝对路径：**
```properties
# Linux
blog.geoip.db.path=/opt/blog/data/GeoLite2-City.mmdb

# Windows
blog.geoip.db.path=D:/data/GeoLite2-City.mmdb
```

**相对路径：**
```properties
# 项目根目录下的geoip目录
blog.geoip.db.path=./geoip/GeoLite2-City.mmdb

# 或blog-api同级的geoip目录
blog.geoip.db.path=../geoip/GeoLite2-City.mmdb
```

### 5. 部署应用程序

正常部署应用程序。应用程序启动时会：
1. 检查配置的路径
2. 如果是相对路径，自动转换为绝对路径
3. 加载GeoIP数据库文件
4. 如果数据库文件不存在或无法访问，应用将无法启动

### 6. 验证配置

检查应用程序日志，确认GeoIP数据库是否正确加载：

- 如果看到 `将相对路径 ../geoip/GeoLite2-City.mmdb 转换为绝对路径: /absolute/path/to/geoip/GeoLite2-City.mmdb`，表示相对路径已成功转换
- 如果看到 `从外部路径加载GeoIP数据库成功: /absolute/path/to/GeoLite2-City.mmdb`，表示数据库加载成功
- 如果看到错误信息 `GeoIP数据库文件不存在`，则需要检查文件路径和权限

## 更新GeoIP数据库

MaxMind通常每月更新一次GeoLite2数据库。要更新数据库，只需下载新版本并替换外部目录中的文件即可，无需重新部署应用程序。

**绝对路径：**
```bash
# Linux
sudo cp new-GeoLite2-City.mmdb /opt/blog/data/GeoLite2-City.mmdb
sudo chmod 644 /opt/blog/data/GeoLite2-City.mmdb

# Windows
copy new-GeoLite2-City.mmdb D:\data\GeoLite2-City.mmdb
```

**相对路径：**
```bash
# 更新项目根目录下的文件
cp new-GeoLite2-City.mmdb ./geoip/GeoLite2-City.mmdb

# 或更新blog-api同级目录下的文件
cp new-GeoLite2-City.mmdb ../geoip/GeoLite2-City.mmdb
```

## 注意事项

1. 确保应用程序有权限读取GeoIP数据库文件
2. 相对路径是相对于应用程序运行目录的，在不同环境中可能有所不同
3. 应用程序会自动将相对路径转换为绝对路径，因此两种路径方式都可以安全使用
4. 如果更改了数据库文件的位置，需要更新配置并重启应用程序
5. 建议定期更新GeoIP数据库以获取最新的地理位置数据 