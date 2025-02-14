package com.caixiaohu.controller.admin;

import com.caixiaohu.model.vo.Result;
import com.caixiaohu.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class NotificationAdminController {
    @Autowired
    private NotificationService notificationService;

    /**
     * 获取未读消息数量
     */
    @GetMapping("/notification/unread")
    public Result getUnreadCount() {
        return Result.ok("获取成功", notificationService.getUnreadCounts());
    }

    /**
     * 将某个类型的通知标记为已读
     */
    @PutMapping("/notification/read/{type}")
    public Result markRead(@PathVariable String type) {
        notificationService.markRead(type);
        return Result.ok("标记已读成功");
    }
}