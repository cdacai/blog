<template>
	<div>
		<!-- 关于我部分 -->
		<div class="about-section">
			<h3>关于我</h3>
			<p>{{ introduction.selfIntroduction || '全栈开发者，专注Web技术，分享开发经验与技术思考。' }}</p>
			<div class="social-links">
				<a :href="introduction.github" v-if="introduction.github" class="social-link" target="_blank">GitHub</a>
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
		<div class="categories-section">
			<h3>文章分类</h3>
			<ul class="category-list">
				<li v-for="category in categoryList.filter(c => c.blogCount > 0)" :key="category.name" class="category-item">
					<router-link :to="`/category/${encodeURIComponent(category.name)}`" class="category-link">
						<span class="category-name">{{ category.name }}</span>
						<span class="category-count">{{ category.blogCount }}</span>
					</router-link>
				</li>
			</ul>
		</div>
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
/* 侧边栏卡片样式 */
.sidebar-content {
  background-color: var(--theme-sidebar-bg, var(--theme-card-bg, rgba(255, 255, 255, 0.82)));
  border-radius: var(--theme-sidebar-radius, 20px);
  padding: var(--theme-sidebar-padding, 32px);
  box-shadow: var(--theme-shadow-card, 0 8px 32px rgba(0,0,0,0.10));
  margin-bottom: 2rem;
  border: 1px solid var(--theme-sidebar-border, var(--theme-card-border, transparent));
  transition: background 0.3s, box-shadow 0.3s, border 0.3s;
}

.sidebar-content:hover {
  background-color: var(--theme-sidebar-hover, var(--theme-card-hover, rgba(255, 255, 255, 0.9)));
  box-shadow: var(--theme-shadow-hover, 0 12px 40px rgba(0,0,0,0.13));
  border-color: var(--theme-sidebar-border, var(--theme-card-border, transparent));
}

.about-section,
.categories-section {
  background-color: var(--theme-sidebar-bg, transparent);
  margin-bottom: 32px;
}

.about-section h3 {
  font-size: var(--theme-sidebar-about-title-size, var(--sidebar-title-size, var(--theme-sidebar-title-size, 1.5rem)));
  margin-bottom: 16px;
  color: var(--theme-text-primary);
  font-weight: var(--theme-sidebar-about-title-weight, var(--sidebar-title-weight, var(--theme-sidebar-title-weight, 700)));
  letter-spacing: var(--theme-sidebar-about-title-spacing, var(--sidebar-title-spacing, var(--theme-sidebar-title-spacing, 0)));
}

.about-section p {
  color: var(--theme-text-secondary);
  line-height: var(--theme-sidebar-about-desc-line-height, var(--sidebar-text-line-height, var(--theme-sidebar-text-line-height, 1.8)));
  font-size: var(--theme-sidebar-about-desc-size, var(--sidebar-text-size, var(--theme-sidebar-text-size, 1rem)));
  letter-spacing: var(--theme-sidebar-text-spacing);
  margin-bottom: 16px;
}

.social-links {
  display: flex;
  gap: 18px;
  margin-top: 0;
  opacity: 0.9;
}

.social-link {
  color: var(--theme-primary);
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.02em;
  font-weight: 500;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.8;
}

.categories-section {
  margin-bottom: 0;
}

.categories-section h3 {
  font-size: var(--theme-sidebar-categories-title-size, 1.13rem);
  margin-bottom: 16px;
  color: var(--theme-text-primary);
  font-weight: var(--theme-sidebar-categories-title-weight, var(--sidebar-title-weight, var(--theme-sidebar-title-weight, 700)));
  letter-spacing: var(--theme-sidebar-categories-title-spacing, var(--sidebar-title-spacing, var(--theme-sidebar-title-spacing, 0)));
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: var(--theme-text-secondary);
  font-size: var(--theme-sidebar-categories-item-size, var(--sidebar-category-size, var(--theme-sidebar-category-size, 1rem)));
  letter-spacing: var(--theme-sidebar-categories-item-spacing, var(--sidebar-category-spacing, var(--theme-sidebar-category-spacing, 0)));
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.category-item:last-child {
  border-bottom: none;
}

.category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.category-count {
  color: #fff;
  font-size: 1.02rem;
  font-weight: 700;
  flex-shrink: 0;
  background-color: var(--theme-primary);
  border-radius: 12px;
  padding: 2px 14px;
  min-width: 28px;
  text-align: center;
  line-height: 1.7;
  opacity: 0.95;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-name {
  flex: 1;
}
</style>