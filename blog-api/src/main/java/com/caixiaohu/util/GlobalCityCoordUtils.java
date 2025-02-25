package com.caixiaohu.util;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.caixiaohu.service.RedisService;
import com.caixiaohu.constant.RedisKeyConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.HashMap;

/**
 * @Description: 全球城市经纬度数据工具类
 * @Author: Claude
 * @Date: 2024-01-01
 */
@Component
public class GlobalCityCoordUtils {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static final String COORDS_FILE = "static/city_coordinates.json";
    // 南极点的经纬度
    private static final double ANTARCTICA_LONGITUDE = 0.0;
    private static final double ANTARCTICA_LATITUDE = -90.0;
    private Map<String, double[]> cityCoordinates = new HashMap<>();

    @Autowired
    private RedisService redisService;

    @PostConstruct
    public void init() {
        try {
            loadCoordinates();
        } catch (IOException e) {
            logger.error("Failed to load city coordinates", e);
        }
    }

    private void loadCoordinates() throws IOException {
        // 尝试从Redis获取数据
        Map<String, double[]> cachedCoords = getCachedCoordinates();
        if (cachedCoords != null && !cachedCoords.isEmpty()) {
            cityCoordinates = cachedCoords;
            return;
        }

        // 如果Redis中没有数据，从文件加载
        ClassPathResource resource = new ClassPathResource(COORDS_FILE);
        try (InputStream is = resource.getInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            cityCoordinates = mapper.readValue(is, 
                mapper.getTypeFactory().constructMapType(HashMap.class, String.class, double[].class));
            
            // 将数据缓存到Redis
            cacheCoordinates(cityCoordinates);
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, double[]> getCachedCoordinates() {
        return (Map<String, double[]>) redisService.getMapByHash(RedisKeyConstants.CITY_COORDS_MAP);
    }

    private void cacheCoordinates(Map<String, double[]> coordinates) {
        redisService.saveMapToHash(RedisKeyConstants.CITY_COORDS_MAP, coordinates);
    }

    /**
     * 获取城市的经纬度
     * @param city 城市名称
     * @return 经纬度数组 [经度, 纬度]，如果未找到返回null
     */
    public double[] getCoordinates(String city) {
        return cityCoordinates.get(city);
    }

    /**
     * 解析IP源获取城市名称和坐标
     * @param ipSource IP源字符串（格式：国家|区域|城市|运营商）
     * @return 包含城市名和坐标的数组 [城市名, 经度, 纬度]，如果解析失败返回南极坐标
     */
    public Object[] parseCityFromIpSource(String ipSource) {
        if (ipSource == null || ipSource.trim().isEmpty()) {
            return new Object[]{"南极", ANTARCTICA_LONGITUDE, ANTARCTICA_LATITUDE};
        }

        String[] parts = ipSource.split("\\|");
        String city;
        
        // 处理中国城市
        if (ipSource.startsWith("中国") && parts.length >= 3) {
            city = parts[2];
        } 
        // 处理国外城市
        else if (parts.length >= 1) {
            city = parts[0];  // 使用国家名作为城市名
        } else {
            return new Object[]{"南极", ANTARCTICA_LONGITUDE, ANTARCTICA_LATITUDE};
        }

        double[] coords = getCoordinates(city);
        if (coords != null) {
            return new Object[]{city, coords[0], coords[1]};
        }

        // 如果找不到坐标，返回南极
        return new Object[]{"南极", ANTARCTICA_LONGITUDE, ANTARCTICA_LATITUDE};
    }
} 