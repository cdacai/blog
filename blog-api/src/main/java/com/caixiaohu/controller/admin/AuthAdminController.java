package com.caixiaohu.controller.admin;

import com.caixiaohu.constant.JwtConstants;
import com.caixiaohu.model.vo.Result;
import com.caixiaohu.util.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/admin")
public class AuthAdminController {
	@Value("${token.admin-comment-cookie-domain:}")
	private String adminCommentCookieDomain;
	@Value("${token.admin-comment-cookie-secure:false}")
	private boolean adminCommentCookieSecure;

	@PostMapping("/logout")
	public Result logout(HttpServletResponse response) {
		StringBuilder cookie = new StringBuilder();
		cookie.append(JwtConstants.ADMIN_COMMENT_COOKIE)
				.append("=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax");
		if (!StringUtils.isEmpty(adminCommentCookieDomain)) {
			cookie.append("; Domain=").append(adminCommentCookieDomain);
		}
		if (adminCommentCookieSecure) {
			cookie.append("; Secure");
		}
		response.addHeader("Set-Cookie", cookie.toString());
		return Result.ok("退出成功");
	}
}
