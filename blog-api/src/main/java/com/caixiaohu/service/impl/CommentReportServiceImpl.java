package com.caixiaohu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caixiaohu.entity.Comment;
import com.caixiaohu.entity.CommentReport;
import com.caixiaohu.entity.Notification;
import com.caixiaohu.entity.User;
import com.caixiaohu.exception.BadRequestException;
import com.caixiaohu.exception.NotFoundException;
import com.caixiaohu.exception.PersistenceException;
import com.caixiaohu.mapper.CommentReportMapper;
import com.caixiaohu.model.dto.CommentReportHandleRequest;
import com.caixiaohu.service.CommentReportService;
import com.caixiaohu.service.CommentService;
import com.caixiaohu.service.RedisService;
import com.caixiaohu.service.UserService;
import com.caixiaohu.service.NotificationService;
import com.caixiaohu.util.IpAddressUtils;
import com.caixiaohu.util.MailUtils;

import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.List;

/**
 * @Description: 评论举报业务层实现
 * @Author: Naccl
 * @Date: 2023-01-20
 */
@Slf4j
@Service
public class CommentReportServiceImpl implements CommentReportService {
    @Autowired
    private CommentReportMapper commentReportMapper;

    @Autowired
    private MailUtils mailUtils;

    @Autowired
    private RedisService redisService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private NotificationService notificationService;

    @Value("${spring.mail.username}")
    private String adminEmail;

    @Value("${blog.view}")
    private String blogView;

    @Value("${blog.cms}")
    private String blogCms;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void saveCommentReport(CommentReport report) {
        if (commentReportMapper.saveCommentReport(report) != 1) {
            throw new PersistenceException("举报保存失败");
        }
        // 获取数据库生成的ID后再创建通知
        Long reportId = report.getId();
        if (reportId != null) {
            // 创建举报通知
            Notification notification = new Notification();
            notification.setType("report");
            notification.setContent("有人举报了评论: " + report.getComment().getContent());
            notification.setTargetId(reportId);
            notification.setTargetType("comment_report");
            notification.setIp(report.getIp());
            notification.setIsRead(false);
            notification.setCreateTime(new Date());
            notificationService.createNotification(notification);
            // 异步发送邮件通知管理员
            sendReportNotifyEmail(report);
        } else {
            throw new PersistenceException("举报ID获取失败");
        }
    }

    @Override
    public List<CommentReport> getCommentReportList() {
        return commentReportMapper.getCommentReportList();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void handleCommentReport(Long reportId, CommentReportHandleRequest request) {
        CommentReport report = commentReportMapper.getCommentReportById(reportId);
        if (report == null) {
            throw new NotFoundException("举报不存在");
        }

        // 更新举报状态
        report.setStatus(request.getStatus());
        report.setHandleResult(request.getHandleResult());
        report.setHandleTime(new Date());
        if (commentReportMapper.updateCommentReport(report) != 1) {
            throw new PersistenceException("更新举报状态失败");
        }

        // 如果确认违规，删除评论
        if (request.getStatus() == 1) {
            commentService.deleteCommentById(report.getComment().getId());
        }

        // 发送邮件通知举报者
        sendReportResultEmail(report);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteCommentReport(Long id) {
        if (commentReportMapper.deleteCommentReport(id) != 1) {
            throw new PersistenceException("删除举报失败");
        }
    }

    @Async
    protected void sendReportNotifyEmail(CommentReport report) {
        try {
            String subject = "新评论举报通知";
            String content = String.format(
                "收到新的评论举报：\n\n" +
                "举报原因：%s\n" +
                "评论内容：%s\n" +
                "评论者：%s\n" +
                "评论时间：%s\n" +
                "举报者IP：%s\n\n" +
                "请登录后台处理：%s/admin/comment-report",
                report.getReason(),
                report.getComment().getContent(),
                report.getComment().getNickname(),
                report.getComment().getCreateTime(),
                report.getIp(),
                blogCms
            );
            mailUtils.sendSimpleMail(adminEmail, subject, content);
        } catch (Exception e) {
            log.error("发送举报通知邮件失败", e);
        }
    }

    @Async
    protected void sendReportResultEmail(CommentReport report) {
        try {
            String subject = "评论举报处理结果通知";
            String content = String.format(
                "您举报的评论已处理：\n\n" +
                "举报原因：%s\n" +
                "评论内容：%s\n" +
                "处理结果：%s\n" +
                "处理说明：%s\n\n" +
                "感谢您的反馈！",
                report.getReason(),
                report.getComment().getContent(),
                report.getStatus() == 1 ? "已确认违规，评论已删除" : "未发现违规",
                report.getHandleResult()
            );
            mailUtils.sendSimpleMail(report.getEmail(), subject, content);
        } catch (Exception e) {
            log.error("发送举报结果邮件失败", e);
        }
    }
}