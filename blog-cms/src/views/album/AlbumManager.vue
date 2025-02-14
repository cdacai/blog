<template>
  <div class="album-manager-wrapper">
    <!-- 遮罩层 -->
    <div class="album-manager-mask" @click="close"></div>
    
    <!-- 主容器 -->
    <div class="album-manager">
      <!-- 标题栏 -->
      <div class="album-manager-header">
        <div class="header-left">
          <h3>相册管理</h3>
        </div>
        <div class="header-right">
          <button class="upload-btn" @click="showCreateAlbumDialog">
            <i class="el-icon-plus"></i>
            创建相册
          </button>
          <button class="close-btn" @click="close">×</button>
        </div>
      </div>
      
      <!-- 相册列表区域 -->
      <div class="album-manager-content">
        <div class="album-list">
          <!-- 相册卡片列表 -->
          <div class="album-card" v-for="(album, index) in albums" :key="'album_' + index + '_' + album.name" @click="selectAlbum(album)">
            <div class="album-cover" :class="{'empty-album': !album.coverUrl}">
              <template v-if="album.coverUrl">
                <img :src="album.coverUrl" alt="相册封面">
              </template>
              <template v-else>
                <div class="empty-album-placeholder">
                  <i class="el-icon-picture-outline"></i>
                  <span>（空）</span>
                </div>
              </template>
            </div>
            <div class="album-info">
              <h3>{{ album.name }}</h3>
              <p>{{ album.imageCount }}张照片</p>
            </div>
            <div class="album-actions">
              <button class="action-btn" @click.stop="deleteAlbumConfirm(album)" title="删除">
                    <img :src="icons.delete" alt="删除" class="icon">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 相册图片列表对话框 -->
    <div class="dialog image-list-dialog" v-if="showImageList">
      <div class="dialog-mask" @click="closeImageList"></div>
      <div class="dialog-container">
        <div class="dialog-header">
          <div class="header-left">
            <button class="back-btn" @click="closeImageList">
              <i class="el-icon-back"></i>
              返回
            </button>

          </div>
          <div class="album-info">
            <h3 style="text-align: center;font-size: 27px;">{{ currentAlbum ? currentAlbum.name : '' }}</h3>
            <span class="image-count" style="font-size: 12px;color: gray;">{{ imageList.length || '0' }} 张照片</span>
          </div>
          <div class="header-right">
            <button class="upload-btn" @click="showUpload">
              <i class="el-icon-upload2"></i>
              上传
            </button>
            <button class="close-btn" @click="close">×</button>
          </div>
        </div>
        <div class="dialog-body">
          <div class="image-grid">
            <!-- 加载提示 -->
            <div v-if="loading" class="loading-overlay">
              <div class="loading-spinner">
                <i class="el-icon-loading"></i>
                <p>{{ loadingText }}</p>
              </div>
            </div>

            <!-- 图片列表 -->
            <template v-else>
              <div class="image-card" v-for="(image, imageIndex) in pageImages" :key="'image_' + imageIndex + '_' + image.name">
                <!-- 现有图片卡片内容保持不变 -->
                <div class="image-cover" @click="handleImageClick(image)">
                  <img :src="image.url" :alt="getImageName(image)" class="image"
                     draggable="true"
                     @dragstart="handleDragStart($event, image)"
                     @dragend="handleDragEnd">
                  <!-- 选择模式下显示勾选图标 -->
                  <div v-if="isSelectMode" 
                       class="select-circle action-btn" 
                       :class="{'selected': selectedImage === image}"
                       title="选择"
                       @click.stop="handleCircleClick(image)">
                    <img :src="selectedImage === image ? icons.checkSelected : icons.check" alt="选择" class="icon">
                  </div>
                </div>
                <div class="image-info">
                  <div class="info-row">
                    <span class="name">{{ getImageName(image) }}</span>
                    <span class="size" v-if="image.size">{{ formatSize(image.size) }}</span>
                  </div>
                </div>
                <!-- 显示操作按钮，不管是否选择模式 -->
                <div class="image-actions">
                  <button class="action-btn" @click.stop="copyImageUrl(image)" title="复制链接">
                    <img :src="icons.copy" alt="复制" class="icon">
                  </button>
                  <div class="move-btn-wrapper">
                    <button class="action-btn" @click.stop="toggleMovePanel(image, $event)" title="移动到">
                      <img :src="icons.move" alt="移动" class="icon">
                    </button>
                    <!-- 移动到面板 -->
                    <div class="move-panel" v-if="showMovePanel && movingImage === image">
                      <div class="move-panel-header">移动到相册</div>
                      <div class="move-panel-body">
                        <div class="album-list-mini">
                          <div class="album-item" 
                               v-for="album in getFilteredAlbums()" 
                               :key="album.id"
                               @click.stop="quickMoveImage(image, album)">
                            <span class="album-name">{{ album.name }}</span>
                            <span class="image-count">({{ album.imageCount }}张)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button class="action-btn" @click.stop="deleteImageConfirm(image)" title="删除">
                    <img :src="icons.delete" alt="删除" class="icon">
                  </button>
                </div>
              </div>
            </template>
          </div>
          <!-- 分页组件 -->
          <div class="pagination-container" v-if="total > 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="handlePageChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传图片对话框 -->
    <album-upload-dialog
      :visible.sync="showUploadDialog"
      @upload="customUpload"
    />

    <!-- 创建/编辑相册对话框 -->
    <album-create-edit-dialog
      :visible.sync="showAlbumDialog"
      :editing-album="editingAlbum"
      @submit="handleAlbumSubmit"
    />

    <!-- 移动图片对话框 -->
    <album-move-dialog
      :visible.sync="showMoveDialog"
      :albums="albums"
      :current-album="currentAlbum || {}"
      @confirm="handleMoveImage"
    />

    <!-- 图片预览遮罩层 -->
    <div class="preview-mask" v-if="previewVisible" @click="closePreview">
      <div class="preview-container" @click.stop>
        <img :src="previewImageUrl" class="preview-image">
        <button class="close-btn" @click="closePreview">×</button>
      </div>
    </div>

    <!-- 加载提示 -->
    <loading-spinner v-if="loading" :text="loadingText" />
  </div>
