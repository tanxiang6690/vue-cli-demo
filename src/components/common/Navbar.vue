<template>
	<nav class="app-nav">
		<router-link v-bind:key="item.title" v-for="(item, $index) in msgList" :to="item.linkTo">
			<div class="tab-bar" :class="{ selected: item.selected }" @click="selectNav(item, $index)">
				<div class="icon">
					<i class="iconfont" :class="item.selected ? item.iconClasses : item.iconClass"></i>
				</div>
				<div class="text">
					<span>{{item.title}}</span>
				</div>
			</div>
		</router-link>
	</nav>
</template>
<script>
	export default {
		data() {
			return {
				msgList: [{
					iconClass: "icon-shouye2",
					iconClasses: "icon-shouye1",
					title: "通讯录",
					linkTo: "/Index",
					selected: true
				}, {
					iconClass: "icon-wode",
					iconClasses: "icon-wode1",
					title: "我的",
					linkTo: "/Home",
					selected: false
				}]
			}
		},
		methods: {
			selectNav: function(item, index) {
				for(let i = 0; i < this.msgList.length; i++) {
					this.msgList[i].selected = false;
				}
				item.selected = true;
			}
		},
		mounted() {
			if(window.location.hash.indexOf('Index') == -1) {
				this.msgList[0].selected = false;
				this.msgList[1].selected = true;
			}
		}
	}
</script>

<style lang="less" scoped>
	.app-nav .tab-bar .icon .icon-fenlei2,
	.app-nav .tab-bar .icon .icon-fenlei1 {
		font-size: 42px;
	}
	
	.app-nav .tab-bar .icon .icon-shouye2,
	.app-nav .tab-bar .icon .icon-shouye1 {
		font-size: 58px;
	}
	
	.app-nav .tab-bar .icon .icon-xiaoxi3,
	.app-nav .tab-bar .icon .icon-xiaoxi2 {
		font-size: 55px;
	}
	
	.app-nav .tab-bar .icon .icon-faxian2,
	.app-nav .tab-bar .icon .icon-faxian {
		font-size: 58px;
	}
	
	.app-nav .tab-bar .icon .icon-wode,
	.app-nav .tab-bar .icon .icon-wode1 {
		font-size: 50px;
	}
	
	.app-nav .tab-bar .selected {
		color: #9e2026;
	}
	
	.iconfont {
		display: inline-block;
		font-size: 40px;
		margin: 8px;
	}
	
	.app-nav {
		z-index: 9999;
		height: 100px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		transform: translateZ(0);
		background: #fff;
		max-width: 750px;
		margin: 0 auto;
		&:before {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 1px;
			border-top: 1px solid #d9d9d9;
			color: #d9d9d9;
			transform-origin: 0 0;
			transform: scaleY(.5);
		}
		.tab-bar {
			color: #999;
			padding-top: 2px;
			width: 50%;
			float: left;
			height: 100px;
			text-align: center;
			.icon {
				position: absolute;
				top: 10px;
				width: 50%;
				text-align: center;
				line-height: 40px;
			}
			.text {
				padding-top: 60px;
				height: 44px;
				line-height: 44px;
				font-size: 24px;
				width: 100%;
			}
		}
		.tab-bar.selected {
			color: #9e2026;
		}
	}
</style>