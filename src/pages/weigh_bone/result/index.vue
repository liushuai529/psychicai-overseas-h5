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
import { getResultAPI, resultCheckAPI } from '../../../api/api';
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
  async mounted() {
    window.scrollTo(0, 0);

    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: 'fcy4se',
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
    this.order_id = this.$route.query.order_id;
    await this.checkResult();
    this.query();
  },
  watch: {},
  methods: {
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
        if (status === 'PAYED') {
          window.Adjust &&
            window.Adjust.trackEvent({
              eventToken: 'yrnwch',
              revenue: price,
              currency: 'MYR',
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
          if (utils.isProd()) {
            await utils.checkFB();
            try {
              fbq('track', 'Purchase', {
                value: price.toFixed(2),
                currency: 'MYR',
              });
            } catch (err) {
              console.error('error message:', err);
            }
          }
        } else {
          window.Adjust &&
            window.Adjust.trackEvent({
              eventToken: 'k34ta5',
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
        }
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
