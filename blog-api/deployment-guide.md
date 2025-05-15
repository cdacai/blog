# Blog API 部署指南

## 版本信息

- 版本号：0.0.1
- 构建日期：2025-05-15
- 主要更新：实现Quartz定时任务持久化存储，解决频繁重启问题

## 部署步骤

### 1. 数据库准备

在部署新版本前，需要先创建Quartz相关的数据库表：

```sql
-- 创建Quartz表结构
-- SQL脚本位于：blog-api/src/main/resources/schema/quartz_tables.sql
```

执行以下命令导入SQL脚本：

```bash
mysql -u用户名 -p密码 数据库名 < quartz_tables.sql
```

或者使用MySQL客户端工具导入脚本文件。

### 2. 配置文件修改

确认生产环境配置文件`application-prd.properties`中已包含Quartz持久化相关配置：

```properties
# 使用数据库存储任务
spring.quartz.job-store-type=jdbc
# 初始化表结构（生产环境设置为never，避免每次启动都初始化）
spring.quartz.jdbc.initialize-schema=never
# 表结构脚本位置
spring.quartz.jdbc.schema=classpath:schema/quartz_tables.sql
# 自动启动
spring.quartz.auto-startup=true
# 应用关闭时等待quartz任务完成
spring.quartz.wait-for-jobs-to-complete-on-shutdown=true
# 覆盖已存在的任务
spring.quartz.overwrite-existing-jobs=true
# 调度器实例名
spring.quartz.scheduler-name=BlogScheduler
# 集群配置
spring.quartz.properties.org.quartz.jobStore.isClustered=true
```

### 3. 部署JAR包

1. 停止当前运行的应用

```bash
# 使用进程ID停止
kill -15 <进程ID>

# 或者使用系统服务停止（如果配置了systemd）
systemctl stop blog-api
```

2. 备份当前版本

```bash
mv blog-api-current.jar blog-api-backup.jar
```

3. 上传新JAR包

将`blog-api-0.0.1.jar`上传到服务器部署目录。

4. 启动新版本

```bash
# 直接启动
java -jar blog-api-0.0.1.jar --spring.profiles.active=prd &

# 或者使用系统服务启动（如果配置了systemd）
systemctl start blog-api
```

### 4. 验证部署

1. 检查应用日志，确认启动成功：

```bash
tail -f logs/blog-api.log
```

2. 查找以下日志行，确认Quartz使用了JDBC存储：

```
Using job-store 'org.springframework.scheduling.quartz.LocalDataSourceJobStore' - which supports persistence. and is clustered.
```

3. 检查数据库中是否成功创建Quartz相关表并包含数据：

```sql
SELECT COUNT(*) FROM QRTZ_JOB_DETAILS;
SELECT COUNT(*) FROM QRTZ_TRIGGERS;
```

## 回滚方案

如果新版本部署后出现问题，可以按照以下步骤回滚：

1. 停止当前应用
2. 恢复备份的JAR包
3. 启动备份版本

```bash
java -jar blog-api-backup.jar --spring.profiles.active=prd &
```

## 注意事项

1. **首次部署**：由于从内存存储迁移到持久化存储，第一次部署后需要重新配置定时任务
2. **数据库表**：确保数据库用户有足够权限创建和访问Quartz相关表
3. **集群部署**：如果使用集群模式，确保所有节点的时钟同步
4. **监控**：部署后密切监控系统运行情况，特别关注定时任务的执行情况

## 联系方式

如部署过程中遇到问题，请联系：

- 技术支持：[您的联系信息]
- 邮箱：[您的邮箱] 