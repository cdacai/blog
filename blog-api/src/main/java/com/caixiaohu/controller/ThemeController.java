package com.caixiaohu.controller;

import com.caixiaohu.constant.JwtConstants;
import com.caixiaohu.entity.SiteConfig;
import com.caixiaohu.service.SiteConfigService;
import com.caixiaohu.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @Description: 主题配置接口（前台/后台）
 * @Author: 系统自动生成
 * @Date: 2024-04-01
 */
@RestController
public class ThemeController {
    @Autowired
    private SiteConfigService siteConfigService;

    // 简单限流：每IP每分钟最多3次
    private static final int THEME_LIMIT = 3;
    private static final long THEME_WINDOW_MS = 60 * 1000L;
    private static final Map<String, AccessRecord> themeAccessMap = new ConcurrentHashMap<>();

    private static class AccessRecord {
        int count;
        long windowStart;
    }

    /**
     * 获取当前主题配置（前台/所有用户）
     */
    @GetMapping("/api/theme")
    public ResponseEntity<?> getTheme() {
        SiteConfig config = siteConfigService.getThemeConfig();
        if (config == null) {
            // 降级返回默认主题
            return ResponseEntity.ok().body("{\"theme\":\"theme1\"}");
        }
        return ResponseEntity.ok().body(config.getConfigValue());
    }

    /**
     * 更新主题配置（仅admin，JWT校验）
     */
    @PostMapping("/admin/theme")
    public ResponseEntity<?> updateTheme(@RequestBody String configValue, @RequestHeader("Authorization") String jwt, HttpServletRequest request) {
        // 限流逻辑
        String ip = request.getRemoteAddr();
        long now = System.currentTimeMillis();
        AccessRecord record = themeAccessMap.getOrDefault(ip, new AccessRecord());
        if (now - record.windowStart > THEME_WINDOW_MS) {
            record.count = 1;
            record.windowStart = now;
        } else {
            record.count++;
        }
        themeAccessMap.put(ip, record);
        if (record.count > THEME_LIMIT) {
            return ResponseEntity.status(429).body("操作过于频繁，请稍后再试");
        }
        if (!JwtUtils.judgeTokenIsExist(jwt)) {
            return ResponseEntity.status(401).body("未登录或token无效");
        }
        String subject;
        try {
            subject = JwtUtils.getTokenBody(jwt).getSubject();
        } catch (Exception e) {
            return ResponseEntity.status(401).body("token已失效，请重新登录");
        }
        if (!subject.startsWith(JwtConstants.ADMIN_PREFIX)) {
            return ResponseEntity.status(403).body("无权限操作");
        }
        // 通过校验，允许操作
        siteConfigService.updateThemeConfig(configValue, subject.replace(JwtConstants.ADMIN_PREFIX, ""), ip, request.getHeader("User-Agent"));
        return ResponseEntity.ok().body("success");
    }
} 