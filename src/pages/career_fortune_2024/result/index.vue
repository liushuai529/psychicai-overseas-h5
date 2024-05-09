<template>
  <div class="detail result-detail">
    <user-info v-if="extra_ce_suan.name" :extra_ce_suan="extra_ce_suan" />
    <content-detail v-if="result.fang_wei" :result="result" :title_index="1" />
    <content-detail v-if="result.zhi_nan" :result="result" :title_index="2" />
    <content-detail v-if="result.tai_sui" :result="result" :title_index="3" />
    <content-detail v-if="result.ding_yu" :result="result" :title_index="4" />
    <content-detail class="hidden-code" :result="result" :title_index="55" />
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { getResultAPI, resultCheckAPI } from '../../../api/api';
import utils from './../../../libs/utils.js';
import contentDetail from './contentDetail.vue';
// @ts-ignore
import userInfo from './userInfo.vue';

export default {
  components: {
    userInfo,
    contentDetail,
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
    };
  },
  async mounted() {
    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: 'slbhno',
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
    window.scrollTo(0, 0);
    this.order_id = this.$route.query.order_id;

    await this.checkResult();
    this.query();
  },
  computed: {},
  watch: {
    status(val) {
      let stop = utils.getQueryString('stop');
      if (stop) return;
      if (val) return;
    },
  },
  methods: {
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
        const product_key = '2024_career_report';
        if (status === 'PAYED') {
          window.Adjust &&
            window.Adjust.trackEvent({
              eventToken: 'uxtpmw',
              revenue: price,
              currency: 'MYR',
            });

          utils.firebaseLogEvent(
            '10004',
            '-10007',
            'event_status_2024career_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024career_pay_success',
              pay_page: product_key,
              price: price,
              channel: utils.getFBChannel(),
            }
          );
          if (utils.isProd()) {
            try {
              utils.fbEvent().track('Purchase', {
                currency: 'MYR',
                value: price.toFixed(2),
              });
            } catch (err) {
              console.error('Purchase fbq error message:', err);
            }
          }
        } else {
          window.Adjust &&
            window.Adjust.trackEvent({
              eventToken: 't9r87h',
            });
          utils.firebaseLogEvent(
            '10004',
            '-10008',
            'even_status_2024career_pay_fail',
            'event_status',
            {
              args_name: 'even_status_2024career_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }
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
