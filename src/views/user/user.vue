<template>
  <div>
    <van-row class="top_header" type="flex" justify="center">
      <van-row style="text-align: center;">
        <van-image round width="80" height="80" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      </van-row>
      <van-row class="text-name">
        {{name}}
      </van-row>
      <van-row class="text-name font-12">
        普通等级
      </van-row>
    </van-row>
    <van-cell class="cell-list" title="我的订单" icon="todo-list-o" size="40" to="/orderlist" is-link />
    <van-grid :column-num="5">
      <van-grid-item icon="paid" text="待付款"  @click="$navto('orderlist',{id:1},2)" />
      <van-grid-item icon="exchange" text="待发货" @click="$navto('orderlist',{id:2},2)" />
      <van-grid-item icon="logistics" text="待收货" @click="$navto('orderlist',{id:3},2)" />
      <van-grid-item icon="records" text="待评价" @click="$navto('orderlist',{id:4},2)" />
      <van-grid-item icon="replay" text="退换货"  to="/goodsreturn"/>
    </van-grid>


    <van-cell class="cell-list" title="我的服务" icon="like-o" is-link />
    <van-row style="">
      
      <van-cell title="我的优惠券" icon="coupon-o" text="我的优惠券" to="coupon" is-link />
      <van-cell title="我的余额" icon="after-sale" text="我的余额" to="/balance" is-link />
      
      
      <van-cell title="地址管理" icon="location-o" text="地址管理" to="/address_list" is-link />
      <van-cell title="我的足迹" icon="flower-o" text="我的足迹" to="history" is-link />
      
  
    </van-row>
    <van-row>
    	<van-cell  title="我的收藏" icon="star-o" text="我的收藏" to="collection"  is-link />

      <!-- <van-cell  title="我的客服" icon="star-o" text="我的客服" to="/chat"  is-link /> -->
    	<van-cell title="系统设置" icon="setting-o" text="系统设置" to="/setting" is-link />
    	<van-cell title="联系123456" icon="phone-circle-o" to="/chat" text="联系123456" is-link />
    	
    </van-row>



  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  methods: {
    nav(id){
      this.$router.push({name:'orderlist',params:{id:id}});
    }
  },
  mounted() {
    let user=localStorage.getItem('user');
    user=JSON.parse(user);
    this.name=user.name;
	this.$toast.loading({
		message:'加载中...',
		forbidClick:true,
		duration:3
	});
  }
}
</script>

<style>
.cell-list .van-cell__left-icon {
  color: #FF0000;
  font-size: 24px;
}

.top_header {
  background: url('http://zhongjun.ueoa.net/wap/static/image/member-bg.png');
  background-size: 100%;
  height: 170px;
  width: 100%;
  flex-direction: column;
}

.text-name {
  text-align: center;
  color: #FFF;
  font-size: 14px;
  margin-bottom: 5px;
}

.font-12 {
  font-size: 12px !important;
}
</style>

