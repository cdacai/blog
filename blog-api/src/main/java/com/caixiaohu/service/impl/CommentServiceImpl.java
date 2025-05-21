package com.caixiaohu.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.github.pagehelper.PageHelper;

import com.caixiaohu.entity.Comment;
import com.caixiaohu.entity.Notification;
import com.caixiaohu.exception.BadRequestException;
import com.caixiaohu.exception.NotFoundException;
import com.caixiaohu.exception.PersistenceException;
import com.caixiaohu.mapper.CommentMapper;
import com.caixiaohu.mapper.BlogMapper;
import com.caixiaohu.model.vo.PageComment;
import com.caixiaohu.service.BaiduContentService;
import com.caixiaohu.service.CommentService;
import com.caixiaohu.service.NotificationService;
import com.caixiaohu.util.IpAddressUtils;

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
	private CommentMapper commentMapper;
	@Autowired
	private BlogMapper blogMapper;
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
	public void saveComment(com.caixiaohu.entity.Comment comment) {
		if (commentMapper.saveComment(comment) != 1) {
			throw new PersistenceException("评论保存失败");
		}
		// 创建通知
		Notification notification = new Notification();
		notification.setType("comment");
		notification.setNickname(comment.getNickname());
		notification.setContent(comment.getContent());
		notification.setTargetId(comment.getBlogId());
		notification.setTargetType("blog");
		// 获取文章标题
		String blogTitle = null;
		if (comment.getBlogId() != null) {
			blogTitle = blogMapper.getTitleByBlogId(comment.getBlogId());
		}
		notification.setTargetTitle(blogTitle);
		notification.setIp(comment.getIp());
		// 获取IP来源
		String ipSource = IpAddressUtils.getCityInfo(comment.getIp());
		notification.setIpSource(ipSource);
		notification.setIsRead(false);
		notification.setCreateTime(new Date());
		notificationService.createNotification(notification);
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
