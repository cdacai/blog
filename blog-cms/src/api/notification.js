import axios from '@/util/request'

// 获取未读消息数量
export function getUnreadCount(type) {
    return axios({
        url: '/notification/unread/count',
        method: 'GET',
        params: {
            type
        }
    })
}

// 获取通知列表
export function getNotificationList(type, pageNum, pageSize) {
    return axios({
        url: '/notification/list',
        method: 'GET',
        params: {
            type,
            pageNum,
            pageSize
        }
    })
}

// 标记消息为已读
export function markRead(type) {
    return axios({
        url: `/notification/read/${type}`,
        method: 'PUT'
    })
}

// 标记单个消息为已读
export function markReadById(id) {
    return axios({
        url: `/notification/read/id/${id}`,
        method: 'PUT'
    })
}

// 标记所有消息为已读
export function markAllAsRead() {
    return axios({
        url: '/notification/read/all',
        method: 'PUT'
    })
} 