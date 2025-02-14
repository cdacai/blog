<!-- 可复用的图片对话框组件 -->
<template>
  <div class="image-dialog" v-show="visible">
    <div class="dialog-mask" @click="handleClose"></div>
    <div class="dialog-wrapper">
      <div class="dialog-header">
        <span class="dialog-title">{{ title }}</span>
        <span class="dialog-close" @click="handleClose">&times;</span>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.image-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;

  .dialog-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .dialog-wrapper {
    position: absolute;
    top: 5px;  // 距离顶部5px
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 1200px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 10px);

    .dialog-header {
      padding: 15px 20px;
      border-bottom: 1px solid #e4e4e4;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .dialog-title {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }

      .dialog-close {
        font-size: 20px;
        color: #909399;
        cursor: pointer;
        
        &:hover {
          color: #409EFF;
        }
      }
    }

    .dialog-body {
      flex: 1;
      overflow: auto;
      padding: 20px;
    }
  }
}
</style> 