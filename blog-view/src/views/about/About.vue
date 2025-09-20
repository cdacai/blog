<template>
	<div>
		<div class="ui top attached segment m-padded-lr-big">
			<h2 class="m-text-500" style="text-align: center">{{ about.title }}</h2>
			<!-- <meting-js server="netease" type="song" :id="about.musicId" theme="#25CCF7" v-if="about.musicId!==''"></meting-js> -->
			<div class="typo content m-margin-top-large" v-lazy-container="{selector: 'img'}" v-viewer v-html="about.content"></div>
			
			<!--评论区域包含在主容器中-->
			<div class="ui bottom teal attached segment threaded comments">
				<CommentList :page="1" :blogId="undefined	" :blog-title="'关于我'" v-if="about.commentEnabled"/>
				<h3 class="ui header" v-else>评论已关闭</h3>
			</div>
		</div>
	</div>
</template>

<script>
	import {getAbout} from "@/api/about";
	import CommentList from "@/components/comment/CommentList";

	export default {
		name: "About",
		components: {CommentList},
		data() {
			return {
				about: {
					title: '',
					musicId: '',
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
				getAbout().then(res => {
					if (res.code === 200) {
						this.about = res.data
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			}
		}
	}
</script>

<style>
	.content ul li {
		letter-spacing: 1px !important;
	}

	.about-card {
		background: var(--theme-card-bg, #fff);
		border-radius: var(--card-radius, var(--theme-card-radius, 20px));
		box-shadow: var(--theme-shadow-card, 0 8px 32px rgba(0,0,0,0.10));
		padding: var(--card-padding, var(--theme-card-padding, 32px));
		margin-bottom: 2rem;
		transition: background 0.3s, box-shadow 0.3s;
	}

	.about-title {
		color: var(--theme-primary, #2F855A);
		font-size: var(--title-font-size, 1.5rem);
		font-weight: var(--theme-title-weight, 700);
		margin-bottom: var(--theme-section-title-margin, 16px);
	}

	.about-content {
		font-size: var(--desc-font-size, var(--theme-desc-font-size, 1rem));
		color: var(--theme-text-primary, #222);
		line-height: var(--theme-description-line-height, 1.8);
		padding: var(--card-padding, var(--theme-card-padding, 32px));
	}
</style>