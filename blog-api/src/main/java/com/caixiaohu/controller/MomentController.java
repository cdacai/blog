package com.caixiaohu.controller;

import com.caixiaohu.annotation.AccessLimit;
import com.caixiaohu.annotation.VisitLogger;
import com.caixiaohu.constant.JwtConstants;
import com.caixiaohu.entity.Moment;
import com.caixiaohu.entity.User;
import com.caixiaohu.enums.VisitBehavior;
import com.caixiaohu.model.vo.PageResult;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.service.MomentService;
import com.caixiaohu.service.RedisService;
import com.caixiaohu.service.impl.UserServiceImpl;
import com.caixiaohu.util.JwtUtils;
import com.caixiaohu.util.IpAddressUtils;
import com.github.pagehelper.PageInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Description: 动态
 * @Author: Naccl
 * @Date: 2020-08-25
 */
@RestController
public class MomentController {
	@Autowired
	MomentService momentService;
	@Autowired
	UserServiceImpl userService;
	@Autowired
	RedisService redisService;

	/**
	 * 分页查询动态List
	 *
	 * @param pageNum 页码
	 * @param jwt     博主访问Token
	 * @return
	 */
	@VisitLogger(VisitBehavior.MOMENT)
	@GetMapping("/moments")
	public Result moments(@RequestParam(defaultValue = "1") Integer pageNum,
			@RequestHeader(value = "Authorization", defaultValue = "") String jwt) {
		boolean adminIdentity = false;
		if (JwtUtils.judgeTokenIsExist(jwt)) {
			try {
				String subject = JwtUtils.getTokenBody(jwt).getSubject();
				if (subject.startsWith(JwtConstants.ADMIN_PREFIX)) {
					// 博主身份Token
					String username = subject.replace(JwtConstants.ADMIN_PREFIX, "");
					User admin = (User) userService.loadUserByUsername(username);
					if (admin != null) {
						adminIdentity = true;
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		PageInfo<Moment> pageInfo = new PageInfo<>(momentService.getMomentVOList(pageNum, adminIdentity));
		PageResult<Moment> pageResult = new PageResult<>(pageInfo.getPages(), pageInfo.getList());
		return Result.ok("获取成功", pageResult);
	}

	/**
	 * 给动态点赞
	 * 简单限制一下点赞
	 *
	 * @param id 动态id
	 * @return
	 */
	@VisitLogger(VisitBehavior.LIKE_MOMENT)
	@PostMapping("/moment/like/{id}")
	public Result like(@PathVariable Long id, HttpServletRequest request) {
		// 检查是否已点赞
		String ip = IpAddressUtils.getIpAddress(request);
		String key = "moment_like_" + ip + "_" + id;
		Object count = redisService.getObjectByValue(key, Integer.class);
		if (count != null) {
			return Result.create(200, "不可以重复点赞哦");
		}
		// 获取IP来源
		String ipSource = IpAddressUtils.getCityInfo(ip);
		// 点赞并记录到 Redis
		momentService.addLikeByMomentId(id, ip, ipSource);
		redisService.saveObjectToValue(key, 1);
		redisService.expire(key, 86400);
		return Result.ok("点赞成功");
	}
}
