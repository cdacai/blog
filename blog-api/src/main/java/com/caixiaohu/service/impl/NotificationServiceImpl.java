package com.caixiaohu.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.caixiaohu.entity.Notification;
import com.caixiaohu.mapper.NotificationMapper;
import com.caixiaohu.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationMapper notificationMapper;

    @Override
    @Transactional
    public void createNotification(Notification notification) {
        // 检查目标是否存在
        if (notification.getTargetId() != null && notification.getTargetType() != null) {
            int count = notificationMapper.checkTargetExists(notification.getTargetType(), notification.getTargetId());
            if (count == 0) {
                throw new ValidationException("目标不存在");
            }
        }
        
        notificationMapper.insert(notification);
    }

    @Override
    public int getUnreadCount(String type) {
        return notificationMapper.getUnreadCount(type);
    }

    @Override
    public PageInfo<Notification> getNotificationList(String type, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Notification> notifications = notificationMapper.getNotificationList(type);
        return new PageInfo<>(notifications);
    }

    @Override
    @Transactional
    public void markReadByType(String type) {
        notificationMapper.markReadByType(type);
    }

    @Override
    @Transactional
    public void markReadById(Long id) {
        notificationMapper.markReadById(id);
    }

    @Override
    @Transactional
    public void markAllAsRead() {
        notificationMapper.markAllAsRead();
    }
}