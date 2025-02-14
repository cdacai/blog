package com.caixiaohu.service.impl;

import com.caixiaohu.config.properties.BaiduContentProperties;
import com.caixiaohu.service.BaiduContentService;
import com.caixiaohu.service.RedisService;
import com.caixiaohu.util.JacksonUtils;
import com.caixiaohu.util.StringUtils;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * 百度内容审核服务实现
 */
@Service
@Slf4j
public class BaiduContentServiceImpl implements BaiduContentService {
    @Autowired
    private BaiduContentProperties baiduContentProperties;
    @Autowired
    private RedisService redisService;

    private static final String REDIS_KEY_ACCESS_TOKEN = "baidu_content_access_token";
    private static final OkHttpClient HTTP_CLIENT = new OkHttpClient().newBuilder().build();

    @Override
    public boolean reviewText(String text) {
        log.info("开始内容审核，待审核内容: {}", text);
        if (!baiduContentProperties.getEnabled()) {
            log.info("内容审核服务未启用，默认通过");
            return true;
        }
        if (StringUtils.isEmpty(text)) {
            log.info("审核内容为空，默认通过");
            return true;
        }
        try {
            String accessToken = getAccessToken();
            if (StringUtils.isEmpty(accessToken)) {
                log.error("获取百度内容审核access token失败");
                return true;
            }

            MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
            String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8.toString());
            RequestBody body = RequestBody.create("text=" + encodedText, mediaType);
            Request request = new Request.Builder()
                    .url("https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token="
                            + accessToken)
                    .method("POST", body)
                    .addHeader("Content-Type", "application/x-www-form-urlencoded")
                    .addHeader("Accept", "application/json")
                    .build();

            Response response = HTTP_CLIENT.newCall(request).execute();
            String result = response.body().string();
            log.info("审核响应结果: {}", result);

            JsonNode jsonNode = JacksonUtils.readValue(result, JsonNode.class);

            // 检查错误码
            if (jsonNode.has("error_code")) {
                log.error("百度内容审核失败: {}", jsonNode.get("error_msg").asText());
                return true;
            }

            // 获取审核结果
            if (!jsonNode.has("conclusionType")) {
                log.error("审核结果中缺少conclusionType字段");
                return true;
            }
            int conclusionType = jsonNode.get("conclusionType").asInt();
            String conclusion = jsonNode.has("conclusion") ? jsonNode.get("conclusion").asText() : "未知";
            log.info("审核结果: conclusionType={}, conclusion={}", conclusionType, conclusion);

            // 如果有详细审核数据，记录日志
            if (jsonNode.has("data") && !jsonNode.get("data").isNull() && jsonNode.get("data").isArray()) {
                JsonNode data = jsonNode.get("data");
                for (JsonNode item : data) {
                    if (item.has("probability")) {
                        double probability = item.get("probability").asDouble();
                        if (probability > 0.9) { // 可疑度超过90%
                            String type = item.has("type") ? item.get("type").asText() : "未知";
                            String msg = item.has("msg") ? item.get("msg").asText() : "未知";
                            log.warn("内容审核警告: type={}, msg={}, probability={}", type, msg, probability);
                        }
                    }
                }
            }

            // 根据conclusionType判断是否合规
            // 1：合规，2：不合规，3：疑似，4：审核失败
            boolean isCompliant;
            if (conclusionType == 1) {
                isCompliant = true;
                log.info("内容审核通过");
            } else if (conclusionType == 2) {
                isCompliant = false;
                log.info("内容审核结果: 不合规, conclusion={}", conclusion);
            } else if (conclusionType == 3) {
                // 根据配置决定疑似内容是否通过
                isCompliant = baiduContentProperties.getAllowSuspicious();
                log.info("内容审核结果: 疑似内容, conclusion={}, 处理方式={}", conclusion, isCompliant ? "允许" : "禁止");
            } else {
                // 审核失败，默认通过
                log.warn("内容审核失败（conclusionType={}）", conclusionType);
                isCompliant = true;
            }
            log.info("最终审核结论: isCompliant={}", isCompliant);
            return isCompliant;
        } catch (Exception e) {
            log.error("百度内容审核异常", e);
            return true;
        }
    }

    private String getAccessToken() throws IOException {
        // 先从Redis获取
        String accessToken = (String) redisService.get(REDIS_KEY_ACCESS_TOKEN);
        if (!StringUtils.isEmpty(accessToken)) {
            return accessToken;
        }

        log.debug("Redis中无access token，开始重新获取");
        // Redis没有则重新获取
        MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
        RequestBody body = RequestBody.create(
                "grant_type=client_credentials&client_id=" + baiduContentProperties.getApiKey()
                        + "&client_secret=" + baiduContentProperties.getSecretKey(),
                mediaType);
        Request request = new Request.Builder()
                .url("https://aip.baidubce.com/oauth/2.0/token")
                .method("POST", body)
                .addHeader("Content-Type", "application/x-www-form-urlencoded")
                .build();
        Response response = HTTP_CLIENT.newCall(request).execute();
        String result = response.body().string();
        log.debug("获取access token响应: {}", result);

        JsonNode jsonNode = JacksonUtils.readValue(result, JsonNode.class);
        if (!jsonNode.has("access_token")) {
            log.error("获取access token失败，响应中缺少access_token字段");
            throw new IOException("Invalid response: missing access_token");
        }
        accessToken = jsonNode.get("access_token").asText();
        // 存入Redis，有效期30天
        redisService.set(REDIS_KEY_ACCESS_TOKEN, accessToken, 30 * 24 * 60 * 60);
        return accessToken;
    }
}