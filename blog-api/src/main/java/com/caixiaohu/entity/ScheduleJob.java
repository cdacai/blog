package com.caixiaohu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * @Description: 定时任务
 * @Author: Naccl
 * @Date: 2020-11-01
 */
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ScheduleJob implements Serializable {
	private static final long serialVersionUID = 1L;
	
	public static final String JOB_PARAM_KEY = "JOB_PARAM_KEY"; //任务调度参数key

	private Long jobId;//任务id
	private String beanName;//spring bean名称
	private String methodName;//方法名
	private String params;//参数
	private String cron;//cron表达式
	private Boolean status;//任务状态
	private String remark;//备注
	private Date createTime;//创建时间
}
