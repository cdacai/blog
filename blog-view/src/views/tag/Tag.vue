<template>
	<div class="tag-container">
		<div class="tag-header">
			<h2>标签 <span class="tag-name">{{ tagName }}</span> 下的文章</h2>
		</div>
		<BlogList :getBlogList="getBlogList" :blogList="blogList" :totalPage="totalPage"/>
	</div>
</template>

<script>
	import BlogList from "@/components/blog/BlogList";
	import {getBlogListByTagName} from "@/api/tag";

	export default {
		name: "Tag",
		components: {BlogList},
		data() {
			return {
				blogList: [],
				totalPage: 0
			}
		},
		watch: {
			//在当前组件被重用时，要重新获取博客列表
			'$route.fullPath'() {
				if (this.$route.name === 'tag') {
					this.getBlogList()
				}
			}
		},
		created() {
			this.getBlogList()
		},
		computed: {
			tagName() {
				return this.$route.params.name
			}
		},
		methods: {
			getBlogList(pageNum) {
				getBlogListByTagName(this.tagName, pageNum).then(res => {
					if (res.code === 200) {
						this.blogList = res.data.list
						this.totalPage = res.data.totalPage
						this.$nextTick(() => {
							Prism.highlightAll()
						})
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			}
		}
	}
</script>

<style scoped>
.tag-container {
	width: 100%;
	max-width: 48.5rem;
	margin: 0 auto;
}

.tag-header {
	text-align: center;
	margin-bottom: 2rem;
	padding: 2rem;
	width: 100%;
}

.tag-name {
	font-weight: bold;
}

.tag-card {
	background: var(--theme-card-bg, #fff);
	border-radius: var(--card-radius, var(--theme-card-radius, 20px));
	box-shadow: var(--theme-shadow-card, 0 8px 32px rgba(0,0,0,0.10));
	padding: var(--card-padding, var(--theme-card-padding, 32px));
	margin-bottom: 2rem;
	transition: background 0.3s, box-shadow 0.3s;
}

.tag-title {
	color: var(--theme-primary, #2F855A);
	font-size: var(--title-font-size, 1.5rem);
	font-weight: var(--theme-title-weight, 700);
	margin-bottom: var(--theme-section-title-margin, 16px);
}

.tag-list {
	display: flex;
	flex-wrap: wrap;
	gap: var(--element-gap, 24px);
}

@media (max-width: 768px) {
	.tag-container {
		padding: 0 1rem;
	}

	.tag-header {
		margin-bottom: 1.5rem;
		padding: 1.5rem;
	}
	
	.tag-header h2 {
		font-size: 1.2rem;
	}
}
</style>