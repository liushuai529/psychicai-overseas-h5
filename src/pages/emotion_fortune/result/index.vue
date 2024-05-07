<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:33:50
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-07 17:17:59
 * @Description: 
-->
<template>
  <div class="result">
    <UserInfo
      :username="username"
      :sex="sex"
      :picker_date_yangli="picker_date_yangli"
      :picker_date_nongli="picker_date_nongli"
      :gan="gan"
      :zhi="zhi"
      :is_result="true"
    />
    <contentDetail v-if="fortune.qian" :result="fortune.qian" :item_index="2" />
    <contentDetail v-if="fortune.concept" :result="fortune" :item_index="3" />
    <contentDetail v-if="fortune.keyword" :result="fortune" :item_index="5" />
    <contentDetail
      class="hidden-code"
      v-if="!is_in_app"
      :result="fortune"
      :item_index="6"
    />
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
//@ts-ignore
import contentDetail from './content_detail.vue';
import utils from '../../../libs/utils.js';
import UserInfo from '../detail/user_info.vue';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import { getResultAPI, resultCheckAPI, getBaziAPI } from '../../../api/api';

export default {
  components: { contentDetail, UserInfo },
  data() {
    return {
      loading: false,
      hasData: false,

      fortune: {
        qian: 1,
        // # 感情之路
        road_forecast: '',
        // # 感情观概述
        concept: '',
        // # 感情回顾
        review: '',
        // # 感情关键词
        keyword: '',
        // # 感情状况分两部分
        // ### 状况1
        status: '',
        // ### 状况2
        road_desc: '',
        // # 感情趋势
        trend: '',
        // # 特别提醒,
        notice: '',
      },
      advice: {},
      count: 0,
      status: '',
      is_finish: false,
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      gan: [],
      zhi: [],
      extra_ce_suan: {},
      baoshi_icon: '',
      order_id: null,
      code: '',
    };
  },
  async created() {
    if (this.is_in_app) {
      utils.payStatusAdjust('page_view_interpretation', 'waf079', '');
    } else {
      window.Adjust &&
        window.Adjust.trackEvent({
          eventToken: '77woaq',
        });
    }

    utils.firebaseLogEvent(
      '20003',
      '-10001',
      'page_view_interpretation',
      'page_view',
      {
        args_name: 'page_view_interpretation',
        report_id: '600010',
      }
    );
    window.scrollTo(0, 0);
    this.order_id = this.$route.query.id;
    await this.checkResult();
    this.query();
  },
  computed: {
    is_in_app() {
      return utils.isInApp();
    },
  },
  watch: {
    status(val) {
      let stop = utils.getQueryString('stop');
      if (stop) return;
      // 自己添加的stop 否则会一直调用该方法
      if (val) {
        if (!this.is_in_app) return;
        utils.resetResultUrl(this.$route.query.order_id, val);
      }
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
        const product_key = '2024_lovely_report';
        if (status === 'PAYED') {
          if (this.is_in_app) {
            utils.payStatusAdjust('event_status_pay_success', 'ud1otd', price);
            utils.firebaseLogEvent(
              '10060',
              '-10007',
              'event_status_pay_success',
              'event_status',
              {
                args_name: 'event_status_pay_success',
                pay_page: product_key,
                price: price,
                channel: utils.getFBChannel(),
              }
            );
          } else {
            window.Adjust &&
              window.Adjust.trackEvent({
                eventToken: '8mmz00',
                revenue: price,
                currency: 'MYR',
              });

            utils.firebaseLogEvent(
              '20002',
              '-10005',
              'event_status_pay_success',
              'event_status',
              {
                args_name: 'event_status_pay_success',
                pay_page: product_key,
                price: price,
                channel: utils.getFBChannel(),
              }
            );
            if (utils.isProd()) {
              try {
                fbq('track', 'Purchase', {
                  currency: 'MYR',
                  value: price.toFixed(2),
                });
              } catch (err) {
                console.error('Purchase fbq error message:', err);
              }
              try {
                fbq('track', 'ViewContent');
              } catch (err) {
                console.error('ViewContent fbq error message:', err);
              }
              try {
                fbq('track', 'Subscribe');
              } catch (err) {
                console.error('Subscribe fbq error message:', err);
              }
              try {
                fbq('trackCustom', 'CustomPurchase');
              } catch (err) {
                console.error('CustomPurchase fbq error message:', err);
              }

              try {
                fbq('track', 'ViewContent', {
                  content_ids: -10005,
                  content_name: 'event_status_pay_success',
                  content_type: 'event_status',
                  currency: 'MYR',
                  value: price.toFixed(2),
                  event_name: 'event_status_pay_success',
                });
              } catch (err) {
                console.error('fbq error message:', err);
              }
              try {
                fbq('track', 'Subscribe', {
                  currency: 'MYR',
                  value: price.toFixed(2),
                  content_name: 'event_status_pay_success',
                  content_type: 'event_status',
                  event_name: 'event_status_pay_success',
                });
              } catch (err) {
                console.error('Subscribe fbq error message:', err);
              }
              try {
                fbq('trackCustom', 'CustomPurchase', {
                  currency: 'MYR',
                  value: price.toFixed(2),
                  content_ids: -10005,
                  content_name: 'event_status_pay_success',
                  content_type: 'event_status',
                  event_name: 'event_status_pay_success',
                });
              } catch (err) {
                console.error('fbq error message:', err);
              }
            }
          }
        } else {
          if (this.is_in_app) {
            utils.payStatusAdjust('event_status_pay_failure', 'veoeo1', '');
            utils.firebaseLogEvent(
              '10060',
              '-10008',
              'event_status_pay_failure',
              'event_status',
              {
                args_name: 'event_status_pay_failure',
                reason: 'failure',
              }
            );
          } else {
            window.Adjust &&
              window.Adjust.trackEvent({
                eventToken: 'k7kijn',
              });
            utils.firebaseLogEvent(
              '20002',
              '-10006',
              'event_status_pay_failure',
              'event_status',
              {
                args_name: 'event_status_pay_failure',
                reason: 'failure',
              }
            );
          }
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
      Indicator.open(this.$t('result-check'));
      getResultAPI({ order_id: this.$route.query.order_id }).then(res => {
        let can_store =
          (res.data && ['PAYED', 'FAIL'].includes(res.data.status)) ||
          (this.count === 6 && ['PAYED', 'FAIL'].includes(res.data.status))
            ? true
            : false;
        can_store &&
          utils.firebaseLogEvent(
            '20003',
            '-10002',
            'event_status_reports',
            'event_status',
            {
              args_name: 'event_status_reports',
              report_id: '600010',
              pay_status: res.data.status === 'PAYED' ? 'success' : 'failure',
            }
          );
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
        location.href = 'emotion_fortune.html';
      }, 1000);
    },

    /**
     * @description: 格式化res
     * @param {*} res
     * @return {*}
     */
    renderResult(res) {
      if (res.data.extra_ce_suan) {
        this.extra_ce_suan = res.data.extra_ce_suan;
        this.formateQueryUserInfo();
        this.getUserBazi();
      }

      if (res.data.result) {
        this.fortune = res.data.result;
        this.fortune.transfer_code = res.data.transfer_code;
        const {
          road_forecast,
          concept,
          review,
          status,
          road_desc,
          trend,
          notice,
        } = this.fortune;
        this.fortune.qian =
          road_forecast === '吉'
            ? 1
            : road_forecast === '小吉'
            ? 2
            : road_forecast === '平'
            ? 3
            : 4;

        this.fortune.concept = concept.replace(/\n/g, '<br/>');
        this.fortune.review = review.replace(/\n/g, '<br/>');
        this.fortune.status = status.replace(/\n/g, '<br/>');
        this.fortune.road_desc = road_desc.replace(/\n/g, '<br/>');
        this.fortune.trend = trend.replace(/\n/g, '<br/>');
        if (notice) {
          this.fortune.notice = notice.replace(/\n/g, '<br/>');
        }
      }
    },

    /**
     * @description: 获取八字数据
     * @return {*}
     */
    async getUserBazi() {
      let { birth_hour, birth_year, birth_month, birth_date, is_gongli, date } =
        this.extra_ce_suan;
      let hour_ = birth_hour === '-1' ? '12' : birth_hour;
      let android_date = `${birth_year}-${birth_month}-${birth_date} ${hour_}:00:00`;
      let ios_date = `${birth_year}/${birth_month}/${birth_date} ${hour_}:00:00`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? android_date : ios_date)
      );
      let lunar = solar.getLunar();
      var lunarMonth = LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      let is_leap = lunarMonth.isLeap();
      let params = {
        year: birth_year,
        month: birth_month,
        day: birth_date,
        hour: birth_hour,
        minute: '0',
        is_gongli: is_gongli,
        leap_month: is_leap ? '1' : '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(params);
      if (status !== 1000) return;
      this.gan = data.gan;
      this.zhi = data.zhi;
    },

    /**
     * @description: 格式化用户信息
     * @return {*}
     */
    formateQueryUserInfo() {
      let {
        name,
        birth_hour,
        birth_year,
        birth_month,
        birth_date,
        is_gongli,
        date,
        sex,
        userstring,
      } = this.extra_ce_suan;
      this.username = eval("'" + name + "'");
      this.sex = sex;
      this.picker_hour = utils.formateNongliHour(birth_hour);
      let android_date = `${birth_year}-${birth_month}-${birth_date}`;
      let ios_date = `${birth_year}/${birth_month}/${birth_date}`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? android_date : ios_date)
      );
      let lunar = solar.getLunar();
      this.picker_date_nongli = +is_gongli
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${
            this.picker_hour
          }`
        : `${birth_year}年${utils.formateNongliMonth(
            birth_month
          )}${utils.formateNongliDate(birth_date)} ${this.picker_hour}`;
      this.picker_date_yangli = +is_gongli
        ? `${birth_year}-${birth_month}-${birth_date} ${this.picker_hour}`
        : `${Lunar.fromYmd(+birth_year, +birth_month, +birth_date)
            .getSolar()
            .toString()} ${this.picker_hour}`;
    },
  },
};
</script>

<style scoped lang="less">
.result {
  padding: 0.43rem 0.22rem 0.5rem;
  background: #ffdaf5;
}
</style>
