import { getTheme } from '@/themes'

// 主题模块
const theme = {
    namespaced: true,
    state: {
        currentTheme: localStorage.getItem('nblog-preferred-theme') || 'theme1'
    },
    mutations: {
        SET_THEME(state, themeName) {
            state.currentTheme = themeName
        }
    },
    actions: {
        switchTheme({ commit }, themeName) {
            commit('SET_THEME', themeName)
            localStorage.setItem('nblog-preferred-theme', themeName)
        }
    },
    getters: {
        theme: state => getTheme(state.currentTheme)
    }
}

export default theme 