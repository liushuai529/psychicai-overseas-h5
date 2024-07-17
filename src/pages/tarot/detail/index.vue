<template>
  <div :class="['tarot-detail']">
    <FbShareNotice v-if="is_show_fb_notice"/>
    <PayGuideModal v-if="showPayGuideModal" @show_modal="showModal"/> 
    <CardList  style="margin-top: 0.5rem;"/>
    <div class="question-container">
      <div class="title-container">
        <div class="q-container">
          <img class="q-img" src="../../../assets/img/tarot/taluo_img_xing.webp" />
          <div class="q-title">你的问题</div>
        </div>
        <div class="a-container">{{ question }}</div>
      </div>
    </div>
    <img class="img-desc" :src="is_cn? cn_taluo_img_jieda: tw_taluo_img_jieda"/>
    <TarotPayItem product_key="master_tarot" @show_modal="showModal" :show_pay_guide_modal="showPayGuideModal"/>
    <TarotPayDetail
      ref="payDetail"
      product_key="master_tarot"
      e_view_id="10006"
      c_view_id="-10005"
      e_view_name="view_2024lovely_pay"
      a_view_token="184kba"
      c_click_id="-10006"
      e_click_name="click_2024lovely_pay"
      a_click_token="2rov44"
    />
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { Downloader, Parser, Player } from 'svga.lite';
import utils from '../../../libs/utils';
import CardList from '../components/CardList.vue';
import TarotPayDetail from '../../../components/TarotPayDetail.vue';
import TarotPayItem from '../../../components/TarotPayItem.vue';
import FbShareNotice from '../../../components/FbShareNotice.vue';
import PayGuideModal from '../../../components/PayGuideModal.vue';
import cn_taluo_img_jieda from '../../../assets/img/tarot/cn/taluo_img_jieda.webp';
import tw_taluo_img_jieda from '../../../assets/img/tarot/tw/taluo_img_jieda.webp';
import BaziTable from '../../../components/baziTable.vue';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import payModal from '../../../components/PayModal.vue';


import { report_id_arr } from '../../../libs/enum';


export default {
  components: { CardList, TarotPayDetail, TarotPayItem, FbShareNotice, PayGuideModal },

  data() {
    return {
      cn_taluo_img_jieda,
      tw_taluo_img_jieda,
      showPayGuideModal: false,//待支付蒙版  
      question:'',
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    is_show_fb_notice() {
      return utils.isFBContainer();
    },
  },
  watch: {

  },
  async created() {
    this.question = localStorage.getItem('question')|| ''
  },

  mounted() {

  },
  methods: {
    showModal() {
      this.showPayGuideModal = !this.showPayGuideModal;
    },

  },
};
</script>

<style scoped lang="less">
.tarot-detail {
  // background: #0F031A;
  background: rgba(30, 10, 45, 1);
  width: 7.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .question-container {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    width: 100%;

    .title-container {
      display: flex;
      // align-items: center;
      flex-direction: column;
      padding-left: 0.24rem;
      .q-container {
        display: flex;
        align-items: center;
        q-img {
          width: 0.48rem;
          height: 0.5rem;
        }

        .q-title {
          font-weight: 600;
          font-size: 0.36rem;
          color: #FFFFFF;
          line-height: 0.54rem;
        }
      }

      .a-container {
        width: 7.02rem;
        height: 1.2rem;
        background: #201A2F;
        border-radius: 0.16rem;
        display: flex;
        font-weight: 400;
        font-size: 0.3rem;
        color: #FFFFFF;
        line-height: 0.3rem;
        align-items: center;
        padding: 0.24rem;
      }

    }
  }
  .img-desc {
    width: 7.02rem;
    height: 0.68rem;
    object-fit: contain;
    margin-top: 0.3rem;
  }
}
</style>
