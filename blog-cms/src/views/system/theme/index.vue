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