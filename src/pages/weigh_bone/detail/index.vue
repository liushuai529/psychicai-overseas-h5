<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-28 14:30:24
 * @Description: 袁天罡称骨 支付页
-->
<template>
  <div class="detail">
    <FbShareNotice v-if="is_show_fb_notice"/>
    <PayGuideModal v-if="showPayGuideModal" @show_modal="showModal"/> 
    <userInfo
      :user_detail="query_user_string"
      :product_key="product_key"
      :query_user_string="query_user_string"
      @logEvent="logEventFun"
    />
    <PayItem product_key="h5_weigh_bone" @show_modal="showModal"/>
    <!-- <div class="pay-box">
      <div style="padding: 0 0.2rem">
        <PayCard
          ref="paycard"
          :type="product_id"
          :product_key="product_key"
          :query_user_string="query_user_string"
          back_url="weigh_bone"
          lucky_re_id="60002"
        ></PayCard>
      </div>
    </div> -->
    <footerBanner />
  </div>
</template>

<script>
import PayCard from '../../../components/PayCard.vue';
import utils from '../../../libs/utils';
import footerBanner from '../home/footer';
import userInfo from './userInfo.vue';
import FbShareNotice from '../../../components/FbShareNotice.vue';
import PayItem from '../../../components/PayItem.vue';
import PayGuideModal from '../../../components/PayGuideModal.vue';

import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
export default {
  components: {
    PayCard,
    footerBanner,
    userInfo,
    FbShareNotice,
    PayItem,
    PayGuideModal,
  },
  data() {
    return {
      product_id: 33,
      product_key: 'h5_weigh_bone',
      query_user_string: '',
      showBottomBtn: false,
      showPayGuideModal: false,//待支付蒙版  
    };
  },
  computed: {
    is_show_fb_notice() {
      return utils.isFBContainer() && utils.getFBChannel().indexOf('02')>-1;
    },
  },
  
  mounted() {
    window.scrollTo(0, 0);
    let screenH = window.screen.height;
    window.onscroll = () => {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > screenH * 0.6) {
        this.showBottomBtn = true;
      } else {
        this.showBottomBtn = false;
      }
    };
  },
  created() {
    utils.firebaseLogEvent(
      '10009',
      '-10003',
      'page_view_chenggu_mid',
      'page_view',
      {
        args_name: 'page_view_chenggu_mid',
        channel: utils.getFBChannel(),
      }
    );

    this.query_user_string = this.$route.query.querystring;
  },
  methods: {
    showModal() {
      this.showPayGuideModal = !this.showPayGuideModal;
    },
    /**
     * @description: 埋点上报
     * @return {*}
     */
    logEventFun() {},
  },
};
</script>

<style scoped lang="less">
.detail {
  width: 7.5rem;
  min-height: 100vh;
  background: #515fad;
  display: flex;
  flex-direction: column;
  align-items: center;

  .pay-box {
    box-sizing: border-box;
    width: 7.1rem;
    min-height: 5.9rem;
    border-radius: 0.2rem;
    background-image: url('../../../assets/img/mlxz/weigh_bone/img_mokuai_bg.webp');
    background-color: #37438a;
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 0.2rem;
  }

  .text {
    width: 6.74rem;
    margin-bottom: 0.25rem;
  }

  .module {
    width: 7.02rem;
    margin-bottom: 0.24rem;
  }

  .fixed-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.35rem;
    text-align: center;
    background-color: #dba267;
    display: flex;
    justify-content: center;
    img {
      width: 5.98rem;
      height: 1.41rem;
      margin-top: 0.18rem;
    }
  }
}
</style>
