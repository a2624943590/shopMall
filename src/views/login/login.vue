<template>
  <div>
    <van-nav-bar title="登录" />
    <!--photo-->
    <van-cell-group class="photo">
      <van-image round width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    </van-cell-group>
    <!--main-->
    <van-cell-group>
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-row style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </van-row>
        <van-row type="flex" justify="space-between">
          <van-col span="6" style="text-align: center;" @click="$navto('reg')">注册</van-col>
          <van-col span="6" @click="$navto('forget')">找回密码</van-col>
        </van-row>
      </van-form>
    </van-cell-group>

  </div>

</template>

<script>
  import {login} from "../../common/api/web/user";
  //import qs from 'qs'
  export default {
    data() {
      return {
        username: '',
        password: '',
        sms: '',
      };
    },
    methods: {
      onSubmit() {
        let params = {
          name: this.username,
          password: this.password
        }
        let that = this;
        //登录接口
        login(params).then(function(response) {
          if (response.code == 200) {
            localStorage.setItem('token', response.data.token); //生成登录本地参数 全局
            localStorage.setItem('user',JSON.stringify(response.data[0]));
            //用户信息
            setTimeout(function() {
              that.$router.push('/index')
            }, 500);
          }
          that.$toast(response.msg);
        });

      },


    }
  }
</script>

<style>
  .photo {
    width: 100%;
    height: auto;
    text-align: center;
    margin: 1.25rem 0px;
  }
</style>
