package com.caixiaohu.service.storage;

import com.caixiaohu.model.entity.Album;
import com.caixiaohu.model.entity.AlbumImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * 存储服务接口
 */
public interface StorageService {
    /**
     * 获取相册列表
     */
    List<Album> getAlbums();

    /**
     * 创建相册
     */
    void createAlbum(Album album);

    /**
     * 上传图片到相册
     */
    AlbumImage uploadImage(String albumName, MultipartFile file) throws IOException;

    /**
     * 删除图片
     */
    void deleteImage(String albumName, String imageName);

    /**
     * 删除相册
     */
    void deleteAlbum(String albumName);

    /**
     * 获取相册图片列表
     */
    List<AlbumImage> getAlbumImages(String albumName);

    /**
     * 移动图片
     */
    void moveImage(String sourceAlbumName, String targetAlbumName, String imageName);
}