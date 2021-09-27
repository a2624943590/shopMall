<template>
  <div>
    <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    <van-row>
      <van-cell title="个人信息" is-link to="../member/info"/>
      <van-cell title="修改密码" is-link to="../member/uppass"/>
      <van-cell title="清除缓存" is-link />
      <van-cell title="关于我们" is-link />
      <van-cell title="退出"  @click="logout"/>
    </van-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      //返回上一页
      onClickLeft() {
        //window.history.back()
        this.$router.go(-1);
        //this.$router.push('/user');
      },
      //退出功能
      logout(){
        let that=this;
        this.$dialog.confirm({
          message: '您确定退出登录?',
        }).then(() => {
           localStorage.setItem('token','');
           that.$router.push('/login')
        });

      }
    }
  }
</script>

<style>
</style>
