package com.caixiaohu.controller.admin;

import com.caixiaohu.model.vo.Result;
import com.caixiaohu.util.upload.UploadUtils;
import com.caixiaohu.util.upload.channel.UpyunChannel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 又拍云图片上传
 */
@RestController
@RequestMapping("/admin/upyun")
public class UpyunAdminController {
    @Autowired
    private UpyunChannel upyunChannel;

    @PreAuthorize("hasRole('ROLE_admin')")
    @PostMapping("/upload")
    public Result uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("fileName") String fileName) {
        try {
            // 使用 UploadUtils 处理图片上传
            UploadUtils.ImageResource image = new UploadUtils.ImageResource(file.getBytes(), fileName);

            // 使用又拍云通道上传图片
            String url = upyunChannel.upload(image);

            return Result.ok("上传成功", url);
        } catch (Exception e) {
            return Result.error("上传失败：" + e.getMessage());
        }
    }
}