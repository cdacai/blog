package com.caixiaohu.config;

import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.caixiaohu.model.vo.Result;
import com.caixiaohu.util.JacksonUtils;
import com.caixiaohu.util.JwtUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * @Description: JWT请求过滤器
 * @Author: Naccl
 * @Date: 2020-07-21
 */
public class JwtFilter extends GenericFilterBean {
	private static final Logger log = LoggerFactory.getLogger(JwtFilter.class);

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		//后台管理路径外的请求直接跳过
		if (!request.getRequestURI().startsWith(request.getContextPath() + "/admin")) {
			filterChain.doFilter(request, servletResponse);
			return;
		}
		String jwt = request.getHeader("Authorization");
		log.info("Received JWT: {}", jwt);
		if (JwtUtils.judgeTokenIsExist(jwt)) {
			try {
				Claims claims = JwtUtils.getTokenBody(jwt);
				String username = claims.getSubject();
				Object authoritiesClaim = claims.get("authorities");
				log.debug("JWT claims - subject: {}, authorities: {}, type: {}", 
					username, authoritiesClaim, 
					authoritiesClaim != null ? authoritiesClaim.getClass().getName() : "null");
				
				List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(
					(String) claims.get("authorities")
				);
				log.debug("Parsed authorities: {}", authorities);
				
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
					username, null, authorities
				);
				SecurityContextHolder.getContext().setAuthentication(token);
			} catch (Exception e) {
				log.error("JWT validation failed: {}", e.getMessage(), e);
				e.printStackTrace();
				response.setContentType("application/json;charset=utf-8");
				Result result = Result.create(403, "凭证已失效，请重新登录！");
				PrintWriter out = response.getWriter();
				out.write(JacksonUtils.writeValueAsString(result));
				out.flush();
				out.close();
				return;
			}
		}
		filterChain.doFilter(servletRequest, servletResponse);
	}
}