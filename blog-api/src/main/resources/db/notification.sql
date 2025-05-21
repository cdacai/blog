DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL COMMENT '通知类型(comment/like/report)',
  `nickname` varchar(50) DEFAULT NULL COMMENT '用户昵称',
  `content` text COMMENT '评论内容',
  `target_id` bigint(20) NOT NULL COMMENT '目标ID(文章ID或动态ID)',
  `target_type` varchar(20) NOT NULL COMMENT '目标类型：blog/moment',
  `target_title` varchar(255) DEFAULT NULL COMMENT '目标标题',
  `ip` varchar(50) DEFAULT NULL COMMENT 'IP地址',
  `ip_source` varchar(100) DEFAULT NULL COMMENT 'IP来源',
  `report_reason` varchar(500) DEFAULT NULL COMMENT '举报原因',
  `is_read` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已读(0:未读 1:已读)',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_type` (`type`),
  KEY `idx_is_read` (`is_read`),
  KEY `idx_target` (`target_id`, `target_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='通知表'; 