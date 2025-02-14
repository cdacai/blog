package com.caixiaohu.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.caixiaohu.annotation.PermissionRequired;
import com.caixiaohu.entity.CommentReport;
import com.caixiaohu.model.dto.CommentReportHandleRequest;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.service.CommentReportService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.springframework.util.StringUtils;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class CommentReportAdminController {
    @Autowired
    private CommentReportService commentReportService;

    @PermissionRequired("admin")
    @GetMapping("/comments/reports")
    public Result reports(@RequestParam(defaultValue = "1") Integer pageNum,
                         @RequestParam(defaultValue = "10") Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<CommentReport> reportList = commentReportService.getCommentReportList();
        PageInfo<CommentReport> pageInfo = new PageInfo<>(reportList);
        return Result.ok("获取成功", pageInfo);
    }

    @PermissionRequired("admin")
    @PutMapping("/comments/report/{id}")
    public Result handleReport(@PathVariable Long id, @RequestBody CommentReportHandleRequest request) {
        if (StringUtils.isEmpty(request.getHandleResult())) {
            return Result.error("处理结果不能为空");
        }
        try {
            commentReportService.handleCommentReport(id, request);
            return Result.ok("处理成功");
        } catch (Exception e) {
            return Result.error("处理失败：" + e.getMessage());
        }
    }

    @PermissionRequired("admin")
    @DeleteMapping("/comments/report/{id}")
    public Result deleteReport(@PathVariable Long id) {
        commentReportService.deleteCommentReport(id);
        return Result.ok("删除成功");
    }
} 