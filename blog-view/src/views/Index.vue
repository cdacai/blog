<template>
	<div class="site" :style="rootStyles">
		<!-- 添加点状装饰 -->
		<div class="dot-decoration top-right fixed"></div>
		<div class="dot-decoration bottom-left fixed"></div>
		
		<!-- 添加色块装饰 -->
		<div class="color-block top-left fixed"></div>
		<div class="color-block middle-right fixed"></div>
		<div class="color-block bottom-right fixed"></div>
		
		<!-- 添加圆形色块 -->
		<div class="color-block circle-top-right fixed"></div>
		<div class="color-block circle-middle-left fixed"></div>
		<div class="color-block circle-bottom-center fixed"></div>
		
		<!-- 添加椭圆形色块 -->
		<div class="color-block oval-top-center fixed"></div>
		<div class="color-block oval-middle-right fixed"></div>
		<div class="color-block oval-bottom-left fixed"></div>
		
		<Nav :blog-name="siteInfo.blogName" :category-list="categoryList"/>
		<div class="main">
			<div class="container">
				<div class="content-wrapper">
					<!-- 主内容区恢复router-view渲染 -->
					<div class="main-content">
						<h2 class="section-title" v-if="$route.name === 'home'">最新文章</h2>
						<router-view :category-list="categoryList" :tag-list="tagList"/>
					</div>
					<!-- 侧边栏结构和样式与NewIndex.vue一致 -->
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
									<li v-for="category in categoryList" :key="category.name" class="category-item">
										<router-link :to="`/category/${encodeURIComponent(category.name)}`" class="category-link">
											<span class="category-name">{{ category.name }}</span>
											<span class="category-count">{{ category.blogCount }}</span>
										</router-link>
									</li>
								</ul>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
		<Footer :site-info="siteInfo" :badges="badges" :new-blog-list="newBlogList"/>
		<BlogPasswordDialog/>
		<Tocbot v-if="$route.meta.tocbot"/>
	</div>
</template>

