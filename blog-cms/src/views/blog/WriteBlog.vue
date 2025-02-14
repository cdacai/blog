export default {
  data() {
    return {
      showAlbumDialog: false,
      // ... 其他 data
    }
  },
  methods: {
    // 显示相册管理器
    showAlbumManager() {
      this.showAlbumDialog = true;
    }
  }
}

// 在模板中传递数据给AlbumManager组件
<album-manager
  v-if="showAlbumDialog"
  @close="showAlbumDialog = false"
/> 