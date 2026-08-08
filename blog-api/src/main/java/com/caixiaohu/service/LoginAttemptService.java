package com.caixiaohu.service;

import com.caixiaohu.constant.RedisKeyConstants;
import com.caixiaohu.util.HashUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class LoginAttemptService {
	private final RedisService redisService;
	private final int accountMaxFailures;
	private final int ipMaxFailures;
	private final long windowSeconds;

	public LoginAttemptService(RedisService redisService,
			@Value("${security.login-limit.account-max-failures:5}") int accountMaxFailures,
			@Value("${security.login-limit.ip-max-failures:20}") int ipMaxFailures,
			@Value("${security.login-limit.window-seconds:900}") long windowSeconds) {
		this.redisService = redisService;
		this.accountMaxFailures = accountMaxFailures;
		this.ipMaxFailures = ipMaxFailures;
		this.windowSeconds = windowSeconds;
	}

	public boolean isBlocked(String username, String ip) {
		return readCount(accountKey(username)) >= accountMaxFailures
				|| readCount(ipKey(ip)) >= ipMaxFailures;
	}

	public void loginFailed(String username, String ip) {
		if (hasText(username)) {
			redisService.incrementByKey(accountKey(username), 1, windowSeconds);
		}
		redisService.incrementByKey(ipKey(ip), 1, windowSeconds);
	}

	public void loginSucceeded(String username) {
		if (hasText(username)) {
			redisService.deleteCacheByKey(accountKey(username));
		}
	}

	private long readCount(String key) {
		Object value = redisService.get(key);
		if (value == null) {
			return 0;
		}
		if (value instanceof Number) {
			return ((Number) value).longValue();
		}
		try {
			return Long.parseLong(value.toString());
		} catch (NumberFormatException ignored) {
			return 0;
		}
	}

	private String accountKey(String username) {
		String normalized = username == null ? "" : username.trim().toLowerCase(Locale.ROOT);
		return RedisKeyConstants.LOGIN_FAILURE_ACCOUNT_PREFIX + HashUtils.getMd5(normalized);
	}

	private String ipKey(String ip) {
		String normalized = ip == null ? "unknown" : ip.trim();
		return RedisKeyConstants.LOGIN_FAILURE_IP_PREFIX + HashUtils.getMd5(normalized);
	}

	private boolean hasText(String value) {
		return value != null && !value.trim().isEmpty();
	}
}
