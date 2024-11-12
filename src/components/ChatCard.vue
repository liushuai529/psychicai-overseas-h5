<template>
  <div :class="['chat-card', { 'hands_show': hands_show, 'hands_hidden': hands_hidden }]" @click="downClick">

    <div class="content">
      <div class="left">
        <img :src="icon_url" />
      </div>
      <div class="right">
        <img :src="avatar_url" />
      </div>
    </div>
    <div class="btn">
      <img :src="chat_icon_message" />
      <span>{{ get_tip }}</span>
    </div>
  </div>
</template>
<script>
import utils from '../libs/utils';

import hunyin_img_chat_push_left_android_cn from '../assets/img/emotion_marriages/cn/hunyin_img_chat_push_left_android_cn.webp';
import hunyin_img_chat_push_left_android_tw from '../assets/img/emotion_marriages/tw/hunyin_img_chat_push_left_android_tw.webp';

import hunyin_img_chat_push_left_ios_cn from '../assets/img/emotion_marriages/cn/hunyin_img_chat_push_left_ios_cn.webp';
import hunyin_img_chat_push_left_ios_tw from '../assets/img/emotion_marriages/tw/hunyin_img_chat_push_left_ios_tw.webp';




import hunyin_img_chat_push_right_android_cn from '../assets/img/emotion_marriages/cn/hunyin_img_chat_push_right_android_cn.webp';
import hunyin_img_chat_push_right_android_tw from '../assets/img/emotion_marriages/tw/hunyin_img_chat_push_right_android_tw.webp';

import lianmai_img_chat_push_right_android_cn from '../assets/img/emotion_voice/cn/lianmai_img_chat_push_right_android_cn.webp';
import lianmai_img_chat_push_right_android_tw from '../assets/img/emotion_voice/tw/lianmai_img_chat_push_right_android_tw.webp';



import img_chat_push_left_android_cn from '../assets/img/emotion_fate/cn/img_chat_push_left_android_cn.webp';
import img_chat_push_left_android_tw from '../assets/img/emotion_fate/tw/img_chat_push_left_android_tw.webp';

import img_chat_push_left_ios_cn from '../assets/img/emotion_fate/cn/img_chat_push_left_ios_cn.webp';
import img_chat_push_left_ios_tw from '../assets/img/emotion_fate/tw/img_chat_push_left_ios_tw.webp';


import lianmai_img_chat_push_left_android_cn from '../assets/img/emotion_voice/cn/lianmai_img_chat_push_left_android_cn.webp';
import lianmai_img_chat_push_left_android_tw from '../assets/img/emotion_voice/tw/lianmai_img_chat_push_left_android_tw.webp';

import lianmai_img_chat_push_left_ios_cn from '../assets/img/emotion_voice/cn/lianmai_img_chat_push_left_ios_cn.webp';
import lianmai_img_chat_push_left_ios_tw from '../assets/img/emotion_voice/tw/lianmai_img_chat_push_left_ios_tw.webp';

import img_chat_push_right_android_cn from '../assets/img/emotion_fate/cn/img_chat_push_right_android_cn.webp';
import img_chat_push_right_android_tw from '../assets/img/emotion_fate/tw/img_chat_push_right_android_tw.webp';












import end_img_chat_push_left_android_cn from '../assets/img/emotion_end/cn/hunyin_img_chat_push_left_android_cn.webp';
import end_img_chat_push_left_android_tw from '../assets/img/emotion_end/tw/hunyin_img_chat_push_left_android_tw.webp';

import end_img_chat_push_left_ios_cn from '../assets/img/emotion_end/cn/hunyin_img_chat_push_left_ios_cn.webp';
import end_img_chat_push_left_ios_tw from '../assets/img/emotion_end/tw/hunyin_img_chat_push_left_ios_tw.webp';

import end_img_chat_push_right_android_cn from '../assets/img/emotion_end/cn/hunyin_img_chat_push_right_android_cn.webp';
import end_img_chat_push_right_android_tw from '../assets/img/emotion_end/tw/hunyin_img_chat_push_right_android_tw.webp';



