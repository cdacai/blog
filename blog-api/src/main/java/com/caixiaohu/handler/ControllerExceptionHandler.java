package com.caixiaohu.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;

import com.caixiaohu.exception.BadRequestException;
import com.caixiaohu.exception.NotFoundException;
import com.caixiaohu.exception.PersistenceException;
import com.caixiaohu.model.vo.Result;

import javax.servlet.http.HttpServletRequest;

/**
 * @Description: 对Controller层全局异常处理
 * @RestControllerAdvice 捕获异常后，返回json数据类型
 * @Author: Naccl
 * @Date: 2020-08-14
 */
@RestControllerAdvice
public class ControllerExceptionHandler {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 捕获自定义的404异常
	 *
	 * @param request 请求
	 * @param e       自定义抛出的异常信息
	 * @return
	 */
	@ExceptionHandler(NotFoundException.class)
	public Result notFoundExceptionHandler(HttpServletRequest request, NotFoundException e) {
		logger.error("Request URL : {}, Exception :", request.getRequestURL(), e);
		return Result.create(404, e.getMessage());
	}

	/**
	 * 捕获自定义的请求错误异常
	 *
	 * @param request 请求
	 * @param e       自定义抛出的异常信息
	 * @return
	 */
	@ExceptionHandler(BadRequestException.class)
	public Result badRequestExceptionHandler(HttpServletRequest request, BadRequestException e) {
		logger.error("Request URL : {}, Exception :", request.getRequestURL(), e);
		return Result.create(400, e.getMessage());
	}

	/**
	 * 捕获自定义的持久化异常
	 *
	 * @param request 请求
	 * @param e       自定义抛出的异常信息
	 * @return
	 */
	@ExceptionHandler(PersistenceException.class)
	public Result persistenceExceptionHandler(HttpServletRequest request, PersistenceException e) {
		logger.error("Request URL : {}, Exception :", request.getRequestURL(), e);
		return Result.create(500, e.getMessage());
	}

	/**
	 * 捕获自定义的登录失败异常
	 *
	 * @param request 请求
	 * @param e       自定义抛出的异常信息
	 * @return
	 */
	@ExceptionHandler(UsernameNotFoundException.class)
	public Result usernameNotFoundExceptionHandler(HttpServletRequest request, UsernameNotFoundException e) {
		logger.error("Request URL : {}, Exception :", request.getRequestURL(), e);
		return Result.create(401, "用户名或密码错误！");
	}

	/**
	 * 捕获其它异常
	 *
	 * @param request 请求
	 * @param e       异常信息
	 * @return
	 */
	@ExceptionHandler(Exception.class)
	public Result exceptionHandler(HttpServletRequest request, Exception e) {
		logger.error("Request URL : {}, Exception :", request.getRequestURL(), e);

		// 处理文件上传大小超限异常
		if (e instanceof MaxUploadSizeExceededException) {
			logger.error("文件大小超出限制：{}", e.getMessage());
			return Result.error("文件大小超过限制，单个文件最大为20MB，请压缩后重试");
		}

		return Result.error("服务器异常");
	}

	@ExceptionHandler(HttpMediaTypeNotAcceptableException.class)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public String handleHttpMediaTypeNotAcceptableException(HttpMediaTypeNotAcceptableException e) {
		// 直接返回简单字符串，避免触发消息转换
		return "{\"code\":200,\"msg\":\"操作成功\"}";
	}
}
