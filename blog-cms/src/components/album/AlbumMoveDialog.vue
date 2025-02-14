<!-- 移动图片对话框 -->
<template>
  <div class="dialog move-dialog" v-if="visible">
    <div class="dialog-mask" @click="handleClose"></div>
    <div class="dialog-container">
      <div class="dialog-header">
        <h3>移动到其他相册</h3>
        <button class="close-btn" @click="handleClose">×</button>
      </div>
      <div class="dialog-body">
        <el-select v-model="selectedAlbum" placeholder="请选择目标相册" class="album-select">
          <el-option
            v-for="album in filteredAlbums"
            :key="album.name"
            :label="album.name"
            :value="album.name">
          </el-option>
        </el-select>
        <div class="form-actions">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleConfirm" :disabled="!selectedAlbum">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumMoveDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    albums: {
      type: Array,
      required: true
    },
    currentAlbum: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedAlbum: ''
    }
  },
  computed: {
    filteredAlbums() {
      return this.albums.filter(album => album.name !== this.currentAlbum.name)
    }
  },
  watch: {
    visible(newVal) {
      if (!newVal) {
        this.selectedAlbum = ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleConfirm() {
      this.$emit('confirm', this.selectedAlbum)
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
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
  width: 400px;
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

.dialog-body {
  padding: 20px;
  
  .album-select {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
}
</style> 