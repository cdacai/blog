<!-- 创建/编辑相册对话框 -->
<template>
  <div class="dialog album-dialog" v-if="visible">
    <div class="dialog-mask" @click="handleClose"></div>
    <div class="dialog-container">
      <div class="dialog-header">
        <h3>{{ editingAlbum ? '编辑相册' : '创建相册' }}</h3>
        <button class="close-btn" @click="handleClose">×</button>
      </div>
      <div class="dialog-body">
        <el-form ref="albumForm" :model="form" :rules="rules" class="album-form" @submit.native.prevent>
          <el-form-item label="相册名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入相册名称"></el-input>
          </el-form-item>
          <el-form-item label="相册描述" prop="description">
            <el-input type="textarea" v-model="form.description" placeholder="请输入相册描述" :rows="3"></el-input>
          </el-form-item>
          <div class="form-actions">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumCreateEditDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editingAlbum: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入相册名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        description: [
          { max: 200, message: '长度不能超过 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.initForm()
      }
    }
  },
  methods: {
    initForm() {
      if (this.editingAlbum) {
        this.form = {
          name: this.editingAlbum.name,
          description: this.editingAlbum.description
        }
      } else {
        this.form = {
          name: '',
          description: ''
        }
      }
    },
    async handleSubmit() {
      try {
        const valid = await this.$refs.albumForm.validate()
        if (!valid) return
        
        this.$emit('submit', { ...this.form })
      } catch (error) {
        console.error('表单验证失败:', error)
      }
    },
    handleClose() {
      this.$refs.albumForm?.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  padding: 20px;
  
  .album-form {
    .el-form-item {
      margin-bottom: 20px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 30px;
    }
  }
}

// 继承原有的dialog相关样式
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-container {
  position: relative;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin: 0;
  width: 500px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.dialog-header {
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-size: 16px;
    color: #303133;
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #909399;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #f56c6c;
  }
}
</style> 