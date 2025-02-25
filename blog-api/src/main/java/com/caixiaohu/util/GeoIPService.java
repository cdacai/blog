package com.caixiaohu.util;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.model.CityResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;

/**
 * @Description: GeoIP2 服务，用于IP地理位置解析
 * @Author: Claude
 * @Date: 2024-01-01
 */
@Component
public class GeoIPService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private DatabaseReader reader;
    private static final String DB_FILE = "geoip/GeoLite2-City.mmdb";

    @PostConstruct
    public void init() {
        try {
            // 从classpath加载数据库文件
            ClassPathResource resource = new ClassPathResource(DB_FILE);
            InputStream inputStream = resource.getInputStream();
            
            // 初始化reader
            reader = new DatabaseReader.Builder(inputStream).build();
            
            logger.info("GeoIP数据库加载成功");
        } catch (IOException e) {
            logger.error("GeoIP数据库加载失败", e);
        }
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