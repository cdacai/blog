package com.caixiaohu.controller.admin;

import com.github.pagehelper.PageInfo;
import com.caixiaohu.entity.Notification;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/notification")
public class NotificationAdminController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/list")
    public Result getNotificationList(
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize) {
        PageInfo<Notification> pageInfo = notificationService.getNotificationList(type, pageNum, pageSize);
        return Result.ok("获取成功", pageInfo);
    }

    @GetMapping("/unread/count")
    public Result getUnreadCount(@RequestParam(required = false) String type) {
        int count = notificationService.getUnreadCount(type);
        return Result.ok("获取成功", count);
    }

    @PutMapping("/read/{type}")
    public Result markReadByType(@PathVariable String type) {
        notificationService.markReadByType(type);
        return Result.ok("标记已读成功");
    }

    @PutMapping("/read/id/{id}")
    public Result markReadById(@PathVariable Long id) {
        notificationService.markReadById(id);
        return Result.ok("标记已读成功");
    }

    @PutMapping("/read/all")
    public Result markAllAsRead() {
        notificationService.markAllAsRead();
        return Result.ok("全部标记已读成功");
    }
}