<template>
  <div :class="['tarot-detail']">
    <div v-if="is_show_tarot_notice">
      <TarotNotice :show_btn="true" />
    </div>
    <PayGuideModal v-if="showPayGuideModal" @show_modal="showModal" />
    <div class="q-container" style="margin-top: 0.2rem;">
      <img class="q-img" src="../../../assets/img/tarot/taluo_img_xing.webp" />
      <div class="q-title">{{ is_cn ? '我的提问' : '我的提問' }}</div>
    </div>

    <div class="question-container">
      <!-- <div class="title-container">
       
      </div> -->
      <CardList :card_list="card_list" :is_async="1" />
      <div class="question-text">{{ result_data && result_data.question }}</div>
    </div>

    <div class="q-container" style="margin-top: 0.4rem;">
      <img class="q-img" src="../../../assets/img/tarot/taluo_img_xing.webp" />
      <div class="q-title">{{ is_cn ? '真人塔罗师回复' : '真人塔羅師回復' }}</div>
    </div>

    <div v-if="result_data && result_data.answer_list[0] && result_data.answer_list[0].answer_status">
      <ResultCard :result="result_data.answer_list[0]" />
    </div>
    <div class="a-loading-container" v-else>
      <img class="wait-img" src="../../../assets/img/tarot/dayi_img_wait.webp" />
      <span>{{ is_cn ? '真人塔罗占卜师正在思考您的问题' : '真人塔羅占卜師正在思考您的問題' }}</span>
    </div>

    <FixDowonLoad />
    <Overlay :show="show_email" />
    <EmailInfoCard v-if="show_email" @hidden_modal="hidden_modal" />

  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { Overlay } from 'vant';
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
import { tarotQuestionsDetailAPI, tarotVisitorAPI, checkSendEventApi, resultTarotCheckAPI, sendTarotEventApi } from '../../../api/api';


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

  },



  async mounted() {
    let report_status = utils.getQueryStr('status');
    this.order_id = this.$route.query.order_id;
    window.scrollTo(0, 0);
    utils.firebaseLogEvent(
      '10010',
      '-10015',
      'page_view_tarot_result',
      'page_view',
      {
        args_name: 'page_view_tarot_result',
        channel: utils.getFBChannel(),
      }
    );
    Indicator.open(this.$t('result-check'));
    // 上报支付结果埋点  start
    let check_result = await this.checkWithTimeout();
    if (check_result !== null) {
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '已经获取了是否上报埋点的状态',
        mlxz_attribution_status: check_result.data.status,
      });
      if (check_result.data && check_result.data.status) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '准备执行上报埋点',
          mlxz_check_status: check_result.data.status,
        });
        this.handleSendEvent();

      }
    }
    // end
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '开始验单',
    });
    await this.checkResult();
    this.goToPayPage();
    if (!report_status || report_status === 'SUCCESS' || report_status === 'PAYED') {

      this.query();
      this.getEmailInfo();
    }

  },
  methods: {

    goToPayPage() {
      Indicator.close();
      let report_status = utils.getQueryStr('status');
      console.log('report_status', report_status)

      if ((report_status !== 'SUCCESS' && report_status !== 'PAYED')) {
        if (!report_status) return
        this.$router.push({
          path: 'detail',
          query: { product_key: 'master_tarot' },
        });
      }
    },
    async sendEvent() {

      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '开始调用接口，通知已上报',
      });
      const res = await sendTarotEventApi({ order_id: this.order_id });
      if (res.status === 1000) {

        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '已通知已上报',
          mlxz_attribution_status: res.status,
          mlxz_attribution_desc: res.desc,
        });
      }
    },

    /**
     * @description: 查询结果数据
     * @return {*}
     */
    query() {

      tarotQuestionsDetailAPI({ order_id: this.$route.query.order_id }).then(res => {
        if (res.status === 1000) {
          this.card_list = res.data.tarot.items;
          console.log('this.card_list', this.card_list)
          this.result_data = res.data;
          Indicator.close();
        }
      });
    },

    /**
     * @description: 校验支付结果
     * @return {*}
     */
    async checkResult() {
      let data = {
        order_id: this.$route.query.order_id,
        pkg: "''",
        receipt: '',
        transaction_id: '',
        version_name: '',
      };
      await resultTarotCheckAPI(data);
    },

    /**
     * @description: 完成上报埋点
     * @return {*}
     */
    async handleSendEvent() {
      let report_price = +utils.getQueryStr('report_price');
      let report_status = utils.getQueryStr('status');
      let currency_type = utils.getQueryStr('currency_type');
      let repay = +utils.getQueryStr('repay');

      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '准备上报埋点，获取订单状态',
        mlxz_order_status: report_status,
      });
      if (report_status === 'SUCCESS' || report_status === 'PAYED') {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始上报firebase埋点',
          mlxz_order_status: report_status,
        });

        if (repay) {
          utils.firebaseLogEvent(
            '10010',
            '-10021',
            'event_status_tarothistory_pay_success',
            'event_status',
            {
              args_name: 'event_status_tarothistory_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        } else {
          utils.firebaseLogEvent(
            '10010',
            '-10013',
            'event_status_tarotpay_success',
            'event_status',
            {
              args_name: 'event_status_tarotpay_success',
              channel: utils.getFBChannel(),
            }
          );
        }



        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成firebase埋点上报',
          mlxz_order_status: report_status,
        });
        console.log('Purchase事件上报', this.order_id)
        if (utils.isProd()) {
          await utils.checkFB();
          try {
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: '开始上报FB埋点，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: currency_type,
              mlxz_order_status: report_status,
            });
            fbq('track', 'Purchase', {
              value: report_price.toFixed(2),
              currency: currency_type,
            }, { eventID: this.order_id });
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: '完成FB埋点上报，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: currency_type,
              mlxz_order_status: report_status,
            });
          } catch (err) {
            console.error('error message:', err);
          }
        }
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成埋点上报，开始与接口通信，通知完成上报',
        });
        this.sendEvent();
      } else {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始上报埋点',
          mlxz_order_status: report_status,
        });


        utils.firebaseLogEvent(
          '10010',
          '-10014',
          'event_status_tarotpay_fail',
          'event_status',
          {
            args_name: 'event_status_tarotpay_fail',
            channel: utils.getFBChannel(),
          }
        );
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成上报埋点',
          mlxz_order_status: report_status,
        });
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成埋点上报，开始与接口通信，通知完成上报',
        });
        this.sendEvent();
      }
    },
    /**
    * @description: 校验是否上报埋点
    * @return {*}
    */
    async checkWithTimeout() {
      try {
        const result = await Promise.race([
          checkSendEventApi({ order_id: this.order_id }),
          new Promise((resolve, reject) => {
            setTimeout(() => resolve(null), 6000);
          }),
        ]);

        if (result !== null) {
          // 如果有返回数据，则直接返回
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: '已校验是否上报埋点',
            mlxz_check_result_status: result.data.status,
          });
          return result;
        } else {
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: '接口超时，重新调用校验上报埋点接口',
          });
          // 等待 6 秒后再次调用 checkSendEventApi
          const retryResult = await checkSendEventApi({
            order_id: this.order_id,
          });
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: '接口超时，完成重试调用上报埋点接口',
          });
          return retryResult;
        }
      } catch (error) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '接口报错，停止校验',
        });
        throw error;
      }
    },
    hidden_modal() {
      this.show_email = false
    },
    async getEmailInfo() {
      let report_status = utils.getQueryStr('status');
      let res = await tarotVisitorAPI();
      if (res.status === 1000) {
        if (!res.data.email) {
          if (report_status) {
            if (['PAYED', 'SUCCESS'].includes(report_status)) {
              this.show_email = true
            }
          } else {
            this.show_email = true
          }
        }
      }
      console.log('res', res)
    },
    showModal() {
      this.showPayGuideModal = !this.showPayGuideModal;
    },
    async getData() {
      let res = await tarotQuestionsDetailAPI({ order_id: this.order_id })
      if (res.status === 1000) {
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
  overflow-y: scroll;
  // min-height: 100%;
  flex-direction: column;
  align-items: center;

  .q-container {
    display: flex;
    color: #FFFFFF;
    align-items: center;
    width: 100%;
    margin-bottom: 0.15rem;
    padding-left: 0.08rem;

    .q-img {
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
    // padding: 0.24rem;
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
