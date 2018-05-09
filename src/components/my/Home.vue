<template>
	<div class="app-container">
		<h1>这里是我的页面</h1>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getBuyerDate: function() {
				var _this = this;
				_this.$axios.post('https://wxapp.antsoo.com/dict/memberOrderRule')
				.then(function(response) {
					console.log(response);
				}).catch(function(error) {
					console.log(error);
				})
			}
		},
		mounted() {
			this.getBuyerDate();
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	
</style>