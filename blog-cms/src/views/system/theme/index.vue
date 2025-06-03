<template>
  <div class="theme-setting">
    <el-card>
      <div slot="header">
        <span>主题设置</span>
      </div>
      <iframe 
        :src="themeSwitcherUrl" 
        frameborder="0"
        class="theme-iframe"
      ></iframe>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themeSwitcherUrl: ''
    }
  },
  created() {
    // 兼容vuex和localStorage
    const token = this.$store.getters.token || localStorage.getItem('token')
    this.themeSwitcherUrl = `http://localhost:8080/new?token=${token}`
  },
  mounted() {
    this._themeMsgHandler = (event) => {
      // 可加origin校验
      const data = event.data
      if (data && data.type === 'theme-save') {
        if (data.status === 'success') {
          this.$message.success(data.msg || '主题保存成功')
        } else {
          this.$message.error(data.msg || '保存失败')
        }
      }
    }
    window.addEventListener('message', this._themeMsgHandler)
  },
  beforeDestroy() {
    window.removeEventListener('message', this._themeMsgHandler)
  }
}
</script>

<style scoped>
.theme-iframe {
  width: 100%;
  height: 600px;
  border: none;
}
</style> 