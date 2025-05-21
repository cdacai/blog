package com.caixiaohu.service;

import java.util.List;

import com.caixiaohu.entity.Comment;
import com.caixiaohu.model.vo.PageComment;

public interface CommentService {
	List<Comment> getListByPageAndParentCommentId(Integer page, Long blogId, Long parentCommentId, Integer pageNum);

	List<PageComment> getPageCommentList(Integer page, Long blogId, Long parentCommentId, Integer pageNum);

	Comment getCommentById(Long id);

	void updateCommentPublishedById(Long commentId, Boolean published);

	void updateCommentNoticeById(Long commentId, Boolean notice);

	void deleteCommentById(Long commentId);

	void deleteCommentsByBlogId(Long blogId);

	void updateComment(Comment comment);

	int countByPageAndIsPublished(Integer page, Long blogId, Boolean isPublished);

	void saveComment(com.caixiaohu.entity.Comment comment);
}
