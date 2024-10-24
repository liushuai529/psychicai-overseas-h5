<template>
  <img class="btn emo-btn1" src="../assets/img/emotion_fate/img_home_btu_chakan.webp" @click="callback()" />
</template>
<script>
import utils from '../libs/utils';


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
    margin: auto;
    // margin-bottom: 0.2rem;
    margin-top: 0.1rem;
  }
  @keyframes emoBtn {
  0% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1.1);
  }
}

.emo-btn {
  animation: emoBtn 1s infinite ease-in-out alternate;
}
</style>
