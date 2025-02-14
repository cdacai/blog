<template>
	<div>
		<el-table :data="momentList">
			<el-table-column label="序号" type="index" width="50"></el-table-column>
			<el-table-column label="内容" prop="content" min-width="350" align="left"></el-table-column>
			<el-table-column label="是否显示" width="70" align="center">
				<template v-slot="scope">
					<el-switch v-model="scope.row.published" @change="momentPublishedChanged(scope.row)"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="点赞数" prop="likes" width="70" align="center"></el-table-column>
			<el-table-column label="创建时间" width="150" align="center">
				<template v-slot="scope">{{ scope.row.createTime | dateFormat }}</template>
			</el-table-column>
			<el-table-column label="操作" width="150" align="center" fixed="right">
				<template v-slot="scope">
					<div class="operation-buttons">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="goEditMomentPage(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>

		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum"
		               :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.pageSize" :total="total"
		               layout="total, sizes, prev, pager, next, jumper" background>
		</el-pagination>
	</div>
</template>

<script>
	import Breadcrumb from "@/components/Breadcrumb";
	import {getMomentListByQuery, updatePublished, deleteMomentById} from "@/api/moment";

	export default {
		name: "MomentList",
		components: {
			Breadcrumb
		},
		data() {
			return {
				queryInfo: {
					pageNum: 1,
					pageSize: 10
				},
				momentList: [],
				total: 0,
			}
		},
		created() {
			this.getMomentList()
		},
		methods: {
			getMomentList() {
				getMomentListByQuery(this.queryInfo).then(res => {
					this.momentList = res.data.list
					this.total = res.data.total
				})
			},
			//监听 pageSize 改变事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getMomentList()
			},
			//监听页码改变的事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNum = newPage
				this.getMomentList()
			},
			momentPublishedChanged(row) {
				updatePublished(row.id, row.published).then(res => {
					this.msgSuccess(res.msg)
				})
			},
			goEditMomentPage(id) {
				this.$router.push(`/blog/moment/edit/${id}`)
			},
			handleDelete(id) {
				this.$confirm('确定删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteMomentById(id).then(res => {
						this.msgSuccess(res.msg)
						this.getMomentList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			}
		}
	}
</script>

<style scoped>
	.el-button + span {
		margin-left: 10px;
	}

	/* 基础样式 */
	.el-table {
		margin-bottom: 20px;
	}

	/* 确保内容列左对齐 */
	.el-table >>> .el-table__row td:nth-child(2) {
		text-align: left !important;
	}

	/* 内容列的单元格样式 */
	.el-table >>> .el-table__row td:nth-child(2) .cell {
		text-align: left !important;
		white-space: pre-wrap;
		word-break: break-all;
	}

	/* 移动端适配样式 */
	@media screen and (max-width: 768px) {
		/* 调整表格布局 */
		.el-table {
			font-size: 14px;
		}

		/* 优化内容列显示 */
		.el-table >>> .el-table__row td:nth-child(2) {
			text-align: left !important;
			padding: 8px;
		}

		.el-table >>> .el-table__row td:nth-child(2) .cell {
			white-space: normal;
			line-height: 1.5;
			text-align: left !important;
		}

		/* 调整表格列宽度 */
		.el-table__header th:nth-child(1),
		.el-table__row td:nth-child(1) {
			width: 40px !important;
			min-width: 40px !important;
		}

		/* 内容列显示更多 */
		.el-table__header th:nth-child(2),
		.el-table__row td:nth-child(2) {
			min-width: 350px !important;
			max-width: none !important;
			white-space: normal !important;
		}

		/* 开关列紧凑显示 */
		.el-table__header th:nth-child(3),
		.el-table__row td:nth-child(3) {
			width: 60px !important;
			min-width: 60px !important;
		}

		/* 点赞数列紧凑显示 */
		.el-table__header th:nth-child(4),
		.el-table__row td:nth-child(4) {
			width: 60px !important;
			min-width: 60px !important;
		}

		/* 创建时间列紧凑显示 */
		.el-table__header th:nth-child(5),
		.el-table__row td:nth-child(5) {
			width: 100px !important;
			min-width: 100px !important;
			font-size: 12px;
		}

		/* 操作列紧凑显示 */
		.el-table__header th:nth-child(6),
		.el-table__row td:nth-child(6) {
			width: 120px !important;
			min-width: 120px !important;
		}

		/* 调整开关和按钮大小 */
		.el-switch {
			margin: 4px 0;
		}

		.el-button--mini {
			padding: 6px 10px;
		}

		/* 调整分页器样式 */
		.el-pagination {
			text-align: center;
			margin-top: 20px;
			white-space: normal;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 5px;
		}

		/* 内容超出显示省略号 */
		.el-table .cell {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
			overflow: hidden;
		}

		/* 表格横向滚动优化 */
		.el-table__body-wrapper {
			overflow-x: auto;
		}
	}

	/* 操作按钮样式 */
	.operation-buttons {
		display: flex;
		justify-content: center;
		gap: 5px;
	}

	/* 移动端适配样式 */
	@media screen and (max-width: 768px) {
		/* 操作按钮移动端样式 */
		.operation-buttons {
			flex-direction: column;
			align-items: center;
			gap: 5px;
		}

		.operation-buttons .el-button {
			margin: 0;
			width: 80px;
		}
	}
</style>