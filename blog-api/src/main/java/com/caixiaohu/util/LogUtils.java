package com.caixiaohu.util;

import org.slf4j.Logger;
import org.slf4j.MDC;
import java.util.Map;

/**
 * 日志工具类
 */
public class LogUtils {
    private static final String LOG_FORMAT = "%-12s: %s";
    private static final long SLOW_REQUEST_THRESHOLD = 1000; // 1秒

    /**
     * 格式化错误日志
     */
    public static String formatError(String title, String error) {
        return String.format("\n┌─────────────────────── Error ────────────────────────\n" +
                "│ Type: %s\n" +
                "│ Message: %s\n" +
                "└──────────────────────────────────────────────────────",
                title, error);
    }

    /**
     * 格式化操作日志
     */
    public static String formatOperation(String operation, String detail) {
        return String.format("\n┌─────────────────────── Operation ─────────────────────\n" +
                "│ Action: %s\n" +
                "│ Detail: %s\n" +
                "└──────────────────────────────────────────────────────",
                operation, detail);
    }

    /**
     * 格式化系统日志
     */
    public static String formatSystem(String module, String message) {
        return String.format("\n┌─────────────────────── System ───────────────────────\n" +
                "│ Module: %s\n" +
                "│ Info: %s\n" +
                "└──────────────────────────────────────────────────────",
                module, message);
    }

    /**
     * 格式化警告日志
     */
    public static String formatWarn(String title, String warning) {
        return String.format("\n┌─────────────────────── Warning ──────────────────────\n" +
                "│ Type: %s\n" +
                "│ Message: %s\n" +
                "└──────────────────────────────────────────────────────",
                title, warning);
    }

    /**
     * 格式化业务日志
     */
    public static String formatBusiness(String business, String operation, String detail) {
        return String.format("\n┌─────────────────────── Business ─────────────────────\n" +
                "│ Type: %s\n" +
                "│ Operation: %s\n" +
                "│ Detail: %s\n" +
                "└──────────────────────────────────────────────────────",
                business, operation, detail);
    }

    /**
     * 格式化监控日志
     */
    public static String formatMonitor(String metric, Object value, String description) {
        return String.format("\n┌─────────────────────── Monitor ──────────────────────\n" +
                "│ Metric: %s\n" +
                "│ Value: %s\n" +
                "│ Description: %s\n" +
                "└──────────────────────────────────────────────────────",
                metric, value, description);
    }

    /**
     * 格式化日志内容
     */
    public static String formatLog(String key, Object value) {
        return String.format(LOG_FORMAT, key, value);
    }

    /**
     * 添加MDC上下文信息
     */
    public static void putMDC(String requestId, String clientIP, String userAgent) {
        MDC.put("requestId", requestId);
        MDC.put("clientIP", clientIP);
        MDC.put("userAgent", userAgent);
    }

    /**
     * 清除MDC上下文信息
     */
    public static void clearMDC() {
        MDC.clear();
    }

    /**
     * 检查是否为慢请求
     */
    public static boolean isSlowRequest(long costTime) {
        return costTime > SLOW_REQUEST_THRESHOLD;
    }

    /**
     * 获取响应状态描述
     */
    public static String getStatusDesc(int status) {
        if (status >= 200 && status < 300) {
            return status + " [SUCCESS]";
        } else if (status >= 400 && status < 500) {
            return status + " [CLIENT ERROR]";
        } else if (status >= 500) {
            return status + " [SERVER ERROR]";
        }
        return String.valueOf(status);
    }

    /**
     * 创建结构化日志
     */
    public static String createStructuredLog(String event, Map<String, Object> data) {
        data.put("event", event);
        data.put("timestamp", System.currentTimeMillis());
        return JacksonUtils.writeValueAsString(data);
    }
}