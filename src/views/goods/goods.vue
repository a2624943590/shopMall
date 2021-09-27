<template>
  <div class="goods">
    <van-row class="left_menu" @click="$back()">
      <van-icon name="arrow-left" />
    </van-row>

    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.imgs" :key="thumb">
        <img @click="preview" :src="thumb" width="100%" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="goods-price">{{ goods.sell_price }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.weight }}</van-col>
        <van-col span="14">剩余：{{ goods.store_nums }}</van-col>
      </van-cell>
    </van-cell-group>

    <!-- <van-cell-group class="goods-cell-group" @click="buy(1)">
      <van-cell value="" icon="shop-o" is-link @click="sorry">
        <template #title>
          <span class="van-cell-text">{{ sku_text }}</span>
        </template>
      </van-cell>
    </van-cell-group> -->

    <!-- <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template #title>
          <span class="van-cell-text">江润的一个小店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group> -->

    <van-row>
      <ul class="parameters">
        <li
          v-for="(item, index) in class_parameters"
          :key="index"
          v-if="item.top_title"
        >
          <img :src="item.icon" />
          <p>{{ item.top_title }}</p>
          <p>{{ item.value }}</p>
        </li>
      </ul>
    </van-row>

    <section class="actbox">
      <span class="title">换机</span>
      <span class="huan">以旧换新，回收专享120元购新福利</span>
      <i class="iconfont icon-xiangyoujiantou"></i>
    </section>

    <section class="actbox" @click="buy(1)">
      <span class="title">已选</span>
      <span class="cont">IPhone13 宇宙版 6GB+1TB 深空灰 x 1</span>
      <i class="iconfont icon-xiangyoujiantou"></i>
    </section>

    <section class="actbox">
      <span class="title">送至</span>
      <span class="cont">泉州市 芯谷</span>
      &nbsp;&nbsp;<span class="huan">有现货</span>
      <i class="iconfont icon-xiangyoujiantou"></i>
    </section>

    <section class="actbox">
      <span><i class="iconfont icon-duigouzhong"></i>小米自营</span>
      <span><i class="iconfont icon-duigouzhong"></i>小米发货</span>
      <span><i class="iconfont icon-duigouzhong"></i>7天无理由退货</span>
      <i class="iconfont icon-xiangyoujiantou"></i>
    </section>

    <!-- 买家评论 -->
    <van-row class="pinglun">
      <goods-comments></goods-comments>
    </van-row>
    <!-- <details-imgs></details-imgs> -->
    <van-tabs>
      <van-tab title="商品详情">
        <!--html-->
        <van-row>
           <details-imgs></details-imgs>
        </van-row>
      </van-tab>

      <!-- <van-tab title="商品参数">
        <van-empty v-if="content == ''" image="error" description="暂无详情" />
        <van-row v-else>
          {{ can }}
        </van-row>
      </van-tab> -->

      <!-- <van-tab title="买家评论">
        <van-row >
         <comment></comment>
        </van-row>
      </van-tab> -->
    </van-tabs>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon
        icon="cart-o"
        @click="$navto('/cart')"
        :badge="$cartnum()"
      >
        购物车
      </van-goods-action-icon>

      <van-goods-action-icon
        :color="isCollect ? '#ff5000' : '#333'"
        :icon="isCollect ? 'star' : 'star-o'"
        @click="collect"
      >
        {{ isCollect ? "已收藏" : "收藏" }}
      </van-goods-action-icon>

      <van-goods-action-button type="warning" @click="buy(1)">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="buy(2)">
        立即购买
      </van-goods-action-button>
    </van-goods-action>

    <!--商品规格-->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goodstype"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :message-config="messageConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      ref="sku"
    />
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { findItem } from "../../common/js/base";
import { goodsView } from "../../common/api/web/goods.js"; //引用接口
import comment from "@/views/goods/componets/comment";
import GoodsComments from "@/views/goods/componets/GoodsComments";
import DetailsImgs from '@/views/goods/componets/Details-Imgs';

