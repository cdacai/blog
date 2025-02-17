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
		return Promise.reject(new Error(msg))
	}
	return res
},
	error => {
		NProgress.done()
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service