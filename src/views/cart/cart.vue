<template>
  <div>
    <van-nav-bar title="购物车" />
    <van-cell>
      <template #title>
        <van-row>
          <span class="icon_cart">
            <van-icon name="point-gift-o"></van-icon>
          </span>
          <span>商城</span>
        </van-row>
      </template>
      <template #right-icon>
        <span @click="act_edit">{{act_txt}}</span>
      </template>
    </van-cell>
    <van-cell-group class="card-goods">
      <van-empty description="暂无商品" v-if="goods.length==0" />
      <van-checkbox-group v-else class="card-goods" v-model="checkedGoods" ref="checkboxGroup">
        <van-cell v-for="(item,index) in goods" :key="index">
          <template #title>
            <span class="left" @click="toggle(index)">
              <van-checkbox @click="toggle(index)" :name="item.skuid" class="mt-20" ref="checkboxes" />
            </span>
            <span class="left ml-10">
              <van-image v-if="item.data.legth>0" :src="item.data[1][0].imgUrl" width="60" height="60"></van-image>
              <van-image v-else :src="item.goods.img" width="60" height="60"></van-image>
            </span>
            <span class="left ml-10 h-20 w-150 van-ellipsis" style="line-height: 30px;"
              @click="$navto('goods/'+item.goodsId)">
              {{item.goods.name}}
            </span>

            <span class="left ml-10 h-40 w-150 van-multi-ellipsis--l2">
              <span v-for="(v,i) in item.data" :key="i" style="font-size: 12px;line-height: 20px;">
                {{v[0].title}}:{{v[0].name}}
              </span>
            </span>
          </template>

          <template #right-icon>
            <van-row class="text-right">
              <span class="color-red h-30 d-block">￥{{formatPrice(item.price)}}</span>
              <!--计算器-->
              <span class="mt-10">
                <van-stepper v-model="item.num" step="1" :max="item.stock_num" v-if="edit==0" />
                <van-icon @click="deleteCart(index)" name="delete-o" v-else />
              </span>
            </van-row>

          </template>

        </van-cell>
      </van-checkbox-group>

    </van-cell-group>

    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" style="margin-bottom: 55px;">
      <van-checkbox v-model="checked" @click="allSelect">全选</van-checkbox>
    </van-submit-bar>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        edit: 0,
        act_txt: '编辑',
        checked: false,
        checkedGoods: [],
        goods: []
      };
    },

    computed: {
      submitBarText() {
        const count = this.checkedGoods.length;
        return '结算' + (count ? `(${count})` : '');
      },
      //统计价钱
      totalPrice() {
        return this.goods.reduce((total, item) =>
          total + (this.checkedGoods.indexOf(item.skuid) !== -1 ? item.price * item.num : 0), 0);
      }
    },

    mounted() {
      let goodslist = localStorage.getItem('cart');
      if (goodslist != '' && goodslist != null) {
        goodslist = JSON.parse(goodslist);
        this.goods = goodslist;
      }
	  this.$toast.loading({
	  	message:'加载中...',
	  	forbidClick:true,
		duration:3
	  });
    },

    methods: {
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },
      act_edit() {
        if (this.edit == 0) {
          this.act_txt = '完成'
          this.edit = 1;
        } else {
          this.edit = 0;
          this.act_txt = '编辑'
        }
      },

      //删除
      deleteCart(index) {
        this.goods.splice(index, 1);
        let goodsCarts = [];
        if (this.goods.length > 0) {
          goodsCarts = JSON.stringify(this.goods);
        }
        localStorage.setItem('cart', goodsCarts); //全局状态参数修改
      },

      // select(index) {

      //   //  this.goods[index].checked = !this.goods[index].checked;

      // },
      //全选
      allSelect() {
        this.$refs.checkboxGroup.toggleAll();
      },

      formatPrice(price) {
        return (price / 100).toFixed(2);
      },
      //提交订单
      onSubmit() {
        let params = this.goods;
        if (this.checkedGoods.length == 0) {
          this.$toast('请选择购买商品');
        } else {
          this.$cache_set('goodsOrder', params); //加入全局状态并跳转
          this.$navto('/addorder'); //进行路由跳转
        }

      }
    }
  };
</script>
<style>
  .icon_cart .van-icon {}

  .card-goods {
    height: 70vh;
    overflow: auto;
  }
</style>
