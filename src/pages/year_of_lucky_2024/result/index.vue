<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:33:50
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-29 21:21:10
 * @Description: 
-->
<template>
  <div :class="['result', show_pop_modal? 'hidden-scroll': '']">   
    <ResultPopup product_key="h5_emotion2024" @change_pop_modal="change_pop_modal" :transfer_code="fortune.transfer_code|| ''" />  
    <!-- <UserInfo
      :username="username"
      :sex="sex"
      :picker_date_yangli="picker_date_yangli"
      :picker_date_nongli="picker_date_nongli"
      :gan="gan"
      :zhi="zhi"
    /> -->
    <div class="pay-box">
      <UserInfo
        :username="username"
        :sex="sex"
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
        :is_result="true"
      />
    </div>

    <contentDetail
      v-if="fortune.review2023"
      :result="fortune.review2023"
      :item_index="1"
    />
    <contentDetail
      v-if="fortune.whole"
      :result="fortune.whole"
      :item_index="1"
    />
    <contentDetail
      v-if="advice"
      :result="advice"
      :baoshi_icon="baoshi_icon"
      :item_index="2"
    />
    <contentDetail
      v-if="fortune.taisui2024"
      :result="fortune.taisui2024"
      :item_index="3"
    />
    <contentDetail v-if="fortune.gold2024" :result="fortune" :item_index="4" />
    <contentDetail
      v-if="fortune.career2024"
      :result="fortune.career2024"
      :item_index="5"
    />
    <contentDetail
      v-if="fortune.wealth2024"
      :result="fortune.wealth2024"
      :item_index="6"
    />
    <contentDetail
      v-if="fortune.emotion2024"
      :result="fortune.emotion2024"
      :item_index="7"
    />
    <contentDetail
      v-if="fortune.health2024"
      :result="fortune.health2024"
      :item_index="8"
    />
    <contentDetail
      v-if="fortune.scores2024"
      :result="fortune.scores2024"
      :content_arr="fortune.scores2024content"
      :item_index="9"
    />
    <CopyCode
      :set_title="true"
      title_icon="https://psychicai-static.psychicai.pro/imgs/24044ccbe8a8dcea4ff3b56f8b525ba1f351.png"
      title_icon_style="width:4.2rem;height: .8rem;margin:.29rem auto .5rem;"
      className="year-box"
      tips1_color="#222"
      code_color="#EE5050"
      :transfer_code="fortune.transfer_code"
      codeClass="year-code"
      :code_btn="is_cn ? cn_code_btn : tw_code_btn"
      code_text_style="margin:.3rem auto .39rem;color:#6E6E6E"
      tips5_style="width: 5.19rem;height: 1.03rem;margin-bottom: .3rem;"
      @showModal="code_modal = true"
      a_token="qncisx"
      e_id="10003"
      c_id="-10010"
      e_name="click_2024report_result"
    />

    <CodePop v-if="code_modal" @close="code_modal = false" />
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import {
  getResultAPI,
  resultCheckAPI,
  getBaziAPI,
  checkSendEventApi,
  sendEventApi,
} from '../../../api/api';
import contentDetail from './content_detail.vue';
import utils from '../../../libs/utils.js';
import UserInfo from '../detail/user_info.vue';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import { icon_enums } from '../../../libs/enum';
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import tw_code_btn from '../../../assets/img/mlxz/downloadBtn/tw/year24.webp';
import ResultPopup from '../../../components/ResultPopup.vue'
export default {
  components: { contentDetail, UserInfo, CodePop, CopyCode, ResultPopup },
  data() {
    return {
      loading: false,
      hasData: false,

      fortune: {
        career2024: '',
        emotion2024: '',
        gold2024: '',
        gold2024content: [],
        guide2024color: '',
        guide2024decoration: '',
        guide2024direction: '',
        health2024: '',
        review2023: '',
        taisui2024: '',
        wealth2024: '',
        whole2024: '',
        transfer_code: '',
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
      gan: ['-', '-', '-', '-'],
      zhi: ['-', '-', '-', '-'],
      extra_ce_suan: {},
      baoshi_icon: '',
      nayin: ['-', '-', '-', '-'],
      cai_bo_num: 0,
      gui_ren_num: 0,
      hun_yin_num: 0,
      ming_ge: '',
      riyuanqiangruo: '',
      shi_ye_num: 0,
      wuxingqiang: '',
      code_modal: false,
      cn_code_btn:
        'https://psychicai-static.psychicai.pro/imgs/2404068a187ac69c42f1af1e1d0384bde2e6.png',
      tw_code_btn,
      show_pop_modal: false,//底部引导用户下载遮罩
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
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
      '10003',
      '-10009',
      'page_view_2024report_result',
      'page_view',
      {
        args_name: 'page_view_2024report_result',
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
            '10003',
            '-10017',
            'event_status_2024reportdiscont_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024reportdiscont_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (repay) {
          utils.firebaseLogEvent(
            '10002',
            '-10012',
            'event_status_2024reporthistory_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024reporthistory_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }

        if (!discount_pay && !repay) {
          utils.firebaseLogEvent(
            '10003',
            '-10007',
            'event_status_2024report_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024report_pay_success',
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
            '10003',
            '-10018',
            'event_status_2024reportdiscount_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024reportdiscount_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (repay) {
          utils.firebaseLogEvent(
            '10002',
            '-10021',
            'event_status_2024reporthistory_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024reporthistory_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (!discount_pay && !repay) {
          utils.firebaseLogEvent(
            '10003',
            '-10008',
            'event_status_2024report_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024report_pay_fail',
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
     * @description: 订单结果更新
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
        const product_key = '2024_report';
      }
      localStorage.removeItem('report_price');
      return res.status === 1000 ? 1 : 0;
    },

    /**
     * @description: 订单结果查询
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
     * @description: 结果查询失败时 跳转首页
     * @return {*}
     */
    backNotice() {
      Indicator.close();
      Toast(this.$t('fail-result'));
      setTimeout(() => {
        location.href = 'year_of_lucky_2024.html';
      }, 1000);
    },

    /**
     * @description: 格式化res
     * @param {*} res
     * @return {*}
     */
    renderResult(res) {
      if (res.data.result) {
        this.fortune = res.data.result;
        this.fortune.transfer_code = res.data.transfer_code;
        this.advice.guide2024color = res.data.result.guide2024color;
        this.advice.guide2024decoration = res.data.result.guide2024decoration;
        this.advice.guide2024direction = res.data.result.guide2024direction;
        this.fortune.taisui2024 = this.fortune.taisui2024.replace(
          /\n/g,
          '<br/>'
        );
        this.fortune.review2023 = this.fortune.review2023.replace(
          /\n/g,
          '<br/>'
        );
        this.baoshi_icon = icon_enums.find(
          it =>
            this.advice.guide2024decoration === it.cn_k ||
            this.advice.guide2024decoration === it.tw_k
        ).icon;
      }
      if (res.data.extra_ce_suan) {
        this.extra_ce_suan = res.data.extra_ce_suan;
        this.formateQueryUserInfo();
        this.getUserBazi();
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
      let data_ = {
        year: birth_year,
        month: birth_month,
        day: birth_date,
        hour: birth_hour,
        minute: '0',
        is_gongli: is_gongli,
        leap_month: '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(data_);
      if (status !== 1000) return;
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
      this.cai_bo_num = cai_bo_num;
      this.gui_ren_num = gui_ren_num;
      this.hun_yin_num = hun_yin_num;
      this.ming_ge = ming_ge;
      this.riyuanqiangruo = riyuanqiangruo;
      this.shi_ye_num = shi_ye_num;
      this.wuxingqiang = wuxingqiang;
      this.gan = gan;
      this.zhi = zhi;
      this.nayin = nayin;
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
      } = this.extra_ce_suan;
      this.username = name;
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
  background: #ffaa41;
  padding: 1.05rem 0.2rem 0.3rem;
}
.pay-box {
  width: 7.1rem;
  height: 7.61rem;
  margin-bottom: 0.21rem;
  background: url('https://psychicai-static.psychicai.pro/imgs/24043fd43250af19446888c2b6c6723ebf4f.png')
    no-repeat;
  background-size: 100% 100%;
  padding: 0.01rem 0.01rem 0.4rem;
}

.download-box {
  min-width: 6.9rem;
  min-height: 4.84rem;
  background: url('../../../assets/img/mlxz/year_of_lucky_2024/result_img_bg.webp')
    no-repeat;
  background-size: 100% 100%;
  margin: 0.2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 4.2rem;
    height: 0.8rem;
    margin-top: 0.29rem;
  }
  .logo {
    margin-top: 0.5rem;
    width: 3.05rem;
    height: 0.82rem;
    margin-bottom: 0.32rem;
  }
  .tip {
    height: 0.28rem;
    font-weight: 400;
    font-size: 0.28rem;
    color: #222222;
    line-height: 0.28rem;
    margin-bottom: 0.2rem;
  }
  .code {
    min-width: 4.56rem;
    height: 1.04rem;
    background: url('https://psychicai-static.psychicai.pro/imgs/24045e9023a6becb465f92ee2c83d1d73bd9.png')
      no-repeat;
    background-size: 100% 100%;
    font-weight: 600;
    font-size: 0.32rem;
    color: #ee5050;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    white-space: nowrap;
    padding: 0 0.2rem;
    span {
      margin-left: 0.1rem;
      color: #222222;
      text-decoration: underline;
    }
  }
  .desc {
    margin-bottom: 0.2rem;
    color: #999;
    font-size: 0.24rem;
  }
  .copy {
    width: 5.19rem;
    height: 1.03rem;
    margin-bottom: 0.3rem;
    margin-top: 0.2rem;
  }
}
</style>
