<template>
	<div ref="nav" class="theme5-nav">
		<!-- 添加导航栏色块装饰 -->
		<div class="color-block nav-block-1"></div>
		<div class="color-block nav-block-2"></div>
		<div class="color-block circle-nav"></div>
		
		<div class="nav-container">
			<router-link to="/" class="blog-title" v-show="$route.name === 'home'">
				{{ blogName }}
			</router-link>
			<div class="nav-container-placeholder" v-show="$route.name !== 'home'"></div>
			<div class="nav-links" :class="{'nav-hidden': mobileHide}">
				<router-link to="/home" class="nav-item" :class="{'active':$route.name==='home'}">
					首页
				</router-link>
				<!-- <el-dropdown trigger="click" @command="categoryRoute">
					<span class="nav-item" :class="{'active':$route.name==='category'}">
						分类
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="category.name" v-for="(category,index) in categoryList" :key="index">{{ category.name }}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown> -->
				<router-link to="/archives" class="nav-item" :class="{'active':$route.name==='archives'}">
					归档
				</router-link>
				<router-link to="/moments" class="nav-item" :class="{'active':$route.name==='moments'}">
					动态
				</router-link>
				<!-- <router-link to="/friends" class="nav-item" :class="{'active':$route.name==='friends'}">
					友人帐
				</router-link> -->
				<!-- <router-link to="/about" class="nav-item" :class="{'active':$route.name==='about'}">
					关于我
				</router-link> -->
			</div>
			<button class="mobile-toggle" @click="toggle">
				<i class="sidebar icon"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import {getSearchBlogList} from "@/api/blog";
	import {mapState} from 'vuex'

	export default {
		name: "Nav",
		props: {
			blogName: {
				type: String,
				required: true
			},
			categoryList: {
				type: Array,
				required: true
			},
		},
		data() {
			return {
				mobileHide: true,
				queryString: '',
				queryResult: [],
				timer: null,
				lastScrollTop: 0,
				isNavVisible: true
			}
		},
		computed: {
			...mapState(['clientSize'])
		},
		watch: {
			//路由改变时，收起导航栏
			'$route.path'() {
				this.mobileHide = true
			}
		},
		mounted() {
			//监听页面滚动位置，改变导航栏的显示
			// window.addEventListener('scroll', () => {
			// 	//首页且不是移动端
			// 	if (this.$route.name === 'home' && this.clientSize.clientWidth > 768) {
			// 		if (window.scrollY > this.clientSize.clientHeight / 2) {
			// 			this.$refs.nav.classList.remove('transparent')
			// 		} else {
			// 			this.$refs.nav.classList.add('transparent')
			// 		}
			// 	}
			// })
			//监听点击事件，收起导航菜单
			document.addEventListener('click', (e) => {
				//遍历冒泡
				let flag = this.$refs.nav.contains(e.target)
				//如果导航栏是打开状态，且点击的元素不是Nav的子元素，则收起菜单
				if (!this.mobileHide && !flag) {
					this.mobileHide = true
				}
			})
			// 监听滚动事件
			window.addEventListener('scroll', this.handleScroll)
		},
		beforeDestroy() {
			// 组件销毁前移除监听
			window.removeEventListener('scroll', this.handleScroll)
		},
		methods: {
			toggle() {
				this.mobileHide = !this.mobileHide
			},
			categoryRoute(name) {
				this.$router.push(`/category/${name}`)
			},
			debounceQuery(queryString, callback) {
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(() => this.querySearchAsync(queryString, callback), 1000)
			},
			querySearchAsync(queryString, callback) {
				if (queryString == null
						|| queryString.trim() === ''
						|| queryString.indexOf('%') !== -1
						|| queryString.indexOf('_') !== -1
						|| queryString.indexOf('[') !== -1
						|| queryString.indexOf('#') !== -1
						|| queryString.indexOf('*') !== -1
						|| queryString.trim().length > 20) {
					return
				}
				getSearchBlogList(queryString).then(res => {
					if (res.code === 200) {
						this.queryResult = res.data
						if (this.queryResult.length === 0) {
							this.queryResult.push({title: '无相关搜索结果'})
						}
						callback(this.queryResult)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			},
			handleSelect(item) {
				if (item.id) {
					this.$router.push(`/blog/${item.id}`)
				}
			},
			handleScroll() {
				const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
				const nav = this.$refs.nav
				const blogTitle = nav.querySelector('.blog-title')
				const navLinks = nav.querySelector('.nav-links')
				
				// 在顶部时全部显示
				if(currentScrollTop <= 0) {
					if(blogTitle) blogTitle.style.opacity = '1'
					navLinks.style.opacity = '1'
					nav.style.transform = 'translateY(0)'
					return
				}
				
				// 博客标题：无论上滑下滑都隐藏
				if(blogTitle) blogTitle.style.opacity = '0'
				
				// 导航链接：只有上滑时才显示
				if(currentScrollTop < this.lastScrollTop) {
					navLinks.style.opacity = '1'
					nav.style.transform = 'translateY(0)'
				} else {
					navLinks.style.opacity = '0'
					nav.style.transform = 'translateY(-100%)'
				}
				
				this.lastScrollTop = currentScrollTop
			}
		}
	}
</script>

<style scoped>
.theme5-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	padding: 3rem 32px;
	background: transparent;
	transition: all 0.3s ease;
	transform: translateY(0);
	display: flex;
	justify-content: center;
	max-width: var(--theme-content-width, 2200px);
	margin: 0 auto;
}

/* 导航栏色块样式 */
.color-block.nav-block-1 {
	position: absolute;
	top: 20px;
	right: 10%;
	width: 80px;
	height: 80px;
	background-color: var(--decoration-color, rgba(47,133,90,0.4));
	transform: rotate(15deg);
	border-radius: 10px;
	opacity: 0.15;
	z-index: -1;
}

.color-block.nav-block-2 {
	position: absolute;
	top: 40px;
	left: 15%;
	width: 60px;
	height: 60px;
	background-color: var(--decoration-color, rgba(47,133,90,0.5));
	transform: rotate(-10deg);
	border-radius: 10px;
	opacity: 0.15;
	z-index: -1;
}

.color-block.circle-nav {
	position: absolute;
	top: 30px;
	left: 40%;
	width: 70px;
	height: 70px;
	background-color: var(--decoration-color, rgba(47,133,90,0.35));
	border-radius: 50%;
	opacity: 0.15;
	z-index: -1;
}

.nav-container {
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.blog-title {
	font-size: 1.5rem;
	font-weight: 100;
	color: var(--theme-text-primary);
	text-decoration: none;
	transition: all 0.3s ease;
}

.blog-title:hover {
	color: var(--theme-text-primary);
}

.nav-container-placeholder {
	width: 150px; /* 与博客标题宽度相同 */
}

.nav-links {
	display: flex;
	gap: var(--theme-nav-gap, 32px);
	align-items: center;
}

.nav-item {
	font-size: var(--theme-nav-size, 1rem);
	color: var(--theme-text-primary);
	text-decoration: none;
	transition: var(--theme-hover-transition);
	font-weight: 500;
	letter-spacing: var(--theme-nav-spacing, 0.01em);
}

.nav-item:hover,
.nav-item.active {
	color: var(--theme-text-primary);
	font-weight: 500;
}

.mobile-toggle {
	display: none;
	background: none;
	border: none;
	color: #276749;
	cursor: pointer;
	padding: 0.5rem;
}

/* 下拉菜单样式 */
.el-dropdown-menu {
	background: rgba(255, 255, 255, 0.95) !important;
	backdrop-filter: blur(10px);
	border: none !important;
	border-radius: 8px !important;
	box-shadow: 0 4px 12px rgba(26, 71, 49, 0.1) !important;
}

.el-dropdown-menu__item {
	color: #276749 !important;
	font-size: 0.875rem !important;
	padding: 0.5rem 1rem !important;
	transition: all 0.2s ease !important;
}

.el-dropdown-menu__item:hover {
	background: rgba(47, 133, 90, 0.1) !important;
	color: #2F855A !important;
}

@media screen and (max-width: 768px) {
	.theme5-nav {
		height: 56px;
	}

	.nav-container {
		padding: 0 1rem;
	}

	.mobile-toggle {
		display: block;
	}

	.nav-links {
		position: absolute;
		top: 50.4px;
		right: 5.8rem;
		width: 55px;
		flex-direction: column;
		background: transparent;
		padding: 0.3rem 0;
		gap: var(--theme-nav-gap-mobile, 8px);
	}

	.nav-hidden {
		display: none;
	}

	.nav-item {
		width: 100%;
		text-align: center;
		padding: 0.5rem 0.8rem;
		font-size: var(--theme-nav-size, 1rem);
		color: var(--theme-text-primary);
		position: relative;
		letter-spacing: var(--theme-nav-spacing, 0.01em);
		font-weight: 500;
	}

	.nav-item:hover {
		color: var(--theme-text-primary);
	}

	.nav-item.active::before {
		content: '';
		position: absolute;
		left: 0.2rem;
		top: 50%;
		transform: translateY(-50%);
		width: 2px;
		height: 16px;
		background: var(--theme-text-primary);
		border-radius: 1px;
	}
}
</style>
