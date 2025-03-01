package com.caixiaohu.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.caixiaohu.model.vo.BlogInfo;
import com.caixiaohu.model.vo.PageResult;

public interface RedisService {
	PageResult<BlogInfo> getBlogInfoPageResultByHash(String hash, Integer pageNum);

	void saveKVToHash(String hash, Object key, Object value);

	void saveMapToHash(String hash, Map map);

	Map getMapByHash(String hash);

	Object getValueByHashKey(String hash, Object key);

	void incrementByHashKey(String hash, Object key, int increment);

	void deleteByHashKey(String hash, Object key);

	<T> List<T> getListByValue(String key);

	<T> void saveListToValue(String key, List<T> list);

	<T> Map<String, T> getMapByValue(String key);

	<T> void saveMapToValue(String key, Map<String, T> map);

	<T> T getObjectByValue(String key, Class t);

	void incrementByKey(String key, int increment);

	void saveObjectToValue(String key, Object object);

	void saveValueToSet(String key, String value);

	int countBySet(String key);

	void deleteValueBySet(String key, Object value);

	boolean hasValueInSet(String key, Object value);

	void deleteCacheByKey(String key);

	boolean hasKey(String key);

	void expire(String key, long time);

	boolean isMember(String key, String value);

	Set<String> getSetMembers(String key);

	void incrementByHashKey(String key, String hashKey, int increment);

	Object get(String key);

	void set(String key, Object value, long time);
}
