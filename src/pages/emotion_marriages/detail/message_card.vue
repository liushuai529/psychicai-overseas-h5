<template>
  <div class="message-card" @click="$emit('scrollClick')">
    <img class="head-img" :src="is_cn ? cn_info_title : tw_info_title" />
    <div class="message-container">
      <div class="item">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="text">
          {{ `您好，${username}，${is_cn ? '我是本次服务您的老师！' : '我是本次服務您的老師！'}` }}
        </div>
      </div>
      <div class="item">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="text">
          <div>您的八字信息：</div>
          <div>{{ `姓名：${username}` }}</div>
          <div>日期：{{ date }}</div>
        </div>
      </div>
      <div class="item" v-show="voice_show[0]">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="voice" @click="playSound">
          <img v-if="is_playing" src="../../../assets/img/emotion_marriages/chat_sound_opposite.gif" />
          <img v-else src="../../../assets/img/emotion_marriages/chat_icon_sound_opposite_03.webp" />
          <div>10s</div>
        </div>
        <audio ref="audioPlayer" src="https://psychicai-static.psychicai.pro/audio/life_marriage.mp3"
          @ended="onEnded"></audio>

      </div>

      <div class="item" v-show="voice_show[1]">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <img class="un-voice" :src="is_cn ? chat_voice_unlock_01_cn : chat_voice_unlock_01_tw" />
      </div>
      <div class="item" v-show="voice_show[2]">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <img class="un-voice1" :src="is_cn ? chat_voice_unlock_02_cn : chat_voice_unlock_02_tw" />
      </div>
    </div>

  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
import cn_info_title from '../../../assets/img/emotion_marriages/cn/img_pay_top_laoshi_cn.webp';
import tw_info_title from '../../../assets/img/emotion_marriages/tw/img_pay_top_laoshi_tw.webp';
import chat_voice_unlock_01_cn from '../../../assets/img/emotion_marriages/cn/chat_voice_unlock_01_cn.webp';
import chat_voice_unlock_02_cn from '../../../assets/img/emotion_marriages/cn/chat_voice_unlock_02_cn.webp';

import chat_voice_unlock_01_tw from '../../../assets/img/emotion_marriages/tw/chat_voice_unlock_01_tw.webp';
import chat_voice_unlock_02_tw from '../../../assets/img/emotion_marriages/tw/chat_voice_unlock_02_tw.webp';
export default {
  props: {
    date: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    sub_type: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      language: utils.getLanguage(),
      cn_info_title,
      tw_info_title,
      chat_voice_unlock_01_cn,
      chat_voice_unlock_02_cn,
      chat_voice_unlock_01_tw,
      chat_voice_unlock_02_tw,
      is_playing: false,
      is_loader: false,
      voice_show: {
        0: false,
        1: false,
        2: false
      }
    };
  },
  mounted() {
    this.$refs.audioPlayer.oncanplaythrough = function () {
      this.is_loader = true;
      console.log('音频已加载完毕！');
    };
  },
  created() {
    let num1 = 3000;
    let num2 = this.generateRandomNumber(6, 10) * 1000;
    let num3 = this.generateRandomNumber(6, 10) * 1000;
    setTimeout(() => {
      this.voice_show[0] = true;
      setTimeout(() => {
        this.voice_show[1] = true;
        setTimeout(() => {
          this.voice_show[2] = true;
        }, num3);
      }, num2);
    }, num1);
    // setTimeout(() => {

    // }, 2200);
    // setTimeout(() => {

    // }, 3200);
  },

  computed: {
    is_cn() {
      return this.language === 'zh-CN';
    },
  },


  methods: {
    generateRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    playSound() {
      window.event.stopPropagation()
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.play();
      this.is_playing = true;
      utils.firebaseLogEvent(
        '10012',
        '-10006',
        'click_voice_bar',
        'click',
        {
          channel: utils.getFBChannel(),
        }
      );

    },
    onEnded() {
      console.log('声音播放结束');
      this.is_playing = false;
    }
  },
};
</script>

<style scoped lang="less">
.message-card {
  width: 7.1rem;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  background: #FFF3F3;
  border-radius: 0.3rem;
  border: 0.06rem solid #FFBBBB;

  .head-img {
    width: 6.98rem;
    height: 0.82rem;
    margin-bottom: 0.24rem;
  }

  .message-container {
    display: flex;
    padding: 0 0.24rem;
    flex-direction: column;

    .item {
      display: flex;
      margin-bottom: 0.24rem;

      .icon {
        width: 0.74rem;
        height: 0.74rem;
        margin-right: 0.16rem;
      }

      .text {
        padding: 0.2rem;
        font-weight: 400;
        font-size: 0.28rem;
        color: #3A0922;
        line-height: 0.42rem;
        text-align: left;
        font-style: normal;
        background: #FFFFFF;
        border-radius: 0.12rem;
      }

      .voice {
        width: 2.73rem;
        height: 0.82rem;
        background: #FFDBDB;
        border-radius: 0.12rem;
        display: flex;
        font-weight: 400;
        font-size: 0.28rem;
        color: #E50A0A;
        line-height: 0.42rem;
        text-align: right;
        font-style: normal;
        justify-content: space-between;
        padding: 0.2rem;

        img {
          width: 0.38rem;
          height: 0.38rem;
        }
      }

      .un-voice {
        width: 3.5rem;
        height: 0.82rem;
      }

      .un-voice1 {
        width: 3.34rem;
        height: 0.82rem;
      }
    }

  }
}
</style>
