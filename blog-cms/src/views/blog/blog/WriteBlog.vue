<template>
	<div>
		<el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
			<el-row :gutter="20">
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="文章标题" prop="title">
						<el-input v-model="form.title" placeholder="请输入标题"></el-input>
					</el-form-item>
				</el-col>
				<!-- <el-col :span="12">
					<el-form-item label="文章首图URL" prop="firstPicture">
						<el-input v-model="form.firstPicture" placeholder="文章首图，用于随机文章展示">
							<template slot="append">
								<el-button @click="showAlbumManager('firstPicture')">从相册选择</el-button>
							</template>
						</el-input>
					</el-form-item>
				</el-col> -->
			</el-row>

			<el-form-item label="文章正文" prop="content">
				<div class="editor-toolbar">
					<el-button-group>
						<el-button size="small" @click="showAlbumManager('content')">
							<i class="el-icon-picture-outline"></i> 插入图片
						</el-button>
					</el-button-group>
				</div>
				<mavon-editor 
					ref="mdContent"
					v-model="form.content"
					@imgAdd="(pos, file) => handleImgAdd(pos, file, 'content')"
					@drop="(e) => handleDrop(e, 'content')"
					:toolbars="editorToolbars"
					:boxShadow="false"
					:ishljs="true"
					:autofocus="false"
					:tabSize="4"
					class="content-editor"
				/>
				<div class="editor-status">
					<div class="word-count">字数统计：{{ form.words }} 字</div>
					<div v-if="!$route.params.id && lastSaveTime" class="last-save-time">最后保存：{{ lastSaveTime }}</div>
				</div>
			</el-form-item>

			<el-row :gutter="20">
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="分类" prop="cate">
						<el-select v-model="form.cate" placeholder="请选择分类（输入可添加新分类）" :allow-create="true" :filterable="true" style="width: 100%;">
							<el-option 
								v-for="item in categoryList" 
								:key="item.id" 
								:label="item.isDefault ? `${item.name} (默认)` : item.name" 
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="标签" prop="tagList">
						<el-select
							v-model="form.tagList"
							multiple
							filterable
							allow-create
							default-first-option
							placeholder="请选择标签（可选，输入可添加新标签）"
							style="width: 100%">
							<el-option
								v-for="item in tagList"
								:key="item.id"
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-form-item label="文章描述" prop="description">
				<el-checkbox v-model="autoDescription">自动从正文截取描述</el-checkbox>
				
				<el-input
					v-if="autoDescription"
					v-model="form.description"
					type="textarea"
					:rows="3"
					disabled
					placeholder="将自动从文章正文截取前1000字作为描述..."
					class="preview-description"
				/>
				
				<template v-else>
					<div class="editor-toolbar">
						<el-button-group>
							<el-button size="small" @click="showAlbumManager('description')">
								<i class="el-icon-picture-outline"></i> 插入图片
							</el-button>
						</el-button-group>
					</div>
					<mavon-editor 
						ref="mdDescription"
						v-model="form.description"
						@imgAdd="(pos, file) => handleImgAdd(pos, file, 'description')"
						@drop="(e) => handleDrop(e, 'description')"
						:toolbars="editorToolbars"
						:boxShadow="false"
						:ishljs="true"
						:autofocus="false"
						:tabSize="4"
						:style="{height: '300px'}"
					/>
				</template>
			</el-form-item>

			<el-form-item>
				<el-button 
					v-if="!$route.params.id" 
					type="info" 
					plain 
					@click="clearDraft" 
					:disabled="!hasDraft">
					<i class="el-icon-delete"></i> 清除草稿
				</el-button>
				<el-button type="primary" @click="dialogVisible = true">保存文章</el-button>
			</el-form-item>
		</el-form>

		<!--编辑可见性状态对话框-->
		<el-dialog 
			title="博客可见性" 
			:width="dialogWidth" 
			:visible.sync="dialogVisible"
			custom-class="visibility-dialog"
		>
			<!--内容主体-->
			<el-form label-width="50px" @submit.native.prevent class="visibility-form">
				<el-form-item class="visibility-radio-group">
					<el-radio-group v-model="radio">
						<el-radio :label="1">公开</el-radio>
						<el-radio :label="2">私密</el-radio>
						<el-radio :label="3">密码保护</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="密码" v-if="radio===3">
					<el-input v-model="form.password" placeholder="请输入访问密码"></el-input>
				</el-form-item>
				<el-form-item v-if="radio!==2" class="switch-group">
					<el-row :gutter="20">
						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
							<div class="switch-item">
								<el-switch v-model="form.appreciation" active-text="赞赏"></el-switch>
							</div>
							<div class="switch-item">
								<el-switch v-model="form.recommend" active-text="推荐"></el-switch>
							</div>
						</el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
							<div class="switch-item">
								<el-switch v-model="form.commentEnabled" active-text="评论"></el-switch>
							</div>
							<div class="switch-item">
								<el-switch v-model="form.top" active-text="置顶"></el-switch>
							</div>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<!--底部-->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible=false">取 消</el-button>
				<el-button type="primary" @click="submit">保存</el-button>
			</span>
		</el-dialog>

		<!-- 相册管理器 -->
		<album-manager
			v-if="showAlbumManagerDialog"
			@close="showAlbumManagerDialog = false"
			@select="handleImageSelect"
			@update="handleAlbumUpdate"
			:is-select-mode="true"
			:current-editor="currentImageTarget"
		/>
	</div>
