<template>
	<div>
		<div class="blog-card subtle-hover" v-for="item in blogList" :key="item.id">
			<!-- 添加波浪背景 -->
			<div class="wave-bg"></div>
			
			<div class="card-content">
				<!-- 置顶雪花图标，绝对定位在.card-content右上角 -->
				<div v-if="item.top" class="top-label" title="置顶文章">
					<span class="top-corner"></span>
					<svg class="top-snow" width="20" height="20" viewBox="0 0 16 16" fill="none">
						<path d="M8 1v14M1 8h14M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="#fff" stroke-width="1" stroke-linecap="round"/>
						<path d="M8 1l1.2 2L8 5M8 1l-1.2 2L8 5M8 15l1.2-2L8 11M8 15l-1.2-2L8 11
								 M1 8l2-1.2L5 8M1 8l2 1.2L5 8M15 8l-2-1.2L11 8M15 8l-2 1.2L11 8
								 M3.5 3.5l2 0.8l1 2M3.5 3.5l0.8 2l2 1
								 M12.5 12.5l-2-0.8l-1-2M12.5 12.5l-0.8-2l-2-1
								 M12.5 3.5l-2 0.8l-1 2M12.5 3.5l-0.8 2l-2 1
								 M3.5 12.5l2-0.8l1-2M3.5 12.5l0.8-2l2-1"
							  stroke="#fff"
							  stroke-width="0.6"
							  stroke-linecap="round"/>
						<circle cx="8" cy="8" r="1" fill="#fff"/>
						<circle cx="8" cy="8" r="0.4" fill="#fff"/>
					</svg>
				</div>

				<!--文章简要信息-->
				<div class="blog-meta">
					<!--分类-->
					<router-link :to="`/category/${item.category.name}`" class="meta-item category-meta">
						<span style="color:var(--primary-color)">{{ item.category.name }}</span>
					</router-link>
					<div class="meta-item">
						<span>{{ item.createTime | dateFormat('YYYY-MM-DD')}}</span>
					</div>
					<div class="meta-item">
						<span>{{ item.views }} 阅读</span>
					</div>
					<div class="meta-item">
						<span>{{ item.words }} 字</span>
					</div>
				</div>

				<!--标题-->
				<div class="title-wrapper">
					<h2 class="blog-title">
						<a href="javascript:;" @click.prevent="toBlog(item)" class="title-link">{{ item.title }}</a>
					</h2>
				</div>
				
				<!--文章Markdown描述-->
				<div class="blog-description" v-lazy-container="{selector: 'img'}"
					v-viewer v-html="item.description"></div>
				<!--阅读全文按钮和标签-->
				<div class="bottom-wrapper">
					<div class="tag-list">
						<router-link :to="`/tag/${tag.name}`" 
							class="tag-item" 
							:class="tag.color" 
							v-for="(tag,index) in item.tags.slice(0,maxTagsShow)" 
							:key="index">
							{{ tag.name }}
						</router-link>
						<span v-if="item.tags.length > maxTagsShow" class="tag-more">...</span>
					</div>
					<div class="read-more">
						<a href="javascript:;" @click.prevent="toBlog(item)" class="read-btn">
							阅读全文 →
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import settings from '@/settings'

