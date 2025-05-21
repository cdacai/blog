package com.caixiaohu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.caixiaohu.entity.Notification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface NotificationMapper extends BaseMapper<Notification> {
    /**
     * 插入通知
     */
    int insert(Notification notification);

    /**
     * 获取未读消息数量
     */
    int getUnreadCount(@Param("type") String type);

    /**
     * 获取消息列表
     */
    List<Notification> getNotificationList(@Param("type") String type);

    /**
     * 标记指定类型的消息为已读
     */
    int markReadByType(@Param("type") String type);

    /**
     * 标记指定ID的消息为已读
     */
    int markReadById(@Param("id") Long id);

    /**
     * 标记所有消息为已读
     */
    int markAllAsRead();

    int checkTargetExists(@Param("targetType") String targetType, @Param("targetId") Long targetId);
}