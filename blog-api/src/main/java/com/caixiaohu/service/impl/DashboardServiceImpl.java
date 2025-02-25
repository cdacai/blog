package com.caixiaohu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caixiaohu.constant.RedisKeyConstants;
import com.caixiaohu.entity.Category;
import com.caixiaohu.entity.CityVisitor;
import com.caixiaohu.entity.Tag;
import com.caixiaohu.entity.VisitRecord;
import com.caixiaohu.entity.VisitLog;
import com.caixiaohu.mapper.BlogMapper;
import com.caixiaohu.mapper.CategoryMapper;
import com.caixiaohu.mapper.CityVisitorMapper;
import com.caixiaohu.mapper.CommentMapper;
import com.caixiaohu.mapper.TagMapper;
import com.caixiaohu.mapper.VisitLogMapper;
import com.caixiaohu.mapper.VisitRecordMapper;
import com.caixiaohu.model.vo.CategoryBlogCount;
import com.caixiaohu.model.vo.TagBlogCount;
import com.caixiaohu.service.DashboardService;
import com.caixiaohu.service.RedisService;
import com.caixiaohu.util.GlobalCityCoordUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @Description: 仪表盘业务层实现
 * @Author: Naccl
 * @Date: 2020-10-08
 */
@Service
public class DashboardServiceImpl implements DashboardService {
	@Autowired
	BlogMapper blogMapper;
	@Autowired
	CommentMapper commentMapper;
	@Autowired
	CategoryMapper categoryMapper;
	@Autowired
	TagMapper tagMapper;
	@Autowired
	VisitLogMapper visitLogMapper;
	@Autowired
	VisitRecordMapper visitRecordMapper;
	@Autowired
	CityVisitorMapper cityVisitorMapper;
	@Autowired
	RedisService redisService;
	@Autowired
	GlobalCityCoordUtils globalCityCoordUtils;
	//查询最近30天的记录
	private static final int visitRecordLimitNum = 30;

	@Override
	public int countVisitLogByToday() {
		return visitLogMapper.countVisitLogByToday();
	}

	@Override
	public int getBlogCount() {
		return blogMapper.countBlog();
	}

	@Override
	public int getCommentCount() {
		return commentMapper.countComment();
	}

	@Override
	public Map<String, List> getCategoryBlogCountMap() {
		//查询分类id对应的博客数量
		List<CategoryBlogCount> categoryBlogCountList = blogMapper.getCategoryBlogCountList();
		//查询所有分类的id和名称
		List<Category> categoryList = categoryMapper.getCategoryList();
		//所有分类名称的List
		List<String> legend = new ArrayList<>();
		for (Category category : categoryList) {
			legend.add(category.getName());
		}
		//分类对应的博客数量List
		List<CategoryBlogCount> series = new ArrayList<>();
		if (categoryBlogCountList.size() == categoryList.size()) {
			Map<Long, String> m = new HashMap<>(16);
			for (Category c : categoryList) {
				m.put(c.getId(), c.getName());
			}
			for (CategoryBlogCount c : categoryBlogCountList) {
				c.setName(m.get(c.getId()));
				series.add(c);
			}
		} else {
			Map<Long, Integer> m = new HashMap<>(16);
			for (CategoryBlogCount c : categoryBlogCountList) {
				m.put(c.getId(), c.getValue());
			}
			for (Category c : categoryList) {
				CategoryBlogCount categoryBlogCount = new CategoryBlogCount();
				categoryBlogCount.setName(c.getName());
				Integer count = m.get(c.getId());
				if (count == null) {
					categoryBlogCount.setValue(0);
				} else {
					categoryBlogCount.setValue(count);
				}
				series.add(categoryBlogCount);
			}
		}
		Map<String, List> map = new HashMap<>(4);
		map.put("legend", legend);
		map.put("series", series);
		return map;
	}

	@Override
	public Map<String, List> getTagBlogCountMap() {
		//查询标签id对应的博客数量
		List<TagBlogCount> tagBlogCountList = tagMapper.getTagBlogCount();
		//查询所有标签的id和名称
		List<Tag> tagList = tagMapper.getTagList();
		//所有标签名称的List
		List<String> legend = new ArrayList<>();
		for (Tag tag : tagList) {
			legend.add(tag.getName());
		}
		//标签对应的博客数量List
		List<TagBlogCount> series = new ArrayList<>();
		if (tagBlogCountList.size() == tagList.size()) {
			Map<Long, String> m = new HashMap<>(64);
			for (Tag t : tagList) {
				m.put(t.getId(), t.getName());
			}
			for (TagBlogCount t : tagBlogCountList) {
				t.setName(m.get(t.getId()));
				series.add(t);
			}
		} else {
			Map<Long, Integer> m = new HashMap<>(64);
			for (TagBlogCount t : tagBlogCountList) {
				m.put(t.getId(), t.getValue());
			}
			for (Tag t : tagList) {
				TagBlogCount tagBlogCount = new TagBlogCount();
				tagBlogCount.setName(t.getName());
				Integer count = m.get(t.getId());
				if (count == null) {
					tagBlogCount.setValue(0);
				} else {
					tagBlogCount.setValue(count);
				}
				series.add(tagBlogCount);
			}
		}
		Map<String, List> map = new HashMap<>(4);
		map.put("legend", legend);
		map.put("series", series);
		return map;
	}

	@Override
	public Map<String, List> getVisitRecordMap() {
		List<VisitRecord> visitRecordList = visitRecordMapper.getVisitRecordListByLimit(visitRecordLimitNum);
		List<String> date = new ArrayList<>(visitRecordList.size());
		List<Integer> pv = new ArrayList<>(visitRecordList.size());
		List<Integer> uv = new ArrayList<>(visitRecordList.size());
		for (int i = visitRecordList.size() - 1; i >= 0; i--) {
			VisitRecord visitRecord = visitRecordList.get(i);
			date.add(visitRecord.getDate());
			pv.add(visitRecord.getPv());
			uv.add(visitRecord.getUv());
		}
		Map<String, List> map = new HashMap<>(8);
		map.put("date", date);
		map.put("pv", pv);
		map.put("uv", uv);
		return map;
	}

	@Override
	public List<CityVisitor> getCityVisitorList() {
		// 从Redis获取今日访客UUID集合
		Set<String> uuidSet = redisService.getSetMembers(RedisKeyConstants.IDENTIFICATION_SET);
		if (uuidSet == null || uuidSet.isEmpty()) {
			return new ArrayList<>();
		}
		
		// 获取这些UUID今天的访问记录
		List<VisitLog> todayLogs = visitLogMapper.getVisitLogsByUUIDs(new ArrayList<>(uuidSet));
		
		Map<String, CityVisitor> cityVisitorMap = new HashMap<>();
		
		// 统计今日各城市访客数
		for(VisitLog log : todayLogs) {
			String ipSource = log.getIpSource();
			Object[] cityInfo = globalCityCoordUtils.parseCityFromIpSource(ipSource);
			String city = (String) cityInfo[0];
			
			CityVisitor visitor = cityVisitorMap.get(city);
			if (visitor == null) {
				visitor = new CityVisitor();
				visitor.setCity(city);
				visitor.setUv(1);
				// 添加经纬度信息
				visitor.setLongitude((Double) cityInfo[1]);
				visitor.setLatitude((Double) cityInfo[2]);
				cityVisitorMap.put(city, visitor);
			} else {
				visitor.setUv(visitor.getUv() + 1);
			}
		}
		
		return new ArrayList<>(cityVisitorMap.values());
	}
}
