<template>
  <div>
    <van-nav-bar title="我的银行卡" left-arrow @click-left="onClickleft" />

    <van-address-list v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      add-button-text="添加银行卡"
      />

  </div>
</template>

<script>
  export default {
    data() {
      return {
        chosenAddressId: '1',
        list: [{
            id: '1',
            name: '张三',
            tel: '13000000000',
           
            isDefault: true,
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            
          },
        ],


    }
  },
  methods: {
      onClickleft() {
        this.$router.go(-1);
      },
      onAdd(){
        this.$router.push('/bankcard_edit')
      },

      onEdit(val){
        console.log(val);
      },

    },

  }
</script>

<style>
</style>