</template>

<script>
import {
  getAlbumList,
  getAlbumImages,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  uploadToAlbum,
  deleteFromAlbum,
  moveImage
} from '@/api/album'
import { Message } from 'element-ui'
import DeleteIcon from '@/assets/icons/delete.svg'
import CopyIcon from '@/assets/icons/copy.svg'
import MoveIcon from '@/assets/icons/move.svg'
import UploadIcon from '@/assets/icons/upload.svg'
import BackIcon from '@/assets/icons/back.svg'
import CheckIcon from '@/assets/icons/check.svg'
import CheckSelectedIcon from '@/assets/icons/check-selected.svg'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import AlbumCreateEditDialog from '@/components/album/AlbumCreateEditDialog.vue'
import AlbumUploadDialog from '@/components/album/AlbumUploadDialog.vue'
import AlbumMoveDialog from '@/components/album/AlbumMoveDialog.vue'

export default {
  name: 'AlbumManager',
  props: {
    // 是否是选择模式
    isSelectMode: {
      type: Boolean,
      default: false
    }
  },
  components: {
    LoadingSpinner,
    AlbumCreateEditDialog,
    AlbumUploadDialog,
    AlbumMoveDialog
  },
  data() {
    return {
      albums: [],
      currentAlbum: null,
      showImageList: false,
      showAlbumDialog: false,
      showMoveDialog: false,
      showUploadDialog: false,
      editingAlbum: null,
      currentPage: 1,
      pageSize: 12,
      total: 0,
      loading: false,
      targetAlbumName: '',
      movingImage: null,
      wheelHandler: null,
      showMovePanel: false,
      movePanelPosition: {
        top: 0,
        left: 0
      },
      icons: {
        delete: DeleteIcon,
        copy: CopyIcon,
        move: MoveIcon,
        upload: UploadIcon,
        back: BackIcon,
        check: CheckIcon,
        checkSelected: CheckSelectedIcon
      },
      imageList: [],
      loadingText: '',
      hasModified: false,
      selectedImage: null,
      previewVisible: false,
      previewImageUrl: '',
    }
  },
  computed: {
    // 计算当前页显示的图片
    pageImages() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.imageList.slice(start, end);
    },
    previewImageStyle() {
      if (!this.previewVisible || !this.previewImageUrl) return {}
      
      // 创建一个临时图片对象来获取原始尺寸
      const img = new Image()
      img.src = this.previewImageUrl
      
      // 获取视窗大小
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      
      // 计算最大尺寸（视窗的90%）
      const maxWidth = windowWidth * 0.9
      const maxHeight = windowHeight * 0.9
      
      // 如果图片尺寸小于最大尺寸，使用原始尺寸
      if (img.width <= maxWidth && img.height <= maxHeight) {
        return {
          width: `${img.width}px`,
          height: `${img.height}px`
        }
      }
      
      // 计算缩放比例
      const widthRatio = maxWidth / img.width
      const heightRatio = maxHeight / img.height
      const ratio = Math.min(widthRatio, heightRatio)
      
      return {
        width: `${img.width * ratio}px`,
        height: `${img.height * ratio}px`
      }
    }
  },
  created() {
    // 检查是否有缓存
    const cachedAlbums = sessionStorage.getItem('albumList');
    if (cachedAlbums) {
      this.albums = JSON.parse(cachedAlbums);
    } else {
      this.fetchAlbums();
    }
  },
  methods: {
    async fetchAlbums() {
      this.loading = true;
      this.loadingText = '加载中...';
      
      try {
        const response = await getAlbumList();
        if (response.code === 200) {
          this.albums = response.data || [];
          // 如果当前正在查看某个相册，更新其信息
          if (this.currentAlbum) {
            const updatedAlbum = this.albums.find(album => album.name === this.currentAlbum.name);
            if (updatedAlbum) {
              this.currentAlbum = updatedAlbum;
            }
          }
        }
      } catch (error) {
        this.$message.error('获取相册列表失败');
      } finally {
        this.loading = false;
      }
    },
    // 更新缓存的方法
    async updateAlbumCache() {
      try {
        const res = await getAlbumList();
        this.albums = res.data;
        sessionStorage.setItem('albumList', JSON.stringify(res.data));
      } catch (error) {
        console.error('Failed to update albums cache:', error);
      }
    },
    // 获取相册所有图片
    async fetchImages() {
      if (!this.currentAlbum) return;
      
      this.loading = true;
      this.loadingText = '加载中...';
      
      try {
        const response = await getAlbumImages(this.currentAlbum.name);
        if (response.code === 200) {
          this.imageList = response.data || [];
          this.total = this.imageList.length;
          // 更新当前相册的图片数量
          this.currentAlbum.imageCount = this.imageList.length;
          if (this.imageList.length > 0) {
            this.currentAlbum.coverUrl = this.imageList[0].url;
          }
        }
      } catch (error) {
        this.$message.error('获取图片列表失败');
      } finally {
        this.loading = false;
      }
    },
    // 分页变化处理
    handlePageChange(page) {
      console.log('切换到页码：', page);
      this.currentPage = page;
    },
    // 选择相册
    async selectAlbum(album) {
      this.currentAlbum = album;
      this.showImageList = true;
      this.currentPage = 1;
      this.imageList = [];
      
      // 只有当相册不为空时才获取图片列表
      if (album.imageCount > 0) {
        await this.fetchImages();
      }
    },
    // 显示创建相册对话框
    showCreateAlbumDialog() {
      this.editingAlbum = null
      this.showAlbumDialog = true
    },
    // 编辑相册
    editAlbum(album) {
      this.editingAlbum = album
      this.showAlbumDialog = true
    },
    // 处理相册表单提交
    async handleAlbumSubmit(formData) {
      try {
        if (this.editingAlbum) {
          await updateAlbum(this.editingAlbum.name, formData)
          this.$message.success('相册更新成功')
        } else {
          await createAlbum(formData)
          this.$message.success('相册创建成功')
        }
        this.showAlbumDialog = false
        this.fetchAlbums()
        this.$emit('update')  // 触发更新事件
      } catch (error) {
        console.error('保存相册失败:', error)
        this.$message.error(this.editingAlbum ? '更新相册失败' : '创建相册失败')
      }
    },
    // 删除相册确认
    deleteAlbumConfirm(album) {
      this.$confirm('确定要删除该相册吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (album.imageCount > 0) {
          // 如果相册中有图片，显示二次确认
          this.$confirm(`该相册中包含 ${album.imageCount} 张图片，确定要删除该相册及其中的所有图片吗？`, '警告', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteAlbum(album)
          })
        } else {
          this.deleteAlbum(album)
        }
      })
    },
    // 删除相册
    async deleteAlbum(album) {
      try {
        await deleteAlbum(album.name)
        this.$message.success('相册删除成功')
        // 清除缓存
        sessionStorage.removeItem('albumList')
        // 重新获取相册列表
        await this.fetchAlbums()
        this.$emit('update')  // 触发更新事件
      } catch (error) {
        this.$message.error(error.response?.data?.msg || '删除相册失败')
      }
    },
    // 处理上传
    async customUpload(options) {
      if (!this.currentAlbum) {
        this.$message.error('请先选择相册');
        return;
      }

      this.loading = true;
      this.loadingText = '正在上传...';
      
      try {
        const response = await uploadToAlbum(this.currentAlbum.name, options.file);
        this.$message.success('上传成功');
        this.hasModified = true;
        // 重新获取当前相册的图片列表
        await this.fetchImages();
        // 重新获取相册列表以更新图片数量和封面
        await this.fetchAlbums();
      } catch (error) {
        this.$message.error('上传失败：' + error.message);
      } finally {
        this.loading = false;
        this.showUploadDialog = false;
      }
    },
    // 复制图片链接
    async copyImageUrl(image) {
      const mdLink = `![${image.name || '图片'}](${image.url})`;
      try {
        await navigator.clipboard.writeText(mdLink);
        this.$message.success('Markdown链接已复制到剪贴板');
      } catch (err) {
        const input = document.createElement('input');
        input.value = mdLink;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        this.$message.success('Markdown链接已复制到剪贴板');
      }
    },
    // 切换移动面板的显示状态
    toggleMovePanel(image, event) {
      this.movingImage = image;
      this.showMovePanel = !this.showMovePanel;
      
      if (this.showMovePanel) {
        // 获取按钮相对于图片卡片的位置
        const buttonRect = event.target.closest('.action-btn').getBoundingClientRect();
        const cardRect = event.target.closest('.image-card').getBoundingClientRect();
        
        // 计算相对位置
        let left = buttonRect.right - cardRect.left + 5; // 在按钮右侧显示
        let top = buttonRect.top - cardRect.top;
        
        // 检查右边界
        if (left + 200 > cardRect.width) {
          left = buttonRect.left - cardRect.left - 205; // 在按钮左侧显示
        }
        
        this.movePanelPosition = { 
          top: `${top}px`,
          left: `${left}px`
        };
      }
    },
    
    // 快速移动图片
    async quickMoveImage(image, targetAlbum) {
      if (!this.currentAlbum || !targetAlbum || !image) return;

      this.loading = true;
      try {
        await moveImage(
          this.currentAlbum.name,
          targetAlbum.name,
          image.name
        );
        this.$message.success('移动成功');
        this.hasModified = true;
        await this.fetchImages();
        await this.updateAlbumCache();
      } catch (error) {
        this.$message.error('移动失败');
      } finally {
        this.loading = false;
        this.showMovePanel = false;
      }
    },
    
    // 点击其他区域关闭面板
    handleClickOutside(event) {
      if (this.showMovePanel && !event.target.closest('.move-btn-wrapper')) {
        this.showMovePanel = false;
        this.movingImage = null;
      }
    },
    // 删除图片确认
    deleteImageConfirm(image) {
      this.$confirm('确定要删除该图片吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteImage(image)
      })
    },
    // 删除图片
    async deleteImage(image) {
      this.loading = true;
      this.loadingText = '正在删除...';
      
      try {
        await deleteFromAlbum(this.currentAlbum.name, image.name);
        this.$message.success('删除成功');
        this.hasModified = true;
        await this.fetchImages();
        await this.updateAlbumCache();
      } catch (error) {
        this.$message.error('删除失败');
      } finally {
        this.loading = false;
      }
    },
    // 关闭图片列表对话框
    async closeImageList() {
      this.showImageList = false;
      this.currentAlbum = null;
      this.imageList = [];
      this.currentPage = 1;
      this.total = 0;
      // 只有在进行过修改操作时才重新获取相册列表
      if (this.hasModified) {
        await this.fetchAlbums();
        this.hasModified = false;
      }
    },
    // 关闭相册管理器
    close() {
      this.$emit('close');
    },
    // 显示上传对话框
    showUpload() {
      this.showUploadDialog = true;
    },
    // 修改移动的过滤
    getFilteredAlbums() {
      return this.albums.filter(album => album.name !== this.currentAlbum.name)
    },
    handleDragStart(event, image) {
      event.preventDefault();
      event.stopPropagation();
      
      const dragImage = event.target.cloneNode(true);
      dragImage.style.width = '50px';
      dragImage.style.height = '50px';
      dragImage.style.objectFit = 'cover';
      dragImage.style.position = 'fixed';
      dragImage.style.top = '-1000px';
      document.body.appendChild(dragImage);
      
      event.dataTransfer.setDragImage(dragImage, 25, 25);
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('text/plain', image.url);
      event.dataTransfer.setData('image-url', image.url);
      
      event.target.classList.add('dragging');
      
      // 记录初始滚动位置
      this._scrollTop = this.$el.querySelector('.album-list').scrollTop;
      
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    },
    handleDragEnd(event) {
      event.preventDefault();
      event.stopPropagation();
      event.target.classList.remove('dragging');
      
      // 恢复到初始滚动位置
      const albumList = this.$el.querySelector('.album-list');
      if (albumList) {
        albumList.scrollTop = this._scrollTop;
      }
    },
    formatSize(size) {
      if (!size) return '';
      const units = ['B', 'KB', 'MB', 'GB'];
      let index = 0;
      let num = size;
      while (num >= 1024 && index < units.length - 1) {
        num /= 1024;
        index++;
      }
      return `${num.toFixed(2)} ${units[index]}`;
    },
    // 获取图片名称
    getImageName(image) {
      if (image.name) return image.name;
      // 从URL中提取文件名
      const urlParts = image.url.split('/');
      let fileName = urlParts[urlParts.length - 1];
      // 移除查询参数
      fileName = decodeURIComponent(fileName.split('?')[0]);
      return fileName;
    },
    // 修改移动图片的方法
    async handleMoveImage(targetAlbumName) {
      if (!this.movingImage) {
        this.$message.error('请选择要移动的图片')
        return
      }
      
      this.loading = true
      this.loadingText = '正在移动图片...'
      
      try {
        await moveImage(this.currentAlbum.name, this.movingImage.name, targetAlbumName)
        this.$message.success('移动成功')
        await this.fetchImages()
        await this.updateAlbumCache()
      } catch (error) {
        this.$message.error('移动失败')
      } finally {
        this.loading = false
        this.loadingText = ''
        this.movingImage = null
      }
    },
    // 显示移动对话框
    showMoveImageDialog(image) {
      this.movingImage = image
      this.showMoveDialog = true
    },
    // 处理圆圈点击
   handleCircleClick(image) {
    if (this.isSelectMode) {
      this.selectedImage = image;
      setTimeout(() => {
        this.$confirm('是否选择这张图片？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$emit('select', image);
              setTimeout(() => {
                this.close();
              }, 100);
            } else {
              this.selectedImage = null;
            }
            done();
          }
        }).catch(() => {
          // 忽略取消操作的错误
        });
      }, 100);
    }
  },
   
    // 预览图片
    previewImage(image) {
      this.previewImageUrl = image.url
      this.previewVisible = true
    },
    // 关闭预览
    closePreview() {
      this.previewVisible = false
      this.previewImageUrl = ''
    },
    // 处理图片点击
    handleImageClick(image) {
      this.previewImageUrl = image.url
      this.previewVisible = true
    }
  },
  mounted() {
    const albumList = this.$el.querySelector('.album-list');
    if (albumList) {
      // 保存事件处理函数的引用
      this.wheelHandler = (e) => {
        e.stopPropagation();
      };
      
      // 添加事件监听
      albumList.addEventListener('wheel', this.wheelHandler, { passive: true });
    }
    // 添加全局点击事件监听
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    const albumList = this.$el.querySelector('.album-list');
    if (albumList && this.wheelHandler) {
      // 正确移除事件监听
      albumList.removeEventListener('wheel', this.wheelHandler);
    }
    // 移除全局点击事件监听
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style lang="scss" scoped>
[class^="icon-"] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.album-manager-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.album-manager-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.album-manager {
  width: 60%;
  height: 75vh;
  background: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.album-manager-header {
  padding: 0;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: #fff;
  border-radius: 8px 8px 0 0;
  height: 72px;
  position: relative;
  
  .header-left {
    display: flex;
    align-items: center;
    padding-left: 16px;
    min-width: 120px;
    
    h3 {
      margin: 0;
      font-size: 16px;
      color: #303133;
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-right: 16px;
    min-width: 120px;

    .upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 16px;
      background: #409EFF;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      
      i {
        font-size: 14px;
      }
      
      &:hover {
        background: #66b1ff;
      }
    }
  }
}

.album-manager-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.album-list {
  height: 100%;
  overflow-y: auto;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(166px, 1fr));
  gap: 15px;
}

.album-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  height: 186px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 186px;
  max-height: 186px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 2;
    
    .album-actions {
      display: flex;
    }
  }
  
  &.add-album {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #dcdfe6;
    background: transparent;
    box-shadow: none;
    
    .add-icon {
      font-size: 32px;
      color: #909399;
    }
    
    .add-text {
      margin-top: 8px;
      font-size: 14px;
      color: #909399;
    }

    &:hover {
      border-color: #409eff;
      color: #409eff;
      transform: none;
      box-shadow: none;
      
      .add-icon, .add-text {
        color: #409eff;
      }
    }
  }
}

