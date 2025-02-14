import axios from '@/util/request'

// 获取未读消息数量
export function getUnreadCount() {
    return axios({
        url: '/notification/unread',
        method: 'GET'
    })
}

// 标记消息为已读
export function markRead(type) {
    return axios({
        url: `/notification/read/${type}`,
        method: 'PUT'
    })
} 