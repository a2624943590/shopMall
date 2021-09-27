<template>
  <div>
    <van-nav-bar title="地址管理" left-arrow @click-left="$back()" />
    <van-contact-list v-model="chosenContactId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
      @select="onSelect" />
  </div>
</template>

<script>
  //引入接口
  import {addressList} from '@/common/api/web/user.js' //引用接口
  export default {
    data() {
      return {
        type:'addr',
        chosenContactId:0,
        list: [],
      };
    },
    //初始化
    mounted() {
      console.log(this.$route.query);
      if(this.$route.query.type){
        this.type=this.$route.query.type;
      }

      this.iniData();
    },
    methods: {
      async iniData(){

        let res=await addressList();
        console.log(res);
        if(res.code==200){
          this.list=res.data.data;
        }
      },

      onAdd() {
        this.$router.push('address_edit')
      },
      onEdit(contact) {
        console.log("aaa");
      },
      onSelect(contact) {
       if(this.type=='order'){
         this.$cache_set('concat',contact);
         this.$back();
       }else{
          this.$navto('/address_edit?id='+contact.id);
       }
      },
    },
  };
</script>

<style>
</style>
