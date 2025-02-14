package com.caixiaohu.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

/**
 * @Description: 邮件工具类
 * @Author: Naccl
 * @Date: 2020-10-10
 */
@Slf4j
@EnableAsync
@Component
public class MailUtils {
	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private MailProperties mailProperties;
	@Autowired
	TemplateEngine templateEngine;
	@Value("${spring.mail.nickname}")
	private String nickname;

	private static final String DEFAULT_ENCODING = "UTF-8";

	/**
	 * 对邮件标题进行编码，避免中文和特殊字符乱码
	 */
	private String encodeEmailSubject(String subject) {
		try {
			log.info("原始邮件标题: {}", subject);
			// 使用最基本的UTF-8编码方式
			String encodedSubject = MimeUtility.encodeText(subject, "UTF-8", "B");
			log.info("编码后的邮件标题: {}", encodedSubject);
			return encodedSubject;
		} catch (UnsupportedEncodingException e) {
			log.error("邮件标题编码失败: {}", e.getMessage());
			return subject;
		}
	}

	@Async
	public void sendSimpleMail(String title, String content, String toAccount) {
		try {
			log.info("准备发送简单邮件，原始标题: {}", title);
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(String.format("%s <%s>", encodeEmailSubject(nickname), mailProperties.getUsername()));
			message.setTo(toAccount);
			message.setSubject(encodeEmailSubject(title));
			message.setText(content);
			((JavaMailSenderImpl) javaMailSender).setDefaultEncoding("UTF-8");
			((JavaMailSenderImpl) javaMailSender).getJavaMailProperties().put("mail.smtp.ssl.trust",
					mailProperties.getHost());
			((JavaMailSenderImpl) javaMailSender).getJavaMailProperties().put("mail.smtp.socketFactory.class",
					"javax.net.ssl.SSLSocketFactory");
			javaMailSender.send(message);
		} catch (Exception e) {
			log.error("发送邮件失败: to={}, title={}, error={}", toAccount, title, e.getMessage());
			throw new RuntimeException("发送邮件失败: " + e.getMessage());
		}
	}

	@Async
	public void sendHtmlTemplateMail(Map<String, Object> map, String toAccount, String subject, String template) {
		try {
			log.info("准备发送HTML邮件，原始标题: {}", subject);
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
			messageHelper.setFrom(String.format("%s <%s>", encodeEmailSubject(nickname), mailProperties.getUsername()));
			messageHelper.setTo(toAccount);
			messageHelper.setSubject(encodeEmailSubject(subject));
			Context context = new Context();
			context.setVariables(map);
			String process = templateEngine.process(template, context);
			messageHelper.setText(process, true);
			((JavaMailSenderImpl) javaMailSender).getJavaMailProperties().put("mail.smtp.ssl.trust",
					mailProperties.getHost());
			((JavaMailSenderImpl) javaMailSender).getJavaMailProperties().put("mail.smtp.socketFactory.class",
					"javax.net.ssl.SSLSocketFactory");
			javaMailSender.send(mimeMessage);
		} catch (Exception e) {
			log.error("发送HTML邮件失败: to={}, subject={}, error={}", toAccount, subject, e.getMessage());
			throw new RuntimeException("发送HTML邮件失败: " + e.getMessage());
		}
	}
}
