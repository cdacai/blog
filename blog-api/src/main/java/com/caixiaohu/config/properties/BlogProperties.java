package com.caixiaohu.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 博客配置(目前用于评论提醒模板中的超链接)
 *
 * @author: Naccl
 * @date: 2022-01-22
 */
@ConfigurationProperties(prefix = "blog")
@Component
@Data
public class BlogProperties {
	/**
	 * 博客名称
	 */
	private String name;
	/**
	 * 博客后端接口URL
	 */
	private String api;
	/**
	 * 博客前端后台管理URL
	 */
	private String cms;
	/**
	 * 博客前端前台页面URL
	 */
	private String view;
	/**
	 * 跨域配置
	 */
	private Cors cors;

	@Data
	public static class Cors {
		/**
		 * 允许的跨域源
		 */
		private String origins;
		/**
		 * 是否允许携带凭证
		 */
		private Boolean credentials;
		/**
		 * 允许的HTTP方法
		 */
		private String methods;
		/**
		 * 允许的HTTP头
		 */
		private String headers;
		/**
		 * 最大缓存时间
		 */
		private Long maxAge;
	}
}
