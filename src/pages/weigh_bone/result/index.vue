<template>
  <div class="main">
    <userInfo v-if="user_info" :is_result="true" :user_detail="user_info" />
    <content-detail v-if="fortune.weight" :fortune="fortune" :card_index="1" />
    <content-detail
      v-if="fortune.fubao"
      :fortune="fortune.fubao"
      :card_index="2"
    />

    <content-detail
      v-if="fortune.xiangjie"
      :fortune="fortune.xiangjie"
      :card_index="3"
    />
    <content-detail class="hidden-code" :fortune="fortune" :card_index="4" />
  </div>
</template>

<script>
import {
  getResultAPI,
  resultCheckAPI,
  checkSendEventApi,
  sendEventApi,
} from '../../../api/api';
import { Toast, Indicator } from 'mint-ui';
import utils from './../../../libs/utils.js';
// @ts-ignore
import contentDetail from './contentDetail.vue';
import userInfo from '../detail/userInfo.vue';

export default {
  components: {
    contentDetail,
    userInfo,
  },
  data() {
    return {
      resource: {
        order: {
          order_id: 0,
        },
      },
      fortune: {
        career: '',
        healthy: '',
        love: '',
        study: '',
        wealth: '',
        whole: '',
        lucky_words: '',
      },
      user_info: '',

      loading: false,
      order_id: 0,
      count: 0, // 轮训次数
      status: '',
    };
  },
  computed: {},
  created() {
    localStorage.removeItem('mlxz_fixed_order_info');
    localStorage.removeItem('mlxz_fixed_order_key');
    localStorage.removeItem('mlxz_fixed_local_order_time');
    localStorage.removeItem('mlxz_fixed_api_order_time');
  },
  async mounted() {
    this.order_id = this.$route.query.order_id;

    window.scrollTo(0, 0);
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '已进入结果页',
    });

    utils.firebaseLogEvent(
      '10009',
      '-10009',
      'page_view_chenggu_result',
      'page_view',
      {
        args_name: 'page_view_chenggu_result',
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
  watch: {},
  methods: {
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
      let discount_pay = utils.getQueryStr('discount_pay');
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '准备上报埋点，获取订单状态',
        mlxz_order_status: report_status,
      });
      if (report_status === 'SUCCESS' || report_status === 'PAYED') {
        if (discount_pay) {
          utils.firebaseLogEvent(
            '10009',
            '-10017',
            'event_status_chenggudiscont_pay_success',
            'event_status',
            {
              args_name: 'event_status_chenggudiscont_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始上报firebase埋点',
          mlxz_order_status: report_status,
        });
        utils.firebaseLogEvent(
          '10009',
          '-10007',
          'event_status_chenggu_pay_success',
          'event_status',
          {
            args_name: 'event_status_chenggu_pay_success',
            channel: utils.getFBChannel(),
          }
        );
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
        if (discount_pay) {
          utils.firebaseLogEvent(
            '10009',
            '-10018',
            'event_status_chenggudiscount_pay_fail',
            'event_status',
            {
              args_name: 'event_status_chenggudiscount_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始上报埋点',
          mlxz_order_status: report_status,
        });
        utils.firebaseLogEvent(
          '10009',
          '-10008',
          'event_status_chenggu_pay_fail',
          'event_status',
          {
            args_name: 'event_status_chenggu_pay_fail',
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
      const res = await resultCheckAPI(data);
      if (res.status === 1000) {
        if (!localStorage.getItem('report_price')) return;

        const price = +localStorage.getItem('report_price');
        const { status } = res.data;
        const product_key = 'chenggu_report';
      }
      localStorage.removeItem('report_price');
      return res.status === 1000 ? 1 : 0;
    },

    /**
     * @description: 查询结果数据
     * @return {*}
     */
    query() {
      this.count++;
      this.loading = true;
      Indicator.open(this.$t('result-check'));
      getResultAPI({ order_id: this.$route.query.order_id }).then(res => {
        let can_store =
          (res.data && ['PAYED', 'FAIL'].includes(res.data.status)) ||
          (this.count === 6 && ['PAYED', 'FAIL'].includes(res.data.status))
            ? true
            : false;

        if (res.data.status === 'PAYED') {
          this.renderResult(res);
          this.loading = false;
          Indicator.close();
          return;
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
     * @description: 失败结果处理
     * @return {*}
     */
    backNotice() {
      Indicator.close();
      Toast(this.$t('fail-result'));
      setTimeout(() => {
        location.href = 'weigh_bone.html';
      }, 1000);
    },

    /**
     * @description: 结果数据渲染
     * @param {*} res
     * @return {*}
     */
    renderResult(res) {
      this.resource = res.data;
      this.fortune = res.data.result;

      this.fortune.transfer_code = res.data.transfer_code;
      this.fortune = JSON.parse(
        JSON.stringify(this.fortune).replace(
          /2018/g,
          new Date().getFullYear() + ''
        )
      );
      if (this.fortune.xiangjie) {
        this.fortune.xiangjie = this.fortune.xiangjie.replace(/\n/g, '<br/>');
      }

      if (this.fortune.ge) {
        this.fortune.ge = this.fortune.ge.replace(/\n/g, '<br/>');
      }

      this.user_info = this.formateUserInfo(res.data.extra_ce_suan);
    },
    /**
     * @description: 格式化用户信息
     * @param {*} val
     * @return {*}
     */
    formateUserInfo(val) {
      const {
        name,
        sex,
        is_gongli,
        birth_year,
        birth_month,
        birth_date,
        birth_hour,
      } = val;
      let queryString = '';
      queryString += name;
      queryString += '|';
      queryString += sex;
      queryString += '|';
      queryString += is_gongli;
      queryString += '|';
      queryString += birth_year;
      queryString += '|';
      queryString += birth_month;
      queryString += '|';
      queryString += birth_date;
      queryString += '|';
      queryString += birth_hour || '-1';
      return queryString;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  width: 7.5rem;
  min-height: 100vh;
  padding: 0.01rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
</style>
