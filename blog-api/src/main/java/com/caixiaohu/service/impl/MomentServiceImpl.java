package com.caixiaohu.service.impl;

import com.caixiaohu.entity.Moment;
import com.caixiaohu.entity.Notification;
import com.caixiaohu.exception.NotFoundException;
import com.caixiaohu.exception.PersistenceException;
import com.caixiaohu.mapper.MomentMapper;
import com.caixiaohu.service.MomentService;
import com.caixiaohu.service.NotificationService;
import com.caixiaohu.util.markdown.MarkdownUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @Description: 博客动态业务层实现
 * @Author: Naccl
 * @Date: 2020-08-24
 */
@Slf4j
@Service
public class MomentServiceImpl implements MomentService {
	@Autowired
	private MomentMapper momentMapper;
	@Autowired
	private NotificationService notificationService;
	// 每页显示5条动态
	private static final int pageSize = 5;
	// 动态列表排序方式
	private static final String orderBy = "create_time desc";
	// 私密动态提示
	private static final String PRIVATE_MOMENT_CONTENT = "<p>此条为私密动态，仅发布者可见！</p>";

	@Override
	public List<Moment> getMomentList() {
		return momentMapper.getMomentList();
	}

	@Override
	public List<Moment> getMomentVOList(Integer pageNum, boolean adminIdentity) {
		PageHelper.startPage(pageNum, pageSize, orderBy);
		List<Moment> moments = momentMapper.getMomentList();
		// 过滤掉未发布的动态
		moments.removeIf(moment -> !adminIdentity && !moment.getPublished());
		// 转换内容格式
		for (Moment moment : moments) {
			moment.setContent(MarkdownUtils.markdownToHtmlExtensions(moment.getContent()));
		}
		return moments;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void addLikeByMomentId(Long momentId, String ip, String ipSource) {
		if (momentMapper.addLikeByMomentId(momentId) != 1) {
			throw new PersistenceException("操作失败");
		}
		// 创建点赞通知
		Notification notification = new Notification();
		notification.setType("like");
		notification.setContent("有人点赞了你的动态");
		notification.setTargetId(momentId);
		notification.setTargetType("moment");
		notification.setIp(ip);
		notification.setIpSource(ipSource);
		notification.setIsRead(false);
		notification.setCreateTime(new Date());
		// 新增：设置 targetTitle
		Moment moment = momentMapper.getMomentById(momentId);
		if (moment != null) {
			String content = moment.getContent();
			if (content != null && content.length() > 50) {
				content = content.substring(0, 50) + "...";
			}
			notification.setTargetTitle(content);
		} else {
			notification.setTargetTitle("动态已删除");
		}
		notificationService.createNotification(notification);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void updateMomentPublishedById(Long momentId, Boolean published) {
		if (momentMapper.updateMomentPublishedById(momentId, published) != 1) {
			throw new PersistenceException("操作失败");
		}
	}

	@Override
	public Moment getMomentById(Long id) {
		Moment moment = momentMapper.getMomentById(id);
		if (moment == null) {
			throw new NotFoundException("动态不存在");
		}
		return moment;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void deleteMomentById(Long id) {
		if (momentMapper.deleteMomentById(id) != 1) {
			throw new PersistenceException("删除失败");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void saveMoment(Moment moment) {
		if (momentMapper.saveMoment(moment) != 1) {
			throw new PersistenceException("动态添加失败");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void updateMoment(Moment moment) {
		if (momentMapper.updateMoment(moment) != 1) {
			throw new PersistenceException("动态修改失败");
		}
	}
}
