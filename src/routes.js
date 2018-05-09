import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index.vue'

//首页
import login from './components/login.vue'

// 我的
import Home from './components/my/Home.vue'


let routes = [{
		path: '/',
		redirect: 'Index' //重定向：首次启动项目便进入这里
	}, {
		path: '/login',
		component: login,
		name: '登陆'
	}, {
		path: '/Index',
		component: Index,
		name: '首页'
	},{
		path: '/Home',
		component: Home,
		name: '我的'
	},
]
export default routes;