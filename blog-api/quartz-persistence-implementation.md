# Quartz定时任务持久化解决方案

## 问题描述

当前系统中的Quartz定时任务调度器使用内存存储（RAMJobStore），导致以下问题：

1. 应用每次重启时任务状态丢失
2. 日志显示系统每隔约1分钟就会重启Quartz调度器
3. 频繁的应用重启导致资源浪费
4. 无法支持集群部署和高可用性

## 解决方案

将Quartz定时任务从内存存储模式改为使用数据库持久化，主要内容包括：

1. 添加Quartz持久化相关配置
2. 创建Quartz数据库表结构
3. 配置集群支持以实现高可用
4. 优化线程池和任务执行设置

## 实施步骤

### 1. 添加数据库表结构

已添加`schema/quartz_tables.sql`文件，包含Quartz所需的11个数据表。初次部署时需要执行此SQL脚本创建表结构。

### 2. 配置文件修改

已在以下文件中添加了Quartz持久化配置：

- `application-dev.properties` - 开发环境配置
- `application-prd.properties` - 生产环境配置
- `application-dev.properties.template` - 开发环境配置模板
- `application-prd.properties.template` - 生产环境配置模板

主要配置内容包括：

```properties
# 使用数据库存储任务
spring.quartz.job-store-type=jdbc
# 初始化表结构（首次部署时设置为always，后续设置为never）
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
# 持久化和集群配置
spring.quartz.properties.org.quartz.jobStore.class=org.quartz.impl.jdbcjobstore.JobStoreTX
spring.quartz.properties.org.quartz.jobStore.isClustered=true
```

### 3. 环境差异

根据环境不同，部分配置值有所差异：

| 配置项 | 开发环境 | 生产环境 |
|-------|---------|---------|
| threadCount | 10 | 20 |
| clusterCheckinInterval | 10000 | 20000 |
| initialize-schema | 首次设置为always，之后为never | never |

### 4. 部署流程

1. **数据库准备**：
   - 首次部署前执行`quartz_tables.sql`创建表结构
   - 或设置`spring.quartz.jdbc.initialize-schema=always`，应用启动时自动创建表结构

2. **配置更新**：
   - 更新应用配置文件，添加Quartz持久化相关配置
   - 确保数据库连接参数正确

3. **应用部署**：
   - 更新应用，重启服务
   - 首次重启后，检查数据库中是否已创建Quartz相关表
   - 后续重启将自动使用持久化的任务数据

### 5. 验证方法

1. 应用启动后，检查日志中是否有"Using job-store 'org.quartz.impl.jdbcjobstore.JobStoreTX'"信息
2. 查询数据库中的`QRTZ_JOB_DETAILS`表，确认任务信息已正确持久化
3. 重启应用后，确认任务不会重新创建，而是使用已有的任务数据
4. 观察应用是否仍然频繁重启，查看日志是否有相关错误信息

## 注意事项

1. 首次使用持久化存储时，确保先创建表结构
2. 如果从旧版本的内存存储迁移，可能需要手动迁移任务数据
3. 生产环境修改配置时建议先在测试环境验证
4. 如果使用集群模式，确保所有节点的时钟同步

## 参考资料

1. [Spring Boot Quartz配置文档](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.quartz)
2. [Quartz集群配置指南](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/configuration/ConfigJDBCJobStoreClustering.html) 