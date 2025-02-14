package com.caixiaohu.util;

import nl.basjes.parse.useragent.UserAgent;
import nl.basjes.parse.useragent.UserAgentAnalyzer;
import org.springframework.stereotype.Component;

import com.caixiaohu.model.dto.UserAgentDTO;

/**
 * @Description: UserAgent解析工具类
 * @Author: Naccl
 * @Date: 2020-11-30
 */
@Component
public class UserAgentUtils {
	private UserAgentAnalyzer uaa;

	public UserAgentUtils() {
		this.uaa = UserAgentAnalyzer
				.newBuilder()
				.useJava8CompatibleCaching()
				.withCache(10000)
				.hideMatcherLoadStats()
				.withField(UserAgent.OPERATING_SYSTEM_NAME_VERSION_MAJOR)
				.withField(UserAgent.AGENT_NAME_VERSION)
				.withField(UserAgent.DEVICE_CLASS)
				.withField(UserAgent.DEVICE_BRAND)
				.withField(UserAgent.DEVICE_NAME)
				.build();
	}

	/**
	 * 从User-Agent解析客户端操作系统和浏览器版本
	 *
	 * @param userAgent
	 * @return
	 */
	public UserAgentDTO parseOsAndBrowser(String userAgent) {
		UserAgent agent = uaa.parse(userAgent);
		String os = agent.getValue(UserAgent.OPERATING_SYSTEM_NAME_VERSION_MAJOR);
		String browser = agent.getValue(UserAgent.AGENT_NAME_VERSION);
		String deviceType = agent.getValue(UserAgent.DEVICE_CLASS);
		String deviceBrand = agent.getValue(UserAgent.DEVICE_BRAND);
		String deviceModel = agent.getValue(UserAgent.DEVICE_NAME);
		return new UserAgentDTO(os, browser, deviceType, deviceBrand, deviceModel);
	}
}
