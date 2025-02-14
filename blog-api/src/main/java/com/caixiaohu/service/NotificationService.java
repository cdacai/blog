package com.caixiaohu.service;

import com.caixiaohu.entity.Notification;
import java.util.Map;

public interface NotificationService {
    // 创建新通知
    void createNotification(String type, Long sourceId);

    // 获取所有类型的未读通知数量
    Map<String, Integer> getUnreadCounts();

    // 将指定类型的通知标记为已读
    void markRead(String type);
}