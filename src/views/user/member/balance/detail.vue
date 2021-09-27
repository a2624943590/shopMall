<template>
  <div>
    <van-nav-bar title="余额明细" left-arrow @click-left="onClickleft" />

    <van-cell-group>
      <van-cell title="筛选类型" :value="value" @click="selectType">
        <template #right-icon>
          <van-icon name="arrow-down" style="top:5px;margin-left: 5px;"></van-icon>
        </template>
      </van-cell>
    </van-cell-group>


    <van-cell-group>
      <van-cell title="消费">
        <template #label>
          <van-row>
            <span style="height: 40px;line-height: 40px;">余额：1600.00</span>
          </van-row>
        </template>


        <template #right-icon>
          <van-row style="display: flex;flex-direction: column;">
            <span style="flex: 1;font-size: 12px; color: #999999;">余额：1600.00</span>
            <span
              style="flex: 1;text-align: right;color: #ff7159;font-size: 25px;height: 40px;line-height: 40px;">+2100</span>
          </van-row>

        </template>

      </van-cell>

      <van-cell title="消费">
        <template #label>
          <van-row>
            <span style="height: 40px;line-height: 40px;">余额：1600.00</span>
          </van-row>
        </template>


        <template #right-icon>
          <van-row style="display: flex;flex-direction: column;">
            <span style="flex: 1;font-size: 12px; color: #999999;">余额：1600.00</span>
            <span
              style="flex: 1;text-align: right;color: #ff7159;font-size: 25px;height: 40px;line-height: 40px;">+2100</span>
          </van-row>

        </template>

      </van-cell>


      <van-cell title="消费">
        <template #label>
          <van-row>
            <span style="height: 40px;line-height: 40px;">余额：1600.00</span>
          </van-row>
        </template>


        <template #right-icon>
          <van-row style="display: flex;flex-direction: column;">
            <span style="flex: 1;font-size: 12px; color: #999999;">余额：1600.00</span>
            <span
              style="flex: 1;text-align: right;color: #ff7159;font-size: 25px;height: 40px;line-height: 40px;">+2100</span>
          </van-row>

        </template>

      </van-cell>

      <van-cell title="消费">
        <template #label>
          <van-row>
            <span style="height: 40px;line-height: 40px;">余额：1600.00</span>
          </van-row>
        </template>


        <template #right-icon>
          <van-row style="display: flex;flex-direction: column;">
            <span style="flex: 1;font-size: 12px; color: #999999;">余额：1600.00</span>
            <span
              style="flex: 1;text-align: right;color: #ff7159;font-size: 25px;height: 40px;line-height: 40px;">+2100</span>
          </van-row>

        </template>

      </van-cell>
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
        columns: ['全部', '杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'], //index-value {nane:'123'} //key->value
      }
    },
    methods: {
      onClickleft() {
        this.$router.go(-1);
      },
      //点击选择事件
      selectType() {
        this.showPicker = true;
      },
      onConfirm(value, index) {
        this.value = value;
        console.log(this.value);

        this.showPicker = false;
      },
    }
  }
</script>

<style>
</style>
