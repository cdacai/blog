package com.caixiaohu.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import com.caixiaohu.config.properties.LogProperties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 请求日志拦截器
 */
@Component
@Slf4j
public class RequestLogInterceptor extends HandlerInterceptorAdapter {
    @Autowired
    private LogProperties logProperties;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // 打印请求信息
        logRequestInfo(request);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        // 打印响应信息
        logResponseInfo(response);
    }

    private void logRequestInfo(HttpServletRequest request) {
        String uri = request.getRequestURI();
        String method = request.getMethod();
        String params = request.getQueryString();
        String ip = request.getRemoteAddr();

        StringBuilder sb = new StringBuilder();
        sb.append("\n=========================== Request Begin ===========================\n");
        sb.append("URI         : ").append(uri).append("\n");
        sb.append("Method      : ").append(method).append("\n");
        sb.append("Params      : ").append(params).append("\n");
        sb.append("IP          : ").append(ip).append("\n");
        sb.append("=========================== Request End   ===========================\n");

        log.info(sb.toString());
    }

    private void logResponseInfo(HttpServletResponse response) {
        StringBuilder sb = new StringBuilder();
        sb.append("\n=========================== Response Begin ===========================\n");
        sb.append("Status      : ").append(response.getStatus()).append("\n");
        sb.append("=========================== Response End   ===========================\n");

        log.info(sb.toString());
    }
}