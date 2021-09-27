<template>
  <div>
    <van-nav-bar title="我的优惠劵" left-arrow @click-left="$back()" />
    <van-tabs v-model="active" @click="selectTab">
      <van-tab title="未使用" />
      <van-tab title="已使用" />
      <van-tab title="已失效" />
    </van-tabs>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="margin-bottom: 50px;">
      <van-cell-group>

        <van-list v-model="loading" :finished="finished" offset="10" :immediate-check="immediateCheck" finished-text="没有更多了" @load="onLoad">

          <van-cell v-for="(item,index) in dataList" :key="index">
            <template #icon>
              <van-row class="cell-coupon-title" :style="{'background-color':color}">
                coupon
              </van-row>
            </template>
            <template #title>
              <van-row>{{item.name}}</van-row>
            </template>

            <template #label>
              <van-row>
                购买所有商品 减{{item.value}}元
              </van-row>
              <van-row>
                有效期：{{item.start_time}} - {{item.end_time}}
              </van-row>
            </template>
          </van-cell>
        </van-list>
      </van-cell-group>
    </van-pull-refresh>

  </div>
</template>

<script>
  import {
    couponList
  } from '@/common/api/web/user.js'
  export default {
    data() {
      return {
        color: '#ff7159',
        active: 0,
        page: 1,
        isLoading: false,
        dataList: [],
        loading:false,
        finished:false,
        immediateCheck:false
      }
    },
    //初始化状态
    mounted() {
      this.initData();
    },
    methods: {
      async initData() {

        let params = {
          page: this.page,
          status: this.active
        }
        let res = await couponList(params);
        this.isLoading = false;
        this.loading=false;
        if (res.code == 200) {
          this.dataList.push(...res.data.data);
          if(this.page>=res.data.totalPage){
            this.finished=true;
            //到底了
          }else{
            this.page=this.page+1;
          }
        }

      },
      onRefresh() {
        this.dataList=[];
        this.page=1;
        this.initData();
      },
      onLoad(){

        this.initData();
      },
      selectTab() {
        if (this.active != 0) {
          this.color = '#999';
        } else {
          this.color = '#ff7159';
        }
        this.page=1;
        this.dataList=[];
        this.initData();
      }
    }
  }
</script>

<style>
  .cell-coupon-title {
    width: 30px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    font-size: 16px;
    color: #FFF;
    line-height: 25px;
    height: auto;
    text-align: center;
    writing-mode: vertical-rl;
    margin-right: 5px;
  }
</style>
