<template>
	<div class="category-container">
		<div class="category-header">
			<h2>分类 <span class="category-name">{{ categoryName }}</span> 下的文章</h2>
		</div>
		<BlogList :getBlogList="getBlogList" :blogList="blogList" :totalPage="totalPage"/>
	</div>
</template>

<script>
	import BlogList from "@/components/blog/BlogList";
	import {getBlogListByCategoryName} from "@/api/category";

	export default {
		name: "Category",
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
				if (this.$route.name === 'category') {
					this.getBlogList()
				}
			}
		},
		created() {
			this.getBlogList()
		},
		computed: {
			categoryName() {
				return this.$route.params.name
			}
		},
		methods: {
			getBlogList(pageNum) {
				getBlogListByCategoryName(this.categoryName, pageNum).then(res => {
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
.category-container {
	width: 100%;
	max-width: 48.5rem;
	margin: 0 auto;
}

.category-header {
	text-align: center;
	margin-bottom: 2rem;
	padding: 2rem;
	width: 100%;
}

.category-name {
	font-weight: bold;
}

@media (max-width: 768px) {
	.category-container {
		padding: 0 1rem;
	}

	.category-header {
		margin-bottom: 1.5rem;
		padding: 1.5rem;
	}
	
	.category-header h2 {
		font-size: 1.2rem;
	}
}
</style>