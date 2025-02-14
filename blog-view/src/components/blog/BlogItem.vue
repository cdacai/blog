<template>
	<div>
		<div class="blog-card" v-for="item in blogList" :key="item.id">
			<div class="top-label" v-if="item.top" title="置顶文章">
				<img src="@/assets/icons/top.svg" class="top-icon" alt="置顶">
			</div>
			<div class="card-content">

				<!--文章简要信息-->
				<div class="blog-meta">
					<!--分类-->
					<router-link :to="`/category/${item.category.name}`" class="meta-item">
						<span style="color:rgb(47, 133, 90)">{{ item.category.name }}</span>
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
					v-viewer v-html="item.description.slice(0, 50) + '...'"></div>
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
		}
	}
}
</script>

<style scoped>
.card-content {
	position: relative;
	padding: 3.42rem 4rem;
}
.blog-card {
	position: relative;
	background: rgba(255, 255, 255, 0.82);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	margin-bottom: 3.5rem;
	box-shadow: 0 4px 20px rgba(26, 71, 49, 0.04);
	transition: all 0.3s ease;
	width: 100%;
	overflow: hidden;
}

.blog-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 20px rgba(26, 71, 49, 0.08);
	background: rgba(255, 255, 255, 0.9);
}

.top-label {
	position: absolute;
	top: 0;
	right: 0;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 4rem 4rem 0;
	border-color: transparent #bcefbc transparent transparent;
	cursor: pointer;
	transition: opacity 0.3s ease;
	z-index: 1;
}

.top-icon {
	position: absolute;
	top: 1rem;
	right: -3.1rem;
	width: 20px;
	height: 20px;
	transform: rotate(45deg);
	filter: brightness(0) invert(1);
}

.top-label:hover {
	opacity: 0.85;
}

.top-tooltip {
	position: absolute;
	background: rgba(0, 0, 0, 0.8);
	color: white;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 0.8rem;
	white-space: nowrap;
	top: -30px;
	left: 50%;
	transform: translateX(-50%) scale(0);
	opacity: 0;
	transition: all 0.2s ease;
	pointer-events: none;
}

.top-tooltip::after {
	content: '';
	position: absolute;
	bottom: -4px;
	left: 50%;
	transform: translateX(-50%);
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	border-top: 4px solid rgba(0, 0, 0, 0.8);
}

.top-label:hover .top-tooltip {
	transform: translateX(-50%) scale(1);
	opacity: 1;
}

.blog-title {
	margin: 0 0 1rem;
	font-size: 2.85rem;
	font-weight: normal;
}

.title-link {
	background: linear-gradient(90deg, #1A4731 0%, #276749 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	transition: all 0.3s ease;
}

.title-link:hover {
	filter: brightness(1.1);
	transform: translateY(-2px);
}

.blog-meta {
	display: flex;
	flex-wrap: wrap;
	gap: 0;
	margin-bottom: 1rem;
	color: #2F855A;
	font-size: 0.875rem;
	opacity: 0.9;
}

.meta-item {
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	color: #2F855A;
}

.meta-item:not(:first-child)::before {
	content: "";
	display: inline-block;
	width: 3px;
	height: 3px;
	border-radius: 50%;
	background-color: #2F855A;
	margin: 0 0.7rem;
	opacity: 0.6;
}

.category-label {
	display: inline-flex;
	align-items: center;
	padding: 0.4rem 0.8rem;
	background: rgba(47, 133, 90, 0.1);
	color: #2F855A;
	border-radius: 8px;
	font-size: 0.875rem;
	margin-bottom: 1rem;
	transition: all 0.3s ease;
}

.category-label:hover {
	background: rgba(47, 133, 90, 0.2);
	transform: translateY(-2px);
}

.blog-description {
	color: #276749;
	line-height: 1.85;
	margin: 1rem 0;
	font-size: 0.95rem;
	letter-spacing: 0.01em;
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
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
	padding: 0.5rem 0;
	background: transparent;
	color: rgb(47, 133, 90);
	font-size: 1.1rem;
	transition: all 0.3s ease;
	border: none;
	line-height: 1;
}

.read-btn:hover {
	background: transparent;
	color: #276749;
	transform: translateY(-2px);
}

.read-btn i {
	font-size: 1.1rem;
	margin-left: 0.2rem;
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
	color: #2F855A;
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
	color: #2F855A;
	font-size: 0.7rem;
	line-height: 1;
	display: inline-flex;
	align-items: center;
	opacity: 0.6;
}

.blog-item {
	background: rgba(255, 255, 255, 0.82);
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
		color: #276749;
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
		color: #2F855A;
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
	color: #2F855A !important;
}

/* 添加图片容器样式 */
.blog-description .typo {
	width: 100% !important;
	overflow: hidden !important;
}

/* 确保链接样式 */
.blog-description a {
	color: #2F855A !important;
	text-decoration: none !important;
	transition: all 0.3s ease !important;
}

.blog-description a:hover {
	color: #276749 !important;
	text-decoration: underline !important;
}
</style>