.album-cover {
  flex: 1;
  position: relative;
  border-radius: 8px 8px 0 0;
  height: calc(100% - 37px);
  min-height: calc(100% - 37px);
  
  &.empty-album {
    background: #f5f7fa;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }

  .empty-album-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #909399;

    i {
      font-size: 32px;
      margin-bottom: 8px;
    }

    span {
      font-size: 14px;
    }
  }

  // 选择圆圈样式
  .select-circle {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 26px;
    height: 26px;
    display: none;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    padding: 0;
    margin: 0;
    z-index: 10;
    
    &.selected {
      display: flex !important;
      
      .icon {
        filter: invert(47%) sepia(82%) saturate(1193%) hue-rotate(194deg) brightness(100%) contrast(101%);
      }
    }
    
    .icon {
      width: 18px;
      height: 18px;
      display: block;
      filter: invert(47%) sepia(82%) saturate(1193%) hue-rotate(194deg) brightness(100%) contrast(101%);
      transition: all 0.3s;
    }
    
    &:hover {
      background-color: rgba(64, 158, 255, 0.1);
    }
  }
}

.album-info {
  padding: 8px;
  background: #fff;
  border-top: 1px solid #ebeef5;
  
  h3 {
    margin: 0;
    font-size: 14px;
    color: #303133;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  p {
    margin: 3px 0 0;
    font-size: 12px;
    color: #909399;
  }
}

