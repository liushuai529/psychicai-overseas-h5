<template>
  <div class="fb-share-notice">
    <div class="btn-container" v-if="show_btn" @click="goToHome">
      <img :src="home_icon"/>
      <span>{{ is_cn ? '首页' : '首頁' }}</span>
    </div>
    <div>{{ is_cn ? '真人塔罗占卜师答疑解惑' : '真人塔羅占卜師答疑解惑' }}</div>


  </div>
</template>
<script>
import utils from '../libs/utils';
import home_icon from '../assets/img/tarot/taluo_icon_home.webp'
const lang = utils.getLanguage();

export default {
  name: 'TarotNotice',
  props: {
    show_btn: {
      type: Boolean,
      default: false,
    },
    transfer_code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      lang,
      home_icon,
    }
  },

  watch: {

  },
  mounted() {

  },
  computed: {

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },

  },
  methods: {
    goToHome() {
      this.$router.push({
        path: 'home',
      });
    },
  }
}
</script>

<style scoped lang="less">
.fb-share-notice {
  width: 7.5rem;
  height: 0.88rem;
  min-width: 0.88rem;
  background: #1E0A2D;
  // opacity: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.34rem;
  color: #FFFFFF;
  line-height: 0.48rem;
  font-style: normal;
  position: relative;

  .btn-container {
    position: absolute;
    left: 0.3rem;
    // top: 0.22rem;
    height: 0.44rem;
    width: 1.1rem;
    display: flex;
    align-items: center;

    img {
      width: 0.44rem;
      height: 0.44rem;
    }

    span {
      font-weight: 400;
      font-size: 0.26rem;
      color: #FFFFFF;
      line-height: 0.26rem;
      text-align: center;
      font-style: normal;
    }
  }

}
</style>
