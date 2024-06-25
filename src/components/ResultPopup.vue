<template>
  <div class="result-popup" :style="{'background': getbgStyle}" v-show="show_modal">
    <div class="result-container">
      <div class="head">
        <div class="title">尊敬的用户您好：</div>
        <div>您的【报告名称】已生成，为了保障您的隐私，
          全部报告请在【命理寻真】App中查看。</div>
      </div>
      <div class="copy-container">
        <div class="left">识别码：HJGE7HJ64JLSUF6S</div>
        <div class="right">复制</div>
      </div>
      <div class="tip">
        <div>复制识别码，打开命理寻真App即可查看；</div>
        <div>识别码可在我的——我的报告中查看。</div>
      </div>
      <img class="logo" :src="is_cn? cn_img_popovers_logo: tw_img_popovers_logo"/>
      <div class="btn" @click="downClick">立即下载</div>
    </div>
  </div>
</template>
<script>
import utils from '../libs/utils';
//h5_emotion2024

import cn_img_popovers_logo from '../assets/img/components/result_popup/cn/img_popovers_logo.webp';
import tw_img_popovers_logo from '../assets/img/components/result_popup/tw/img_popovers_logo_tw.webp';

//h5_marriage

export default {
  name: 'ResultPopup',
  props: {
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    },
    visible: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      show_modal: false,
      cn_img_popovers_logo,
      tw_img_popovers_logo,
      bg_style: {
        h5_wealth2024: 'linear-gradient( 180deg, rgba(208,61,61,0) 0%, #D03D3D 100%)', // 2024年财运
        h5_annual2024: 'linear-gradient( 180deg, rgba(255,170,65,0) 0%, #FFAA41 100%)', // 2024年年运
        h5_weigh_bone: 'linear-gradient( 180deg, rgba(81,95,173,0) 0%, #515FAD 100%)', // 袁天罡秤骨
        h5_bai_gua: 'linear-gradient( 180deg, rgba(164,51,30,0) 0%, #A4331E 100%)', // 鬼谷子
        h5_emotion2024: 'linear-gradient( 180deg, rgba(236,67,107,0) 0%, #EC436B 100%)', // 2024年爱情运势
        h5_marriage: 'linear-gradient( 180deg, rgba(127,20,22,0) 0%, #7F1416 100%)',
        h5_career2024: 'linear-gradient( 180deg, rgba(222,36,46,0) 0%, #DE242E 100%)', // 2024年事业运势
      }
    }
  },
 
  watch: {
   
    visible(val) {
      this.show_modal = val;
    },
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    getbgStyle() {
      return this.bg_style[this.product_key]
    },
   },
   methods: {
    downClick() {
      this.$emit('update-visible', false);
    }
   }
}
</script>

<style scoped lang="less">
.result-popup {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 7.5rem;
  height: 9.43rem;
  display: flex;
  justify-content: center;
  .result-container {
    width: 7.1rem;
    background: linear-gradient(180deg, #D3F2E5 0%, #FFFFFF 100%);
    border-radius: 0.4rem;
    margin-top: 2.4rem;
    margin-bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.4rem;
    .head {
      width: 100%;
      height: 1.88rem;
      background-image: url(../assets/img/components/result_popup/img_popovers_topbj.webp);
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: center;
      font-weight: 400;
      font-size: 0.3rem;
      color: #314A46;
      text-align: left;
      font-style: normal;
      overflow-y: hidden;
      .title {
        font-weight: 500;
        font-size: 0.36rem;
        color: #314A46;
      }
    }

    .copy-container {
      width: 6.3rem;
      height: 0.84rem;
      background: #EAF0EE;
      border-radius: 0.16rem;
      margin-top: 0.08rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.2rem;
      padding-right: 0.2rem;

      .left {
        font-weight: 600;
        font-size: 0.28rem;
        color: #E8302E;
        text-align: left;
        font-style: normal;
      }

      .right {
        width: 0.72rem;
        height: 0.44rem;
        border-radius: 0.12rem;
        border: 0.01rem solid #314A46;
        font-weight: 600;
        font-size: 0.24rem;
        color: #314A46;
        text-align: left;
        font-style: normal;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .tip {
      width: 6.3rem;
      font-weight: 400;
      font-size: 0.26rem;
      color: #314A46;
      font-style: normal;
      margin-top: 0.3rem;
    }
    .logo {
      margin-top: 0.4rem;
      width: 6.3rem;
      height: 0.94rem;
    }
    .btn {
      width: 6.3rem;
      height: 0.9rem;
      background: linear-gradient( 180deg, #F47553 0%, #E92424 99%);
      border-radius: 0.16rem;
      border: 0.02rem solid #FFD192;
      margin-top: 0.4rem;
      font-weight: 600;
      font-size: 0.32rem;
      color: #FEF8EB;
      font-style: normal;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

}
</style>
