package com.caixiaohu.service.storage;

import com.caixiaohu.config.properties.BlogProperties;
import com.caixiaohu.config.properties.UploadProperties;
import com.caixiaohu.model.entity.Album;
import com.caixiaohu.model.entity.AlbumImage;
import com.caixiaohu.util.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.annotation.PostConstruct;

@Slf4j
@Service("localStorageService")
public class LocalStorageServiceImpl implements StorageService {
    @Autowired
    private BlogProperties blogProperties;

    @Autowired
    private UploadProperties uploadProperties;

    // 添加 rootDir 成员变量
    private File rootDir;

    // 添加 @PostConstruct 注解的初始化方法
    @PostConstruct
    public void init() {
        String processedPath = processUploadPath(uploadProperties.getPath());
        rootDir = new File(processedPath);
        if (!rootDir.exists()) {
            rootDir.mkdirs();
        }
    }

    /**
     * 处理上传路径
     * 
     * @param path 输入路径
     * @return 处理后的路径
     */
    private String processUploadPath(String path) {
        if (path == null || path.isEmpty()) {
            return "upload";
        }

        if (path.matches("^[A-Za-z]:\\\\.*") || path.startsWith("/")) {
            return path;
        }

        return path;
    }

    @Override
    public List<Album> getAlbums() {
        try {
            List<Album> albums = new ArrayList<>();
            
            // 将根目录作为一个普通相册
            Album rootAlbum = new Album();
            rootAlbum.setName(rootDir.getName());
            rootAlbum.setImageCount(countImagesInDirectory(rootDir));
            if (rootAlbum.getImageCount() > 0) {
                rootAlbum.setCoverUrl(getFirstImageUrl(rootDir));
            }
            albums.add(rootAlbum);

            // 获取所有子目录作为相册
            File[] directories = rootDir.listFiles(File::isDirectory);
            if (directories != null) {
                for (File dir : directories) {
                    Album album = new Album();
                    album.setName(dir.getName());
                    album.setImageCount(countImagesInDirectory(dir));
                    if (album.getImageCount() > 0) {
                        album.setCoverUrl(getFirstImageUrl(dir));
                    }
                    albums.add(album);
                }
            }

            return albums;
        } catch (Exception e) {
            log.error("获取相册列表失败", e);
            throw new RuntimeException("获取相册列表失败：" + e.getMessage());
        }
    }

    @Override
    public void createAlbum(Album album) {
        try {
            String processedPath = processUploadPath(uploadProperties.getPath());
            String albumPath = processedPath + "/" + album.getName();
            File albumDir = new File(albumPath);
            if (albumDir.exists()) {
                throw new RuntimeException("相册已存在");
            }
            if (!albumDir.mkdirs()) {
                throw new RuntimeException("创建相册目录失败");
            }

            // 设置新创建相册的初始信息
            album.setImageCount(0);
            album.setCoverUrl(null);
            album.setLastModified(String.valueOf(System.currentTimeMillis()));

            log.info("创建相册成功：{}", album.getName());
        } catch (Exception e) {
            log.error("创建相册失败", e);
            throw new RuntimeException("创建相册失败：" + e.getMessage());
        }
    }

