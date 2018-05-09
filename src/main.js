import Vue from 'vue'
import App from './App'
import axios from 'axios' //引入 axios请求
import 'lib-flexible'
import Vuex from 'vuex'
import store from './vuex/store'  //状态管理
import VueRouter from 'vue-router'  
import VueResource from 'vue-resource'
import routes from './routes'
import './assets/iconfont/iconfont.css'//字体图标
import Util from './assets/js/util.js'; // 引入公共方法
// import COS from 'cos-nodejs-sdk-v5'//腾讯云sdk
import cos from 'cos-js-sdk-v5'//腾讯云sdk

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Util);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI)
Vue.prototype.$axios = axios
axios.defaults.baseURL='https://wxapp.antsoo.com'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('token');

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')

