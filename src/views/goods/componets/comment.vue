<template>
  <div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="40"
      :style="{ maxHeight: WHeight + 'px' }"
    >
      <router-link
        tag="li"
        to="/detail/commentDetail"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="comments_top">
          <div class="headbox">
            <img :src="item.user_avatar" />
          </div>
          <div class="name">
            <p>{{ item.user_name }}</p>
            <p>{{ item.add_time }}</p>
          </div>
          <div class="zan">
            <i class="iconfont icon-smile"></i>&nbsp;<span>超爱</span>
          </div>
        </div>
        <div class="content">{{ item.comment_content }}</div>
        <div class="imgs">
          <div
            @click.prevent="openImg(item.comment_images)"
            class="itemimgbox"
            v-for="(img_item, img_index) in item.comment_images"
            :key="img_index"
            :style="{ backgroundImage: 'url(' + img_item + ')' }"
          ></div>
        </div>
        <div class="replybox">
          <p><span>官方回复：</span>{{ item.reply_content }}</p>
          <p
            v-for="(user_item, user_index) in item.user_replys"
            :key="user_index"
          >
            <img :src="user_item.user_avatar" alt="" />{{
              user_item.user_name
            }}：{{ user_item.reply_content }}
          </p>
          <router-link
            tag="div"
            to="/detail/commentDetail"
            class="more"
            v-if="item.user_reply_num > 3"
            >查看全部评论<i class="iconfont icon-xiangyoujiantou"></i
          ></router-link>
        </div>
      </router-link>
      <li class="loading" v-show="!end">数据处理中...</li>
      <li class="loading" v-show="end">没有数据了...</li>
    </ul>
  </div>
</template>

<script>
// import { commentData } from '@/server/detail.js';
// import { mapMutations } from 'vuex';
// import swiperMask from './components/swiperMask.vue';
// import commonHeader from '@/components/header/commonHeader.vue';
import axios from 'axios'
export default {
  // components:{
  //     swiperMask,
  //     commonHeader
  // },
  data() {
    return {
      list: [],
      WHeight: 500,
      page: 0,
      end: false,
    };
  },
  async mounted() {
    this.WHeight = window.innerHeight;
  },
  methods: {
    // ...mapMutations('details',[
    //     'setSwiperList'
    // ]),
    // openImg(list){
    //     this.setSwiperList({
    //         key:true,
    //         list
    //     });
    // },
    async loadMore() {
      this.page++;
      const _data = await axios.get("http://localhost:3000/comments", {
        params: {
          page: this.page,
        },
      });
      console.log(_data)
      if (!_data.data.result) this.end = true;
    //   const thisList = this.list;
      const newList = _data.data.data.comments;

      setTimeout(() => {
        this.list = [...newList];
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  overflow-y: scroll;
  li {
    margin: 0.426667rem;
    color: #3c3c3c;
  }
}
.comments_top {
  height: 0.906667rem;
  margin-bottom: 0.213333rem;
  .headbox {
    width: 0.906667rem;
    height: 0.906667rem;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: 0.213333rem;
    img {
      width: 100%;
    }
  }
  .name {
    float: left;
    font-size: 0.373333rem;
    line-height: 0.426667rem;
    p:nth-child(2) {
      font-size: 0.32rem;
    }
  }
  .zan {
    float: right;
    color: #ff6700;
    i {
      font-size: 0.533333rem;
      vertical-align: sub;
    }
  }
}
.content {
  font-size: 0.373333rem;
  width: 100%;
  white-space: normal;
  line-height: 0.48rem;
}
.imgs {
  width: 100%;
  overflow: hidden;
  margin: 0.266667rem 0;
  .itemimgbox {
    width: 2.213333rem;
    height: 2.213333rem;
    display: inline-block;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #000;
    margin: 0 0.16rem 0.16rem 0;
  }
}
.replybox {
  padding: 0.213333rem;
  background-color: #f6f6f6;
  p {
    margin-bottom: 0.213333rem;
    line-height: 0.426667rem;
    span {
      color: #ff6700;
    }
    img {
      width: 0.426667rem;
      height: 0.426667rem;
      border-radius: 0.213333rem;
      vertical-align: sub;
      margin-right: 0.213333rem;
    }
    font-size: 0.32rem;
  }
}
.more {
  line-height: 1.066667rem;
  border-top: 1px solid #d8d8d8;
  font-size: 0.426667rem;
  color: #ff6700;
  text-align: center;
}
.loading {
  text-align: center;
  line-height: 40px;
}
</style>