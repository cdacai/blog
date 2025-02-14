package com.caixiaohu.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @Description: 相册图片实体类
 * @Author: caixiaohu
 * @Date: 2023-12-25
 */
@Data
@NoArgsConstructor
@TableName("album_image")
public class AlbumImage implements Serializable {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long albumId;

    private String name;

    private String url;

    private Long size;

    private String type;

    private String lastModified;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}