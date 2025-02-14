package com.caixiaohu.util;

import org.springframework.web.multipart.MultipartFile;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * @Description: 文件工具类
 * @Author: caixiaohu
 * @Date: 2024-01-18
 */
public class FileUtils {
    // 允许的图片类型
    private static final Set<String> ALLOWED_IMAGE_TYPES = new HashSet<>(Arrays.asList(
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/webp"));

    /**
     * 检查文件是否为有效的图片类型
     *
     * @param file 待检查的文件
     * @return 是否为有效的图片类型
     */
    public static boolean isValidImageType(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false;
        }
        String contentType = file.getContentType();
        return contentType != null && ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase());
    }

    /**
     * 处理文件名，只处理空格和特殊字符
     * 1. 替换空格为下划线
     * 2. 移除特殊字符
     *
     * @param originalFilename 原始文件名
     * @return 处理后的文件名
     */
    public static String processFileName(String originalFilename) {
        if (originalFilename == null || originalFilename.trim().isEmpty()) {
            throw new IllegalArgumentException("文件名不能为空");
        }

        // 获取文件扩展名
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex).toLowerCase();
            originalFilename = originalFilename.substring(0, dotIndex);
        }

        // 处理文件名：只替换空格为下划线，移除危险的特殊字符
        String processedName = originalFilename
                .replaceAll("\\s+", "_") // 替换空格为下划线
                .replaceAll("[\\\\/:*?\"<>|]", ""); // 移除Windows文件系统不允许的字符

        // 如果处理后的文件名为空（极端情况），保留原始文件名
        if (processedName.isEmpty()) {
            processedName = originalFilename;
        }

        // 添加扩展名
        return processedName + extension;
    }
}