<template>
  <div>
    <van-nav-bar left-arrow title="余额提现" @click-left="onClickleft" />
    <van-cell-group>
      <van-cell title="请选择银行卡" is-link to="/withdraw_cash" class="cart_tixian">
        <template #icon>
          <van-icon class="card_img" name="http://zhongjun.ueoa.net/wap/static/image/yl.png" />
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <van-row style="font-size: 12px;">
            最低提现金额 0.01 元（收取 0 %服务费）
          </van-row>
        </template>

        <template #label>
          <van-row style="border-bottom: 1px solid #DDDDDD;">
            <van-field v-model="value"  left-icon="after-sale" placeholder="请输入用户名"
             style="padding:20px 0px;" />
          </van-row>
          <van-row style="height: 50px;line-height: 50px;color: #000000;">
            可用余额 1600.00 元
          </van-row>
        </template>


      </van-cell>


      <van-button class="button_bottom">确认提交</van-button>

    </van-cell-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
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
  .card_img img {
    width: 100px;
    height: 30px;
  }
  .button_bottom{
    box-shadow: 0 0 10px #ccc;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align:center;
    height: 45px;
    line-height:45px;
    background: #FFF;
  }
</style>
