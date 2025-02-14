package com.caixiaohu.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 日志配置属性
 */
@ConfigurationProperties(prefix = "log.param")
@Component
@Data
public class LogProperties {
    /**
     * 请求参数长度限制
     */
    private int requestMaxLength = 500;

    /**
     * 响应参数长度限制
     */
    private int responseMaxLength = 500;

    /**
     * 响应成功时data字段最大长度
     */
    private int responseSuccessDataMaxLength = 100;
}