export default {
	name: "BlogItem",
	data() {
		return {
			maxTagsShow: settings.maxTagsShow
		}
	},
	props: {
		blogList: {
			type: Array,
			required: true
		}
	},
	methods: {
		toBlog(blog) {
			this.$store.dispatch('goBlogPage', blog)
		},
		injectWaveBg() {
			// 直接复用Index.vue的SVG注入逻辑
			const root = document.documentElement;
			const decorationColor = getComputedStyle(root).getPropertyValue('--decoration-color') || '#2F855A';
			const encode = encodeURIComponent;
			const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
				<path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.15' fill='${decorationColor}'/>
				<path d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.1' fill='${decorationColor}'/>
				<path d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' opacity='.1' fill='${decorationColor}'/>
			</svg>`;
			const bg = `url("data:image/svg+xml,${encode(svg)}")`;
			const waveBgs = this.$el.querySelectorAll('.wave-bg');
			waveBgs.forEach(waveBg => {
				waveBg.style.backgroundImage = bg;
			});
		}
	},
	mounted() {
		this.injectWaveBg();
	},
	updated() {
		this.injectWaveBg();
	}
}
</script>

<style>
.card-content {
	position: relative;
	padding: var(--card-padding, 32px); /* 只用该变量控制所有卡片内容区padding，主题切换时同步 */
	z-index: 2;
}
.blog-card {
	position: relative;
	background: var(--theme-card-bg, #fff);
	backdrop-filter: blur(10px);
	border-radius: var(--card-radius, 20px); /* 变量化圆角 */
	margin-bottom: 3.5rem;
	box-shadow: 0 4px 20px rgba(26, 71, 49, 0.04);
	transition: all 0.3s ease;
	width: 100%;
	overflow: hidden;
}

.blog-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 20px rgba(26, 71, 49, 0.08);
	background: var(--theme-card-bg, #ffffffee);
}

.top-label {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 10;
	width: 56px;
	height: 56px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	pointer-events: none;
}

.top-corner {
	position: absolute;
	top: 0;
	right: 0;
	width: 56px;
	height: 56px;
	background: var(--primary-color, #2F855A);
	clip-path: polygon(100% 0, 0 0, 100% 100%);
	z-index: 0;
}

.top-snow {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 20px;
	height: 20px;
	z-index: 1;
	display: block;
	pointer-events: auto;
}

.blog-title {
	margin: 0 0 1rem;
	font-size: var(--title-font-size, 2.34rem);
	font-weight: normal;
	color: var(--theme-text-primary);
}

.title-link {
	color: var(--theme-text-primary);
	transition: all 0.3s ease;
	position: relative;
	display: inline-block;
}

.title-link:hover {
	color: var(--theme-text-primary);
	transform: translateY(-2px);
}

/* 
其他颜色方案建议：
1. #1E6091 - 深海蓝 - 沉稳而专业，带来平静感
2. #5B6BBF - 薰衣草蓝 - 柔和而富有创意的色调
3. #8E44AD - 紫水晶 - 高贵神秘，增添深度
4. #D35400 - 南瓜橙 - 温暖活力，引人注目
5. #16A085 - 孔雀绿 - 清新自然，富有生机
6. #27AE60 - 翠绿 - 明亮而充满活力的绿色
7. #2980B9 - 钴蓝 - 清澈而专业的蓝色
8. #E74C3C - 朱砂红 - 热情大胆，引人注目
9. #6D4C41 - 巧克力棕 - 温暖而自然的色调
10. #607D8B - 蓝灰色 - 中性而平衡的色调
*/

.title-link::after {
	content: '';
	position: absolute;
	bottom: -5px;
	left: 0;
	width: 0;
	height: 2px;
	background: var(--primary-color); /* 下划线颜色与悬停颜色一致 */
	transition: width 0.3s ease;
	border-radius: 2px;
	opacity: 0;
}

.title-link:hover::after {
	width: 100%;
	opacity: 1;
}

.blog-meta {
	display: flex;
	flex-wrap: wrap;
	gap: 0;
	margin-bottom: 1rem;
	font-size: 0.875rem;
}

.meta-item {
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	color: var(--text-color) !important;
}

/* 分类单独高亮主题色 */
.meta-item.category-meta {
	color: var(--primary-color) !important;
}

.meta-item:not(:first-child)::before {
	content: "";
	display: inline-block;
	width: 3px;
	height: 3px;
	border-radius: 50%;
	background-color: var(--primary-color);
	margin: 0 0.7rem;
	opacity: 0.6;
}

.category-label {
	display: inline-flex;
	align-items: center;
	padding: 0.4rem 0.8rem;
	background: rgba(47, 133, 90, 0.1);
	color: var(--primary-color);
	border-radius: 8px;
	font-size: 0.875rem;
	margin-bottom: 1rem;
	transition: all 0.3s ease;
}

.category-label:hover {
	background: rgba(47, 133, 90, 0.2);
	transform: translateY(-2px);
}

.blog-description,
.intro-text {
	color: var(--theme-text-secondary, var(--text-color));
	line-height: var(--theme-description-line-height, 1.85);
	margin: 1rem 0;
	font-size: var(--desc-font-size, var(--theme-desc-font-size, 0.95rem));
	letter-spacing: 0.01em;
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

.bottom-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 2rem;
}

.read-more {
	margin: 0;
	flex-shrink: 0;
	display: flex;
	align-items: center;
}

.read-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	padding: var(--button-padding, 0.2rem 0.5rem);
	background: transparent;
	color: var(--primary-color);
	font-size: var(--button-font-size, 1.1rem);
	transition: all 0.3s ease;
	border: none;
	line-height: 1;
	border-radius: var(--button-radius, 4px);
	border: 1px solid rgba(47, 133, 90, 0.1);
}

.read-btn:hover {
	background: transparent;
	color: var(--text-color);
	transform: translateY(-2px);
}

.read-btn i {
	font-size: 1.1rem;
	margin-left: 0.2rem;
}

.read-btn {
	font-size: 0.8rem;
	padding: 0.2rem 0.5rem;
	background: rgba(47, 133, 90, 0.05);
	border: 1px solid rgba(47, 133, 90, 0.1);
	border-radius: 4px;
	color: var(--primary-color);
}

.tag-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
	opacity: 0.75;
}

.tag-item {
	padding: 0.15rem 0.5rem;
	background: rgba(47, 133, 90, 0.04);
	color: var(--primary-color);
	border-radius: 3px;
	font-size: 0.7rem;
	transition: all 0.2s ease;
	line-height: 1;
	display: inline-flex;
	align-items: center;
}

.tag-item:hover {
	background: rgba(47, 133, 90, 0.08);
	opacity: 0.9;
	transform: translateY(-1px);
}

.tag-more {
	color: var(--primary-color);
	font-size: 0.7rem;
	line-height: 1;
	display: inline-flex;
	align-items: center;
	opacity: 0.6;
}

.blog-item {
	background: var(--theme-card-bg, #fff);
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	margin-bottom: 2rem;
	transition: all 0.3s ease;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
	.card-content {
		padding: 1rem;
	}

	.blog-card {
		margin-bottom: 0.8rem;
		border-radius: 8px;
	}

	.blog-title {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		line-height: 1.4;
	}

	.blog-meta {
		font-size: 0.8rem;
		gap: 0.6rem;
		margin-bottom: 0.5rem;
	}

	.meta-item {
		font-size: 0.8rem;
	}

	.blog-description {
		font-size: 0.85rem;
		margin: 0.5rem 0;
		line-height: 1.5;
		color: var(--text-color);
	}

	.bottom-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 0.8rem;
		padding-top: 0.8rem;
		border-top: 1px solid rgba(47, 133, 90, 0.1);
	}

	.tag-list {
		flex: 1;
		overflow-x: auto;
		display: flex;
		gap: 0.3rem;
		padding-right: 0.8rem;
		opacity: 0.75;
	}

	.tag-item {
		padding: 0.12rem 0.4rem;
		font-size: 0.7rem;
		white-space: nowrap;
		background: rgba(47, 133, 90, 0.04);
		border-radius: 3px;
	}

	.tag-item:hover {
		background: rgba(47, 133, 90, 0.08);
		opacity: 0.9;
	}

	.tag-more {
		font-size: 0.7rem;
		opacity: 0.6;
	}

	.read-more {
		flex-shrink: 0;
	}

	.read-btn {
		font-size: 0.8rem;
		padding: 0.2rem 0.5rem;
		background: rgba(47, 133, 90, 0.05);
		border: 1px solid rgba(47, 133, 90, 0.1);
		border-radius: 4px;
		color: var(--primary-color);
	}
}

/* 平板适配 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
	.blog-item {
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.blog-title {
		font-size: 1.4rem;
	}

	.blog-info {
		gap: 0.8rem;
	}

	.blog-info-item {
		font-size: 0.9rem;
	}
}
</style>

<style>
/* 全局样式，确保可以作用于动态插入的内容 */
.blog-description img {
	max-width: 100% !important;
	height: auto !important;
	border-radius: 8px !important;
	margin: 1rem 0 !important;
	display: block !important;
}

.blog-description p {
	margin: 1rem 0;
}

.blog-description pre {
	max-width: 100% !important;
	overflow-x: auto !important;
	border-radius: 8px !important;
	margin: 1rem 0 !important;
	padding: 1rem !important;
	background-color: rgba(47, 133, 90, 0.05) !important;
}

.blog-description code {
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace !important;
	font-size: 0.9em !important;
	padding: 0.2em 0.4em !important;
	border-radius: 4px !important;
	background: rgba(47, 133, 90, 0.1) !important;
	color: var(--primary-color) !important;
}

/* 添加图片容器样式 */
.blog-description .typo {
	width: 100% !important;
	overflow: hidden !important;
}

/* 确保链接样式 */
.blog-description a {
	color: var(--primary-color) !important;
	text-decoration: none !important;
	transition: all 0.3s ease !important;
}

.blog-description a:hover {
	color: var(--text-color) !important;
	text-decoration: underline !important;
}
</style>

<style>
.wave-bg {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40px;
	z-index: 1;
	pointer-events: none;
	opacity: 0.15;
	/* background-color: rgba(255,0,0,0.2); 调试用，已去除 */
	/* border: 2px solid blue; 调试用，已去除 */
}
</style>