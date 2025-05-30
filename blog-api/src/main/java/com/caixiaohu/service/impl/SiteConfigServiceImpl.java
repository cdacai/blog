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
        log.setParam(configValue);
        log.setDescription("主题变更，原配置：" + (oldConfig != null ? oldConfig.getConfigValue() : "无") + ", 新配置：" + configValue);
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