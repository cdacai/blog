<template>
  <div class="new-index" :style="rootStyles">
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
                <a href="#" class="social-link">GitHub</a>
                <a href="#" class="social-link">Twitter</a>
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
      site: null
    }
  },
  computed: {
    ...mapGetters('theme', ['theme']),
    rootStyles() {
      if (!this.theme) {
        return {}
      }
      
      const { colors = {}, spacing = {}, typography = {}, borderRadius = {}, transitions = {} } = this.theme
      const { text = {}, nav = {}, card = {}, gradients = {} } = colors

      return {
        // 颜色
        '--theme-primary': colors.primary || '',
        '--theme-bg': colors.background || '',
        '--theme-bg-gradient': (gradients.background && gradients.background.image) || gradients.background || '',
        '--theme-text-primary': text.primary || '',
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
        '--theme-divider': colors.divider || '',

        // 间距
        '--theme-header-height': spacing.headerHeight || '',
        '--theme-header-top': spacing.headerTop || '',
        '--theme-header-padding': spacing.headerPadding || '',
        '--theme-content-width': spacing.contentWidth || '',
        '--theme-content-padding': spacing.contentPadding || '',
        '--theme-main-padding-top': spacing.mainPaddingTop || '',
        '--theme-sidebar-width': spacing.sidebarWidth || '',
        '--theme-sidebar-spacing': spacing.sidebarSpacing || '',
        '--theme-grid-gap': (spacing.gap && spacing.gap.grid) || '',
        '--theme-articles-gap': (spacing.gap && spacing.gap.articles) || '',
        '--theme-nav-gap': (spacing.gap && spacing.gap.nav) || '',
        '--theme-meta-gap': (spacing.gap && spacing.gap.meta) || '',
        '--theme-social-gap': (spacing.gap && spacing.gap.social) || '',

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
        '--theme-sidebar-title-spacing': (typography.sidebar && typography.sidebar.title && typography.sidebar.title.spacing) || '',
        '--theme-sidebar-title-weight': (typography.sidebar && typography.sidebar.title && typography.sidebar.title.weight) || '',
        '--theme-sidebar-text-size': (typography.sidebar && typography.sidebar.text && typography.sidebar.text.size) || '',
        '--theme-sidebar-text-line-height': (typography.sidebar && typography.sidebar.text && typography.sidebar.text.lineHeight) || '',
        '--theme-sidebar-text-spacing': (typography.sidebar && typography.sidebar.text && typography.sidebar.text.spacing) || '',
        '--theme-sidebar-category-size': (typography.sidebar && typography.sidebar.category && typography.sidebar.category.size) || '',
        '--theme-sidebar-category-spacing': (typography.sidebar && typography.sidebar.category && typography.sidebar.category.spacing) || '',
        '--theme-sidebar-count-size': (typography.sidebar && typography.sidebar.count && typography.sidebar.count.size) || '',
        '--theme-sidebar-count-line-height': (typography.sidebar && typography.sidebar.count && typography.sidebar.count.lineHeight) || '',

        // 圆角
        '--theme-card-radius': borderRadius.card || '',
        '--theme-button-radius': borderRadius.button || '',
        '--theme-tag-radius': borderRadius.tag || '',

        // 过渡
        '--theme-hover-transition': transitions.hover || 'all 0.2s ease'
      }
    }
  },
  async created() {
    await Promise.all([
      this.fetchArticles(),
      this.fetchSiteInfo()
    ])
  },
  methods: {
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
    }
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
  gap: var(--theme-nav-gap);
  align-items: center;
}

.nav-item {
  color: rgba(44, 82, 60, 0.9);
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
  padding-top: 100px;
}

.content-wrapper {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-content-padding);
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--theme-sidebar-width);
  gap: var(--theme-grid-gap);
}

.section-title {
  font-size: var(--theme-section-title-size);
  margin-bottom: var(--theme-section-title-margin);
  color: var(--theme-text-primary);
  font-weight: var(--theme-section-title-weight);
  letter-spacing: var(--theme-section-title-spacing);
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: var(--theme-articles-gap);
}

.article-card {
  padding: var(--theme-card-padding);
  background-color: #ffffffd1;
  border-radius: var(--theme-card-radius);
  transition: var(--theme-hover-transition);
}

.article-card:hover {
  transform: translateY(-2px);
  background-color: #ffffffee;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--theme-meta-gap);
  color: var(--theme-text-meta);
  font-size: var(--theme-meta-size);
  margin-bottom: var(--theme-article-meta-margin);
  font-weight: normal;
  letter-spacing: var(--theme-meta-spacing);
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
  font-size: var(--theme-desc-size);
  line-height: var(--theme-desc-line-height);
  margin-bottom: var(--theme-article-desc-margin);
  letter-spacing: var(--theme-desc-spacing);
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
}

.read-more:hover {
  opacity: 1;
}

.sidebar {
  padding: 0;
}

.sidebar-content {
  background-color: #ffffffd1;
  border-radius: var(--theme-card-radius);
  padding: var(--theme-sidebar-padding);
}

.sidebar-content:hover {
  background-color: #ffffffee;
}

.about-section,
.categories-section {
  background-color: transparent;
  padding: 0;
  margin-bottom: 32px;
  border-radius: 0;
}

.about-section {
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.about-section h3,
.categories-section h3 {
  font-size: var(--theme-sidebar-title-size);
  margin-bottom: 16px;
  color: var(--theme-text-primary);
  font-weight: var(--theme-sidebar-title-weight);
  letter-spacing: var(--theme-sidebar-title-spacing);
}

.about-section p {
  color: var(--theme-text-secondary);
  line-height: var(--theme-sidebar-text-line-height);
  font-size: var(--theme-sidebar-text-size);
  letter-spacing: var(--theme-sidebar-text-spacing);
  margin-bottom: 16px;
}

.social-links {
  display: flex;
  gap: 16px;
  margin-top: 0;
  opacity: 0.9;
}

.social-link {
  color: var(--theme-primary);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 0.02em;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.8;
}

.categories-section {
  margin-bottom: 0;
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: var(--theme-text-secondary);
  font-size: var(--theme-sidebar-category-size);
  letter-spacing: var(--theme-sidebar-category-spacing);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.category-item:last-child {
  border-bottom: none;
}

.category-count {
  color: #fff;
  font-size: var(--theme-sidebar-count-size);
  flex-shrink: 0;
  background-color: var(--theme-primary);
  border-radius: var(--theme-tag-radius);
  padding: 1px 8px;
  min-width: 20px;
  text-align: center;
  line-height: var(--theme-sidebar-count-line-height);
  opacity: 0.9;
}

.category-name {
  flex: 1;
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 0 20px;
  }
  
  .header-content {
    padding: 0 20px;
  }
  
  .nav {
    gap: 32px;
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
  font-size: 24px;
  font-weight: bold;
  color: #222;
  background: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  position: relative;
}

.magicui-rainbow-fab:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.magicui-rainbow-fab span {
  position: relative;
  z-index: 1;
}
</style> 