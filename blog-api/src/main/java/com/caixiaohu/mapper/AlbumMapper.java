package com.caixiaohu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.caixiaohu.model.entity.Album;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Description: 相册Mapper接口
 * @Author: caixiaohu
 * @Date: 2023-12-25
 */
@Mapper
@Repository
public interface AlbumMapper extends BaseMapper<Album> {
    /**
     * 增加相册图片数量
     */
    @Update("UPDATE album SET image_count = image_count + 1 WHERE id = #{albumId}")
    void incrementImageCount(Long albumId);

    /**
     * 减少相册图片数量
     */
    @Update("UPDATE album SET image_count = image_count - 1 WHERE id = #{albumId}")
    void decrementImageCount(Long albumId);

    /**
     * 获取默认相册
     */
    @Select("SELECT * FROM album WHERE name = '默认相册' LIMIT 1")
    Album getDefaultAlbum();
}