package com.caixiaohu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.caixiaohu.entity.CommentReport;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.service.CommentReportService;
import com.caixiaohu.util.IpAddressUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@RestController
@RequestMapping("/reports")
public class CommentReportController {
    @Autowired
    private CommentReportService commentReportService;

    @PostMapping("/comment")
    public Result reportComment(@RequestBody CommentReport report, HttpServletRequest request) {
        System.out.println("接收到举报数据: " + report);
        report.setCreateTime(new Date());
        report.setStatus(0);
        
        String ipAddress = IpAddressUtils.getIpAddress(request);
        report.setIp(ipAddress);
        report.setIpSource(IpAddressUtils.getCityInfo(ipAddress));
        
        try {
            commentReportService.saveCommentReport(report);
            return Result.ok("举报成功，我们会尽快处理");
        } catch (Exception e) {
            return Result.error("举报失败：" + e.getMessage());
        }
    }

    // ... 其他举报相关的接口
} 