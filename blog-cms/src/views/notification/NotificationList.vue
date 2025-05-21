<template>
    <div class="notification-list">
        <!-- 顶部操作栏 -->
        <div class="operation-bar">
            <div class="left">
                <el-radio-group v-model="currentType" @change="handleTypeChange" size="medium">
                    <el-radio-button label="">全部消息</el-radio-button>
                    <el-radio-button label="comment">评论消息</el-radio-button>
                    <el-radio-button label="like">点赞消息</el-radio-button>
                    <el-radio-button label="report">举报消息</el-radio-button>
                </el-radio-group>
            </div>
            <div class="right">
                <el-button type="primary" size="medium" @click="markAllAsRead" :disabled="!hasUnread">
                    <i class="el-icon-check"></i> 标记全部已读
                </el-button>
            </div>
        </div>

        <!-- 通知列表 -->
        <div class="notification-container">
            <template v-if="notifications.length > 0">
                <el-card v-for="item in notifications" 
                         :key="item.id" 
                         :class="['notification-item', item.isRead ? 'read' : 'unread']"
                         shadow="hover">
                    <div class="notification-content" @click="handleItemClick(item)" :class="{ clickable: !item.isRead }">
                        <div class="header">
                            <span class="time">{{ item.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</span>
                            <div class="type-stamp" :class="item.type">
                                <svg-icon v-if="item.type==='like'" icon-class="heart" style="margin-right:4px;vertical-align:middle;" />
                                <i v-else :class="getTypeIcon(item.type)"></i>
                                <span>{{ getTypeLabel(item.type) }}</span>
                            </div>
                        </div>
                        
                        <!-- 评论通知 -->
                        <template v-if="item.type === 'comment'">
                            <div class="message">
                                <span class="user">{{ item.nickname }}</span>
                                <span class="ip">(IP: {{ item.ip }}，{{ item.ipSource }})</span>
                                <span class="action">评论了你的</span>
                                <a :href="getTargetLink(item)" class="target" @click.prevent.stop="handleTargetClick(item)">
                                    "{{ item.targetTitle }}"
                                </a>
                                <span class="target-type">文章</span>
                            </div>
                            <div class="comment-content">{{ item.content }}</div>
                        </template>

                        <!-- 点赞通知 -->
                        <template v-else-if="item.type === 'like'">
                            <div class="message">
                                <span class="ip">IP: {{ item.ip }}，{{ item.ipSource }}</span>
                                <span class="action">点赞了你的</span>
                                <a :href="getTargetLink(item)" class="target" @click.prevent.stop="handleTargetClick(item)">
                                    "{{ item.targetTitle }}"
                                </a>
                                <span class="target-type">动态</span>
                            </div>
                        </template>

                        <!-- 举报通知 -->
                        <template v-else-if="item.type === 'report'">
                            <div class="message">
                                <span class="user">{{ item.nickname }}</span>
                                <span class="ip">(IP: {{ item.ip }}，{{ item.ipSource }})</span>
                                <span class="action">举报了你的</span>
                                <a :href="getTargetLink(item)" class="target" @click.prevent.stop="handleTargetClick(item)">
                                    "{{ item.targetTitle }}"
                                </a>
                                <span class="target-type">文章</span>
                            </div>
                            <div class="report-reason">举报原因：{{ item.reportReason }}</div>
                        </template>
                    </div>
                </el-card>
            </template>
            <div v-else class="empty-state">
                <i class="el-icon-bell" style="font-size: 48px; color: #909399;"></i>
                <p style="margin-top: 10px; color: #909399;">暂无消息</p>
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination-container" v-if="total > 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="queryInfo.pageSize"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                background>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getNotificationList, markReadById, markAllAsRead } from '@/api/notification'
import { mapActions } from 'vuex'
import { Empty } from 'element-ui'
import settings from '@/settings'

export default {
    name: 'NotificationList',
    components: {
        'el-empty': Empty
    },
    data() {
        return {
            currentType: '',
            notifications: [],
            total: 0,
            queryInfo: {
                pageNum: 1,
                pageSize: 10
            }
        }
    },
    created() {
        // 根据路由参数自动切换tab
        if (this.$route.query.type) {
            this.currentType = this.$route.query.type
        }
        this.getList()
        // 更新当前类型的未读消息数量
        this.getUnreadCounts(this.currentType)
    },
    watch: {
        // 监听路由参数变化
        '$route.query.type': {
            handler(newType) {
                this.currentType = newType || ''
                this.queryInfo.pageNum = 1
                this.getList()
                // 更新当前类型的未读消息数量
                this.getUnreadCounts(this.currentType)
            },
            immediate: true
        }
    },
    computed: {
        hasUnread() {
            return this.notifications.some(item => !item.isRead)
        }
    },
    methods: {
        ...mapActions('notification', ['getUnreadCounts']),
        async getList() {
            try {
                const res = await getNotificationList(
                    this.currentType,
                    this.queryInfo.pageNum,
                    this.queryInfo.pageSize
                )
                if (res.code === 200) {
                    this.notifications = res.data.list
                    this.total = res.data.total
                }
            } catch (error) {
                console.error('获取通知列表失败:', error)
                this.$message.error('获取通知列表失败')
            }
        },
        handleTypeChange() {
            // 更新路由参数
            this.$router.push({
                path: '/notification',
                query: this.currentType ? { type: this.currentType } : {}
            })
        },
        async handleItemClick(item) {
            if (!item.isRead) {
                console.log('点击条目', item)
                item.isRead = true;
                try {
                    await markReadById(item.id)
                    this.getUnreadCounts(this.currentType)
                } catch (error) {
                    console.error('标记已读失败:', error)
                }
            }
        },
        handleTargetClick(item) {
            const targetUrl = this.getTargetLink(item)
            window.open(targetUrl, '_blank')
        },
        getTargetLink(item) {
            // 根据当前环境选择基础URL
            const baseUrl = process.env.NODE_ENV === 'production' 
                ? 'https://www.caixiaohu.com' 
                : 'http://localhost:8080'
            
            if (item.targetType === 'blog') {
                return `${baseUrl}/blog/${item.targetId}`
            } else if (item.targetType === 'moment') {
                return `${baseUrl}/moments`
            }
            return baseUrl
        },
        async markAllAsRead() {
            try {
                await markAllAsRead()
                this.notifications.forEach(item => {
                    item.isRead = true
                })
                this.getUnreadCounts(this.currentType)
                this.$message.success('标记全部已读成功')
            } catch (error) {
                console.error('标记全部已读失败:', error)
                this.$message.error('标记全部已读失败')
            }
        },
        handleSizeChange(val) {
            this.queryInfo.pageSize = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.queryInfo.pageNum = val
            this.getList()
        },
        getTypeIcon(type) {
            const icons = {
                comment: 'el-icon-chat-dot-round',
                like: 'heart-unicode',
                report: 'el-icon-warning'
            }
            return icons[type] || 'el-icon-info'
        },
        getTypeLabel(type) {
            const labels = {
                comment: '评论',
                like: '点赞',
                report: '举报'
            }
            return labels[type] || '其他'
        }
    }
}
</script>

<style lang="scss" scoped>
.notification-list {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: calc(100vh - 84px);

    .operation-bar {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.05);

        .left {
            .el-radio-group {
                .el-radio-button__inner {
                    padding: 8px 15px;
                }
            }
        }
    }

    .notification-container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.05);
        padding: 20px;
        margin-bottom: 20px;

        .notification-item {
            margin-bottom: 15px;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            border-radius: 4px;

            &:last-child {
                margin-bottom: 0;
            }

            &:hover {
                transform: translateY(-2px);
            }

            &.unread {
                border-left: 4px solid #409EFF;
                background-color: #f0f9ff;
            }
            &.read {
                border-left: 4px solid #e0e0e0;
                background-color: #fff;
                opacity: 0.7;
            }

            .notification-content {
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                    position: relative;

                    .time {
                        color: #909399;
                        font-size: 13px;
                    }

                    .type-stamp {
                        position: absolute;
                        top: 0;
                        right: -37px;
                        transform: translateY(-50%) rotate(45deg);
                        display: flex;
                        align-items: center;
                        padding: 4px 20px;
                        font-size: 12px;
                        font-weight: 500;
                        opacity: 0.8;
                        pointer-events: none;
                        z-index: 1;
                        
                        i {
                            margin-right: 4px;
                            font-size: 12px;
                        }

                        &.comment {
                            background-color: rgba(64, 158, 255, 0.1);
                            color: #409EFF;
                        }

                        &.like {
                            background-color: rgba(103, 194, 58, 0.1);
                            color: #67c23a;
                        }

                        &.report {
                            background-color: rgba(245, 108, 108, 0.1);
                            color: #f56c6c;
                        }

                        &::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
                            pointer-events: none;
                        }
                    }
                }

                .message {
                    color: #303133;
                    line-height: 1.6;
                    font-size: 14px;

                    .user {
                        font-weight: bold;
                        color: #409EFF;
                    }

                    .ip {
                        color: #909399;
                        font-size: 13px;
                        margin-left: 5px;
                    }

                    .action {
                        margin: 0 4px;
                        color: #606266;
                    }

                    .target {
                        color: #409EFF;
                        text-decoration: none;
                        font-weight: 500;
                        
                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    .target-type {
                        margin-left: 4px;
                        color: #909399;
                    }
                }

                .comment-content {
                    margin-top: 12px;
                    padding: 12px 15px;
                    background-color: #f5f7fa;
                    border-radius: 4px;
                    color: #606266;
                    font-size: 14px;
                    line-height: 1.6;
                }

                .report-reason {
                    margin-top: 12px;
                    padding: 12px 15px;
                    background-color: #fef0f0;
                    border-radius: 4px;
                    color: #f56c6c;
                    font-size: 14px;
                    line-height: 1.6;
                }
            }
        }

        .empty-state {
            text-align: center;
            padding: 40px 0;
            background-color: #fff;
            border-radius: 4px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        text-align: center;
        background-color: #fff;
        padding: 15px 0;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.05);
    }
}

.notification-content.clickable {
    cursor: pointer;
}
</style> 