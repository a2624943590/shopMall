import Vue from 'vue'
import Router from 'vue-router' //引用

Vue.use(Router)
//防止重复点击，屏蔽提醒
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  name: 'tabbar',
  component: () => import('../components/tabbar.vue'),
  redirect: 'index/home-hot',
  children: [{
    path: '/index',
    name: 'index',
    component: () => import('../views/home/index'),
    redirect: 'index/home-hot',
    children: [
      { // 热卖
        path: 'home-hot',
        name: 'HomeHot',
        component: () => import('../views/home/HomeHot')
      },
      { // 新品
        path: 'home-new',
        name: 'HomeNew',
        component: () => import('../views/home/HomeNew')
      },
      { // 优惠
        path: 'home-preferential',
        name: 'HomePreferential',
        component: () => import('../views/home/HomePreferential')
      },
      { // 更多
        path: 'home-more',
        name: 'HomeMore',
        component: () => import('../views/home/HomeMore')
      },
    ]
  },
  {
    path: '/type',
    name: 'type',
    component: () => import('../views/category/type'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart/cart'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/user'),
  }]
},
{
  path: '/login',
  name: 'login',
  component: () => import('../views/login/login'),
},
//商品详细信息路由
{
  path: '/goods/:id',
  name: 'goods',
  component: () => import('@/views/goods/goods'),
},
// 订单页面的路由
{
  path: '/addorder',
  name: 'addorder',
  component: () => import('@/views/user/order/addorder'),
},
{
  path: '/order_info',
  name: 'order_info',
  component: () => import('@/views/user/order/order_info'),
  props: route => ({
    query: route.query.q
  })
},
{
  path: '/orderlist',
  name: 'orderlist',
  component: () => import('@/views/user/order/orderlist'),
  props: route => ({
    query: route.query.q
  })
},
// 地址路由跳转
{
  path: '/address_list',
  name: 'address_list',
  component: () => import('@/views/user/address/address_list'),
  props: route => ({
    query: route.query.q
  })
},
{
  path: '/address_edit',
  name: 'address_edit',
  component: () => import('@/views/user/address/address_edit'),
  props: route => ({
    query: route.query.q
  })
},
// 我的服务页面跳转
{
  path: '/balance',
  name: 'balance',
  component: () => import('@/views/user/member/balance/index'),
},
{
  path: '/withdraw_cash',
  name: 'withdraw_cash',
  component: () => import('@/views/user/member/balance/withdraw_cash'),
},
{
  path: '/detail',
  name: 'detail',
  component: () => import('@/views/user/member/balance/detail'),
},
{
  path: '/recharge',
  name: 'recharge',
  component: () => import('@/views/user/member/balance/recharge'),
},
{
  path: '/bankcard',
  name: 'bankcard',
  component: () => import('@/views/user/member/balance/bankcard'),
},
{
  path: '/bankcard_edit',
  name: 'bankcard_edit',
  component: () => import('@/views/user/member/balance/bankcard_edit'),
},
{
  path: '/collection',
  name: 'collection',
  component: () => import('@/views/user/member/collection'),
},
{
  path: '/history',
  name: 'history',
  component: () => import('@/views/user/member/history'),
},
{
  path: '/coupon',
  name: 'coupon',
  component: () => import('@/views/user/member/coupon'),
},
{
  path: '/member/info',
  name: 'info',
  component: () => import('@/views/user/member/info'),
},
{
  path: '/member/uppass',
  name: 'uppass',
  component: () => import('@/views/user/member/uppass'),
},
// 设置
{
  path: '/setting',
  name: 'setting',
  component: () => import('@/views/user/setting/setting'),
},
//支付结果
{
  path: '/payment',
  name: 'payment',
  component: () => import('@/views/user/order/payment/payment'),
  props: route => ({
    query: route.query.q
  })
},
{
  path: '/result',
  name: 'result',
  component: () => import('@/views/user/order/payment/result'),
  props: route => ({
    query: route.query.q
  })
},
{
  path: '/goodsreturn',
  name: 'goodsreturn',
  component: () => import('@/views/user/order/goodsReturn'),
},
//  聊天路由跳转
{
  path: '/chat',
  name: 'chat',
  component: () => import('@/views/user/chat/chat'),
},
// 404页面
{
  path: '/404',
  name: '404',
  component: () => import('@/views/404/404'),
},
// 注册页面路由跳转
{
  path: '/reg',
  name: 'reg',
  component: () => import('@/views/register/reg'),
},
{
  path: '/forget',
  name: 'forget',
  component: () => import('@/views/register/forget'),
},
// 更多评论路由跳转
{
  path: '/comment',
  name: 'comment',
  component: () => import('@/views/goods/componets/comment'),
},
// 搜索界面
{
  path: '/search',
  name: 'search',
  component: () => import('@/views/search/search'),
}
]

const router = new Router({
  routes
})

let noLogin = ['/login', '/reg', '/logout', '/forget']; //免登录
//导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to.path);
  let token = localStorage.getItem('token'); //全局状态 后台返回的口令令牌，接口安全，本地做一个参数验证比如（手机号验证，防重复提交...），前台提交带token后台做安全判定
  if (token != '' || noLogin.indexOf(to.path) > -1) {
    next() //允许访问
  } else {
    next('/login')
  }
})
export default router
