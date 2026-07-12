package com.caixiaohu.service.impl;

import com.caixiaohu.entity.Comment;
import com.caixiaohu.mapper.CommentMapper;
import com.caixiaohu.model.vo.PageComment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CommentServiceImplTest {
	private CommentMapper commentMapper;
	private CommentServiceImpl commentService;

	@BeforeEach
	void setUp() {
		commentMapper = mock(CommentMapper.class);
		commentService = new CommentServiceImpl();
		ReflectionTestUtils.setField(commentService, "commentMapper", commentMapper);
	}

	@Test
	void getPageCommentListFlattensNestedRepliesUnderTopComment() {
		Comment topComment = buildComment(1L, -1L, "游客A");
		Comment adminReply = buildComment(2L, 1L, "站长");
		Comment visitorReplyToAdmin = buildComment(3L, 2L, "游客B");

		when(commentMapper.getListByPageAndParentCommentId(0, 1L, -1L)).thenReturn(Collections.singletonList(topComment));
		when(commentMapper.getListByPageAndParentCommentId(0, 1L, 1L)).thenReturn(Collections.singletonList(adminReply));
		when(commentMapper.getListByPageAndParentCommentId(0, 1L, 2L)).thenReturn(Collections.singletonList(visitorReplyToAdmin));
		when(commentMapper.getListByPageAndParentCommentId(0, 1L, 3L)).thenReturn(Collections.emptyList());

		List<PageComment> comments = commentService.getPageCommentList(0, 1L, -1L, 1);

		assertEquals(1, comments.size());
		assertEquals(2, comments.get(0).getReplyComments().size());
		assertEquals("1", comments.get(0).getReplyComments().get(0).getParentCommentId());
		assertEquals("游客A", comments.get(0).getReplyComments().get(0).getParentCommentNickname());
		assertEquals("2", comments.get(0).getReplyComments().get(1).getParentCommentId());
		assertEquals("站长", comments.get(0).getReplyComments().get(1).getParentCommentNickname());
	}

	private Comment buildComment(Long id, Long parentCommentId, String nickname) {
		Comment comment = new Comment();
		comment.setId(id);
		comment.setParentCommentId(parentCommentId);
		comment.setNickname(nickname);
		comment.setContent("评论内容");
		comment.setPage(0);
		comment.setBlogId(1L);
		comment.setPublished(true);
		comment.setAdminComment("站长".equals(nickname));
		return comment;
	}
}
