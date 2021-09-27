<template>
  <div>
    <van-nav-bar title="账户充值" left-arrow @click-left="onClickleft" />
    <van-row>
      <van-field v-model="now_price" label="当前余额" readonly input-align="right" />
      <van-field v-model="amount" label="充值金额" placeholder="请输入充值金额" input-align="right" />
      <van-button class="button_bottom" @click="pay">去支付</van-button>
    </van-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        amount: '',
        now_price: "￥1600",
      }
    },
    methods: {
      onClickleft() {
        this.$router.go(-1);
      },
      pay() {
        if (this.amount == '' || this.amount == 0) {
          this.$toast("请填写充值金额");
          return;
        } else {
          this.$router.push('/payment');
        }

      }
    }
  }
</script>
<style>
  .button_bottom {
    box-shadow: 0 0 10px #ccc;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 45px;
    line-height: 45px;
    background: #000;
    color: #FFF;
  }
</style>
