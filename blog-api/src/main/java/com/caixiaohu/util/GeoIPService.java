package com.caixiaohu.util;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.model.CityResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.nio.file.Paths;

/**
 * @Description: GeoIP2 服务，用于IP地理位置解析
 * @Author: Claude
 * @Date: 2024-01-01
 */
@Component
public class GeoIPService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private DatabaseReader reader;
    
    // 从配置文件中读取外部数据库文件路径
    @Value("${blog.geoip.db.path}")
    private String externalDbPath;

    @PostConstruct
    public void init() {
        try {
            if (externalDbPath == null || externalDbPath.trim().isEmpty()) {
                throw new IllegalStateException("GeoIP数据库路径未配置，请在配置文件中设置blog.geoip.db.path");
            }
            
            // 将相对路径转换为绝对路径
            File dbFile;
            if (isAbsolutePath(externalDbPath)) {
                // 如果已经是绝对路径，直接使用
                dbFile = new File(externalDbPath);
                logger.info("使用配置的绝对路径: {}", externalDbPath);
            } else {
                // 如果是相对路径，转换为绝对路径
                String absolutePath = Paths.get(externalDbPath).toAbsolutePath().toString();
                dbFile = new File(absolutePath);
                logger.info("将相对路径 {} 转换为绝对路径: {}", externalDbPath, absolutePath);
            }
            
            if (!dbFile.exists() || !dbFile.isFile()) {
                throw new IllegalStateException("GeoIP数据库文件不存在: " + dbFile.getAbsolutePath() + 
                    "，请确保该文件存在并且应用有权限访问");
            }
            
            // 从外部文件加载
            reader = new DatabaseReader.Builder(dbFile).build();
            logger.info("从外部路径加载GeoIP数据库成功: {}", dbFile.getAbsolutePath());
        } catch (IOException e) {
            logger.error("GeoIP数据库加载失败", e);
            throw new RuntimeException("GeoIP数据库加载失败，应用无法启动", e);
        }
    }
    
    /**
     * 判断路径是否为绝对路径
     * @param path 路径字符串
     * @return 是否为绝对路径
     */
    private boolean isAbsolutePath(String path) {
        return new File(path).isAbsolute();
    }

    /**
     * 根据IP地址获取城市信息
     * @param ip IP地址
     * @return 城市名称和坐标 [城市名, 经度, 纬度]，如果解析失败返回null
     */
    public Object[] getCityInfo(String ip) {
        try {
            CityResponse response = reader.city(InetAddress.getByName(ip));
            String cityName = response.getCity().getNames().get("zh-CN");  // 优先使用中文名
            if (cityName == null || cityName.isEmpty()) {
                cityName = response.getCity().getName();  // 如果没有中文名，使用英文名
            }
            
            // 如果是中国城市，使用"中国|省份|城市"格式
            if ("CN".equals(response.getCountry().getIsoCode())) {
                String province = response.getMostSpecificSubdivision().getNames().get("zh-CN");
                if (province != null && !province.isEmpty()) {
                    cityName = "中国|" + province + "|" + cityName;
                }
            } else {
                // 国外城市，使用"国家|城市"格式
                String country = response.getCountry().getNames().get("zh-CN");
                if (country == null || country.isEmpty()) {
                    country = response.getCountry().getName();
                }
                cityName = country + "|" + cityName;
            }
            
            return new Object[]{
                cityName,
                response.getLocation().getLongitude(),
                response.getLocation().getLatitude()
            };
        } catch (Exception e) {
            logger.warn("IP地址解析失败: " + ip, e);
            return null;
        }
    }
} 