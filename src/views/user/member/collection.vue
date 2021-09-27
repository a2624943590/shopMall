<template>
  <div>
    <van-nav-bar title="我的收藏" left-arrow @click-left="onClickleft" />
    <van-cell-group>
     <van-empty image="error" description="暂无列表" v-if="$store.state.collectList.length==0" />


      <van-swipe-cell v-for="(item,index) in $store.state.collectList" :key="index" v-else>
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
          <van-button @click="deleteItem" square type="danger" text="删除" class="delete-button" />
        </template>
      </van-swipe-cell>



    </van-cell-group>
  </div>
</template>

<script>
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
      deleteItem(index){
        this.$store.state.collectList.splice(index,1)
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
