package com.caixiaohu.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.context.annotation.ComponentScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.caixiaohu.config.properties.UploadProperties;
import com.caixiaohu.interceptor.AccessLimitInterceptor;
import com.caixiaohu.interceptor.RequestLogInterceptor;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Description: 配置CORS跨域支持、拦截器
 * @Author: Naccl
 * @Date: 2020-07-22
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.caixiaohu")
public class WebConfig implements WebMvcConfigurer {

	@Autowired
	AccessLimitInterceptor accessLimitInterceptor;
	@Autowired
	RequestLogInterceptor requestLogInterceptor;
	@Autowired
	UploadProperties uploadProperties;

	/**
	 * 请求拦截器
	 *
	 * @param registry
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(accessLimitInterceptor);
		registry.addInterceptor(requestLogInterceptor);
	}

	/**
	 * 处理上传路径，根据不同情况处理路径格式
	 * 
	 * 路径处理规则:
	 * 1. 空值情况:
	 * - 输入为null或空字符串时返回默认路径
	 * - 返回 ./upload
	 * 
	 * 2. Windows系统绝对路径:
	 * - 以盘符开头的路径
	 * - 保持原样返回
	 * 
	 * 3. Linux系统绝对路径:
	 * - 以/开头的路径
	 * - 保持原样返回
	 * 
	 * 4. 相对路径:
	 * - 不以盘符和/开头的路径
	 * - 自动添加./前缀
	 * 
	 * @param path 原始路径字符串
	 * @return 处理后的路径字符串
	 */
	private String processUploadPath(String path) {
		// 1. 空值情况：返回默认路径
		if (path == null || path.isEmpty()) {
			return "./upload";
		}

		// 2. Windows系统绝对路径：以盘符开头（如 C:\）
		// 3. Linux系统绝对路径：以/开头
		if (path.matches("^[A-Za-z]:\\\\.*") || path.startsWith("/")) {
			return path;
		}

		// 4. 相对路径：添加./前缀
		return "./" + path;
	}

	/**
	 * 资源处理器
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// 本地文件上传路径映射
		String accessPath = uploadProperties.getAccessPath();
		if (!accessPath.startsWith("/")) {
			accessPath = "/" + accessPath;
		}
		if (!accessPath.endsWith("/")) {
			accessPath = accessPath + "/";
		}

		String physicalPath = processUploadPath(uploadProperties.getPath());
		if (!physicalPath.endsWith("/")) {
			physicalPath = physicalPath + "/";
		}

		registry.addResourceHandler(accessPath + "**")
				.addResourceLocations("file:" + physicalPath);
	}

	/**
	 * 注册请求响应包装过滤器
	 */
	@Bean
	public FilterRegistrationBean<Filter> contentCachingFilter() {
		FilterRegistrationBean<Filter> registration = new FilterRegistrationBean<>();
		registration.setFilter(new OncePerRequestFilter() {
			@Override
			protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
					FilterChain filterChain) throws ServletException, IOException {
				ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
				ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper(response);
				try {
					filterChain.doFilter(wrappedRequest, wrappedResponse);
				} finally {
					wrappedResponse.copyBodyToResponse();
				}
			}
		});
		registration.addUrlPatterns("/*");
		registration.setName("contentCachingFilter");
		registration.setOrder(1);
		return registration;
	}
}
