package com.caixiaohu.controller.admin;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.caixiaohu.annotation.OperationLogger;
import com.caixiaohu.model.entity.Album;
import com.caixiaohu.model.entity.AlbumImage;
import com.caixiaohu.service.AlbumService;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.util.AlbumConfigUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @Description: 相册管理控制器
 * @Author: caixiaohu
 * @Date: 2023-12-25
 */
@RestController
@RequestMapping("/admin/album")
public class AlbumAdminController {
    private static final Logger log = LoggerFactory.getLogger(AlbumAdminController.class);

    @Autowired
    private AlbumService albumService;
    
    @Autowired
    private AlbumConfigUtils albumConfigUtils;

    @GetMapping("/list")
    public Result getAlbumList() {
        List<Album> albums = albumService.getAlbums();
        return Result.ok("获取相册列表成功", albums);
    }

    /**
     * 获取相册图片列表
     */
    @GetMapping("/{albumName}/images")
    public Result getAlbumImages(@PathVariable String albumName) {
        List<AlbumImage> images = albumService.getAlbumImages(albumName);
        return Result.ok("获取成功", images);
    }

    @PostMapping
    @OperationLogger("创建相册")
    public Result createAlbum(@RequestBody Album album) {
        albumService.createAlbum(album);
        return Result.ok("创建成功");
    }

    @PostMapping("/{albumName}/upload")
    @OperationLogger("上传图片")
    public Result uploadImage(@PathVariable String albumName,
            @RequestParam("file") MultipartFile file) throws IOException {
        AlbumImage image = albumService.uploadImage(albumName, file);
        return Result.ok("上传成功", image);
    }

    @DeleteMapping("/{albumName}/image/{imageName:.+}")
    @OperationLogger("删除图片")
    public Result deleteImage(@PathVariable String albumName, @PathVariable String imageName) {
        log.debug("删除图片请求，相册：{}，图片名：{}", albumName, imageName);
        albumService.deleteImage(albumName, imageName);
        return Result.ok("删除成功");
    }

    @PostMapping("/{sourceAlbumName}/image/{imageName}/move/{targetAlbumName}")
    @OperationLogger("移动图片")
    public Result moveImage(@PathVariable String sourceAlbumName,
            @PathVariable String targetAlbumName,
            @PathVariable String imageName) {
        albumService.moveImage(sourceAlbumName, targetAlbumName, imageName);
        return Result.ok("移动成功");
    }

    @DeleteMapping("/{albumName}")
    @OperationLogger("删除相册")
    public Result deleteAlbum(@PathVariable String albumName) {
        try {
            albumService.deleteAlbum(albumName);
            return Result.ok("删除成功");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
    
    /**
     * 获取隐藏相册列表
     */
    @GetMapping("/hidden")
    public Result getHiddenAlbums() {
        List<String> hiddenAlbums = albumConfigUtils.getHiddenAlbums();
        return Result.ok("获取隐藏相册列表成功", hiddenAlbums);
    }
    
    /**
     * 更新相册隐藏状态
     */
    @PutMapping("/{albumName}/visibility")
    @OperationLogger("更新相册可见性")
    public Result updateAlbumVisibility(@PathVariable String albumName, @RequestBody Map<String, Boolean> params) {
        try {
            Boolean hidden = params.get("hidden");
            if (hidden == null) {
                return Result.error("参数错误");
            }
            
            boolean success;
            if (hidden) {
                success = albumConfigUtils.addHiddenAlbum(albumName);
                log.info("隐藏相册：{}", albumName);
            } else {
                success = albumConfigUtils.removeHiddenAlbum(albumName);
                log.info("显示相册：{}", albumName);
            }
            
            if (success) {
                return Result.ok(hidden ? "相册已隐藏" : "相册已显示");
            } else {
                return Result.error("更新相册可见性失败");
            }
        } catch (Exception e) {
            log.error("更新相册可见性异常: {}", e.getMessage(), e);
            return Result.error("更新相册可见性失败: " + e.getMessage());
        }
    }
}