<template>
	<div class="ui segments m-box theme5-random">
		<div class="ui secondary segment theme5-header">
			<i class="bookmark icon"></i>随机文章
		</div>
		<div class="ui segment theme5-content">
			<div class="ui divided items">
				<div class="m-item theme5-item" v-for="blog in randomBlogList" :key="blog.id" @click.prevent="toBlog(blog)">
					<div class="img" :style="{'background-image':'url(' + blog.firstPicture + ')'}"></div>
					<div class="info">
						<div class="date">{{ blog.createTime | dateFormat('YYYY-MM-DD') }}</div>
						<div class="title">{{ blog.title }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RandomBlog",
		props: {
			randomBlogList: {
				type: Array,
				required: true
			},
		},
		methods: {
			toBlog(blog) {
				this.$store.dispatch('goBlogPage', blog)
			}
		}
	}
</script>

<style scoped>
.theme5-random {
	border: none !important;
	box-shadow: none !important;
	margin-top: 2rem !important;
}

.theme5-header {
	background: rgba(255, 255, 255, 0.9) !important;
	backdrop-filter: blur(10px);
	border: none !important;
	border-radius: 1rem !important;
	padding: 1rem !important;
	color: #2F855A !important;
	font-weight: 500;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.theme5-content {
	background: rgba(255, 255, 255, 0.9) !important;
	backdrop-filter: blur(10px);
	border: none !important;
	border-radius: 1rem !important;
	padding: 1rem !important;
	margin-top: 1rem !important;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.ui.divided.items .theme5-item {
	margin-top: 1rem;
	height: 7rem;
	position: relative;
	overflow: hidden;
	border-radius: 0.5rem;
	cursor: pointer;
	user-select: none;
	transition: all 0.3s ease;
}

.ui.divided.items .theme5-item:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.ui.divided.items .theme5-item:first-child {
	margin-top: 0;
}

.ui.divided.items .theme5-item .img {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	object-fit: cover;
	background-position: center;
	background-size: cover;
	transition: all 0.3s ease;
}

.ui.divided.items .theme5-item:hover .img {
	transform: scale(1.05);
}

.ui.divided.items .theme5-item .info {
	z-index: 1;
	background: linear-gradient(to bottom, rgba(47, 133, 90, 0), rgba(47, 133, 90, 0.9));
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 1rem !important;
	font-size: 0.9rem;
	color: white;
}

.ui.divided.items .theme5-item .info .title {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	word-break: break-word;
	font-weight: 500;
}

.ui.divided.items .theme5-item .info .date {
	font-size: 0.8rem;
	opacity: 0.8;
	margin-bottom: 0.3rem;
}
</style>