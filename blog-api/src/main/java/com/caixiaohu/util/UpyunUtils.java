package com.caixiaohu.util;

import com.caixiaohu.config.properties.UpyunProperties;
import com.caixiaohu.exception.NotFoundException;
import com.upyun.RestManager;
import com.upyun.UpException;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.awt.image.BufferedImage;
import java.awt.Graphics2D;
import java.io.ByteArrayOutputStream;
import java.io.ByteArrayInputStream;
import javax.imageio.ImageIO;
import java.util.concurrent.TimeUnit;

/**
 * @Description: 又拍云工具类
 * @Author: caixiaohu
 * @Date: 2023-12-25
 */
@Slf4j
@Component
public class UpyunUtils {
    // 超时时间常量（毫秒）
    private static final int UPLOAD_TIMEOUT = 300000; // 上传超时 5分钟
    private static final int OPERATION_TIMEOUT = 60000; // 普通操作超时 1分钟

    private final RestManager manager;
    private final String bucketName;
    private final String domain;
    private final String defaultPath;
    private final String username;
    private final String password;

    @Autowired
    public UpyunUtils(UpyunProperties upyunProperties) {
        this.bucketName = upyunProperties.getBucketName();
        this.username = upyunProperties.getUsername();
        this.password = upyunProperties.getPassword();
        this.domain = upyunProperties.getDomain();
        this.defaultPath = upyunProperties.getPath();
        this.manager = new RestManager(bucketName, username, password);
        this.manager.setTimeout(OPERATION_TIMEOUT); // 默认使用普通操作超时时间
    }

    /**
     * 获取存储空间名称
     */
    public String getBucketName() {
        return bucketName;
    }

    /**
     * 获取操作员用户名
     */
    public String getUsername() {
        return username;
    }

