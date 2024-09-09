<template>
  <div class="message-card">
    <img class="head-img" :src="is_cn ? cn_info_title : tw_info_title" />
    <div class="message-container">
      <div class="item">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="text">
          您好，吴桂花，我是本次服务您的xxx老师
        </div>
      </div>
      <div class="item">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="text">
          <div>您的八字信息：</div>
          <div>姓名：吴桂花</div>
          <div>日期：1998年3月22日 时辰不清楚</div>
        </div>
      </div>
      <div class="item">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="voice">
          <img src="../../../assets/img/emotion_marriages/chat_icon_sound_opposite_03.webp"/>
          <div>10s</div>
        </div>
      </div>

      <div class="item">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <img class="un-voice" :src="is_cn? chat_voice_unlock_01_cn: chat_voice_unlock_01_tw" />
      </div>
      <div class="item">
        <img class="icon" src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <img class="un-voice1" :src="is_cn? chat_voice_unlock_02_cn: chat_voice_unlock_02_tw" />
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
  props: [

  ],
  data() {
    return {
      language: utils.getLanguage(),
      cn_info_title,
      tw_info_title,
      chat_voice_unlock_01_cn,
      chat_voice_unlock_02_cn,
      chat_voice_unlock_01_tw,
      chat_voice_unlock_02_tw,
    };
  },
  created() { },
  computed: {
    is_cn() {
      return this.language === 'zh-CN';
    },
  },

  methods: {

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
