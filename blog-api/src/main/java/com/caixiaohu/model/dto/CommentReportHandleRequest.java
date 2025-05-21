package com.caixiaohu.model.dto;

import lombok.Data;

@Data
public class CommentReportHandleRequest {
    private Integer status;     // 处理状态：0-未处理，1-已处理
    private String handleResult;// 处理结果说明
} 