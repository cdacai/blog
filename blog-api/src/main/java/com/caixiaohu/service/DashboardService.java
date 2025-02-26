package com.caixiaohu.service;

import java.util.List;
import java.util.Map;

import com.caixiaohu.entity.CityVisitor;

public interface DashboardService {
	int countVisitLogByToday();

	int getBlogCount();

	int getCommentCount();

	Map<String, List> getCategoryBlogCountMap();

	Map<String, List> getTagBlogCountMap();

	Map<String, List> getVisitRecordMap();

	List<CityVisitor> getCityVisitorList();
	
	/**
	 * 获取所有历史访客数据
	 * @return 所有历史访客数据
	 */
	List<CityVisitor> getAllCityVisitorList();
}
