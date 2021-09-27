<template>
  <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.path" alt="" @click="goTo(item.path)">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  methods: {
    goTo(url) {
      window.open(url)
    }
  }
}
</script>

<style scoped>
  .my-swipe .van-swipe-item  img {
      width: 100%;
      height: 100%;
  }
</style>