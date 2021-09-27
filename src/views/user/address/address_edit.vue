<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$back()" />
    <van-form @submit="onSubmit">
      <van-field v-model="infoData['name']" name="收货人" label="收货人" placeholder="收货人"
        :rules="[{ required: true, message: '请填写收货人' }]" />
      <van-field v-model="infoData['tel']" name="手机号" label="手机号" placeholder="手机号"
        :rules="[{ required: true, message: '请填写收货人' }]" />

      <van-field readonly clickable name="area" :value="infoData['area_name']" label="地区选择" placeholder="点击选择省市区"
        @click="showArea = true" />
      <van-popup v-model="showArea" position="bottom">
        <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
      </van-popup>

      <van-field v-model="infoData['addr']" name="详细地址" label="详细地址" placeholder="详细地址"
        :rules="[{ required: true, message: '请填写详细地址' }]" />

      <van-field name="switch" label="设为默认">
        <template #input>
          <van-switch v-model="infoData['is_default']" size="20" />
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>

      </div>
    </van-form>

    <van-row>
 
      <van-button class="mt-10" type="danger" v-if="infoData['id']!=null" round block @click="delAddr(infoData['id'])">
        删除</van-button>
    </van-row>
  </div>
</template>

<script>
  import {
    areaList
  } from '@vant/area-data';
  import {
    addressSave,
    addressInfo,
    addressDel,
  } from '@/common/api/web/user.js' //引用接口
  export default {
    data() {
      return {

        title: '添加地址',
        infoData: {},

        showArea: false,
        areaList: areaList, // 数据格式见 Area 组件文档
        switchChecked: false,
      };
    },

    //初始化
    mounted() {
      console.log(this.$route.query.id);

      if (this.$route.query.id != '') {
        this.infoData['id'] = this.$route.query.id;
        this.title = '地址编辑';
        this.iniData();
      } else {
        this.title = "添加地址";
      }
    },
    methods: {
      async iniData() {
        let res = await addressInfo({
          id: this.infoData['id']
        });
        if (res.code == 200) {
          this.infoData = res.data;
        }
      },
      delAddr(id) {
        let that=this;
        let params={id:this.infoData['id']};
        this.$dialog.confirm({
          title: '是否删除地址',
        }).then(() => {

          addressDel(params).then(function(res) {
            that.$toast(res.msg);
            if(res.code==200){
                  that.$back();
            }
          });

        })

      },
      onConfirm(values) {
        this.infoData['area_name'] = values
          .filter((item) => !!item)
          .map((item) => item.name)
          .join('/');

        this.infoData['area'] = values
          .filter((item) => !!item)
          .map((item) => item.code)
          .join('/');

        this.showArea = false;
      },
      async onSubmit() {
        console.log(this.infoData);
        let res = await addressSave(this.infoData);
        this.$toast(res.msg);
        if (res.code == 200) {
          console.log("aaa");
          this.$back();
        }
      },

    },
  }
</script>

<style>
  .custom-title {
    height: 40px;
    line-height: 40px;
    display: inline-block;
  }

  .button {
    position: fixed;
    bottom: 0px;
  }
</style>
