<template>
  <div class="new-index" :style="rootStyles" ref="fullscreenRoot">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <router-link to="/" class="logo">M</router-link>
        <nav class="nav">
          <router-link to="/notes" class="nav-item">NOTES</router-link>
          <router-link to="/work" class="nav-item">WORK</router-link>
          <router-link to="/about" class="nav-item">ABOUT</router-link>
        </nav>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- 文章列表区域 -->
        <section class="article-section">
          <h2 class="section-title">最新文章</h2>
          <div class="article-list">
            <article v-for="article in articles" :key="article.id" class="article-card">
              <div class="article-meta">
                <span class="article-category">{{ article.category }}</span>
                <span class="article-date">{{ article.date }}</span>
                <span class="article-reading-time">{{ article.readTime }} min</span>
              </div>
              <h3 class="article-title">
                <router-link :to="'/blog/' + article.id">{{ article.title }}</router-link>
              </h3>
              <p class="article-description">{{ article.description }}</p>
              <div class="article-footer">
                <span class="article-comment">评论交流</span>
                <router-link :to="'/blog/' + article.id" class="read-more">阅读全文 →</router-link>
              </div>
            </article>
          </div>
        </section>

        <!-- 侧边栏 -->
        <aside class="sidebar">
          <div class="sidebar-content">
            <div class="about-section">
              <h3>关于我</h3>
              <p>全栈开发者，专注Web技术，分享开发经验与技术思考。</p>
              <div class="social-links">
                <a href="https://github.com/cdacai/blog" class="social-link" target="_blank">GitHub</a>
              </div>
            </div>

            <div class="categories-section">
              <h3>文章分类</h3>
              <ul class="category-list">
                <li v-for="category in categories" :key="category.name" class="category-item">
                  <span class="category-name">{{ category.name }}</span>
                  <span class="category-count">{{ category.count }}</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- 主题切换器和保存按钮悬浮区 -->
    <div class="theme-fab-group">
      <button class="magicui-rainbow-fab" @click="saveTheme" title="保存主题"><span>💾</span></button>
      <!-- 全屏切换按钮，仅在iframe有token时显示 -->
      <button v-if="hasToken" class="magicui-rainbow-fab" @click="toggleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏预览'" style="margin-left:8px;">
        <span v-if="!isFullscreen">⛶</span>
        <span v-else>🗗</span>
      </button>
      <theme-switcher />
    </div>
  </div>
</template>

<script>
import { getBlogList } from '@/api/home'
import { getSite } from '@/api/index'
import { mapGetters } from 'vuex'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import axios from '@/plugins/axios'

// 默认主题配置
const defaultTheme = {
  theme: 'theme1',
  primaryColor: '#2F855A',
  background: '#fff',
  textColor: '#222'
}

