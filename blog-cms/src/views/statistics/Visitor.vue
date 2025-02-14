<template>
	<div>
		<!--搜索-->
		<el-form inline>
			<el-form-item label="最后访问时间">
				<DateTimeRangePicker :date="queryInfo.date" :setDate="setDate"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="visitorList">
			<el-table-column label="序号" type="index" width="50" align="left"></el-table-column>
			<el-table-column label="IP来源" prop="ipSource" width="200" align="left"></el-table-column>
			<el-table-column label="设备信息" width="280" align="left">
				<template v-slot="scope">
					<el-tooltip effect="dark" :content="scope.row.userAgent" placement="top">
						<span v-if="scope.row.deviceType && scope.row.deviceType.toLowerCase().includes('phone')">
							<i class="el-icon-mobile-phone" style="color: #E6A23C; font-size: 18px; text-shadow: 0 0 1px #E6A23C;"></i>
							{{ formatDeviceInfo(scope.row) }}
						</span>
						<span v-else>
							<i class="el-icon-monitor" style="color: #909399; font-size: 16px;"></i>
							{{ formatDeviceInfo(scope.row) }}
						</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column label="IP" prop="ip" width="130" align="left"></el-table-column>
			<el-table-column width="170" align="left">
				<template slot="header" slot-scope="scope">
					最后访问
					<el-tooltip effect="dark" content="每日凌晨自动更新" placement="top"><i class="el-icon-question"></i></el-tooltip>
				</template>
				<template v-slot="scope">{{ scope.row.lastTime | dateFormat }}</template>
			</el-table-column>
			<el-table-column prop="pv" width="70" align="left">
				<template slot="header" slot-scope="scope">
					PV
					<el-tooltip effect="dark" content="访客总浏览量，每日凌晨自动更新" placement="top"><i class="el-icon-question"></i></el-tooltip>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200" align="left">
				<template v-slot="scope">
					<el-button type="warning" icon="el-icon-view" size="mini" @click="showLog(scope.row.uuid)">查看记录</el-button>
					<el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @onConfirm="deleteVisitorById(scope.row)">
						<el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
					</el-popconfirm>
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
	import {getVisitorList, deleteVisitor} from "@/api/visitor";
	import DateTimeRangePicker from "@/components/DateTimeRangePicker";

	export default {
		name: "Visitor",
		components: {DateTimeRangePicker, Breadcrumb},
		data() {
			return {
				queryInfo: {
					date: [],
					pageNum: 1,
					pageSize: 10
				},
				visitorList: [],
				total: 0
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				let query = {...this.queryInfo}
				if (query.date && query.date.length === 2) {
					query.date = query.date[0] + ',' + query.date[1]
				}
				getVisitorList(query).then(res => {
					this.visitorList = res.data.list
					this.total = res.data.total
				})
			},
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getData()
			},
			handleCurrentChange(newPage) {
				this.queryInfo.pageNum = newPage
				this.getData()
			},
			deleteVisitorById(visitor) {
				deleteVisitor(visitor.id, visitor.uuid).then(res => {
					this.msgSuccess(res.msg)
					this.getData()
				})
			},
			showLog(uuid) {
				this.$router.push({
					path: '/log/visit',
					query: {
						uuid
					}
				})
			},
			search() {
				this.queryInfo.pageNum = 1
				this.queryInfo.pageSize = 10
				this.getData()
			},
			setDate(value) {
				this.queryInfo.date = value
			},
			formatDeviceInfo(row) {
				if (row.deviceType && row.deviceType.toLowerCase().includes('phone')) {
					// 移动设备
					return `${row.deviceBrand || ''} ${row.deviceModel || ''} (${row.os || ''})`.trim();
				} else {
					// PC设备
					return `${row.os || ''} / ${row.browser || ''}`.trim();
				}
			}
		}
	}
</script>

<style scoped>
	.el-button + span {
		margin-left: 10px;
	}

	.el-form--inline .el-form-item {
		margin-bottom: 0;
	}

	/deep/ .el-table .cell {
		text-align: left;
	}

	/deep/ .el-table th {
		text-align: left;
	}

	/* 移动端适配样式 */
	@media screen and (max-width: 768px) {
		/* 搜索表单适配 */
		.el-form--inline {
			display: flex;
			flex-direction: column;
			align-items: stretch;
		}

		.el-form--inline .el-form-item {
			margin-right: 0;
			margin-bottom: 10px;
			width: 100%;
		}

		.el-form--inline .el-form-item__content {
			width: 100%;
		}

		/* 表格适配 */
		/deep/ .el-table {
			width: 100%;
			font-size: 12px;
		}

		/deep/ .el-table .cell {
			padding: 5px;
			line-height: 1.3;
		}

		/* 调整列宽和显示 */
		/deep/ .el-table__header th,
		/deep/ .el-table__row td {
			min-width: auto !important;
		}

		/* 序号列 */
		/deep/ .el-table__row td:first-child {
			padding-left: 5px;
			width: 40px !important;
		}

		/* IP来源列 */
		/deep/ .el-table__row td:nth-child(2) {
			width: auto !important;
			max-width: 120px;
		}

		/* 设备信息列 */
		/deep/ .el-table__row td:nth-child(3) {
			width: auto !important;
		}

		/* IP列 */
		/deep/ .el-table__row td:nth-child(4) {
			width: auto !important;
		}

		/* 最后访问列 */
		/deep/ .el-table__row td:nth-child(5) {
			width: auto !important;
		}

		/* PV列 */
		/deep/ .el-table__row td:nth-child(6) {
			width: 50px !important;
		}

		/* 操作列 */
		/deep/ .el-table__row td:last-child {
			width: auto !important;
		}

		/* 文字溢出处理 */
		/deep/ .el-table .cell {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* 操作按钮适配 */
		/deep/ .el-table .el-button--mini {
			padding: 4px 8px;
			font-size: 11px;
		}

		/deep/ .el-table .el-button--mini + .el-button--mini {
			margin-left: 4px;
		}

		/* 分页组件适配 */
		.el-pagination {
			padding: 10px 5px;
			text-align: center;
			white-space: normal;
		}

		/deep/ .el-pagination .el-select .el-input {
			width: 80px;
		}

		/deep/ .el-pagination__sizes {
			margin-right: 5px;
		}

		/deep/ .el-pagination__jump {
			margin-left: 5px;
		}

		/* 设备图标适配 */
		/deep/ .el-icon-mobile-phone,
		/deep/ .el-icon-monitor {
			margin-right: 3px;
		}

		/* tooltip适配 */
		/deep/ .el-tooltip__popper {
			max-width: 90vw;
		}
	}

	/* 平板适配样式 */
	@media screen and (min-width: 769px) and (max-width: 1024px) {
		/deep/ .el-table {
			font-size: 13px;
		}

		/deep/ .el-table .cell {
			padding: 8px;
		}
	}
</style>