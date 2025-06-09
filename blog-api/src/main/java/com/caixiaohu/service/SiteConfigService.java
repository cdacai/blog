package com.caixiaohu.service;

import com.caixiaohu.entity.SiteConfig;

public interface SiteConfigService {
    /**
     * 获取主题配置
     */
    SiteConfig getThemeConfig();

    /**
     * 更新主题配置
     */
    void updateThemeConfig(String configValue);

    /**
     * 更新主题配置（带操作日志）
     * @param configValue 新主题配置
     * @param username 操作人
     * @param ip 操作IP
     * @param userAgent UA
     */
    void updateThemeConfig(String configValue, String username, String ip, String userAgent);
} 