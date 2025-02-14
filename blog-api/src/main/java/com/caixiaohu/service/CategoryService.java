package com.caixiaohu.service;

import java.util.List;

import com.caixiaohu.entity.Category;

public interface CategoryService {
	List<Category> getCategoryList();

	List<Category> getCategoryNameList();

	void saveCategory(Category category);

	Category getCategoryById(Long id);

	Category getCategoryByName(String name);

	void deleteCategoryById(Long id);

	void updateCategory(Category category);

	/**
	 * 获取所有分类List，包含博客数量
	 *
	 * @return
	 */
	List<Category> getCategoryListWithBlogCount();

	/**
	 * 获取默认分类
	 */
	Category getDefaultCategory();

	/**
	 * 设置默认分类
	 */
	void setDefaultCategory(Long id);
}
