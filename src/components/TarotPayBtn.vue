<template>
  <div class="tarot-pay-btn-container">
    <div class="tarot-pay-btn" @click="callback()">
      {{ btn_text }}
    </div>
  </div>
</template>
<script>
import utils from '../libs/utils';

export default {
  name: 'TarotPayBtn',
  data() {
    return {
    }
  },
  props: {
    callback: {
      type: Function,
      default: function () { }
    },
    btn_text: {
      type: String,
      default: ''
    }
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
.tarot-pay-btn-container {
  width: 7.5rem;
  height: 1.26rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0.5rem;
  z-index: 5;
  background: #1E0A2D;

  .tarot-pay-btn {
    width: 5.72rem;
    height: 0.94rem;
    background: url('../assets/img/tarot/taluo_btn_zixun_empty.webp');
    background-size: 5.72rem 0.94rem;
    background-repeat: no-repeat;
    font-weight: 600;
    font-size: 0.32rem;
    color: #FFFFFF;
    line-height: 0.32rem;
    display: flex;
    justify-content: center;
    align-items: center;

  }
}
</style>
