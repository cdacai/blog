package com.caixiaohu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.caixiaohu.entity.Category;
import com.caixiaohu.entity.CityVisitor;
import com.caixiaohu.entity.Tag;
import com.caixiaohu.entity.VisitRecord;
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
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	//查询最近30天的记录
	private static final int visitRecordLimitNum = 30;
	
	// 国家坐标数据
	private Map<String, double[]> countryCoordinates;
	
	public DashboardServiceImpl() {
		// 初始化时加载国家坐标数据
		loadCountryCoordinates();
	}
	
	/**
	 * 加载国家坐标数据
	 */
	private void loadCountryCoordinates() {
		try {
			Resource resource = new ClassPathResource("static/country_coordinates.json");
			InputStream inputStream = resource.getInputStream();
			ObjectMapper mapper = new ObjectMapper();
			countryCoordinates = mapper.readValue(inputStream, Map.class);
			System.out.println("成功加载国家坐标数据，共 " + countryCoordinates.size() + " 条记录");
		} catch (IOException e) {
			System.err.println("加载国家坐标数据失败: " + e.getMessage());
			countryCoordinates = new HashMap<>();
		}
	}

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
		// 获取今日访客数据
		List<String> todayIpSources = visitLogMapper.getIpSourcesByToday();
		System.out.println("Today IP sources: " + todayIpSources);
		
		Map<String, Integer> cityVisitorCount = new HashMap<>();
		
		// 统计今日各城市访客数
		for(String ipSource : todayIpSources) {
			String city;
			if(ipSource == null || ipSource.trim().isEmpty()) {
				city = "未知";  // 空IP来源显示为未知
			} else if(!ipSource.startsWith("中国")) {
				// 非中国IP，只提取国家信息
				String[] split = ipSource.split("\\|");
				if(split.length >= 1 && !split[0].trim().isEmpty()) {
					city = split[0];  // 使用国家名称
				} else {
					city = "未知";  // 无法提取国家信息
				}
			} else {
				// 中国IP，提取城市信息
				String[] split = ipSource.split("\\|");
				if(split.length >= 3 && !split[2].trim().isEmpty()) {
					city = split[2];  // 使用城市名称
				} else if(split.length >= 2 && !split[1].trim().isEmpty()) {
					city = split[1];  // 使用省份名称
				} else {
					city = "中国";  // 无法提取省市信息
				}
			}
			cityVisitorCount.merge(city, 1, Integer::sum);
		}
		
		// 转换为CityVisitor列表
		List<CityVisitor> todayVisitors = new ArrayList<>();
		for(Map.Entry<String, Integer> entry : cityVisitorCount.entrySet()) {
			CityVisitor visitor = new CityVisitor();
			visitor.setCity(entry.getKey());
			visitor.setUv(entry.getValue());
			todayVisitors.add(visitor);
		}
		
		return todayVisitors;
	}
	
	@Override
	public List<CityVisitor> getAllCityVisitorList() {
		// 获取所有访客数据
		List<String> allIpSources = visitLogMapper.getAllIpSources();
		System.out.println("All IP sources count: " + allIpSources.size());
		
		Map<String, Integer> cityVisitorCount = new HashMap<>();
		
		// 统计所有历史各城市访客数
		for(String ipSource : allIpSources) {
			String city;
			if(ipSource == null || ipSource.trim().isEmpty()) {
				city = "未知";  // 空IP来源显示为未知
			} else if(!ipSource.startsWith("中国")) {
				// 非中国IP，只提取国家信息
				String[] split = ipSource.split("\\|");
				if(split.length >= 1 && !split[0].trim().isEmpty()) {
					city = split[0];  // 使用国家名称
				} else {
					city = "未知";  // 无法提取国家信息
				}
			} else {
				// 中国IP，提取城市信息
				String[] split = ipSource.split("\\|");
				if(split.length >= 3 && !split[2].trim().isEmpty()) {
					city = split[2];  // 使用城市名称
				} else if(split.length >= 2 && !split[1].trim().isEmpty()) {
					city = split[1];  // 使用省份名称
				} else {
					city = "中国";  // 无法提取省市信息
				}
			}
			cityVisitorCount.merge(city, 1, Integer::sum);
		}
		
		// 转换为CityVisitor列表
		List<CityVisitor> allVisitors = new ArrayList<>();
		for(Map.Entry<String, Integer> entry : cityVisitorCount.entrySet()) {
			CityVisitor visitor = new CityVisitor();
			visitor.setCity(entry.getKey());
			visitor.setUv(entry.getValue());
			allVisitors.add(visitor);
		}
		
		return allVisitors;
	}
}
