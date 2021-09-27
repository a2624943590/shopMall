<template>
  <div class="back-top">
    <img src="@/assets/top.png" alt="">
  </div>
</template>

<script>
  
  export default {
    name: 'BackTop',
  }
</script>
<style>
  .back-top {
    position: fixed;
    right: 13px;
    bottom: 60px;
    z-index: 9;
  }
  .back-top img {
    height: 43px;
    width: 43px;
  }
</style>