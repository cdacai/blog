package com.caixiaohu.service;

import com.caixiaohu.constant.JwtConstants;
import com.caixiaohu.entity.User;
import com.caixiaohu.service.impl.UserServiceImpl;
import com.caixiaohu.util.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
public class AdminCommentAuthService {
	private final UserServiceImpl userService;

	public AdminCommentAuthService(UserServiceImpl userService) {
		this.userService = userService;
	}

	public Optional<User> resolveAdmin(String authorization, HttpServletRequest request) {
		Optional<User> headerAdmin = resolveAdminFromToken(authorization);
		if (headerAdmin.isPresent()) {
			return headerAdmin;
		}
		return resolveAdminFromToken(getAdminCommentCookie(request));
	}

	private Optional<User> resolveAdminFromToken(String token) {
		if (!JwtUtils.judgeTokenIsExist(token)) {
			return Optional.empty();
		}
		try {
			Claims claims = JwtUtils.getTokenBody(token);
			String subject = claims.getSubject();
			if (!subject.startsWith(JwtConstants.ADMIN_PREFIX)) {
				return Optional.empty();
			}
			String username = subject.replace(JwtConstants.ADMIN_PREFIX, "");
			User admin = (User) userService.loadUserByUsername(username);
			return Optional.ofNullable(admin);
		} catch (Exception e) {
			return Optional.empty();
		}
	}

	private String getAdminCommentCookie(HttpServletRequest request) {
		if (request == null || request.getCookies() == null) {
			return "";
		}
		for (Cookie cookie : request.getCookies()) {
			if (JwtConstants.ADMIN_COMMENT_COOKIE.equals(cookie.getName())) {
				return cookie.getValue();
			}
		}
		return "";
	}
}
