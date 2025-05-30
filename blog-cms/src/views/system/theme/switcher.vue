<template>
  <div class="theme-switcher">
    <!-- 主题预览区 -->
    <div class="theme-preview" :style="previewStyle">
      <div class="preview-header">
        <h1>博客标题</h1>
        <nav>导航菜单</nav>
      </div>
      <div class="preview-content">
        <div class="article-card">
          <h2>文章标题</h2>
          <p>文章内容预览...</p>
        </div>
      </div>
    </div>
    <!-- 主题选择区 -->
    <div class="theme-controls">
      <div class="theme-list">
        <div 
          v-for="(theme, name) in themes" 
          :key="name"
          :class="['theme-item', { active: selectedTheme === name }]"
          @click="selectTheme(name)"
        >
          <div class="theme-colors">
            <span :style="{ background: theme.primaryColor }"></span>
            <span :style="{ background: theme.background }"></span>
            <span :style="{ background: theme.textColor }"></span>
          </div>
          <span class="theme-name">{{ theme.name }}</span>
        </div>
      </div>
      <div class="theme-actions">
        <el-button type="primary" @click="saveTheme">保存设置</el-button>
        <el-button @click="resetTheme">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const themePresets = {
  theme1: {
    name: '绿色主题',
    primaryColor: '#2F855A',
    background: '#fff',
    textColor: '#222'
  },
  theme2: {
    name: '深色主题',
    primaryColor: '#222',
    background: '#181818',
    textColor: '#fff'
  }
}

export default {
  data() {
    return {
      themes: themePresets,
      selectedTheme: 'theme1',
      currentTheme: 'theme1',
      token: '',
      loading: false
    }
  },
  computed: {
    previewStyle() {
      const t = this.themes[this.selectedTheme]
      return {
        '--primary-color': t.primaryColor,
        '--background': t.background,
        '--text-color': t.textColor,
        background: t.background,
        color: t.textColor
      }
    }
  },
  methods: {
    selectTheme(name) {
      this.selectedTheme = name
    },
    async saveTheme() {
      this.loading = true
      try {
        const config = {
          theme: this.selectedTheme,
          primaryColor: this.themes[this.selectedTheme].primaryColor,
          background: this.themes[this.selectedTheme].background,
          textColor: this.themes[this.selectedTheme].textColor
        }
        await axios.post('/admin/theme', JSON.stringify(config), {
          headers: { Authorization: this.token, 'Content-Type': 'application/json' }
        })
        this.$message.success('主题设置已保存')
        window.parent.postMessage('themeUpdated', '*')
        this.currentTheme = this.selectedTheme
      } catch (e) {
        this.$message.error('保存失败')
      } finally {
        this.loading = false
      }
    },
    resetTheme() {
      this.selectedTheme = this.currentTheme
    },
    async fetchCurrentTheme() {
      try {
        const res = await axios.get('/api/theme')
        let config = res.data
        if (typeof config === 'string') config = JSON.parse(config)
        this.selectedTheme = config.theme || 'theme1'
        this.currentTheme = config.theme || 'theme1'
      } catch (e) {
        this.selectedTheme = 'theme1'
        this.currentTheme = 'theme1'
      }
    }
  },
  created() {
    // 获取token
    const urlParams = new URLSearchParams(window.location.search)
    this.token = urlParams.get('token') || ''
    axios.defaults.headers.common['Authorization'] = this.token
    this.fetchCurrentTheme()
  }
}
</script>

<style scoped>
.theme-switcher {
  display: flex;
  gap: 32px;
  margin: 24px;
}
.theme-preview {
  flex: 1;
  min-width: 320px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 24px;
  background: var(--background);
  color: var(--text-color);
  transition: background 0.3s, color 0.3s;
}
.theme-controls {
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.theme-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.theme-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #eee;
  transition: border 0.2s;
}
.theme-item.active {
  border: 2px solid var(--primary-color, #2F855A);
}
.theme-colors span {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 4px;
  border: 1px solid #ccc;
}
.theme-name {
  font-weight: bold;
}
.theme-actions {
  display: flex;
  gap: 12px;
}
</style> 