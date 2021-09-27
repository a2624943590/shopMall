<template>
  <div>
    <van-nav-bar title="支付" left-arrow @click-left="onClickleft" />
    <van-cell-group>
      <van-cell title="订单类型" value="商品订单" />
      <van-cell title="订单号" :value="order_id" />
      <van-cell title="订单金额">
        <template>
          <span class="custom-title">￥{{ money }}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 20px">
      <van-cell
        v-for="(item, index) in paylist"
        :key="index"
        :title="item['pay_name']"
        :label="item['description']"
        is-link
        @click="pay(item['id'])"
      >
        <template #icon>
          <img :src="item.img" class="pay_img" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { paymentList, paymentAct } from "@/common/api/web/order.js"; //引用接口

export default {
  data() {
    return {
      order_id: "",
      money: 0,
      type: 0,
      paylist: [],
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.order_id = this.$route.query.id;
    this.type == this.$route.query.type;
    this.initData();
  },
  methods: {
    async initData() {
      //支付方法接口
      let res = await paymentList({ order_id: this.order_id });
      if (res.code == 200) {
        this.paylist = res.data.data;
        this.money = res.data.money - this.$store.state.voncer; //返回订单金额
      }
      console.log("money", this.money);
    },
    //支付
    async pay(id) {
      let params = {
        pay_id: id,
        order_id: this.order_id,
      };
      let that = this;
      //付款
      let res = await paymentAct(params);
      this.$toast(res.msg);

      if (res.code == 200) {
        this.$router.push("result?id=" + that.order_id);
        /* setTimeout(
           function() {

             that.$router.push('result?id='+that.order_id);
             //that.$navto('/result?id='+that.order_id);
           }, 1000
         );*/
      }
    },
    onClickleft() {
      this.$dialog.confirm({
        message: "确认退出支付？退出后可在个人页面未付款中查看订单",
      })
        .then(() => {
          // on confirm
          this.$navto('/cart')
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style>
.custom-title {
  color: #FF0000;
}

.pay_img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