import axios from "axios";
export default {
  components: {
    comment,
    GoodsComments,
    DetailsImgs

  },
  data() {
    return {
      sku_text: "点击选择",
      active: 0,
      content: "",
      can: "",
      pinglun: "",
      show: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: 0, // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goodstype: {
        picture: "", //默认图片
      },
      messageConfig: {},
      goodsId: 1,
      quota: 0,
      quotaUsed: 0,
      goods: {},
      isCollect: true,

      class_parameters: "",
      // detailsImgList: "",
    };
  },
  async mounted() {
    // console.log(this.$route.params);
    const _data = await axios.get("http://localhost:3000/indexComment");
    this.class_parameters = _data.data.data.goods_info[0].class_parameters.list;

    // this.detailsImgList = _data.data.data.goods_tpl_datas["7068"].sections;

    // console.log(this.$store.state.detailsImgList);
    // console.log(this.commentsList);
    let id = this.$route.params.id;
    if (!id) {
      this.$toast("未找到相关商品");
      return;
    } else {
      this.goodsId = id;
    }
    this.initdata(); //调用商品接口
    //获取购物车数量
    const isCollect = findItem(
      this.$store.state.collectList,
      "id",
      this.goodsId
    );
    if (isCollect == -1) {
      this.isCollect = false;
    }
    // console.log(this.isCollect);
    //获取购物车数量
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 3,
    });
  },
  methods: {
    //初始化获取商品详情
    initdata() {
      //请求商品接口
      let that = this;
      goodsView({
        goods_id: this.goodsId,
      }).then(function (res) {
        if (res.code == 200) {
          // console.log(res);
          that.goods = res.data;
          that.goodstype.picture = res.data.img;
          that.sku.price = res.data.sell_price;
          that.sku.tree = res.data.sku.tree;
          that.sku.list = res.data.sku.list;
        }
      });
    },
    //格式化数据
    formatPrice() {
      return "¥" + (this.goods.price / 100).toFixed(2);
    },
    //提交订单
    onBuyClicked() {
      let params = [];
      params["0"] = this.selectGoodsInfo(); //数组列表
      this.$cache_set("goodsOrder", params); //全局状态 每次重新赋值
      this.$navto("/addorder");
    },

    //加入购物车
    onAddCartClicked() {
      //获取购物车数据（如果没有数据，String转化JSON数据类型）
      let goods_data = this.selectGoodsInfo();
      let n = 0;
      let k = 0;
      let that = this;
      let chartGoods = localStorage.getItem("cart"); //获取
      if (chartGoods != null && chartGoods != "") {
        chartGoods = JSON.parse(chartGoods); //转化成JSON格式
        chartGoods.forEach(function (item, index, array) {
          //判定当前选择商品规格是否存在，如果已经存在相同商品，直接数量加+（防止超出库存加入购物车）
          if (item.skuid == goods_data.skuid) {
            let stock_num = chartGoods[index].stock_num; //库存
            if (stock_num <= 1) {
              k = 1; //判定条件
            } else {
              chartGoods[index]["num"] += chartGoods[index].num;
            }
            n++;
          }
        });
      } else {
        chartGoods = [];
      }
      if (n == 0) {
        chartGoods.unshift(goods_data);
      }
      if (k == 1) {
        this.$toast("加入失败，库存不足");
      } else {
        //数组未尾添加一个数据  unshift 数组添加一个数据首位 sort自定义排序  [... arr,arr2]
        localStorage.setItem("cart", JSON.stringify(chartGoods)); //加入本地存储购物
        this.$toast("加入成功");
      }
      if (goods_data["data"].length > 0) {
        let select_sku_text = ""; //
        goods_data["data"].forEach(function (item, index) {
          select_sku_text += item[0]["title"] + ":" + item[0]["name"];
        });
        this.sku_text = select_sku_text;
      }
      this.show = false;
    },
    selectGoodsInfo() {
      let sku = this.$refs.sku; //所有商品
      let select_sku = sku.selectedSku; //选择的商品属性
      let select_data = sku.getSkuData(); //商品信息信息及规格属性
      let data = [];
      //处理属性规格
      for (var key in select_sku) {
        this.sku.tree.forEach(function (item, index, array) {
          if (item["k_s"] == key) {
            //数组查找ID
            var newArray = item["v"].filter(function (x) {
              return x.id == select_sku[key];
            });
            newArray[0]["title"] = item["k"]; //加名称
            data.push(newArray);
          }
        });
      }
      select_data["data"] = data;
      select_data["goods"] = this.goods;
      //商品规格
      let goods_data = {};
      goods_data["goodsId"] = select_data["goodsId"];
      goods_data["num"] = select_data["selectedNum"];
      goods_data["price"] = select_data["selectedSkuComb"]["price"];
      goods_data["stock_num"] = select_data["selectedSkuComb"]["stock_num"];
      goods_data["skuid"] = select_data["selectedSkuComb"]["id"];
      goods_data["data"] = select_data["data"];
      goods_data["goods"] = select_data["goods"];
      return goods_data;
    },

    onClickCart() {
      this.$router.push("cart");
    },

    buy(id) {
      this.show = true;
    },

    sorry() {
      this.$toast("暂无后续逻辑~");
    },
    /* 预览商品图片 */
    preview() {
      ImagePreview(this.goods.imgs);
    },

    /* 收藏 */
    collect() {
      const isCollect = findItem(
        this.$store.state.collectList,
        "id",
        this.goodsId
      );
      console.log(isCollect);
      if (isCollect == -1) {
        this.isCollect = true;
        let time = Date.parse(new Date());
        // console.log(this.time);
        this.$set(this.goods, "timer", time);
        this.$store.state.collectList.unshift(this.goods);
        this.$toast("已添加收藏");
      } else {
        this.$store.state.collectList.splice(isCollect, 1);
        this.$toast("已取消收藏");
        this.isCollect = false;
      }
      console.log(this.$store.state.collectList);
    },
  },
};
</script>
<style lang="less">
.left_menu {
  position: fixed;
  z-index: 1000;
  top: 10px;
  left: 10px;
}

