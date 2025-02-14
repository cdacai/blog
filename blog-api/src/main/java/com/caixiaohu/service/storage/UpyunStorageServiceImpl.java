package com.caixiaohu.service.storage;

import com.caixiaohu.config.properties.BlogProperties;
import com.caixiaohu.model.entity.Album;
import com.caixiaohu.model.entity.AlbumImage;
import com.caixiaohu.util.CloudStorageUtils;
import com.caixiaohu.util.FileUtils;
import com.caixiaohu.util.UpyunUtils;
import com.upyun.UpException;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
@Service("upyunStorageService")
public class UpyunStorageServiceImpl implements StorageService {
    @Autowired
    private UpyunUtils upyunUtils;

    @Override
    public List<Album> getAlbums() {
        try {
            log.info("=================== 开始获取相册列表 ===================");
            List<Album> albums = new ArrayList<>();
            // 从根目录开始检查
            checkDirectory("/", albums);

            // 按照最后修改时间排序
            log.info("开始对相册按最后修改时间排序");
            albums.sort((a1, a2) -> {
                long time1 = 0L;
                long time2 = 0L;
                try {
                    time1 = Long.parseLong(a1.getLastModified());
                } catch (Exception e) {
                    log.warn("解析相册[{}]时间失败", a1.getName());
                }
                try {
                    time2 = Long.parseLong(a2.getLastModified());
                } catch (Exception e) {
                    log.warn("解析相册[{}]时间失败", a2.getName());
                }
                return Long.compare(time2, time1); // 降序排列，最新的在前面
            });
            log.info("相册排序完成");
            log.info("=================== 获取相册列表完成，共{}个相册 ===================", albums.size());
            return albums;
        } catch (IOException | UpException e) {
            log.error("获取相册列表失败：{}", e.getMessage());
            throw new RuntimeException("获取相册列表失败：" + e.getMessage());
        }
    }

