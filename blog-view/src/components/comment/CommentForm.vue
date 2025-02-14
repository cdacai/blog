<template>
	<div class="form">
		<h3 class="form-title">
			<span>发表评论</span>
			<el-button 
				class="cancel-reply" 
				size="mini" 
				plain
				@click="$store.commit(SET_PARENT_COMMENT_ID, -1)" 
				v-show="parentCommentId!==-1">
				取消回复
			</el-button>
		</h3>
		<el-form :model="commentForm" :rules="formRules" ref="formRef" size="small" class="comment-form">
			<!-- 昵称和邮箱放在第一行 -->
			<div class="form-row">
				<el-form-item prop="nickname" class="form-item">
					<el-input 
						v-model="commentForm.nickname" 
						placeholder="昵称（必填）" 
						:validate-event="false">
						<i slot="prefix" class="el-input__icon el-icon-user"></i>
					</el-input>
				</el-form-item>

				<el-form-item prop="email" class="form-item">
					<el-input 
						v-model="commentForm.email" 
						placeholder="邮箱（必填）" 
						:validate-event="false">
						<i slot="prefix" class="el-input__icon el-icon-message"></i>
					</el-input>
				</el-form-item>
			</div>

			<!-- 评论内容框放在最下方 -->
			<div class="content-wrapper">
				<el-input 
					class="textarea" 
					type="textarea" 
					:rows="5" 
					v-model="commentForm.content" 
					placeholder="评论千万条，友善第一条"
					maxlength="500" 
					show-word-limit>
				</el-input>
				
				<!-- 表情选择器移到评论框右下角 -->
				<div class="emoji-trigger">
					<img src="https://cdn.caixiaohu.com/emoji/paopao/1.png" @click="showEmojiBox" class="emoji-icon">
					<div class="mask" v-show="emojiShow" @click="hideEmojiBox"></div>
					<div class="emoji-box" v-show="emojiShow">
						<!-- 保持表情框内容不变 -->
						<div class="emoji-title">
							<span>{{ activeEmojiTab === 0 ? 'tv_小电视' : activeEmojiTab === 1 ? '阿鲁' : '泡泡' }}</span>
						</div>
						<div class="emoji-wrap" v-show="activeEmojiTab===0">
							<div class="emoji-list" v-for="(img,index) in tvMapper" :key="index" @click="insertEmoji(img.name)">
								<img :src="img.src" :title="img.name">
							</div>
						</div>
						<div class="emoji-wrap" v-show="activeEmojiTab===1">
							<div class="emoji-list" v-for="(img,index) in aruMapper" :key="index" @click="insertEmoji(img.name)">
								<img :src="img.src" :title="img.name">
							</div>
						</div>
						<div class="emoji-wrap" v-show="activeEmojiTab===2">
							<div class="emoji-list" v-for="(img,index) in paopaoMapper" :key="index" @click="insertEmoji(img.name)">
								<img :src="img.src" :title="img.name">
							</div>
						</div>
						<div class="emoji-tabs">
							<a class="tab-link" :class="{'on':activeEmojiTab===0}" @click="activeEmojiTab=0">
								<img src="https://cdn.caixiaohu.com/emoji/tv/1.png">
							</a>
							<a class="tab-link" :class="{'on':activeEmojiTab===1}" @click="activeEmojiTab=1">
								<img src="https://cdn.caixiaohu.com/emoji/aru/1.png">
							</a>
							<a class="tab-link" :class="{'on':activeEmojiTab===2}" @click="activeEmojiTab=2">
								<img src="https://cdn.caixiaohu.com/emoji/paopao/1.png">
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- 底部操作栏 -->
			<div class="form-footer">
				<div class="form-actions">
					<div class="notice-switch">
						<span class="switch-label">订阅回复</span>
						<el-switch
							v-model="commentForm.notice"
							active-color="#2F855A"
							inactive-color="#dcdfe6">
						</el-switch>
					</div>
					<el-button 
						type="success" 
						size="mini"
						v-throttle="[postForm,'click',3000]"
						style="background-color: rgb(47, 133, 90); border-color: rgb(47, 133, 90);">发表评论</el-button>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {checkEmail} from "@/common/reg";
	import {SET_PARENT_COMMENT_ID} from "@/store/mutations-types";
	import tvMapper from '@/plugins/tvMapper.json'
	import aruMapper from '@/plugins/aruMapper.json'
	import paopaoMapper from '@/plugins/paopaoMapper.json'

	export default {
		name: "CommentForm",
		computed: {
			...mapState(['parentCommentId', 'commentForm', 'commentQuery'])
		},
		data() {
			return {
				SET_PARENT_COMMENT_ID,
				formRules: {
					nickname: [
						{required: true, message: '请输入评论昵称'},
						{max: 18, message: '昵称不可多于15个字符'}
					],
					email: [
						{required: true, message: '请输入评论邮箱'},
						{validator: checkEmail}
					]
				},
				emojiShow: false,
				activeEmojiTab: 0,
				tvMapper: [],
				aruMapper: [],
				paopaoMapper: [],
				textarea: null,
				start: 0,
				end: 0,
			}
		},
		created() {
			this.tvMapper = tvMapper
			this.aruMapper = aruMapper
			this.paopaoMapper = paopaoMapper
		},
		mounted() {
			this.textarea = document.querySelector('.el-form textarea')
		},
		methods: {
			showEmojiBox() {
				this.start = this.textarea.selectionStart
				this.end = this.textarea.selectionEnd
				this.textarea.focus()
				this.textarea.setSelectionRange(this.start, this.end)
				this.emojiShow = !this.emojiShow
			},
			insertEmoji(name) {
				let str = this.commentForm.content
				this.commentForm.content = str.substring(0, this.start) + name + str.substring(this.end)
				this.start += name.length
				this.end = this.start
				this.textarea.focus()
				this.$nextTick(() => {
					this.textarea.setSelectionRange(this.start, this.end)
				})
				this.emojiShow = false
			},
			hideEmojiBox() {
				this.emojiShow = false
				this.textarea.focus()
				this.textarea.setSelectionRange(this.start, this.end)
			},
			postForm() {
				const adminToken = window.localStorage.getItem('adminToken')
				if (adminToken) {
					//博主登录后，localStorage中会存储token，在后端设置属性，可以不校验昵称、邮箱
					if (this.commentForm.content === '' || this.commentForm.content.length > 250) {
						this.$notify({
							title: '评论失败',
							message: '评论内容有误',
							type: 'warning'
						})
						return
					}
					this.$store.dispatch('submitCommentForm', adminToken)
					return
				}
				
				const blogToken = window.localStorage.getItem(`blog${this.commentQuery.blogId}`)
				this.$refs.formRef.validate(valid => {
					if (!valid || this.commentForm.content === '' || this.commentForm.content.length > 250) {
						this.$notify({
							title: '评论失败',
							message: '请正确填写评论',
							type: 'warning'
						})
						return
					}
					this.$store.dispatch('submitCommentForm', blogToken ? blogToken : '')
				})
			}
		}
	}
