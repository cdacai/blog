package com.caixiaohu.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    
    private static final Logger log = LoggerFactory.getLogger(CorsConfig.class);
    
    @Value("${blog.cors.origins}")
    private String allowedOriginsStr;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        String[] allowedOrigins = allowedOriginsStr.split(",");
        log.info("CorsConfig - CORS allowed origins: {}", allowedOriginsStr);
        for (String origin : allowedOrigins) {
            log.info("CorsConfig - Allowed origin: {}", origin);
        }
        
        config.setAllowCredentials(true);
        // 设置允许的域名
        for (String allowedOrigin : allowedOrigins) {
            config.addAllowedOrigin(allowedOrigin);
        }
        // 设置允许的头信息
        config.addAllowedHeader("*");
        // 设置允许的方法
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        // 设置暴露的头信息
        config.addExposedHeader("Authorization");
        config.addExposedHeader("Access-Control-Allow-Origin");
        config.addExposedHeader("Access-Control-Allow-Credentials");
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
} 