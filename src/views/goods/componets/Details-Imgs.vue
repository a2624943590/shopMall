<template>
  <div class="detail-imgs">
    <div v-if="detailsImgList.length > 0">
      <img
        :src="item.body.img_url"
        alt=""
        v-for="(item, index) in detailsImgList"
        :key="index"
        v-if="item.body && item.body.img_url && index >= 12 && index <= 32"
      />
      <div class="more" @click="openParams">
        查看全部参数<i class="iconfont icon-youjiantou"></i>
      </div>
      <img :src="detailsImgList[41].body.img_url" />
    </div>
    <params ref="paramsDiago"></params>
  </div>
</template>

<script>
import params from'./params.vue'
// import { mapState } from 'vuex';
import axios from "axios";
export default {
  components: {
    params
  },
  data() {
    return {
      detailsImgList: "",
    };
  },
  computed: {
    //    detailImg(){
    //        return  this.detailsImgList=this.$store.state.detailsImgList
    //    }
  },
  methods: {
    openParams() {
      this.$refs.paramsDiago.open();
    },
  },
  created() {
    // console.log(this.$store.state.detailsImgList)
  },
  async mounted() {
    const _data = await axios.get("http://localhost:3000/indexComment");
    this.detailsImgList = _data.data.data.goods_tpl_datas["7068"].sections;
  },
};
</script>

<style lang="less" scoped>
.detail-imgs{
  margin-bottom: 1.25rem;
}
div {
  width: 100%;
}
img {
  width: 100%;
  display: block;
}
.more {
  color: #4e72a5;
  font-size: 0.426667rem;
  text-align: center;
  line-height: 1.333333rem;
}
</style>