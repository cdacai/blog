package com.caixiaohu.exception;

import org.springframework.security.core.AuthenticationException;

public class LoginRateLimitException extends AuthenticationException {
	public LoginRateLimitException() {
		super("登录尝试过于频繁，请稍后再试");
	}
}
