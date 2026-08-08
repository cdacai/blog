package com.caixiaohu.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.startsWith;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class LoginAttemptServiceTest {
	private RedisService redisService;
	private LoginAttemptService loginAttemptService;

	@BeforeEach
	void setUp() {
		redisService = mock(RedisService.class);
		loginAttemptService = new LoginAttemptService(redisService, 5, 20, 900);
	}

	@Test
	void blocksLoginWhenAccountFailureLimitIsReached() {
		when(redisService.get(startsWith("security:login:account:"))).thenReturn(5);

		assertTrue(loginAttemptService.isBlocked("Admin", "127.0.0.1"));
	}

	@Test
	void blocksLoginWhenIpFailureLimitIsReached() {
		when(redisService.get(startsWith("security:login:account:"))).thenReturn(0);
		when(redisService.get(startsWith("security:login:ip:"))).thenReturn(20);

		assertTrue(loginAttemptService.isBlocked("Admin", "127.0.0.1"));
	}

	@Test
	void allowsLoginWhenBothFailureCountsAreBelowLimits() {
		when(redisService.get(startsWith("security:login:"))).thenReturn(4);

		assertFalse(loginAttemptService.isBlocked("Admin", "127.0.0.1"));
	}

	@Test
	void recordsAccountAndIpFailuresWithConfiguredWindow() {
		loginAttemptService.loginFailed("Admin", "127.0.0.1");

		verify(redisService).incrementByKey(startsWith("security:login:account:"), eq(1), eq(900L));
		verify(redisService).incrementByKey(startsWith("security:login:ip:"), eq(1), eq(900L));
	}

	@Test
	void successfulLoginClearsOnlyTheAccountFailureCounter() {
		loginAttemptService.loginSucceeded("Admin");

		verify(redisService).deleteCacheByKey(startsWith("security:login:account:"));
		verify(redisService, never()).deleteCacheByKey(startsWith("security:login:ip:"));
	}
}
