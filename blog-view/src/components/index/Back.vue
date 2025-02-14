<template>
	<!--私密文章密码对话框-->
	<div @click="$router.go(-1)" class="back">
		<img src="/img/back.png" style="width:30px;height:25px" />
	</div>
</template>

<script>
	export default {
		name: "Back",
		computed: {
		},
		data() {
			return {
			}
		},
		methods: {
			
		},
		mounted () {
			// console.log(this.$router.history);
		}
	}
</script>

<style scoped>
	.back {
		right: 40px;
		bottom: 20px;
		box-shadow: none;
		background: none;
		z-index: 9999;
		position: fixed;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		cursor: pointer;
	}
</style>