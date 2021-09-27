<template>
  <div>
    <van-nav-bar title="添加银行卡" left-arrow @click-left="onClickleft" />
    <van-cell-group>
      <van-field v-model="cardnum" label="银行卡号" placeholder="请输入银行卡号" />
      <van-field v-model="card_name" label="持卡人" placeholder="请输入持卡人" />
      <van-field v-model="bank_name" label="银行名称" placeholder="请输入银行名称" />
      <van-field v-model="type" label="银行卡类型" placeholder="请输入银行卡类型" />
      <van-field v-model="name" label="开户行名" placeholder="请输入开户行名" />
      <van-field v-model="address" label="开户行地址" placeholder="请输入开户行地址" right-icon="arrow-down" @click="selectType" />
      <van-field label="设为默认">
        <template #button>
          <van-checkbox v-model="oncheck"></van-checkbox>
        </template>
      </van-field>


      <van-button class="button_bottom" @click="add">添加</van-button>


    </van-cell-group>


    <!--独立选择器-->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '全部',
        showPicker: false, //默认不打开
         columns: [
                    {
                      text: '浙江',
                      children: [
                        {
                          text: '杭州',
                          children: [{ text: '西湖区' }, { text: '余杭区' }],
                        },
                        {
                          text: '温州',
                          children: [{ text: '鹿城区' }, { text: '瓯海区' }],
                        },
                      ],
                    },
                    {
                      text: '安徽',
                      children: [
                        {
                          text: '杭州',
                          children: [{ text: '西湖区' }, { text: '余杭区' }],
                        },
                        {
                          text: '温州',
                          children: [{ text: '鹿城区' }, { text: '瓯海区' }],
                        },
                      ],
                    }
                ],
        cardnum: '',
        card_name: '',
        bank_name: '',
        type: '',
        name: '',
        address: '',
        oncheck: false
      }
    },
    methods: {
      onClickleft() {
        this.$router.go(-1);
      },
      add() {

      },
      //点击选择事件
      selectType() {
        this.showPicker = true;

      },
      onConfirm(value, index) {
        this.value = value;
        console.log(this.value);
        this.address = this.value;
        this.showPicker = false;
      },
    },

    mounted() {

    }
  }
</script>

<style>
  .button_bottom {
    box-shadow: 0 0 10px #ccc;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 45px;
    line-height: 45px;
    background: #000;
    color: #FFF;
  }
</style>
