<template>
	<div class="site theme5">
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
	import {mapState} from 'vuex'
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
        themeConfig: { ...defaultTheme }
			}
		},
		computed: {
			...mapState(['focusMode'])
		},
		watch: {
			//路由改变时，页面滚动至顶部
			'$route.path'() {
				this.scrollToTop()
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
					const res = await axios.get('/api/theme')
					let config = res.data
					if (typeof config === 'string') config = JSON.parse(config)
					this.themeConfig = { ...defaultTheme, ...config }
				} catch (e) {
					this.themeConfig = { ...defaultTheme }
				}
				// 注入CSS变量
				this.setThemeVars()
			},
			setThemeVars() {
				const root = document.documentElement
				root.style.setProperty('--primary-color', this.themeConfig.primaryColor)
				root.style.setProperty('--background', this.themeConfig.background)
				root.style.setProperty('--text-color', this.themeConfig.textColor)
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

	.theme5 {
		background-color: #8bc594;
		background-image: linear-gradient(180deg, #8bc594 0%, #a3d4ab 100%),
			url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.pattern{fill:%239ed3a7;fill-opacity:0.8}%3C/style%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath class='pattern' d='M0 0h40v2H0zM0 10h40v2H0zM0 20h40v2H0zM0 30h40v2H0zM0 0h2v40H0zM10 0h2v40h-2zM20 0h2v40h-2zM30 0h2v40h-2z'/%3E%3C/svg%3E");
		background-repeat: repeat;
		background-position: center;
		background-size: 40px;
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
		gap: 5.5%;
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
	}

	.blog-detail {
		position: relative;
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.main-content.blog-detail {
		flex: 0 0 100%;
		background-color: white;
		border-radius: 20px;
		padding: 2rem;
	}

	.main-content.blog-detail :deep(.category-tag) {
		display: inline-flex;
		align-items: center;
		padding: 4px 8px;
		background-color: rgba(47, 133, 90, 0.1);
		color: #2F855A;
		border-radius: 4px;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.main-content.blog-detail :deep(.category-tag:hover) {
		background-color: rgba(47, 133, 90, 0.2);
	}

	.main-content.blog-detail :deep(.top-tag) {
		display: inline-flex;
		align-items: center;
		padding: 4px 8px;
		background-color: rgba(229, 62, 62, 0.1);
		color: #e53e3e;
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
		flex: 0 0 31%;
	}

	/* 统一侧边栏所有模块样式 */
	.theme5-category,
	.sidebar > div {
		background: rgba(255, 255, 255, 0.82);
		border-radius: 1rem;
		padding: 3.42rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		margin-bottom: 2rem;
	}

	.theme5-header {
		color: #2F855A;
		font-size: 1.1rem;
		font-weight: 500;
		margin-bottom: 1rem;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid rgba(47, 133, 90, 0.1);
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
		gap: 0.8rem;
	}

	.theme5-category-item {
		background: rgba(47, 133, 90, 0.1);
		color: #2F855A;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		transition: all 0.3s ease;
	}

	.theme5-category-item:hover {
		background: rgba(47, 133, 90, 0.2);
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
			padding: 1.2rem;
			width: 100%;
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

		.theme5-category,
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
		.container {
			padding: 1.5rem;
		}
	}

	.article-header {
		background: linear-gradient(90deg, #1a4731 0%, #38a169 50%, #2F855A 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		position: relative;
	}

	.article-header::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100px;
		height: 3px;
		background: linear-gradient(90deg, #38a169 0%, #68d391 100%);
		border-radius: 3px;
	}

	.article-header i {
		color: #38a169;
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

		.theme5-category,
		.sidebar > div {
			padding: 2rem;
		}
	}

	.pagination {
		text-align: center;
		margin-top: 7rem;
	}
</style>