export default {
  name: 'NewIndex',
  components: {
    ThemeSwitcher
  },
  data() {
    return {
      articles: [
        {
          id: 1,
          category: 'React',
          date: '2024.03.20',
          readTime: '15',
          title: '深入理解React Hooks原理',
          description: '探索React Hooks的工作原理、使用场景及性能优化策略，讨论Function Components的生命周期管理...'
        },
        {
          id: 2,
          category: 'TypeScript',
          date: '2024.03.15',
          readTime: '12',
          title: 'TypeScript高级类型系统',
          description: '深入TypeScript的类型系统，掌握泛型、条件类型和映射类型等高级特性，包含实际开发中的应用案例...'
        },
        {
          id: 3,
          category: '工程化',
          date: '2024.03.10',
          readTime: '10',
          title: '前端工程化最佳实践',
          description: '探讨现代前端工程化体系，包括构建工具、自动化测试、CI/CD流程、代码规范等多个维度的实践经验...'
        }
      ],
      categories: [
        { name: 'React', count: 12 },
        { name: 'TypeScript', count: 8 },
        { name: '工程化', count: 6 },
        { name: 'Node.js', count: 5 }
      ],
      loading: false,
      pageNum: 1,
      hasMore: false,
      site: null,
      isFullscreen: false, // 全屏状态
      hasToken: false, // 是否有token
      themeConfig: { ...defaultTheme } // 添加themeConfig属性
    }
  },
  computed: {
    ...mapGetters('theme', ['theme']),
    rootStyles() {
      if (!this.theme) {
        return {}
      }
      
      const { colors = {}, spacing = {}, typography = {}, borderRadius = {}, transitions = {} } = this.theme
      const { text = {}, nav = {}, card = {}, sidebar = {}, gradients = {} } = colors
      // 兼容多种主题结构
      const themeTextPrimary = (text && text.primary) || this.theme.textColor || (this.theme.text && this.theme.text.primary) || '#222'

      return {
        // 颜色
        '--theme-primary': colors.primary || this.themeConfig.primaryColor || '#2F855A',
        '--theme-bg': colors.background || '',
        '--theme-bg-gradient': (gradients.background && gradients.background.image) || gradients.background || '',
        '--theme-text-primary': themeTextPrimary,
        '--theme-text-secondary': text.secondary || '',
        '--theme-text-meta': text.meta || '',
        '--theme-nav-inactive': nav.inactive || '',
        '--theme-nav-hover': nav.hover || '',
        '--theme-nav-active': nav.active || '',
        '--theme-nav-bg': nav.background || '',
        '--theme-nav-blur': nav.blur || '',
        '--theme-card-bg': card.background || '',
        '--theme-card-hover': card.hover || '',
        '--theme-card-border': card.border || '',
        '--theme-card-glow': card.glow || '',
        '--theme-sidebar-bg': sidebar.background || '',
        '--theme-sidebar-hover': sidebar.hover || '',
        '--theme-sidebar-border': sidebar.border || '',
        '--theme-divider': colors.divider || '',

        // 间距
        '--theme-header-height': spacing.headerHeight || '',
        '--theme-header-top': spacing.headerTop || '',
        '--theme-header-padding': spacing.headerPadding || '',
        '--theme-content-width': spacing.contentWidth || '2200px',
        '--theme-content-padding': spacing.contentPadding || '48px',
        '--theme-main-padding-top': spacing.mainPaddingTop || '',
        '--theme-sidebar-width': spacing.sidebarWidth || '260px',
        '--theme-sidebar-spacing': spacing.sidebarSpacing || '',
        '--theme-grid-gap': (spacing.gap && spacing.gap.grid) || '120px',
        '--theme-articles-gap': (spacing.gap && spacing.gap.articles) || '',
        '--theme-nav-gap': (spacing.gap && spacing.gap.nav) || '',
        '--theme-meta-gap': (spacing.gap && spacing.gap.meta) || '',
        '--theme-social-gap': (spacing.gap && spacing.gap.social) || '',
        '--theme-content-margin-top': spacing.contentMarginTop || '100px',
        '--theme-sidebar-margin-top': (spacing.margin && spacing.margin.sidebar) || '32px',
        '--theme-article-section-width': (spacing.articleSectionWidth) || '1200px',
        '--theme-sidebar-boxShadow': sidebar.boxShadow || '',

        // 内边距
        '--theme-card-padding': (spacing.padding && spacing.padding.card) || '',
        '--theme-sidebar-padding': (spacing.padding && spacing.padding.sidebar) || '',
        '--theme-content-padding': (spacing.padding && spacing.padding.content) || '',
        '--theme-nav-padding': (spacing.padding && spacing.padding.nav) || '',
        '--theme-meta-padding': (spacing.padding && spacing.padding.meta) || '',

        // 外边距
        '--theme-section-title-margin': (spacing.margin && spacing.margin.sectionTitle) || '',
        '--theme-article-title-margin': (spacing.margin && spacing.margin.articleTitle) || '',
        '--theme-article-meta-margin': (spacing.margin && spacing.margin.articleMeta) || '',
        '--theme-article-desc-margin': (spacing.margin && spacing.margin.articleDesc) || '',
        '--theme-sidebar-section-margin': (spacing.margin && spacing.margin.sidebarSection) || '',
        '--theme-category-item-margin': (spacing.margin && spacing.margin.categoryItem) || '',

        // 字体
        '--theme-logo-size': (typography.logo && typography.logo.size) || '',
        '--theme-logo-weight': (typography.logo && typography.logo.weight) || '',
        '--theme-nav-size': (typography.nav && typography.nav.size) || '',
        '--theme-nav-spacing': (typography.nav && typography.nav.spacing) || '',
        '--theme-title-size': (typography.title && typography.title.size) || '',
        '--theme-title-line-height': (typography.title && typography.title.lineHeight) || '',
        '--theme-title-weight': (typography.title && typography.title.weight) || '',
        '--theme-title-spacing': (typography.title && typography.title.spacing) || '',
        '--theme-section-title-size': (typography.sectionTitle && typography.sectionTitle.size) || '',
        '--theme-section-title-weight': (typography.sectionTitle && typography.sectionTitle.weight) || '',
        '--theme-section-title-spacing': (typography.sectionTitle && typography.sectionTitle.spacing) || '',
        '--theme-meta-size': (typography.meta && typography.meta.size) || '',
        '--theme-meta-spacing': (typography.meta && typography.meta.spacing) || '',
        '--theme-description-size': (typography.description && typography.description.size) || '',
        '--theme-description-line-height': (typography.description && typography.description.lineHeight) || '',
        '--theme-description-spacing': (typography.description && typography.description.spacing) || '',
        '--theme-footer-size': (typography.footer && typography.footer.size) || '',
        '--theme-footer-spacing': (typography.footer && typography.footer.spacing) || '',

        // 侧边栏字体
        '--theme-sidebar-title-size': (typography.sidebar && typography.sidebar.title && typography.sidebar.title.size) || '',
        '--theme-sidebar-title-weight': (typography.sidebar && typography.sidebar.title && typography.sidebar.title.weight) || '',
        '--theme-sidebar-title-spacing': (typography.sidebar && typography.sidebar.title && typography.sidebar.title.spacing) || '',
        '--theme-sidebar-text-size': (typography.sidebar && typography.sidebar.text && typography.sidebar.text.size) || '',
        '--theme-sidebar-text-line-height': (typography.sidebar && typography.sidebar.text && typography.sidebar.text.lineHeight) || '',
        '--theme-sidebar-text-spacing': (typography.sidebar && typography.sidebar.text && typography.sidebar.text.spacing) || '',
        '--theme-sidebar-category-size': (typography.sidebar && typography.sidebar.category && typography.sidebar.category.size) || '',
        '--theme-sidebar-category-spacing': (typography.sidebar && typography.sidebar.category && typography.sidebar.category.spacing) || '',
        '--theme-sidebar-count-size': (typography.sidebar && typography.sidebar.count && typography.sidebar.count.size) || '',
        '--theme-sidebar-count-line-height': (typography.sidebar && typography.sidebar.count && typography.sidebar.count.lineHeight) || '',
        '--theme-sidebar-about-title-size': (typography.sidebar && typography.sidebar.about && typography.sidebar.about.title && typography.sidebar.about.title.size) || (typography.sidebar && typography.sidebar.title && typography.sidebar.title.size) || '',
        '--theme-sidebar-about-title-weight': (typography.sidebar && typography.sidebar.about && typography.sidebar.about.title && typography.sidebar.about.title.weight) || (typography.sidebar && typography.sidebar.title && typography.sidebar.title.weight) || '',
        '--theme-sidebar-about-title-spacing': (typography.sidebar && typography.sidebar.about && typography.sidebar.about.title && typography.sidebar.about.title.spacing) || (typography.sidebar && typography.sidebar.title && typography.sidebar.title.spacing) || '',
        '--theme-sidebar-about-desc-size': (typography.sidebar && typography.sidebar.about && typography.sidebar.about.description && typography.sidebar.about.description.size) || (typography.sidebar && typography.sidebar.text && typography.sidebar.text.size) || '',
        '--theme-sidebar-about-desc-line-height': (typography.sidebar && typography.sidebar.about && typography.sidebar.about.description && typography.sidebar.about.description.lineHeight) || (typography.sidebar && typography.sidebar.text && typography.sidebar.text.lineHeight) || '',
        '--theme-sidebar-categories-title-size': (typography.sidebar && typography.sidebar.categories && typography.sidebar.categories.title && typography.sidebar.categories.title.size) || (typography.sidebar && typography.sidebar.title && typography.sidebar.title.size) || '',
        '--theme-sidebar-categories-title-weight': (typography.sidebar && typography.sidebar.categories && typography.sidebar.categories.title && typography.sidebar.categories.title.weight) || (typography.sidebar && typography.sidebar.title && typography.sidebar.title.weight) || '',
        '--theme-sidebar-categories-title-spacing': (typography.sidebar && typography.sidebar.categories && typography.sidebar.categories.title && typography.sidebar.categories.title.spacing) || (typography.sidebar && typography.sidebar.title && typography.sidebar.title.spacing) || '',
        '--theme-sidebar-categories-item-size': (typography.sidebar && typography.sidebar.categories && typography.sidebar.categories.item && typography.sidebar.categories.item.name && typography.sidebar.categories.item.name.size) || (typography.sidebar && typography.sidebar.category && typography.sidebar.category.size) || '',
        '--theme-sidebar-categories-item-spacing': (typography.sidebar && typography.sidebar.categories && typography.sidebar.categories.item && typography.sidebar.categories.item.name && typography.sidebar.categories.item.name.spacing) || (typography.sidebar && typography.sidebar.category && typography.sidebar.category.spacing) || '',

        // 圆角
        '--theme-card-radius': borderRadius.card || '',
        '--theme-button-radius': borderRadius.button || '',
        '--theme-tag-radius': borderRadius.tag || '',

        // 过渡
        '--theme-hover-transition': transitions.hover || 'all 0.2s ease',

        // 全局元素间距
        '--theme-element-gap': spacing.elementGap || '',
        // 按钮尺寸
        '--theme-button-padding': (spacing.padding && spacing.padding.button) || '',
        '--theme-button-font-size': (typography.button && typography.button.size) || '',
        // 卡片尺寸
        '--theme-card-font-size': (typography.card && typography.card.size) || '',
        // sidebar尺寸
        '--theme-sidebar-radius': borderRadius.sidebar || '',
        // 标题、描述
        '--theme-title-font-size': (typography.title && typography.title.size) || '',
        '--theme-desc-font-size': (typography.description && typography.description.size) || '',
        '--theme-card-padding': (spacing.padding && spacing.padding.card) || '',
        '--theme-card-font-size': (typography.card && typography.card.size) || (typography.description && typography.description.size) || '',
        '--theme-sidebar-padding': (spacing.padding && spacing.padding.sidebar) || '',
        '--theme-title-font-size': (typography.title && typography.title.size) || '',
        '--theme-desc-font-size': (typography.description && typography.description.size) || '',
        '--theme-button-radius': borderRadius.button || '',
        '--theme-button-padding': (spacing.padding && spacing.padding.button) || '',
        '--theme-button-font-size': (typography.button && typography.button.size) || (typography.nav && typography.nav.size) || '',
        '--element-gap': (spacing.gap && spacing.gap.articles) || spacing.elementGap || '',
      }
    }
  },
  async created() {
    await Promise.all([
      this.fetchArticles(),
      this.fetchSiteInfo()
    ])
    // 检测token
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token') || localStorage.getItem('token') || ''
    this.hasToken = !!token
    
    // 应用主题配置
    this.applyTheme()
  },
  methods: {
    // 应用主题配置
    applyTheme() {
      const root = document.documentElement
      const config = this.themeConfig
      
      // 主色
      let mainColor = (config.colors && config.colors.primary) || config.primaryColor || '#2F855A'
      
      // 设置CSS变量
      root.style.setProperty('--primary-color', mainColor)
      root.style.setProperty('--theme-primary', mainColor)
      
      // 将十六进制颜色转换为RGB格式并设置--primary-color-rgb变量
      const rgbValues = this.hexToRgb(mainColor) || '47,133,90'
      root.style.setProperty('--primary-color-rgb', rgbValues)
    },
    
    // 将十六进制颜色转换为RGB格式
    hexToRgb(hex) {
      // 移除#号
      hex = hex.replace(/^#/, '')
      
      // 解析RGB值
      let r, g, b
      if (hex.length === 3) {
        // 简写形式: #RGB
        r = parseInt(hex[0] + hex[0], 16)
        g = parseInt(hex[1] + hex[1], 16)
        b = parseInt(hex[2] + hex[2], 16)
      } else if (hex.length === 6) {
        // 标准形式: #RRGGBB
        r = parseInt(hex.substring(0, 2), 16)
        g = parseInt(hex.substring(2, 4), 16)
        b = parseInt(hex.substring(4, 6), 16)
      }
      
      return r !== undefined && g !== undefined && b !== undefined ? `${r},${g},${b}` : null
    },
    async fetchArticles() {
      if (this.loading || !this.hasMore) return
      
      this.loading = true
      try {
        const res = await getBlogList(this.pageNum)
        if (res.code === 200 && res.data) {
          const { content } = res.data
          if (Array.isArray(content)) {
            // 如果是第一页，直接设置
            if (this.pageNum === 1) {
              this.articles = content
            } else {
              // 否则追加到现有列表
              this.articles = [...this.articles, ...content]
            }
            this.hasMore = content.length === 10 // 假设每页10条
            this.pageNum++
          }
        }
      } catch (error) {
        console.error('获取文章列表失败:', error)
        // 如果是第一页加载失败，使用默认数据
        if (this.pageNum === 1) {
          this.articles = [
            {
              id: 1,
              category: 'React',
              date: '2024.03.20',
              readTime: '15',
              title: '深入理解React Hooks原理',
              description: '探索React Hooks的工作原理、使用场景及性能优化策略，讨论Function Components的生命周期管理...'
            },
            {
              id: 2,
              category: 'TypeScript',
              date: '2024.03.15',
              readTime: '12',
              title: 'TypeScript高级类型系统',
              description: '深入TypeScript的类型系统，掌握泛型、条件类型和映射类型等高级特性，包含实际开发中的应用案例...'
            },
            {
              id: 3,
              category: '工程化',
              date: '2024.03.10',
              readTime: '10',
              title: '前端工程化最佳实践',
              description: '探讨现代前端工程化体系，包括构建工具、自动化测试、CI/CD流程、代码规范等多个维度的实践经验...'
            }
          ]
        }
      } finally {
        this.loading = false
      }
    },
    async fetchSiteInfo() {
      try {
        const res = await getSite()
        if (res.code === 200 && res.data) {
          this.site = res.data
          // 确保categories存在且是数组再进行map操作
          if (res.data.categories && Array.isArray(res.data.categories)) {
            this.categories = res.data.categories.map(category => ({
              name: category.name,
              count: category.blogs
            }))
          } else {
            // 如果没有分类数据，使用默认数据
            this.categories = [
              { name: 'React', count: 12 },
              { name: 'TypeScript', count: 8 },
              { name: '工程化', count: 6 },
              { name: 'Node.js', count: 5 }
            ]
          }
        }
      } catch (error) {
        console.error('获取站点信息失败:', error)
        // 发生错误时使用默认数据
        this.categories = [
          { name: 'React', count: 12 },
          { name: 'TypeScript', count: 8 },
          { name: '工程化', count: 6 },
          { name: 'Node.js', count: 5 }
        ]
      }
    },
    async saveTheme() {
      try {
        const theme = this.$store.getters['theme/theme']
        // 获取token，优先url参数，其次localStorage
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token') || localStorage.getItem('token') || ''
        const res = await axios.post('/admin/theme', theme, {
          headers: { Authorization: token }
        })
        if (res && res.code === 200) {
          window.parent.postMessage({ type: 'theme-save', status: 'success', msg: res.msg || '主题保存成功' }, '*')
        } else {
          window.parent.postMessage({ type: 'theme-save', status: 'error', msg: (res && res.msg) || '保存失败' }, '*')
        }
      } catch (e) {
        window.parent.postMessage({ type: 'theme-save', status: 'error', msg: '保存失败' }, '*')
      }
    },
    toggleFullscreen() {
      const el = this.$refs.fullscreenRoot;
      console.log('全屏切换按钮点击', el);
      if (!el) {
        this.$message && this.$message.error('全屏节点未找到');
        return;
      }
      if (!this.isFullscreen) {
        try {
          if (el.requestFullscreen) {
            el.requestFullscreen();
          } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
          } else {
            this.$message && this.$message.error('当前浏览器不支持全屏API');
          }
          this.isFullscreen = true;
        } catch (e) {
          this.$message && this.$message.error('全屏失败：' + e.message);
        }
      } else {
        try {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else {
            this.$message && this.$message.error('当前浏览器不支持全屏API');
          }
          this.isFullscreen = false;
        } catch (e) {
          this.$message && this.$message.error('退出全屏失败：' + e.message);
        }
      }
    }
  },
  mounted() {
    // 监听全屏变化，自动同步isFullscreen状态
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.isFullscreen = !!document.webkitFullscreenElement;
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.isFullscreen = !!document.mozFullScreenElement;
    });
    document.addEventListener('MSFullscreenChange', () => {
      this.isFullscreen = !!document.msFullscreenElement;
    });
  }
}
</script>

