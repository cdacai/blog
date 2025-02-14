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