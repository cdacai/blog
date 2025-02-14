package com.caixiaohu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caixiaohu.entity.Comment;
import com.caixiaohu.entity.CommentReport;
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
            notificationService.createNotification("report", reportId);
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
        CommentReport report = commentReportMapper.getReportById(reportId);
        if (report == null) {
            throw new NotFoundException("举报不存在");
        }
        if (report.getStatus() == 1) {
            throw new BadRequestException("该举报已处理");
        }

        // 设置处理信息
        report.setHandleTime(new Date());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        report.setHandleBy(username);
        report.setHandleResult(request.getHandleResult());
        report.setStatus(1);

        try {
            // 根据处理方式执行相应操作
            switch (request.getAction()) {
                case "delete":
                    if (report.getCommentId() != null) {
                        // 获取评论信息
                        Comment comment = commentService.getCommentById(report.getCommentId());
                        if (comment == null) {
                            report.setHandleResult("评论已不存在");
                            if (commentReportMapper.updateCommentReport(report) != 1) {
                                throw new PersistenceException("更新举报状态失败");
                            }
                            return;
                        }

                        if (comment.getBlog() != null) {
                            // 如果是博客评论，保存博客信息
                            report.setBlogId(comment.getBlog().getId());
                            report.setBlogTitle(comment.getBlog().getTitle());
                        } else {
                            // 如果是"关于我"页面的评论
                            report.setBlogId(null);
                            report.setBlogTitle("关于我");
                        }

                        try {
                            // 1. 先更新举报状态
                            if (commentReportMapper.updateCommentReport(report) != 1) {
                                throw new PersistenceException("更新举报状态失败");
                            }

                            // 2. 删除评论
                            commentService.deleteCommentById(report.getCommentId());

                            // 3. 更新所有相关举报记录为已处理
                            commentReportMapper.updateReportStatusByCommentId(
                                    report.getCommentId(),
                                    1, // 已处理状态
                                    username,
                                    new Date(),
                                    "评论已删除");
                        } catch (Exception e) {
                            log.error("处理举报评论失败", e);
                            throw new PersistenceException("处理失败: " + e.getMessage());
                        }
                    } else {
                        // 评论已经被删除的情况
                        if (commentReportMapper.updateCommentReport(report) != 1) {
                            throw new PersistenceException("处理举报失败");
                        }
                    }
                    break;
                default:
                    // 仅更新当前举报记录状态
                    if (commentReportMapper.updateCommentReport(report) != 1) {
                        throw new PersistenceException("处理举报失败");
                    }
            }
            // 4. 发送处理结果邮件通知举报人
            sendReportHandleEmail(report, request);
        } catch (Exception e) {
            log.error("处理举报失败", e);
            throw new PersistenceException("处理失败：" + e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteCommentReport(Long id) {
        if (commentReportMapper.deleteCommentReportById(id) != 1) {
            throw new PersistenceException("删除举报失败");
        }
    }

    /**
     * 异步发送举报通知邮件给管理员
     */
    @Async
    protected void sendReportNotifyEmail(CommentReport report) {
        try {
            // 验证箱格式
            if (adminEmail == null || !adminEmail.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                log.error("管理员邮箱格式错误: {}", adminEmail);
                return;
            }
            String emailTitle = "New Comment Report";
            String emailContent = String.format(
                    "收到新的评论举报:\n" +
                            "举报内容: %s\n" +
                            "举报人邮箱: %s\n" +
                            "举报人手机: %s\n" +
                            "举报人IP: %s (%s)\n" +
                            "被举报评论ID: %d\n" +
                            "被举报评论内容: %s\n" +
                            "举报时间: %s\n\n" +
                            "请及时处理该举报。\n" +
                            "可以通过后台管理系统查看详情：%s/admin/comment/reports",
                    report.getContent(),
                    report.getEmail(),
                    report.getPhone() != null ? report.getPhone() : "未提供",
                    report.getIp(),
                    report.getIpSource(),
                    report.getCommentId(),
                    report.getCommentContent(),
                    report.getCreateTime(),
                    blogCms);

            log.info("开始发送举报通知邮件到管理员邮箱: {}", adminEmail);
            mailUtils.sendSimpleMail(emailTitle, emailContent, adminEmail);
            log.info("举报通知邮件发送成功");
        } catch (Exception e) {
            log.error("举报通知邮件发送失败", e);
        }
    }

    /**
     * 异步发送处理结果邮件给举报人
     */
    @Async
    protected void sendReportHandleEmail(CommentReport report, CommentReportHandleRequest request) {
        // 验证举报人邮箱格式
        if (report.getEmail() == null || !report.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            log.error("举报人邮箱格式错误: {}", report.getEmail());
            return;
        }
        // 构造评论链接
        String commentUrl = "";
        if ("delete".equals(request.getAction())) {
            if (report.getBlogId() != null) {
                commentUrl = blogView + "/blog/" + report.getBlogId();
            } else {
                commentUrl = blogView + "/about";
            }
        } else {
            if (report.getBlogId() != null && report.getCommentId() != null) {
                commentUrl = blogView + "/blog/" + report.getBlogId() + "#comment-" + report.getCommentId();
            } else if (report.getCommentId() != null) {
                commentUrl = blogView + "/about#comment-" + report.getCommentId();
            }
        }

        String emailTitle = "Report Processing Result";

        String emailContent = String.format(
                "尊敬的用户：\n\n" +
                        "您好！您举报的评论已处理完成。\n\n" +
                        "举报内容：\n" +
                        "评论：%s\n" +
                        "位置：%s\n" +
                        "举报原因：%s\n\n" +
                        "处理结果：\n" +
                        "%s\n\n" +
                        "%s\n\n" +
                        "如有任何问题，欢迎随时与我们联系。\n\n" +
                        "此致\n" +
                        "Observe",
                report.getCommentContent(),
                report.getBlogTitle() != null ? "《" + report.getBlogTitle() + "》" : "独立页面",
                report.getContent(),
                report.getHandleResult(),
                "您可以通过以下链接查看该文章：\n" + commentUrl);

        mailUtils.sendSimpleMail(emailTitle, emailContent, report.getEmail());
    }
}