    private void checkDirectory(String path, List<Album> albums) throws IOException, UpException {
        Response response = null;
        try {
            log.info("检查目录: {}", path);
            response = upyunUtils.getManager().readDirIter(path, null);
            if (!response.isSuccessful()) {
                String errorMsg = String.format("读取目录失败: %s - HTTP状态码: %d, 错误信息: %s",
                        path, response.code(), response.message());
                log.error(errorMsg);
                throw new IOException(errorMsg);
            }

            String jsonStr = response.body().string();
            if (StringUtils.isEmpty(jsonStr)) {
                log.info("目录为空: {}", path);
                if (!"/".equals(path)) { // 不是根目录的空目录也作为相册
                    addAlbum(path, albums, null, 0, null);
                }
                return;
            }

            log.debug("目录[{}]发现{}个文件记录", path, jsonStr.split("\n").length);
            String coverUrl = null;
            int imageCount = 0;
            long lastModified = 0;

            String[] lines = jsonStr.split("\n");
            for (String line : lines) {
                if (line.trim().isEmpty()) continue;
                String[] parts = line.split("\t");
                if (parts.length < 2) continue;

                String name = parts[0];
                String type = parts[1];
                long time = parts.length > 3 ? Long.parseLong(parts[3]) : 0;
                lastModified = Math.max(lastModified, time);

                if ("F".equals(type)) {
                    String subPath = path.endsWith("/") ? path + name : path + "/" + name;
                    log.debug("发现子目录: {}", subPath);
                    
                    // 如果是 /main 目录下的子目录，直接检查，不要重复添加
                    if ("/main".equals(path)) {
                        checkDirectory(subPath, albums);
                        continue;
                    }
                    
                    // 如果已经存在同名相册（可能在 /main 下），跳过
                    String albumName = name;
                    if (albums.stream().anyMatch(a -> a.getName().equals(albumName))) {
                        log.debug("跳过已存在的相册: {}", albumName);
                        continue;
                    }
                    
                    checkDirectory(subPath, albums);
                } else if ("N".equals(type) && isImageFile(name)) {
                    log.debug("发现图片文件: {}", name);
                    imageCount++;
                    if (coverUrl == null) {
                        coverUrl = upyunUtils.getDomain() + path + "/" + name;
                        log.debug("设置目录首张图片URL: {}", coverUrl);
                    }
                }
            }

            if (!"/".equals(path) && !"/main".equals(path)) {
                String albumName = path.substring(path.lastIndexOf("/") + 1);
                // 检查是否已存在同名相册
                if (albums.stream().noneMatch(a -> a.getName().equals(albumName))) {
                    addAlbum(path, albums, coverUrl, imageCount, String.valueOf(lastModified));
                }
            }
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    private void addAlbum(String path, List<Album> albums, String coverUrl, int imageCount, String lastModified) {
        // 获取目录名称
        String dirName = path.equals("/") ? path
                : path.endsWith("/")
                        ? path.substring(path.lastIndexOf("/", path.length() - 2) + 1, path.length() - 1)
                        : path.substring(path.lastIndexOf("/") + 1);

        Album album = new Album();
        album.setName(dirName);
        album.setImageCount(imageCount);
        if (coverUrl != null) {
            album.setCoverUrl(coverUrl);
        }
        album.setLastModified(lastModified != null ? lastModified : "0");
        
        log.info("添加相册: name={}, 图片数量={}, 封面URL={}, 最后修改时间={}",
                dirName, imageCount, coverUrl,
                lastModified == null || lastModified.equals("0") ? "无" : new Date(Long.parseLong(lastModified) * 1000));
        albums.add(album);
    }

    @Override
    public void createAlbum(Album album) {
        try {
            String baseDir = upyunUtils.getDefaultPath().substring(0, upyunUtils.getDefaultPath().lastIndexOf("/"));
            String albumPath = baseDir + "/" + album.getName();
            if (!upyunUtils.createDirectory(albumPath)) {
                throw new RuntimeException("创建相册目录失败");
            }
            log.info("创建相册成功：{}", album.getName());
        } catch (Exception e) {
            log.error("创建相册失败", e);
            throw new RuntimeException("创建相册失败：" + e.getMessage());
        }
    }

    @Override
    public AlbumImage uploadImage(String albumName, MultipartFile file) throws IOException {
        try {
            // 先检查相册是否存在，以及它的实际路径
            String albumPath;
            Response response = upyunUtils.getManager().readDirIter("/" + albumName, null);
            if (response.isSuccessful()) {
                albumPath = "/" + albumName;
            } else {
                String mainPath = "/main/" + albumName;
                response = upyunUtils.getManager().readDirIter(mainPath, null);
                if (!response.isSuccessful()) {
                    throw new IOException("相册不存在：" + albumName);
                }
                albumPath = mainPath;
            }
            response.close();

            // 使用实际的相册路径上传图片
            String imageUrl = upyunUtils.uploadImage(file, albumPath);

            AlbumImage image = new AlbumImage();
            image.setName(FileUtils.processFileName(file.getOriginalFilename()));
            image.setUrl(imageUrl);
            image.setSize(file.getSize());
            image.setType(file.getContentType());

            return image;
        } catch (Exception e) {
            log.error("上传图片失败：{}", e.getMessage());
            throw new IOException("上传图片失败：" + e.getMessage());
        }
    }

    @Override
    public void deleteImage(String albumName, String imageName) {
        Response response = null;
        try {
            // URL 编码处理
            String encodedAlbumName = URLEncoder.encode(albumName, StandardCharsets.UTF_8.name());
            String encodedImageName = URLEncoder.encode(imageName, StandardCharsets.UTF_8.name());
            
            // 先检查图片的实际路径
            String directPath = "/" + encodedAlbumName + "/" + encodedImageName;
            String mainPath = "/main/" + encodedAlbumName + "/" + encodedImageName;
            String targetPath;
            
            response = upyunUtils.getManager().getFileInfo(directPath);
            if (response.isSuccessful()) {
                targetPath = directPath;
            } else {
                response.close();
                response = upyunUtils.getManager().getFileInfo(mainPath);
                if (!response.isSuccessful()) {
                    throw new IOException("图片不存在：" + imageName);
                }
                targetPath = mainPath;
            }
            response.close();

            // 使用实际路径删除图片
            response = upyunUtils.getManager().deleteFile(targetPath, null);
            if (!response.isSuccessful()) {
                throw new IOException("删除失败：" + response.message());
            }
            
            log.info("删除图片成功：{}", targetPath);
        } catch (Exception e) {
            log.error("删除图片失败：{}", e.getMessage(), e);
            throw new RuntimeException("删除图片失败：" + e.getMessage());
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    @Override
    public void deleteAlbum(String albumName) {
        try {
            if ("main".equals(albumName)) {
                throw new RuntimeException("根目录不能删除");
            }
            String baseDir = upyunUtils.getDefaultPath().substring(0, upyunUtils.getDefaultPath().lastIndexOf("/"));
            upyunUtils.deleteDirectory(baseDir + "/" + albumName);
            log.info("删除相册成功：{}", albumName);
        } catch (Exception e) {
            log.error("删除相册失败：{}", e.getMessage());
            throw new RuntimeException("删除相册失败：" + e.getMessage());
        }
    }

    @Override
    public List<AlbumImage> getAlbumImages(String albumName) {
        try {
            List<AlbumImage> images = new ArrayList<>();
            String albumPath = "/" + albumName;
            
            log.debug("正在获取相册目录内容，路径: {}", albumPath);
            
            Response response = upyunUtils.getManager().readDirIter(albumPath, null);
            if (!response.isSuccessful()) {
                if (response.code() == 404) {
                    // 如果直接路径不存在，尝试检查 /main 下的路径
                    String mainPath = "/main/" + albumName;
                    response = upyunUtils.getManager().readDirIter(mainPath, null);
                    if (!response.isSuccessful()) {
                        log.warn("相册目录不存在：{} 和 {}", albumPath, mainPath);
                        return new ArrayList<>();
                    }
                    albumPath = mainPath;
                } else {
                    log.error("获取目录内容失败：{} - HTTP状态码: {}, 错误信息: {}", 
                        albumPath, response.code(), response.message());
                    throw new IOException("获取目录内容失败：" + response.message());
                }
            }

            String jsonStr = response.body().string();
            if (!StringUtils.isEmpty(jsonStr)) {
                String[] lines = jsonStr.split("\n");
                for (String line : lines) {
                    if (line.trim().isEmpty()) continue;
                    String[] parts = line.split("\t");
                    if (parts.length < 2) continue;

                    String name = parts[0];
                    String type = parts[1];
                    long size = parts.length > 3 ? Long.parseLong(parts[2]) : 0;

                    if ("N".equals(type) && isImageFile(name)) {
                        AlbumImage image = new AlbumImage();
                        image.setName(name);
                        // 使用实际找到的路径构建URL
                        image.setUrl(upyunUtils.getDomain() + albumPath + "/" + name);
                        image.setSize(size);
                        image.setType(getContentType(name));
                        images.add(image);
                    }
                }
            }

            return images;
        } catch (Exception e) {
            log.error("获取相册图片列表失败：{}", e.getMessage());
            throw new RuntimeException("获取相册图片列表失败：" + e.getMessage());
        }
    }

    @Override
    public void moveImage(String sourceAlbumName, String targetAlbumName, String imageName) {
        try {
            String baseDir = upyunUtils.getDefaultPath().substring(0, upyunUtils.getDefaultPath().lastIndexOf("/"));
            String sourcePath = sourceAlbumName.equals("默认相册") ? upyunUtils.getDefaultPath() + "/" + imageName
                    : baseDir + "/" + sourceAlbumName + "/" + imageName;
            String targetPath = targetAlbumName.equals("默认相册") ? upyunUtils.getDefaultPath() + "/" + imageName
                    : baseDir + "/" + targetAlbumName + "/" + imageName;

            // 又拍云不支持直接移动文件，需要先复制后删除
            Map<String, String> params = new HashMap<>();
            Response response = upyunUtils.getManager().copyFile(sourcePath, targetPath, params);
            if (!response.isSuccessful()) {
                throw new IOException("复制文件失败：" + response.message());
            }

            upyunUtils.deleteImage(sourcePath);
            log.info("移动图片成功：从 {} 移动到 {}", sourcePath, targetPath);
        } catch (Exception e) {
            log.error("移动图片失败：{}", e.getMessage());
            throw new RuntimeException("移动图片失败：" + e.getMessage());
        }
    }

    // 辅助方法
    private boolean isImageFile(String filename) {
        return CloudStorageUtils.isImageFile(filename);
    }

    private String getContentType(String filename) {
        return CloudStorageUtils.getContentType(filename);
    }

    private String getFileExtension(String filename) {
        return CloudStorageUtils.getFileExtension(filename);
    }

    /**
     * 获取相册的最后修改时间
     */
    private long getAlbumLastModified(String albumName) {
        Response response = null;
        try {
            String baseDir = upyunUtils.getDefaultPath().substring(0, upyunUtils.getDefaultPath().lastIndexOf("/"));
            String albumPath = albumName.equals("默认相册") ? upyunUtils.getDefaultPath() : baseDir + "/" + albumName;

            response = upyunUtils.getManager().readDirIter(albumPath, null);
            if (!response.isSuccessful()) {
                log.error("获取目录内容失败：{} - HTTP状态码: {}, 错误信息: {}",
                        albumPath, response.code(), response.message());
                return 0L;
            }

            String jsonStr = response.body().string();
            if (StringUtils.isEmpty(jsonStr)) {
                log.debug("目录为空：{}", albumPath);
                return 0L;
            }

            long latestTime = 0L;
            String[] lines = jsonStr.split("\n");
            for (String line : lines) {
                if (line.trim().isEmpty())
                    continue;
                String[] parts = line.split("\t");
                if (parts.length < 4)
                    continue;

                try {
                    long timestamp = Long.parseLong(parts[3]);
                    if (timestamp > latestTime) {
                        latestTime = timestamp;
                    }
                } catch (NumberFormatException e) {
                    log.warn("解析文件时间失败: {} - {}", parts[3], e.getMessage());
                }
            }

            return latestTime;
        } catch (Exception e) {
            log.error("获取相册[{}]最后修改时间失败: {}", albumName, e.getMessage(), e);
            return 0L;
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }
}