    @Override
    public AlbumImage uploadImage(String albumName, MultipartFile file) throws IOException {
        try {
            // 参数验证
            if (StringUtils.isEmpty(albumName) || file == null || file.isEmpty()) {
                throw new IllegalArgumentException("相册名称和文件不能为空");
            }

            // 检查文件类型
            if (!FileUtils.isValidImageType(file)) {
                throw new IllegalArgumentException("不支持的文件类型");
            }

            // 获取并处理文件名
            String originalFilename = file.getOriginalFilename();
            if (StringUtils.isEmpty(originalFilename)) {
                throw new IllegalArgumentException("文件名不能为空");
            }
            String safeFileName = FileUtils.processFileName(originalFilename);

            // 构建目标路径
            String processedPath = processUploadPath(uploadProperties.getPath());
            String basePath = processedPath;
            basePath = basePath.endsWith("/") ? basePath : basePath + "/";
            String albumPath = albumName.equals(rootDir.getName()) ? basePath 
                    : basePath + albumName + "/";
            File albumDir = new File(albumPath);
            if (!albumDir.exists() && !albumDir.mkdirs()) {
                throw new RuntimeException("创建目录失败");
            }

            // 保存文件
            Path targetPath = Paths.get(albumPath, safeFileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            // 返回图片信息
            AlbumImage image = new AlbumImage();
            image.setName(safeFileName);
            String accessPath = uploadProperties.getAccessPath();
            accessPath = accessPath.startsWith("/") ? accessPath : "/" + accessPath;
            accessPath = accessPath.endsWith("/") ? accessPath : accessPath + "/";
            image.setUrl(blogProperties.getApi() + accessPath
                    + (albumName.equals(rootDir.getName()) ? "" : albumName + "/")
                    + safeFileName);
            image.setSize(file.getSize());
            image.setType(file.getContentType());

            log.info("上传图片成功：{} -> {}", safeFileName, image.getUrl());
            return image;
        } catch (Exception e) {
            log.error("上传图片失败：{}", e.getMessage());
            throw new RuntimeException("上传图片失败：" + e.getMessage());
        }
    }

    @Override
    public void deleteImage(String albumName, String imageName) {
        try {
            String processedPath = processUploadPath(uploadProperties.getPath());
            // 规范化路径
            File baseDir = new File(processedPath).getCanonicalFile();
            File albumDir = albumName.equals(rootDir.getName()) ? baseDir 
                    : new File(baseDir, albumName).getCanonicalFile();
            
            // 确保文件名包含扩展名
            String fullImageName = imageName;
            if (!hasImageExtension(imageName)) {
                // 尝试常见的图片扩展名
                for (String ext : new String[]{".jpg", ".jpeg", ".png", ".gif", ".webp"}) {
                    File testFile = new File(albumDir, imageName + ext);
                    if (testFile.exists()) {
                        fullImageName = imageName + ext;
                        break;
                    }
                }
            }
            
            File imageFile = new File(albumDir, fullImageName);
            if (!imageFile.exists()) {
                // 如果文件不存在，不抛出异常，直接返回
                log.warn("要删除的图片不存在：{}", imageFile.getCanonicalPath());
                return;
            }
            
            boolean deleted = imageFile.delete();
            if (!deleted) {
                log.error("删除文件失败：{}", imageFile.getCanonicalPath());
                throw new RuntimeException("删除文件失败");
            }
            
            log.info("删除图片成功：{}", fullImageName);
        } catch (Exception e) {
            log.error("删除图片失败：{}", e.getMessage());
            throw new RuntimeException("删除图片失败：" + e.getMessage());
        }
    }

    @Override
    public void deleteAlbum(String albumName) {
        try {
            if (rootDir.getName().equals(albumName)) {
                throw new RuntimeException("根目录不能删除");
            }
            String processedPath = processUploadPath(uploadProperties.getPath());
            processedPath = processedPath.endsWith("/") ? processedPath : processedPath + "/";
            File albumDir = new File(processedPath + albumName);
            
            // 添加日志输出以便调试
            log.info("正在删除相册目录：{}", albumDir.getAbsolutePath());
            
            if (!albumDir.exists()) {
                log.warn("要删除的相册目录不存在：{}", albumDir.getAbsolutePath());
                throw new RuntimeException("相册不存在");
            }
            
            // 删除目录及其内容
            deleteDirectory(albumDir);
            
            // 验证删除结果
            if (albumDir.exists()) {
                log.error("相册删除失败，目录仍然存在：{}", albumDir.getAbsolutePath());
                throw new RuntimeException("相册删除失败");
            }
            
            log.info("删除相册成功：{}", albumName);
        } catch (Exception e) {
            log.error("删除相册失败：{}", e.getMessage());
            throw new RuntimeException("删除相册失败：" + e.getMessage());
        }
    }

    @Override
    public List<AlbumImage> getAlbumImages(String albumName) {
        try {
            String processedPath = processUploadPath(uploadProperties.getPath());
            String basePath = processedPath;
            basePath = basePath.endsWith("/") ? basePath : basePath + "/";
            String albumPath = albumName.equals(rootDir.getName()) ? basePath
                    : basePath + albumName + "/";
            File albumDir = new File(albumPath);
            if (!albumDir.exists()) {
                return new ArrayList<>();
            }

            List<AlbumImage> images = new ArrayList<>();
            File[] files = albumDir.listFiles((dir, name) -> isImageFile(name));
            if (files != null) {
                for (File file : files) {
                    AlbumImage image = new AlbumImage();
                    image.setName(file.getName());
                    String accessPath = uploadProperties.getAccessPath();
                    accessPath = accessPath.startsWith("/") ? accessPath : "/" + accessPath;
                    accessPath = accessPath.endsWith("/") ? accessPath : accessPath + "/";
                    // 使用相对路径，不需要上下文路径
                    image.setUrl(blogProperties.getApi() + accessPath
                            + (albumName.equals(rootDir.getName()) ? "" : albumName + "/")
                            + file.getName());
                    image.setSize(file.length());
                    image.setType(getContentType(file.getName()));
                    images.add(image);
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
            String processedPath = processUploadPath(uploadProperties.getPath());
            String sourceAlbumPath = sourceAlbumName.equals(rootDir.getName()) ? processedPath
                    : processedPath + sourceAlbumName + "/";
            String targetAlbumPath = targetAlbumName.equals(rootDir.getName()) ? processedPath
                    : processedPath + targetAlbumName + "/";

            File sourceFile = new File(sourceAlbumPath + imageName);
            File targetFile = new File(targetAlbumPath + imageName);

            if (!sourceFile.exists()) {
                throw new RuntimeException("源文件不存在");
            }

            // 确保目标目录存在
            File targetDir = new File(targetAlbumPath);
            if (!targetDir.exists() && !targetDir.mkdirs()) {
                throw new RuntimeException("创建目标目录失败");
            }

            // 移动文件
            if (!sourceFile.renameTo(targetFile)) {
                // 如果重命名失败，尝试复制后删除
                Files.copy(sourceFile.toPath(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                if (!sourceFile.delete()) {
                    log.warn("源文件删除失败：{}", sourceFile.getAbsolutePath());
                }
            }

            log.info("移动图片成功：从 {} 移动到 {}", sourceFile.getAbsolutePath(), targetFile.getAbsolutePath());
        } catch (Exception e) {
            log.error("移动图片失败：{}", e.getMessage());
            throw new RuntimeException("移动图片失败：" + e.getMessage());
        }
    }

    // 辅助方法

    private int countImagesInDirectory(File directory) {
        File[] files = directory.listFiles((dir, name) -> isImageFile(name));
        return files != null ? files.length : 0;
    }

    private String getFirstImageUrl(File directory) {
        File[] files = directory.listFiles((dir, name) -> isImageFile(name));
        if (files != null && files.length > 0) {
            String relativePath = "";
            if (!directory.getName().equals(new File(uploadProperties.getPath()).getName())) {
                relativePath = directory.getName() + "/";
            }
            String accessPath = uploadProperties.getAccessPath();
            accessPath = accessPath.startsWith("/") ? accessPath : "/" + accessPath;
            accessPath = accessPath.endsWith("/") ? accessPath : accessPath + "/";
            // 使用相对路径，不需要上下文路径
            return blogProperties.getApi() + accessPath + relativePath + files[0].getName();
        }
        return null;
    }

    private boolean isImageFile(String filename) {
        String extension = getFileExtension(filename).toLowerCase();
        return extension.equals(".jpg") || extension.equals(".jpeg") ||
                extension.equals(".png") || extension.equals(".gif") ||
                extension.equals(".bmp") || extension.equals(".webp");
    }

    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf('.');
        return lastDotIndex > -1 ? filename.substring(lastDotIndex) : "";
    }

    private String getContentType(String filename) {
        String extension = getFileExtension(filename).toLowerCase();
        switch (extension) {
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            case ".png":
                return "image/png";
            case ".gif":
                return "image/gif";
            case ".bmp":
                return "image/bmp";
            case ".webp":
                return "image/webp";
            default:
                return "application/octet-stream";
        }
    }

    private void deleteDirectory(File directory) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDirectory(file);
                } else {
                    if (!file.delete()) {
                        log.error("文件删除失败：{}", file.getAbsolutePath());
                        throw new RuntimeException("文件删除失败：" + file.getAbsolutePath());
                    } else {
                        log.info("成功删除文件：{}", file.getAbsolutePath());
                    }
                }
            }
        }
        
        if (!directory.delete()) {
            log.error("目录删除失败：{}", directory.getAbsolutePath());
            throw new RuntimeException("目录删除失败：" + directory.getAbsolutePath());
        } else {
            log.info("成功删除目录：{}", directory.getAbsolutePath());
        }
    }

    // 添加辅助方法检查文件名是否包含图片扩展名
    private boolean hasImageExtension(String filename) {
        String lowerFilename = filename.toLowerCase();
        return lowerFilename.endsWith(".jpg") || lowerFilename.endsWith(".jpeg") 
                || lowerFilename.endsWith(".png") || lowerFilename.endsWith(".gif") 
                || lowerFilename.endsWith(".webp");
    }
}