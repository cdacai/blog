package com.caixiaohu.service;

import com.caixiaohu.model.entity.Album;
import com.caixiaohu.model.entity.AlbumImage;
import com.caixiaohu.service.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
public class AlbumService {
    @Value("${upload.channel}")
    private String uploadChannel;

    @Autowired
    @Qualifier("localStorageService")
    private StorageService localStorageService;

    @Autowired
    @Qualifier("upyunStorageService")
    private StorageService upyunStorageService;

    private StorageService getStorageService() {
        log.info("当前使用的存储服务: {}", uploadChannel);
        return "local".equals(uploadChannel) ? localStorageService : upyunStorageService;
    }

    public List<Album> getAlbums() {
        log.info("开始获取相册列表");
        List<Album> albums = getStorageService().getAlbums();
        log.info("获取相册列表完成，共{}个相册", albums.size());
        return albums;
    }

    public void createAlbum(Album album) {
        getStorageService().createAlbum(album);
    }

    public AlbumImage uploadImage(String albumName, MultipartFile file) throws IOException {
        return getStorageService().uploadImage(albumName, file);
    }

    public void deleteImage(String albumName, String imageName) {
        getStorageService().deleteImage(albumName, imageName);
    }

    public void deleteAlbum(String albumName) {
        getStorageService().deleteAlbum(albumName);
    }

    public List<AlbumImage> getAlbumImages(String albumName) {
        return getStorageService().getAlbumImages(albumName);
    }

    public void moveImage(String sourceAlbumName, String targetAlbumName, String imageName) {
        getStorageService().moveImage(sourceAlbumName, targetAlbumName, imageName);
    }
}