<template>
	<!--评论分页-->
	<el-pagination @current-change="handleCurrentChange" :current-page="commentQuery.pageNum" :total="allComment"
	               :page-size="commentQuery.pageSize" layout="prev, pager, next" background hide-on-single-page class="pagination">
	</el-pagination>
</template>

<script>
	import {mapState} from 'vuex'
	import {SET_COMMENT_QUERY_PAGE_NUM, SET_PARENT_COMMENT_ID} from "@/store/mutations-types";

	export default {
		name: "Pagination",
		computed: {
			...mapState(['commentQuery', 'allComment'])
		},
		methods: {
			//监听页码改变的事件
			handleCurrentChange(newPage) {
				this.$store.commit(SET_COMMENT_QUERY_PAGE_NUM, newPage)
				this.$store.commit(SET_PARENT_COMMENT_ID, -1)
				this.$store.dispatch('getCommentList')
			},
		}
	}
</script>

<style scoped>
	.pagination {
		margin-top: 2em;
		text-align: center;
	}

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
</style>