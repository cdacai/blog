<template>
	<!--文章目录-->
	<div class="ui segments m-toc toc-wrapper m-box" v-show="showToc">
		<div class="ui secondary segment">
			<i class="list ul icon"></i>本文目录
		</div>
		<div class="ui yellow segment">
			<div class="js-toc"></div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: "Tocbot",
		data() {
			return {
				showToc: false,
				initAttempts: 0,
				maxAttempts: 3
			}
		},
		computed: {
			...mapState(['isBlogRenderComplete'])
		},
		watch: {
			//文章渲染完成时，生成目录
			isBlogRenderComplete: {
				handler(newVal) {
					if (newVal && this.$route.path.startsWith('/blog')) {
						this.initAttempts = 0
						this.tryInitTocbot()
					} else {
						this.showToc = false
						this.destroyTocbot()
					}
				},
				immediate: true
			}
		},
		methods: {
			tryInitTocbot() {
				if (this.initAttempts >= this.maxAttempts) {
					console.warn('Max attempts reached for tocbot initialization')
					return
				}

				this.initAttempts++
				setTimeout(() => {
					// 检查内容是否存在
					const content = document.querySelector('.js-toc-content')
					const headings = content ? content.querySelectorAll('h1,h2,h3,h4,h5') : null
					
					if (content && headings && headings.length > 0) {
						this.initTocbot()
					} else if (this.initAttempts < this.maxAttempts) {
						// 如果元素还不存在且未达到最大尝试次数，继续尝试
						this.tryInitTocbot()
					}
				}, 300 * this.initAttempts) // 递增延迟时间
			},
			initTocbot() {
				try {
					this.destroyTocbot()

					// 再次检查元素是否存在
					const content = document.querySelector('.js-toc-content')
					const toc = document.querySelector('.js-toc')
					if (!content || !toc) return

					const headings = content.querySelectorAll('h1,h2,h3,h4,h5')
					if (!headings || headings.length === 0) return

					// 确保所有标题元素都已经完全渲染
					const allHeadingsHaveOffset = Array.from(headings).every(h => h.offsetTop > 0)
					if (!allHeadingsHaveOffset) {
						if (this.initAttempts < this.maxAttempts) {
							this.tryInitTocbot()
						}
						return
					}

					tocbot.init({
						tocSelector: '.js-toc',
						contentSelector: '.js-toc-content',
						headingSelector: 'h1,h2,h3,h4,h5',
						positionFixedSelector: '.m-toc',
						scrollSmooth: true,
						scrollSmoothDuration: 420,
						scrollSmoothOffset: -60,
						headingsOffset: -60,
						hasInnerContainers: true,
						collapseDepth: 0,
						orderedList: false,
						includeHtml: true,
						onClick: function(e) {
							if (e) {
								e.preventDefault()
							}
						}
					})

					// 如果成功初始化，显示目录
					this.showToc = true
				} catch (error) {
					console.warn('Tocbot initialization failed:', error)
					if (this.initAttempts < this.maxAttempts) {
						this.tryInitTocbot()
					}
				}
			},
			destroyTocbot() {
				if (typeof tocbot !== 'undefined') {
					try {
						tocbot.destroy()
					} catch (error) {
						console.warn('Tocbot destroy failed:', error)
					}
				}
			}
		},
		beforeDestroy() {
			this.destroyTocbot()
		}
	}
</script>

<style>
	.m-toc {
		z-index: 10 !important;
		max-height: calc(100vh - 120px);
		overflow-y: auto;
		/* 隐藏滚动条 */
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	/* Chrome, Safari and Opera */
	.m-toc::-webkit-scrollbar {
		display: none;
	}

	.m-toc .toc {
		overflow-y: auto;
		max-height: 100%;
		/* 隐藏滚动条 */
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	/* Chrome, Safari and Opera */
	.m-toc .toc::-webkit-scrollbar {
		display: none;
	}

	.m-toc .toc > ul {
		overflow: hidden;
		position: relative;
		padding-left: 0;
	}

	.m-toc .toc > ul li {
		list-style: none;
		padding-left: 1em;
	}

	.m-toc .toc-list {
		list-style-type: none;
		margin: 0;
		padding-left: 10px;
	}

	.m-toc .toc-list li {
		margin: 0.5em 0;
	}

	.m-toc .toc-list li a {
		display: block;
		padding: 4px 0;
		font-weight: 300;
		color: #4a4a4a;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.m-toc .toc-list li a:hover {
		color: #fbbd08;
		padding-left: 5px;
	}

	.m-toc a.toc-link {
		color: currentColor;
		height: 100%;
	}

	.m-toc .is-collapsible {
		max-height: 1000px;
		overflow: hidden;
		transition: all 300ms ease-in-out;
	}

	.m-toc .is-collapsed {
		max-height: 0;
	}

	.m-toc.is-position-fixed {
		position: sticky !important;
		top: 60px;
	}

	.m-toc .is-active-link {
		font-weight: 700;
		color: #fbbd08 !important;
	}

	.m-toc .toc-link::before {
		background-color: #EEE;
		content: ' ';
		display: inline-block;
		height: 100%;
		left: 0;
		position: absolute;
		width: 2px;
		transition: all 0.2s ease;
	}

	.m-toc .is-active-link::before {
		background-color: #fbbd08;
	}

	.ui.segments.m-toc {
		border: none;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	}

	.ui.segments.m-toc .ui.secondary.segment {
		background: #fff;
		padding: 1em;
		font-weight: bold;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}

	.ui.segments.m-toc .ui.yellow.segment {
		background: #fff;
		padding: 1em;
		border: none;
	}
</style>