package com.caixiaohu.util.comment;

import com.caixiaohu.entity.User;
import com.caixiaohu.service.SiteSettingService;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CommentUtilsTest {
	@Test
	void setAdminCommentUsesConfiguredAdminCommentAvatar() {
		SiteSettingService siteSettingService = mock(SiteSettingService.class);
		when(siteSettingService.getAdminCommentAvatar()).thenReturn("/img/comment-avatar/4.jpg");

		CommentUtils commentUtils = new CommentUtils();
		ReflectionTestUtils.setField(commentUtils, "siteSettingService", siteSettingService);

		User admin = new User();
		admin.setNickname("站长");
		admin.setEmail("admin@example.com");
		admin.setAvatar("/img/avatar.jpg");

		com.caixiaohu.entity.Comment comment = new com.caixiaohu.entity.Comment();
		commentUtils.setAdminComment(comment, new MockHttpServletRequest(), admin);

		assertEquals("/img/comment-avatar/4.jpg", comment.getAvatar());
	}
}
