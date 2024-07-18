<template>
  <div :class="['tarot-detail']">
    <TarotNotice v-if="is_show_tarot_notice" />
    <PayGuideModal v-if="showPayGuideModal" @show_modal="showModal" />
    <div class="q-container">
      <img class="q-img" src="../../../assets/img/tarot/taluo_img_xing.webp" />
      <div class="q-title">{{ is_cn ? '我的提问' : '我的提問' }}</div>
    </div>

    <div class="question-container">
      <!-- <div class="title-container">
       
      </div> -->
      <CardList :card_list="card_list" :is_async="1"/>
      <div class="question-text">{{ result_data &&result_data.question }}</div>
    </div>

    <div class="q-container">
      <img class="q-img" src="../../../assets/img/tarot/taluo_img_xing.webp" />
      <div class="q-title">{{ is_cn ? '真人塔罗师回复' : '真人塔羅師回復' }}</div>
    </div>
    
    <div v-if="result_data&& result_data.answer_list[0].answer_status">
      <ResultCard :result="result_data.answer_list[0]"/>
    </div>
    <div class="a-loading-container" v-else>
      <img class="wait-img" src="../../../assets/img/tarot/dayi_img_wait.webp"/>
      <span>{{is_cn?'真人塔罗占卜师正在思考您的问题': '真人塔羅占蔔師正在思考您的問題' }}</span>
    </div>

    <FixDowonLoad/>
    <Overlay :show="show_email" />
    <EmailInfoCard v-if="show_email" @hidden_modal="hidden_modal"/>

  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { Overlay } from 'vant';
import { Downloader, Parser, Player } from 'svga.lite';
import utils from '../../../libs/utils';
import CardList from '../components/CardList.vue';
import FixDowonLoad from '../components/FixDowonLoad.vue';
import EmailInfoCard from '../components/EmailInfoCard.vue';
import ResultCard from '../components/ResultCard.vue';
import TarotPayDetail from '../../../components/TarotPayDetail.vue';
import TarotPayItem from '../../../components/TarotPayItem.vue';
import TarotNotice from '../../../components/TarotNotice.vue';
import PayGuideModal from '../../../components/PayGuideModal.vue';
import cn_taluo_img_jieda from '../../../assets/img/tarot/cn/taluo_img_jieda.webp';
import tw_taluo_img_jieda from '../../../assets/img/tarot/tw/taluo_img_jieda.webp';
import BaziTable from '../../../components/baziTable.vue';
import { tarotQuestionsDetailAPI, tarotVisitorAPI } from '../../../api/api';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import payModal from '../../../components/PayModal.vue';


import { report_id_arr } from '../../../libs/enum';


export default {
  components: { CardList, TarotPayDetail, TarotPayItem, TarotNotice, PayGuideModal, FixDowonLoad, Overlay, EmailInfoCard, ResultCard },
  

  data() {
    return {
      cn_taluo_img_jieda,
      tw_taluo_img_jieda,
      is_loading: false,
      showPayGuideModal: false,//待支付蒙版  
      order_id: '',
      card_list: [],
      result_data: null,//答疑订单返回数据
      show_email: false,
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    is_show_tarot_notice() {
      return true;
      return utils.isFBContainer();
    },
  },
  watch: {

  },
  async created() {
    this.order_id = this.$route.query.order_id;
    this.getData()
    this.getEmailInfo();
  },

  

  mounted() {

  },
  methods: {
    hidden_modal() {
      this.show_email = false
    },
    async getEmailInfo() {
      let res = await tarotVisitorAPI();
      if(res.status === 1000) {
        if(!res.data.email) {
          this.show_email = true
        }
      }
      console.log('res', res)
    },
    showModal() {
      this.showPayGuideModal = !this.showPayGuideModal;
    },
    async getData() {
      let res = await tarotQuestionsDetailAPI({order_id: this.order_id})
      if(res.status === 1000) {
        this.card_list = res.data.tarot.items;
        console.log('this.card_list', this.card_list)
        this.result_data = res.data;
      }
      console.log('res', res)
    }

  },
};
</script>

<style scoped lang="less">
.van-overlay {
  z-index: 2;
}
.tarot-detail {
  background: #0F031A;
  width: 7.5rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;

  .q-container {
    display: flex;
    color: #FFFFFF;
    align-items: center;
    width: 100%;

    q-img {
      width: 0.48rem;
      height: 0.5rem;
    }

    .q-title {
      font-weight: 600;
      font-size: 0.36rem;
      // color: #FFFFFF;
      line-height: 0.54rem;
    }
  }

  .question-container {
    // margin-top: 0.2rem;
    width: 7.02rem;
    // margin-left: 0.24rem;
    // margin-right: 0.24rem;
    background: #201A2F;
    border-radius: 0.16rem;
    display: flex;
    flex-direction: column;
    padding: 0.24rem;
    // width: 100%;

    .question-text {
      font-weight: 400;
      font-size: 0.28rem;
      color: #FFFFFF;
      line-height: 0.42rem;
      margin-top: 0.24rem;
    }
  }
  .a-loading-container {
    width: 7.02rem;
    height: 4.12rem;
    background: #201A2F;
    border-radius: 0.16rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 0.28rem;
    color: #FFFFFF;
    line-height: 0.42rem;
    img {
      width: 2.6rem;
      height: 2.6rem;
      margin-bottom: 0.3rem;
    }
  }

  
}
</style>
