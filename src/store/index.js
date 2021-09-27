import vuex from 'vuex'
import vue from 'vue'
vue.use(vuex)

const state ={
    historyList:[],//历史浏览列表
    collectList:[],//收藏列表
    chartGoods:0,//购物车列表
    voncer:0,//优惠金额
    detailsImgList:[],//商品详情页数据
}

export default new vuex.Store({
    state
})