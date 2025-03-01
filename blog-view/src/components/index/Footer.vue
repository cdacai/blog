<template>
	<footer class="ui inverted vertical segment m-padded-tb-large m-opacity">
		<!-- 添加页脚装饰色块 -->
		<div class="color-block footer-circle-left"></div>
		<div class="color-block footer-circle-right"></div>
		<div class="color-block footer-oval-center"></div>
		
		<div class="ui center aligned container">
			<!-- <div class="ui inverted divided stackable grid"> -->

				<!-- <div class="three wide column">
					<div class="ui link list">
						<h4 class="ui inverted header m-text-thin m-text-spaced">{{ siteInfo.footerImgTitle }}</h4>
						<div class="item">
							<img :src="siteInfo.footerImgUrl" class="ui rounded image" alt="" style="width: 100px">
						</div>
					</div>
				</div> -->

				<!-- <div class="six wide column">
					<h4 class="ui inverted header m-text-thin m-text-spaced">最新博客</h4>
					<div class="ui inverted link list">
						<a href="javascript:;" @click.prevent="toBlog(item)" v-for="item in newBlogList" :key="item.id" class="item m-text-thin m-padded-tb-small">{{ item.title }}</a>
					</div>
				</div>

				<div class="seven wide column">
					<p id="hitokotoText" class="m-text-thin m-text-spaced m-opacity-mini">{{ hitokoto.hitokoto }}</p>
					<p id="hitokotoFrom" class="m-text-thin m-text-spaced m-opacity-mini" style="float: right" v-text="hitokoto.from?`——《${hitokoto.from}》`:''"></p>
				</div>
			</div> -->

			<p class="m-text-thin m-text-spaced m-opacity-tiny">
				<!-- <span style="margin-right: 10px" v-if="siteInfo.copyright">{{ siteInfo.copyright.title }}</span> -->
				<!-- <router-link to="/" style="color:#ffe500" v-if="siteInfo.copyright">{{ siteInfo.copyright.siteName }}</router-link> -->
				<!-- <span style="margin: 0 15px" v-if="siteInfo.copyright && siteInfo.beian">|</span> -->
				<span>本网站由 </span>
				<a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank">
					<img src="/img/upyun-logo.png" alt="又拍云" class="upyun"/>
				</a>
				<span> 提供云存储服务</span>
				<span style="margin: 0px 15px;">|</span>
				<span>
					<img src="/img/police.png" style=" width: 17px;vertical-align: sub;"/>
					<a href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002005336" rel="noreferrer" target="_blank"> 粤公网安备44030002005336</a>
				</span>
				<span style="margin: 0px 15px;">|</span>
				<a rel="external nofollow noopener" href="https://beian.miit.gov.cn/" target="_blank" >{{ siteInfo.beian }}</a>
			</p>

			<!-- <div class="github-badge" v-for="(item,index) in badges" :key="index">
				<a rel="external nofollow noopener" :href="item.url" target="_blank" :title="item.title">
					<span class="badge-subject">{{ item.subject }}</span>
					<span class="badge-value" :class="`bg-${item.color}`">{{ item.value }}</span>
				</a>
			</div> -->

		</div>
	</footer>
</template>

<script>
	export default {
		name: "Footer",
		props: {
			siteInfo: {
				type: Object,
				required: true
			},
			badges: {
				type: Array,
				required: true
			},
			newBlogList: {
				type: Array,
				required: true
			},
			// hitokoto: {
			// 	type: Object,
			// 	required: true
			// }
		},
		methods: {
			toBlog(blog) {
				this.$store.dispatch('goBlogPage', blog)
			}
		}
	}
</script>

<style scoped>
	@import "../../assets/css/badge.css";

	.github-badge a {
		color: #fff;
	}

	footer {
		position: relative;
		background-color: #8bc594 !important;
		background-image: linear-gradient(0deg, #8bc594 0%, #a3d4ab 100%),
			url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.pattern{fill:%239ed3a7;fill-opacity:0.8}%3C/style%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath class='pattern' d='M0 0h40v2H0zM0 10h40v2H0zM0 20h40v2H0zM0 30h40v2H0zM0 0h2v40H0zM10 0h2v40h-2zM20 0h2v40h-2zM30 0h2v40h-2z'/%3E%3C/svg%3E") !important;
		background-repeat: repeat !important;
		background-position: center !important;
		background-size: 40px !important;
		padding: 3rem 0 3rem !important;
		margin-top: 5rem !important;
	}

	.m-text-thin {
		font-weight: 400 !important;
	}

	.m-text-spaced {
		letter-spacing: 1px !important;
	}

	.m-text-lined {
		line-height: 1.8;
	}

	.m-opacity-tiny {
		opacity: 0.9 !important;
		color: #1a4731 !important;
	}

	.upyun {
		height: 30px;
		margin: 0 auto;
		vertical-align: middle;
	}

	footer a {
		color: #1a4731 !important;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	footer a:hover {
		color: #276749 !important;
		text-decoration: underline;
	}
</style>