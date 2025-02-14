package com.caixiaohu.service;

/**
 * 百度内容审核服务
 */
public interface BaiduContentService {
    /**
     * 审核文本内容
     * 
     * @param text 待审核的文本
     * @return 是否通过审核
     */
    boolean reviewText(String text);
}