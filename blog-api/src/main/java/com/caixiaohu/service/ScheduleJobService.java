package com.caixiaohu.service;

import java.util.List;

import com.caixiaohu.entity.ScheduleJob;
import com.caixiaohu.entity.ScheduleJobLog;

public interface ScheduleJobService {
	List<ScheduleJob> getJobList();

	void saveJob(ScheduleJob scheduleJob);

	void updateJob(ScheduleJob scheduleJob);

	void deleteJobById(Long jobId);

	void runJobById(Long jobId);

	void updateJobStatusById(Long jobId, Boolean status);

	List<ScheduleJobLog> getJobLogListByDate(String startDate, String endDate);

	void saveJobLog(ScheduleJobLog log);

	void deleteJobLogByLogId(Long logId);
}
