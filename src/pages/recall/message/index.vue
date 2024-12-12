<template>
  <div class="message-container">
    <img class="top-img" :src="is_cn ? img_chat_top_cn : img_chat_top_tw" />
    <div class="time">{{ currentTime }}</div>
    <div class="message-card">
      <div class="left">
        <img :src="img_avatar_chat" />
      </div>
      <div class="right">
        <div class="content" v-if="is_cn">
          <span>示例：</span>今年你日常出行或旅行的方向适合去【正北】，日常穿搭适合的颜色为【合欢红】，也可以搭配【红纹石】作为装饰，这些都有利于提升你的整体运势。更多注意事项请和我沟通获取~
        </div>
        <div class="content" v-else>
          <span>示例：</span>今年你日常出行或旅行的方向適合去【正北】，日常穿搭適合的顏色為【合歡紅】，也可以搭配【紅紋石】作為裝飾，這些都有利於提升你的整體運勢。更多註意事項請和我溝通獲取~
        </div>
        <div class="btn" @click="downApp(0)">{{ is_cn ? '结缘咨询' : '結緣咨詢' }}</div>
      </div>
    </div>
    <div class="bottom-btn" @click="downApp(1)">
      <img :src="is_cn ? img_chat_bottom_cn : img_chat_bottom_tw" />
    </div>
  </div>
</template>
<script>
import utils from '../../../libs/utils.js';
import img_avatar_chat from './../../../assets/img/recall/img_avatar_chat.webp';
import img_chat_top_cn from './../../../assets/img/recall/cn/img_chat_top_cn.webp';
import img_chat_top_tw from './../../../assets/img/recall/tw/img_chat_top_tw.webp';
import img_chat_bottom_cn from './../../../assets/img/recall/cn/img_chat_bottom_cn.webp';
import img_chat_bottom_tw from './../../../assets/img/recall/tw/img_chat_bottom_tw.webp';



export default {
  components: {

  },
  data() {
    return {
      img_avatar_chat,
      img_chat_top_cn,
      img_chat_top_tw,
      img_chat_bottom_cn,
      img_chat_bottom_tw,
      currentTime: '',
    }
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  created() {
    this.currentTime = this.getCurrentFormattedTime()
    utils.firebaseLogEvent(
      '10019',
      '-10001',
      'view_im_middle',
      'page_view',
      {
        channel: utils.getFBChannel(),
      }
    );
  },
  mounted() {

  },

  watch: {

  },
  methods: {
    // 获取并管理时间的函数
    getCurrentFormattedTime() {
      // 先从 localStorage 中获取已存储的时间
      const storedTime = localStorage.getItem('activity_current_time')

      // 如果已经存储了时间，直接返回
      if (storedTime) {
        return storedTime
      }

      // 如果没有存储的时间，获取当前时间并格式化
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const formattedTime = `${hours}:${minutes}`

      // 将格式化后的时间存储到 localStorage
      localStorage.setItem('activity_current_time', formattedTime)

      return formattedTime
    },
    downApp(num) {
      location.href = `mlxz://recall/report?channel=${this.type}`;
      if (num === 0) {
        utils.firebaseLogEvent(
          '10019',
          '-10002',
          'click_im_middle_top_button',
          'click',
          {
            type: this.type,
          }
        );
      } else {
        utils.firebaseLogEvent(
          '10019',
          '-10003',
          'click_im_middle_bottom_button',
          'click',
          {
            type: this.type,
          }
        );
      }
    }
  },

};
</script>
<style scoped lang="less">
.message-container {
  background: #1B212D;
  height: 100vh;
  width: 100%;

  .top-img {
    width: 7.5rem;
    height: 2.02rem;
  }

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 0.26rem;
    color: rgba(145, 150, 165, 0.94);
    line-height: 0.3rem;
  }

  .message-card {
    width: 6rem;
    min-height: 3rem;
    display: flex;
    margin-left: 0.3rem;
    margin-top: 0.2rem;

    .left {
      display: flex;
      align-self: flex-end;
      margin-right: 0.16rem;

      img {
        width: 0.76rem;
        height: 0.76rem;
      }
    }

    .right {
      padding: 0.2rem;
      width: 5.06rem;
      background: #262D3C;
      border-radius: 0.24rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .content {
        font-weight: 400;
        font-size: 0.28rem;
        color: #FFFFFF;
        line-height: 0.33rem;
        text-align: left;
        font-style: normal;
        text-transform: none;

        span {
          color: #FFBB4B;
        }
      }

      .btn {
        width: 4.5rem;
        height: 0.84rem;
        background: linear-gradient(90deg, #7D89B3 0%, #A37E88 100%);
        border-radius: 0.84rem;
        font-weight: 500;
        font-size: 0.26rem;
        color: #FFFFFF;
        line-height: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .bottom-btn {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    width: 7.5rem;
    height: 1.42rem;

    img {
      width: 7.5rem;
      height: 1.42rem;
    }
  }
}
</style>