.album-actions {
  position: absolute;
  bottom: 37px;
  right: 0;
  display: none;
  background: transparent;
  border-radius: 4px;
  padding: 1px;
  z-index: 10;
  flex-direction: row;
  gap: 0;
  
  .action-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    padding: 0;
    margin: 0;
    
    .icon {
      width: 20px;
      height: 20px;
      display: block;
      filter: invert(47%) sepia(82%) saturate(1193%) hue-rotate(194deg) brightness(100%) contrast(101%);
    }
    
    &[title="删除"] .icon {
      filter: invert(57%) sepia(75%) saturate(5611%) hue-rotate(336deg) brightness(100%) contrast(93%);
    }
    
    &:hover {
      background-color: rgba(64, 158, 255, 0.1);
    }
    
    &[title="删除"]:hover {
      background-color: rgba(245, 108, 108, 0.1);
    }
  }
}

.album-card:hover .album-actions {
  display: flex;
}

// 对话框样式
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
  width: 60%;
  height: 75vh;
  max-height: 75vh;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.dialog-header {
  padding: 0;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-shrink: 0;
  background: #fff;
  height: 72px;
  position: relative;
  
  .header-left {
    display: flex;
    align-items: center;
    padding-left: 16px;
    min-width: 120px;  // 确保左侧区域宽度固定
    
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 12px;
      border: none;
      background: #f5f7fa;
      border-radius: 4px;
      color: #606266;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
      
      i {
        font-size: 14px;
      }
      
      &:hover {
        color: #409EFF;
        background: #ecf5ff;
      }
    }
  }

  .header-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    h3 {
      margin: 0 0 4px;
      font-size: 20px;
      color: #303133;
      font-weight: 500;
      line-height: 28px;
    }
    
    .image-count {
      font-size: 12px;
      color: #909399;
      line-height: 16px;
      font-weight: normal;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-right: 16px;
    min-width: 120px;  // 确保右侧区域宽度固定

    .upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 16px;
      background: #409EFF;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      
      i {
        font-size: 14px;
      }
      
      &:hover {
        background: #66b1ff;
      }
    }
  }
}

