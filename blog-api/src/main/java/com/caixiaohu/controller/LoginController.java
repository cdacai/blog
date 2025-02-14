package com.caixiaohu.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.caixiaohu.constant.JwtConstants;
import com.caixiaohu.entity.User;
import com.caixiaohu.model.dto.LoginInfo;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.service.UserService;
import com.caixiaohu.util.JwtUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: 前台登录
 * @Author: Naccl
 * @Date: 2020-09-02
 */
@RestController
public class LoginController {
	private static final Logger log = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	UserService userService;

	/**
	 * 登录成功后，签发博主身份Token
	 *
	 * @param loginInfo
	 * @return
	 */
	@PostMapping("/login")
	public Result login(@RequestBody LoginInfo loginInfo) {
		User user = userService.findUserByUsernameAndPassword(loginInfo.getUsername(), loginInfo.getPassword());
		if (user == null) {
			return Result.create(403, "用户名或密码错误");
		}
		log.debug("User from database - username: {}, role: {}", user.getUsername(), user.getRole());
		user.setPassword(null);
		String jwt = generateToken(user);
		return Result.ok("登录成功", jwt);
	}

	private String generateToken(User user) {
		List<String> authorities = new ArrayList<>();
		authorities.add(user.getRole());
		log.debug("Created authorities list: {}", authorities);
		String token = JwtUtils.generateToken(JwtConstants.ADMIN_PREFIX + user.getUsername(), authorities);
		log.debug("Generated JWT token with subject: {}", JwtConstants.ADMIN_PREFIX + user.getUsername());
		log.debug("Generated JWT: {}", token);
		return token;
	}
}
