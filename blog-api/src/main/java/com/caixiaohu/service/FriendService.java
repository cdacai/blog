package com.caixiaohu.service;

import java.util.List;

import com.caixiaohu.entity.Friend;
import com.caixiaohu.model.vo.FriendInfo;

public interface FriendService {
	List<Friend> getFriendList();

	List<com.caixiaohu.model.vo.Friend> getFriendVOList();

	void updateFriendPublishedById(Long friendId, Boolean published);

	void saveFriend(Friend friend);

	void updateFriend(com.caixiaohu.model.dto.Friend friend);

	void deleteFriend(Long id);

	void updateViewsByNickname(String nickname);

	FriendInfo getFriendInfo(boolean cache, boolean md);

	void updateFriendInfoContent(String content);

	void updateFriendInfoCommentEnabled(Boolean commentEnabled);
}
