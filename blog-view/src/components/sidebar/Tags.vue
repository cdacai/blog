<template>
	<!--标签云-->
	<div class="ui segments m-box theme5-tags">
		<div class="ui secondary segment theme5-header">
			<i class="tags icon"></i>标签云
		</div>
		<div class="ui segment theme5-content">
			<router-link :to="`/tag/${tag.name}`" class="ui label theme5-tag" v-for="(tag,index) in tagList" :key="index">
				{{ tag.name }}
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Tags",
		props: {
			tagList: {
				type: Array,
				required: true
			},
		},
	}
</script>

<style scoped>
	.theme5-tags {
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

	.theme5-tag {
		background: rgba(47, 133, 90, 0.1) !important;
		color: #2F855A !important;
		border: none !important;
		border-radius: 0.5rem !important;
		padding: 0.5rem 1rem !important;
		margin: 0.3rem !important;
		font-weight: 500 !important;
		transition: all 0.3s ease !important;
	}

	.theme5-tag:hover {
		background: rgba(47, 133, 90, 0.2) !important;
		transform: translateY(-2px);
		box-shadow: 0 2px 8px rgba(47, 133, 90, 0.1);
	}
</style>