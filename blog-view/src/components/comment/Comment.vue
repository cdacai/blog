<template>
	<!--评论列表-->
	<div>
		<CommentForm v-if="parentCommentId===-1"/>
		<h3 class="ui dividing header">共 {{ allComment }} 条评论<span v-if="closeComment!==0">（{{ closeComment }} 条评论被隐藏）</span></h3>
		<div class="comment" v-for="comment in comments" :key="comment.id">
			<span class="anchor" :id="`comment-${comment.id}`"></span>
			<a class="ui circular image avatar">
				<img :src="comment.avatar">
			</a>
			<div class="content">
				<div class="comment-header">
					<div class="user-info">
						<a class="nickname" :href="comment.website!=''&&comment.website!=null?comment.website:null" target="_blank" rel="external nofollow noopener">{{ comment.nickname }}</a>
						<div class="ui black left pointing label" v-if="comment.adminComment">{{ $store.state.siteInfo.commentAdminFlag }}</div>
						<div class="metadata">
							<strong class="date">{{ comment.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</strong>
						</div>
					</div>
				</div>
				<div class="text" v-html="comment.content"></div>
				<div class="comment-actions">
					<el-button 
						size="mini" 
						type="text" 
						class="action-btn report-btn"
						@click="handleReport(comment)">
						<i class="el-icon-warning-outline"></i> 举报
					</el-button>
					<el-button size="mini" type="primary" @click="setReply(comment.id)" class="action-btn reply-btn">
						<i class="el-icon-chat-line-round"></i> 回复
					</el-button>
				</div>
			</div>
			<div class="comments" v-if="comment.replyComments.length>0">
				<div class="comment" v-for="reply in comment.replyComments" :key="reply.id">
					<span class="anchor" :id="`comment-${reply.id}`"></span>
					<a class="ui circular image avatar">
						<img :src="reply.avatar">
					</a>
					<div class="content">
						<div class="comment-header">
							<div class="user-info">
								<a class="nickname" :href="reply.website!=''&&reply.website!=null?reply.website:null" target="_blank" rel="external nofollow noopener">{{ reply.nickname }}</a>
								<div class="ui black left pointing label" v-if="reply.adminComment">{{ $store.state.siteInfo.commentAdminFlag }}</div>
								<div class="metadata">
									<strong class="date">{{ reply.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</strong>
								</div>
							</div>
						</div>
						<div class="text">
							<a :href="`#comment-${reply.parentCommentId}`">@{{ reply.parentCommentNickname }}</a>
							<div v-html="reply.content"></div>
						</div>
						<div class="comment-actions">
							<el-button 
								size="mini" 
								type="text" 
								class="action-btn report-btn"
								@click="handleReport(reply)">
								<i class="el-icon-warning-outline"></i> 举报
							</el-button>
							<el-button size="mini" type="primary" @click="setReply(reply.id)" class="action-btn reply-btn">
								<i class="el-icon-chat-line-round"></i> 回复
							</el-button>
						</div>
					</div>
					<CommentForm v-if="parentCommentId===reply.id"/>
				</div>
			</div>
			<div class="border"></div>
			<CommentForm v-if="parentCommentId===comment.id"/>
		</div>

		<report-dialog
			:visible.sync="reportDialogVisible"
			:comment-content="currentCommentContent"
			:comment-id="currentCommentId"
			:blog-id="blogId"
			:blog-title="blogTitle"
			class="report-dialog-mobile"
		/>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import CommentForm from "./CommentForm";
	import {SET_PARENT_COMMENT_ID} from "@/store/mutations-types";
	import ReportDialog from './ReportDialog.vue'

	export default {
		name: "Comment",
		components: {CommentForm, ReportDialog},
		props: {
			blogId: {
				type: Number,
				default: null
			},
			blogTitle: {
				type: String,
				default: ''
			}
		},
		computed: {
			...mapState(['allComment', 'closeComment', 'comments', 'parentCommentId'])
		},
		data() {
			return {
				
				reportDialogVisible: false,
				currentCommentId: null,
				currentCommentContent: '',
				commentRules: {
					content: [
						{ required: true, message: '请输入评论内容' },
						{ min: 1, max: 500, message: '评论长度在 1 到 500 个字符' }
					]
				}
			}
		},
		methods: {
			setReply(id) {
				this.$store.commit(SET_PARENT_COMMENT_ID, id)
			},
			handleReport(comment) {
				this.currentCommentId = comment.id
				this.currentCommentContent = comment.content
				this.reportDialogVisible = true
			}
		}
	}
</script>

<style scoped>
	.comments + .border {
		position: absolute;
		left: 34px;
		top: 47px;
		bottom: 0;
		border-style: solid;
		border-width: 0 0 0 1px;
		border-color: #e0e0e0;
	}

	.ui.threaded.comments .comment .comments {
		box-shadow: none;
		margin-top: -2em;
	}

	.comment {
		padding-right: 1em !important;
		padding-left: 1em !important;
	}

	.nickname {
		font-weight: bolder;
		color: #000;
	}

	.comment .el-button {
		margin-left: 5px;
		padding: 4px 5px;
	}

	.comment > .anchor {
		position: absolute;
		left: 0;
		top: -48px;
	}

	.comments .comment:first-child {
		margin-top: 0 !important;
	}

	.comment .comments .comment {
		box-shadow: 0 0 5px rgb(0, 0, 0, 0.1);
		border-radius: 5px;
		margin-top: 12px;
		padding-top: 10px !important;
		padding-bottom: 10px !important;
	}

	.comment .comments .comment > .anchor {
		top: -55px;
	}

	.ui.comments .comment .avatar {
		width: 40px !important;
		margin: 0;
	}

	.ui.comments .comment .text {
		white-space: pre-wrap !important;
		line-height: 1.5;
	}

	.ui.comments .comment .text a {
		cursor: pointer;
		margin-right: 8px;
		font-weight: bolder;
		color: rgba(0, 0, 0, .87);
	}

	.ui.comments .comment .text div {
		display: inline;
	}

	.label {
		cursor: default;
		padding: 4px 6px !important;
		font-weight: 500 !important;
	}

	.comment .form {
		margin-top: 20px;
	}

	.comment .content {
		position: relative;
	}

	.comment-actions {
		position: relative;
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: flex-end;
		margin-top: 8px;
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		font-size: 13px;
		border-radius: 4px;
		transition: all 0.2s ease;
		height: 28px;
		line-height: 1;
	}

	.action-btn i {
		font-size: 14px;
	}

	.reply-btn {
		background-color: #2F855A;
		border-color: #2F855A;
		color: white;
	}

	.reply-btn:hover {
		background-color: #276749;
		border-color: #276749;
		transform: translateY(-1px);
	}

	.report-btn {
		color: #718096;
		background: transparent;
		border: 1px solid transparent;
		opacity: 0;
	}

	.content:hover .report-btn {
		opacity: 1;
	}

	.report-btn:hover {
		color: #E53E3E;
		background-color: rgba(229, 62, 62, 0.1);
		border-color: rgba(229, 62, 62, 0.2);
		transform: translateY(-1px);
	}

	/* 修改取消回复按钮样式 */
	.form-title .cancel-reply {
		background-color: #f3f4f6 !important;
		border-color: #d1d5db !important;
		color: #4b5563 !important;
	}

	.form-title .cancel-reply:hover {
		background-color: #e5e7eb !important;
		border-color: #9ca3af !important;
		color: #374151 !important;
	}

	@media screen and (max-width: 768px) {
		.comment-actions {
			flex-wrap: wrap;
			gap: 8px;
		}

		.action-btn {
			padding: 4px 8px;
			font-size: 12px;
		}

		.report-btn {
			opacity: 1;
			padding: 4px 8px;
			font-size: 12px;
		}

		.report-dialog-mobile :deep(.el-dialog) {
			width: 90% !important;
			margin: 10vh auto !important;
		}

		.report-dialog-mobile :deep(.el-dialog__body) {
			padding: 15px !important;
		}

		.report-dialog-mobile :deep(.el-form-item) {
			margin-bottom: 15px;
		}
	}

	.nickname {
		color: #2d3748;
		font-weight: 600;
		text-decoration: none;
		font-size: 1.05rem;
		transition: all 0.3s ease;
	}

	.nickname:hover {
		color: #2F855A;
		text-decoration: underline;
	}

	.metadata {
		margin: 0.5rem 0;
		color: #718096;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.text {
		color: #4a5568;
		line-height: 1.7;
		margin: 0.75rem 0;
		font-size: 1rem;
	}

	.report-btn {
		display: none;
		color: #718096;
		padding: 6px 12px;
		border-radius: 6px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		font-size: 0.9rem;
		border: 1px solid transparent;
		background-color: transparent;
		cursor: pointer;
		user-select: none;
		align-items: center;
		gap: 6px;
	}

	.report-btn:hover {
		color: #E53E3E;
		background-color: rgba(229, 62, 62, 0.1);
		border-color: rgba(229, 62, 62, 0.2);
		transform: translateY(-1px);
	}

	.report-btn:active {
		transform: translateY(0);
	}

	.report-btn i {
		font-size: 15px;
		transition: all 0.3s;
	}

	.report-btn:hover i {
		transform: scale(1.1) rotate(12deg);
	}

	.content:hover > .comment-actions .report-btn {
		display: inline-flex;
	}

	/* 修改回复按钮样式 */
	.el-button--primary {
		background-color: #2F855A;
		border-color: #2F855A;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		font-weight: 500;
	}

	.el-button--primary:hover,
	.el-button--primary:focus {
		background-color: #276749;
		border-color: #276749;
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(39, 103, 73, 0.2);
	}

	.el-button--primary:active {
		transform: translateY(0);
	}

	/* 修改管理员标签样式 */
	.ui.black.left.pointing.label {
		background-color: #2F855A !important;
		border-color: #2F855A !important;
		color: white !important;
		padding: 0.5em 1em !important;
		border-radius: 4px !important;
		font-weight: 500 !important;
		box-shadow: 0 2px 4px rgba(47, 133, 90, 0.2) !important;
	}

	.ui.dividing.header {
		color: #2d3748;
		border-bottom: 2px solid rgba(47, 133, 90, 0.1);
		padding-bottom: 1rem;
		margin-bottom: 2rem;
		font-weight: 600;
	}

	.comments + .border {
		border-color: rgba(47, 133, 90, 0.15);
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 12px;
	}

	.user-info {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		max-width: calc(100% - 160px); /* 为按钮预留空间 */
	}

	.metadata {
		color: #718096;
		font-size: 0.9rem;
	}

	.comment-actions {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-left: auto; /* 确保按钮靠右 */
		flex-shrink: 0; /* 防止按钮被压缩 */
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		font-size: 13px;
		border-radius: 4px;
		transition: all 0.2s ease;
		height: 28px;
		line-height: 1;
	}

	.action-btn i {
		font-size: 14px;
	}

	.reply-btn {
		background-color: #2F855A;
		border-color: #2F855A;
		color: white;
	}

	.reply-btn:hover {
		background-color: #276749;
		border-color: #276749;
		transform: translateY(-1px);
	}

	.report-btn {
		color: #718096;
		background: transparent;
		border: 1px solid transparent;
		opacity: 0;
	}

	.content:hover .report-btn {
		opacity: 1;
	}

	.report-btn:hover {
		color: #E53E3E;
		background-color: rgba(229, 62, 62, 0.1);
		border-color: rgba(229, 62, 62, 0.2);
		transform: translateY(-1px);
	}

	@media screen and (max-width: 768px) {
		.comment-header {
			flex-wrap: wrap;
			gap: 8px;
		}

		.user-info {
			max-width: 100%;
			margin-bottom: 4px;
		}

		.metadata {
			width: 100%;
			margin: 4px 0;
		}

		.comment-actions {
			width: 100%;
			justify-content: flex-end;
			margin-top: 4px;
		}

		.action-btn {
			padding: 4px 8px;
			font-size: 12px;
			height: 24px;
		}

		.action-btn i {
			font-size: 12px;
		}

		.report-btn {
			opacity: 1;
		}
	}

	/* 修改取消回复按钮样式 */
	.cancel-reply {
		background-color: transparent !important;
		border-color: #2F855A !important;
		color: #2F855A !important;
	}

	.cancel-reply:hover {
		background-color: rgba(47, 133, 90, 0.1) !important;
		color: #276749 !important;
		border-color: #276749 !important;
	}

	@media screen and (max-width: 768px) {
		.comment-header {
			margin-bottom: 8px;
		}

		.user-info {
			margin-bottom: 4px;
		}

		.metadata {
			margin: 4px 0;
		}

		.comment-actions {
			margin-top: 8px;
		}

		.action-btn {
			padding: 4px 8px;
			font-size: 12px;
			height: 24px;
		}

		.action-btn i {
			font-size: 12px;
		}

		.report-btn {
			opacity: 1;
		}
	}
</style>