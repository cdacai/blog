package com.caixiaohu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caixiaohu.constant.RedisKeyConstants;
import com.caixiaohu.entity.Category;
import com.caixiaohu.exception.NotFoundException;
import com.caixiaohu.exception.PersistenceException;
import com.caixiaohu.mapper.CategoryMapper;
import com.caixiaohu.service.CategoryService;
import com.caixiaohu.service.RedisService;
import com.caixiaohu.service.TagService;

import java.util.List;

/**
 * @Description: 博客分类业务层实现
 * @Author: Naccl
 * @Date: 2020-07-29
 */
@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	CategoryMapper categoryMapper;
	@Autowired
	TagService tagService;
	@Autowired
	RedisService redisService;

	@Override
	public List<Category> getCategoryList() {
		return categoryMapper.getCategoryList();
	}

	@Override
	public List<Category> getCategoryNameList() {
		String redisKey = RedisKeyConstants.CATEGORY_NAME_LIST;
		List<Category> categoryListFromRedis = redisService.getListByValue(redisKey);
		if (categoryListFromRedis != null) {
			return categoryListFromRedis;
		}
		List<Category> categoryList = categoryMapper.getCategoryNameList();
		redisService.saveListToValue(redisKey, categoryList);
		return categoryList;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void saveCategory(Category category) {
		// 如果 isDefault 为 null，设置为 false
		if (category.getIsDefault() == null) {
			category.setIsDefault(false);
		}
		// 如果该分类是默认分类，需要重置其他分类的默认状态
		if (category.getIsDefault()) {
			categoryMapper.resetDefaultCategory();
		}
		if (categoryMapper.saveCategory(category) != 1) {
			throw new PersistenceException("分类添加失败");
		}
		redisService.deleteCacheByKey(RedisKeyConstants.CATEGORY_NAME_LIST);
	}

	@Override
	public Category getCategoryById(Long id) {
		Category category = categoryMapper.getCategoryById(id);
		if (category == null) {
			throw new NotFoundException("分类不存在");
		}
		return category;
	}

	@Override
	public Category getCategoryByName(String name) {
		return categoryMapper.getCategoryByName(name);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void deleteCategoryById(Long id) {
		Category category = categoryMapper.getCategoryById(id);
		if (category == null) {
			throw new NotFoundException("分类不存在");
		}
		if (category.getIsDefault() != null && category.getIsDefault()) {
			throw new PersistenceException("默认分类不能删除");
		}
		if (categoryMapper.deleteCategoryById(id) != 1) {
			throw new PersistenceException("删除分类失败");
		}
		redisService.deleteCacheByKey(RedisKeyConstants.CATEGORY_NAME_LIST);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void updateCategory(Category category) {
		// 如果该分类是默认分类，需要重置其他分类的默认状态
		if (category.getIsDefault() != null && category.getIsDefault()) {
			categoryMapper.resetDefaultCategory();
		}
		if (categoryMapper.updateCategory(category) != 1) {
			throw new PersistenceException("分类更新失败");
		}
		redisService.deleteCacheByKey(RedisKeyConstants.CATEGORY_NAME_LIST);
	}

	@Override
	public List<Category> getCategoryListWithBlogCount() {
		return categoryMapper.getCategoryListWithBlogCount();
	}

	@Override
	public Category getDefaultCategory() {
		Category category = categoryMapper.getDefaultCategory();
		if (category == null) {
			// 如果没有默认分类，获取第一个分类作为默认分类
			List<Category> categories = categoryMapper.getCategoryList();
			if (!categories.isEmpty()) {
				category = categories.get(0);
				setDefaultCategory(category.getId());
			}
		}
		return category;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void setDefaultCategory(Long id) {
		Category category = categoryMapper.getCategoryById(id);
		if (category == null) {
			throw new NotFoundException("分类不存在");
		}
		// 重置所有分类的默认状态
		categoryMapper.resetDefaultCategory();
		// 设置新的默认分类
		if (categoryMapper.setDefaultCategory(id) != 1) {
			throw new PersistenceException("设置默认分类失败");
		}
		redisService.deleteCacheByKey(RedisKeyConstants.CATEGORY_NAME_LIST);
	}
}
