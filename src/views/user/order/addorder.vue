<template>
  <div>
    <van-nav-bar left-arrow title="提交订单" @click-left="$back()" />
    <!--联系地址-->
    <van-row v-if="contact.name==undefined" class="text-center">
      <van-button type="danger" size="small" @click="$navto('/address_list?type=order')">添加收货地址</van-button>
    </van-row>
    <van-contact-card v-else type="edit" :name="contact.name" :tel="contact.tel"
      @click="$navto('/address_list?type=order')" />
    <van-card v-for="(item,index) in goodsData" :key="index" :num="item.num" :price="item.price/100"
      :title="item.goods.name" :thumb="item.goods.img" />
    <van-cell-group>
      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
      <van-cell title="发票(费用6%)" is-link @click="openPop=true">
        <template #right-icon>
          {{invoice/100}}
        </template>
      </van-cell>

      <van-cell title="运费" :value="freight" />
      <van-field v-model="user_remark" rows="2" autosize label="留言" type="textarea" maxlength="50" placeholder="请输入留言"
        show-word-limit />
    </van-cell-group>

    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">

    </van-submit-bar>

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons"
        @change="onChange" @exchange="onExchange" />
    </van-popup>

    <!---发票-->
    <van-popup v-model="openPop" closeable close-icon="close" position="bottom" :style="{ height: '40%' }">
      <van-field name="radio" label="发票类型" class="mt-20">
        <template #input>
          <van-radio-group v-model="invoice_attr['invoice_type']" direction="horizontal">
            <van-radio name="1">个人</van-radio>
            <van-radio name="2">单位</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field v-model="invoice_attr['invoice_title']" name="发票抬头" label="发票抬头" placeholder="发票抬头" />

      <van-field v-if="invoice_attr['invoice_type']=='2'" v-model="invoice_attr['invoice_desc']" name="税号" label="税号"
        placeholder="纳税人识别号" />

      <van-row type="flex" justify="center" class="mt-10">
        <van-button type="primary" class="mr-10" @click="invoiceAtr(1)">保存</van-button>
        <van-button type="default" @click="invoiceAtr(2)">取消</van-button>
      </van-row>

    </van-popup>

  </div>
