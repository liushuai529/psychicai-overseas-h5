<template>
  <div class="detail result-detail">
    <user-info v-if="extra_ce_suan.name" :extra_ce_suan="extra_ce_suan" />
    <div class="main-outer">
      <div class="main">
        <content-detail
          v-if="gua_code"
          :result="gua"
          :gua_code="gua_code"
          :user="extra_ce_suan"
          :title_index="6"
        />
        <content-detail :result="desc" :title_index="1" />
        <content-detail :result="caiyun" :title_index="2" />
        <content-detail :result="ganqing" :title_index="3" />
        <content-detail :result="shiye" :title_index="4" />
        <content-detail :result="yunshi" :title_index="5" />
        <CopyCode
          :set_title="true"
          title_icon="https://psychicai-static.psychicai.pro/imgs/24040e108c9b11454236a286b028cd357102.png"
          title_icon_style=" width: 3.74rem;height: 0.86rem; margin-bottom: 0.5rem;"
          style="margin-top: 0.2rem"
          className="guiguzi-box"
          tips1_color="#222"
          code_color="#333"
          :transfer_code="transfer_code"
          codeClass="guiguzi-code"
          :code_btn="is_cn ? cn_code_btn : tw_code_btn"
          code_text_style="margin:.3rem auto .36rem;color:#6E6E6E"
          @showModal="code_modal = true"
          a_token="ocunew"
          e_id="10008"
          c_id="-10010"
          e_name="click_64gua_result"
        />
      </div>
    </div>
    <CodePop v-if="code_modal" @close="code_modal = false" />
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
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import tw_code_btn from '../../../assets/img/mlxz/downloadBtn/tw/ggz.png';
export default {
  components: {
    userInfo,
    contentDetail,
    CodePop,
    CopyCode,
  },

  data() {
    return {
      order_id: 0,
      count: 0, // 輪詢次數
      create_time: '',
      status: '',
      is_finish: false,
      extra_ce_suan: {},
      desc: '',
      caiyun: '',
      ganqing: '',
      shiye: '',
      yunshi: '',
      gua: '',
      gua_code: '',
      transfer_code: '',
      code_modal: false,
      cn_code_btn:
        'https://psychicai-static.psychicai.pro/imgs/2404f9772bf5b3954cf9836e192486b7ae8d.png',
      tw_code_btn,
    };
  },
  created() {
    // localStorage.removeItem('mlxz_fixed_order_info');
    // localStorage.removeItem('mlxz_fixed_order_key');
    // localStorage.removeItem('mlxz_fixed_local_order_time');
    // localStorage.removeItem('mlxz_fixed_api_order_time');
  },
  async mounted() {
    window.scrollTo(0, 0);
    this.order_id = this.$route.query.order_id;

    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '已进入结果页',
    });
    utils.firebaseLogEvent(
      '10008',
      '-10009',
      'page_view_64gua_result',
      'page_view',
      {
        args_name: 'page_view_64gua_result',
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
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
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
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始上报firebase埋点',
          mlxz_order_status: report_status,
        });
        if (discount_pay) {
          utils.firebaseLogEvent(
            '10008',
            '-10017',
            'event_status_64guadiscont_pay_success',
            'event_status',
            {
              args_name: 'event_status_64guadiscont_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        } else {
          utils.firebaseLogEvent(
            '10008',
            '-10007',
            'event_status_64gua_pay_success',
            'event_status',
            {
              args_name: 'event_status_64gua_pay_success',
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
            '10008',
            '-10018',
            'event_status_64guadiscount_pay_fail',
            'event_status',
            {
              args_name: 'event_status_64guadiscount_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        } else {
          utils.firebaseLogEvent(
            '10008',
            '-10008',
            'event_status_64gua_pay_fail',
            'event_status',
            {
              args_name: 'event_status_64gua_pay_fail',
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
        if (!localStorage.getItem('report_price')) return;
        const price = +localStorage.getItem('report_price');
        const { status } = res.data;
        const product_key = '64gua_report';
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
      Toast(this.$t('fail-result'));
      setTimeout(() => {
        location.href = 'guiguzi_fortune.html';
      }, 1000);
    },
    /**
     * @description: 格式化测算结果数据
     * @param {*} res 接口返回的res
     * @return {*}
     */
    renderResult(res) {
      this.transfer_code = res.data.transfer_code;
      let result = res.data.result;
      result = JSON.parse(JSON.stringify(result).replace(/2018/g, '2023'));
      this.extra_ce_suan = res.data.extra_ce_suan;
      this.desc = result.desc;
      this.caiyun = result.caiyun;
      this.ganqing = result.ganqing;
      this.shiye = result.shiye;
      this.yunshi = result.yunshi;
      this.gua = result.gua;
      this.gua_code = result.guacode;
    },
  },
};
</script>

<style scoped lang="less">
.top-banner {
  display: block;
  width: 100%;
}
.detail {
  background-repeat: repeat-y;
  background-size: 100%;
  padding-bottom: 1.4rem;
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

.footer-box {
  // width: 7.1rem;
  // height: 7.11rem;
  // background: url('../../../assets/img/mlxz/guiguzi/copy_bg.png') no-repeat;
  width: 7.06rem;
  height: 5.41rem;
  background: url('../../../assets/img/mlxz/downloadBtn/ggz-bg.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 400;
  font-size: 0.28rem;
  color: #222222;
  .title1 {
    width: 3.47rem;
    height: 0.86rem;
    margin: 0.53rem auto 0.5rem;
  }
  .title2 {
    width: 3.05rem;
    height: 0.82rem;
    margin-bottom: 0.32rem;
  }

  .code {
    width: 5.5rem;
    height: 1.04rem;
    background: url('../../../assets/img/mlxz/guiguzi/img_xiazai_bj.png')
      no-repeat;
    background-size: contain;
    margin-top: 0.4rem;
    color: #333;
    font-weight: 600;
    font-size: 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    span {
      margin-left: 0.1rem;
      text-decoration: underline;
    }
  }
  .desc {
    margin-bottom: 0.2rem;
    color: #333;
    font-size: 0.24rem;
    opacity: 0.6;
  }
  .copy {
    width: 5.92rem;
    height: 1.06rem;
    margin-top: 0.38rem;
  }
}
</style>
