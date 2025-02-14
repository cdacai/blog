package com.caixiaohu.util.upload.channel;

import com.caixiaohu.config.properties.UpyunProperties;
import com.caixiaohu.util.upload.UploadUtils;
import com.upyun.RestManager;
import okhttp3.Response;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * 又拍云存储上传方式
 */
@Lazy
@Component
public class UpyunChannel implements FileUploadChannel {
	private static final Logger logger = LoggerFactory.getLogger(UpyunChannel.class);
	private final UpyunProperties upyunProperties;
	private final RestManager manager;

	public UpyunChannel(UpyunProperties upyunProperties) {
		this.upyunProperties = upyunProperties;
		this.manager = new RestManager(upyunProperties.getBucketName(), upyunProperties.getUsername(),
				upyunProperties.getPassword());
		// 设置最优接入点，添加https协议头
		this.manager.setApiDomain("https://v0.api.upyun.com");
	}

	@Override
	public String upload(UploadUtils.ImageResource image) throws Exception {
		// 构建路径
		String path = upyunProperties.getPath();
		if (!path.startsWith("/")) {
			path = "/" + path;
		}
		if (!path.endsWith("/")) {
			path = path + "/";
		}
		String fileAbsolutePath = path + image.getType();

		// 设置必要的请求头
		Map<String, String> params = new HashMap<>();
		params.put("Content-Length", String.valueOf(image.getData().length));
		params.put("Content-Type",
				"image/" + image.getType().substring(image.getType().lastIndexOf(".") + 1).toLowerCase());

		// 上传文件
		Response response = manager.writeFile(fileAbsolutePath, image.getData(), params);
		if (!response.isSuccessful()) {
			String errorBody = response.body() != null ? response.body().string() : "Unknown error";
			String requestId = response.header("X-Request-Id");
			String errorMessage = String.format("又拍云上传失败: %d - %s, 请求ID: %s",
					response.code(),
					errorBody,
					requestId != null ? requestId : "未知");
			logger.error(errorMessage);
			throw new RuntimeException(errorMessage);
		}

		logger.info("图片上传成功: {}", fileAbsolutePath);
		return upyunProperties.getDomain() + fileAbsolutePath;
	}

	/**
	 * 列出目录内容
	 *
	 * @param resource 目录资源
	 * @return 目录内容的JSON字符串
	 */
	public String listDir(UploadUtils.ImageResource resource) throws Exception {
		String path = resource.getType();
		if (!path.startsWith("/")) {
			path = "/" + path;
		}

		// 设置必要的请求头
		Map<String, String> params = new HashMap<>();
		params.put("x-list-iter", ""); // 使用迭代器模式
		params.put("x-list-limit", "10000"); // 限制返回条数
		params.put("x-list-order", "desc"); // 降序排列

		// 获取目录列表
		Response response = manager.readDirIter(path, params);
		if (!response.isSuccessful()) {
			String errorBody = response.body() != null ? response.body().string() : "Unknown error";
			String requestId = response.header("X-Request-Id");
			String errorMessage = String.format("获取目录列表失败: %d - %s, 请求ID: %s",
					response.code(),
					errorBody,
					requestId != null ? requestId : "未知");
			logger.error(errorMessage);
			throw new RuntimeException(errorMessage);
		}

		String result = response.body().string();
		logger.info("目录列表获取成功: {}", path);
		return result;
	}
}
