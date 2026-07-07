package com.caixiaohu.controller;

import com.caixiaohu.entity.Comment;
import com.caixiaohu.enums.CommentOpenStateEnum;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.service.AdminCommentAuthService;
import com.caixiaohu.service.CommentService;
import com.caixiaohu.util.comment.CommentUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CommentControllerTest {
	private CommentController commentController;

	@BeforeEach
	void setUp() {
		CommentService commentService = mock(CommentService.class);
		CommentUtils commentUtils = mock(CommentUtils.class);
		AdminCommentAuthService adminCommentAuthService = mock(AdminCommentAuthService.class);

		when(commentUtils.judgeCommentState(eq(0), eq(1L))).thenReturn(CommentOpenStateEnum.OPEN);
		when(adminCommentAuthService.resolveAdmin(eq(""), any(MockHttpServletRequest.class))).thenReturn(Optional.empty());

		commentController = new CommentController();
		commentController.commentService = commentService;
		commentController.commentUtils = commentUtils;
		commentController.adminCommentAuthService = adminCommentAuthService;
	}

	@Test
	void postCommentAcceptsContentWith500Characters() {
		Comment comment = buildComment(repeat("a", 500));

		Result result = commentController.postComment(comment, new MockHttpServletRequest(), "");

		assertEquals(200, result.getCode());
	}

	@Test
	void postCommentRejectsContentLongerThan500Characters() {
		Comment comment = buildComment(repeat("a", 501));

		Result result = commentController.postComment(comment, new MockHttpServletRequest(), "");

		assertEquals(500, result.getCode());
		assertEquals("参数有误", result.getMsg());
	}

	private Comment buildComment(String content) {
		Comment comment = new Comment();
		comment.setContent(content);
		comment.setNickname("visitor");
		comment.setEmail("visitor@example.com");
		comment.setPage(0);
		comment.setBlogId(1L);
		comment.setParentCommentId(-1L);
		return comment;
	}

	private String repeat(String value, int times) {
		StringBuilder builder = new StringBuilder(value.length() * times);
		for (int i = 0; i < times; i++) {
			builder.append(value);
		}
		return builder.toString();
	}
}