// 关闭按钮样式
.close-btn {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #909399;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;
  z-index: 10;
  
  &:hover {
    color: #f56c6c;
    transform: rotate(90deg);
  }
}

.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  
  // 隐藏滚动条
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.album-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 20px;
  
  &:focus {
    border-color: #409eff;
    outline: none;
  }
}

// 拖拽相关样式
.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

// 保图标在对框中也正确显示
.dialog .icon-edit,
.dialog .icon-delete,
.dialog .icon-plus,
.dialog .icon-copy,
.dialog .icon-move,
.dialog .icon-upload {
  font-style: normal;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  line-height: 1;
  text-align: center;
  border-radius: 4px;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

// 图片网格样式
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(166px, 1fr));
  gap: 15px;
}

.image-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 2; 

    .image-actions {
      display: flex;
    }
  }
  
  .image-cover {
    flex: 1;
    position: relative;
    border-radius: 8px 8px 0 0;
    height: calc(100% - 37px);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px 8px 0 0;
    }
  }
  
  .image-info {
    height: 37px;
    padding: 8px;
    background: #fff;
    border-top: 1px solid #ebeef5;
    border-radius: 0 0 8px 8px;
    
    .info-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      height: 20px;
      
      .name {
        flex: 1;
        font-size: 13px;
        color: #606266;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: normal;
      }
      
      .size {
        font-size: 12px;
        color: #909399;
        white-space: nowrap;
      }
    }
  }
}

