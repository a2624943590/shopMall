<template>
  <div>
    <van-nav-bar title="找回密码" left-arrow @click-left="$back()" />

    <!--main-->
    <van-cell-group>
      <van-form >
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />

        <van-field v-model="password" type="password"  label="新密码" placeholder="新密码"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-field v-model="repassword" type="password"   label="确认密码" placeholder="密码"
          :rules="[{ required: true, validator:validPass, message: '请填写确认密码' }]" />

        <van-field v-model="tel" type="tel" name="手机号码" label="手机号码" placeholder="手机号码"
          :rules="[{ required: true, validator:validTel, message: '请填写确认手机号码' }]" />

        <van-field v-model="code" center clearable label="短信验证码" placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请填写短信验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary" @click="getCode()">{{msgtxt}}</van-button>
          </template>
        </van-field>

        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="onSubmit()">提交</van-button>
        </div>
      </van-form>
    </van-cell-group>

  </div>

  </div>
</template>
<script>
  import {
    register
  } from '../../common/api/web/user.js'
  export default {
    data() {
      return {
        msgtxt:'发送验证码',
        username: '',
        password: '',
        repassword: '',
        code: '',
        ycode: '',
        tel: '',
        fastid:0,
      };
    },
    methods: {
      validPass(val){
        if(this.password!=val){
            return false;
        }else{
            return true;
        }
      },
      validTel(val){
        if(this.tel.length!=11){
          return false;
        }else{
          return true;
        }
      },
      //获取短信验证码
      getCode(){
        if(this.tel==''){
           this.$toast('请输入手机号码');
        }else{
           this.fastid=1;
           this.setCodetime();//倒计时
        }

      },
      setCodetime(){
        let second = 60;
        //setInterval 定时功能
        const timer = setInterval(() => {
          second--;
          if (second) {
            this.msgtxt=second+'秒后获取';
          } else {
            clearInterval(timer);
            this.msgtxt="获取验证码";
          }
        }, 1000);
      },
      onSubmit() {
        if(this.fastid==0){
          this.$toast("请点击获取验证码");
          return;
        }
        let params = {
          name: this.username,
          password: this.password,
          repassword: this.repassword,
          code: this.code,
          ycode: this.code,
          tel: this.tel
        }
        let that = this;
        //注册接口
        this.$toast.loading();
        forget(params).then(function(response) {
          if (response.code == 200) {
            that.fastid=0;
            that.name='';
            that.password='';
            that.repassword='';
            that.code='';
            that.tel='';
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
