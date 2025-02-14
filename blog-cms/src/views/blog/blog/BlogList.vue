<template>
	<div>
		<!--搜索-->
		<el-row>
			<el-col :xs="24" :sm="12" :md="8" :lg="6">
				<el-input placeholder="请输入标题" v-model="queryInfo.title" clearable>
					<el-select v-model="queryInfo.categoryId" slot="prepend" placeholder="请选择分类" clearable style="width: 120px">
						<el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-input>
			</el-col>
		</el-row>

		<el-table :data="blogList">
			<el-table-column label="序号" type="index" width="50"></el-table-column>
			<el-table-column label="标题" min-width="300">
				<template v-slot:header>
					<span style="text-align: left; display: block;">标题</span>
				</template>
				<template v-slot="scope">
					<div class="title-cell">
						<a 
							:href="`${settings.blogUrl}/blog/${scope.row.id}`" 
							target="_blank"
							class="blog-title-link"
						>{{ scope.row.title }}</a>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="分类" prop="category.name" width="100" align="center"></el-table-column>
			<el-table-column label="置顶" width="70" align="center">
				<template v-slot="scope">
					<el-switch v-model="scope.row.top" @change="blogTopChanged(scope.row)"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="推荐" width="70" align="center">
				<template v-slot="scope">
					<el-switch v-model="scope.row.recommend" @change="blogRecommendChanged(scope.row)"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="可见性" width="80" align="center">
				<template v-slot="scope">
					<el-button size="mini" :type="scope.row.published ? 'success' : 'warning'"
					           @click="showBlog(scope.row)">{{scope.row.published ? '公开' : '私密'}}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="150" align="center">
				<template v-slot="scope">{{ scope.row.createTime | dateFormat }}</template>
			</el-table-column>
			<el-table-column label="更新时间" width="150" align="center">
				<template v-slot="scope">{{ scope.row.updateTime | dateFormat }}</template>
			</el-table-column>
			<el-table-column label="操作" width="150" align="center" fixed="right">
				<template v-slot="scope">
					<div class="operation-buttons">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="goBlogEditPage(scope.row.id)">编辑</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteBlogById(scope.row.id)">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>

		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum"
		               :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.pageSize" :total="total"
		               layout="total, sizes, prev, pager, next, jumper" background>
		</el-pagination>

		<!--编辑可见性状态对话框-->
		<el-dialog title="博客可见性" width="30%" :visible.sync="dialogVisible">
			<!--内容主体-->
			<el-form label-width="50px" @submit.native.prevent>
				<el-form-item>
					<el-radio-group v-model="radio">
						<el-radio :label="1">公开</el-radio>
						<el-radio :label="2">私密</el-radio>
						<el-radio :label="3">密码保护</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="密码" v-if="radio===3">
					<el-input v-model="visForm.password"></el-input>
				</el-form-item>
				<el-form-item v-if="radio!==2">
					<el-row>
						<el-col :span="6">
							<el-switch v-model="visForm.appreciation" active-text="赞赏"></el-switch>
						</el-col>
						<el-col :span="6">
							<el-switch v-model="visForm.recommend" active-text="推荐"></el-switch>
						</el-col>
						<el-col :span="6">
							<el-switch v-model="visForm.commentEnabled" active-text="评论"></el-switch>
						</el-col>
						<el-col :span="6">
							<el-switch v-model="visForm.top" active-text="置顶"></el-switch>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<!--底部-->
			<span slot="footer">
				<el-button @click="dialogVisible=false">取 消</el-button>
				<el-button type="primary" @click="saveVisibility">保存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Breadcrumb from "@/components/Breadcrumb";
	import {getDataByQuery, deleteBlogById, updateTop, updateRecommend, updateVisibility} from '@/api/blog'
	import settings from '@/settings'

	export default {
		name: "BlogList",
		components: {Breadcrumb},
		data() {
			return {
				queryInfo: {
					title: '',
					categoryId: null,
					pageNum: 1,
					pageSize: 10
				},
				blogList: [],
				categoryList: [],
				total: 0,
				dialogVisible: false,
				blogId: 0,
				radio: 1,
				visForm: {
					appreciation: false,
					recommend: false,
					commentEnabled: false,
					top: false,
					published: false,
					password: '',
				},
				settings
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				getDataByQuery(this.queryInfo).then(res => {
					this.blogList = res.data.blogs.list
					this.categoryList = res.data.categories
					this.total = res.data.blogs.total
				})
			},
			search() {
				this.queryInfo.pageNum = 1
				this.queryInfo.pageSize = 10
				this.getData()
			},
			//切换博客置顶状态
			blogTopChanged(row) {
				updateTop(row.id, row.top).then(res => {
					this.msgSuccess(res.msg);
				})
			},
			//切换博客推荐状态
			blogRecommendChanged(row) {
				updateRecommend(row.id, row.recommend).then(res => {
					this.msgSuccess(res.msg);
				})
			},
			//编辑博客可见性
			editBlogVisibility(row) {
				this.visForm = {
					appreciation: row.appreciation,
					recommend: row.recommend,
					commentEnabled: row.commentEnabled,
					top: row.top,
					published: row.published,
					password: row.password,
				}
				this.blogId = row.id
				this.radio = this.visForm.published ? (this.visForm.password !== '' ? 3 : 1) : 2
				this.dialogVisible = true
			},
			//修改博客可见性
			saveVisibility() {
				if (this.radio === 3 && (this.visForm.password === '' || this.visForm.password === null)) {
					return this.msgError("密码保护模式必须填写密码！")
				}
				if (this.radio === 2) {
					this.visForm.appreciation = false
					this.visForm.recommend = false
					this.visForm.commentEnabled = false
					this.visForm.top = false
					this.visForm.published = false
				} else {
					this.visForm.published = true
				}
				if (this.radio !== 3) {
					this.visForm.password = ''
				}
				updateVisibility(this.blogId, this.visForm).then(res => {
					this.msgSuccess(res.msg)
					this.getData()
					this.dialogVisible = false
				})
			},
			//监听 pageSize 改变事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getData()
			},
			//监听页码改变的事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNum = newPage
				this.getData()
			},
			goBlogEditPage(id) {
				this.$router.push(`/blog/edit/${id}`)
			},
			deleteBlogById(id) {
				this.$confirm('此操作将永久删除该博客<strong style="color: red">及其所有评论</strong>，是否删除?<br>建议将博客置为<strong style="color: red">私密</strong>状态！', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					deleteBlogById(id).then(res => {
						this.msgSuccess(res.msg)
						this.getData()
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

	/* 搜索区域基础样式 */
	.el-row {
		margin-bottom: 20px;
	}

	.el-input {
		width: 100%;
	}

	/* 移动端适配样式 */
	@media screen and (max-width: 768px) {
		/* 搜索区域移动端样式 */
		.el-col {
			width: 100% !important;
		}

		.el-input {
			min-width: auto !important;
		}

		/* 调整表格布局 */
		.el-table {
			font-size: 14px;
		}

		/* 确保标题列有足够空间显示 */
		.el-table .cell {
			white-space: normal;
			line-height: 1.5;
		}

		/* 优化表格列宽度 */
		.el-table__header th:nth-child(1),
		.el-table__row td:nth-child(1) {
			width: 40px !important;
			min-width: 40px !important;
		}

		/* 标题列给予最大空间 */
		.el-table__header th:nth-child(2),
		.el-table__row td:nth-child(2) {
			min-width: 300px !important;
			max-width: none !important;
		}

		/* 分类列紧凑显示 */
		.el-table__header th:nth-child(3),
		.el-table__row td:nth-child(3) {
			width: 80px !important;
			min-width: 80px !important;
		}

		/* 置顶和推荐列紧凑显示 */
		.el-table__header th:nth-child(4),
		.el-table__row td:nth-child(4),
		.el-table__header th:nth-child(5),
		.el-table__row td:nth-child(5) {
			width: 60px !important;
			min-width: 60px !important;
		}

		/* 可见性列紧凑显示 */
		.el-table__header th:nth-child(6),
		.el-table__row td:nth-child(6) {
			width: 70px !important;
			min-width: 70px !important;
		}

		/* 时间列紧凑显示 */
		.el-table__header th:nth-child(7),
		.el-table__row td:nth-child(7),
		.el-table__header th:nth-child(8),
		.el-table__row td:nth-child(8) {
			width: 100px !important;
			min-width: 100px !important;
			font-size: 12px;
		}

		/* 操作列紧凑显示 */
		.el-table__header th:nth-child(9),
		.el-table__row td:nth-child(9) {
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

		/* 调整搜索框布局 */
		.el-input-group__prepend {
			width: 120px !important;
		}

		.el-select {
			width: 120px !important;
		}

		/* 表格横向滚动优化 */
		.el-table__body-wrapper {
			overflow-x: auto;
		}

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

	/* 平板适配样式 */
	@media screen and (min-width: 769px) and (max-width: 1024px) {
		:deep(.el-table) {
			font-size: 13px;
		}

		:deep(.el-table .cell) {
			padding: 8px;
		}

		.el-input {
			min-width: 400px !important;
		}
	}

	/* 大屏幕优化 */
	@media screen and (min-width: 1025px) {
		.el-input {
			min-width: 500px;
		}
	}

	/* 操作按钮样式 */
	.operation-buttons {
		display: flex;
		justify-content: center;
		gap: 5px;
	}

	/* 标题列样式 */
	:deep(.el-table .el-table__cell:nth-child(2)) {
		text-align: left !important;
	}
	:deep(.el-table .el-table__cell:nth-child(2) .cell) {
		text-align: left !important;
	}

	.title-cell {
		text-align: left;
		padding: 5px 0;
		line-height: 1.4;
	}

	.blog-title-link {
		color: #409EFF;
		text-decoration: none;
	}
	.blog-title-link:hover {
		text-decoration: underline;
	}
</style>