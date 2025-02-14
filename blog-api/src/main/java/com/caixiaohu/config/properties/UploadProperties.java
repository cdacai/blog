package com.caixiaohu.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "upload")
public class UploadProperties {
	/**
	 * 上传方式
	 */
	private String channel;
	/**
	 * 文件上传物理存储路径
	 */
	private String path;
	/**
	 * 文件访问路径映射
	 */
	private String accessPath;
}