<script>
	// import {getHitokoto, getSite} from '@/api/index'
	import {getSite, getTheme} from '@/api/index'
	import {themes} from '@/themes/index'
	import Nav from "@/components/index/Nav";
	import Header from "@/components/index/Header";
	import Footer from "@/components/index/Footer";
	import Tags from "@/components/sidebar/Tags";
	import RandomBlog from "@/components/sidebar/RandomBlog";
	import Tocbot from "@/components/sidebar/Tocbot";
	import BlogPasswordDialog from "@/components/index/BlogPasswordDialog";
	import Introduction from "@/components/sidebar/Introduction";
	import {mapState, mapGetters} from 'vuex'
	import {SAVE_CLIENT_SIZE, SAVE_INTRODUCTION, SAVE_SITE_INFO, RESTORE_COMMENT_FORM} from "@/store/mutations-types";

	import axios from 'axios'

	const defaultTheme = {
	  theme: 'theme1',
	  primaryColor: '#2F855A',
	  background: '#fff',
	  textColor: '#222'
	}

	export default {
		name: "Index",
	components: { Header, BlogPasswordDialog, Tocbot, RandomBlog, Tags, Nav, Footer, Introduction},
		data() {
			return {
				siteInfo: {
					blogName: '',
					webTitleSuffix: '',
					playlistServer: '',
					playlistId: ''
				},
				categoryList: [],
				tagList: [],
				randomBlogList: [],
				badges: [],
				newBlogList: [],
				// hitokoto: {},
        themeConfig: { ...defaultTheme },
        blogList: [],
        themes: themes
			}
		},
		computed: {
			...mapState(['focusMode']),
			...mapGetters('theme', ['theme']),
			rootStyles() {
				if (!this.theme) {
					return {}
				}
				const { colors = {}, spacing = {}, typography = {}, borderRadius = {}, transitions = {} } = this.themeConfig
				const { text = {}, nav = {}, card = {}, gradients = {} } = colors
				const themeTextPrimary = (text && text.primary) || this.theme.textColor || (this.theme.text && this.theme.text.primary) || '#222'
				console.log('this.themeConfig', this.themeConfig);
				console.log('colors', colors);
				console.log('text', text);
				return {
					// 与applyTheme方法保持一致的颜色获取逻辑
					// 优先使用themeConfig.colors.primary，其次是themeConfig.primaryColor，最后是默认值
					'--theme-primary': (this.themeConfig.colors && this.themeConfig.colors.primary) || this.themeConfig.primaryColor || '#2F855A',
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
					'--theme-divider': colors.divider || '',
					'--theme-header-height': spacing.headerHeight || '',
					'--theme-header-top': spacing.headerTop || '',
					'--theme-header-padding': spacing.headerPadding || '',
					'--theme-content-width': spacing.contentWidth || '2200px',
					'--theme-content-padding': spacing.contentPadding || '48px',
					'--theme-main-padding-top': spacing.mainPaddingTop || '',
					'--theme-sidebar-width': spacing.sidebarWidth || '260px',
					'--theme-sidebar-spacing': spacing.sidebarSpacing || '',
					'--theme-grid-gap': (spacing.gap && spacing.gap.grid) || '120px',
					'--theme-articles-gap': (spacing.gap && spacing.gap.articles) || '24px',
					'--theme-nav-gap': (spacing.gap && spacing.gap.nav) || '',
					'--theme-meta-gap': (spacing.gap && spacing.gap.meta) || '',
					'--theme-social-gap': (spacing.gap && spacing.gap.social) || '',
					'--theme-content-margin-top': spacing.contentMarginTop || '100px',
					'--theme-sidebar-margin-top': (spacing.margin && spacing.margin.sidebar) || '32px',
					'--theme-article-section-width': (spacing.articleSectionWidth) || '1200px',
					'--theme-card-radius': borderRadius.card || '20px',
					'--theme-button-radius': borderRadius.button || '8px',
					'--theme-sidebar-radius': borderRadius.sidebar || '20px',
					'--theme-card-padding': (spacing.padding && spacing.padding.card) || '32px',
					'--theme-sidebar-padding': (spacing.padding && spacing.padding.sidebar) || '32px',
					'--theme-card-font-size': (typography.card && typography.card.size) || '1rem',
					'--theme-button-font-size': (typography.button && typography.button.size) || '1rem',
					'--theme-title-size': (typography.title && typography.title.size) || '1.5rem',
					'--theme-title-line-height': (typography.title && typography.title.lineHeight) || '',
					'--theme-title-weight': (typography.title && typography.title.weight) || '700',
					'--theme-title-spacing': (typography.title && typography.title.spacing) || '',
					'--theme-section-title-weight': (typography.sectionTitle && typography.sectionTitle.weight) || '700',
					'--theme-section-title-spacing': (typography.sectionTitle && typography.sectionTitle.spacing) || '',
					'--theme-section-title-margin': (spacing.margin && spacing.margin.sectionTitle) || '16px',
					'--theme-article-title-margin': (spacing.margin && spacing.margin.articleTitle) || '16px',
					'--theme-article-meta-margin': (spacing.margin && spacing.margin.articleMeta) || '',
					'--theme-article-desc-margin': (spacing.margin && spacing.margin.articleDesc) || '16px',
					'--theme-meta-gap': (spacing.gap && spacing.gap.meta) || '',
					'--theme-meta-size': (typography.meta && typography.meta.size) || '',
					'--theme-meta-spacing': (typography.meta && typography.meta.spacing) || '',
					'--theme-description-line-height': (typography.description && typography.description.lineHeight) || '1.8',
					'--theme-description-spacing': (typography.description && typography.description.spacing) || '',
					'--theme-desc-font-size': (typography.description && typography.description.size) || '1rem',
					'--theme-desc-font-weight': (typography.description && typography.description.weight) || '400',
					'--theme-footer-size': (typography.footer && typography.footer.size) || '',
					'--theme-footer-spacing': (typography.footer && typography.footer.spacing) || '',
					'--theme-nav-size': (typography.nav && typography.nav.size) || '1rem',
					'--theme-nav-spacing': (typography.nav && typography.nav.spacing) || '0.01em',
					'--theme-hover-transition': transitions.hover || 'all 0.2s ease',
				}
			}
		},
		watch: {
			//路由改变时，页面滚动至顶部
			'$route.path'() {
				this.scrollToTop()
			},
			blogList() {
				this.$nextTick(() => {
					this.injectWaveBg();
				});
			}
		},
		created() {
			this.getSite()
      this.applyTheme()
			// this.getHitokoto()
			//从localStorage恢复之前的评论信息
			this.$store.commit(RESTORE_COMMENT_FORM)
		},
		mounted() {
			//保存可视窗口大小
			this.$store.commit(SAVE_CLIENT_SIZE, {clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
			window.onresize = () => {
				this.$store.commit(SAVE_CLIENT_SIZE, {clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
			}
			this.injectWaveBg(); // 页面初次渲染也注入一次
		},
		methods: {
			getSite() {
				getSite().then(res => {
					if (res.code === 200) {
						this.siteInfo = res.data.siteInfo
						this.badges = res.data.badges
						this.newBlogList = res.data.newBlogList
						this.categoryList = res.data.categoryList
						this.tagList = res.data.tagList
						this.randomBlogList = res.data.randomBlogList
						this.$store.commit(SAVE_SITE_INFO, this.siteInfo)
						this.$store.commit(SAVE_INTRODUCTION, res.data.introduction)
						document.title = this.$route.meta.title + this.siteInfo.webTitleSuffix
					}
				})
			},
			async applyTheme() {
			try {
				const res = await getTheme()
				let config = res
				if (res && typeof res === 'string') {
					try { config = JSON.parse(res) } catch(e) { config = {} }
				}
				this.themeConfig = config

				// 适配嵌套结构，注入 CSS 变量
				const root = document.documentElement
				// 主色
				let mainColor = (config.colors && config.colors.primary) || config.primaryColor || '#2F855A'
				// 装饰色
				let decorationColor = config.decorationColor || mainColor
				root.style.setProperty('--primary-color', mainColor)
				// 同时设置--theme-primary变量以确保所有元素颜色一致
				root.style.setProperty('--theme-primary', mainColor)
				// 将十六进制颜色转换为RGB格式并设置--primary-color-rgb变量
				const rgbValues = this.hexToRgb(mainColor) || '47,133,90'
				root.style.setProperty('--primary-color-rgb', rgbValues)
				
				// 关键修复：更新Vuex store中的主题，确保rootStyles计算属性使用最新主题配置
				// 如果API返回的主题配置中包含theme字段，使用它更新store
				if (config.theme && Object.keys(this.themes || {}).includes(config.theme)) {
					this.$store.dispatch('theme/switchTheme', config.theme)
				}
				root.style.setProperty('--background', (config.colors && config.colors.background) || config.background || '#fff')
				root.style.setProperty('--text-color', (config.colors && config.colors.text && config.colors.text.primary) || config.textColor || (config.text && config.text.primary) || '#222')
				root.style.setProperty('--decoration-color', decorationColor)
				root.style.setProperty('--theme-text-primary', (config.colors && config.colors.text && config.colors.text.primary) || config.textColor || (config.text && config.text.primary) || '#222')
				
				// 注入主题尺寸参数，适配多层嵌套结构
				root.style.setProperty('--card-radius', (config.borderRadius && config.borderRadius.card) || '20px')
				root.style.setProperty('--button-radius', (config.borderRadius && config.borderRadius.button) || '8px')
				root.style.setProperty('--sidebar-radius', (config.borderRadius && config.borderRadius.sidebar) || '20px')
				root.style.setProperty('--card-padding', (config.spacing && config.spacing.padding && config.spacing.padding.card) || '32px')
				root.style.setProperty('--sidebar-padding', (config.spacing && config.spacing.padding && config.spacing.padding.sidebar) || '32px')
				root.style.setProperty('--card-font-size',
					(config.typography && config.typography.description && config.typography.description.size)
					|| (config.typography && config.typography.article && config.typography.article.description && config.typography.article.description.size)
					|| '1rem'
				)
				root.style.setProperty('--button-font-size',
					(config.typography && config.typography.nav && config.typography.nav.size)
					|| (config.typography && config.typography.base && config.typography.base.size)
					|| '1rem'
				)
				root.style.setProperty('--title-font-size', (config.typography && config.typography.title && config.typography.title.size) || '1.5rem')
				root.style.setProperty('--desc-font-size', (config.typography && config.typography.description && config.typography.description.size) || '1rem')
				root.style.setProperty('--element-gap', (config.spacing && config.spacing.gap && config.spacing.gap.articles) || '15px')

					// 动态设置所有波浪SVG背景色
					this.injectWaveBg()
			} catch (e) {
				// 降级
				const root = document.documentElement
				root.style.setProperty('--primary-color', '#2F855A')
				// 降级时也设置--theme-primary变量
				root.style.setProperty('--theme-primary', '#2F855A')
				// 降级时也设置--primary-color-rgb变量
				root.style.setProperty('--primary-color-rgb', '47,133,90')
				root.style.setProperty('--background', '#fff')
				root.style.setProperty('--text-color', '#222')
				root.style.setProperty('--decoration-color', '#fff')
				root.style.setProperty('--theme-text-primary', '#222')
				// 降级波浪
				const waveBgs = document.querySelectorAll('.wave-bg')
				if (waveBgs && waveBgs.length) {
					const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
						<path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.15' fill='#2F855A'/>
						<path d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.1' fill='#2F855A'/>
						<path d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' opacity='.1' fill='#2F855A'/>
					</svg>`
					const bg = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
					waveBgs.forEach(waveBg => {
						waveBg.style.backgroundImage = bg
					})
				}
			}
			},
			injectWaveBg() {
				// 主题切换时动态设置所有波浪SVG背景色
				const config = this.themeConfig || {};
				let decorationColor = config.decorationColor || (config.colors && config.colors.primary) || config.primaryColor || '#2F855A';
				const encode = encodeURIComponent;
				const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
					<path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.15' fill='${decorationColor}'/>
					<path d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.1' fill='${decorationColor}'/>
					<path d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' opacity='.1' fill='${decorationColor}'/>
				</svg>`;
				const bg = `url("data:image/svg+xml,${encode(svg)}")`;
				const waveBgs = document.querySelectorAll('.wave-bg');
				waveBgs.forEach(waveBg => {
					waveBg.style.backgroundImage = bg;
				});
			},
			hexToRgb(hex) {
				// 移除#号（如果有）
				hex = hex.replace(/^#/, '');
				// 解析RGB值
				let r = 0, g = 0, b = 0;
				if (hex.length === 3) {
					// 简写形式 #RGB
					r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
					g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
					b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
				} else if (hex.length === 6) {
					// 标准形式 #RRGGBB
					r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
					g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
					b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
				}
				// 返回RGB格式的字符串
				return `${r},${g},${b}`;
			},
			//获取一言
			// getHitokoto() {
			// 	getHitokoto().then(res => {
			// 		this.hitokoto = res
			// 	})
			// }
		}
	}
</script>

<style scoped>
	.site {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
    background: var(--background);
    color: var(--text-color);
    transition: background 0.3s, color 0.3s;
	}

	.main {
		flex: 1;
		margin-top: 4.5rem;
		padding-top: 0;
		position: relative;
		z-index: 1;
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

	.content-wrapper.full-width {
		justify-content: center;
		width: 98%;
		margin: 0 auto;
	}

	.main-content {
		position: relative;
		flex: 1;
		overflow-y: auto;
		min-width: 0;
		width: var(--theme-article-section-width, 1200px);
	}

	.blog-detail {
		position: relative;
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.main-content.blog-detail {
		flex: 0 0 100%;
		background-color: var(--background);
		border-radius: var(--card-radius, 20px);
		padding: var(--card-padding, 32px);
		font-size: var(--card-font-size, 1rem);
	}

	.main-content.blog-detail :deep(.category-tag) {
		display: inline-flex;
		align-items: center;
		padding: 4px 8px;
		background-color: rgba(var(--primary-color-rgb,47,133,90), 0.1);
		color: var(--primary-color);
		border-radius: 4px;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.main-content.blog-detail :deep(.category-tag:hover) {
		background-color: rgba(var(--primary-color-rgb,47,133,90), 0.2);
	}

	.main-content.blog-detail :deep(.top-tag) {
		display: inline-flex;
		align-items: center;
		padding: 4px 8px;
		background-color: rgba(229, 62, 62, 0.1);
		color: var(--primary-color);
		border-radius: 4px;
		font-size: 0.875rem;
		margin-right: 8px;
	}

	.main-content.blog-detail :deep(.blog-info-container) {
		margin: 1rem 0;
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.sidebar {
		flex: 0 0 var(--theme-sidebar-width, 260px);
		max-width: var(--theme-sidebar-width, 260px);
		min-width: 220px;
		margin-top: var(--theme-sidebar-margin-top, 32px);
	}

	.sidebar-content {
		background-color: var(--theme-card-bg, #fff);
		border-radius: var(--sidebar-radius, var(--theme-sidebar-radius, 24px));
		padding: var(--sidebar-padding, 32px 32px 28px 32px);
		box-shadow: var(--theme-shadow-card, 0 8px 32px rgba(0,0,0,0.10));
		margin-bottom: 2rem;
		transition: background 0.3s, box-shadow 0.3s;
	}

	.sidebar-content:hover {
		background-color: var(--theme-card-bg, #ffffffee);
		box-shadow: var(--theme-shadow-hover, 0 12px 40px rgba(0,0,0,0.13));
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
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.about-section h3 {
		font-size: var(--theme-sidebar-about-title-size, var(--sidebar-title-size, var(--theme-sidebar-title-size, 1.5rem)));
		margin-bottom: 16px;
		color: var(--theme-text-primary);
		font-weight: var(--theme-sidebar-about-title-weight, var(--sidebar-title-weight, var(--theme-sidebar-title-weight, 600)));
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
		font-size: var(--theme-sidebar-categories-item-size, var(--sidebar-category-size, var(--theme-sidebar-category-size, 1rem)));
		letter-spacing: var(--theme-sidebar-categories-item-spacing, var(--sidebar-category-spacing, var(--theme-sidebar-category-spacing, 0)));
		border-bottom: 1px solid rgba(0, 0, 0, 0.04);
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
		border-radius: 12px;
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


	.header, .theme5-header {
		color: var(--primary-color);
		font-size: var(--title-font-size, 1.5rem);
		font-weight: 500;
		margin-bottom: 1rem;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid rgba(var(--primary-color-rgb,47,133,90), 0.1);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.theme5-content {
		padding-top: 1rem;
	}

	.category-labels {
		display: flex;
		flex-wrap: wrap;
		gap: var(--element-gap, 24px);
	}

	.theme5-category-item {
		background: rgba(var(--primary-color-rgb,47,133,90), 0.1);
		color: var(--primary-color);
		border-radius: var(--card-radius, 20px);
		padding: 0.5rem 1rem;
		font-size: var(--card-font-size, 1rem);
		transition: all 0.3s ease;
	}

	.theme5-category-item:hover {
		background: rgba(var(--primary-color-rgb,47,133,90), 0.2);
		transform: translateY(-2px);
	}

	@media screen and (max-width: 768px) {
		.main {
			margin-top: 4rem;
			padding-top: 2rem;
		}

		.container {
			padding: 0 1.5rem;
			width: 100%;
		}

		.content-wrapper {
			flex-direction: column;
			gap: 0;
			width: 100%;
			padding: 0 0.5rem;
		}

		.main-content,
		.sidebar {
			flex: 0 0 100%;
			max-width: 100%;
			width: 100%;
		}

		.main-content.moments-content,
		.main-content.archives-content {
			flex: 0 0 100%;
			width: 100%;
			min-width: 100%;
		}

		.main-content > div,
		.main-content.moments-content > div,
		.main-content.archives-content > div {
			width: 100%;
		}

		.sidebar > div {
			padding: 2rem;
			margin-bottom: 1.5rem;
		}

		.main-content {
			flex: 0 0 100%;
			padding: 0 0.5rem;
			margin-bottom: 0;
		}

		.sidebar {
			flex: 0 0 100%;
			padding: 0 0.5rem;
		}

		.sidebar > div,
		.sidebar-content {
			padding: 2rem;
			margin-bottom: 1.5rem;
		}

		/* 移动端关于和分类部分间距 */
		.about-section,
		.categories-section {
			margin-bottom: 24px;
		}

		/* 移动端统一侧边栏标题字体大小 */
		.header, .theme5-header {
			font-size: 1.1rem !important;
		}

		.main-content.blog-detail :deep(.blog-info-container) {
			gap: 0.5rem;
		}

		.main-content.blog-detail :deep(.category-tag),
		.main-content.blog-detail :deep(.top-tag) {
			font-size: 0.8rem;
			padding: 2px 6px;
		}

		.content-wrapper.full-width {
			width: 100%;
			padding: 0 1rem;
		}

		.main-content.blog-detail {
			padding: 1rem;
		}

		.pagination {
			margin-top: 3rem;
		}
	}

	@media screen and (max-width: 1200px) {
		.content-wrapper {
			max-width: 100%;
			padding: 0 1.5rem;
		}
	}

	.article-header {
		color: var(--theme-text-primary);
		font-size: var(--title-font-size, 1.5rem);
		font-weight: 600;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		position: relative;
	}

	.main-content.moments-content {
		flex: 0 0 64%;
		margin: 0 auto;
		width: 100%;
	}

	.main-content.archives-content {
		flex: 0 0 64%;
		margin: 0 auto;
		width: 100%;
	}


	/* 平板适配 */
	@media screen and (min-width: 769px) and (max-width: 1024px) {
		.main-content {
			flex: 0 0 100%;
			padding: 0 2rem;
			margin-bottom: 2rem;
		}

		.sidebar {
			flex: 0 0 100%;
			padding: 0 2rem;
		}

		.sidebar > div {
			padding: 2rem;
		}
	}

	.pagination {
		text-align: center;
		margin-top: 2rem;
	}

	/* 统一主要区域尺寸变量化 */
	.sidebar > div {
		border-radius: var(--sidebar-radius, 20px);
		padding: var(--sidebar-padding, 32px);
	}

	.main-content.blog-detail {
		border-radius: var(--card-radius, 20px);
		padding: var(--card-padding, 32px);
		font-size: var(--card-font-size, 1rem);
	}

	.theme5-header, .header {
		font-size: var(--title-font-size, 1.5rem);
	}

	.article-header {
		font-size: var(--title-font-size, 1.5rem);
	}

	.theme5-category-item {
		border-radius: var(--card-radius, 20px);
		padding: 0.5rem 1rem;
		font-size: var(--card-font-size, 1rem);
	}

	.category-labels {
		gap: var(--element-gap, 24px);
	}

	/* 按钮变量化，确保主题切换时同步尺寸 */
	.button, .read-btn, .main-btn, .el-button {
		border-radius: var(--button-radius, 8px);
		padding: var(--button-padding, 12px 24px);
		font-size: var(--button-font-size, 1rem);
		transition: all 0.2s;
	}

	/* === 卡片和侧边栏样式严格同步NewIndex.vue === */

	/* 文章卡片样式 */
	.article-card {
	  border-radius: var(--card-radius, var(--theme-card-radius, 20px));
	  box-shadow: var(--theme-shadow-card, 0 8px 32px rgba(0,0,0,0.10));
	  background-color: rgba(255, 255, 255, 0.82);
	  transition: var(--theme-hover-transition, all 0.3s);
	  font-size: var(--card-font-size, var(--theme-card-font-size, 1rem));
	  padding: var(--card-padding, var(--theme-card-padding, 32px));
	}
	.article-card:hover {
	  transform: translateY(-2px);
	  background-color: rgba(255, 255, 255, 0.9);
	  box-shadow: var(--theme-shadow-hover, 0 12px 40px rgba(0,0,0,0.13));
	}

	/* 文章卡片标题、描述、meta */
	.article-title {
	  font-size: var(--theme-title-size, 1.5rem);
	  line-height: var(--theme-title-line-height);
	  margin: 0;
	  margin-bottom: var(--theme-article-title-margin);
	  letter-spacing: var(--theme-title-spacing);
	  font-weight: var(--theme-title-weight, 700);
	}
	.article-title a {
	  color: var(--theme-text-primary);
	  text-decoration: none;
	  font-size: var(--title-font-size, 1.5rem);
	  letter-spacing: var(--theme-title-spacing, 0);
	  line-height: var(--theme-title-line-height, 1.2);
	  font-weight: var(--theme-title-weight, 700);
	}
	.article-description {
	  color: var(--theme-text-secondary);
	  font-size: var(--desc-font-size, var(--theme-desc-font-size, 1rem));
	  line-height: var(--theme-description-line-height, 1.8);
	  margin-bottom: var(--theme-article-desc-margin, 16px);
	  letter-spacing: var(--theme-description-spacing, 0);
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
	.article-footer {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  font-size: var(--theme-footer-size, 1rem);
	  letter-spacing: var(--theme-footer-spacing, 0);
	  gap: var(--element-gap, 24px);
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

	/* 侧边栏卡片样式 */
	.sidebar-content {
	  background-color: rgba(255, 255, 255, 0.82);
	  border-radius: var(--theme-sidebar-radius, 20px);
	  padding: var(--theme-sidebar-padding, 32px);
	  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
	  margin-bottom: 2rem;
	  transition: background 0.3s, box-shadow 0.3s;
	}
	.sidebar-content:hover {
	  background-color: rgba(255, 255, 255, 0.9);
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
	  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}
	.about-section p {
	  color: var(--theme-text-secondary);
	  line-height: 1.8;
	  font-size: 1rem;
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
	  font-size: 1.13rem;
	  font-weight: 700;
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
	  font-size: 1rem;
	  line-height: 1.7;
	  letter-spacing: 0.01em;
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
	  border-radius: 12px;
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

	/* Nav组件变量化 */
	.nav {
	  display: flex;
	  gap: var(--theme-nav-gap, 32px);
	  align-items: center;
	}
	.nav-item {
	  color: var(--theme-text-primary);
	  text-decoration: none;
	  font-size: var(--theme-nav-size, 1rem);
	  letter-spacing: var(--theme-nav-spacing, 0.01em);
	  transition: var(--theme-hover-transition);
	  font-weight: 500;
	}
	.nav-item:hover {
	  opacity: 1;
	  color: rgba(44, 82, 60, 1);
	}


	.category-link {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  width: 100%;
	  color: var(--theme-text-secondary);
	  text-decoration: none;
	  cursor: pointer;
	  transition: background 0.2s;
	}
	.category-link:hover {
	  color: var(--theme-primary);
	}
	.category-link:hover .category-name {
	  color: var(--theme-primary);
	}
	.category-link:hover .category-count {
	  background-color: var(--theme-primary);
	  opacity: 1;
	}
</style>

