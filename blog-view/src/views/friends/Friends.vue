<template>
	<div>
		<div class="ui top attached segment" style="text-align: center">
			<h2 class="m-text-500">小伙伴们</h2>
		</div>
		<div class="ui attached segment">
			<div class="ui link three doubling cards">
				<a :href="item.website" target="_blank" rel="external nofollow noopener" class="card" :style="randomRGB()"
				   v-for="(item,index) in friendList" :key="index" @click="addViews(item.nickname)">
					<div class="image">
						<img :src="item.avatar" onerror="this.src = '/img/error.png'">
					</div>
					<div class="content">
						<div class="header">{{ item.nickname }}</div>
						<div class="description">{{ item.description }}</div>
					</div>
				</a>
			</div>
		</div>
		<!--页面描述-->
		<div class="ui teal attached segment">
			<div class="typo content" v-lazy-container="{selector: 'img'}" v-viewer v-html="info.content"></div>
		</div>
		<!--评论-->
		<div class="ui bottom teal attached segment threaded comments">
			<CommentList :page="2" :blogId="null" v-if="info.commentEnabled"/>
			<h3 class="ui header" v-else>评论已关闭</h3>
		</div>
	</div>
</template>

<script>
	import {getData, addViewsByNickname} from "@/api/friend";
	import CommentList from "@/components/comment/CommentList";

	export default {
		name: "Friends",
		components: {CommentList},
		data() {
			return {
				friendList: [],
				bgColor: [
					'#1abc9c', '#2ecc71', '#3498db', '#9b59b6',
					'#34495e', '#f1c40f', '#e67e22', '#e74c3c',
					'#ee5a24', '#9980fa', '#8c7ae6', '#f79f1f'
				],
				info: {
					content: '',
					commentEnabled: false
				}
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				getData().then(res => {
					if (res.code === 200) {
						this.friendList = res.data.friendList
						this.info = res.data.friendInfo
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			},
			addViews(nickname) {
				addViewsByNickname(nickname)
			},
			randomRGB() {
				const index = Math.floor((Math.random() * this.bgColor.length))
				return {backgroundColor: this.bgColor[index]}
			}
		}
	}
</script>

<style scoped>
	.card .image {
		width: 70px !important;
		margin: 10px auto 0px;
		background: unset !important;
	}

	.card .image img {
		border-radius: 100% !important;
		width: 70px !important;
		height: 70px !important;
	}

	.card .content {
		text-align: center;
		padding: 10px 14px !important;
		border-top: 0 !important;
	}

	.card .content * {
		color: var(--text-color) !important;
	}

	.card .content .header {
		font-size: 16px !important;
	}

	.card .content .description {
		font-size: 12px !important;
	}

	.card .content .description {
		margin-top: 5px !important;
		margin-bottom: 7px;
	}

	.friend-card {
		background: var(--theme-card-bg, #fff);
		border-radius: var(--card-radius, var(--theme-card-radius, 20px));
		box-shadow: var(--theme-shadow-card, 0 8px 32px rgba(0,0,0,0.10));
		padding: var(--card-padding, var(--theme-card-padding, 32px));
		margin-bottom: 2rem;
		transition: background 0.3s, box-shadow 0.3s;
	}

	.friend-title {
		color: var(--theme-primary, #2F855A);
		font-size: var(--title-font-size, 1.5rem);
		font-weight: var(--theme-title-weight, 700);
		margin-bottom: var(--theme-section-title-margin, 16px);
	}

	.friend-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--element-gap, 24px);
	}
</style>