</template>
<script>
  import {findItem} from '../../../common/js/base'
  import {
    userInfo,
    voucherList,
    voucherChange,
  } from '@/common/api/web/user.js' //引用接口

  import {
    orderAct
  } from '@/common/api/web/order.js' //引用接口

  import {
    uuid
  } from 'vue-uuid';

  const coupon = {};
  export default {
    data() {
      return {
        goodsData: [],
        showList: false,
        chosenCoupon: -1,
        coupons: [], //未使用优惠劵
        disabledCoupons: [], //已使用优惠劵
        checked: false,
        contact: {}, //地址
        shop_card: "未选择",
        freight: 10, //运费
        voncer: 0,
        user_remark: '', //留言
        openPop: false,
        invoice: 0, //发票
        invoice_attr: {
          invoice_type: "1",
          invoice_title: '',
          invoice_desc: ''
        },
        payList:[]
      };
    },
    computed: {
      //统计商品价钱
      goodsPrice() {
        return this.goodsData.reduce((total, item) =>
          total + item.price * item.num, 0);
      },
      totalPrice() {
        return this.goodsPrice + this.freight * 100 - this.voncer + this.invoice;
      }
    },
    //初始化状态时候获取的
    mounted() {
     this.payList = this.$route.query.id
     console.log(this.payList);
      //获取提交过来的产品信息
      let goods = localStorage.getItem('goodsOrder');
      if (goods) {
        goods = JSON.parse(goods);
      }
      for(let i = 0;i < this.payList.length;i++){
        let index = findItem(goods,'skuid',this.payList[i])
        // console.log(index);
        if(index != -1)
          this.goodsData.push(goods[index])
      }
      //本地赋值
      // this.goodsData = goods;
      //调用默认请求信息
      this.initData()
      //调用优惠劵接口
      this.initVonice();
    },
    methods: {
      //获取用户默认数据
      async initData() {
        //获取点击联系人地址
        let concat = this.$cache_get('concat');
        if (concat != '') {
          this.contact = concat;
        } else {
          //获取登录时候保存的个人信息
          let user = this.$cache_get('user');
          let params = {
            uid: user['id']
          };
          //请求获取会员详情接口
          let res = await userInfo(params);
          if (res.code == 200) {
            //联系人地址赋值
            this.contact = res.data.address;
          }
        }
      },
      //优惠劵列表信息
      async initVonice() {
        let res = await voucherList(); //列表接口
        if (res.code == 200) {
          this.coupons = res.data.coupons;
        }
      },
      //选择优惠劵
      onChange(index) {
        console.log(index);
        if (index > -1) {
          this.voncer = this.coupons[index].value; //获取优惠劵的金额
        } else {
          this.voncer = 0;
        }
        this.showList = false;
        this.chosenCoupon = index; //index-value
        this.randomOrder();
      },
      //兑换优惠劵
      async onExchange(account) {

        let res = await voucherChange({
          account: account
        }); //兑换接口
        if (res.code == 200) {
          this.coupons.push(res.data);
        } else {
          this.$toast(res.msg);
        }

      },

      //发票类型 1:保存 2:取消
      invoiceAtr(id) {
        if (id == 1) {
          //保存处理
          if (this.invoice_attr['invoice_title'] == '') {
            this.$toast('请填写发票抬头');
            return;
          }
          console.log(this.invoice_attr);
          if (this.invoice_attr['invoice_desc'] == '' && this.invoice_attr['invoice_type'] == "2") {
            this.$toast('请填写发票税号');
            return;
          }
          this.openPop = false;
          console.log(this.goodsPrice);
          this.invoice = this.goodsPrice * 0.06 == 0 ? 10 : this.goodsPrice * 0.06; //根据商品价格6%出的发票，商品为0，发票默认价格10
        } else {
          //取消处理
          this.invoice = 0; //发票价格归零
          this.invoice_attr = {
            invoice_type: "1",
            invoice_title: '',
            invoice_desc: ''
          };
          this.openPop = false;
        }
      },
      async onSubmit() {
        //跳到支付页面
        console.log(this.contact);
        if (this.contact == {}) {
          this.$toast('请添加收货地址');
          return;
        }

        let goodsArray = [];
        this.goodsData.forEach(function(item, index) {
          console.log(item);
          let data = {
            'num': item.num,
            'skuid': item.skuid,
            'sku': item.data,
            'goodsid': item.goodsId,

          }
          goodsArray.push(data);
        })


        //获取优惠劵信息
        console.log(this.coupons);

        let coupon_id = 0;
        if (this.chosenCoupon > -1) {
          coupon_id = this.coupons[this.chosenCoupon]['id'];
        }
        let is_invoice = 0;
        //判定是否开发票
        if (this.invoice > 0) {
          is_invoice = 1;
        }

        console.log(goodsArray);
        //获取发票>0要开发票
        let params = {
          address_id: this.contact.id, //地址ID
          goods: goodsArray, //商品属性
          coupon_id: coupon_id, //优惠劵ID
          is_invoice: is_invoice, //是否需要发票
          invoice_title: this.invoice_attr['invoice_title'], //发票抬头
          invoice_type: this.invoice_attr['invoice_type'], //发票类型
          invoice_desc: this.invoice_attr['invoice_desc'], //发票税号
          user_remark: this.user_remark //留言
        }

        // console.log(params);
        //return;

        //提交接口
        let res = await orderAct(params);

        if (res.code == 200) {
          this.$store.state.voncer = this.formatPrice(this.voncer)
          // console.log('voncer',this.$store.state.voncer);
          let orderid = res.data.order_id;
          this.$router.push('payment?id=' + orderid + '&type=1');
          
          let cartList = JSON.parse(localStorage.getItem('cart'))
          console.log('cartList',cartList);
          for(let i = 0;i < this.payList.length;i++){
            const index = findItem(cartList,'skuid',this.payList[i])
            if(index !== -1){
              cartList.splice(index,1)
            }
            console.log('index',index);
          }
          localStorage.setItem('cart',JSON.stringify(cartList))
        }
        //this.$router.push('payment');
      },
      formatPrice(price) {
        return (price / 100).toFixed(2);
      },

      //订单号
      randomOrder() {
        console.log(uuid.v4());
        const now = new Date();
        let year = now.getFullYear().toString();
        let month = (now.getMonth() + 1).toString();
        let day = now.getDate().toString();
        let hour = now.getHours().toString();
        let minutes = now.getMinutes().toString();
        let seconds = now.getSeconds().toString();
        // 存放订单号
        let num = '';
        // N位随机数(加在时间戳后面)
        for (var i = 0; i < length; i++) {
          num += Math.floor(Math.random() * 10);
        }
        let a = year + month + day + hour + minutes + seconds + num;
        console.log(a);
      }
    },
  };
</script>

<style>
</style>
