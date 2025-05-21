<template>
	<div class="navbar">
		<div class="hamburger-container" @click="toggleSideBar">
			<svg v-if="sidebar.opened" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;">
				<line x1="6" y1="7" x2="18" y2="7"/>
				<line x1="6" y1="12" x2="18" y2="12"/>
				<line x1="6" y1="17" x2="18" y2="17"/>
			</svg>
			<svg v-else viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;">
				<line x1="7" y1="7" x2="17" y2="17"/>
				<line x1="17" y1="7" x2="7" y2="17"/>
			</svg>
		</div>

		<breadcrumb class="breadcrumb-container"/>

		<div class="right-menu">
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<img :src="user.avatar" class="user-avatar">
					<div v-if="hasUnread" class="unread-dot"></div>
					<i class="el-icon-caret-bottom"/>
				</div>
				<el-dropdown-menu slot="dropdown" class="user-dropdown">
					<div class="notification-group">
						<div class="notification-title">消息通知</div>
						<el-dropdown-item @click.native="handleNotificationClick('comment')">
								<span class="notification-text">新评论</span>
								<span class="count" :class="{ 'has-count': unreadCounts.comment > 0 }">{{ unreadCounts.comment || 0 }}</span>
						</el-dropdown-item>
						<el-dropdown-item @click.native="handleNotificationClick('like')">
								<span class="notification-text">新点赞</span>
								<span class="count" :class="{ 'has-count': unreadCounts.like > 0 }">{{ unreadCounts.like || 0 }}</span>
						</el-dropdown-item>
						<el-dropdown-item @click.native="handleNotificationClick('report')">
								<span class="notification-text">新举报</span>
								<span class="count" :class="{ 'has-count': unreadCounts.report > 0 }">{{ unreadCounts.report || 0 }}</span>
						</el-dropdown-item>
						<el-dropdown-item @click.native="$router.push('/notification')">
							<span class="notification-text">全部消息</span>
						</el-dropdown-item>
					</div>
					<el-dropdown-item divided @click.native="logout">
						<span style="display:block;">退出登录</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapState, mapActions} from 'vuex'
	import Breadcrumb from '@/components/Breadcrumb'
	import SvgIcon from '@/components/SvgIcon'
	import { getUnreadCount, markRead } from '@/api/notification'

	export default {
		components: {
			Breadcrumb,
			SvgIcon
		},
		data() {
			return {
				user: null
			}
		},
		computed: {
			...mapGetters([
				'sidebar',
			]),
			...mapState('notification', ['unreadCounts', 'hasNewMessage']),
			hasUnread() {
				return this.hasNewMessage
			}
		},
		created() {
			this.getUserInfo()
			this.getUnreadCounts()
		},
		methods: {
			...mapActions('notification', ['getUnreadCounts']),
			toggleSideBar() {
				this.$store.dispatch('app/toggleSideBar')
			},
			getUserInfo() {
				this.user = JSON.parse(window.localStorage.getItem('user') || null)
				if (!this.user) {
					this.$router.push('/login')
				}
			},
			logout() {
				window.localStorage.removeItem('token')
				window.localStorage.removeItem('user')
				this.$router.push('/login')
				this.msgSuccess('退出成功')
			},
			async handleNotificationClick(type) {
				this.$store.commit('notification/SET_HAS_NEW_MESSAGE', false)
				try {
					await markRead(type)
					await this.getUnreadCounts(type)
					
					// 如果当前已经在消息列表页面，且类型相同，则不进行路由跳转
					const currentPath = this.$route.path
					const currentType = this.$route.query.type
					if (currentPath === '/notification' && currentType === type) {
						return
					}
					
					this.$router.push({
						path: '/notification',
						query: { type }
					})
				} catch (error) {
					console.error('标记已读失败:', error)
					this.$message.error('标记已读失败')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		height: 50px;
		overflow: hidden;
		position: relative;
		background: #fff;
		box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
		user-select: none;

		.hamburger-container {
			line-height: 46px;
			height: 100%;
			float: left;
			cursor: pointer;
			transition: background .3s;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			width: 40px;
			-webkit-tap-highlight-color: transparent;
			margin-left: 8px;
			margin-right: 12px;

			&:hover {
				background: rgba(0, 0, 0, .06);
			}
		}

		.breadcrumb-container {
			float: left;
			margin-left: 0;
		}

		.right-menu {
			float: right;
			height: 100%;
			line-height: 50px;
			display: flex;
			align-items: center;

			.avatar-container {
				margin-right: 30px;
				margin-top: 21px;
				.avatar-wrapper {
					position: relative;

					.user-avatar {
						cursor: pointer;
						width: 40px;
						height: 40px;
						border-radius: 10px;
					}

					.unread-dot {
						position: absolute;
						top: 3px;
						right: 3px;
						width: 8px;
						height: 8px;
						background: #f56c6c;
						border-radius: 50%;
					}

					.el-icon-caret-bottom {
						display: none;
					}
				}
			}
		}
	}

	.user-dropdown {
		.notification-group {
			padding: 5px 0;
			
			.notification-title {
				padding: 8px 20px;
				font-size: 13px;
				color: #303133;
				font-weight: 600;
			}

			.notification-text {
				width: 48px;
				display: inline-block;
				white-space: nowrap;
			}

			.count {
				display: inline-block;
				background: #909399;
				border-radius: 10px;
				color: #fff;
				font-size: 12px;
				height: 18px;
				line-height: 18px;
				padding: 0 4px;
				margin-left: 8px;
				min-width: 16px;
				text-align: center;

				&.has-count {
					background: #f56c6c;
				}
			}
		}
		
		.el-dropdown-item {
			padding: 8px 20px;
			height: 32px;
			line-height: 32px;
			
			a {
				color: #606266;
				text-decoration: none;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				width: 100%;
			}
		}
	}
</style>
