package com.caixiaohu.config;

import com.caixiaohu.entity.User;
import com.caixiaohu.exception.LoginRateLimitException;
import com.caixiaohu.service.LoginAttemptService;
import com.caixiaohu.service.LoginLogService;
import com.caixiaohu.util.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

class JwtLoginFilterTest {
	private AuthenticationManager authenticationManager;
	private LoginLogService loginLogService;
	private LoginAttemptService loginAttemptService;
	private JwtLoginFilter filter;

	@BeforeEach
	void setUp() throws Exception {
		setStaticField(JwtUtils.class, "secretKey", "test-secret-key");
		setStaticField(JwtUtils.class, "expireTime", 3600000L);
		authenticationManager = mock(AuthenticationManager.class);
		loginLogService = mock(LoginLogService.class);
		loginAttemptService = mock(LoginAttemptService.class);
		filter = new JwtLoginFilter("/admin/login", authenticationManager, loginLogService,
				loginAttemptService, "", false);
	}

	@Test
	void successfulLoginResponseIsNotCachedAndClearsAccountFailures() throws Exception {
		User user = new User();
		user.setUsername("Admin");
		Authentication authentication = new UsernamePasswordAuthenticationToken(
				user, null, AuthorityUtils.createAuthorityList("ROLE_admin"));
		MockHttpServletRequest request = loginRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		filter.successfulAuthentication(request, response, null, authentication);

		assertNoStore(response);
		verify(loginAttemptService).loginSucceeded("Admin");
	}

	@Test
	void failedLoginResponseIsNotCachedAndRecordsFailure() throws Exception {
		MockHttpServletRequest request = loginRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();
		filter.currentUsername.set("Admin");

		filter.unsuccessfulAuthentication(request, response, new BadCredentialsException("details"));

		assertNoStore(response);
		assertTrue(response.getContentAsString().contains("用户名或密码错误"));
		verify(loginAttemptService).loginFailed(eq("Admin"), any(String.class));
	}

	@Test
	void blockedLoginUsesRateLimitMessageWithoutIncrementingAgain() throws Exception {
		MockHttpServletRequest request = loginRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();
		filter.currentUsername.set("Admin");

		filter.unsuccessfulAuthentication(request, response, new LoginRateLimitException());

		assertNoStore(response);
		assertTrue(response.getContentAsString().contains("登录尝试过于频繁，请稍后再试"));
		verify(loginAttemptService, never()).loginFailed(eq("Admin"), any(String.class));
	}

	@Test
	void blockedLoginDoesNotInvokePasswordAuthentication() throws Exception {
		MockHttpServletRequest request = loginRequest();
		request.setContentType("application/json");
		request.setContent("{\"username\":\"Admin\",\"password\":\"wrong\"}".getBytes("UTF-8"));
		MockHttpServletResponse response = new MockHttpServletResponse();
		when(loginAttemptService.isBlocked(eq("Admin"), any(String.class))).thenReturn(true);

		assertThrows(LoginRateLimitException.class, () -> filter.attemptAuthentication(request, response));

		assertNoStore(response);
		verifyNoInteractions(authenticationManager);
	}

	private MockHttpServletRequest loginRequest() {
		MockHttpServletRequest request = new MockHttpServletRequest("POST", "/admin/login");
		request.setRemoteAddr("127.0.0.1");
		return request;
	}

	private void assertNoStore(MockHttpServletResponse response) {
		assertEquals("no-store", response.getHeader("Cache-Control"));
		assertEquals("no-cache", response.getHeader("Pragma"));
	}

	private static void setStaticField(Class<?> targetClass, String fieldName, Object value) throws Exception {
		Field field = targetClass.getDeclaredField(fieldName);
		field.setAccessible(true);
		field.set(null, value);
	}
}
