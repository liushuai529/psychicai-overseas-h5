<template>
  <div :class="['result', is_cn ? 'result-cn-bg' : 'result-tw-bg', show_pop_modal ? 'hidden-scroll' : '']">
    <ResultPopup product_key="h5_emotion2025" @change_pop_modal="change_pop_modal"
      :transfer_code="fortune.transfer_code || ''" />
    <div :class="['info-box', is_cn ? 'cn-bg' : 'tw-bg']">
      <BaziTable :sex="sex" :is_result="true" :username="username" :gongli_nongli="gongli_nongli"
        :picker_date_yangli="picker_date_yangli" :picker_date_nongli="picker_date_nongli" :gan="gan" :zhi="zhi"
        :nayin="nayin" :cai_bo_num="cai_bo_num" :gui_ren_num="gui_ren_num" :hun_yin_num="hun_yin_num" :ming_ge="ming_ge"
        :riyuanqiangruo="riyuanqiangruo" :shi_ye_num="shi_ye_num" :wuxingqiang="wuxingqiang" :tao_hua_num="tao_hua_num"
        :fuqigong="fuqigong" text_color="#6D2215" minge_color="#DB4539" :show_daji="false" bg="#FFF3F7" width="6.5rem"
        table_border="0.02rem solid #4D1A1A" border_color="#4D1A1A" :is_show_taohua="1" :change_color="true" />
    </div>

    <contentDetail v-if="fortune.qian" :result="fortune" :item_index="1" />
    <contentDetail v-if="fortune.guide" :result="fortune.guide" :item_index="2" />
    <contentDetail v-if="fortune.review" :result="fortune.review" :item_index="3" />
    <contentDetail v-if="fortune.concept" :result="fortune.concept" :item_index="4" />

    <contentDetail v-if="fortune.zodiac" :result="fortune" :item_index="5" :zodiac_img="zodiacObj[fortune.zodiac]" />

    <contentDetail v-if="fortune.fortunegan" :result="fortune.fortunegan" :item_index="6" />
    <contentDetail v-if="fortune.fortunezhi" :result="fortune.fortunezhi" :item_index="7" />



    <contentDetail class="hidden-code" :result="fortune" :item_index="8" />
    <!-- <contentDetail class="hidden-code" :result="fortune" :item_index="9" /> -->
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
//@ts-ignore
import contentDetail from './content_detail.vue';
import utils from '../../../libs/utils.js';
import UserInfo from '../detail/user_info.vue';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import {
  getResultAPI,
  resultCheckAPI,
  getBaziAPI,
  checkSendEventApi,
  sendEventApi,
} from '../../../api/api.js';
import BaziTable from '../../../components/baziTable.vue';
import ResultPopup from '../../../components/ResultPopup.vue';
import result_img_shengxiao_gou from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_gou.webp';
import result_img_shengxiao_hou from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_hou.webp';
import result_img_shengxiao_hu from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_hu.webp';
import result_img_shengxiao_ji from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_ji.webp';
import result_img_shengxiao_long from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_long.webp';
import result_img_shengxiao_ma from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_ma.webp';
import result_img_shengxiao_niu from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_niu.webp';
import result_img_shengxiao_she from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_she.webp';
import result_img_shengxiao_shu from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_shu.webp';
import result_img_shengxiao_tu from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_tu.webp';
import result_img_shengxiao_yang from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_yang.webp';
import result_img_shengxiao_zhu from '../../../assets/img/emotion_fortune_2025/result_img_shengxiao_zhu.webp';
const zodiacObj = {
  '狗': result_img_shengxiao_gou,
  '猴': result_img_shengxiao_hou,
  '虎': result_img_shengxiao_hu,
  '鸡': result_img_shengxiao_ji,
  '雞': result_img_shengxiao_ji,
  '龙': result_img_shengxiao_long,
  '龍': result_img_shengxiao_long,
  '牛': result_img_shengxiao_niu,
  '马': result_img_shengxiao_ma,
  '馬': result_img_shengxiao_ma,
  '蛇': result_img_shengxiao_she,
  '鼠': result_img_shengxiao_shu,
  '兔': result_img_shengxiao_tu,
  '羊': result_img_shengxiao_yang,
  '猪': result_img_shengxiao_zhu,
  '豬': result_img_shengxiao_zhu,
};
export default {
  components: { contentDetail, UserInfo, BaziTable, ResultPopup },
  data() {
    return {
      zodiacObj,
      result_img_shengxiao_gou,
      result_img_shengxiao_hou,
      result_img_shengxiao_hu,
      result_img_shengxiao_ji,
      result_img_shengxiao_long,
      result_img_shengxiao_ma,
      result_img_shengxiao_niu,
      result_img_shengxiao_she,
      result_img_shengxiao_shu,
      result_img_shengxiao_tu,
      result_img_shengxiao_yang,
      result_img_shengxiao_zhu,
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
      tao_hua_num: 0,
      fuqigong: '',
      show_pop_modal: false,//底部引导用户下载遮罩
    };
  },
  created() {

    // localStorage.removeItem('mlxz_fixed_order_info');
    // localStorage.removeItem('mlxz_fixed_order_key');
    // localStorage.removeItem('mlxz_fixed_local_order_time');
    // localStorage.removeItem('mlxz_fixed_api_order_time');
  },
  async mounted() {
    this.order_id = this.$route.query.id || this.$route.query.order_id;

    window.scrollTo(0, 0);
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '已进入结果页',
    });

    utils.firebaseLogEvent(
      '10017',
      '-10018',
      'page_view_LOVE2025_result',
      'page_view',
      {
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
      let currency_type = utils.getQueryStr('currency_type');
      let combine_product_ids = +utils.getQueryStr('combine_product_ids');
      let product_id = utils.getQueryStr('product_id');
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '准备上报埋点，获取订单状态',
        mlxz_order_status: report_status,
      });
      if (report_status === 'SUCCESS' || report_status === 'PAYED') {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始上报firebase埋点',
          mlxz_order_status: report_status,
        });
        utils.firebaseLogEvent(
          '10017',
          '-10007',
          'event_status_LOVE2025_end_pay_success',
          'event_status',
          {
            channel: utils.getFBChannel(),
          }
        );
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成firebase埋点上报',
          mlxz_order_status: report_status,
        });
        console.log('Purchase事件上报', this.order_id)
        if (utils.isProd()) {
          try {
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: '开始上报FB埋点，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: currency_type,
              mlxz_order_status: report_status,
            });
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
          '10017',
          '-10008',
          'event_status_LOVE2025_end_pay_fail',
          'event_status',
          {
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
          //是否组合订单
          if (res.data.sub_orders) {
            getResultAPI({ order_id: res.data.sub_orders[0].order_id }).then(
              response => {
                this.renderResultAndComplete(response);
              }
            );
          } else {
            this.renderResultAndComplete(res);
          }
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
        let querystring = localStorage.getItem('_emotion_fortune_2025_info');
        let path = 'detail?querystring=' + querystring;
        this.$router.push({ path });
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
        this.fortune.status = status && status.replace(/\n/g, '<br/>');
        this.fortune.road_desc = road_desc && road_desc.replace(/\n/g, '<br/>');
        this.fortune.trend = trend && trend.replace(/\n/g, '<br/>');
        if (notice) {
          this.fortune.notice = notice.replace(/\n/g, '<br/>');
        }
      }
    },

    renderResultAndComplete(res) {
      this.renderResult(res);
      this.loading = false;
      this.hasData = true;
      Indicator.close();
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
        leap_month: '0',
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
        fuqigong,
        tao_hua_num,
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
      this.tao_hua_num = tao_hua_num;
      this.fuqigong = fuqigong;
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
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${this.picker_hour
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
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #FB789A;
  padding-top: 1.3rem;
}

.result-cn-bg {
  background-image: url('../../../assets/img/emotion_fortune_2025/cn/mig_img_topbj_cn.webp');
}

.result-tw-bg {
  background-image: url('../../../assets/img/emotion_fortune_2025/tw/mig_img_topbj_tw.webp');
}

.cn-bg {
  background: url(../../../assets/img/emotion_fortune_2025/cn/paypage_cardbj_xinxi_cn.webp) no-repeat;
  background-size: 100% 100%;
}

.tw-bg {
  background: url(../../../assets/img/emotion_fortune_2025/tw/paypage_cardbj_xinxi_tw.webp) no-repeat;
  background-size: 100% 100%;
}

.info-box {
  width: 7.1rem;
  height: 7.09rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 1rem;
  margin-bottom: 0.36rem;
}
</style>
