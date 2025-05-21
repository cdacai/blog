package com.caixiaohu.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @Description: 评论举报
 * @Author: Naccl
 * @Date: 2023-01-20
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentReport {
    private Long id;
    private Long commentId;
    private String commentContent;
    private Long blogId;
    private String blogTitle;
    private String content;
    private String email;
    private String phone;
    private String ip;
    private String ipSource;
    private Integer status;
    private Date createTime;
    private Date handleTime;
    private String handleResult;
    private String handleBy;
    private String reason;
    private Comment comment;
} 