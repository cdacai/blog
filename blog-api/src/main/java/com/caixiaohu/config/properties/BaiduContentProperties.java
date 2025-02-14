package com.caixiaohu.config.properties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 百度内容审核配置
 */
@NoArgsConstructor
@Getter
@Setter
@ToString
@Configuration
@ConfigurationProperties(prefix = "baidu.content")
public class BaiduContentProperties {
    private String apiKey;
    private String secretKey;
    private Boolean enabled = true;
    /**
     * 是否允许疑似内容通过
     * true: 疑似内容视为合规
     * false: 疑似内容视为不合规
     */
    private Boolean allowSuspicious = false;
}