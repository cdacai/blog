package com.caixiaohu.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class Notification {
    private Long id;
    private String type; // 通知类型: comment/like/report
    private Long sourceId; // 来源ID(评论ID/点赞ID/举报ID)
    private Boolean isRead; // 是否已读
    private Date createTime; // 创建时间
    private Date readTime; // 阅读时间
}