<template>
	<div>
		<el-form :model="form" label-position="top" :rules="formRules" ref="form">
			<el-form-item label="动态内容" prop="content">
				<div class="editor-toolbar">
					<el-button-group>
						<el-button size="small" @click="showAlbumManager('content')">
							<i class="el-icon-picture-outline"></i> 插入图片
						</el-button>
					</el-button-group>
				</div>
				<mavon-editor 
					v-model="form.content" 
					ref="mdEditor" 
					@imgAdd="handleImgAdd" 
					@drop="handleDrop"
					:toolbars="editorToolbars"
					:boxShadow="false"
					:ishljs="true"
					:autofocus="false"
					:tabSize="4"
					:style="{height: '300px'}"
				/>
			</el-form-item>

			<el-form-item label="点赞数" prop="likes" style="width: 50%">
				<el-input v-model="form.likes" type="number" placeholder="可选，默认为 0"></el-input>
			</el-form-item>

			<el-form-item label="创建时间" prop="createTime">
				<el-date-picker v-model="form.createTime" type="datetime" placeholder="可选，默认此刻" :editable="false"></el-date-picker>
			</el-form-item>

			<el-form-item style="text-align: right;">
				<el-button type="info" @click="submit(false)">发布不显示</el-button>
				<el-button type="primary" @click="submit(true)">发布动态</el-button>
			</el-form-item>
		</el-form>

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
	import {getMomentById, saveMoment, updateMoment} from "@/api/moment";
	import { compressAndUploadImage } from '@/utils/imageUtils';
	import AlbumManager from '@/views/album/AlbumManager';
	import { getAlbumList } from '@/api/album';
	import settings from '@/settings';

	export default {
		name: "WriteMoment",
		components: {
			Breadcrumb,
			AlbumManager
		},
		data() {
			return {
				form: {
					content: '',
					createTime: null,
					likes: 0,
					published: false
				},
				formRules: {
					content: [
						{ required: true, message: '请输入动态内容', trigger: 'blur' }
					]
				},
				showAlbumManagerDialog: false,
				currentImageTarget: 'content',  // 默认为 content
				albumList: [], // 添加相册列表数据
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
					imagelink: false,  // 禁用原生图片按钮
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
				editorInitialized: false,  // 添加编辑器初始化状态标记
			}
		},
		beforeRouteEnter(to, from, next) {
			console.log('beforeRouteEnter 触发')  // 添加日志
			next(vm => {
				console.log('beforeRouteEnter 回调执行')  // 添加日志
				// 每次进入路由时获取相册数据
				vm.getAlbumList()
			})
		},
		beforeRouteUpdate(to, from, next) {
			console.log('beforeRouteUpdate 触发')  // 添加日志
			// 路由参数更新时也重新获取相册数据
			this.getAlbumList()
			next()
		},
		async created() {
			console.log('created 钩子触发')  // 添加日志
			if (this.$route.params.id) {
				await this.getMoment(this.$route.params.id)
			}
		},
		mounted() {
			// 在mounted中等待编辑器初始化
			this.$nextTick(() => {
				const checkEditor = () => {
					const editor = this.$refs.mdEditor;
					if (editor && editor.$refs.textarea && editor.$refs.textarea.$refs.vTextarea) {
						this.editorInitialized = true;
					} else {
						setTimeout(checkEditor, 100);  // 每100ms检查一次
					}
				};
				checkEditor();
			});
		},
		methods: {
			// 获取相册列表
			async getAlbumList() {
				console.log('开始获取相册数据')  // 添加日志
				try {
					console.log('发起请求')  // 添加日志
					const res = await getAlbumList()
					console.log('获取相册数据成功:', res)  // 添加日志
					this.albumList = res.data
				} catch (error) {
					console.error('加载相册数据失败:', error)
					this.msgError('加载相册数据失败')
				}
			},
			// 相册数据更新时的处理
			handleAlbumUpdate() {
				this.getAlbumList()
			},
			async getMoment(id) {
				try {
					const res = await getMomentById(id)
					this.form = res.data
				} catch (error) {
					console.error('获取动态数据失败:', error)
					this.msgError('获取动态数据失败')
				}
			},
			submit(published) {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.form.published = published
						if (this.$route.params.id) {
							updateMoment(this.form).then(res => {
								this.msgSuccess(res.msg)
								this.$router.push('/blog/moment/list')
							})
						} else {
							saveMoment(this.form).then(res => {
								this.msgSuccess(res.msg)
								this.$router.push('/blog/moment/list')
							})
						}
					} else {
						return this.msgError('请填写动态内容')
					}
				})
			},
			// 处理图片上传
			async handleImgAdd(pos, file) {
				try {
					// 压缩并上传图片，使用settings中的配置
					const result = await compressAndUploadImage(file, settings.imageCompression.moment)
					// 使用编辑器的$img2Url方法插入图片，使用返回的URL
					this.$refs.mdEditor.$img2Url(pos, result.url)
					this.msgSuccess('图片上传成功')
				} catch (error) {
					console.error('图片上传失败:', error)
					this.msgError('图片上传失败: ' + error.message)
				}
			},
			// 处理拖拽上传
				async handleDrop(e) {
				e.preventDefault()
				e.stopPropagation()

				// 处理从相册拖拽的图片
				const imageUrl = e.dataTransfer.getData('image-url')
				if (imageUrl) {
					const cursor = this.$refs.mdEditor.getTextareaPosAll().start
					// 插入markdown格式的图片
					const imageMarkdown = `![](${imageUrl})\n`
					this.$refs.mdEditor.$refs.textarea.$refs.vTextarea.focus()
					this.$refs.mdEditor.insertText(cursor, imageMarkdown)
					return
				}

				// 处理本地文件拖拽
				const files = e.dataTransfer.files
				if (files && files.length > 0) {
					Array.from(files).forEach(file => {
						if (file.type.startsWith('image/')) {
							const pos = Date.now()
							this.$refs.mdEditor.$refs.textarea.$refs.vTextarea.focus()
							this.$refs.mdEditor.insertText(this.$refs.mdEditor.getTextareaPosAll().start, `![Uploading ${file.name}...]()\n`)
							this.handleImgAdd(pos, file)
						}
					})
				}
			},
			// 显示相册管理器
			showAlbumManager(target) {
				this.currentImageTarget = target
				this.showAlbumManagerDialog = true
			},
			// 处理从相册选择的图片
			handleImageSelect(image) {
				if (this.currentImageTarget === 'content') {
					try {
						// 获取编辑器实例
						const editor = this.$refs.mdEditor;
						if (!editor) {
							throw new Error('编辑器未初始化');
						}

						// 如果编辑器还未完全初始化，直接使用备选方案
						if (!this.editorInitialized) {
							this.form.content += `![${image.name || ''}](${image.url})\n`;
							this.msgSuccess('已将图片添加到内容末尾');
							this.showAlbumManagerDialog = false;
							return;
						}

						// 先让编辑器获得焦点
						editor.$refs.textarea.$refs.vTextarea.focus();
						
						// 获取光标位置，如果没有点击过编辑器，会返回0，即插入到开头
						const cursor = editor.getTextareaPosAll().start;
						
						// 插入markdown格式的图片
						const imageMarkdown = `![${image.name || ''}](${image.url})\n`;
						editor.insertText(cursor, imageMarkdown);
						
						this.msgSuccess('图片插入成功');
					} catch (error) {
						console.error('插入图片失败:', error);
						// 使用备选方案
						this.form.content += `![${image.name || ''}](${image.url})\n`;
						this.msgSuccess('已将图片添加到内容末尾');
					}
				}
				this.showAlbumManagerDialog = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
.editor-toolbar {
	margin-bottom: 10px;
}

::v-deep .v-note-wrapper {
	z-index: 1;  // 确保编辑器在正确的层级
}

:deep(.album-manager-dialog) {
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    display: none;
  }
}
</style>