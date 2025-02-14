<template>
  <div class="loading-overlay">
    <div class="loading-spinner">
      <i class="el-icon-loading"></i>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    text: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 100;
}

.loading-spinner {
  text-align: center;
  
  i {
    font-size: 32px;
    color: #409EFF;
    margin-bottom: 10px;
  }
  
  p {
    color: #606266;
    margin: 0;
    font-size: 14px;
  }
}
</style> 