<template>
  <div>
    <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" />

    <van-field v-model="oldpass" type="password" label="原始密码" placeholder="原始密码"
      :rules="[{ required: true, message: '请填写密码' }]" />

    <van-field v-model="password" type="password" label="新密码" placeholder="新密码"
      :rules="[{ required: true, message: '请填写密码' }]" />

    <van-field v-model="repassword" type="password" label="确认新密码" placeholder="确认新密码"
      :rules="[{ required: true, message: '请填写密码' }]" />

    <van-button class="button" square style="height: 2.5rem; " color="linear-gradient(to right, #ff6034, #ee0a24)"
      native-type="submit" size="large">保存</van-button>


    </van-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        oldpass: '',
        password: '',
        repassword: ''
      }
    },
    methods: {
      onClickLeft() {

      }
    }
  }
</script>

<style>
  .button {
    position: fixed;
    bottom: 0px;
  }
</style>
