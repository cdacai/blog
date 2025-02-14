package com.caixiaohu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

import com.caixiaohu.model.vo.BlogIdAndTitle;

import java.util.ArrayList;

/**
 * @Description: 博客评论
 * @Author: Naccl
 * @Date: 2020-07-27
 */
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Comment {
	private Long id;
	private String nickname;
	private String email;
	private String content;
	private String avatar;
	private String website;
	private String ip;
	private Date createTime;
	private Boolean published;
	private Boolean adminComment;
	private Integer page;
	private Boolean notice;
	private Long blogId;
	private BlogIdAndTitle blog;
	private Long parentCommentId;
	private String qq;
	private List<Comment> replyComments = new ArrayList<>();
}
