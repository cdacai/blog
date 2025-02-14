package com.caixiaohu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.caixiaohu.model.entity.AlbumImage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * @Description: 相册图片Mapper接口
 * @Author: caixiaohu
 * @Date: 2023-12-25
 */
@Mapper
@Repository
public interface AlbumImageMapper extends BaseMapper<AlbumImage> {
    /**
     * 检查图片URL是否已存在
     */
    @Select("SELECT COUNT(*) > 0 FROM album_image WHERE url = #{url}")
    boolean existsByUrl(String url);
}