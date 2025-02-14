package com.caixiaohu.service.impl;

import com.caixiaohu.entity.Notification;
import com.caixiaohu.mapper.NotificationMapper;
import com.caixiaohu.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationMapper notificationMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createNotification(String type, Long sourceId) {
        Notification notification = new Notification();
        notification.setType(type);
        notification.setSourceId(sourceId);
        notification.setIsRead(false);
        notification.setCreateTime(new Date());
        notificationMapper.saveNotification(notification);
    }

    @Override
    public Map<String, Integer> getUnreadCounts() {
        Map<String, Integer> counts = new HashMap<>();
        counts.put("comment", notificationMapper.getUnreadCount("comment"));
        counts.put("like", notificationMapper.getUnreadCount("like"));
        counts.put("report", notificationMapper.getUnreadCount("report"));
        return counts;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void markRead(String type) {
        notificationMapper.markReadByType(type);
    }
}