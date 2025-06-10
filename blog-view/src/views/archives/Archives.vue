<template>
	<div>
		<div class="main-content">
			<h2 class="article-header">文章归档</h2>
			<div class="archives-wrapper">
				<div class="ui attached segment" style="background: rgba(255, 255, 255, 0.82); border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
					<p style="color: var(--primary-color); text-align: center; margin-bottom: 2rem;">好! 目前共计 {{ count }} 篇日志。 继续努力。</p>
					<div class="timeline">
						<div :class="colorObj[index%5]" v-for="(value,key,index) in blogMap" :key="index">
							<div class="tl-header">
								<a class="ui large label m-text-500">{{ key }}</a>
							</div>
							<div class="tl-item" v-for="blog in value" :key="blog.id">
								<div class="tl-wrap">
									<span class="tl-date">{{ blog.day }}</span>
									<a href="javascript:;" @click.prevent="toBlog(blog)">
										<div class="ui left pointing label tl-title">{{ blog.title }}</div>
									</a>
								</div>
							</div>
						</div>

						<div class="tl-header">
							<a class="ui black large label m-text-500">Hello World!</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getArchives} from "@/api/archives";

	export default {
		name: "Archives",
		data() {
			return {
				blogMap: {},
				count: 0,
				colorObj: {
					0: 'tl-blue',
					1: 'tl-dark',
					2: 'tl-green',
					3: 'tl-purple',
					4: 'tl-red',
				}
			}
		},
		created() {
			this.getArchives()
		},
		methods: {
			getArchives() {
				getArchives().then(res => {
					if (res.code === 200) {
						this.blogMap = res.data.blogMap
						this.count = res.data.count
					} else {
						this.msgError(res.msg);
					}
				}).catch(() => {
					this.msgError("请求失败");
				})
			},
			toBlog(blog) {
				this.$store.dispatch('goBlogPage', blog)
			}
		}
	}
</script>

<style scoped>
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

	.archives-wrapper {
		border-radius: 1rem;
		padding: 0;
		box-shadow: none;
		background: none;
	}

	.timeline {
		margin: 20px 0;
	}

	.tl-header {
		width: 12em;
		text-align: center;
	}

	.tl-date {
		position: relative;
		top: 10px;
		display: block;
		float: left;
		width: 4.5em;
		margin-left: -7.5em;
		text-align: right;
		color: var(--primary-color);
	}

	.tl-wrap {
		padding: 15px 0 15px 20px;
		margin-left: 6em;
		border-style: solid;
		border-width: 0 0 0 4px;
		position: relative;
	}

	.tl-wrap::after {
		content: '';
		position: absolute;
		left: -8px;
		top: 50%;
		transform: translateY(-50%);
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: white;
		border: 2px solid;
		transition: all 0.3s ease;
	}

	.tl-wrap:hover::after {
		background: currentColor;
		transform: translateY(-50%) scale(0.7);
	}

	.tl-blue .tl-wrap {
		color: var(--primary-color);
	}

	.tl-dark .tl-wrap {
		color: var(--text-color);
	}

	.tl-green .tl-wrap {
		color: var(--primary-color);
	}

	.tl-purple .tl-wrap {
		color: var(--primary-color);
	}

	.tl-red .tl-wrap {
		color: var(--primary-color);
	}

	.tl-blue .tl-wrap::after {
		border-color: currentColor;
	}

	.tl-dark .tl-wrap::after {
		border-color: currentColor;
	}

	.tl-green .tl-wrap::after {
		border-color: currentColor;
	}

	.tl-purple .tl-wrap::after {
		border-color: currentColor;
	}

	.tl-red .tl-wrap::after {
		border-color: currentColor;
	}

	.tl-title {
		font-size: 1rem !important;
		position: relative !important;
		padding: 0.5rem 1rem !important;
		border-radius: 4px !important;
		transition: all 0.3s ease !important;
		color: var(--timeline-title-color, #fff) !important;
	}

	.tl-blue .tl-title,
	.tl-green .tl-title,
	.tl-purple .tl-title,
	.tl-red .tl-title {
		background: var(--primary-color) !important;
	}

	.tl-dark .tl-title {
		background: var(--text-color) !important;
		color: #fff !important;
	}

	.tl-title:hover {
		transform: translateX(4px);
		opacity: 0.9;
	}

	.ui.left.pointing.label:before {
		border-right-color: inherit;
	}

	.main-content {
		flex: 0 0 64%;
		margin: 0 auto;
		max-width: 800px;
	}

	@media screen and (max-width: 768px) {
		.main-content {
			flex: 0 0 100%;
			padding: 0 1.5rem;
		}
	}

	.tl-blue .tl-header a {
		background: rgba(66, 153, 225, 0.1) !important;
		color: var(--primary-color) !important;
	}

	.tl-blue .tl-item .tl-wrap {
		border-color: var(--primary-color);
	}

	.tl-dark .tl-header a {
		background: rgba(45, 55, 72, 0.1) !important;
		color: var(--text-color) !important;
	}

	.tl-dark .tl-item .tl-wrap {
		border-color: var(--text-color);
	}

	.tl-green .tl-header a {
		background: rgba(72, 187, 120, 0.1) !important;
		color: var(--primary-color) !important;
	}

	.tl-green .tl-item .tl-wrap {
		border-color: var(--primary-color);
	}

	.tl-purple .tl-header a {
		background: rgba(159, 122, 234, 0.1) !important;
		color: var(--primary-color) !important;
	}

	.tl-purple .tl-item .tl-wrap {
		border-color: var(--primary-color);
	}

	.tl-red .tl-header a {
		background: rgba(245, 101, 101, 0.1) !important;
		color: var(--primary-color) !important;
	}

	.tl-red .tl-item .tl-wrap {
		border-color: var(--primary-color);
	}

	.main-content, .archives-wrapper, .timeline {
		max-width: 100vw;
		overflow-x: hidden;
		box-sizing: border-box;
	}

	/* timeline、tl-header等宽度限制，防止溢出 */
	.timeline, .tl-header, .tl-wrap {
		max-width: 100%;
		box-sizing: border-box;
		word-break: break-all;
	}
</style>