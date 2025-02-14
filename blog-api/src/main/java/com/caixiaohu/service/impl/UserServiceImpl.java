package com.caixiaohu.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.caixiaohu.entity.User;
import com.caixiaohu.exception.NotFoundException;
import com.caixiaohu.mapper.UserMapper;
import com.caixiaohu.service.UserService;
import com.caixiaohu.util.HashUtils;
import com.caixiaohu.util.JwtUtils;

/**
 * @Description: 用户业务层接口实现类
 * @Author: Naccl
 * @Date: 2020-07-19
 */
@Service
public class UserServiceImpl implements UserService, UserDetailsService {
	private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserMapper userMapper;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public UserServiceImpl() {
		// 在启动时打印出密码哈希，用于调试
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String hash = encoder.encode("123456");
		log.info("==========================================");
		log.info("Debug - NEW Password hash for '123456': {}", hash);
		log.info("==========================================");
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("Attempting to load user by username: {}", username);
		User user = userMapper.findByUsername(username);
		if (user == null) {
			log.warn("User not found with username: {}", username);
			throw new UsernameNotFoundException("用户不存在");
		}
		log.info("Successfully loaded user: {}, with role: {}", username, user.getRole());
		return user;
	}

	@Override
	public User findUserByUsernameAndPassword(String username, String password) {
		log.info("Attempting to authenticate user: {}", username);
		User user = userMapper.findByUsername(username);
		if (user == null) {
			log.warn("User not found with username: {}", username);
			throw new UsernameNotFoundException("用户不存在");
		}
		return user;
	}

	@Override
	public User findUserById(Long id) {
		log.info("Attempting to find user by id: {}", id);
		User user = userMapper.findById(id);
		if (user == null) {
			log.warn("User not found with id: {}", id);
			throw new NotFoundException("用户不存在");
		}
		log.info("Successfully found user by id: {}", id);
		return user;
	}

	@Override
	public boolean changeAccount(User user, String jwt) {
		log.info("Attempting to change account for user: {}", user.getUsername());
		String username = JwtUtils.getTokenBody(jwt).getSubject();
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		if (userMapper.updateUserByUsername(username, user) != 1) {
			log.error("Failed to update user: {}", username);
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			return false;
		}
		log.info("Successfully updated account for user: {}", username);
		return true;
	}
}