import chat_icon_message from '../assets/img/emotion_fate/chat_icon_message.webp';


import { Toast } from 'mint-ui';



//h5_marriage

export default {
  name: 'ChatCard',
  props: {
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    },
    visible: {
      type: Boolean,
      default: true,
    },
    transfer_code: {
      type: String,
      default: ''
    },
    sub_type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      lianmai_img_chat_push_left_android_cn,
      lianmai_img_chat_push_left_android_tw,
      lianmai_img_chat_push_left_ios_cn,
      lianmai_img_chat_push_left_ios_tw,
      hunyin_img_chat_push_left_android_cn,
      hunyin_img_chat_push_left_android_tw,
      hunyin_img_chat_push_left_ios_cn,
      hunyin_img_chat_push_left_ios_tw,
      hunyin_img_chat_push_right_android_cn,
      hunyin_img_chat_push_right_android_tw,
      lianmai_img_chat_push_right_android_cn,
      lianmai_img_chat_push_right_android_tw,
      end_img_chat_push_left_android_cn,
      end_img_chat_push_left_android_tw,
      end_img_chat_push_left_ios_cn,
      end_img_chat_push_left_ios_tw,
      end_img_chat_push_right_android_cn,
      end_img_chat_push_right_android_tw,
      img_chat_push_left_android_cn,
      img_chat_push_left_android_tw,
      img_chat_push_left_ios_cn,
      img_chat_push_left_ios_tw,
      img_chat_push_right_android_cn,
      img_chat_push_right_android_tw,
      chat_icon_message,
      hands_show: true,
      hands_hidden: false,
      time: 3,
      timer: null,

    }
  },

  watch: {

  },
  mounted() {

    setTimeout(() => {
      this.init()
    }, 1000);
    setTimeout(() => {
      this.hands_hidden = true
    }, 5000);
  },
  computed: {
    get_tip() {
      if (utils.getLanguage() === 'zh-CN') {
        return `一键跳转咨询老师 (${this.time}s)`
      } else {
        return `一鍵跳轉諮詢老師 (${this.time}s)`
      }
    },
    avatar_url() {
      
      if (utils.getLanguage() === 'zh-CN') {
        if (this.sub_type === 'fu_he' || this.sub_type === 'life_marriages') {
          return hunyin_img_chat_push_right_android_cn
        } else if (this.sub_type === 'yuan_jin') {
          return end_img_chat_push_right_android_cn
        }  else if (this.sub_type === 'zhuan_chang') {
          return lianmai_img_chat_push_right_android_cn
        } else {
          return img_chat_push_right_android_cn
        }
      } else {
        if (this.sub_type === 'fu_he' || this.sub_type === 'life_marriages') {
          return hunyin_img_chat_push_right_android_tw
        } else if (this.sub_type === 'yuan_jin') {
          return end_img_chat_push_right_android_tw
        } else if (this.sub_type === 'zhuan_chang') {
          return lianmai_img_chat_push_right_android_tw
        } else {
          return img_chat_push_right_android_tw
        }
      }

    },
    icon_url() {

      if (utils.getLanguage() === 'zh-CN') {
        if (utils.isIos()) {
          if (this.sub_type === 'fu_he' || this.sub_type === 'life_marriages') {
            return hunyin_img_chat_push_left_ios_cn
          } else if (this.sub_type === 'yuan_jin') {
            return end_img_chat_push_left_ios_cn
          } else if (this.sub_type === 'zhuan_chang') {
            return lianmai_img_chat_push_left_ios_cn
          } else {
            return img_chat_push_left_ios_cn
          }

        } else {
          if (this.sub_type === 'fu_he' || this.sub_type === 'life_marriages') {
            return hunyin_img_chat_push_left_android_cn
          } else if (this.sub_type === 'yuan_jin') {
            return end_img_chat_push_left_android_cn
          } else if (this.sub_type === 'zhuan_chang') {
            return lianmai_img_chat_push_left_android_cn
          } else {
            return img_chat_push_left_android_cn
          }

        }
      } else {
        if (utils.isIos()) {
          if (this.sub_type === 'fu_he' || this.sub_type === 'life_marriages') {
            return hunyin_img_chat_push_left_ios_tw
          } else if (this.sub_type === 'yuan_jin') {
            return end_img_chat_push_left_ios_tw
          } else if (this.sub_type === 'zhuan_chang') {
            return lianmai_img_chat_push_left_ios_tw
          } else {
            return img_chat_push_left_ios_tw
          }
        } else {
          if (this.sub_type === 'fu_he' || this.sub_type === 'life_marriages') {
            return hunyin_img_chat_push_left_android_tw
          } else if (this.sub_type === 'yuan_jin') {
            return end_img_chat_push_left_android_tw
          } else if (this.sub_type === 'zhuan_chang') {
            return lianmai_img_chat_push_left_android_tw
          } else {
            return img_chat_push_left_android_tw
          }
        }
      }
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },

  },
  methods: {
    init() {
      this.timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(this.timer)
        }
      }, 1000);
    },
    handleCopyCode() {
      utils.copyText('mlxz-' + this.transfer_code);
    },
    downClick() {
      this.handleCopyCode();
      if (this.sub_type === 'fu_he') {
        utils.firebaseLogEvent(10013, -10012, 'click_complex_card_result', 'click', {
          channel: utils.getFBChannel(),
        });
      } else if (this.sub_type === 'life_marriages') {
        utils.firebaseLogEvent(10012, -10013, 'click_marriages_card_result', 'click', {
          channel: utils.getFBChannel(),
        });
      } else if (this.sub_type === 'yuan_jin') {
        utils.firebaseLogEvent(10014, -10013, 'click_fate_end_card_result', 'click', {
          channel: utils.getFBChannel(),
        });
      } else if (this.sub_type === 'zhuan_chang') {
        utils.firebaseLogEvent(10016, -10015, 'click_love_voice_card_result', 'click', {
          channel: utils.getFBChannel(),
        });
      } else {
        utils.firebaseLogEvent(10011, -10013, 'click_truelove_result', 'click', {
          channel: utils.getFBChannel(),
        });
      }

      utils.openApp();
    },

  }
}
</script>

