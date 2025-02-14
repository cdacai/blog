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
				likeMomentIds: JSON.parse(window.localStorage.getItem('likeMomentIds') || '[]'),
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
					return this.likeMomentIds.indexOf(id) > -1
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
				// 检查是否已经点赞
				if (this.likeMomentIds.indexOf(id) > -1) {
					this.msgWarning('不可以重复点赞哦')
					return
				}
				likeMoment(id).then(res => {
					if (res.code === 200) {
						if (res.msg === '点赞成功') {
							this.msgSuccess(res.msg)
							this.likeMomentIds.push(id)
							this.momentList.forEach(item => {
								if (item.id === id) {
									item.likes++
								}
							})
						} else {
							// 处理重复点赞的情况
							this.msgWarning(res.msg)
							if (this.likeMomentIds.indexOf(id) === -1) {
								this.likeMomentIds.push(id)
							}
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
	color: #1a4731;
	font-size: 2rem;
	font-weight: 600;
	margin-bottom: 2rem;
	padding-bottom: 1rem;
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
	background: rgba(255, 255, 255, 0.82);
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
	color: #2F855A;
}

.moment-time {
	font-size: 0.875rem;
	color: #666;
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
	color: #2F855A;
	background: rgba(47, 133, 90, 0.1);
	transition: all 0.3s ease;
	cursor: pointer;
}

.like-button:hover {
	background: rgba(47, 133, 90, 0.2);
}

.like-button .like-color {
	color: #e53e3e;
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
	background: rgba(255, 255, 255, 0.82);
	border-radius: 1rem;
	padding: 6rem 2rem;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #666;
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
	color: #2F855A;
}

.empty-text {
	text-align: center;
}

.empty-text .primary-text {
	font-size: 1.25rem;
	color: #2F855A;
	font-weight: 500;
	margin: 0 0 0.5rem 0;
}

.empty-text .secondary-text {
	font-size: 1rem;
	color: #666;
	margin: 0;
	opacity: 0.8;
}
</style>