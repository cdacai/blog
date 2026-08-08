package com.caixiaohu.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class RedisServiceImplTest {
	private RedisTemplate<Object, Object> redisTemplate;
	private ValueOperations<Object, Object> valueOperations;
	private RedisServiceImpl redisService;

	@BeforeEach
	void setUp() {
		redisTemplate = mock(RedisTemplate.class);
		valueOperations = mock(ValueOperations.class);
		when(redisTemplate.opsForValue()).thenReturn(valueOperations);
		redisService = new RedisServiceImpl();
		ReflectionTestUtils.setField(redisService, "jsonRedisTemplate", redisTemplate);
	}

	@Test
	void incrementByKeySetsExpiryForTheFirstFailure() {
		when(valueOperations.increment("login-key", 1)).thenReturn(1L);

		long count = redisService.incrementByKey("login-key", 1, 900);

		assertEquals(1L, count);
		verify(redisTemplate).expire("login-key", 900, TimeUnit.SECONDS);
	}

	@Test
	void incrementByKeyKeepsTheOriginalWindowForLaterFailures() {
		when(valueOperations.increment("login-key", 1)).thenReturn(2L);

		long count = redisService.incrementByKey("login-key", 1, 900);

		assertEquals(2L, count);
		verify(redisTemplate, never()).expire("login-key", 900, TimeUnit.SECONDS);
	}
}