.left_menu .van-icon {
  padding: 5px;
  background: #dddddd;
  border-radius: 50%;
  font-size: 20px;
}

img {
  max-width: 100%;
}
.van-cell-text {
  margin-right: 20px;
}
.pinglun {
  margin-top: 0.25rem;
}
.actbox {
  width: 9.066667rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  border: #e5e5e5 1px solid;
  color: #0000008a;
  border-radius: 3px;
  margin: 0 auto;
  padding: 0 0.426667rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.213333rem;
  background-color: #fafafa;
  .title {
    font-size: 0.346667rem;
    margin-right: 0.4rem;
  }
  .zeng {
    font-size: 0.32rem;
    color: #f56600;
    padding: 0 2px;
    border: 1px solid #f56600;
    border-radius: 2px;
    margin-right: 0.133333rem;
  }
  .huan {
    font-size: 0.32rem;
    color: #f56600;
  }
  .cont {
    font-size: 0.32rem;
    color: rgba(0, 0, 0, 0.87);
  }
  .icon-xiangyoujiantou {
    position: absolute;
    right: 0.4rem;
  }
  .icon-duigouzhong {
    vertical-align: middle;
    color: #f56600;
    font-size: 0.426667rem;
  }
}

.parameters {
  white-space: nowrap;
  overflow-x: scroll;
  height: 2rem;
  margin-bottom: 0.426667rem;
  li {
    width: 2.333333rem;
    height: 2rem;
    border-right: 1px solid #ececec;
    display: inline-block;
    img {
      width: 0.56rem;
      height: 0.56rem;
      display: block;
      margin: 0 auto;
    }
    p {
      color: #676767;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      text-align: center;
    }
    P:nth-of-type(1) {
      font-size: 0.373333rem;
      margin: 0.133333rem 0;
    }
    P:nth-of-type(2) {
      font-size: 0.32rem;
    }
    &:last-child {
      border-right: none;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
