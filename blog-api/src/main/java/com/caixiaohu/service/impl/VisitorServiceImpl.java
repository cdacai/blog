package com.caixiaohu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caixiaohu.constant.RedisKeyConstants;
import com.caixiaohu.entity.Visitor;
import com.caixiaohu.exception.PersistenceException;
import com.caixiaohu.mapper.VisitorMapper;
import com.caixiaohu.model.dto.UserAgentDTO;
import com.caixiaohu.model.dto.VisitLogUuidTime;
import com.caixiaohu.service.RedisService;
import com.caixiaohu.service.VisitorService;
import com.caixiaohu.util.IpAddressUtils;
import com.caixiaohu.util.UserAgentUtils;

import java.util.List;

/**
 * @Description: 访客统计业务层实现
 * @Author: Naccl
 * @Date: 2021-01-31
 */
@Service
public class VisitorServiceImpl implements VisitorService {
	@Autowired
	VisitorMapper visitorMapper;
	@Autowired
	RedisService redisService;
	@Autowired
	UserAgentUtils userAgentUtils;

	@Override
	public List<Visitor> getVisitorListByDate(String startDate, String endDate) {
		List<Visitor> visitors = visitorMapper.getVisitorListByDate(startDate, endDate);
		for (Visitor visitor : visitors) {
			if (visitor.getUserAgent() != null) {
				UserAgentDTO userAgentDTO = userAgentUtils.parseOsAndBrowser(visitor.getUserAgent());
				visitor.setOs(userAgentDTO.getOs());
				visitor.setBrowser(userAgentDTO.getBrowser());
				visitor.setDeviceType(userAgentDTO.getDeviceType());
				visitor.setDeviceBrand(userAgentDTO.getDeviceBrand());
				visitor.setDeviceModel(userAgentDTO.getDeviceModel());
			}
		}
		return visitors;
	}

	@Override
	public List<String> getNewVisitorIpSourceByYesterday() {
		return visitorMapper.getNewVisitorIpSourceByYesterday();
	}

	@Override
	public boolean hasUUID(String uuid) {
		return visitorMapper.hasUUID(uuid) != 0;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void saveVisitor(Visitor visitor) {
		String ipSource = IpAddressUtils.getCityInfo(visitor.getIp());
		UserAgentDTO userAgentDTO = userAgentUtils.parseOsAndBrowser(visitor.getUserAgent());
		visitor.setIpSource(ipSource);
		visitor.setOs(userAgentDTO.getOs());
		visitor.setBrowser(userAgentDTO.getBrowser());
		visitor.setDeviceType(userAgentDTO.getDeviceType());
		visitor.setDeviceBrand(userAgentDTO.getDeviceBrand());
		visitor.setDeviceModel(userAgentDTO.getDeviceModel());
		if (visitorMapper.saveVisitor(visitor) != 1) {
			throw new PersistenceException("访客添加失败");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void updatePVAndLastTimeByUUID(VisitLogUuidTime dto) {
		visitorMapper.updatePVAndLastTimeByUUID(dto);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void deleteVisitor(Long id, String uuid) {
		// 删除Redis中该访客的uuid
		redisService.deleteValueBySet(RedisKeyConstants.IDENTIFICATION_SET, uuid);
		if (visitorMapper.deleteVisitorById(id) != 1) {
			throw new PersistenceException("删除访客失败");
		}
	}
}
