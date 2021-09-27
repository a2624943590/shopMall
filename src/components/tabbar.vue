<template>
  <div>
    <!--页面-->
    <router-view style="margin-bottom: 50px;"/>
    <!--底部-->
    <van-tabbar v-model="active" @change="activeIndex" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item name="index" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item name="type" icon="bag">分类</van-tabbar-item>
      <van-tabbar-item name="cart" icon="shopping-cart" :badge="$cartnum()">购物车</van-tabbar-item>
      <van-tabbar-item name="user" icon="friends">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 'index', //切换属性
      };
    },
    methods: {
      //点击切换
      activeIndex() {
        this.$router.push('/' + this.active);
      },
      toIndex(){
        this.active = 'index'
        this.activeIndex()
      }

    },
    mounted() {
      this.$bus.$on('toIndex',this.toIndex)
      this.active=this.$route.name;
    },
    beforeDestroy() {
      this.$bus.$off('toIndex')
    },
  };
</script>

<style>
</style>
