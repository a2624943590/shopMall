<template>
  <div>
    <van-nav-bar title="我的足迹" left-arrow @click-left="onClickleft" />
    <van-cell-group>
     <van-empty image="error" description="暂无列表" v-if="$store.state.historyList.length==0" />


      <van-swipe-cell v-for="(item,index) in $store.state.historyList" :key="item.id" v-else>
        <van-cell @click="$navto('/goods/'+item.id)">
          <template #title>
            <van-row class="cell-title">
              {{item.name}}
            </van-row>
          </template>
          <template #icon>
            <van-image style="margin-right: 5px;" width="80"
              :src="item.img"></van-image>
          </template>
          <template #label>
            <van-row class="cell-red">￥{{item.sell_price}}</van-row>
            <van-row class="cell-time">{{item.timer | getTime("YYYY/MM/DD-LTS")}}</van-row>
          </template>

          <template #right-icon>
            <van-icon name="arrow" style="top:30px"></van-icon>
          </template>
        </van-cell>
        <template #right>
          <van-button @click="collect(item.id,index)" square type="info" text="收藏" class="delete-button" />
          <van-button square type="danger" @click="deleteItem" text="删除" class="delete-button" />
        </template>
      </van-swipe-cell>



    </van-cell-group>
  </div>
</template>

<script>
import { findItem } from '../../../common/js/base'
  export default {
    data() {
      return {
        data_list:[
          {name:1}
        ]
      }
    },
    methods: {
      onClickleft() {
        this.$router.go(-1);
      },
      deleteItem(id,index){
        this.$store.state.historyList.splice(index,1)
      },
      collect(id,index){
        const isCollect = findItem(this.$store.state.collectList,'id',id)
        console.log(isCollect);
        if(isCollect == -1){
          // this.isCollect = true
          let time = Date.parse(new Date())
        // console.log(this.time);
        this.$set(this.$store.state.historyList[index],'timer',time)
          this.$store.state.collectList.unshift(this.$store.state.historyList[index])
          this.$toast('已添加收藏')
        }else{
          // this.$store.state.collectList.splice(isCollect,1)
          this.$toast('已添加收藏')
          // this.isCollect = false
        }
        // console.log(this.$store.state.collectList);
      }
    }
  }
</script>

<style>
  .cell-title {
    height: 40px;
    line-height: 20px;
    overflow: hidden;
  }

  .cell-red {
    color: #ff7159;
    font-size: 18px;
    height: 20px;
    line-height: 20px;
  }


  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
</style>
