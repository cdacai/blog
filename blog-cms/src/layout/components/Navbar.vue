<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

		<breadcrumb class="breadcrumb-container"/>

		<div class="right-menu">
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<img :src="user.avatar" class="user-avatar">
					<div v-if="hasUnread" class="unread-dot"></div>
				</div>
				<el-dropdown-menu slot="dropdown" class="user-dropdown">
					<div class="notification-group">
						<div class="notification-title">消息通知</div>
						<el-dropdown-item>
							<router-link to="/blog/comment/list" @click.native="handleNotificationClick('comment')">
								<span class="notification-text">新评论</span>
								<span class="count" :class="{ 'has-count': unreadCounts.comment > 0 }">{{ unreadCounts.comment || 0 }}</span>
							</router-link>
						</el-dropdown-item>
						<el-dropdown-item>
							<router-link to="/blog/moment/list" @click.native="handleNotificationClick('like')">
								<span class="notification-text">新点赞</span>
								<span class="count" :class="{ 'has-count': unreadCounts.like > 0 }">{{ unreadCounts.like || 0 }}</span>
							</router-link>
						</el-dropdown-item>
						<el-dropdown-item>
							<router-link to="/blog/comment/reports" @click.native="handleNotificationClick('report')">
								<span class="notification-text">新举报</span>
								<span class="count" :class="{ 'has-count': unreadCounts.report > 0 }">{{ unreadCounts.report || 0 }}</span>
							</router-link>
						</el-dropdown-item>
					</div>
					<el-dropdown-item divided>
						<SvgIcon icon-class="logout" class-name="svg"/>
						<span @click="logout">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Breadcrumb from '@/components/Breadcrumb'
	import Hamburger from '@/components/Hamburger'
	import SvgIcon from '@/components/SvgIcon'
	import { getUnreadCount, markRead } from '@/api/notification'

	export default {
		components: {
			Breadcrumb,
			Hamburger,
			SvgIcon
		},
		data() {
			return {
				user: null,
				unreadCounts: {
					comment: 0,
					like: 0,
					report: 0
				},
				timer: null
			}
		},
		computed: {
			...mapGetters([
				'sidebar',
			]),
			hasUnread() {
				return this.unreadCounts.comment > 0 || 
					   this.unreadCounts.like > 0 || 
					   this.unreadCounts.report > 0
			}
		},
		created() {
			this.getUserInfo()
			this.getUnreadCounts()
			// 每30秒轮询一次未读消息
			this.timer = setInterval(this.getUnreadCounts, 30000)
		},
		beforeDestroy() {
			// 组件销毁前清除定时器
			if (this.timer) {
				clearInterval(this.timer)
			}
		},
		methods: {
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
				await markRead(type)
				this.unreadCounts[type] = 0
			},
			async getUnreadCounts() {
				try {
					const res = await getUnreadCount()
					if (res.code === 200) {
						this.unreadCounts = res.data
					}
				} catch (error) {
					console.error('获取未读消息数量失败:', error)
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
			-webkit-tap-highlight-color: transparent;

			&:hover {
				background: rgba(0, 0, 0, .025)
			}
		}

		.breadcrumb-container {
			float: left;
		}

		.right-menu {
			float: right;
			height: 100%;
			line-height: 50px;

			&:focus {
				outline: none;
			}

			.right-menu-item {
				display: inline-block;
				padding: 0 8px;
				height: 100%;
				font-size: 18px;
				color: #5a5e66;
				vertical-align: text-bottom;

				&.hover-effect {
					cursor: pointer;
					transition: background .3s;

					&:hover {
						background: rgba(0, 0, 0, .025)
					}
				}
			}

			.avatar-container {
				margin-right: 20px;

				.avatar-wrapper {
					margin-top: 5px;
					position: relative;

					.user-avatar {
						cursor: pointer;
						width: 40px;
						height: 40px;
						border-radius: 10px;
					}

					.unread-dot {
						position: absolute;
						left: -3px;
						bottom: -3px;
						width: 10px;
						height: 10px;
						background: #ff4d4f;
						border-radius: 50%;
						border: 2px solid #fff;
						box-shadow: 0 0 0 1px #ff4d4f;
					}

					.el-icon-caret-bottom {
						cursor: pointer;
						position: absolute;
						right: -20px;
						top: 0px;
						font-size: 12px;
					}
				}
			}
		}
	}

	.user-dropdown .svg {
		margin-right: 5px;
	}

	.el-dropdown-menu {
		margin: 7px 0 0 0 !important;
		padding: 0 !important;
		border: 0 !important;
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

	.avatar-wrapper {
		position: relative;
		
		.unread-dot {
			position: absolute;
			top: 3px;
			right: 3px;
			width: 8px;
			height: 8px;
			background: #f56c6c;
			border-radius: 50%;
		}
	}
</style>
