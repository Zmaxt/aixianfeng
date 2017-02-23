//导入需要的外部js
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
//图片懒加载
import VueLazyload from 'vue-lazyload';
//导入组件
import App from './App';
import Home from './pages/home.vue';
import Market from './pages/market.vue';
import Cart from './pages/cart.vue';
import Mine from './pages/mine.vue';
import Pay from './pages/pay';
//应用外部js
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueLazyload,{
   // error: 'dist/error.png',
   loading: './static/product_default.png',
   // try: 3 
});
//定义路由规则
var routes = [
	{path:'',component:Home},
	{path:'/home',component:Home},
	{path:'/market',component:Market},
	{path:'/cart',component:Cart},
	{path:'/mine',component:Mine},
    {path:'/pay',component:Pay}
];
//创建路由实例
var router = new VueRouter({
	routes
});
//创建vue实例
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});

