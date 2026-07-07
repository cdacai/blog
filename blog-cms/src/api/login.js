import axios from '@/util/request'

export function login(loginForm) {
	return axios({
		url: 'login',
		method: 'POST',
		data: {
			...loginForm
		}
	})
}

export function logout() {
	return axios({
		url: 'logout',
		method: 'POST'
	})
}
