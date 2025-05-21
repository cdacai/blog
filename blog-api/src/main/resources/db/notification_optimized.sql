-- 删除旧表（如果存在）
DROP TABLE IF EXISTS notification;

-- 创建优化后的表结构
CREATE TABLE notification (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    type VARCHAR(10) NOT NULL COMMENT '通知类型：comment/like/report',
    nickname VARCHAR(50) COMMENT '用户昵称',
    content TEXT COMMENT '评论内容',
    target_id BIGINT NOT NULL COMMENT '目标ID',
    target_type VARCHAR(10) NOT NULL COMMENT '目标类型：blog/moment',
    target_title VARCHAR(255) COMMENT '目标标题',
    ip VARCHAR(50) COMMENT 'IP地址',
    ip_source VARCHAR(100) COMMENT 'IP来源',
    report_reason VARCHAR(500) COMMENT '举报原因',
    is_read BOOLEAN NOT NULL DEFAULT FALSE COMMENT '是否已读',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_target_type_time (target_type, target_id, create_time),
    INDEX idx_create_time (create_time),
    CONSTRAINT fk_notification_blog FOREIGN KEY (target_id) REFERENCES blog(id) ON DELETE CASCADE,
    CONSTRAINT fk_notification_moment FOREIGN KEY (target_id) REFERENCES moment(id) ON DELETE CASCADE,
    CONSTRAINT chk_notification_type CHECK (type IN ('comment', 'like', 'report')),
    CONSTRAINT chk_notification_target_type CHECK (target_type IN ('blog', 'moment'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='通知表'; 