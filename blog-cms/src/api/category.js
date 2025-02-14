import axios from '@/util/request'

export function getData(queryInfo) {
	return axios({
		url: 'categories',
		method: 'GET',
		params: {
			pageNum: queryInfo.pageNum,
			pageSize: queryInfo.pageSize
		}
	})
}

export function addCategory(form) {
	return axios({
		url: 'category',
		method: 'POST',
		data: {
			name: form.name,
			isDefault: form.isDefault
		}
	})
}

export function editCategory(form) {
	return axios({
		url: 'category',
		method: 'PUT',
		data: {
			id: form.id,
			name: form.name,
			isDefault: form.isDefault
		}
	})
}

export function deleteCategoryById(id) {
	return axios({
		url: 'category',
		method: 'DELETE',
		params: {
			id
		}
	})
}

export function setDefaultCategory(id) {
	return axios({
		url: `category/${id}/default`,
		method: 'PUT'
	})
}