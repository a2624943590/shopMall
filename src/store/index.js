import vuex from 'vuex'
import vue from 'vue'
vue.use(vuex)

const state ={
    historyList:[],//历史浏览列表
    collectList:[],//收藏列表
    detailsImgList:[],//商品详情页数据
}

export default new vuex.Store({
    state
})