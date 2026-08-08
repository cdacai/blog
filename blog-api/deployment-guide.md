# Blog API 部署与本地开发指南

## 一、环境与 Profile

- JDK 8+
- Maven 3.6+
- MySQL 5.7+，使用 `utf8mb4`
- Redis 6+

| 场景 | Profile | 说明 |
| --- | --- | --- |
| 本地开发 | `prd,dev` | `prd` 提供完整基础属性，`dev` 最后覆盖本地差异 |
| 生产部署 | `prd` | 仅加载生产配置 |

Profile 顺序不能交换。不要为了本地启动而删除 `application-prd.properties` 中的生产 Redis 密码。

## 二、本地开发

### 2.1 准备依赖

1. 启动 MySQL，确认 `nblog` 数据库可访问。
2. 启动本地 Redis。项目的 `application-dev.properties` 默认按无密码 Redis 配置。
3. 确认 `8079`、`8080`、`8090` 端口未被其它程序占用。

Redis 检查：

```powershell
redis-cli -h 127.0.0.1 -p 6379 ping
redis-cli -h 127.0.0.1 -p 6379 CONFIG GET requirepass
```

无密码 Redis 应返回 `PONG`，且 `requirepass` 值为空。

### 2.2 启动 API

```powershell
cd D:\code\blog\blog-api
mvn spring-boot:run "-Dspring-boot.run.profiles=prd,dev"
```

启动成功后，API 默认地址为 `http://localhost:8090/blog`。可以访问：

```text
http://localhost:8090/blog/site
```

HTTP 200 表示基础启动正常。

## 三、数据库

### 3.1 全新部署

`blog-api/nblog.sql` 是唯一的完整初始化文件，会：

- 创建并选择 `nblog` 数据库
- 创建 35 张业务及 Quartz 表
- 初始化管理员、站点设置、主题和定时任务数据
- 初始化 `adminCommentAvatar` 和 `adminEditorAppearance`

```bash
mysql -u root -p < blog-api/nblog.sql
```

> 警告：该文件包含 `DROP TABLE IF EXISTS`，只能用于全新数据库或明确需要清空重建的环境。

### 3.2 已有数据库升级

先备份：

```bash
mysqldump -u root -p --single-transaction nblog > nblog-backup.sql
```

在 MySQL 客户端执行增量脚本：

```sql
USE `nblog`;
SOURCE D:/code/blog/blog-api/src/main/resources/db/comment_content_500.sql;
SOURCE D:/code/blog/blog-api/src/main/resources/db/admin_editor_appearance.sql;
```

如果数据库尚无站长评论头像配置，再执行：

```sql
INSERT INTO site_setting (name_en, name_zh, value, type)
SELECT 'adminCommentAvatar', '站长评论头像', '/img/comment-avatar/1.jpg', 1
FROM DUAL
WHERE NOT EXISTS (
    SELECT 1 FROM site_setting WHERE name_en = 'adminCommentAvatar'
);
```

验证：

```sql
SHOW FULL COLUMNS FROM `comment` LIKE 'content';
SELECT id, name_en, name_zh, value, type
FROM site_setting
WHERE name_en IN ('commentAdminFlag', 'adminCommentAvatar', 'adminEditorAppearance');
```

`comment.content` 应为 `varchar(500)`，`adminEditorAppearance` 默认为 `system`。

## 四、生产配置

检查 `application-prd.properties`：

- `spring.datasource.*` 指向生产 MySQL
- `spring.redis.*` 与 Redis `requirepass` 完全一致
- `blog.cors.origins` 包含 `https://www.caixiaohu.com`、`https://set.caixiaohu.com` 和 `https://caixiaohu.com`
- `token.admin-comment-cookie-domain=.caixiaohu.com`
- `token.admin-comment-cookie-secure=true`
- `token.secretKey` 使用足够长的随机密钥
- [EXTEND] `security.login-limit.account-max-failures=5`
- [EXTEND] `security.login-limit.ip-max-failures=20`
- [EXTEND] `security.login-limit.window-seconds=900`

登录安全改动只使用 Redis 保存临时计数，不涉及数据库表结构或初始数据，因此已有数据库不需要执行 SQL。

生产 Redis 配置了密码时，应先验证：

```bash
redis-cli -h 127.0.0.1 -p 6379 -a '<REDIS_PASSWORD>' ping
```

## 五、构建与部署

### 5.1 后端构建

```powershell
cd D:\code\blog\blog-api
mvn clean package -DskipTests
```

产物位于 `blog-api/target/blog-api-0.0.1.jar`。

### 5.2 前端构建

```powershell
cd D:\code\blog\blog-cms
npm run build

cd D:\code\blog\blog-view
npm run build
```

分别部署两个 `dist` 目录到 `set.caixiaohu.com` 和 `www.caixiaohu.com`。

### 5.3 启动生产 API

```bash
java -jar blog-api-0.0.1.jar --spring.profiles.active=prd
```

实际环境建议使用宝塔、systemd 或其它进程管理器设置工作目录、JDK 8、自动重启和日志路径。

## 六、部署验证

1. 日志显示 `The following profiles are active: prd`。
2. 日志无 `NOAUTH`、`Client sent AUTH` 或 `Could not resolve placeholder`。
3. API `/blog/site` 返回 HTTP 200。
4. 后台“站点管理”可保存站长评论头像和后台外观。
5. 从后台登录后，在前台完成多层站长回复测试。
6. 验证 500 字符评论成功、501 字符被拒绝。
7. 后台登录响应包含 `Cache-Control: no-store`，启动日志不再打印测试密码哈希。
8. 连续输错同一账户密码 5 次后，第 6 次返回“登录尝试过于频繁，请稍后再试”，15 分钟后自动恢复；生产验证后可删除 Redis 中 `security:login:*` 测试键立即解除限制。

## 七、常见错误

- `NOAUTH Authentication required`：Redis 有密码，应用未携带或携带错误密码。
- `ERR Client sent AUTH, but no password is set`：Redis 无密码，应用却发送了 AUTH；本地请使用 `prd,dev`。
- `Could not resolve placeholder 'blog.cors.origins'`：只启用了 `dev`，没有先加载完整基础属性；使用 `prd,dev`。
- Maven 提示目录中没有 POM：请在 `blog-api` 目录执行 Maven，不要在 `blog-cms` 目录执行。

## 八、回滚

1. 停止当前 API。
2. 恢复上一个 JAR 和两个前端 `dist` 备份。
3. 如果执行了数据库迁移且需要回滚，使用部署前的 `mysqldump` 备份恢复。
4. 使用 `--spring.profiles.active=prd` 启动上一版本。
