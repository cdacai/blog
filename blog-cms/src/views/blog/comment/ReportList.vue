<template>
  <div>
    <el-card>
      <el-table :data="reportList" stripe>
        <el-table-column prop="id" label="ID" width="60"/>
        <el-table-column label="举报内容" min-width="120">
          <template v-slot="scope">
            <el-popover trigger="hover" placement="top">
              <div style="max-width: 300px">{{ scope.row.content }}</div>
              <div slot="reference" class="truncate">{{ scope.row.content }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="blogTitle" label="所属文章" min-width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click="openBlog(scope.row)">
              {{ scope.row.blogTitle || '未知文章' }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="被举报评论" min-width="120">
          <template v-slot="scope">
            <el-popover trigger="hover" placement="top">
              <div style="max-width: 300px">
                {{ scope.row.commentId ? scope.row.commentContent : '评论已删除' }}
              </div>
              <div slot="reference" class="truncate">
                {{ scope.row.commentId ? scope.row.commentContent : '评论已删除' }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="举报人邮箱" width="180"/>
        <el-table-column prop="phone" label="手机" width="100"/>
        <el-table-column label="举报人IP" width="180">
          <template v-slot="scope">
            <span>{{ scope.row.ip }} ({{ scope.row.ipSource }})</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="举报时间" width="170">
          <template v-slot="scope">{{ scope.row.createTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template v-slot="scope">
            <el-tag :type="getStatusType(scope.row)">
              {{ scope.row.status === 1 || !scope.row.commentId ? '已处理' : '未处理' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template v-slot="scope">
            <div class="operation-btns">
              <el-button 
                type="primary" 
                size="mini" 
                @click="handleReport(scope.row)"
                :disabled="scope.row.status === 1 || !scope.row.commentId"
                style="margin-bottom: 5px">
                处理
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="deleteReport(scope.row)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        style="margin-top: 20px; text-align: right">
      </el-pagination>
    </el-card>

    <el-dialog title="处理举报" :visible.sync="dialogVisible" width="30%">
      <div class="report-detail">
        <div class="detail-item">
          <label>举报内容：</label>
          <div>{{ currentReport.content }}</div>
        </div>
        <div class="detail-item">
          <label>被举报评论：</label>
          <div>{{ currentReport.commentId ? currentReport.commentContent : '评论已删除' }}</div>
        </div>
      </div>
      <el-form :model="handleForm" label-width="80px">
        <el-form-item label="处理方式">
          <el-radio-group v-model="handleForm.action">
            <el-radio label="invalid">举报无效</el-radio>
            <el-radio label="delete" :disabled="!currentReport.commentId">删除评论</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理结果">
          <el-input 
            type="textarea" 
            v-model="handleForm.handleResult"
            :placeholder="handleForm.action === 'other' ? '请输入具体处理结果' : '可选填'"
            :rows="3"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCommentReportList, handleCommentReport, deleteCommentReport } from '@/api/comment'
import settings from '@/settings'

export default {
  name: 'ReportList',
  data() {
    return {
      settings,
      reportList: [],
      dialogVisible: false,
      currentReport: {},
      handleForm: {
        id: null,
        action: 'ignore',
        handleResult: ''
      },
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    this.getReportList()
  },
  methods: {
    getReportList() {
      getCommentReportList(this.queryInfo).then(res => {
        if (res.code === 200) {
          this.reportList = res.data.list
          this.total = res.data.total
        } else {
          this.msgError(res.msg)
        }
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getReportList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getReportList()
    },
    handleReport(row) {
      let commentUrl
      if (row.blogId && row.commentId) {
        commentUrl = `${settings.blogUrl}/blog/${row.blogId}#comment-${row.commentId}`
      } else if (row.commentId) {
        commentUrl = `${settings.blogUrl}/about#comment-${row.commentId}`
      }

      this.currentReport = row
      this.handleForm.id = row.id
      this.handleForm.action = 'ignore'
      this.handleForm.handleResult = ''
      this.dialogVisible = true
    },
    submitHandle() {
      if (!this.handleForm.action) {
        this.$message.warning('请选择处理方式')
        return
      }

      let result = ''
      switch(this.handleForm.action) {
        case 'invalid':
          result = this.handleForm.handleResult || '举报内容不构成违规，审核无效'
          break
        case 'delete':
          result = this.handleForm.handleResult || '评论内容违规，已删除处理'
          break
        default:
          this.$message.warning('无效的处理方式')
          return
      }
      
      this.$confirm('确认处理该举报吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handleCommentReport(this.handleForm.id, {
          handleResult: result,
          action: this.handleForm.action
        }).then(res => {
          if (res.code === 200) {
            this.$message.success('处理成功')
            this.dialogVisible = false
            const row = this.reportList.find(item => item.id === this.handleForm.id)
            if (row) {
              row.status = 1
              row.handleResult = result
              row.handleTime = new Date()
              if (this.handleForm.action === 'delete') {
                row.commentId = null
                row.commentContent = '评论已删除'
              }
            }
          } else {
            this.$message.error(res.msg || '处理失败')
          }
        }).catch(error => {
          console.error('处理举报失败:', error)
          this.$message.error('处理失败：' + (error.response?.data?.msg || '服务器错误'))
        })
      }).catch(() => {
        // 用户取消操作
      })
    },
    openBlog(row) {
      let url
      if (row.blogId && row.commentId) {
        // 博客文章评论
        url = `${settings.blogUrl}/blog/${row.blogId}#comment-${row.commentId}`
      } else if (row.commentId) {
        // 独立页面评论 - 目前只有关于我页面
        url = `${settings.blogUrl}/about#comment-${row.commentId}`
      } else {
        // 评论已删除的情况
        if (row.blogId) {
          url = `${settings.blogUrl}/blog/${row.blogId}`
        } else {
          url = `${settings.blogUrl}/about`
        }
      }
      window.open(url, '_blank')
    },
    deleteReport(row) {
      this.$confirm('确认删除这条举报记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCommentReport(row.id).then(res => {
          if (res.code === 200) {
            this.msgSuccess('删除成功')
            this.getReportList()
          } else {
            this.msgError(res.msg)
          }
        })
      }).catch(() => {})
    },
    getStatusType(row) {
      return (row.status === 1 || !row.commentId) ? 'success' : 'warning'
    }
  }
}
</script>

<style scoped>
.operation-btns {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.operation-btns .el-button {
  width: 55px;
  padding: 5px 0;
  margin-left: 0;
}

.operation-btns .el-button + .el-button {
  margin-left: 0;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-card {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 20px;
}

:target {
  background-color: #fff3f3;
  border-radius: 4px;
  transition: background-color 0.5s;
}

.report-detail {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 4px;
}

.detail-item {
  margin-bottom: 10px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item label {
  font-weight: bold;
  margin-right: 10px;
}
</style>