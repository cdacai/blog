CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL COMMENT '通知类型(comment/like/report)',
  `source_id` bigint(20) NOT NULL COMMENT '来源ID',
  `is_read` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已读(0:未读 1:已读)',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `read_time` datetime DEFAULT NULL COMMENT '阅读时间',
  PRIMARY KEY (`id`),
  KEY `idx_type` (`type`),
  KEY `idx_is_read` (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='通知表'; 