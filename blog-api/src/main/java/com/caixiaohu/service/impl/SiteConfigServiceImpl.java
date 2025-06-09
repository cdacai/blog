package com.caixiaohu.service.impl;

import com.caixiaohu.entity.SiteConfig;
import com.caixiaohu.mapper.SiteConfigMapper;
import com.caixiaohu.service.SiteConfigService;
import com.caixiaohu.service.OperationLogService;
import com.caixiaohu.entity.OperationLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SiteConfigServiceImpl implements SiteConfigService {
    private static final String THEME_KEY = "current_theme";

    @Autowired
    private SiteConfigMapper siteConfigMapper;

    @Autowired
    private OperationLogService operationLogService;

    @Override
    public SiteConfig getThemeConfig() {
        return siteConfigMapper.getByKey(THEME_KEY);
    }

    @Override
    @Transactional
    public void updateThemeConfig(String configValue, String username, String ip, String userAgent) {
        // 获取变更前配置
        SiteConfig oldConfig = siteConfigMapper.getByKey(THEME_KEY);
        siteConfigMapper.updateByKey(THEME_KEY, configValue);
        // 记录操作日志
        OperationLog log = new OperationLog();
        log.setUsername(username);
        log.setUri("/admin/theme");
        log.setMethod("POST");
        // 只存关键参数
        String themeName = null, primaryColor = null, background = null;
        try {
            com.fasterxml.jackson.databind.JsonNode node = com.fasterxml.jackson.databind.json.JsonMapper.builder().build().readTree(configValue);
            themeName = node.has("theme") ? node.get("theme").asText() : null;
            primaryColor = node.has("primaryColor") ? node.get("primaryColor").asText() : null;
            background = node.has("background") ? node.get("background").asText() : null;
        } catch (Exception ignore) {}
        log.setParam(String.format("theme=%s, primaryColor=%s, background=%s", themeName, primaryColor, background));
        String desc = "主题变更，原配置：" + (oldConfig != null ? oldConfig.getConfigValue() : "无") + ", 新配置：" + log.getParam();
        if (desc.length() > 255) {
            desc = desc.substring(0, 255);
        }
        log.setDescription(desc);
        log.setIp(ip);
        log.setUserAgent(userAgent);
        log.setTimes(0);
        operationLogService.saveOperationLog(log);
    }

    @Override
    @Transactional
    public void updateThemeConfig(String configValue) {
        // 兼容老接口，默认用户名/UA/IP为unknown
        updateThemeConfig(configValue, "unknown", "unknown", "unknown");
    }
} 