.image-actions {
  position: absolute;
  bottom: 37px;
  right: 0;
  display: none;
  background: transparent;
  border-radius: 4px;
  padding: 1px;
  z-index: 10;
  flex-direction: row;
  gap: 0;
  
  .action-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    padding: 0;
    margin: 0;
    
    .icon {
      width: 20px;
      height: 20px;
      display: block;
      filter: invert(47%) sepia(82%) saturate(1193%) hue-rotate(194deg) brightness(100%) contrast(101%);
    }
    
    &[title="删除"] .icon {
      filter: invert(57%) sepia(75%) saturate(5611%) hue-rotate(336deg) brightness(100%) contrast(93%);
    }
    
    &:hover {
      background-color: rgba(64, 158, 255, 0.1);
    }
    
    &[title="删除"]:hover {
      background-color: rgba(245, 108, 108, 0.1);
    }
  }
}

.image-card:hover .image-actions {
  display: flex;
}

// 图标样式
.icon-edit:before { content: "✏"; }
.icon-delete:before { content: "✖"; }
.icon-plus:before { content: "＋"; }
.icon-copy:before { content: "⎘"; }
.icon-move:before { content: "⇨"; }
.icon-upload:before { content: "⇧"; }

.icon-edit, 
.icon-delete, 
.icon-plus, 
.icon-copy, 
.icon-move, 
.icon-upload {
  font-style: normal;
  font-family: Arial, sans-serif;
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 28px;
  text-align: center;
}

