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
				<div class="content-wrapper" :class="{'full-width': $route.name === 'blog'}">
					<!-- 左侧区域 -->
					<div class="main-content" :class="{'blog-detail': $route.name === 'blog', 'moments-content': $route.name === 'moments', 'archives-content': $route.name === 'archives'}">
						<!-- 最新文章标题 -->
						<h2 class="article-header" v-if="$route.name === 'home'">
							最新文章
						</h2>
						<!-- 文章列表 -->
						<router-view style="padding-top:0.5rem" :category-list="categoryList" :tag-list="tagList"/>
					</div>
					<!-- 右侧栏 -->
					<div class="sidebar" v-show="!['blog', 'moments', 'archives'].includes($route.name)">
						<Introduction :category-list="categoryList"/>
						<!-- 暂时注释掉标签云
						<Tags :tag-list="tagList"/>
						-->
						<!-- 暂时注释掉随机文章
						<RandomBlog :random-blog-list="randomBlogList"/>
						-->
					</div>
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
	import {getSite} from '@/api/index'
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
        blogList: []
			}
		},
		computed: {
			...mapState(['focusMode']),
			...mapGetters('theme', ['theme']),
			rootStyles() {
				if (!this.theme) {
					return {}
				}
				const { colors = {}, spacing = {}, typography = {}, borderRadius = {}, transitions = {} } = this.theme
				const { text = {}, nav = {}, card = {}, gradients = {} } = colors
				const themeTextPrimary = (text && text.primary) || this.theme.textColor || (this.theme.text && this.theme.text.primary) || '#222'
				return {
					'--theme-primary': colors.primary || '',
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
					'--theme-content-width': spacing.contentWidth || '1200px',
					'--theme-content-padding': spacing.contentPadding || '2rem',
					'--theme-main-padding-top': spacing.mainPaddingTop || '',
					'--theme-sidebar-width': spacing.sidebarWidth || '31%',
					'--theme-sidebar-spacing': spacing.sidebarSpacing || '',
					'--theme-grid-gap': (spacing.gap && spacing.gap.grid) || '5.5%',
					'--theme-articles-gap': (spacing.gap && spacing.gap.articles) || '',
					'--theme-nav-gap': (spacing.gap && spacing.gap.nav) || '',
					'--theme-meta-gap': (spacing.gap && spacing.gap.meta) || '',
					'--theme-social-gap': (spacing.gap && spacing.gap.social) || '',
					'--theme-card-padding': (spacing.padding && spacing.padding.card) || '',
					'--theme-sidebar-padding': (spacing.padding && spacing.padding.sidebar) || '',
					'--theme-content-padding': (spacing.padding && spacing.padding.content) || '',
					'--theme-nav-padding': (spacing.padding && spacing.padding.nav) || '',
					'--theme-meta-padding': (spacing.padding && spacing.padding.meta) || '',
					'--theme-section-title-margin': (spacing.margin && spacing.margin.sectionTitle) || '',
					'--theme-article-title-margin': (spacing.margin && spacing.margin.articleTitle) || '',
					'--theme-article-meta-margin': (spacing.margin && spacing.margin.articleMeta) || '',
					'--theme-article-desc-margin': (spacing.margin && spacing.margin.articleDesc) || '',
					'--theme-sidebar-section-margin': (spacing.margin && spacing.margin.sidebarSection) || '',
					'--theme-category-item-margin': (spacing.margin && spacing.margin.categoryItem) || '',
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
					'--theme-card-radius': borderRadius.card || '',
					'--theme-button-radius': borderRadius.button || '',
					'--theme-tag-radius': borderRadius.tag || '',
					'--theme-hover-transition': transitions.hover || 'all 0.2s ease',
					'--theme-element-gap': spacing.elementGap || '',
					'--theme-button-padding': (spacing.padding && spacing.padding.button) || '',
					'--theme-button-font-size': (typography.button && typography.button.size) || '',
					'--theme-card-font-size': (typography.card && typography.card.size) || '',
					'--theme-sidebar-radius': borderRadius.sidebar || '',
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
					const res = await axios.get('/blog/api/theme')
					let config = res.data
					if (typeof config === 'string') config = JSON.parse(config)
					this.themeConfig = config

					// 适配嵌套结构，注入 CSS 变量
					const root = document.documentElement
					// 主色
					let mainColor = (config.colors && config.colors.primary) || config.primaryColor || '#2F855A'
					// 装饰色
					let decorationColor = config.decorationColor || mainColor
					root.style.setProperty('--primary-color', mainColor)
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
					root.style.setProperty('--element-gap', (config.spacing && config.spacing.gap && config.spacing.gap.articles) || '24px')

					// 动态设置所有波浪SVG背景色
					this.injectWaveBg()
				} catch (e) {
					// 降级
					const root = document.documentElement
					root.style.setProperty('--primary-color', '#2F855A')
					root.style.setProperty('--background', '#fff')
					root.style.setProperty('--text-color', '#222')
					root.style.setProperty('--decoration-color', '#2F855A')
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
		margin-top: 8rem;
		padding-top: 4rem;
		position: relative;
		z-index: 1;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.content-wrapper {
		display: flex;
		justify-content: center;
		max-width: var(--theme-content-width, 1200px);
		margin: 0 auto;
		padding: 0 var(--theme-content-padding, 2rem);
		gap: var(--theme-grid-gap, 5.5%);
	}

	.content-wrapper.full-width {
		justify-content: center;
		width: 98%;
		margin: 0 auto;
	}

	.main-content {
		position: relative;
		flex: 1;
		padding: 2rem;
		overflow-y: auto;
		min-width: 0;
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
		flex: 0 0 var(--theme-sidebar-width, 31%);
		max-width: var(--theme-sidebar-width, 31%);
		min-width: 220px;
	}

	/* 统一侧边栏所有模块样式 */
	.sidebar > div {
		background: rgba(255, 255, 255, 0.82);
		border-radius: var(--sidebar-radius, 20px);
		padding: var(--sidebar-padding, 32px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		margin-bottom: 2rem;
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
			padding: 0 1rem;
			margin-bottom: 2rem;
		}

		.sidebar {
			flex: 0 0 100%;
			padding: 0 1rem;
		}

		.sidebar > div {
			padding: 2rem;
			margin-bottom: 1.5rem;
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

	@media screen and (max-width: 768px) {
		.main-content.moments-content,
		.main-content.archives-content {
			flex: 0 0 100%;
		}
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
		margin-top: 7rem;
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
</style>
