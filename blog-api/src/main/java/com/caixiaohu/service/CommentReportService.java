package com.caixiaohu.service;

import java.util.List;

import com.caixiaohu.entity.CommentReport;
import com.caixiaohu.model.dto.CommentReportHandleRequest;

/**
 * @Description: 评论举报业务层接口
 * @Author: Naccl
 * @Date: 2023-01-20
 */
public interface CommentReportService {
    void saveCommentReport(CommentReport report);
    
    List<CommentReport> getCommentReportList();
    
    void handleCommentReport(Long reportId, CommentReportHandleRequest request);
    
    void deleteCommentReport(Long id);
} 