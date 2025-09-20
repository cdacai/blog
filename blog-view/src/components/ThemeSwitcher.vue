<template>
  <div class="nblog-theme-switcher">
    <button 
      class="nblog-theme-toggle" 
      @click="toggleDropdown"
      aria-label="切换主题"
      :aria-expanded="isOpen"
    >
      <span class="nblog-toggle-icon" aria-hidden="true">🎨</span>
    </button>
    <transition name="nblog-dropdown">
      <div 
        v-if="isOpen" 
        class="nblog-theme-dropdown"
        role="listbox"
        aria-label="主题列表"
      >
        <button 
          v-for="(theme, name) in themes" 
          :key="name"
          :class="['nblog-theme-option', { 'is-active': currentTheme === name }]"
          @click="handleThemeChange(name)"
          role="option"
          :aria-selected="currentTheme === name"
        >
          <span 
            class="nblog-theme-color" 
            :style="{ backgroundColor: getThemeDisplayColor(theme) }"
            aria-hidden="true"
          ></span>
          {{ theme.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { themes } from '@/themes'

export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      themes,
      isOpen: false,
      touchStartY: 0,
      isTouching: false
    }
  },
  computed: {
    ...mapState('theme', ['currentTheme']),
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  methods: {
    ...mapActions('theme', ['switchTheme']),
    getThemeDisplayColor(theme) {
      // 根据主题名称决定使用哪种颜色
      switch(theme.name) {
        case '极简': // theme3 使用强调色
          return theme.colors.primary
        case '二次元': // theme9 使用灰粉色体现可爱风格
          return theme.colors.text.meta || theme.colors.primary
        case '赛博': // theme8 使用红色强调色体现赛博朋克风格
          return theme.colors.primary
        case '翡翠': // theme7 使用深色背景
        case '雅致': // theme2 使用背景色  
        case '夜幕': // theme10 使用深色背景
          return theme.colors.background || theme.colors.primary
        case '自然': // theme5 使用最底层背景颜色
          return (theme.colors.gradients && theme.colors.gradients.background && theme.colors.gradients.background.color) || theme.colors.background || theme.colors.primary
        case '琥珀': // theme11 使用首页文章列表中的正文字体颜色
          return (theme.colors.text && theme.colors.text.secondary) || theme.colors.primary
        default:
          // 其他主题优先使用背景色，如果没有则使用强调色
          if (theme.colors.background) {
            return theme.colors.background
          }
          // 如果有gradients.background.color，使用该颜色
          if (theme.colors.gradients && theme.colors.gradients.background && theme.colors.gradients.background.color) {
            return theme.colors.gradients.background.color
          }
          // 最后回退到primary颜色
          return theme.colors.primary
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
      // 在移动端打开时添加滚动锁定
      if (this.isMobile && this.isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    handleThemeChange(themeName) {
      // 检查当前是否在NewIndex页面（预览模式）
      if (this.$route && this.$route.path === '/new') {
        // NewIndex页面使用预览模式，不影响前台首页
        this.$store.dispatch('theme/previewTheme', themeName)
      } else {
        // 其他页面正常切换主题
        this.switchTheme(themeName)
      }
      this.isOpen = false
      document.body.style.overflow = ''
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
        document.body.style.overflow = ''
      }
    },
    handleTouchStart(event) {
      if (!this.isOpen) return
      this.isTouching = true
      this.touchStartY = event.touches[0].clientY
    },
    handleTouchMove(event) {
      if (!this.isTouching || !this.isOpen) return
      const deltaY = event.touches[0].clientY - this.touchStartY
      if (deltaY > 50) { // 向下滑动超过50px时关闭
        this.isOpen = false
        this.isTouching = false
        document.body.style.overflow = ''
      }
    },
    handleTouchEnd() {
      this.isTouching = false
    },
    handleResize() {
      // 在窗口大小改变时关闭下拉菜单
      if (this.isOpen) {
        this.isOpen = false
        document.body.style.overflow = ''
      }
    }
  },
  created() {
    // 不再从localStorage初始化主题，等待应用统一从API获取
    // 主题应该由应用启动时统一从API获取并设置到Store
  },
  mounted() {
    // 添加事件监听
    document.addEventListener('click', this.handleClickOutside)
    document.addEventListener('touchstart', this.handleTouchStart)
    document.addEventListener('touchmove', this.handleTouchMove)
    document.addEventListener('touchend', this.handleTouchEnd)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // 移除事件监听
    document.removeEventListener('click', this.handleClickOutside)
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchmove', this.handleTouchMove)
    document.removeEventListener('touchend', this.handleTouchEnd)
    window.removeEventListener('resize', this.handleResize)
    // 确保移除滚动锁定
    document.body.style.overflow = ''
  }
}
</script>

<style>
/* 创建独立的CSS变量作用域，避免污染全局 */
:root {
  --nblog-theme-primary: #e86c8d;
  --nblog-theme-bg: #fff;
  --nblog-theme-text: #333;
  --nblog-theme-border-radius: 12px;
  --nblog-theme-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  --nblog-theme-hover-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
</style>

<style scoped>
.nblog-theme-switcher {
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
}

.nblog-theme-switcher *,
.nblog-theme-switcher *::before,
.nblog-theme-switcher *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.nblog-theme-toggle {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: var(--nblog-theme-bg);
  box-shadow: var(--nblog-theme-shadow);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  padding: 0;
  margin: 0;
  outline: none;
}

.nblog-theme-toggle:hover {
  transform: translateY(-2px);
  box-shadow: var(--nblog-theme-hover-shadow);
}

.nblog-toggle-icon {
  font-size: 24px;
  line-height: 1;
}

.nblog-theme-dropdown {
  position: absolute;
  bottom: 60px;
  right: 0;
  background: var(--nblog-theme-bg);
  border-radius: var(--nblog-theme-border-radius);
  box-shadow: var(--nblog-theme-shadow);
  padding: 8px;
  min-width: 120px;
  margin: 0;
}

.nblog-theme-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--nblog-theme-text);
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  margin: 0;
  outline: none;
}

.nblog-theme-option:hover {
  background: rgba(0, 0, 0, 0.03);
}

.nblog-theme-option.is-active {
  color: var(--nblog-theme-primary);
  background: rgba(0, 0, 0, 0.02);
}

.nblog-theme-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* 下拉动画 */
.nblog-dropdown-enter-active,
.nblog-dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.nblog-dropdown-enter,
.nblog-dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .nblog-theme-switcher {
    right: 16px;
    bottom: calc(16px + env(safe-area-inset-bottom)); /* 适配全面屏底部 */
  }
  
  .nblog-theme-toggle {
    width: 40px;
    height: 40px;
    /* 增大触摸区域 */
    position: relative;
  }
  
  .nblog-theme-toggle::before {
    content: '';
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -8px;
  }
  
  .nblog-toggle-icon {
    font-size: 20px;
  }

  .nblog-theme-dropdown {
    position: fixed; /* 改为固定定位 */
    bottom: calc(64px + env(safe-area-inset-bottom)); /* 适配全面屏 */
    right: 16px;
    left: 16px; /* 在移动端展开为全宽 */
    max-width: 300px; /* 限制最大宽度 */
    margin: 0 auto;
  }

  .nblog-theme-option {
    padding: 12px 16px; /* 增大点击区域 */
    font-size: 16px; /* 增大字号 */
  }

  .nblog-theme-color {
    width: 20px; /* 增大颜色预览区域 */
    height: 20px;
  }
}

/* 横屏模式适配 */
@media (max-width: 768px) and (orientation: landscape) {
  .nblog-theme-switcher {
    right: calc(16px + env(safe-area-inset-right));
    bottom: 16px;
  }

  .nblog-theme-dropdown {
    bottom: auto; /* 取消固定底部定位 */
    top: 50%;
    transform: translateY(-50%);
    right: calc(64px + env(safe-area-inset-right));
    left: auto;
    max-height: 80vh; /* 限制最大高度 */
    overflow-y: auto; /* 允许滚动 */
  }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .nblog-theme-toggle {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
  }

  .nblog-theme-dropdown {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
  }

  .nblog-theme-option {
    color: rgba(255, 255, 255, 0.9);
  }

  .nblog-theme-option:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .nblog-theme-toggle,
  .nblog-theme-option,
  .nblog-dropdown-enter-active,
  .nblog-dropdown-leave-active {
    transition: none;
  }

  .nblog-theme-toggle:hover {
    transform: none;
  }
}
</style> 