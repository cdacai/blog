<template>
  <div>
    <el-card>
      <!-- 表格 -->
      <el-table :data="reportList" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="60"></el-table-column>
        <el-table-column label="举报内容" width="200">
          <template v-slot="scope">
            <el-popover trigger="hover" placement="top">
              <div style="max-width: 300px">{{ scope.row.content }}</div>
              <div slot="reference" class="truncate">{{ scope.row.content }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="被举报评论" width="200">
          <template v-slot="scope">
            <el-popover trigger="hover" placement="top">
              <div style="max-width: 300px">{{ scope.row.commentContent }}</div>
              <div slot="reference" class="truncate">{{ scope.row.commentContent }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="举报人邮箱" width="180"></el-table-column>
        <el-table-column prop="phone" label="举报人手机" width="120"></el-table-column>
        <el-table-column label="举报人IP" width="180">
          <template v-slot="scope">
            <span>{{ scope.row.ip }} ({{ scope.row.ipSource }})</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="举报时间" width="170"></el-table-column>
        <el-table-column label="状态" width="100">
          <template v-slot="scope">
            <el-tag :type="scope.row.status === 0 ? 'warning' : 'success'">
              {{ scope.row.status === 0 ? '未处理' : '已处理' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="handleReport(scope.row)" 
                       :disabled="scope.row.status === 1">
              处理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 处理举报对话框 -->
    <el-dialog title="处理举报" :visible.sync="dialogVisible" width="30%">
      <el-form :model="handleForm" label-width="80px">
        <el-form-item label="处理结果">
          <el-input type="textarea" v-model="handleForm.handleResult" 
                    :rows="3" placeholder="请输入处理结果"></el-input>
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
export default {
  data() {
    return {
      reportList: [],
      dialogVisible: false,
      handleForm: {
        id: null,
        handleResult: ''
      }
    }
  },
  created() {
    this.getReportList()
  },
  methods: {
    getReportList() {
      this.$axios.get('/admin/comments/reports').then(res => {
        if (res.code === 200) {
          this.reportList = res.data
        } else {
          this.msgError(res.msg)
        }
      })
    },
    handleReport(row) {
      this.handleForm.id = row.id
      this.handleForm.handleResult = ''
      this.dialogVisible = true
    },
    submitHandle() {
      if (!this.handleForm.handleResult) {
        this.msgError('请输入处理结果')
        return
      }
      this.$axios.put(`/admin/comments/report/${this.handleForm.id}`, {
        handleResult: this.handleForm.handleResult
      }).then(res => {
        if (res.code === 200) {
          this.msgSuccess('处理成功')
          this.dialogVisible = false
          this.getReportList()
        } else {
          this.msgError(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 