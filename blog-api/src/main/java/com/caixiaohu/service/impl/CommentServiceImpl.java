package com.caixiaohu.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.github.pagehelper.PageHelper;

import com.caixiaohu.entity.Comment;
import com.caixiaohu.exception.BadRequestException;
import com.caixiaohu.exception.NotFoundException;
import com.caixiaohu.exception.PersistenceException;
import com.caixiaohu.mapper.CommentMapper;
import com.caixiaohu.model.vo.PageComment;
import com.caixiaohu.service.BaiduContentService;
import com.caixiaohu.service.CommentService;
import com.caixiaohu.service.NotificationService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

/**
 * @Description: 博客评论业务层实现
 * @Author: Naccl
 * @Date: 2020-08-03
 */
@Slf4j
@Service
public class CommentServiceImpl implements CommentService {
	@Autowired
	CommentMapper commentMapper;
	@Autowired
	BaiduContentService baiduContentService;
	@Autowired
	private NotificationService notificationService;

	@Override
	public List<Comment> getListByPageAndParentCommentId(Integer page, Long blogId, Long parentCommentId,
			Integer pageNum) {
		if (parentCommentId == -1L) {
			// 只对顶层评论进行分页
			String orderBy = "create_time desc";
			PageHelper.startPage(pageNum, 10, orderBy);
		}
		List<Comment> comments = commentMapper.getListByPageAndParentCommentId(page, blogId, parentCommentId);
		for (Comment comment : comments) {
			List<Comment> replyComments = getListByPageAndParentCommentId(page, blogId, comment.getId(), pageNum);
			comment.setReplyComments(replyComments);
		}
		return comments;
	}

	@Override
	public List<PageComment> getPageCommentList(Integer page, Long blogId, Long parentCommentId, Integer pageNum) {
		log.info("获取评论列表: page={}, blogId={}, parentCommentId={}, pageNum={}", page, blogId, parentCommentId, pageNum);
		List<Comment> comments = getListByPageAndParentCommentId(page, blogId, parentCommentId, pageNum);
		List<PageComment> pageComments = new ArrayList<>();
		for (Comment comment : comments) {
			PageComment pageComment = new PageComment();
			BeanUtils.copyProperties(comment, pageComment);
			pageComments.add(pageComment);
		}
		return pageComments;
	}

	@Override
	public Comment getCommentById(Long id) {
		log.info("获取评论: id={}", id);
		Comment comment = commentMapper.getCommentById(id);
		if (comment == null) {
			log.warn("评论不存在: id={}", id);
			throw new NotFoundException("评论不存在");
		}
		return comment;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void updateCommentPublishedById(Long commentId, Boolean published) {
		if (commentMapper.updateCommentPublishedById(commentId, published) != 1) {
			throw new PersistenceException("操作失败");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void updateCommentNoticeById(Long commentId, Boolean notice) {
		if (commentMapper.updateCommentNoticeById(commentId, notice) != 1) {
			throw new PersistenceException("操作失败");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void deleteCommentById(Long commentId) {
		List<Comment> comments = getAllReplyComments(commentId);
		for (Comment c : comments) {
			delete(c);
		}
		if (commentMapper.deleteCommentById(commentId) != 1) {
			throw new PersistenceException("评论删除失败");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void deleteCommentsByBlogId(Long blogId) {
		commentMapper.deleteCommentsByBlogId(blogId);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void updateComment(Comment comment) {
		if (commentMapper.updateComment(comment) != 1) {
			throw new PersistenceException("评论修改失败");
		}
	}

	@Override
	public int countByPageAndIsPublished(Integer page, Long blogId, Boolean isPublished) {
		return commentMapper.countByPageAndIsPublished(page, blogId, isPublished);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void saveComment(com.caixiaohu.model.dto.Comment commentDto) {
		log.info("开始保存评论, content={}", commentDto.getContent());
		// 进行百度内容审核
		boolean isCompliant = baiduContentService.reviewText(commentDto.getContent());
		log.info("评论内容审核结果: content={}, isCompliant={}", commentDto.getContent(), isCompliant);
		if (!isCompliant) {
			log.warn("评论内容审核不通过: content={}", commentDto.getContent());
			throw new BadRequestException("评论内容不合规，请修改后重试");
		}

		// 评论内容合规，继续保存
		Comment comment = new Comment();
		BeanUtils.copyProperties(commentDto, comment);
		try {
			if (commentMapper.saveComment(comment) != 1) {
				throw new PersistenceException("评论失败");
			}
			// 创建评论通知
			notificationService.createNotification("comment", comment.getId());
			log.info("评论保存成功: id={}, content={}", comment.getId(), comment.getContent());
		} catch (Exception e) {
			log.error("评论保存失败: content={}", comment.getContent(), e);
			throw e;
		}
	}

	/**
	 * 递归删除子评论
	 *
	 * @param comment 需要删除子评论的父评论
	 */
	private void delete(Comment comment) {
		for (Comment c : comment.getReplyComments()) {
			delete(c);
		}
		if (commentMapper.deleteCommentById(comment.getId()) != 1) {
			throw new PersistenceException("评论删除失败");
		}
	}

	/**
	 * 按id递归查询评论
	 *
	 * @param parentCommentId 父评论id
	 * @return
	 */
	private List<Comment> getAllReplyComments(Long parentCommentId) {
		List<Comment> comments = commentMapper.getListByParentCommentId(parentCommentId);
		for (Comment c : comments) {
			List<Comment> replyComments = getAllReplyComments(c.getId());
			c.setReplyComments(replyComments);
		}
		return comments;
	}
}
