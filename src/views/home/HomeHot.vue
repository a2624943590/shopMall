<!-- 首页-热卖 -->
<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      style="margin-bottom: 50px"
    >
      <swiper :list="banner"></swiper>
      <!-- 中间item项 -->
      <div class="category-list">
        <div v-for="(item, index) in menulist" v-bind:key="index">
          <img :src="item.icon" />
          <!-- <span>{{item.name}}</span> -->
        </div>
      </div>
      <!-- 中间图片 -->
      <mi-menu :menu="menu"></mi-menu>
      <!--goods-->
      <van-cell title="推荐商品" is-link url="#/classify" value="查看更多" />
      <van-row gutter="20" class="main_list">
        <van-col
          span="12"
          v-for="(item, index) in goodlist"
          :key="index"
          @click="$navto('/goods/' + item.id)"
        >
          <img
            :src="item.img"
            height="150px"
            @click="browsingHistory(index, item.id)"
            width="100%"
          />
          <van-row
            class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center"
          >
            {{ item.name }}
          </van-row>
          <van-row class="text-center color-red mb-10">
            ￥{{ item.sell_price }}
          </van-row>
        </van-col>
      </van-row>
      <!-- 分割线 -->
      <van-divider :style="{ borderColor: '#5e5e5e' }"></van-divider>
      <van-button block>更多商品 ></van-button>
      <van-row style="height: 10px; background-color: #dcdcdc"></van-row>
      <!-- 下半部分 -->
      <div v-for="(item, index) in imagelist" :key="index">
        <!-- <van-image :src="item.image"></van-image> -->
        <van-image :src="item.image" @click="$navto('/404')"></van-image>
        <!-- 其他商品 -->
        <van-row v-if="item.stu">
          <van-col span="12" v-for="shop in item.shop">
            <img :src="shop.img" height="150px" width="100%" />
            <van-row
              @click="browsingHistory(index, item.id)"
              class="goods_desc van-multi-ellipsis--l2 van-ellipsis text-center"
            >
              {{ shop.name }}
            </van-row>
            <van-row
              @click="browsingHistory(index, item.id)"
              class="text-center color-red mb-10"
            >
              ￥{{ shop.price }}起
            </van-row>
            <van-row class="text-center color-red mb-10">
              <van-button
                style="border-radius: 10px"
                color="linear-gradient(to right, #ff6034, #ee0a24)"
              >
                立即购买
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <!-- 分割线 -->
        <van-button block>更多商品 ></van-button>
        <van-row style="height: 10px; background-color: #dcdcdc"></van-row>
      </div>
      <van-row gutter="5" class="main_list">
        <van-col span="12" v-for="(item, index) in belowlist" :key="index">
          <img :src="item.image" width="100%" />
        </van-col>
      </van-row>
    </van-pull-refresh>
  </div>
</template>

<script>
import { home } from "../../common/api/web/home.js";
import Swiper from "@/components/index/Swiper";
import { mendelist } from "@/common/mock/mock.js";
import { imagelist, belowlist } from "@/common/mock/images.js";
import menu from "@/components/index/menu";
import data from "../../../data";
import { findItem } from "../../common/js/base";
export default {
  components: {
    Swiper,
    "mi-menu": menu,
  },
  data() {
    return {
      isLoading: false,
      banner: [],
      search: "",
      menulist: mendelist,
      menu: data.menu,
      goodlist: [],
      imagelist: imagelist,
      belowlist: belowlist,
    };
  },
  mounted() {
    this.initData();
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 3,
    });
  },
  methods: {
    //下拉刷新
    onRefresh() {
      this.initData();
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    //获取数据
    initData() {
      let that = this;
      home({}).then(function (res) {
        // console.log(res);
        let map = res.data;

        // console.log(map.banner);
        if (res.code == 200) {
          that.banner = map.banner;
          that.notice = map.notice;
          that.goodlist = map.goodlist;
        }
      });
    },
    /* 我的足迹 */
    browsingHistory(i, Id) {
      // console.log(i);
      const index = findItem(this.$store.state.historyList, "id", Id);
      if (index != -1) this.$store.state.historyList.splice(index, 1);
      this.time = Date.parse(new Date());
      // console.log(this.time);
      this.$set(this.goodlist[i], "timer", this.time);
      this.$store.state.historyList.unshift(this.goodlist[i]);
      // console.log(this.$store.state.historyList);
    },
  },
};
</script>

<style>
.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;
}

.category-list div {
  display: flex;
  flex-direction: column;
  width: 20%;
  text-align: center;
}

.category-list div .img {
  width: 40px;
  height: 40px;
  margin: 13px auto 8px auto;
}
.goods_desc {
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
