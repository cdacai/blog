<template>
	<div>
		<div class="main-content">
			<h2 class="article-header">文章归档</h2>
			<div class="archives-wrapper">
				<div class="ui attached segment" style="background: rgba(255, 255, 255, 0.82); border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
					<p style="color: #276749; text-align: center; margin-bottom: 2rem;">好! 目前共计 {{ count }} 篇日志。 继续努力。</p>
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
		color: #1a4731;
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
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
		color: #276749;
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
		color: #3182ce;
	}

	.tl-dark .tl-wrap {
		color: #2d3748;
	}

	.tl-green .tl-wrap {
		color: #38a169;
	}

	.tl-purple .tl-wrap {
		color: #805ad5;
	}

	.tl-red .tl-wrap {
		color: #e53e3e;
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
		color: white !important;
	}

	.tl-blue .tl-title {
		background: #3182ce !important;
	}

	.tl-dark .tl-title {
		background: #2d3748 !important;
	}

	.tl-green .tl-title {
		background: #38a169 !important;
	}

	.tl-purple .tl-title {
		background: #805ad5 !important;
	}

	.tl-red .tl-title {
		background: #e53e3e !important;
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
		color: #3182ce !important;
	}

	.tl-blue .tl-item .tl-wrap {
		border-color: #3182ce;
	}

	.tl-dark .tl-header a {
		background: rgba(45, 55, 72, 0.1) !important;
		color: #2d3748 !important;
	}

	.tl-dark .tl-item .tl-wrap {
		border-color: #2d3748;
	}

	.tl-green .tl-header a {
		background: rgba(72, 187, 120, 0.1) !important;
		color: #38a169 !important;
	}

	.tl-green .tl-item .tl-wrap {
		border-color: #38a169;
	}

	.tl-purple .tl-header a {
		background: rgba(159, 122, 234, 0.1) !important;
		color: #805ad5 !important;
	}

	.tl-purple .tl-item .tl-wrap {
		border-color: #805ad5;
	}

	.tl-red .tl-header a {
		background: rgba(245, 101, 101, 0.1) !important;
		color: #e53e3e !important;
	}

	.tl-red .tl-item .tl-wrap {
		border-color: #e53e3e;
	}
</style>