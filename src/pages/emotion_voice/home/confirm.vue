<template>

  <van-dialog v-model:show="show" :showConfirmButton=false closeOnClickOverlay>
    <div class="confirm-modal">
      <div class="modal-container">
        <img class="icon" src="../../../assets/img/emotion_voice/home_img_window_mic.webp" />
        <div class="title">{{ is_cn? '点击进入连麦间': '點擊進入連麥間' }}</div>
        <div class="content">{{ is_cn? '这里可以放心倾诉，聆听你的故事': '這裏可以放心傾訴，聆聽你的故事' }}</div>
        <div class="btn" @click="playVoice">{{ is_cn? '立即进入': '立即進入' }}</div>
      </div>
    </div>
  </van-dialog>


</template>
<script>
import utils from '../../../libs/utils.js';

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {

  },
  data() {
    return {
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {

    show(val) {
      if (!val) {
        // this.$emit('close-confirm')
      }
    },

  },
  created() {
  },
  mounted() {

  },
  methods: {
    playVoice() {
      this.$emit('close-confirm')
    }
  },
};
</script>
<style scoped lang="less">
.confirm-modal {
  width: 5.7rem;
  height: 5.33rem;
  padding-top: 1rem;

  .modal-container {
    width: 5.6rem;
    height: 4.33rem;
    background: url('../../../assets/img/emotion_voice/home_img_window_bj.webp') no-repeat;
    background-size: 5.7rem 2.4rem;
    background-color: #FFFFFF;
    background-position: -0.06rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 0.4rem;

    .icon {
      position: absolute;
      left: 1.65rem;
      top: 0rem;
      width: 2.4rem;
      height: 2.4rem;
    }

    .title {
      font-weight: 500;
      font-size: 0.34rem;
      color: #07060F;
      line-height: 0.51rem;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-top: 1rem;
    }

    .content {
      font-weight: 400;
      font-size: 0.28rem;
      color: #9196A5;
      line-height: 0.42rem;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-top: 0.12rem;
    }

    .btn {
      width: 4.2rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #FB4C92 0%, #FF5A4F 100%);
      border-radius: 0.48rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 0.3rem;
      color: #FFFFFF;
      line-height: 0.3rem;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-top: 0.4rem;
    }
  }
}

.van-dialog {
  background-color: transparent !important;
  display: flex;
  justify-content: center;
}
</style>
