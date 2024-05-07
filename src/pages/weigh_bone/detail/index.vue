<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-06 17:21:55
 * @Description: 袁天罡称骨 支付页
-->
<template>
  <div class="detail">
    <userInfo
      :user_detail="query_user_string"
      :product_key="product_key"
      :query_user_string="query_user_string"
      @logEvent="logEventFun"
    />
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
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
export default {
  components: {
    PayCard,
    footerBanner,
    userInfo,
  },
  data() {
    return {
      product_id: 33,
      product_key: 'h5_weigh_bone',
      query_user_string: '',
      showBottomBtn: false,
    };
  },
  computed: {
    is_in_app() {
      return utils.isInApp();
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
    if (this.is_in_app) {
      utils.payStatusAdjust('page_view_pay', 'hevtih', '');
    } else {
      window.Adjust &&
        window.Adjust.trackEvent({
          eventToken: 'ty18p4',
        });
    }
    utils.firebaseLogEvent('20002', '-10001', 'page_view_pay', 'page_view', {
      args_name: 'page_view_pay',
      report_id: '60002',
      channel: utils.getFBChannel(),
    });

    this.query_user_string = this.$route.query.querystring;
  },
  methods: {
    /**
     * @description: 埋点上报
     * @return {*}
     */
    logEventFun() {
      if (this.is_in_app) {
        utils.payStatusAdjust('click_report_choice', 'wp0pby', '');
      } else {
        window.Adjust &&
          window.Adjust.trackEvent({
            eventToken: 'e8qywf',
          });
      }
    },
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
    background-image: url('../../../assets/img/mlxz/weigh_bone/img_mokuai_bg.png');
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
