import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 移除引号，直接使用环境变量
const baseURL = process.env.VUE_APP_BASE_API + '/blog'
console.log('Current baseURL:', baseURL)

const request = axios.create({
	baseURL,
	timeout: 10000,
})

// 请求拦截
request.interceptors.request.use(
	config => {
		NProgress.start()
		console.log('Request URL:', config.baseURL + config.url)
		const identification = window.localStorage.getItem('identification')
		//identification存在，且是基于baseURL的请求
		if (identification && !(config.url.startsWith('http://') || config.url.startsWith('https://'))) {
			config.headers.identification = identification
		}
		return config
	}
)

// 响应拦截
request.interceptors.response.use(
	config => {
		NProgress.done()
		const identification = config.headers.identification
		if (identification) {
			//保存身份标识到localStorage
			window.localStorage.setItem('identification', identification)
		}
		return config.data
	},
	error => {
		NProgress.done()
		console.error('Request error:', error)
		if (error.response) {
			return Promise.resolve(error.response.data)
		}
		return Promise.reject(error)
	}
)

export default request