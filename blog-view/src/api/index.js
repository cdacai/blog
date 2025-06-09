import axios from '@/plugins/axios'

// export function getHitokoto() {
// 	return axios({
// 		url: 'https://v1.hitokoto.cn/?c=a',
// 		method: 'GET'
// 	})
// }

export function getSite() {
	return axios({
		url: 'site',
		method: 'GET'
	})
}

export function getTheme() {
	return axios({
		url: 'theme',
		method: 'GET'
	})
}