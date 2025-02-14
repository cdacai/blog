<template>
	<div class="ui bottom" style="text-align:center">
		<el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-count="totalPage"
		               layout="prev, pager, next" background hide-on-single-page>
		</el-pagination>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: "Pagination",
		props: {
			getBlogList: {
				type: Function,
				required: true
			},
			totalPage: {
				type: Number,
				required: true
			}
		},
		//目前只有首页被缓存，所以这个钩子只会被首页调用
		activated() {
			this.$nextTick(() => {
				if (!this.isBlogToHome) {
					//从其它页面路由到首页时，让首页的分页组件页码重置到第一页
					this.pageNum = 1
				}
			})
		},
		computed: {
			...mapState(['isBlogToHome', 'clientSize'])
		},
		data() {
			return {
				pageNum: 1
			}
		},
		methods: {
			//监听页码改变的事件
			handleCurrentChange(newPage) {
				//如果是首页，则滚动至Header下方
				// if (this.$route.name === 'home') {
				// 	window.scrollTo({top: this.clientSize.clientHeight, behavior: 'smooth'})
				// } else {
					//其它页面（分类和标签页）滚动至顶部
					this.scrollToTop()
				// }
				this.pageNum = newPage
				this.getBlogList(newPage)
			},
		}
	}
</script>

<style>
	.el-pagination.is-background .btn-next, 
	.el-pagination.is-background .btn-prev, 
	.el-pagination.is-background .el-pager li {
		background-color: rgba(255, 255, 255, 0.7) !important;
		color: #2F855A !important;
		border: none !important;
		font-weight: 500;
		transition: all 0.3s ease;
		border-radius: 50% !important;
		width: 32px !important;
		height: 32px !important;
		line-height: 32px !important;
		padding: 0 !important;
		margin: 0 6px !important;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #2F855A !important;
		color: #ffffff !important;
	}

	.el-pagination.is-background .btn-next, 
	.el-pagination.is-background .btn-prev {
		border-radius: 50% !important;
		padding: 0 !important;
		display: inline-flex !important;
		align-items: center !important;
		justify-content: center !important;
	}

	.el-pagination.is-background .btn-next:hover, 
	.el-pagination.is-background .btn-prev:hover, 
	.el-pagination.is-background .el-pager li:hover {
		background-color: rgba(47, 133, 90, 0.1) !important;
		transform: translateY(-2px);
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
		background-color: #2F855A !important;
	}

	.ui.bottom {
		margin-top: 7rem;
		width: 100%;
		overflow-x: auto;
	}

	@media screen and (max-width: 768px) {
		.el-pagination {
			white-space: nowrap;
			width: 100%;
			display: flex;
			justify-content: center;
		}

		.el-pagination.is-background .btn-next, 
		.el-pagination.is-background .btn-prev, 
		.el-pagination.is-background .el-pager li {
			margin: 0 3px !important;
			width: 28px !important;
			height: 28px !important;
			line-height: 28px !important;
			min-width: 28px !important;
		}
	}
</style>