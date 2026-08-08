package com.caixiaohu.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.caixiaohu.entity.LoginLog;
import com.caixiaohu.entity.User;
import com.caixiaohu.exception.BadRequestException;
import com.caixiaohu.exception.LoginRateLimitException;
import com.caixiaohu.constant.JwtConstants;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.service.LoginLogService;
import com.caixiaohu.service.LoginAttemptService;
import com.caixiaohu.util.IpAddressUtils;
import com.caixiaohu.util.JacksonUtils;
import com.caixiaohu.util.JwtUtils;
import com.caixiaohu.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * @Description: JWT登录过滤器
 * @Author: Naccl
 * @Date: 2020-07-21
 */
public class JwtLoginFilter extends AbstractAuthenticationProcessingFilter {
	private static final Logger log = LoggerFactory.getLogger(JwtLoginFilter.class);

	LoginLogService loginLogService;
	LoginAttemptService loginAttemptService;
	ThreadLocal<String> currentUsername = new ThreadLocal<>();
	private final String adminCommentCookieDomain;
	private final boolean adminCommentCookieSecure;

	protected JwtLoginFilter(String defaultFilterProcessesUrl, AuthenticationManager authenticationManager,
			LoginLogService loginLogService, LoginAttemptService loginAttemptService,
			String adminCommentCookieDomain, boolean adminCommentCookieSecure) {
		super(new AntPathRequestMatcher(defaultFilterProcessesUrl));
		setAuthenticationManager(authenticationManager);
		this.loginLogService = loginLogService;
		this.loginAttemptService = loginAttemptService;
		this.adminCommentCookieDomain = adminCommentCookieDomain;
		this.adminCommentCookieSecure = adminCommentCookieSecure;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException {
		preventCaching(response);
		currentUsername.remove();
		try {
			if (!"POST".equals(request.getMethod())) {
				log.warn("Invalid request method: {}", request.getMethod());
				throw new BadRequestException("请求方法错误");
			}
			User user = JacksonUtils.readValue(request.getInputStream(), User.class);
			currentUsername.set(user.getUsername());
			String ip = IpAddressUtils.getIpAddress(request);
			if (loginAttemptService.isBlocked(user.getUsername(), ip)) {
				throw new LoginRateLimitException();
			}
			return getAuthenticationManager()
					.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		} catch (BadRequestException exception) {
			log.error("Bad request during authentication: {}", exception.getMessage());
			response.setContentType("application/json;charset=utf-8");
			Result result = Result.create(400, "非法请求");
			PrintWriter out = response.getWriter();
			out.write(JacksonUtils.writeValueAsString(result));
			out.flush();
			out.close();
		} catch (AuthenticationException exception) {
			throw exception;
		} catch (Exception e) {
			log.error("Authentication request processing failed", e);
			throw e;
		}
		return null;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			FilterChain chain, Authentication authResult) throws IOException {
		log.info("Authentication successful for user: {}", authResult.getName());
		preventCaching(response);
		loginAttemptService.loginSucceeded(authResult.getName());
		String jwt = JwtUtils.generateToken(authResult.getName(), authResult.getAuthorities());
		response.setContentType("application/json;charset=utf-8");
		User user = (User) authResult.getPrincipal();
		user.setPassword(null);
		Map<String, Object> map = new HashMap<>(4);
		map.put("user", user);
		map.put("token", jwt);
		addAdminCommentCookie(response, authResult);
		Result result = Result.ok("登录成功", map);
		PrintWriter out = response.getWriter();
		out.write(JacksonUtils.writeValueAsString(result));
		out.flush();
		out.close();
		LoginLog log = handleLog(request, true, "登录成功");
		loginLogService.saveLoginLog(log);
	}

	private void addAdminCommentCookie(HttpServletResponse response, Authentication authResult) {
		String adminCommentToken = JwtUtils.generateToken(
				JwtConstants.ADMIN_PREFIX + authResult.getName(),
				authResult.getAuthorities()
		);
		StringBuilder cookie = new StringBuilder();
		cookie.append(JwtConstants.ADMIN_COMMENT_COOKIE)
				.append("=")
				.append(adminCommentToken)
				.append("; Path=/; HttpOnly; SameSite=")
				.append(adminCommentCookieSecure ? "None" : "Lax");
		if (!StringUtils.isEmpty(adminCommentCookieDomain)) {
			cookie.append("; Domain=").append(adminCommentCookieDomain);
		}
		if (adminCommentCookieSecure) {
			cookie.append("; Secure");
		}
		response.addHeader("Set-Cookie", cookie.toString());
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException {
		preventCaching(response);
		response.setContentType("application/json;charset=utf-8");
		String username = currentUsername.get();
		boolean rateLimited = exception instanceof LoginRateLimitException;
		String msg = rateLimited ? "登录尝试过于频繁，请稍后再试" : "用户名或密码错误";
		if (!rateLimited) {
			loginAttemptService.loginFailed(username, IpAddressUtils.getIpAddress(request));
		}
		log.warn("Authentication failure reason: {}", msg);
		PrintWriter out = response.getWriter();
		out.write(JacksonUtils.writeValueAsString(Result.create(401, msg)));
		out.flush();
		out.close();
		LoginLog log = handleLog(request, false, StringUtils.substring(msg, 0, 50));
		loginLogService.saveLoginLog(log);
	}

	private void preventCaching(HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-store");
		response.setHeader("Pragma", "no-cache");
	}

	/**
	 * 设置LoginLog对象属性
	 *
	 * @param request     请求对象
	 * @param status      登录状态
	 * @param description 操作描述
	 * @return
	 */
	private LoginLog handleLog(HttpServletRequest request, boolean status, String description) {
		String username = currentUsername.get();
		currentUsername.remove();
		String ip = IpAddressUtils.getIpAddress(request);
		String userAgent = request.getHeader("User-Agent");
		LoginLog log = new LoginLog(username, ip, status, description, userAgent);
		return log;
	}
}
