package com.caixiaohu.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.caixiaohu.entity.CommentReport;

import java.util.Date;
import java.util.List;

/**
 * @Description: 评论举报持久层接口
 * @Author: Naccl
 * @Date: 2023-01-20
 */
@Mapper
@Repository
public interface CommentReportMapper {
    int saveCommentReport(CommentReport report);
    
    List<CommentReport> getCommentReportList();
    
    CommentReport getReportById(Long id);
    
    int updateCommentReport(CommentReport report);
    
    int deleteCommentReportById(Long id);
    
    /**
     * 根据评论ID更新所有相关举报的状态
     */
    int updateReportStatusByCommentId(@Param("commentId") Long commentId,
                                    @Param("status") Integer status,
                                    @Param("handleBy") String handleBy,
                                    @Param("handleTime") Date handleTime,
                                    @Param("handleResult") String handleResult);
} 