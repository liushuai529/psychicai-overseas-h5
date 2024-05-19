<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:33:50
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-18 20:07:16
 * @Description: 
-->
<template>
  <div class="result">
    <!-- <UserInfo
      :username="username"
      :sex="sex"
      :picker_date_yangli="picker_date_yangli"
      :picker_date_nongli="picker_date_nongli"
      :gan="gan"
      :zhi="zhi"
      :is_result="false"
    /> -->
    <div :class="['info-box', lang ? 'cn-bg' : 'tw-bg']">
      <BaziTable
        :sex="sex"
        :is_result="true"
        :username="username"
        :gongli_nongli="gongli_nongli"
        :picker_date_yangli="picker_date_yangli"
        :picker_date_nongli="picker_date_nongli"
        :gan="gan"
        :zhi="zhi"
        :nayin="nayin"
        :cai_bo_num="cai_bo_num"
        :gui_ren_num="gui_ren_num"
        :hun_yin_num="hun_yin_num"
        :ming_ge="ming_ge"
        :riyuanqiangruo="riyuanqiangruo"
        :shi_ye_num="shi_ye_num"
        :wuxingqiang="wuxingqiang"
        text_color="#000"
        minge_color="#ED1A86"
        :show_daji="false"
        bg="#FFE9F5"
        width="6.14rem"
      />
    </div>

    <contentDetail v-if="fortune.qian" :result="fortune.qian" :item_index="2" />
    <contentDetail v-if="fortune.concept" :result="fortune" :item_index="3" />
    <contentDetail v-if="fortune.keyword" :result="fortune" :item_index="5" />
    <contentDetail class="hidden-code" :result="fortune" :item_index="6" />
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
import BaziTable from '../../../components/baziTable.vue';
export default {
  components: { contentDetail, UserInfo, BaziTable },
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

      extra_ce_suan: {},
      baoshi_icon: '',
      order_id: null,
      code: '',
      gan: ['-', '-', '-', '-'],
      zhi: ['-', '-', '-', '-'],
      nayin: ['？', '？', '？', '？'],
      cai_bo_num: 0,
      gui_ren_num: 0,
      hun_yin_num: 0,
      ming_ge: '',
      riyuanqiangruo: '',
      shi_ye_num: 0,
      wuxingqiang: '',
    };
  },
  async created() {
    this.order_id = this.$route.query.id || this.$route.query.order_id;

    let report_price = +utils.getQueryStr('report_price');
    let report_status = utils.getQueryStr('status');
    let set_time = +localStorage.getItem('mlxz_set_event_times');
    if (report_price && !set_time) {
      if (report_status === 'SUCCESS') {
        utils.firebaseLogEvent(
          '10006',
          '-10007',
          'event_status_2024lovely_pay_success',
          'event_status',
          {
            args_name: 'event_status_2024lovely_pay_success',
            channel: utils.getFBChannel(),
          }
        );
        if (utils.isProd()) {
          await utils.checkFB();
          try {
            fbq('track', 'Purchase', {
              value: report_price.toFixed(2),
              currency: 'MYR',
            });
          } catch (err) {
            console.error('error message:', err);
          }
        }
      } else {
        window.Adjust &&
          window.Adjust.trackEvent({
            eventToken: 'w9nw13',
          });
        utils.firebaseLogEvent(
          '10006',
          '-10008',
          'event_status_2024lovely_pay_fail',
          'event_status',
          {
            args_name: 'event_status_2024lovely_pay_fail',
            channel: utils.getFBChannel(),
          }
        );
      }
      await utils.asleep(500);

      localStorage.setItem('mlxz_set_event_times', 1);

      utils.resetPageUrl(this.order_id, report_status);
    }
  },
  async mounted() {
    window.scrollTo(0, 0);

    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: 'euvhwq',
      });

    utils.firebaseLogEvent(
      '10006',
      '-10009',
      'page_view_2024lovely_result',
      'page_view',
      {
        args_name: 'page_view_2024lovely_result',
        channel: utils.getFBChannel(),
      }
    );

    await this.checkResult();
    this.query();
  },
  computed: {
    lang() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {
    status(val) {
      let stop = utils.getQueryString('stop');
      if (stop) return;
      // 自己添加的stop 否则会一直调用该方法
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
        const product_key = '2024_lovely_report';
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
        this.getUserBazi(res);
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
    async getUserBazi(res) {
      if (res.data.result && res.data.result.bazi) {
        this.getMinggeInfo(res.data.result.bazi);
        return;
      }
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
      this.getMinggeInfo(data);
    },

    /**
     * @description: 解析命格信息
     * @param {*} data
     * @return {*}
     */
    getMinggeInfo(data) {
      const {
        gan,
        zhi,
        nayin,
        cai_bo_num,
        gui_ren_num,
        hun_yin_num,
        ming_ge,
        riyuanqiangruo,
        shi_ye_num,
        wuxingqiang,
      } = data;
      this.gan = gan;
      this.zhi = zhi;
      this.nayin = nayin;
      this.cai_bo_num = cai_bo_num;
      this.gui_ren_num = gui_ren_num;
      this.hun_yin_num = hun_yin_num;
      this.ming_ge = ming_ge;
      this.riyuanqiangruo = riyuanqiangruo;
      this.shi_ye_num = shi_ye_num;
      this.wuxingqiang = wuxingqiang;
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
      this.gongli_nongli = +is_gongli;
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

.cn-bg {
  background-image: url('../../../assets/img/emotion/new/result_info_bg.png');
}
.tw-bg {
  background-image: url('../../../assets/img/emotion/new/tw/result_info_bg.png');
}
.info-box {
  width: 7.06rem;
  height: 7.81rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 1.5rem;
  margin-bottom: 0.2rem;
}
</style>
