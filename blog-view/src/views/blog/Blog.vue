<template>
	<div>
		<div class="blog-container">
			<h2 class="blog-title">{{ blog.title }}</h2>
			<!-- 文章信息 -->
			<div class="blog-info-container">
				<!-- 分类 -->
				<router-link 
					:to="`/category/${blog.category.name}`" 
					class="info-item"
					style="color: var(--primary-color);"
					v-if="blog.category"
				>
					{{ blog.category.name }}
				</router-link>

				<div class="info-item">
					<span>{{ blog.createTime | dateFormat('YYYY-MM-DD') }}</span>
				</div>
				<div class="info-item">
					<span>{{ blog.views }} 阅读</span>
				</div>
				<div class="info-item">
					<span>{{ blog.words }} 字</span>
				</div>
			</div>
			<!-- 文章内容 -->
			<div 
				class="typo js-toc-content" 
				v-lazy-container="{selector: 'img'}" 
				v-viewer 
				:class="{'m-big-fontsize':bigFontSize}" 
				v-html="blog.content" 
				ref="content"
			></div>
			
			<!-- 赞赏按钮和标签容器 -->
			<div class="bottom-info">
				<!-- 赞赏按钮 -->
				<div class="reward-container" v-if="blog.appreciation">
					<el-popover
						placement="top"
						width="220"
						trigger="hover"
						popper-class="reward-popover"
					>
						<div class="reward-content">
							<div class="reward-text">一毛是鼓励，一块是真爱</div>
							<img :src="$store.state.siteInfo.reward" alt="" class="reward-image">
						</div>
						<el-button slot="reference" class="reward-button">赞赏支持</el-button>
					</el-popover>
				</div>

				<!-- 文章标签 -->
				<div class="tag-container" v-if="blog.tags && blog.tags.length > 0">
					<span class="tag-label">标签：</span>
					<div class="tag-list">
						<router-link 
							:to="`/tag/${tag.name}`" 
							class="tag-item"
							v-for="(tag,index) in blog.tags" 
							:key="index"
						>
							{{ tag.name }}
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="ui attached positive message" style="background-color: white;">
			<div class="time-info">
				<div class="time-item">
					<span class="time-label">Created</span>
					<span class="time-value">{{ blog.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</span>
				</div>
				<div class="time-item">
					<span class="time-label">Updated</span>
					<span class="time-value">{{ blog.updateTime | dateFormat('YYYY-MM-DD HH:mm') }}</span>
				</div>
			</div>
		</div>
		<div class="ui bottom teal attached segment threaded comments" style="border: none!important;">
			<CommentList 
				ref="comment"
				:page="0"
				:blog-id="blog.id" 
				:blog-title="blog.title" 
				v-if="blog.commentEnabled"
			/>
			<h3 class="ui header" v-else>评论已关闭</h3>
		</div>
		<Back></Back>
		<!-- 置顶标志 -->
		<div class="top-tag" v-if="blog.top" title="置顶文章">
			<img src="@/assets/icons/top.svg" class="top-icon" alt="置顶">
		</div>
	</div>
</template>

<script>
	import { getBlogById } from "@/api/blog";
	import Back from "@/components/index/Back";

	import CommentList from "@/components/comment/CommentList";
	import {mapState} from "vuex";
	import {SET_FOCUS_MODE, SET_IS_BLOG_RENDER_COMPLETE} from '@/store/mutations-types';

	export default {
		name: "Blog",
		components: { CommentList, Back },
		data() {
			return {
				blog: {},
				bigFontSize: false,
				toc: null
			}
		},
		watch: {
			blog: {
				handler(newVal) {
					if (newVal && newVal.content) {
						// 等待 Markdown 内容完全渲染
						setTimeout(() => {
							this.handleAfterGetBlog()
						}, 300)
					}
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			blogId() {
				return parseInt(this.$route.params.id)
			},
			...mapState(['siteInfo', 'focusMode'])
		},
		beforeRouteEnter(to, from, next) {
			//路由到博客文章页之前，应将文章的渲染完成状态置为 false
			next(vm => {
				// 当 beforeRouteEnter 钩子执行前，组件实例尚未创建
				// vm 就是当前组件的实例，可以在 next 方法中把 vm 当做 this用
				vm.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
			})
		},
		beforeRouteLeave(to, from, next) {
			this.$store.commit(SET_FOCUS_MODE, false)
			this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
			// 从文章页面路由到其它页面时，销毁当前组件的同时，要销毁tocbot实例
			if (typeof tocbot !== 'undefined') {
				tocbot.destroy()
			}
			next()
		},
		beforeRouteUpdate(to, from, next) {
			// 一般有两种情况会触发这个钩子
			// ①前文章页面跳转到其它文章页面
			// ②点击目录跳转锚点时，路由hash值会改变，导致当前页面会重新加载，这种情况是不希望出现的
			// 在由 beforeRouteUpdate 中判断路径是否改变
			// 如果跳转到其它页面，to.path!==from.path 就放行 next()
			// 如果是跳转锚点，path不会改变，hash会改变，to.path===from.path, to.hash!==from.path 不放行路由跳转，就能让锚点正常跳转
			if (to.path !== from.path) {
				this.$store.commit(SET_FOCUS_MODE, false)
				this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
				//在当前组件内路由到其它博客文章时，要重新获取文章
				this.getBlog(to.params.id)
				next()
			}
		},
		created() {
			this.getBlog()
		},
		methods: {
			getBlog() {
				// 获取文章前先重置状态
				this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
				getBlogById(this.$route.params.id).then(res => {
					if (res.code === 200) {
						this.blog = res.data
						// 获取文章后，等待 DOM 更新完成
						setTimeout(() => {
							this.handleAfterGetBlog()
						}, 300)
					}
				})
			},
			handleAfterGetBlog() {
				// 更新目录组件数据
				if (this.$refs.content) {
					const headings = this.$refs.content.querySelectorAll('h1,h2,h3,h4,h5')
					if (headings && headings.length > 0) {
						// 确保所有标题元素都已经完全渲染
						const allHeadingsHaveOffset = Array.from(headings).every(h => h.offsetTop > 0)
						if (allHeadingsHaveOffset) {
							// 设置渲染完成状态
							this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, true)
							// 手动调用 Prism.js 的高亮方法
							this.$nextTick(() => {
								if (typeof Prism !== 'undefined') {
									Prism.highlightAll()
								}
							})
						} else {
							// 如果标题元素还没有完全渲染，延迟再试
							setTimeout(() => {
								this.handleAfterGetBlog()
							}, 200)
						}
					} else {
						// 如果没有标题，也需要高亮代码
						this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, true)
						this.$nextTick(() => {
							if (typeof Prism !== 'undefined') {
								Prism.highlightAll()
							}
						})
					}
				}
			},
			changeFocusMode() {
				this.$store.commit(SET_FOCUS_MODE, !this.focusMode)
			}
		}
	}
</script>

<style scoped>
.blog-container {
	background-color: white;
	border-radius: 8px 8px 0 0;
	padding: 2rem;
	position: relative;
}

.blog-title {
	font-size: 2.25rem;
	font-weight: 600;
	color: var(--text-color);
	margin: 1rem 0 1.5rem;
	line-height: 1.4;
	letter-spacing: -0.02em;
	text-align: center;
}

.blog-info-container {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0;
	margin: 1.5rem 0;
	color: var(--text-color);
	font-size: 0.9rem;
	opacity: 0.9;
	justify-content: center;
}

.info-item {
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	color: var(--primary-color);
}

.info-item:not(:first-child)::before {
	content: "";
	display: inline-block;
	width: 3px;
	height: 3px;
	border-radius: 50%;
	background-color: var(--primary-color);
	margin: 0 0.7rem;
	opacity: 0.6;
}

.top-tag {
	position: absolute;
	top: 0;
	right: 0;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 4rem 4rem 0;
	border-color: transparent var(--primary-color) transparent transparent;
	cursor: pointer;
	transition: opacity 0.3s ease;
	z-index: 1;
}

.top-icon {
	position: absolute;
	top: 0.6rem;
	right: -3.2rem;
	width: 24px;
	height: 24px;
	transform: rotate(45deg);
	filter: brightness(0) invert(1);
}

.top-tag:hover {
	opacity: 0.85;
}

.tag-container {
	display: flex;
	align-items: center;
	margin: 2.5rem 0;
	opacity: 0.85;
}

.tag-label {
	color: var(--primary-color);
	font-size: 0.9rem;
	margin-right: 0.5rem;
}

.tag-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
}

.tag-item {
	padding: 0.15rem 0.3rem;
	color: var(--primary-color);
	font-size: 0.8rem;
	transition: all 0.2s ease;
	line-height: 1;
}

.tag-item:hover {
	opacity: 0.9;
	transform: translateY(-1px);
	text-decoration: underline;
}

.typo {
	margin: 2.5rem 0;
	line-height: 1.8;
	font-size: 1.05rem;
	color: var(--text-color);
}

.typo h1,
.typo h2,
.typo h3,
.typo h4,
.typo h5 {
	position: relative;
	margin: 2rem 0 1rem;
	font-weight: 600;
	line-height: 1.4;
	color: var(--text-color);
}

.typo h1 {
	font-size: 2rem;
	border-bottom: 2px solid rgba(var(--primary-color), 0.1);
	padding-bottom: 0.5rem;
}

.typo h2 {
	font-size: 1.75rem;
}

.typo h3 {
	font-size: 1.5rem;
}

.typo h4 {
	font-size: 1.25rem;
}

.typo h5 {
	font-size: 1.1rem;
}

.typo p {
	margin: 1.25rem 0;
}

.typo a {
	color: var(--primary-color);
	text-decoration: none;
	border-bottom: 1px solid rgba(var(--primary-color), 0.2);
	transition: all 0.2s ease;
}

.typo a:hover {
	border-bottom-color: var(--primary-color);
}

.typo img {
	max-width: 100%;
	border-radius: 8px;
	margin: 1.5rem 0;
}

.typo blockquote {
	margin: 1.5rem 0;
	padding: 1rem 1.5rem;
	border-left: 4px solid var(--primary-color);
	background-color: rgba(var(--primary-color), 0.05);
	border-radius: 0 8px 8px 0;
	color: var(--text-color);
}

.typo code {
	background-color: rgba(var(--primary-color), 0.08);
	padding: 0.2em 0.4em;
	border-radius: 4px;
	font-size: 0.9em;
	color: var(--primary-color);
}

.typo pre code {
	background-color: var(--text-color);
	color: var(--text-color);
	padding: 1rem;
	border-radius: 8px;
	overflow-x: auto;
	font-size: 0.9rem;
}

.ui.attached.positive.message {
	border: none;
	border-top: 1px solid rgba(var(--primary-color), 0.1);
	box-shadow: none;
	margin: 0;
	background-color: white;
}

.time-info {
	display: flex;
	justify-content: flex-end;
	gap: 2rem;
	padding: 1rem 2rem;
}

.time-item {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	color: var(--text-color);
	font-size: 0.9rem;
}

.time-label {
	color: var(--text-color);
	font-weight: 500;
	letter-spacing: 0.02em;
}

.time-value {
	color: var(--text-color);
}

/* 赞赏按钮样式 */
.ui.orange.inverted.circular.button {
	background-color: rgba(var(--primary-color), 0.1) !important;
	color: var(--primary-color) !important;
	font-weight: 500;
	padding: 0.75rem 1.5rem;
	transition: all 0.2s ease;
}

.ui.orange.inverted.circular.button:hover {
	background-color: rgba(var(--primary-color), 0.15) !important;
	transform: translateY(-1px);
}

/* 评论区样式 */
.ui.bottom.attached.segment.threaded.comments {
	border: none;
	box-shadow: none;
	margin: 0;
	background-color: white;
	border-radius: 0 0 8px 8px;
	padding: 2rem;
}

.bottom-info {
	margin: 2.5rem 0;
}

.reward-container {
	text-align: center;
	margin-bottom: 1.5rem;
}

.reward-button {
	background: var(--primary-color);
	color: white;
	border: none;
	padding: 0.6rem 1.5rem;
	font-size: 0.95rem;
	border-radius: 4px;
	transition: all 0.3s ease;
	font-weight: 500;
	box-shadow: 0 2px 4px rgba(var(--primary-color), 0.2);
}

.reward-button:hover {
	background: var(--primary-color);
	transform: translateY(-1px);
	box-shadow: 0 4px 8px rgba(var(--primary-color), 0.25);
}

.reward-content {
	text-align: center;
}

.reward-text {
	font-size: 0.9rem;
	color: var(--primary-color);
	margin-bottom: 0.8rem;
}

.reward-image {
	width: 100%;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 自定义 popover 样式 */
:deep(.reward-popover) {
	padding: 1rem;
	border: none;
	border-radius: 12px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.tag-container {
	display: flex;
	align-items: center;
	opacity: 0.85;
}
</style>
