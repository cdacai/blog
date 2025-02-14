package com.caixiaohu.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.caixiaohu.entity.Category;

import java.util.List;

/**
 * @Description: 博客分类持久层接口
 * @Author: Naccl
 * @Date: 2020-07-29
 */
@Mapper
@Repository
public interface CategoryMapper {
	List<Category> getCategoryList();

	List<Category> getCategoryNameList();

	int saveCategory(Category category);

	Category getCategoryById(Long id);

	Category getCategoryByName(String name);

	int deleteCategoryById(Long id);

	int updateCategory(Category category);

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
	 * 重置所有分类的默认状态
	 */
	int resetDefaultCategory();

	/**
	 * 设置默认分类
	 */
	int setDefaultCategory(Long id);
}
