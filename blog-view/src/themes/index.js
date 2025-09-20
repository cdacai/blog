// 主题系统入口文件 - 集中导出所有主题
import { theme2 } from './theme2.js'
import { theme3 } from './theme3.js'
import { theme5 } from './theme5.js'
import { theme7 } from './theme7.js'
import { theme8 } from './theme8.js'
import { theme9 } from './theme9.js'
import { zIndex } from './config.js'

// 导出所有主题
export const themes = {
    theme2,
    theme3,
    theme5,
    theme7,
    theme8,
    theme9
}

// 获取主题
export const getTheme = (themeName) => {
    // 默认使用theme5(绿色主题)
    return themes[themeName] || themes.theme5
}

// 导出 zIndex 配置
export { zIndex }

// 向后兼容 - 单独导出各个主题
export { theme2 } from './theme2.js'
export { theme3 } from './theme3.js'
export { theme5 } from './theme5.js'
export { theme7 } from './theme7.js'
export { theme8 } from './theme8.js'
export { theme9 } from './theme9.js'