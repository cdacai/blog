package com.caixiaohu.entity;

import lombok.Data;
import java.util.Date;

/**
 * @Description: 站点配置（主题等通用配置）
 * @Author: 系统自动生成
 * @Date: 2024-04-01
 */
@Data
public class SiteConfig {
    private Integer id;
    private String configKey;
    private String configValue;
    private Date createdAt;
    private Date updatedAt;
} 