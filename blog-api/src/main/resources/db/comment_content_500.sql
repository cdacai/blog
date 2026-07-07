ALTER TABLE `comment`
    MODIFY COLUMN `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论内容';
