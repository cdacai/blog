package com.caixiaohu.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.caixiaohu.entity.SiteSetting;

public interface SiteSettingService {
	Map<String, List<SiteSetting>> getList();

	Map<String, Object> getSiteInfo();

	String getWebTitleSuffix();

	String getAdminCommentAvatar();

	void updateSiteSetting(List<LinkedHashMap> siteSettings, List<Integer> deleteIds);
}