    /**
     * 获取操作员密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 上传图片到指定目录
     *
     * @param file 图片文件
     * @param path 上传目录，如果为null则使用默认目录
     * @return 图片URL
     */
    public String uploadImage(MultipartFile file, String path) throws IOException {
        try {
            manager.setTimeout(UPLOAD_TIMEOUT); // 设置上传超时时间

            // 检查文件类型
            if (!FileUtils.isValidImageType(file)) {
                throw new IllegalArgumentException("不支持的文件类型");
            }

            // 获取并处理文件名
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                throw new IllegalArgumentException("文件名不能为空");
            }
            String safeFileName = FileUtils.processFileName(originalFilename);

            // 构建上传路径，如果未指定path则使用默认路径
            String uploadPath = (path != null ? path : defaultPath);
            // 确保路径以/开头
            if (!uploadPath.startsWith("/")) {
                uploadPath = "/" + uploadPath;
            }
            // 确保路径不以/结尾
            if (uploadPath.endsWith("/")) {
                uploadPath = uploadPath.substring(0, uploadPath.length() - 1);
            }
            String filePath = uploadPath + "/" + safeFileName;

            // 上传文件
            Response response = manager.writeFile(filePath, file.getInputStream(), null);
            if (!response.isSuccessful()) {
                log.error("上传图片失败，状态码：{}，错误信息：{}", response.code(), response.message());
                throw new IOException("上传图片失败：" + response.message());
            }

            // 返回完整URL
            return domain + filePath;
        } catch (Exception e) {
            log.error("上传图片失败：{}", e.getMessage());
            throw new IOException("上传图片失败：" + e.getMessage(), e);
        } finally {
            manager.setTimeout(OPERATION_TIMEOUT); // 恢复默认超时时间
        }
    }

    /**
     * 上传图片到默认目录
     *
     * @param file 图片文件
     * @return 图片URL
     */
    public String uploadImage(MultipartFile file) throws IOException {
        return uploadImage(file, null);
    }

    /**
     * 删除图片
     */
    public void deleteImage(String path) throws IOException {
        try {
            Response response = manager.deleteFile(path, null);
            if (!response.isSuccessful()) {
                throw new IOException("删除图片失败：" + response.message());
            }
        } catch (UpException e) {
            throw new IOException("删除图片失败：" + e.getMessage(), e);
        }
    }

    /**
     * 获取又拍云管理器实例，用于其他操作（如目录列表等）
     */
    public RestManager getManager() {
        return manager;
    }

    /**
     * 获取域名
     */
    public String getDomain() {
        return domain;
    }

    /**
     * 获取默认路径
     */
    public String getDefaultPath() {
        return defaultPath;
    }

    /**
     * 创建目录
     *
     * @param path 目录路径
     * @return 是否创建成功
     */
    public boolean createDirectory(String path) throws IOException {
        try {
            // 确保路径以/开头
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
            // 确保路径不以/结尾
            if (path.endsWith("/")) {
                path = path.substring(0, path.length() - 1);
            }

            Response response = manager.mkDir(path);
            if (!response.isSuccessful()) {
                log.error("创建目录失败：{}", response.message());
                return false;
            }
            return true;
        } catch (UpException e) {
            log.error("创建目录失败", e);
            throw new IOException("创建目录失败：" + e.getMessage());
        }
    }

    /**
     * 删除目录
     */
    public void deleteDirectory(String path) throws IOException {
        try {
            // 如果是默认相册，只删除文件，不删除目录
            String fullPath = path.equals("默认相册") ? "/" : "/" + path;

            // 先删除目录下的所有文件
            Response response = manager.readDirIter(fullPath, null);
            if (!response.isSuccessful()) {
                throw new IOException("获取目录内容失败：" + response.message());
            }

            String jsonStr = response.body().string();
            if (!StringUtils.isEmpty(jsonStr)) {
                String[] lines = jsonStr.split("\n");
                for (String line : lines) {
                    if (line.trim().isEmpty())
                        continue;
                    String[] parts = line.split("\t");
                    if (parts.length < 2)
                        continue;

                    String name = parts[0];
                    String type = parts[1];
                    String itemPath = fullPath.equals("/") ? "/" + name : fullPath + "/" + name;

                    if ("N".equals(type)) {
                        // 删除文件
                        Response deleteResponse = manager.deleteFile(itemPath, null);
                        if (!deleteResponse.isSuccessful()) {
                            log.warn("删除文件失败：{} - {}", itemPath, deleteResponse.message());
                        }
                    }
                }
            }

            // 如果不是默认相册，删除目录本身
            if (!path.equals("默认相册")) {
                Map<String, String> params = new HashMap<>();
                params.put("folder", "true"); // 指定这是一个目录
                Response deleteResponse = manager.deleteFile(fullPath, params);
                if (!deleteResponse.isSuccessful()) {
                    throw new IOException("删除目录失败：" + deleteResponse.message());
                }
            }
        } catch (UpException e) {
            throw new IOException("删除目录失败：" + e.getMessage(), e);
        }
    }

    /**
     * 上传图片到又拍云，保持原文件名
     */
    public String uploadImageWithOriginalName(MultipartFile file, String path, String originalFilename)
            throws IOException {
        try {
            manager.setTimeout(UPLOAD_TIMEOUT); // 设置上传超时时间
            // 构建完整路径
            String fullPath = path.equals("/") ? "/" + originalFilename : path + "/" + originalFilename;
            log.info("上传图片，路径：{}，原始文件名：{}", fullPath, originalFilename);

            // 上传文件
            Response response = manager.writeFile(fullPath, file.getInputStream(), null);
            if (!response.isSuccessful()) {
                log.error("上传图片失败，状态码：{}，错误信息：{}", response.code(), response.message());
                throw new IOException("上传图片失败：" + response.message());
            }

            // 返回完整URL
            return domain + fullPath;
        } catch (Exception e) {
            log.error("上传图片失败：{}", e.getMessage());
            throw new IOException("上传图片失败：" + e.getMessage(), e);
        } finally {
            manager.setTimeout(OPERATION_TIMEOUT); // 恢复默认超时时间
        }
    }

    /**
     * 上传图片到又拍云，用于编辑器上传
     */
    public String uploadImageForEditor(MultipartFile file, String path) throws IOException {
        try {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                throw new IllegalArgumentException("文件名不能为空");
            }

            // 构建完整路径
            String fullPath = path.equals("/") ? "/" + originalFilename : path + "/" + originalFilename;
            log.info("上传编辑器图片，路径：{}，文件名：{}", fullPath, originalFilename);

            // 上传文件
            Response response = manager.writeFile(fullPath, file.getInputStream(), null);
            if (!response.isSuccessful()) {
                log.error("上传图片失败，状态码：{}，错误信息：{}", response.code(), response.message());
                throw new IOException("上传图片失败：" + response.message());
            }

            // 返回完整URL
            return domain + fullPath;
        } catch (Exception e) {
            log.error("上传图片失败：{}", e.getMessage());
            throw new IOException("上传图片失败：" + e.getMessage(), e);
        }
    }

    /**
     * 生成文件名
     */
    private String generateFileName(String originalFilename) {
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        return UUID.randomUUID().toString().replace("-", "") + extension;
    }
}