package com.caixiaohu.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @Description: 相册实体类
 * @Author: caixiaohu
 * @Date: 2023-12-25
 */
@Data
@NoArgsConstructor
@TableName("album")
public class Album implements Serializable {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;

    private String description;

    private Integer imageCount;

    private String coverUrl;

    private String path;

    private String lastModified;
    
    // 是否隐藏（不存储到数据库，仅用于前端展示）
    @TableField(exist = false)
    private Boolean hidden;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    public String getLastModified() {
        return lastModified;
    }

    public void setLastModified(String lastModified) {
        this.lastModified = lastModified;
    }
    
    public Boolean getHidden() {
        return hidden != null ? hidden : false;
    }
    
    public void setHidden(Boolean hidden) {
        this.hidden = hidden;
    }
}