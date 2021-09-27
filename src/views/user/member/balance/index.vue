<template>
  <div>
    <van-nav-bar left-arrow title="我的余额" @click-left="onClickleft" />
    <van-cell-group>
      <van-cell style="background: #ff7159;padding: 16px;">
        <template #title>
          <van-row style="color: #FFF;padding: 5px 0px;">账户余额(元)</van-row>
        </template>
        <template #label>
          <van-row style="color: #FFF;padding:10px;font-size: 28px;">
            1600.00
          </van-row>
        </template>
      </van-cell>
      <van-cell title="账户充值" is-link icon="after-sale" to="/recharge"/>
      <van-cell title="余额提现" is-link icon="after-sale" to="/withdraw_cash"/>
      <van-cell title="余额明细" is-link icon="todo-list-o" to="/detail"/>
      <van-cell title="提现记录" is-link icon="clock-o" />
      <van-cell title="我的银行卡" is-link icon="balance-pay"  to="/bankcard"/>

    </van-cell-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      onClickleft() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style>
</style>
