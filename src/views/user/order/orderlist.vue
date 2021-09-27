<template>
  <div>
    <van-nav-bar title="订单列表" left-arrow @click-left="$back()" />
    <van-tabs v-model="active" @click="tabSelect">
      <van-tab title="全部" />
      <van-tab title="待付款" />
      <van-tab title="待发货" />
      <van-tab title="待收货" />
      <van-tab title="待评价" />
    </van-tabs>

    <van-empty v-if="order_list.length==0" image="error" description="描述文字" />
     <!--列表上拉刷新-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-else style="height: 85vh; overflow: auto;">
     <!--列表下拉刷新-->
      <van-list v-model="loading" :offset="10" :immediate-check="isimmediate" :finished="finished" finished-text="没有更多了"
        @load="onLoad">
        <van-cell-group v-for="(item,index) in order_list" :key="index">
          <van-cell>
            <template #title  style="flex:2 !important;">
              订单编号:{{item.order_no}}
            </template>

            <template #right-icon>
              {{item.status_text}}
            </template>

          </van-cell>
          <van-card v-for="(it,i) in item.goods" :key="i" :thumb="it.img">
            <template #title>
              <van-cell style="padding: 0px;">
                <van-col span="20">{{item.accept_name}}</van-col>
                <van-col span="4" style="text-align:right;">{{item.real_amount}}</van-col>
              </van-cell>
            </template>
            <template #desc>
              <van-cell style="padding: 0px;margin-top: 20px;">
                <van-col span="24" style="text-align: right;">x2</van-col>
              </van-cell>
            </template>
            <template #footer>
              <van-row style="text-align: left;">
                <span>合计<b>￥{{item.real_amount}}</b></span>
                <span>共<b>1</b>件</span>
              </van-row>
              <van-row style="padding: 10px; text-align: right;">
                <van-button plain type="info" size="mini" color="#999"
                  @click="$navto('order_info?id='+item.order_no+'&type=1')">查看详情</van-button>
                  
                <van-button v-if="item.status<3" plain type="info" size="mini" color="#000"
                  @click="$navto('payment?id='+item.order_no+'&type=1')">立即支付</van-button>
                  
                   <van-button v-if="item.status==3"  plain type="info" size="mini" color="#000"
                     @click="$navto('order_info?id='+item.order_no+'&type=1')">催发货</van-button>
                	 
                  <van-button v-if="item.status==4"  plain type="info" size="mini" color="#000"
                    @click="$navto('order_info?id='+item.order_no+'&type=1')">确认收货</van-button>
                
                  <van-button v-if="item.status==5"  plain type="info" size="mini" color="#000"
                    @click="$navto('order_info?id='+item.order_no+'&type=1')">去评价</van-button>
              </van-row>
            </template>
          </van-card>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {
    orderList
  } from '@/common/api/web/order.js' //引用接口
  export default {
    data() {
      return {
        active: 0,
        count: 0,
        loading: false,
        isLoading: false,
        isimmediate: false,
        finished: false,
        order_list: [],
        page: 0,
        pagesize: 10,
      }
    },
    //初始化状态
    mounted() {
      if (this.$route.params) {
        this.active = this.$route.params['id'];
      }
      this.initData();
    },
    methods: {
      //默认数据
      async initData() {
        var params = {
          page: this.page,
          pagesize: 5,
          active: this.active,
        };
        let res = await orderList(params); //异步获取
        this.page += 1; //请求完 page初始是1 请求前加1 初始是0
        if (this.page > res.data.totalPage) {
          this.finished = true; //结束下拉
        }
        if (res.code == 200) {
          this.order_list.push(...res.data.data); //两个数组合并
        } else {
          this.$toast(res.msg);
        }
        this.loading = false;
        this.isLoading = false;
      },
      //下拉刷新
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.count++;
        }, 1000);
      },
      //上拉刷新
      onLoad() {
        this.initData();
      },

      //点击跳转
      navTo(name, id) {
        this.$router.push({
          name: name,
          params: {
            id: id,
            url: 'order'
          }
        })
      },
      //选择tab
      tabSelect() {
        this.page = 1;
        this.order_list = [];
        this.initData();
      }
    }
  }
</script>

<style>
</style>
