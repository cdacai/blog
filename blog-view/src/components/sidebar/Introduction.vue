<template>
	<div class="theme5-intro card-glow" style="border-radius: 20px">
		<!-- 添加角落装饰 -->
		<div class="corner-decoration top-right"></div>
		<div class="corner-decoration bottom-left"></div>
		
		<!-- 关于我部分 -->
		<div class="about-section">
			<div class="theme5-header">
				关于我
			</div>
			<div class="theme5-content about-content">
					<!-- <div class="name">Observe</div> -->
				<!-- <div class="roll-text" id="rollText" v-if="introduction.rollText.length!=0">我们接受所有</div> -->
				<div class="intro-text" >{{ introduction.selfIntroduction || '全栈开发者，专注Web技术，分享开发经验与技术思考。' }}</div>
			</div>
		</div>

		<!-- 暂时注释掉 social-links
		<div class="social-links">
			<a :href="introduction.github" v-if="introduction.github" target="_blank" class="social-icon">
				<i class="github icon"></i>
			</a>
			<a :href="introduction.telegram" v-if="introduction.telegram" target="_blank" class="social-icon">
				<i class="telegram icon"></i>
			</a>
			<a :href="introduction.qq" v-if="introduction.qq" target="_blank" class="social-icon">
				<i class="qq icon"></i>
			</a>
			<a :href="introduction.bilibili" v-if="introduction.bilibili" target="_blank" class="social-icon">
				<i class="video icon"></i>
			</a>
			<a :href="introduction.netease" v-if="introduction.netease" target="_blank" class="social-icon">
				<i class="music icon"></i>
			</a>
			<a :href="introduction.email" v-if="introduction.email" class="social-icon">
				<i class="mail icon"></i>
					</a>
				</div>
		-->

		<!-- 暂时注释掉 favorites
		<div class="favorites">
					<el-collapse accordion>
						<el-collapse-item :title="item.title" :name="index" v-if="item.title" v-for="(item,index) in introduction.favorites" :key="index">
							<div>{{ item.content }}</div>
						</el-collapse-item>
					</el-collapse>
		</div>
		-->

		<!-- 分类部分 -->
		<div class="category-section">
			<div class="theme5-header">
				文章分类
			</div>
			<div class="theme5-content">
				<div class="category-list">
					<router-link 
						v-for="(category,index) in categoryList.filter(c => c.blogCount > 0)" 
						:key="index"
						:to="`/category/${category.name}`" 
						class="theme5-category-item"
					>
						<span class="category-name">{{ category.name }}</span>
						<span class="category-count">{{ category.blogCount }}</span>
					</router-link>
				</div>
			</div>
		</div>
		
		<!-- 添加波浪背景 -->
		<div class="wave-bg"></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: "Introduction",
		props: {
			categoryList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				// introduction: {
				// 	avatar: '',
				// 	name: '',
				// 	rollText: [],
				// 	selfIntroduction: '',
				// 	// github: '',
				// 	// qq: '',
				// 	// bilibili: '',
				// 	// netease: '',
				// 	// email: '',
				// 	// telegram: '',
				// 	// rollText: [],
				// 	// favorites: []
				// }
			}
		},
		computed: {
			...mapState(['introduction'])
		},
		// watch: {
		// 	introduction: {
		// 			handler() {
		// 				//监听introduction变化，重新滚动
		// 				this.$nextTick(() => {
		// 					if (this.introduction.rollText.length != 0) {
		// 						this.rollText()
		// 					}
		// 				})
		// 			},
		// 			deep: true
		// 		}
		// },
		// methods: {
		// 	rollText() {
		// 		let rollText = this.introduction.rollText
		// 		if (rollText.length == 0) return
		// 		let i = 0
		// 		let text = document.getElementById('rollText')
		// 		text.textContent = rollText[i]
		// 		setInterval(() => {
		// 			if (i == rollText.length - 1) {
		// 				i = 0
		// 			} else {
		// 				i++
		// 			}
		// 			text.textContent = rollText[i]
		// 		}, 3000)
		// 	}
		// }
	}
</script>

<style scoped>
.theme5-intro {
	border-radius: 20px;
	padding: 16px;
	min-height: 36.71rem;
}

.about-section {
	margin-bottom: 40px;
	border-bottom: 1px solid rgba(203, 213, 224, 0.5);
	padding-bottom: 40px;
	color: var(--text-color);
}

.theme5-header {
	color: var(--theme-text-primary);
	font-size: 1.71rem;
	font-weight: 600;
	margin-bottom: 16px;
}

.theme5-content {
	padding: 0;
}

.about-content {
	padding: 0 0 0 4px;
	line-height: 1.8;
	color: var(--text-color);
}

.name {
	font-size: 15px;
	font-weight: normal;
	color: var(--text-color);
	margin-bottom: 6px;
}

.roll-text {
	color: var(--text-color);
	font-size: 14px;
	line-height: 1.8;
}
.intro-text {
	color: var(--text-color);
	font-size: 1.12rem;
	letter-spacing: 0.02em;
	line-height: 1.8;
	margin-bottom: 1.12rem;
}

.category-section {
	margin-top: 40px;
	transition: all 0.3s ease;
	border-radius: 20px;
	color: var(--text-color);
}

.category-section:hover {
	transform: translateY(-2px);
}

.category-list {
	display: flex;
	flex-direction: column;
	padding: 0;
	color: var(--text-color);
}

.theme5-category-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: var(--text-color);
	font-size: 14px;
	transition: all 0.2s ease;
	line-height: 1;
	height: 24px;
	padding: 20px 4px;
	border-bottom: 1px solid rgba(203, 213, 224, 0.3);
}

.theme5-category-item:last-child {
	border-bottom: none;
}

.theme5-category-item:hover {
	color: var(--primary-color);
}

.category-name {
	position: relative;
	color: var(--text-color);
}

.category-count {
	min-width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--primary-color);
	color: white;
	border-radius: 12px;
	font-size: 12px;
}

.about-me {
	background: rgba(255, 255, 255, 0.82);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	margin-bottom: 2rem;
	box-shadow: 0 4px 20px rgba(26, 71, 49, 0.04);
	transition: all 0.3s ease;
}

.about-me:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 20px rgba(26, 71, 49, 0.08);
	background: rgba(255, 255, 255, 0.9);
}

/* 增强卡片悬停效果 */
.theme5-intro:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(47, 133, 90, 0.15);
}

.about-section h3 {
  color: var(--theme-text-primary);
}

.about-content,
.intro-text,
.category-section,
.category-list,
.theme5-category-item,
.category-name {
	color: var(--text-color);
}
</style>