package com.caixiaohu.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
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
    private String phone;
    private String email;
    @Size(min = 1, max = 500, message = "举报内容长度限制为 1-500 字符")
    private String content;
    private String ip;
    private String ipSource;
    private Integer status;  // 0:未处理 1:已处理
    private Date createTime;
    private Date handleTime;
    private String handleResult;
    private String handleBy;  // 处理人
} 