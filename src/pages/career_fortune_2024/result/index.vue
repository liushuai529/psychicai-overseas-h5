<template>
  <div :class="['detail', 'result-detail', show_pop_modal? 'hidden-scroll': '']">
    <ResultPopup product_key="h5_emotion2024" @change_pop_modal="change_pop_modal" :transfer_code="result.transfer_code|| ''" />
    <user-info
      v-if="extra_ce_suan.name"
      :extra_ce_suan="extra_ce_suan"
      :result="result"
    />
    <content-detail v-if="result.fang_wei" :result="result" :title_index="1" />
    <content-detail v-if="result.zhi_nan" :result="result" :title_index="2" />
    <content-detail v-if="result.tai_sui" :result="result" :title_index="3" />
    <content-detail v-if="result.ding_yu" :result="result" :title_index="4" />
    <content-detail class="hidden-code" :result="result" :title_index="55" />
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import {
  getResultAPI,
  resultCheckAPI,
  checkSendEventApi,
  sendEventApi,
} from '../../../api/api';
import utils from './../../../libs/utils.js';
import contentDetail from './contentDetail.vue';
// @ts-ignore
import userInfo from './userInfo.vue';
import ResultPopup from '../../../components/ResultPopup.vue'
import { maidianEnum } from '../../../libs/enum';
export default {
  components: {
    userInfo,
    contentDetail,
    ResultPopup,
  },

  data() {
    return {
      order_id: 0,
      count: 0, // 輪詢次數
      create_time: '',
      status: '',
      is_finish: false,
      extra_ce_suan: {},
      challenge: '',
      ding_yu: '',
      ding_yu_desc: '',
      fang_wei: '',
      season_tip: {},
      tai_sui: '',
      work_fa_zhan: '',
      work_guan_xi: '',
      zhi_nan: '',
      jiexi: {},
      fangweiObj: {},
      result: {},
      show_pop_modal: false,//底部引导用户下载遮罩
    };
  },
  async created() {
    // localStorage.removeItem('mlxz_fixed_order_info');
    // localStorage.removeItem('mlxz_fixed_order_key');
    // localStorage.removeItem('mlxz_fixed_local_order_time');
    // localStorage.removeItem('mlxz_fixed_api_order_time');
  },
  async mounted() {
    this.order_id = this.$route.query.order_id;

    window.scrollTo(0, 0);
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '已进入结果页',
    });
    utils.firebaseLogEvent(
      '10004',
      '-10009',
      'page_view_2024career_result',
      'page_view',
      {
        args_name: 'page_view_2024career_result',
        channel: utils.getFBChannel(),
      }
    );
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '上报了page_view，准备校验是否上报埋点',
    });
    // 上报支付结果埋点  start
    let check_result = await this.checkWithTimeout();
    if (check_result !== null) {
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '已经获取了是否上报埋点的状态',
        mlxz_attribution_status: check_result.data.status,
      });
      if (check_result.data.status) {
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
    this.query();
  },
  computed: {},

  methods: {
    /**
     * 显示底部引导用户下载app遮罩
     */
     change_pop_modal() {
      this.show_pop_modal = true;
    },
    /**
     * @description: 校验是否上报埋点
     * @return {*}
     */
    async checkWithTimeout() {
      try {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始调用校验上报埋点接口',
        });
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

    /**
     * @description: 完成上报埋点
     * @return {*}
     */
    async handleSendEvent() {
      let report_price = +utils.getQueryStr('report_price');
      let report_status = utils.getQueryStr('status');
      let discount_pay = +utils.getQueryStr('discount_pay');
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
        if (discount_pay) {
          utils.firebaseLogEvent(
            '10004',
            '-10017',
            'event_status_2024careerdiscont_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024careerdiscont_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }

        if (repay) {
          utils.firebaseLogEvent(
            '10002',
            '-10015',
            'event_status_2024careerhistory_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024careerhistory_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (!discount_pay && !repay) {
          utils.firebaseLogEvent(
            '10004',
            '-10007',
            'event_status_2024career_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024career_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }

        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成firebase埋点上报',
          mlxz_order_status: report_status,
        });
        if (utils.isProd()) {
          await utils.checkFB();
          try {
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: '开始上报FB埋点，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: 'MYR',
              mlxz_order_status: report_status,
            });
            fbq('track', 'Purchase', {
              value: report_price.toFixed(2),
              currency: 'MYR',
            });
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: '完成FB埋点上报，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: 'MYR',
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
        if (discount_pay) {
          utils.firebaseLogEvent(
            '10004',
            '-10018',
            'event_status_2024careerdiscount_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024careerdiscount_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (repay) {
          utils.firebaseLogEvent(
            '10002',
            '-10024',
            'event_status_2024careerhistory_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024careerhistory_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (!discount_pay && !repay) {
          utils.firebaseLogEvent(
            '10004',
            '-10008',
            'event_status_2024career_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024career_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }

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

    async sendEvent() {
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '开始调用接口，通知已上报',
      });
      const res = await sendEventApi({ order_id: this.order_id });
      if (res.status === 1000) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '已通知已上报',
          mlxz_attribution_status: res.status,
          mlxz_attribution_desc: res.desc,
        });
      }
    },
    /**
     * @description: 更新支付结果
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
      const res = await resultCheckAPI(data);
      if (res.status === 1000) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '验单，已获取支付结果Verify',
          mlxz_verify_status: res.data.status,
        });
        if (!localStorage.getItem('report_price')) return;
        const price = +localStorage.getItem('report_price');
        const { status } = res.data;
        const product_key = '2024_career_report';
      }
      localStorage.removeItem('report_price');

      return res.status === 1000 ? 1 : 0;
    },

    /**
     * @description: 订单查询
     * @return {*}
     */
    query() {
      this.count++;
      this.loading = true;
      Indicator.open(this.$t('result-tip'));
      getResultAPI({ order_id: this.$route.query.order_id }).then(res => {
        let can_store =
          (res.data && ['PAYED', 'FAIL'].includes(res.data.status)) ||
          (this.count === 6 && ['PAYED', 'FAIL'].includes(res.data.status))
            ? true
            : false;

        if (res.data.status === 'PAYED') {
          this.renderResult(res);
          this.loading = false;
          this.hasData = true;
          Indicator.close();
        } else if (this.count < 6) {
          if (['PAYED', 'FAIL', 'REFUNDED'].includes(res.data.status)) {
            this.backNotice();
            this.status = res.data.status;
            return;
          }
          setTimeout(() => {
            this.query();
          }, 1000);
        } else {
          this.backNotice();
        }
        this.status = res.data.status;
      });
    },

    /**
     * @description: 订单查询失败 返回测算报告首页
     * @return {*}
     */
    backNotice() {
      Indicator.close();
      Toast(this.$t('fail-tip'));
      setTimeout(() => {
        location.href = 'career_fortune_2024.html';
      }, 1000);
    },
    /**
     * @description: 格式化测算结果数据
     * @param {*} res 接口返回的res
     * @return {*}
     */
    renderResult(res) {
      this.extra_ce_suan = res.data.extra_ce_suan;
      this.result = res.data.result;
      this.result.transfer_code = res.data.transfer_code;
    },
  },
};
</script>

<style scoped>
.top-banner {
  display: block;
  width: 100%;
}
.detail {
  background-repeat: repeat-y;
  background-size: 100%;
  padding-bottom: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main {
  margin: 0 0.2rem;
  padding-bottom: 0.3rem;
}

.advertisement {
  margin-top: 0.6rem;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  overflow: hidden;
}

.advertisement img {
  width: 100%;
  display: block;
}

.border-bottom {
  display: block;
  width: 100%;
}
</style>
