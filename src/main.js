import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import Vant from 'vant'
import VueCookie from 'vue-cookie'
//引入样式文件
import 'vant/lib/index.css';
import './assets/shop.css'; //自定义全局CSS

import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);

Vue.config.productionTip = false

Vue.use(Vant);
Vue.use(VueCookie); //进行绑定

import store from './store'

import moment from 'moment' 
// 过滤器  pattern 时间格式
Vue.filter('getTime',function(date,pattern="YYYY/MM/DD-LTS"){
  // 调用 moment 方法传入时间 获取指定的时间
  // 调用 format 格式化时间
  return moment(date).format(pattern)
})

Vue.prototype.$http = axios; //原型封装

//全局函数挂载
import base from '@/common/js/base.js'; //全局函数
Object.keys(base).forEach(item => {
  //将base里面得方法,全部挂载到vue上面,这个在其他地方,就可以用this去获取了
  Vue.prototype[item] = base[item];
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
