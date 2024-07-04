<template>
  <img :style="{
    marginBottom: product_key === 'h5_marriage' ? '0.2rem' : '0',
    width: '6.26rem', display: 'flex', alignSelf: 'center'
  }" :src="product_key === 'h5_marriage' ? btn_url_marriage : btn_url" @click="callback()" />
</template>
<script>
import utils from '../libs/utils';
//h5_emotion2024
// import cn_h5_emotion2024 from '../assets/img/emotion_v2/new/cn/pay.webp';
// import tw_h5_emotion2024 from '../assets/img/emotion_v2/new/tw/pay.webp';
// import cn_h5_emotion2024_xs from '../assets/img/emotion_v2/new/cn/pay_xs.webp';
// import tw_h5_emotion2024_xs from '../assets/img/emotion_v2/new/tw/pay_xs.webp';

import cn_home_btn1 from '../assets/img/emotion_v2/new/cn/btn.webp';
import tw_home_btn1 from '../assets/img/emotion_v2/new/tw/btn.webp';
import cn_home_btn from '../assets/img/emotion_v2/new/cn/pay.webp';
import tw_home_btn from '../assets/img/emotion_v2/new/tw/pay.webp';
import cn_home_xs_btn from '../assets/img/emotion_v2/new/cn/pay_xs.webp';
import tw_home_xs_btn from '../assets/img/emotion_v2/new/tw/pay_xs.webp';
//h5_marriage
import tw_h5_marriage from '../assets/img/bzhh_v2/tw/img_btn.webp';
import cn_h5_marriage from '../assets/img/bzhh_v2/cn/img_btn.webp';
export default {
  name: 'PayBtn',
  data() {
    return {
      cn_home_btn1,
      tw_home_btn1,
      cn_home_btn,
      tw_home_btn,
      cn_home_xs_btn,
      tw_home_xs_btn,

    }
  },
  props: {
    callback: {
      type: Function,
      default: function () { }
    },
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    }
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    channel1() {
      return ["enjoy01", "panda01"].includes(utils.getFBChannel());
    },
    channel2() {
      return ["enjoy02", "panda02"].includes(utils.getFBChannel());
    },
    channel3() {
      return ["enjoy03", "panda03", "enjoy05"].includes(utils.getFBChannel());
    },
    btn_url() {
      if (utils.getLanguage() === 'zh-CN') {
        if (this.channel1) {
          return cn_home_btn;
        } else if (this.channel2) {
          return cn_home_xs_btn;
        } else if (this.channel3) {
          return cn_home_btn1;
        }
      } else {
        if (this.channel1) {
          return tw_home_btn;
        } else if (this.channel2) {
          return tw_home_xs_btn;
        } else if (this.channel3) {
          return tw_home_btn1;
        }
      }
    },
    btn_url_marriage() {
      if (utils.getLanguage() === 'zh-CN') {
        return cn_h5_marriage;
      } else {
        return tw_h5_marriage;
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
