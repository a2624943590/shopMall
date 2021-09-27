<template>
  <div>
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickleft" />
    <van-cell-group class="orderinfo">
      <van-cell :title="order.status_text" />
      <van-cell>
        <template #title>
          订单号:{{order.order_no}}
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          下单时间:{{order.create_time}}
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="orderinfo" style="padding-top: 10px;border-top: 1px solid #DDDDDD;">
      <van-cell>
        <template #title>
          收件人：{{order.accept_name}}
        </template>
      </van-cell>
      <van-cell :title="order.addr" />
    </van-cell-group>
    <van-card v-for="(item,index) in order.goods" :key="index" :thumb="item.img">
      <template #title>
        <van-cell style="padding: 0px;">
          <van-col span="20">{{item.name}}</van-col>
          <van-col span="4" style="text-align:right;">{{item.sell_price}}</van-col>
        </van-cell>
      </template>

      <template #desc>
        <van-cell style="padding: 0px;margin-top: 20px;">
          <van-col span="24" style="text-align: right;">x{{order.num}}</van-col>
        </van-cell>
      </template>
    </van-card>

    <van-cell-group>
      <van-cell title="订单总价" value="">
        <template #right-icon>
          ￥{{order.order_amount}}
        </template>
      </van-cell>
      <van-cell title="支付方式" :value="order.payment_text" />
      <van-cell title="支付时间" :value="order.create_time" />
    </van-cell-group>

    <van-submit-bar button-text="申请售后" tip-icon="info-o" @submit="onSubmit" />
  </div>
</template>

<script>
  import {
    orderView
  } from '@/common/api/web/order.js' //引用接口
  export default {
    data() {
      return {
        order: {},
        goodsList: [],
        order_no: '',
        topage: -4
      }
    },
    //初始化状态
    mounted() {
      this.order_no = this.$route.query.id; //获取订单ID
      //如果是从订单页面查看详情返回上页，从结果页面查看返回主页去;
      if (this.$route.query.type != undefined) {
        this.topage = -1
      }
      //默认请求数据
      this.initdata();
    },
    methods: {

      async initdata() {
        let res = await orderView({
          order_no: this.order_no
        });
        if (res.code == 200) {
          console.log(res);
          //select * from `order` where status=2;
          //订单状态status: 1提交成功 2待支付 3支付成功未确认，4确认成功， 5退货，6退货成功，7退货失败
          this.order = res.data;
        }
      },

      //返回上一页
      onClickleft() {
        this.$router.go(this.topage);
      },
      onSubmit() {

      }

    }
  }
</script>

<style>
  .orderinfo .van-cell {
    padding: 2px 10px !important;
  }
</style>
