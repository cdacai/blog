<template>
	<div class="moments-container">
		<h2 class="article-header">我的动态</h2>
		<div class="moments-wrapper">
			<div v-if="momentList.length === 0" class="empty-moments">
				<div class="empty-icon">
					<i class="el-icon-chat-dot-square"></i>
				</div>
				<div class="empty-text">
					<p class="primary-text">暂时还没有动态内容</p>
					<p class="secondary-text">去发现更多精彩内容吧~</p>
				</div>
			</div>
			<template v-else>
				<div class="moments">
					<div class="moment" v-for="(moment,index) in momentList" :key="index">
						<div class="moment-card">
							<div class="moment-header">
								<div class="moment-avatar">
									<img :src="$store.state.introduction.avatar">
								</div>
								<div class="moment-info">
									<span class="moment-author">{{ $store.state.introduction.name }}</span>
									<span class="moment-time">{{ moment.createTime | dateFromNow }}</span>
								</div>
							</div>
							<div class="moment-content typo" v-lazy-container="{selector: 'img'}" v-viewer
								v-html="moment.content"></div>
							<div class="moment-footer">
								<a class="like-button" @click="like(moment.id)">
									<i class="heart icon" :class="isLike(moment.id)?'like-color':'outline'"></i>
									<span>{{ moment.likes }}</span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<Pagination :getBlogList="getMomentList" :totalPage="totalPage"/>
			</template>
		</div>
	</div>
</template>

<script>
	import {getMomentListByPageNum, likeMoment} from "@/api/moment";
	import Pagination from "@/components/blog/Pagination";
	import {Message} from 'element-ui'

	export default {
		name: "Moments",
		components: {Pagination},
		data() {
			return {
				momentList: [],
				pageNum: 1,
				totalPage: 0
			}
		},
		created() {
			this.getMomentList()
		},
		computed: {
			isLike() {
				return function (id) {
					return false;
				}
			}
		},
		watch: {
			likeMomentIds(newValue) {
				//将likeMomentIds最新值的json数据保存到localStorage
				window.localStorage.setItem('likeMomentIds', JSON.stringify(newValue))
			}
		},
		methods: {
			msgSuccess(msg) {
				Message.success(msg)
			},
			msgWarning(msg) {
				Message.warning(msg)
			},
			msgError(msg) {
				Message.error(msg)
			},
			getMomentList(pageNum) {
				//如果有则发送博主身份Token
				const adminToken = window.localStorage.getItem('adminToken')
				const token = adminToken ? adminToken : ''
				getMomentListByPageNum(token, pageNum || this.pageNum).then(res => {
					if (res.code === 200) {
						this.momentList = res.data.list
						this.totalPage = res.data.totalPage
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			},
			like(id) {
				likeMoment(id).then(res => {
					if (res.code === 200) {
						if (res.msg === '点赞成功') {
							this.msgSuccess(res.msg)
							this.momentList.forEach(item => {
								if (item.id === id) {
									item.likes++
									item._liked = true
								}
							})
						} else {
							// 处理重复点赞的情况
							this.msgWarning(res.msg)
						}
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError('网络异常，请稍后重试')
				})
			}
		}
	}
</script>

<style scoped>
.moments-container {
	flex: 1;
}

.article-header {
	color: var(--primary-color);
	font-size: 2rem;
	font-weight: 600;
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	position: relative;
}

.article-header::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100px;
	height: 3px;
	background: var(--primary-color, #38a169);
	border-radius: 3px;
}

.moments-wrapper {
	border-radius: 1rem;
	padding: 0;
	box-shadow: none;
	background: none;
}

.moments {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.moment-card {
	background: var(--theme-card-bg, #fff);
	border-radius: 1rem;
	padding: 1.5rem;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	margin-bottom: 2rem;
}

.moment-header {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
}

.moment-avatar img {
	width: 45px;
	height: 45px;
	border-radius: 50%;
	object-fit: cover;
}

.moment-info {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.moment-author {
	font-weight: 600;
	color: var(--primary-color);
}

.moment-time {
	font-size: 0.875rem;
	color: var(--text-color);
}

.moment-content {
	padding: 1rem 0;
	font-size: 1rem;
	line-height: 1.8;
	word-break: break-word;
	width: 100%;
}

.moment-content img {
	display: block;
	margin: 0.5rem auto;
	width: 100%;
	height: auto;
	max-height: calc(80% - 100px);
	object-fit: contain;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.moment-footer {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid rgba(47, 133, 90, 0.1);
}

.like-button {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	color: var(--primary-color);
	background: rgba(47, 133, 90, 0.1);
	transition: all 0.3s ease;
	cursor: pointer;
	background: color-mix(in srgb, var(--primary-color) 10%, transparent);
}

.like-button:hover {
	background: color-mix(in srgb, var(--primary-color) 20%, transparent);
}

.like-button .like-color {
	color: var(--primary-color);
}

.ui.bottom {
	margin-top: 7rem;
}

@media screen and (max-width: 768px) {
	.moments-wrapper {
		padding: 1rem;
	}

	.moment-card {
		padding: 1rem;
	}

	.ui.bottom {
		margin-top: 3rem;
	}
}

.empty-moments {
	background: var(--theme-card-bg, #fff);
	border-radius: 1rem;
	padding: 6rem 2rem;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: var(--text-color);
}

.empty-icon {
	background: rgba(47, 133, 90, 0.1);
	border-radius: 50%;
	width: 80px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1.5rem;
	transition: all 0.3s ease;
}

.empty-icon:hover {
	transform: scale(1.05);
	background: rgba(47, 133, 90, 0.15);
}

.empty-icon i {
	font-size: 2.5rem;
	color: var(--primary-color);
}

.empty-text {
	text-align: center;
}

.empty-text .primary-text {
	font-size: 1.25rem;
	color: var(--primary-color);
	font-weight: 500;
	margin: 0 0 0.5rem 0;
}

.empty-text .secondary-text {
	font-size: 1rem;
	color: var(--text-color);
	margin: 0;
	opacity: 0.8;
}
</style>