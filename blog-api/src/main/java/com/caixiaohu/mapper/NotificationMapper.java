package com.caixiaohu.mapper;

import com.caixiaohu.entity.Notification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface NotificationMapper {
    // 插入新通知
    int saveNotification(Notification notification);

    // 获取未读通知数量
    int getUnreadCount(@Param("type") String type);

    // 将指定类型的通知标记为已读
    int markReadByType(@Param("type") String type);

    // 获取所有未读通知
    List<Notification> getUnreadNotifications();
}