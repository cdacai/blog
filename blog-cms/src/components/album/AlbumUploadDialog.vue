<!-- 上传图片对话框 -->
<template>
  <div class="dialog upload-dialog" v-if="visible">
    <div class="dialog-mask" @click="handleClose"></div>
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="header-left">
          <h3>上传图片</h3>
          <div class="compress-option">
            <el-tooltip effect="dark" placement="bottom">
              <div slot="content">
                <div class="tooltip-content">
                  <p>启用压缩可以减小图片体积，提高上传速度。</p>
                  <div class="compress-info">
                    <p>压缩配置：</p>
                    <ul>
                      <li>最大宽度: {{ compressionConfig.maxWidth }}px</li>
                      <li>压缩质量: {{ compressionConfig.quality }}</li>
                      <li>最大文件大小: {{ compressionConfig.maxSize }}KB</li>
                    </ul>
                  </div>
                </div>
              </div>
              <el-switch
                v-model="enableCompress"
                inactive-text=""
                active-text="">
              </el-switch>
            </el-tooltip>
          </div>
        </div>
        <button class="close-btn" @click="handleClose">×</button>
      </div>
      <div class="dialog-body">
        <el-upload
          class="uploader"
          action="#"
          :http-request="handleUpload"
          :show-file-list="true"
          :multiple="true"
          accept="image/*"
          drag>
          <div class="upload-area">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { compressImage } from '@/utils/imageUtils'
import settings from '@/settings'

export default {
  name: 'AlbumUploadDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      enableCompress: false, // 是否启用压缩
      compressionConfig: settings.imageCompression.blog // 压缩配置
    }
  },
  methods: {
    async handleUpload(options) {
      try {
        if (this.enableCompress) {
          // 使用压缩配置，但只压缩不上传
          const compressedFile = await compressImage(options.file, { ...this.compressionConfig, keepFormat: true })
          // 添加压缩信息
          const compressionRatio = ((1 - compressedFile.size / options.file.size) * 100).toFixed(1);
          this.$message.success(`压缩成功：原大小 ${(options.file.size / 1024).toFixed(1)}KB -> ${(compressedFile.size / 1024).toFixed(1)}KB，压缩率 ${compressionRatio}%`);
          options.file = compressedFile;
        }
        this.$emit('upload', options)
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>


.dialog-header {
  .header-left {
    display: flex;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 18px;
      color: #303133;
    }

    .compress-option {
      margin-left: 15px;
      display: flex;
      align-items: center;
    }
  }
}

:deep(.el-tooltip__popper) {
  .tooltip-content {
    p {
      margin: 0 0 8px 0;
      color: #fff;
      font-size: 14px;
    }

    .compress-info {
      p {
        margin: 8px 0 4px 0;
        font-size: 13px;
      }

      ul {
        margin: 0;
        padding-left: 16px;
        font-size: 13px;
        
        li {
          line-height: 1.6;
        }
      }
    }
  }
}

// 修改对话框样式
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .dialog-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .dialog-container {
    position: relative;
    width: 480px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    z-index: 1;
    
    .dialog-header {
      padding: 16px 20px;
      border-bottom: 1px solid #dcdfe6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      h3 {
        margin: 0;
        font-size: 16px;
        color: #303133;
        font-weight: 500;
      }
      
      .close-btn {
        border: none;
        background: none;
        font-size: 18px;
        color: #909399;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        
        &:hover {
          color: #409EFF;
        }
      }
    }
    
    .dialog-body {
      padding: 20px;

      .uploader {
        :deep(.el-upload) {
          width: 100%;
          display: block;
        }

        :deep(.el-upload-dragger) {
          width: 440px !important;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px dashed #d9d9d9;
          border-radius: 4px;
          background-color: #fafafa;
          transition: all 0.3s;

          &:hover {
            border-color: #409EFF;
            background-color: #f5f7fa;
          }

          .upload-area {
            text-align: center;
            width: 100%;
            padding: 0;

            .el-icon-upload {
              font-size: 40px;
              color: #909399;
              margin-bottom: 12px;
            }

            .el-upload__text {
              color: #606266;
              font-size: 14px;
              margin: 0;
              padding: 0;

              em {
                color: #409EFF;
                font-style: normal;
                font-weight: 500;
              }
            }
          }
        }

        :deep(.el-upload-list) {
          margin-top: 16px;
          width: 440px;
          margin: 16px auto 0;
        }
      }
    }
  }
}
</style> 