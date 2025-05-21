package com.caixiaohu.service;

import com.github.pagehelper.PageInfo;
import com.caixiaohu.entity.Notification;

public interface NotificationService {
    /**
     * 创建通知
     */
    void createNotification(Notification notification);

    /**
     * 获取未读消息数量
     */
    int getUnreadCount(String type);

    /**
     * 获取消息列表
     */
    PageInfo<Notification> getNotificationList(String type, int pageNum, int pageSize);

    /**
     * 标记指定类型的消息为已读
     */
    void markReadByType(String type);

    /**
     * 标记指定ID的消息为已读
     */
    void markReadById(Long id);

    /**
     * 标记所有消息为已读
     */
    void markAllAsRead();
}