package com.caixiaohu.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 相册配置工具类
 * 用于读取和写入隐藏相册配置
 */
@Slf4j
@Component
public class AlbumConfigUtils {
    private static final String CONFIG_PATH = "config/hidden_albums.json";
    private static final String EXTERNAL_CONFIG_DIR = "./config";
    private static final String EXTERNAL_CONFIG_FILE = EXTERNAL_CONFIG_DIR + "/hidden_albums.json";
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private final ResourceLoader resourceLoader;

    public AlbumConfigUtils(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
        // 确保外部配置目录存在
        ensureConfigDirExists();
    }
    
    /**
     * 确保配置目录存在
     */
    private void ensureConfigDirExists() {
        try {
            Files.createDirectories(Paths.get(EXTERNAL_CONFIG_DIR));
            
            // 如果外部配置文件不存在，从classpath复制一份
            File externalFile = new File(EXTERNAL_CONFIG_FILE);
            if (!externalFile.exists()) {
                try {
                    Resource resource = new ClassPathResource(CONFIG_PATH);
                    String content = FileCopyUtils.copyToString(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
                    Files.write(Paths.get(EXTERNAL_CONFIG_FILE), content.getBytes(StandardCharsets.UTF_8));
                    log.info("已从classpath复制配置文件到外部目录: {}", EXTERNAL_CONFIG_FILE);
                } catch (IOException e) {
                    // 如果无法从classpath复制，则创建一个空的配置文件
                    Map<String, List<String>> emptyConfig = new HashMap<>();
                    emptyConfig.put("hiddenAlbums", new ArrayList<>());
                    objectMapper.writerWithDefaultPrettyPrinter().writeValue(externalFile, emptyConfig);
                    log.info("已创建空的配置文件: {}", EXTERNAL_CONFIG_FILE);
                }
            }
        } catch (IOException e) {
            log.error("创建配置目录失败: {}", e.getMessage());
        }
    }

    /**
     * 获取隐藏相册列表
     * @return 隐藏相册名称列表
     */
    public List<String> getHiddenAlbums() {
        try {
            // 优先从外部配置文件读取
            File externalFile = new File(EXTERNAL_CONFIG_FILE);
            if (externalFile.exists()) {
                String content = new String(Files.readAllBytes(externalFile.toPath()), StandardCharsets.UTF_8);
                Map<String, List<String>> config = objectMapper.readValue(content, HashMap.class);
                List<String> albums = config.getOrDefault("hiddenAlbums", new ArrayList<>());
                log.debug("从外部配置文件读取隐藏相册列表，共{}个", albums.size());
                return albums;
            }
            
            // 如果外部配置文件不存在，尝试从classpath读取
            Resource resource = new ClassPathResource(CONFIG_PATH);
            String content = FileCopyUtils.copyToString(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
            Map<String, List<String>> config = objectMapper.readValue(content, HashMap.class);
            List<String> albums = config.getOrDefault("hiddenAlbums", new ArrayList<>());
            log.debug("从classpath读取隐藏相册列表，共{}个", albums.size());
            
            // 将classpath中的配置保存到外部文件
            updateHiddenAlbums(albums);
            
            return albums;
        } catch (IOException e) {
            log.error("读取隐藏相册配置失败: {}", e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * 更新隐藏相册列表
     * @param hiddenAlbums 隐藏相册名称列表
     * @return 是否更新成功
     */
    public boolean updateHiddenAlbums(List<String> hiddenAlbums) {
        try {
            // 确保配置目录存在
            ensureConfigDirExists();
            
            Map<String, List<String>> config = new HashMap<>();
            config.put("hiddenAlbums", hiddenAlbums);
            
            // 写入外部配置文件
            File externalFile = new File(EXTERNAL_CONFIG_FILE);
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(externalFile, config);
            
            log.info("更新隐藏相册配置成功，共{}个隐藏相册", hiddenAlbums.size());
            return true;
        } catch (IOException e) {
            log.error("更新隐藏相册配置失败: {}", e.getMessage());
            return false;
        }
    }

    /**
     * 添加隐藏相册
     * @param albumName 相册名称
     * @return 是否添加成功
     */
    public boolean addHiddenAlbum(String albumName) {
        try {
            List<String> hiddenAlbums = getHiddenAlbums();
            if (!hiddenAlbums.contains(albumName)) {
                hiddenAlbums.add(albumName);
                return updateHiddenAlbums(hiddenAlbums);
            }
            return true; // 已经存在，视为添加成功
        } catch (Exception e) {
            log.error("添加隐藏相册失败: {}", e.getMessage());
            return false;
        }
    }

    /**
     * 移除隐藏相册
     * @param albumName 相册名称
     * @return 是否移除成功
     */
    public boolean removeHiddenAlbum(String albumName) {
        try {
            List<String> hiddenAlbums = getHiddenAlbums();
            if (hiddenAlbums.contains(albumName)) {
                hiddenAlbums.remove(albumName);
                return updateHiddenAlbums(hiddenAlbums);
            }
            return true; // 不存在，视为移除成功
        } catch (Exception e) {
            log.error("移除隐藏相册失败: {}", e.getMessage());
            return false;
        }
    }
} 