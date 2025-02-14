import request from '@/util/request'
import { compressImage } from '@/utils/imageUtils'

// 获取存储空间下指定目录的文件列表
export function getBucketContents(bucket, path) {
	path = path.startsWith('/') ? path : `/${path}`
	return request({
		url: `https://v0.api.upyun.com/${bucket}${path}`,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Authorization': `Basic ${localStorage.getItem('upyunToken')}`
		}
	})
}

// 删除文件
export function delFile(bucket, path) {
	return request({
		url: `https://v0.api.upyun.com/${bucket}${path}`,
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Authorization': `Basic ${localStorage.getItem('upyunToken')}`
		}
	})
}

// 上传文件至仓库指定目录下（供图床管理使用）
export function upload(bucket, path, fileName, data) {
	path = path.startsWith('/') ? path : `/${path}`
	path = path.endsWith('/') ? path : `${path}/`
	return request({
		url: `https://v0.api.upyun.com/${bucket}${path}${fileName}`,
		method: 'PUT',
		data,
		headers: {
			'Accept': 'application/json',
			'Authorization': `Basic ${localStorage.getItem('upyunToken')}`
		},
		timeout: 60000  // 上传图片时使用60秒超时
	})
}

// 获取又拍云配置
export function getUpyunConfig() {
	return request({
		url: '/upyun/config',
		method: 'get'
	})
}

// 上传图片
export async function uploadImage(data, config = {}) {
	// 从 FormData 中获取文件
	const file = data.get('file')

	// 压缩图片
	const compressedFile = config.isOriginal ? file : await compressImage(file, {
		keepFormat: true  // 保持原始格式
	})

	// 创建新的 FormData
	const formData = new FormData()
	formData.append('file', compressedFile)
	formData.append('fileName', data.get('fileName'))

	return request({
		url: '/upyun/upload',
		method: 'post',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		timeout: 120000,  // 上传图片时使用2分钟超时
		...config  // 将config放在最后，允许外部覆盖默认配置
	})
}