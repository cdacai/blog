import { uploadImage } from '@/api/upyun'

/**
 * 压缩图片
 * @param {File} file - 图片文件
 * @param {Object} options - 压缩选项
 * @param {number} options.maxWidth - 最大宽度，默认1000
 * @param {number} options.quality - 压缩质量，0-1之间，默认0.8
 * @param {number} options.maxSize - 最大文件大小（KB），默认150KB
 * @param {boolean} options.keepFormat - 是否保持原始格式，默认true
 * @returns {Promise<File>} 返回压缩后的文件对象
 */
const compressImage = async (file, options = {}) => {
  const { maxWidth = 1000, quality = 0.8, maxSize = 150, keepFormat = true } = options

  // 如果不是图片文件，直接返回
  if (!file.type.startsWith('image/')) {
    throw new Error('只能上传图片文件')
  }

  // 检查原始文件大小
  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes
  if (file.size > maxFileSize) {
    throw new Error('原始图片大小超过20MB，请选择较小的图片或先压缩后再上传')
  }

  try {
    // 创建图片对象
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = objectUrl
    })

    // 计算压缩后的尺寸
    let width = img.width
    let height = img.height
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width)
      width = maxWidth
    }

    // 创建canvas进行压缩
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)

    // 释放objectUrl
    URL.revokeObjectURL(objectUrl)

    // 二分法查找合适的压缩质量
    let minQuality = 0.1
    let maxQuality = quality
    let currentQuality = quality
    let blob = null
    let bestBlob = null
    let attempts = 0
    const maxAttempts = 8  // 最多尝试8次

    while (attempts < maxAttempts) {
      currentQuality = (minQuality + maxQuality) / 2
      blob = await new Promise(resolve => {
        canvas.toBlob(resolve, keepFormat ? file.type : 'image/jpeg', currentQuality)
      })

      if (blob.size <= maxSize * 1024) {
        bestBlob = blob
        minQuality = currentQuality
      } else {
        maxQuality = currentQuality
      }
      attempts++
    }

    // 如果没有找到合适的压缩质量，使用最后一次压缩的结果
    if (!bestBlob) {
      bestBlob = blob
    }

    // 如果压缩后的大小仍然超过限制
    if (bestBlob.size > maxFileSize) {
      throw new Error('压缩后的图片仍然超过20MB，请选择较小的图片')
    }

    // 创建文件对象
    return new File([bestBlob], file.name, {
      type: keepFormat ? file.type : 'image/jpeg',
      lastModified: Date.now()
    })
  } catch (error) {
    throw new Error('图片压缩失败：' + error.message)
  }
}

/**
 * 压缩并上传图片
 * @param {File} file - 图片文件
 * @param {Object} options - 压缩选项
 * @param {number} options.maxWidth - 最大宽度，默认1000
 * @param {number} options.quality - 压缩质量，0-1之间，默认0.8
 * @param {number} options.maxSize - 最大文件大小（KB），默认150KB
 * @param {boolean} options.keepFormat - 是否保持原始格式，默认true
 * @returns {Promise<{url: string, file: File}>} 返回上传后的图片URL和压缩后的文件对象
 */
const compressAndUploadImage = async (file, options = {}) => {
  try {
    // 压缩图片，默认保持原格式
    const compressedFile = await compressImage(file, { ...options, keepFormat: true })
    // 创建FormData对象
    const formData = new FormData()
    formData.append('file', compressedFile)
    formData.append('fileName', file.name)
    // 上传图片
    const response = await uploadImage(formData)
    // 返回URL和压缩后的文件对象
    return {
      url: response.data,  // 直接使用返回的URL
      file: compressedFile
    }
  } catch (error) {
    throw new Error('图片处理失败：' + error.message)
  }
}

export { compressImage, compressAndUploadImage } 