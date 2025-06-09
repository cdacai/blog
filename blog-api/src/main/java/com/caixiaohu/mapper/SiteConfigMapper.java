package com.caixiaohu.mapper;

import com.caixiaohu.entity.SiteConfig;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SiteConfigMapper {
    /**
     * 获取指定key的配置
     */
    SiteConfig getByKey(@Param("configKey") String configKey);

    /**
     * 更新指定key的配置
     */
    int updateByKey(@Param("configKey") String configKey, @Param("configValue") String configValue);
} 