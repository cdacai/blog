package com.caixiaohu.model.dto;

import lombok.Data;

@Data
public class CommentReportHandleRequest {
    private String action;      // 处理方式
    private String handleResult;// 处理结果说明
} 