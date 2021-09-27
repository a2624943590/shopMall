<template>
  <div>
    <van-nav-bar title="支付结果" left-arrow @click-left="onClickleft" />
    <van-row style="text-align: center;margin-top: 120px;">

      <img src="http://zhongjun.ueoa.net./wap/static/image/win.png" width="70px"/>
      <van-row style="margin: 10px 0px;">{{result_txt}}</van-row>
      <van-row style="margin-bottom: 30px;color: #FF0000">{{order_amount}}</van-row>

     <van-button plain hairline  color="#999999" style="height: 35px; width: 100px;" @click="orderinfo">查看详情</van-button>
    </van-row>
  </div>
</template>

<script>
  import {orderView} from '@/common/api/web/order.js' //引用接口
  export default {
    data() {
      return {
        status:0,
        result_txt:'正在加载',
        order_no:'',
        order_amount:0,
      }
    },
    mounted() {
       console.log(this.$route.query.id);
       this.order_no=this.$route.query.id;
       this.initdata();
    },
    methods:{
      async initdata(){
      let res=await orderView({order_no:this.order_no});
      if(res.code==200){
        this.status=res.data.pay_status;
        if(this.status==1){
          this.result_txt='支付成功';
        }else{
          this.result_txt='支付失败';
        }
        this.order_amount=res.data.order_amount - this.$store.state.voncer;
      }
      },
      //返回上一页
      onClickleft() {
        this.$router.go(-3);
      },
      orderinfo(){
        this.$navto('/order_info?id='+this.order_no);
      }
    },

  }
</script>

<style>
</style>
