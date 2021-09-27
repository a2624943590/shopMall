<template>
  <div>
    <van-nav-bar title="在线客服" left-arrow @click-left="$back()" />
    <div class="main" ref="main">
      <div class="msg_content" ref="content">
        <van-row v-for="(item,index) in chatlist" :key="index" class=" list"
          v-bind:class="user['id']==item.pid?'one':'two'">
          <van-row class="photo">
            <img src="@/assets/1.jpg" />
          </van-row>
          <van-row class="msg">
            <van-row class="msg_name">{{item.name}}</van-row>
            <van-row class="msg_text">{{item.msg}}</van-row>
          </van-row>
        </van-row>
      </div>
    </div>
    <van-row class="chat_msg">
      <van-search v-model="value" left-icon="" show-action placeholder="请输入聊天内容" @search="onSearch">
        <template #action>
          <div @click="onSearch">发送</div>
        </template>
      </van-search>
    </van-row>
  </div>
</template>


<script>
  import {
    historyList,
    sendMsg,
    getMsg
  } from '@/common/api/web/chat.js' //引用接口
  export default {
    data() {
      return {
        scrollTop: 0,
        value: '',
        user: '',
        pid: 159,
        count: 0,
        chatlist: [],
        isLoading: false,
      }
    },
    mounted() {
      //获取好友ID
      console.log(this.$route.query.id);
      this.pid=this.$route.query.id;
      if(this.pid==''){
        this.$toast.error('未获取客服ID');
      }
      let user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
      let time = setInterval(this.onGetMsg, 2000); //轮询定时器
      this.onGetMsg();
      this.onScrollHiget();
    },
    methods: {
      //监听滚动事件
      onScrollHiget() {
        this.$nextTick(() => {
          //监听页面实际高度
          console.log(this.$refs.content.scrollHeight);
          this.$refs.main.scrollTop = this.$refs.content.scrollHeight; //更改滚动的高度
        });
      },
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
          this.count++;
        }, 1000);
      },
      //发送
      async onSearch(val) {
        let msg = {
          uid: this.user['id'],
          name: '我',
          photo: '1.jpg',
          pid: this.pid,
          msg: this.value
        }
        //发送信息
        let params = {
          data: msg
        }
        let res = await sendMsg(params);
        if (res.code == 200) {
          this.chatlist.push(msg);
          this.onScrollHiget();
        }
        this.value = '';
      },

      //接收消息
      async onGetMsg() {
        let res = await getMsg({});
        if (res.code == 200 && res.data != '') {
          console.log(res.data);
          this.chatlist.push(res.data);
          this.onScrollHiget();
        }

      },


    }
  }
</script>

<style>
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }

  .main {
    width: 100%;
    height: 80vh;
    box-sizing: border-box;
    overflow: auto;
  }

  .msg_content {
    height: auto;
    width: 100%;
  }


  .chat_msg {
    position: absolute;
    bottom: 0px;
    width: 100%;
    background: #ddd;
  }

  .photo {
    margin: 5px;
  }

  .photo img {
    width: 40px;
    height: 40px;
    border-radius: 50%;

  }

  .msg {
    height: auto;
    width: auto;
    font-size: 0.75rem;
  }

  .msg_text {
    background: #628cFF;
    color: #FFF;
    height: auto;
    width: auto;
    max-width: 60%;
    padding: 10px 15px;
    border-radius: 10px;

    display: inline-block;
  }

  .one .photo {
    float: left;
  }

  .one .msg {
    float: left;
  }

  .two .photo,
  .two .msg {
    float: right;
  }

  .two .msg_name {
    text-align: right;
  }


  .list {
    list: auto;
    margin-bottom: 10px;
  }
</style>
