<template>
  <el-dialog 
    title="举报评论" 
    :visible.sync="visible"
    :width="dialogWidth"
    :before-close="handleClose"
    center
    append-to-body
    custom-class="report-dialog">
    <el-form :model="reportForm" :rules="reportRules" ref="reportFormRef" :label-width="formLabelWidth">
      <div class="form-content">
        <el-form-item label="举报对象：">
          <quoted-text
            :content="reportForm.targetContent"
            placeholder="评论内容"
          />
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="reportForm.phone" placeholder="请输入手机号(选填)"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="reportForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="举报内容：" prop="content" class="last-form-item">
          <el-input
            type="textarea"
            v-model="reportForm.content"
            :rows="4"
            :maxlength="500"
            show-word-limit
            placeholder="请输入举报内容">
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitReport">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { checkEmail } from "@/common/reg";
import QuotedText from '@/components/common/QuotedText.vue'
import { reportComment } from "@/api/comment";
import { filterXSS } from '@/util/xss'

export default {
  name: 'ReportDialog',
  components: { QuotedText },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    commentContent: {
      type: String,
      default: ''
    },
    commentId: {
      type: Number,
      default: null
    },
    blogId: {
      type: Number,
      default: null
    },
    blogTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reportForm: {
        commentId: null,
        targetContent: '',
        phone: '',
        email: '',
        content: ''
      },
      reportRules: {
        email: [
          { required: true, message: '请输入邮箱地址' },
          { validator: checkEmail }
        ],
        content: [
          { required: true, message: '请输入举报内容' },
          { min: 1, max: 500, message: '举报内容长度在 1 到 500 个字符' }
        ],
        phone: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      },
      dialogWidth: window.innerWidth <= 768 ? '90%' : '35%',
      formLabelWidth: window.innerWidth <= 768 ? '70px' : '90px'
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    visible(val) {
      if (val) {
        this.reportForm.commentId = this.commentId
        this.reportForm.targetContent = `"${this.commentContent}"`
      }
    }
  },
  methods: {
    handleResize() {
      this.dialogWidth = window.innerWidth <= 768 ? '90%' : '35%'
      this.formLabelWidth = window.innerWidth <= 768 ? '70px' : '90px'
    },
    handleClose() {
      this.$refs.reportFormRef.resetFields()
      this.$emit('update:visible', false)
    },
    submitReport() {
      // 如果是关于我页面，特殊处理
      if (this.blogId === null) {
        const reportData = {
          commentId: this.commentId,
          commentContent: this.commentContent,
          blogId: null,
          blogTitle: '关于我',
          content: filterXSS(this.reportForm.content),
          email: this.reportForm.email,
          phone: this.reportForm.phone || ''
        }
        this.$refs.reportFormRef.validate(valid => {
          if (valid) {
            reportComment(reportData).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.handleClose()
              } else {
                this.$message.error(res.msg)
              }
            }).catch(() => {
              this.$message.error('提交失败')
            })
          }
        })
        return
      }
      
      // 普通博客页面
      const reportData = {
        commentId: this.commentId,
        commentContent: this.commentContent,
        blogId: this.blogId,
        blogTitle: this.blogTitle,
        content: filterXSS(this.reportForm.content),
        email: this.reportForm.email,
        phone: this.reportForm.phone || ''
      }
      this.$refs.reportFormRef.validate(valid => {
        if (valid) {
          reportComment(reportData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.handleClose()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.$message.error('提交失败')
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.report-dialog {
	border-radius: 8px;
	background-color: var(--theme-card-bg, #fff);
}

.form-content {
	padding: 0 20px;
}

.last-form-item {
	margin-bottom: 0;
}

.dialog-footer {
	text-align: center;
	margin-top: 20px;
}

/* 修改按钮样式 */
.el-button--primary {
	background-color: var(--primary-color, #2F855A);
	border-color: var(--primary-color, #2F855A);
	color: #fff;
}

.el-button--primary:hover,
.el-button--primary:focus {
	background-color: var(--primary-color, #276749);
	border-color: var(--primary-color, #276749);
	color: #fff;
}

/* 全局弹窗样式 */
:deep(.el-dialog) {
	max-width: 90%;
	margin: 0 auto !important;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-height: 90vh;
	display: flex;
	flex-direction: column;
	background-color: var(--theme-card-bg, #fff);
}

:deep(.el-dialog__body) {
	overflow-y: auto;
	flex: 1;
	padding: 20px !important;
}

:deep(.el-form-item__label) {
	color: #4a5568;
	line-height: 1.5;
	padding-bottom: 4px;
}

:deep(.el-input__inner),
:deep(.el-textarea__inner) {
	border-color: #e2e8f0;
}

:deep(.el-input__inner:focus),
:deep(.el-textarea__inner:focus) {
	border-color: #2F855A;
	box-shadow: 0 0 0 2px rgba(47, 133, 90, 0.1);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
	.form-content {
		padding: 0 10px;
	}

	:deep(.el-dialog) {
		width: 90% !important;
		margin: 10vh auto !important;
	}

	:deep(.el-dialog__body) {
		padding: 15px 10px !important;
	}

	:deep(.el-form-item) {
		margin-bottom: 15px;
	}

	:deep(.el-form-item__label) {
		font-size: 14px;
		margin-bottom: 4px;
	}

	:deep(.el-input__inner),
	:deep(.el-textarea__inner) {
		font-size: 14px;
	}

	:deep(.el-form-item__error) {
		font-size: 12px;
	}

	.dialog-footer {
		margin-top: 15px;
	}

	.dialog-footer .el-button {
		padding: 8px 15px;
		font-size: 14px;
	}

	:deep(.el-dialog__title) {
		font-size: 16px;
	}

	:deep(.el-dialog__headerbtn) {
		font-size: 18px;
	}
}
</style> 