</script>

<style scoped>
.form {
	margin: 1.5rem 0;
}

.form-title {
	color: #2d3748;
	font-size: 1.25rem;
	margin-bottom: 1.5rem;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.cancel-reply {
	font-size: 0.875rem;
	background-color: #fff !important;
	border-color: #d1d5db !important;
	color: #4b5563 !important;
}

.cancel-reply:hover {
	background-color: #f9fafb !important;
	border-color: #9ca3af !important;
	color: #374151 !important;
}

.comment-form {
	background-color: #fff;
	border-radius: 8px;
}

.form-row {
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;
}

.form-item {
	flex: 0 0 185px;
	margin-bottom: 0;
}

.content-wrapper {
	position: relative;
	margin-bottom: 1rem;
}

.textarea {
	width: 100%;
}

.textarea :deep(.el-input__inner),
.form-item :deep(.el-input__inner) {
	border-color: #e2e8f0;
	transition: all 0.3s ease;
}

.textarea :deep(.el-input__inner):hover,
.form-item :deep(.el-input__inner):hover {
	border-color: #cbd5e0;
}

.textarea :deep(.el-input__inner):focus,
.form-item :deep(.el-input__inner):focus {
	border-color: #2F855A;
	box-shadow: 0 0 0 2px rgba(47, 133, 90, 0.1);
}

.emoji-trigger {
	position: absolute;
	right: 1rem;
	bottom: 1.5rem;
	z-index: 2;
}

.emoji-icon {
	width: 24px;
	height: 24px;
	cursor: pointer;
	transition: transform 0.2s ease;
}

.emoji-icon:hover {
	transform: scale(1.1);
}

.emoji-box {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	padding: 0;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	z-index: 999;
	width: 360px;
	display: flex;
	flex-direction: column;
}

.emoji-title {
	padding: 8px 12px;
	margin: 0;
	background-color: #f8f9fa;
	border-bottom: 1px solid #e2e8f0;
	border-radius: 8px 8px 0 0;
	font-size: 14px;
	color: #4a5568;
	font-weight: 500;
}

.emoji-wrap {
	height: 240px;
	overflow-y: auto;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	gap: 8px;
	padding: 8px;
	margin: 0;
}

.emoji-list {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4px;
	cursor: pointer;
	transition: all 0.2s ease;
	border-radius: 4px;
}

.emoji-list:hover {
	background-color: #f7fafc;
	transform: scale(1.1);
}

.emoji-list img {
	width: 28px;
	height: 28px;
}

.emoji-tabs {
	padding: 8px 0;
	margin: 0;
	border-top: 1px solid #e2e8f0;
	display: flex;
	justify-content: space-around;
	background-color: #f8f9fa;
	border-radius: 0 0 8px 8px;
}

.tab-link {
	padding: 6px 12px;
	cursor: pointer;
	border-radius: 4px;
	transition: background-color 0.2s;
}

.tab-link img {
	width: 24px;
	height: 24px;
	opacity: 0.7;
	transition: opacity 0.2s;
}

.tab-link:hover img {
	opacity: 1;
}

.tab-link.on {
	background-color: #edf2f7;
}

.tab-link.on img {
	opacity: 1;
}

.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(2px);
	z-index: 998;
}

.form-footer {
	display: flex;
	justify-content: flex-end;
	margin-top: 1rem;
}

.form-actions {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.notice-switch {
	display: flex;
	align-items: center;
	gap: 8px;
}

.switch-label {
	font-size: 13px;
	color: #606266;
}

@media screen and (max-width: 768px) {
	.form-row {
		flex-direction: column;
		gap: 0.75rem;
	}

	.form-item {
		flex: 1;
	}

	.form-footer {
		flex-direction: row;
	}

	.form-actions {
		gap: 0.75rem;
	}

	.emoji-box {
		width: 90%;
		max-width: 330px;
		margin: 0;
		max-height: 90vh;
	}

	.emoji-wrap {
		height: 200px;
		grid-template-columns: repeat(6, 1fr);
	}

	.mask {
		background-color: rgba(0, 0, 0, 0.5);
	}
}
</style>

