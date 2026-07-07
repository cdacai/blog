package com.caixiaohu.service;

import com.caixiaohu.constant.JwtConstants;
import com.caixiaohu.entity.User;
import com.caixiaohu.service.impl.UserServiceImpl;
import com.caixiaohu.util.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.authority.AuthorityUtils;

import javax.servlet.http.Cookie;
import java.lang.reflect.Field;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AdminCommentAuthServiceTest {
	private UserServiceImpl userService;
	private AdminCommentAuthService adminCommentAuthService;

	@BeforeEach
	void setUp() throws Exception {
		setStaticField(JwtUtils.class, "secretKey", "test-secret-key");
		setStaticField(JwtUtils.class, "expireTime", 3600000L);
		userService = mock(UserServiceImpl.class);
		adminCommentAuthService = new AdminCommentAuthService(userService);
	}

	@Test
	void resolveAdminFromCookieToken() {
		User admin = new User();
		admin.setUsername("admin");
		admin.setNickname("站长");
		when(userService.loadUserByUsername("admin")).thenReturn(admin);

		String token = JwtUtils.generateToken(
				JwtConstants.ADMIN_PREFIX + "admin",
				AuthorityUtils.createAuthorityList("ROLE_admin")
		);
		MockHttpServletRequest request = new MockHttpServletRequest();
		request.setCookies(new Cookie(JwtConstants.ADMIN_COMMENT_COOKIE, token));

		Optional<User> resolved = adminCommentAuthService.resolveAdmin("", request);

		assertTrue(resolved.isPresent());
		assertEquals("admin", resolved.get().getUsername());
	}

	private static void setStaticField(Class<?> targetClass, String fieldName, Object value) throws Exception {
		Field field = targetClass.getDeclaredField(fieldName);
		field.setAccessible(true);
		field.set(null, value);
	}
}
