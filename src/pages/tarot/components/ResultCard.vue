<template>
  <div class="reslut-card">
    <div class="head">
      <img />
      <div class="name-container">
        <div class="name">{{ result.counselor_nickname }}</div>
        <div class="num">好评率：99%</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="content">
      {{ result.answer }}
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils';
import cn_taluo_img_xiazai from '../../../assets/img/tarot/cn/taluo_img_xiazai.webp';
import tw_taluo_img_xiazai from '../../../assets/img/tarot/tw/taluo_img_xiazai.webp';

export default {
  components: {},
  name: 'ResultCard',
  props: {

    result: {
      type: Object,
      default: () => {},
    },


  },
  components: {
  },

  data() {
    return {
      cn_taluo_img_xiazai,
      tw_taluo_img_xiazai,
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {},
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less">
.reslut-card {
  width: 7.02rem;
  // height: 4.55rem;
  // padding-top: 0.24rem;
  padding-bottom: 0.24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0.24rem;
  padding-right: 0.24rem;
  background: #1E0A2D;
  border-radius: 0.16rem;

  .head {
    height: 1.48rem;

    width: 7.02rem;
    background-image: url(../../../assets/img/tarot/huifu_img_bj_right.webp);
    background-size: 7.02rem 1.48rem;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 1rem;
      border: 1px solid red;
    }

    .name-container {
      width: 3rem;
      height: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.2rem;

      .name {
        font-weight: 600;
        font-size: 0.32rem;
        color: #FFFFFF;
        line-height: 0.48rem;
      }

      .num {
        font-weight: 400;
        font-size: 0.26rem;
        color: #FFC736;
        line-height: 0.39rem;
      }
    }
  }

  .line {
    width: 6.54rem;
    height: 0.01rem;
    background: #FFFFFF;
    opacity: 0.1;
  }
  .content {
    font-weight: 400;
    font-size: 0.28rem;
    color: #FFFFFF;
    line-height: 0.42rem;
    margin-top: 0.2rem;
  }
}
</style>
