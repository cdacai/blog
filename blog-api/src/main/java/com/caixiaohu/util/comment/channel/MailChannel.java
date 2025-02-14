package com.caixiaohu.util.comment.channel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.caixiaohu.config.properties.BlogProperties;
import com.caixiaohu.enums.CommentPageEnum;
import com.caixiaohu.model.dto.Comment;
import com.caixiaohu.util.MailUtils;
import com.caixiaohu.util.comment.CommentUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * 邮件提醒方式
 *
 * @author: Naccl
 * @date: 2022-01-22
 */
@Lazy
@Component
public class MailChannel implements CommentNotifyChannel {
	@Autowired
	private BlogProperties blogProperties;
	@Autowired
	private MailProperties mailProperties;
	@Autowired
	private MailUtils mailUtils;

	/**
	 * 发送邮件提醒我自己
	 *
	 * @param comment 当前收到的评论
	 */
	@Override
	public void notifyMyself(Comment comment) {
		CommentPageEnum commentPageEnum = CommentUtils.getCommentPageEnum(comment);
		Map<String, Object> map = new HashMap<>(16);
		map.put("title", commentPageEnum.getTitle());
		map.put("time", comment.getCreateTime());
		map.put("nickname", comment.getNickname());
		map.put("content", comment.getContent());
		map.put("ip", comment.getIp());
		map.put("email", comment.getEmail());
		map.put("status", comment.getPublished() ? "公开" : "待审核");
		map.put("url", blogProperties.getView() + commentPageEnum.getPath());
		map.put("manageUrl", blogProperties.getCms() + "/comments");
		String toAccount = mailProperties.getUsername();
		String subject = "New Comment Notification";
		mailUtils.sendHtmlTemplateMail(map, toAccount, subject, "owner.html");
	}
}