<style scoped lang="less">
.chat-card {
  position: fixed;
  z-index: 10;
  top: -3.4rem;
  left: 0.2rem;
  width: 7.1rem;
  height: 3.34rem;
  background: #FFFFFF;
  box-shadow: 0rem 0rem 0.2rem 0rem rgba(99, 86, 52, 0.2);
  border-radius: 0.16rem;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    justify-content: space-between;

    .left {
      width: 2.6rem;
      height: 1.6rem;

      img {
        width: 2.6rem;
        height: 1.6rem;
      }
    }

    .right {
      width: 1.8rem;
      height: 1.6rem;

      img {
        width: 1.8rem;
        height: 1.6rem;
      }
    }

  }

  .btn {
    margin-top: 0.3rem;
    width: 6.5rem;
    height: 0.84rem;
    background: linear-gradient(180deg, #F47553 0%, #E92424 99%);
    border-radius: 0.16rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 0.3rem;
    color: #FFFCF6;
    line-height: 0.44rem;
    text-align: center;
    font-style: normal;

    img {
      width: 0.44rem;
      height: 0.44rem;
      margin-right: 0.12rem;
    }

  }
}

.hands_show {
  animation: show 1s ease-in-out forwards;
}

.hands_hidden {
  animation: hidden 1s ease-in-out forwards;
}

@keyframes show {
  from {
    top: -3.4rem
  }

  to {
    top: 0.2rem;
  }
}

@keyframes hidden {
  from {
    top: 0.2rem
  }

  to {
    top: -3.4rem;
  }
}
</style>