// 工具栏样式
.toolbar {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .toolbar-left {
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #fff;
      border: 1px solid #409EFF;
      border-radius: 4px;
      color: #409EFF;
      cursor: pointer;
      transition: all 0.3s;
  
  &:hover {
        background: #ecf5ff;
      }
      
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
  
  .toolbar-right {
.upload-btn {
      background: #409EFF;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
  
  &:hover {
    background: #66b1ff;
      }
      
      svg {
        width: 16px;
        height: 16px;
        stroke: #fff;
      }
    }
  }
}

// 表单样式
.form-group {
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #606266;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      border-color: #409eff;
      outline: none;
    }
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn {
  background: #409eff;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #66b1ff;
  }
}

.cancel-btn {
  background: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    color: #409EFF;
    border-color: #c6e2ff;
    background: #ecf5ff;
  }
}

// 上传区域样式
.upload-area {
  text-align: center;
  padding: 20px;
  
  .upload-tip {
    margin-top: 10px;
    color: #909399;
    font-size: 14px;
  }
}

.action-btn {
  padding: 4px 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0 2px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #409EFF;
  }

  i {
    font-size: 16px;
    line-height: 1;
  }
}

// 所有自定义图标样式
.icon-edit:before,
.icon-delete:before,
.icon-plus:before,
.icon-copy:before,
.icon-move:before,
.icon-upload:before,
.icon-edit, 
.icon-delete, 
.icon-plus, 
.icon-copy, 
.icon-move, 
.icon-upload {
  display: none;
}

