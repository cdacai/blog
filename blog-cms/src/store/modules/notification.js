import { getUnreadCount } from '@/api/notification'

const state = {
    unreadCounts: {
        comment: 0,
        like: 0,
        report: 0
    },
    hasNewMessage: false
}

const mutations = {
    SET_UNREAD_COUNTS(state, counts) {
        state.unreadCounts = counts
    },
    SET_HAS_NEW_MESSAGE(state, hasNew) {
        state.hasNewMessage = hasNew
    }
}

const actions = {
    async getUnreadCounts({ commit }, type) {
        try {
            // 如果指定了类型，只获取该类型的未读数量
            if (type) {
                const res = await getUnreadCount(type)
                if (res && res.code === 200) {
                    const counts = {
                        comment: 0,
                        like: 0,
                        report: 0
                    }
                    counts[type] = res.data
                    commit('SET_UNREAD_COUNTS', counts)
                    commit('SET_HAS_NEW_MESSAGE', res.data > 0)
                }
            } else {
                // 如果没有指定类型，获取所有类型的未读数量
                const types = ['comment', 'like', 'report']
                const counts = {}
                let hasNew = false
                
                for (const type of types) {
                    const res = await getUnreadCount(type)
                    if (res && res.code === 200) {
                        counts[type] = res.data
                        if (res.data > 0) {
                            hasNew = true
                        }
                    } else {
                        counts[type] = 0
                    }
                }
                
                commit('SET_UNREAD_COUNTS', counts)
                commit('SET_HAS_NEW_MESSAGE', hasNew)
            }
        } catch (error) {
            console.error('获取未读消息数量失败:', error)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
} 