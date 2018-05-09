<template>
	<div id="app">
		<!--主体内容视图-->
		<!-- <transition :name="transitionName">   -->
		<router-view class="content"></router-view>
		<!-- </transition>   -->
		<!--/主体内容视图-->

		<!-- 导航 -->
		<navbar v-if="isIndex"></navbar>

		<!-- loading -->
		<loading v-model="loading.status" :text="loading.text"></loading>
	</div>
</template>
<script>
	import Navbar from './components/common/Navbar.vue'; //用于navbar导航
	import { Loading } from 'vux' //loading
	import { mapActions, mapState } from 'vuex' //loading
	export default {
		components: {
			Navbar,
			Loading
		},
		data() {
			return {
				isIndex: true, //用于navbar导航
				// transitionName: 'slide-left'  
			}
		},
		computed: {
			...mapState({
				loading: state => state.loading,
			})
		},
		//   	watch: {
		// 　　　'$route' (to, from) {
		// 　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
		// 　　　　　　if(isBack) {
		// 　　　　　　　　this.transitionName = 'slide-right'
		// 　　　　　　} else {
		// 　　　　　　       this.transitionName = 'slide-left'
		// 　　　　　}
		// 　　		this.$router.isBack = false;
		// 　　	}
		// 　  },

		created() {
			this.up();
		},
		methods: {
			...mapActions(['startLoding', ]),
			show() {
				this.startLoding({
					status: true,
					text: 'Loading'
				})
			},
			up() {
				this.startLoding({
					status: false,
					text: 'Loading'
				})
			},
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	li,
	ul {
		list-style: none
	}
	
	img {
		vertical-align: top;
		border: 0 none
	}
	
	a {
		text-decoration: none
	}
	
	a,
	a:visited {
		color: #424242;
		text-decoration: none
	}
	
	i {
		font-style: normal
	}
	
	a {
		text-decoration: none
	}
	
	body {
		max-width: 750px;
		margin: 0 auto;
	}
	
	#app .weui-toast {
		top: 7rem;
	}
	
	#app .weui-toast .weui-icon_toast.weui-loading {
		width: 60px;
		height: 60px;
	}
	
	#app .weui-toast__content {
		font-size: 28px;
	}
	
	.content {
		width: 100%;
		transition: all .8s ease;
	}
	
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(100%, 0);
		transform: translate(100%, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-100%, 0);
		transform: translate(-100% 0);
	}
</style>