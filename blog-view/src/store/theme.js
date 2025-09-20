import { getTheme } from '@/themes'
import { getTheme as getThemeAPI } from '@/api'

// 主题模块
const theme = {
    namespaced: true,
    state: {
        currentTheme: 'theme5', // 不再从localStorage初始化，等待API返回
        themeConfig: null // 存储从API获取的主题配置
    },
    mutations: {
        SET_THEME(state, themeName) {
            state.currentTheme = themeName
        },
        SET_THEME_CONFIG(state, config) {
            state.themeConfig = config
        }
    },
    actions: {
        // 从API获取主题配置
        async fetchTheme({ commit }) {
            try {
                const res = await getThemeAPI()
                let config = res
                if (res && typeof res === 'string') {
                    try { 
                        config = JSON.parse(res) 
                    } catch(e) { 
                        config = {} 
                    }
                }
                
                // 保存主题配置到Store
                commit('SET_THEME_CONFIG', config)
                
                // 返回配置供调用方处理主题名称和localStorage
                return config
            } catch (error) {
                console.error('获取主题配置失败:', error)
                return null
            }
        },
        
        switchTheme({ commit }, themeName) {
            commit('SET_THEME', themeName)
            localStorage.setItem('nblog-preferred-theme', themeName)
            // 不要直接覆盖themeConfig，因为前台首页依赖API数据
            // themeConfig应该只通过API获取和更新
        },
        
        // 新增：用于NewIndex页面临时预览主题的action
        previewTheme({ commit }, themeName) {
            commit('SET_THEME', themeName)
            // 构造临时的themeConfig用于预览
            const selectedTheme = getTheme(themeName)
            if (selectedTheme) {
                const themeConfig = {
                    theme: themeName,
                    colors: selectedTheme.colors,
                    ...selectedTheme
                }
                commit('SET_THEME_CONFIG', themeConfig)
            }
        }
    },
    getters: {
        theme: state => getTheme(state.currentTheme),
        themeConfig: state => state.themeConfig
    }
}

export default theme 