</template>

<script>
	import Breadcrumb from "@/components/Breadcrumb";
	import {getCategoryAndTag, saveBlog, getBlogById, updateBlog} from '@/api/blog'
	import { uploadImage } from '@/api/upyun'
	import AlbumManager from '@/views/album/AlbumManager'
	import { getAlbumList } from '@/api/album'
	import { compressAndUploadImage } from '@/utils/imageUtils'
	import { countWords, extractDescription } from '@/utils/textUtils'
	import settings from '@/settings'

	// 草稿相关常量
	const DRAFT_KEY_PREFIX = 'blog_draft_'
	// 从settings中获取自动保存配置
	const { delay: CONTENT_CHANGE_DELAY } = settings.blog.autosave

	export default {
		name: "WriteBlog",
		components: {
			Breadcrumb,
			AlbumManager
		},
		data() {
			return {
				categoryList: [],
				tagList: [],
				dialogVisible: false,
				radio: 1,
				form: {
					title: '',
					firstPicture: '',
					description: '',
					content: '',
					cate: null,
					tagList: [],
					words: null,
					readTime: null,
					views: 0,
					appreciation: true,
					recommend: false,
					commentEnabled: true,
					top: false,
					published: false,
					password: '',
				},
				formRules: {
					title: [{required: true, message: '请输入标题', trigger: 'blur'}],
					cate: [{required: true, message: '请选择分类', trigger: 'change'}],
					description: [{required: true, message: '请输入描述', trigger: 'blur'}],
					content: [{required: true, message: '请输入文章正文', trigger: 'blur'}]
				},
				showAlbumManagerDialog: false,
				currentImageTarget: null,
				albumList: [],
				pageSize: 12,
				editorToolbars: {
						bold: true,
						italic: true,
						header: true,
						underline: true,
						strikethrough: true,
						mark: true,
						superscript: true,
						subscript: true,
							quote: true,
							ol: true,
							ul: true,
							link: true,
							imagelink: false,
							code: true,
							table: true,
							fullscreen: true,
							readmodel: true,
							htmlcode: true,
							help: true,
							undo: true,
							redo: true,
							trash: true,
							save: true,
							navigation: true,
							alignleft: true,
							aligncenter: true,
							alignright: true,
							subfield: true,
							preview: true,
				},
				editorInitialized: {
					description: false,
					content: false
				},
				autoDescription: true,
				dialogWidth: '30%',
				contentChangeTimer: null,
				draftKey: '',
				lastSaveTime: '',
				hasDraft: false,
			}
		},
		watch: {
			'form.content': {
				handler(newContent) {
					// 计算字数
					const words = countWords(newContent);
					this.form.words = words;
					// 自动计算阅读时长
					this.form.readTime = Math.round(words / settings.blog.wordsPerMinute);
					
					// 如果开启了自动描述，更新描述
					if (this.autoDescription) {
						this.form.description = extractDescription(newContent);
					}
				},
				immediate: true
			},
			autoDescription(newValue) {
				if (newValue) {
					this.$nextTick(() => {
						this.form.description = extractDescription(this.form.content);
					})
				}
			},
			// 监听表单变化
			form: {
				handler(newVal) {
					this.handleContentChange()
				},
				deep: true
			}
		},
		created() {
			// 设置草稿key
			this.draftKey = DRAFT_KEY_PREFIX + (this.$route.params.id || 'new')
			
			this.getData()
			if (this.$route.params.id) {
				this.getBlog(this.$route.params.id)
				// 编辑模式下禁用草稿功能
				this.hasDraft = false
			} else {
				// 只在新建模式下检查草稿
				this.checkDraft()
			}
			// 预加载相册数据
			this.preloadAlbumData()
		},
		mounted() {
			// 在mounted中等待编辑器初始化
			this.$nextTick(() => {
				const checkEditor = (type) => {
					const editor = this.$refs[type === 'description' ? 'mdDescription' : 'mdContent'];
					if (editor && editor.$refs.textarea && editor.$refs.textarea.$refs.vTextarea) {
						this.editorInitialized[type] = true;
					} else {
						setTimeout(() => checkEditor(type), 100);  // 每100ms检查一次
					}
				};
				checkEditor('description');
				checkEditor('content');

				// 监听窗口大小变化，调整对话框宽度
				this.handleResize();
				window.addEventListener('resize', this.handleResize);
			});

			// 添加页面关闭事件监听
			window.addEventListener('beforeunload', this.handlePageLeave)
		},
		beforeDestroy() {
			// 移除事件监听
			window.removeEventListener('resize', this.handleResize);
			window.removeEventListener('beforeunload', this.handlePageLeave)
			
			// 清理定时器
			if (this.contentChangeTimer) {
				clearTimeout(this.contentChangeTimer)
			}
		},
		methods: {
			getData() {
				getCategoryAndTag().then(res => {
					this.categoryList = res.data.categories
					this.tagList = res.data.tags
					// 如果没有选择分类，则自动选择默认分类
					if (!this.form.cate && this.categoryList.length > 0) {
						const defaultCategory = this.categoryList.find(c => c.isDefault)
						if (defaultCategory) {
							this.form.cate = defaultCategory.id
						} else if (this.categoryList.length === 1) {
							// 如果只有一个分类，自动选择该分类
							this.form.cate = this.categoryList[0].id
						}
					}
				})
			},
			getBlog(id) {
				getBlogById(id).then(res => {
					this.computeCategoryAndTag(res.data)
					this.form = res.data
					this.radio = this.form.published ? (this.form.password !== '' ? 3 : 1) : 2
				})
			},
			computeCategoryAndTag(blog) {
				blog.cate = blog.category.id
				blog.tagList = []
				blog.tags.forEach(item => {
					blog.tagList.push(item.id)
				})
			},
			// 处理图片上传
			async handleImgAdd(pos, file, editorRef) {
				try {
					// 处理文件名：去除空格，替换为下划线
					const fileName = file.name.replace(/\s+/g, '_');
					const newFile = new File([file], fileName, { type: file.type });
					
					// 压缩并上传图片，使用settings中的配置
					const result = await compressAndUploadImage(newFile, settings.imageCompression.blog)
					// 使用编辑器的$img2Url方法插入图片，使用返回的URL
					const editor = editorRef === 'description' ? this.$refs.mdDescription : this.$refs.mdContent;
					// 对URL中的空格进行编码
					const encodedUrl = result.url.replace(/\s+/g, '%20');
					editor.$img2Url(pos, encodedUrl)
					this.msgSuccess('图片上传成功')
				} catch (error) {
					console.error('图片上传失败:', error)
					this.msgError('图片上传失败: ' + error.message)
				}
			},
			// 处理图片选择
			handleImageSelect(image) {
				try {
					// 获取编辑器实例
					const editor = this.$refs[this.currentImageTarget === 'description' ? 'mdDescription' : 'mdContent'];
					if (!editor) {
						throw new Error('编辑器未初始化');
					}

					// 处理文件名和URL中的空格
					const imageName = (image.name || '').replace(/\s+/g, '_');
					const encodedUrl = image.url.replace(/\s+/g, '%20');

					// 如果编辑器还未完全初始化，直接使用备选方案
					if (!this.editorInitialized[this.currentImageTarget]) {
						this.form[this.currentImageTarget] += `![${imageName}](${encodedUrl})\n`;
						this.msgSuccess('已将图片添加到内容末尾');
						this.showAlbumManagerDialog = false;
						return;
					}

					// 先让编辑器获得焦点
					editor.$refs.textarea.$refs.vTextarea.focus();
					
					// 获取光标位置，如果没有点击过编辑器，会返回0，即插入到开头
					const cursor = editor.getTextareaPosAll().start;
					
					// 插入markdown格式的图片
					const imageMarkdown = `![${imageName}](${encodedUrl})\n`;
					editor.insertText(cursor, imageMarkdown);
					
					this.msgSuccess('图片插入成功');
				} catch (error) {
					console.error('插入图片失败:', error);
					// 使用备选方案
					const imageName = (image.name || '').replace(/\s+/g, '_');
					const encodedUrl = image.url.replace(/\s+/g, '%20');
					this.form[this.currentImageTarget] += `![${imageName}](${encodedUrl})\n`;
					this.msgSuccess('已将图片添加到内容末尾');
				}
				this.showAlbumManagerDialog = false;
			},
			// 显示相册管理器
				showAlbumManager(target) {
					this.currentImageTarget = target;  // 设置当前编辑器标识
					this.showAlbumManagerDialog = true;
				},
			// 处理拖拽上传
			async handleDrop(event, editor) {
				const files = event.dataTransfer.files
				if (files && files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						const file = files[i]
						if (file.type.startsWith('image/')) {
							// 生成一个临时的图片占位符
							const pos = Date.now()
							// 获取编辑器实例
							const editorRef = editor === 'description' ? this.$refs.mdDescription : this.$refs.mdContent
							// 先插入一个占位符
							editorRef.insertText(editorRef.getTextareaPosAll().start, `![Uploading ${file.name}...]()\n`)
							// 上传图片
							await this.handleImgAdd(pos, file, editor)
						}
					}
				}
			},
			submit() {
				if (this.radio === 3 && (this.form.password === '' || this.form.password === null)) {
					return this.msgError("密码保护模式必须填写密码！")
				}
				this.$refs.formRef.validate(valid => {
					if (valid) {
						if (this.radio === 2) {
							this.form.appreciation = false
							this.form.recommend = false
							this.form.commentEnabled = false
							this.form.top = false
							this.form.published = false
						} else {
							this.form.published = true
						}
						if (this.radio !== 3) {
							this.form.password = ''
						}
						if (this.$route.params.id) {
							this.form.category = null
							this.form.tags = null
							updateBlog(this.form).then(res => {
								this.msgSuccess(res.msg)
								this.$router.push('/blog/list')
							})
						} else {
							saveBlog(this.form).then(res => {
								this.msgSuccess(res.msg)
								// 只在新建模式下清除草稿
								localStorage.removeItem(this.draftKey)
								this.$router.push('/blog/list')
							})
						}
					} else {
						this.dialogVisible = false
						return this.msgError('请填写必要的表单项')
					}
				})
			},
			async preloadAlbumData() {
				try {
					// 获取相册列表并强制更新缓存
					const albumRes = await getAlbumList()
					this.albumList = albumRes.data
					// 强制更新 sessionStorage 中的缓存
					sessionStorage.setItem('albumList', JSON.stringify(albumRes.data))
				} catch (error) {
					this.msgError('加载相册数据失败')
				}
			},
			// 处理相册更新
			handleAlbumUpdate() {
				this.preloadAlbumData()
			},
			handleDrop(e, target) {
				e.preventDefault();
				e.stopPropagation();
				
				// 获取编辑器实例
				const editor = this.$refs[target === 'description' ? 'mdDescription' : 'mdContent'];
				
				// 处理从相册拖拽的图片
				const imageUrl = e.dataTransfer.getData('image-url');
				if (imageUrl) {
					// 获取当前光标位置
					const cursor = editor.getTextareaPosAll().start;
					// 插入markdown格式的图片
					const imageMarkdown = `![](${imageUrl})\n`;
					editor.$refs.textarea.$refs.vTextarea.focus();
					editor.insertText(cursor, imageMarkdown);
					return;
				}
				
				// 处理本地文件拖拽
				const files = e.dataTransfer.files;
				if (files && files.length > 0) {
					Array.from(files).forEach(file => {
						if (file.type.startsWith('image/')) {
							const pos = Date.now();
							editor.$refs.textarea.$refs.vTextarea.focus();
							editor.insertText(editor.getTextareaPosAll().start, `![Uploading ${file.name}...]()\n`);
							this.handleImgAdd(pos, file, target);
						}
					});
				}
			},
			// 在AlbumManager中拖动图片时设置数据
			handleImageDragStart(event, image) {
				event.dataTransfer.setData('image-url', image.url);
			},
			handleResize() {
				// 根据窗口宽度设置对话框宽度
				this.dialogWidth = window.innerWidth < 768 ? '90%' : '30%';
			},
			// 检查草稿
			checkDraft() {
				const draft = localStorage.getItem(this.draftKey)
				if (draft) {
					this.hasDraft = true
					const draftData = JSON.parse(draft)
					this.$confirm('检测到未保存的草稿，是否恢复？', '提示', {
						confirmButtonText: '恢复',
						cancelButtonText: '放弃',
						type: 'info'
					}).then(() => {
						// 恢复草稿数据
						Object.assign(this.form, draftData)
						this.msgSuccess('草稿恢复成功')
					}).catch(() => {
						// 删除草稿
						localStorage.removeItem(this.draftKey)
						this.hasDraft = false
						this.msgInfo('已放弃恢复草稿')
					})
				} else {
					this.hasDraft = false
				}
			},

			// 保存草稿
			saveDraft() {
				const draftData = {
					title: this.form.title,
					content: this.form.content,
					description: this.form.description,
					cate: this.form.cate,
					tagList: this.form.tagList,
					lastSaveTime: new Date().toLocaleString()
				}
				localStorage.setItem(this.draftKey, JSON.stringify(draftData))
				this.lastSaveTime = draftData.lastSaveTime
				this.hasDraft = true
			},

			// 处理内容变化
			handleContentChange() {
				// 编辑模式下不保存草稿
				if (this.$route.params.id) return
				
				if (this.contentChangeTimer) {
					clearTimeout(this.contentChangeTimer)
				}
				this.contentChangeTimer = setTimeout(() => {
					if (this.form.title || this.form.content) {
						this.saveDraft()
					}
				}, CONTENT_CHANGE_DELAY)
			},

			// 处理页面离开
			handlePageLeave(e) {
				// 编辑模式下不保存草稿
				if (this.$route.params.id) return
				
				if (this.form.title || this.form.content) {
					this.saveDraft()
				}
			},

			// 清除草稿
			clearDraft() {
				this.$confirm('确定要清除当前草稿吗？此操作将清空所有已编辑内容且不可恢复', '提示', {
					confirmButtonText: '确定清除',
					cancelButtonText: '取消',
					type: 'warning',
					closeOnClickModal: false,
					closeOnPressEscape: false
				}).then(() => {
					// 清除localStorage中的草稿
					localStorage.removeItem(this.draftKey)
					this.lastSaveTime = ''
					this.hasDraft = false
					
					// 清空表单内容
					this.form.title = ''
					this.form.content = ''
					this.form.description = ''
					this.form.tagList = []
					// 重置分类为默认分类
					const defaultCategory = this.categoryList.find(c => c.isDefault)
					this.form.cate = defaultCategory ? defaultCategory.id : null
					
					this.msgSuccess('草稿已清除')
				}).catch(() => {
					this.msgInfo('已取消清除')
				})
			},

			// 开始自动保存
			startAutoSave() {
				// 移除定时自动保存，只保留内容变化后的延迟保存
			},

			// 清理自动保存
			clearAutoSave() {
				if (this.contentChangeTimer) {
					clearTimeout(this.contentChangeTimer)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.album-manager-dialog {
	::v-deep.el-dialog {
		margin-top: 5px !important;
	}
}

.editor-toolbar {
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
	background-color: #f5f7fa;
	border-radius: 4px;
	height: 40px;
}

/* 编辑器基础样式 */
.content-editor {
	height: calc(100vh - 350px);
	min-height: 400px;
	margin-bottom: 10px;
	
	:deep(.v-note-wrapper) {
		min-height: inherit;
		border-radius: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		
		.v-note-panel {
			position: relative;
			display: flex;
			
			.v-note-edit {
				flex: 1;
				border-right: 1px solid #dcdfe6;
			}
			
			.v-note-show {
				flex: 1;
				background: #fff;
			}
		}
		
		.v-note-navigation-wrapper {
			border-left: 1px solid #dcdfe6;
		}
	}
}

/* 表单布局优化 */
.el-form {
	padding: 20px;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
	
	.el-form-item {
		margin-bottom: 20px;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
}

::v-deep .v-note-wrapper {
	z-index: 1;  // 确保编辑器在正确的层级
	
	.v-note-panel {
		position: relative;
	}
	
	.v-note-edit-wrapper {
		position: relative;
		
		&.drag-over {
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(64, 158, 255, 0.1);
				border: 2px dashed #409EFF;
				pointer-events: none;
			}
		}
	}
}

:deep(.album-manager-dialog) {
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    display: none;
  }
}

.preview-description {
    margin-top: 10px;
    
    ::v-deep .el-textarea__inner {
        background-color: #f5f7fa;
        cursor: not-allowed;
    }
}

.preview-words {
    ::v-deep .el-input__inner {
        background-color: #f5f7fa;
        cursor: not-allowed;
        text-align: right;
    }
    
    ::v-deep .el-input-group__append {
        background-color: #f5f7fa;
        color: #909399;
        border-left: none;
    }
}

.word-count {
    margin-top: 8px;
    color: #909399;
    font-size: 13px;
    text-align: right;
    padding-right: 10px;
}

/* 开关组样式 */
.switch-item {
	margin-top: 10px;
}

@media screen and (min-width: 768px) {
	.switch-item {
		margin-top: 0;
	}
}

/* 移动端适配样式 */
@media screen and (max-width: 768px) {
	.panel-group {
		margin-bottom: 15px;
	}

	/* 编辑器移动端样式 */
	.content-editor {
		height: calc(100vh - 300px) !important;
		min-height: 300px;
	}

	:deep(.v-note-wrapper) {
		min-height: 300px;
	}

	:deep(.v-note-panel) {
		flex-direction: column;
	}

	:deep(.v-note-edit) {
		width: 100% !important;
		flex: none !important;
		border-right: none !important;
	}

	:deep(.v-note-show) {
		width: 100% !important;
		flex: none !important;
	}

	:deep(.v-note-navigation-wrapper) {
		display: none;
	}

	/* 工具栏移动端样式 */
	:deep(.v-note-op) {
		.op-icon {
			padding: 4px !important;
		}
		.op-icon.selected {
			padding: 4px !important;
		}
	}

	/* 表单项移动端样式 */
	.el-form-item {
		margin-bottom: 15px;
	}

	.el-form-item__label {
		padding-bottom: 4px;
	}

	/* 按钮移动端样式 */
	.el-button {
		padding: 8px 15px;
	}

	.el-button + .el-button {
		margin-left: 8px;
	}

	/* 选择器移动端样式 */
	:deep(.el-select-dropdown) {
		max-width: 90vw;
	}

	/* 对话框移动端样式 */
	:deep(.el-dialog__wrapper) {
		padding: 10px;
	}

	:deep(.el-dialog) {
		margin: 0 auto !important;
		border-radius: 8px;
		
		.el-dialog__body {
			padding: 15px;
			
			.el-switch {
				width: 100%;
				margin-bottom: 5px;
				justify-content: space-between;
				
				.el-switch__label {
					font-size: 13px;
				}
			}
		}
		
		.el-radio-group {
			display: flex;
			flex-direction: column;
			
			.el-radio {
				margin: 5px 0;
				padding: 5px 0;
			}
		}
		
		.el-form-item {
			margin-bottom: 10px;
		}
	}

	/* 字数统计移动端样式 */
	.word-count {
		margin-top: 6px;
		font-size: 12px;
	}

	/* 表单布局优化 */
	.el-form {
		padding: 15px;
		margin: 10px;
	}

	/* 编辑器移动端样式优化 */
	.content-editor {
		height: calc(100vh - 300px);
		min-height: 300px;
		
		:deep(.v-note-wrapper) {
			.v-note-panel {
				flex-direction: column;
				
				.v-note-edit {
					border-right: none;
					border-bottom: 1px solid #dcdfe6;
				}
			}
			
			.v-note-navigation-wrapper {
				display: none;
			}
			
			.v-note-op {
				flex-wrap: wrap;
				padding: 5px;
				
				.op-icon {
					padding: 4px !important;
					margin: 2px !important;
				}
			}
		}
	}

	/* 工具栏移动端样式 */
	.editor-toolbar {
		height: auto;
		padding: 8px;
		flex-wrap: wrap;
		gap: 8px;
	}

	/* 表单项移动端样式 */
	.el-form-item {
		margin-bottom: 15px;
		
		.el-form-item__label {
			padding-bottom: 4px;
			line-height: 1.4;
		}
	}
}

/* 平板适配样式 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
	.el-form {
		padding: 20px;
		margin: 15px;
	}

	.content-editor {
		height: calc(100vh - 350px);
		min-height: 400px;
	}
}

/* 大屏幕优化 */
@media screen and (min-width: 1025px) {
	.el-form {
		max-width: 1200px;
		margin: 20px auto;
	}
}

/* 可见性对话框样式 */
.visibility-dialog {
	:deep(.el-dialog__body) {
		padding: 20px 25px;
	}

	.visibility-form {
		.visibility-radio-group {
			margin-bottom: 20px;
			
			.el-radio-group {
				display: flex;
				gap: 30px;
				justify-content: center;
			}
		}

		.switch-group {
			margin-top: 15px;
			
			.switch-item {
				display: flex;
				align-items: center;
				margin-bottom: 15px;
				padding: 5px 0;
				
				:deep(.el-switch) {
					width: 100%;
					justify-content: space-between;
					
					.el-switch__label {
						color: #606266;
						font-size: 14px;
					}
				}
			}
		}
	}

	:deep(.el-dialog__footer) {
		padding: 15px 25px;
		border-top: 1px solid #EBEEF5;
		
		.dialog-footer {
			.el-button + .el-button {
				margin-left: 12px;
			}
		}
	}
}

/* 移动端适配样式 */
@media screen and (max-width: 768px) {
	.visibility-dialog {
		:deep(.el-dialog__body) {
			padding: 15px;
		}

		.visibility-form {
			.visibility-radio-group {
				margin-bottom: 15px;
				
				.el-radio-group {
					flex-direction: column;
					gap: 10px;
					
					.el-radio {
						margin: 0;
						padding: 5px 0;
					}
				}
			}

			.switch-group {
				margin-top: 10px;
				
				.switch-item {
					margin-bottom: 10px;
					
					:deep(.el-switch) {
						.el-switch__label {
							font-size: 13px;
						}
					}
				}
			}
		}

		:deep(.el-dialog__footer) {
			padding: 10px 15px;
		}
	}
}

/* 平板和桌面端优化 */
@media screen and (min-width: 769px) {
	.visibility-dialog {
		:deep(.el-dialog) {
			min-width: 400px;
		}
		
		.visibility-form {
			.switch-group {
				.el-row {
					display: flex;
					justify-content: space-around;
				}
			}
		}
	}
}

.editor-status {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 8px;
	padding: 0 10px;
	color: #909399;
	font-size: 13px;
}

.word-count, .last-save-time {
	margin: 0;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
	.editor-status {
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
		font-size: 12px;
	}
}

/* 相册管理器样式 */
:deep(.album-manager-dialog) {
	.el-dialog {
		margin: 0 !important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-height: 90vh;
		max-width: 90vw;
		width: 800px;
		
		@media screen and (max-width: 768px) {
			width: 95vw;
			height: 95vh;
			max-height: 95vh;
			
			.el-dialog__body {
				height: calc(95vh - 110px);
				padding: 10px;
				overflow-y: auto;
			}
		}
		
		.el-dialog__body {
			padding: 0;
		}
		
		.el-dialog__header {
			display: none;
		}
	}
}

/* 编辑器工具栏移动端样式 */
@media screen and (max-width: 768px) {
	.editor-toolbar {
		height: auto;
		padding: 8px;
		flex-wrap: wrap;
		gap: 8px;
		
		.el-button-group {
			display: flex;
			width: 100%;
			
			.el-button {
				flex: 1;
				padding: 8px;
				
				i {
					margin-right: 4px;
				}
			}
		}
	}
	
	/* 相册管理器移动端样式优化 */
	:deep(.album-manager-dialog) {
		.el-dialog {
			.el-dialog__body {
				/* 优化滚动行为 */
				-webkit-overflow-scrolling: touch;
				
				/* 优化内部布局 */
				.album-grid {
					grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
					gap: 8px !important;
					padding: 8px;
				}
				
				/* 优化图片项样式 */
				.album-item {
					height: 120px !important;
					
					img {
						object-fit: cover;
					}
					
					.album-item-overlay {
						font-size: 12px;
						padding: 4px;
					}
				}
				
				/* 优化工具栏 */
				.album-toolbar {
					padding: 8px;
					flex-wrap: wrap;
					gap: 8px;
					
					.el-button {
						padding: 6px 12px;
						font-size: 12px;
					}
				}
				
				/* 优化上传区域 */
				.upload-area {
					min-height: 100px;
					padding: 10px;
					
					.el-upload {
						width: 100%;
						
						.el-button {
							width: 100%;
							height: 40px;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-bottom: 10px;
							
							i {
								margin-right: 4px;
							}
						}
					}
					
					.el-upload-dragger {
						width: 100% !important;
						height: auto !important;
						min-height: 80px;
						padding: 15px;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						
						.el-icon-upload {
							margin: 10px 0;
							font-size: 24px;
						}
						
						.el-upload__text {
							font-size: 12px;
							margin-top: 8px;
							text-align: center;
							
							em {
								color: #409EFF;
								font-style: normal;
							}
						}
						
						&:hover {
							border-color: #409EFF;
							background-color: rgba(64, 158, 255, 0.1);
						}
						
						&.is-dragover {
							background-color: rgba(64, 158, 255, 0.2);
							border-color: #409EFF;
						}
					}
					
					/* 上传列表样式优化 */
					.el-upload-list {
						margin-top: 10px;
						
						.el-upload-list__item {
							margin: 0;
							padding: 8px;
							font-size: 12px;
							
							.el-icon-close {
								top: 50%;
								transform: translateY(-50%);
							}
							
							.el-upload-list__item-name {
								margin-left: 24px;
								line-height: 1.4;
							}
						}
					}
				}
			}
		}
	}
}

/* 平板设备适配 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
	:deep(.album-manager-dialog) {
		.el-dialog {
			width: 80vw;
			
			.el-dialog__body {
				.album-grid {
					grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
				}
			}
		}
	}
}
</style>