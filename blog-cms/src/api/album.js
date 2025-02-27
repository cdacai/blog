import request from '@/util/request'

// 相册请求的默认超时时间（30秒）
const ALBUM_REQUEST_TIMEOUT = 30000
// 上传图片的超时时间（2分钟）
const UPLOAD_REQUEST_TIMEOUT = 120000

// 获取相册列表
export function getAlbumList() {
    return request({
        url: '/album/list',
        method: 'GET',
        timeout: ALBUM_REQUEST_TIMEOUT
    })
}

// 获取相册图片
export function getAlbumImages(albumName) {
    return request({
        url: `/album/${albumName}/images`,
        method: 'GET',
        timeout: ALBUM_REQUEST_TIMEOUT
    })
}

// 创建相册
export function createAlbum(album) {
    return request({
        url: '/album',
        method: 'POST',
        data: album,
        timeout: ALBUM_REQUEST_TIMEOUT
    })
}

// 更新相册
export function updateAlbum(id, album) {
    return request({
        url: `/album/${id}`,
        method: 'PUT',
        data: album,
        timeout: ALBUM_REQUEST_TIMEOUT
    })
}

// 上传图片到相册
export function uploadToAlbum(albumName, file) {
    const formData = new FormData();
    formData.append('file', file);

    return request({
        url: `/album/${albumName}/upload`,
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: UPLOAD_REQUEST_TIMEOUT,  // 上传图片使用1分钟超时
        transformRequest: [function (data) {
            return data;
        }]
    })
}

// 从相册删除图片
export function deleteFromAlbum(albumId, imageId) {
    return request({
        url: `/album/${albumId}/image/${imageId}`,
        method: 'DELETE',
        timeout: ALBUM_REQUEST_TIMEOUT
    })
}

// 移动图片
export function moveImage(sourceAlbumName, targetAlbumName, imageName) {
    return request({
        url: `/album/${sourceAlbumName}/image/${imageName}/move/${targetAlbumName}`,
        method: 'POST',
        timeout: ALBUM_REQUEST_TIMEOUT
    })
}

// 删除相册
export function deleteAlbum(albumName) {
    return request({
        url: `/album/${albumName}`,
        method: 'DELETE',
        timeout: ALBUM_REQUEST_TIMEOUT
    })
}

// 获取隐藏相册列表
export function getHiddenAlbums() {
    return request({
        url: '/album/hidden',
        method: 'GET',
        timeout: ALBUM_REQUEST_TIMEOUT
    })
}

// 更新相册隐藏状态
export function updateAlbumVisibility(albumName, hidden) {
    return request({
        url: `/album/${albumName}/visibility`,
        method: 'PUT',
        data: { hidden },
        timeout: ALBUM_REQUEST_TIMEOUT * 2
    })
} 