<style scoped>
.new-index {
  min-height: 100vh;
  background: var(--theme-bg-gradient);
  background-color: var(--theme-bg);
  transition: background 0.3s ease;
  padding-top: 64px;
}

.header {
  position: fixed;
  top: var(--theme-header-top);
  left: 0;
  right: 0;
  height: var(--theme-header-height);
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.header-content {
  max-width: var(--theme-content-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: var(--theme-logo-size);
  font-weight: var(--theme-logo-weight);
  color: var(--theme-primary);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: var(--theme-nav-gap, 32px);
  align-items: center;
}

.nav-item {
  color: var(--theme-text-primary);
  text-decoration: none;
  font-size: var(--theme-nav-size);
  letter-spacing: var(--theme-nav-spacing);
  transition: var(--theme-hover-transition);
  font-weight: 500;
}

.nav-item:hover {
  opacity: 1;
  color: rgba(44, 82, 60, 1);
}

.main-content {
  position: relative;
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  min-width: 0;
  padding-top: 0;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  max-width: var(--theme-content-width, 2200px);
  margin: 0 auto;
  padding: 0 var(--theme-content-padding, 48px);
  gap: var(--theme-grid-gap, 120px);
  margin-top: var(--theme-content-margin-top, 160px);
}

.new-index h2.section-title {
  font-size: var(--title-font-size, var(--theme-title-font-size, 1.5rem)) !important;
  margin-bottom: 32px !important;
  color: var(--theme-text-primary) !important;
  font-weight: var(--theme-section-title-weight, 700) !important;
  letter-spacing: var(--theme-section-title-spacing, 0) !important;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: var(--theme-articles-gap);
}

.article-card {
  padding: var(--card-padding, var(--theme-card-padding, 32px));
  background-color: var(--theme-card-bg, #ffffffd1);
  border-radius: var(--card-radius, var(--theme-card-radius, 20px));
  border: 1px solid var(--theme-card-border, transparent);
  transition: var(--theme-hover-transition);
  font-size: var(--card-font-size, var(--theme-card-font-size, 1rem));
}

.article-card:hover {
  transform: translateY(-2px);
  background-color: var(--theme-card-hover, #ffffffee);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--theme-meta-gap, 12px);
  color: var(--theme-text-meta, #666);
  font-size: var(--theme-meta-size, 0.875rem);
  margin-bottom: var(--theme-article-meta-margin, 1rem);
  font-weight: normal;
  letter-spacing: var(--theme-meta-spacing, 0);
}

.article-meta > span {
  position: relative;
  display: flex;
  align-items: center;
}

.article-meta > span:not(:first-child)::before {
  content: "";
  position: absolute;
  left: -10px;
  width: 2px;
  height: 2px;
  background-color: currentColor;
  border-radius: 50%;
}

.article-category {
  color: var(--theme-primary);
}

.article-title {
  font-size: var(--theme-title-size);
  line-height: var(--theme-title-line-height);
  margin: 0;
  margin-bottom: var(--theme-article-title-margin);
  letter-spacing: var(--theme-title-spacing);
  font-weight: var(--theme-title-weight);
}

.article-title a {
  color: var(--theme-text-primary);
  text-decoration: none;
  font-weight: normal;
}

.article-description {
  color: var(--theme-text-secondary);
  font-size: var(--desc-font-size, var(--theme-desc-font-size, 1rem));
  line-height: var(--theme-description-line-height);
  margin-bottom: var(--theme-article-desc-margin);
  letter-spacing: var(--theme-description-spacing);
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--theme-footer-size);
  letter-spacing: var(--theme-footer-spacing);
}

.article-comment {
  color: var(--theme-primary);
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.article-comment:hover {
  opacity: 1;
}

.read-more {
  color: var(--theme-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.9;
  transition: opacity 0.2s;
  font-size: var(--button-font-size, var(--theme-button-font-size, 1rem));
  border-radius: var(--button-radius, var(--theme-button-radius, 8px));
  padding: var(--button-padding, var(--theme-button-padding, 12px 24px));
}

.read-more:hover {
  opacity: 1;
}

.sidebar {
  flex: 0 0 var(--theme-sidebar-width, 260px);
  max-width: var(--theme-sidebar-width, 260px);
  min-width: 220px;
  margin-top: var(--theme-sidebar-margin-top, 68px);
}

.sidebar > div,
.sidebar-content {
  background-color: var(--theme-sidebar-bg, var(--theme-card-bg, #fff));
  border-radius: var(--sidebar-radius, var(--theme-sidebar-radius, 24px));
  padding: var(--sidebar-padding, 32px 32px 28px 32px);
  box-shadow: var(--theme-shadow-card, 0 8px 32px rgba(0,0,0,0.10));
  margin-bottom: 2rem;
  border: 1px solid var(--theme-sidebar-border, var(--theme-card-border, transparent));
  transition: background 0.3s, box-shadow 0.3s;
}

.sidebar-content:hover {
  background-color: var(--theme-sidebar-hover, var(--theme-card-hover, #ffffffee));
  box-shadow: var(--theme-shadow-hover, 0 12px 40px rgba(0,0,0,0.13));
}

.about-section,
.categories-section {
  background-color: var(--theme-sidebar-bg, transparent);
  margin-bottom: 32px;
}

.about-section h3 {
  font-size: var(--theme-sidebar-about-title-size, var(--sidebar-title-size, var(--theme-sidebar-title-size, 1.5rem)));
  margin-bottom: 16px;
  color: var(--theme-text-primary);
  font-weight: var(--theme-sidebar-about-title-weight, var(--sidebar-title-weight, var(--theme-sidebar-title-weight, 700)));
  letter-spacing: var(--theme-sidebar-about-title-spacing, var(--sidebar-title-spacing, var(--theme-sidebar-title-spacing, 0)));
}

.about-section p {
  color: var(--theme-text-secondary);
  line-height: var(--theme-sidebar-about-desc-line-height, var(--sidebar-text-line-height, var(--theme-sidebar-text-line-height, 1.8)));
  font-size: var(--theme-sidebar-about-desc-size, var(--sidebar-text-size, var(--theme-sidebar-text-size, 1rem)));
  letter-spacing: var(--theme-sidebar-text-spacing);
  margin-bottom: 16px;
}

.social-links {
  display: flex;
  gap: 18px;
  margin-top: 0;
  opacity: 0.9;
}

.social-link {
  color: var(--theme-primary);
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.02em;
  font-weight: 500;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.8;
}

.categories-section {
  margin-bottom: 0;
}

.categories-section h3 {
  font-size: var(--theme-sidebar-categories-title-size, 1.13rem);
  font-weight: var(--theme-sidebar-categories-title-weight, 700);
  margin-bottom: 18px;
  color: var(--theme-text-primary);
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  color: var(--theme-text-secondary);
  font-size: var(--theme-sidebar-categories-item-size, 1rem);
  line-height: 1.7;
  letter-spacing: var(--theme-sidebar-categories-item-spacing, 0.01em);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  gap: 12px;
}

.category-item:last-child {
  border-bottom: none;
}

.category-count {
  color: #fff;
  font-size: 1.02rem;
  font-weight: 700;
  flex-shrink: 0;
  background-color: var(--theme-primary);
  border-radius: 999px;
  padding: 2px 14px;
  min-width: 28px;
  text-align: center;
  line-height: 1.7;
  opacity: 0.95;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-name {
  flex: 1;
}

@media screen and (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 0 1rem;
  }
  .main-content,
  .sidebar {
    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
  }
  .sidebar > div {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .main-content {
    flex: 0 0 100%;
    padding: 0 1rem;
    margin-bottom: 2rem;
  }
  .about-section,
  .categories-section {
    margin-bottom: 24px;
  }
}

@media screen and (max-width: 1200px) {
  .content-wrapper {
    max-width: 100%;
    padding: 0 1.5rem;
  }
}

.theme-fab-group {
  position: fixed;
  right: 32px;
  bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1000;
}

.magicui-rainbow-fab {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--theme-button-font-size, 24px);
  font-weight: bold;
  color: #222;
  background: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  position: relative;
  padding: var(--theme-button-padding, 0);
}

.magicui-rainbow-fab:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.magicui-rainbow-fab span {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* 统一全局gap变量 */
.element-gap {
  gap: var(--theme-element-gap, 24px);
}

/* 按钮尺寸变量化 */
.magicui-rainbow-fab {
  /* 只保留圆形，移除变量化border-radius */
  border-radius: 50%;
  padding: var(--theme-button-padding, 0);
  font-size: var(--theme-button-font-size, 24px);
}

/* 卡片尺寸变量化 */
.article-card {
  border-radius: var(--theme-card-radius, 20px);
  padding: var(--theme-card-padding, 32px);
  font-size: var(--theme-card-font-size, 1rem);
}

/* sidebar尺寸变量化 */
.sidebar-content {
  border-radius: var(--theme-sidebar-radius, 20px);
  padding: var(--theme-sidebar-padding, 32px);
}

/* 标题、描述尺寸变量化 */
.section-title, .article-title {
  font-size: var(--theme-title-font-size, 1.5rem);
}
.article-description {
  font-size: var(--theme-desc-font-size, 1rem);
}

.article-section {
  width: var(--theme-article-section-width, 1200px);
  min-width: 0;
}
</style>