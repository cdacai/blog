package com.caixiaohu.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@NoArgsConstructor
@TableName("notification")
public class Notification {
    @TableId(type = IdType.AUTO)
    private Long id;

    @NotBlank(message = "通知类型不能为空")
    @Size(max = 10, message = "通知类型长度不能超过10个字符")
    private String type;        // 通知类型：comment/like/report

    @Size(max = 50, message = "用户昵称长度不能超过50个字符")
    private String nickname;    // 用户昵称

    private String content;     // 评论内容

    @NotNull(message = "目标ID不能为空")
    private Long targetId;      // 目标ID

    @NotBlank(message = "目标类型不能为空")
    @Size(max = 10, message = "目标类型长度不能超过10个字符")
    private String targetType;  // 目标类型：blog/moment

    @Size(max = 255, message = "目标标题长度不能超过255个字符")
    private String targetTitle; // 目标标题

    @Size(max = 50, message = "IP地址长度不能超过50个字符")
    private String ip;          // IP地址

    @Size(max = 100, message = "IP来源长度不能超过100个字符")
    private String ipSource;    // IP来源

    @Size(max = 500, message = "举报原因长度不能超过500个字符")
    private String reportReason;// 举报原因

    @NotNull(message = "是否已读不能为空")
    private Boolean isRead;     // 是否已读

    @NotNull(message = "创建时间不能为空")
    private Date createTime;    // 创建时间

    private Date updateTime;    // 更新时间
}