.action-btn {
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0 2px;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #409EFF;
  border-radius: 4px;
  color: #409EFF;
  cursor: pointer;
  transition: all 0.3s;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #409EFF;
    color: #fff;

    svg {
      stroke: #fff;
    }
  }
}

.move-btn-wrapper {
  position: relative;
  display: inline-block;
}

.move-panel {
  position: absolute;
  width: 200px;
  max-height: 300px;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  z-index: 10;
  overflow-y: auto;
  
  .move-panel-header {
    padding: 8px 12px;
    font-size: 14px;
    color: #606266;
    border-bottom: 1px solid #dcdfe6;
    background: #f5f7fa;
  }
  
  .move-panel-body {
    padding: 8px 0;
    max-height: 250px;
    overflow-y: auto;
  }
  
  .album-list-mini {
    .album-item {
      padding: 8px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      &:hover {
        background-color: #f5f7fa;
      }
      
      .album-name {
        color: #606266;
        font-size: 13px;
      }
      
      .image-count {
        color: #909399;
        font-size: 12px;
      }
    }
  }
}

.pagination-container {
  margin-top: 20px;
  padding: 10px 0;
  background: #fff;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
  z-index: 10;
  
  ::v-deep .el-pagination {
    .el-pager li {
      border: none;
      background: transparent;
      color: #606266;
      min-width: 28px;
      height: 28px;
      line-height: 28px;
      font-weight: normal;
      margin: 0 2px;
      
      &.active {
        color: #409EFF;
        background-color: #ecf5ff;
        font-weight: bold;
      }
      
      &:hover {
        color: #409EFF;
      }
    }
    
    .btn-prev, .btn-next {
      background: transparent;
      color: #606266;
      padding: 0;
      min-width: 28px;
      height: 28px;
      line-height: 28px;
      
      &:hover {
        color: #409EFF;
      }
      
      &.disabled {
        color: #C0C4CC;
      }
    }
  }
}

.dialog-body {
  display: flex;
  flex-direction: column;
  
  .image-grid {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 0;
    padding-bottom: 60px;
  }
}

.icon {
  width: 20px;
  height: 20px;
  display: block;
  filter: invert(35%) sepia(10%) saturate(3%) hue-rotate(314deg) brightness(95%) contrast(86%);
}

.image-info {
  padding: 6px 8px;
  background: #fff;
  border-top: 1px solid #ebeef5;
  height: 32px;
  
  .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    height: 20px;
    
    .name {
      flex: 1;
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .size {
      font-size: 12px;
      color: #909399;
      white-space: nowrap;
    }
  }
}

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

.image-count-tip {
  display: none;
}

// 选择模式下的悬停效果
.image-card:hover {
  .select-circle {
    display: flex;
  }
}

// 选择模式下的图片卡片样式
.isSelectMode {
  .image-card {
    cursor: pointer;
    
    &:hover {
      .select-circle {
        background: #409EFF;
        color: #fff;
        
        i {
          display: block;
        }
      }
    }
  }
}

.select-circle {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  display: none;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  padding: 0;
  margin: 0;
  z-index: 10;
  
  &.selected {
    display: flex !important;
    
    .icon {
      filter: invert(47%) sepia(82%) saturate(1193%) hue-rotate(194deg) brightness(100%) contrast(101%);
    }
  }
  
  .icon {
    width: 18px;
    height: 18px;
    display: block;
    filter: invert(47%) sepia(82%) saturate(1193%) hue-rotate(194deg) brightness(100%) contrast(101%);
    transition: all 0.3s;
  }
  
  &:hover {
    background-color: rgba(64, 158, 255, 0.1);
  }
}

// 鼠标悬停时显示未选中的圆圈
.image-card:hover {
  .select-circle:not(.selected) {
    display: flex;
  }
}

.image-actions {
  position: absolute;
  bottom: 37px;
  right: 0;
  display: none;
  background: transparent;
  border-radius: 4px;
  padding: 1px;
  z-index: 10;
  flex-direction: row;
  gap: 0;
}

.preview-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.preview-container {
  position: relative;
  display: inline-block;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
}

.preview-image {
  display: block;
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
}

.preview-mask .close-btn {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 32px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s;
  border-radius: 50%;
  z-index: 3001;
  
  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.4);
    transform: rotate(90deg);
  }
}
</style> 