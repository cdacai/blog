import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
	Message
} from 'element-ui'

// 创建axios实例
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API.replace(/['"]/g, ''),
	timeout: 5000, // 默认请求超时时间
	withCredentials: true, // 允许携带cookie
	headers: {
		'Content-Type': 'application/json'  // 显式设置 Content-Type
	}
})

let CancelToken = axios.CancelToken

// 请求拦截
service.interceptors.request.use(config => {
	//对于访客模式，除GET请求外，都拦截并提示
	const userJson = window.localStorage.getItem('user') || '{}'
	const user = JSON.parse(userJson)
	if (userJson !== '{}' && user.role !== 'ROLE_admin' && config.method !== 'get') {
		config.cancelToken = new CancelToken(function executor(cancel) {
			cancel('演示模式，不允许操作')
		})
		return config
	}

	NProgress.start()
	const token = window.localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = token
	}

	return config
},
	error => {
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

// 响应拦截
service.interceptors.response.use(response => {
	NProgress.done()
	const res = response.data
	if (res.code !== 200) {
		let msg = res.msg || 'Error'
		Message.error(msg)
		
		// 处理登录态失效的情况
		if (res.code === 403 && res.msg.includes('凭证已失效')) {
			// 清除本地存储的登录信息
			window.localStorage.removeItem('token')
			window.localStorage.removeItem('user')
			// 跳转到登录页面
			window.location.href = '/login'
		}
		
		return Promise.reject(new Error(msg))
	}
	return res
},
	error => {
		NProgress.done()
		// 处理响应错误
		if (error.response) {
			// 处理403错误（未授权）
			if (error.response.status === 403) {
				Message.error('登录状态已失效，请重新登录')
				// 清除本地存储的登录信息
				window.localStorage.removeItem('token')
				window.localStorage.removeItem('user')
				// 跳转到登录页面
				window.location.href = '/login'
			} else {
				Message({
					message: error.message,
					type: 'error',
					duration: 5 * 1000
				})
			}
		} else if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
			// 处理请求超时
			Message({
				message: '请求超时，请稍后重试',
				type: 'error',
				duration: 5 * 1000
			})
		} else if (error.message === 'Network Error') {
			// 处理网络错误
			Message({
				message: '网络连接失败，请检查网络设置',
				type: 'error',
				duration: 5 * 1000
			})
		} else {
			Message({
				message: error.message,
				type: 'error',
				duration: 5 * 1000
			})
		}
		return Promise.reject(error)
	}
)

export default service