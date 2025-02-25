package com.caixiaohu.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @Description: IP地址工具类
 * @Author: Claude
 */
@Component
public class IpAddressUtils {
	private static final Logger logger = LoggerFactory.getLogger(IpAddressUtils.class);
	
	private static GeoIPService geoIPService;
	
	@Autowired
	public void setGeoIPService(GeoIPService geoIPService) {
		IpAddressUtils.geoIPService = geoIPService;
	}

	/**
	 * 获取IP地址
	 */
	public static String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
			if ("127.0.0.1".equals(ip) || "0:0:0:0:0:0:0:1".equals(ip)) {
				// 根据网卡取本机配置的IP
				try {
					InetAddress inet = InetAddress.getLocalHost();
					ip = inet.getHostAddress();
				} catch (UnknownHostException e) {
					logger.error("获取本地IP地址失败", e);
				}
			}
		}
		if (ip != null && ip.length() > 15) {
			if (ip.indexOf(",") > 0) {
				ip = ip.substring(0, ip.indexOf(","));
			}
		}
		return ip;
	}

	/**
	 * 获取IP来源
	 */
	public static String getCityInfo(String ip) {
		Object[] info = geoIPService.getCityInfo(ip);
		if (info != null && info[0] != null) {
			return info[0].toString();
		}
		return "未知";
	}
}