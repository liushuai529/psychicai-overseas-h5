<template>
  <img class="btn" src="../assets/img/emotion_fate/img_home_btu_chakan.webp" @click="callback()" />
</template>
<script>
import utils from '../libs/utils';
//h5_emotion2024
// import cn_h5_emotion2024 from '../assets/img/emotion_v2/new/cn/pay.webp';
// import tw_h5_emotion2024 from '../assets/img/emotion_v2/new/tw/pay.webp';
// import cn_h5_emotion2024_xs from '../assets/img/emotion_v2/new/cn/pay_xs.webp';
// import tw_h5_emotion2024_xs from '../assets/img/emotion_v2/new/tw/pay_xs.webp';


export default {
  name: 'PayBtn',
  data() {
    return {
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
   
  }
}
</script>

<style scoped lang="less">
  .btn {
    width: 5.9rem;
    height: 0.9rem;
    margin-bottom: 0.2rem;
  }
</style>
