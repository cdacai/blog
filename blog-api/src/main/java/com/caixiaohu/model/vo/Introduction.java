package com.caixiaohu.model.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

/**
 * @Description: 侧边栏资料卡
 * @Author: Naccl
 * @Date: 2020-08-09
 */
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Introduction {
	private String avatar;
	private String name;
	private String github;
	private String telegram;
	private String qq;
	private String bilibili;
	private String netease;
	private String email;
	@JsonProperty("selfIntroduction")
	private String selfIntroduction;

	private List<String> rollText = new ArrayList<>();
	private List<Favorite> favorites = new ArrayList<>();

}
