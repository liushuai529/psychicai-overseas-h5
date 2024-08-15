<template>
  <div class="result" :class="['result']">
    <ChatCard v-if="is_first" />
    <div class="top" @click="downClick">
      <img :src="is_cn ? cn_img_chat_top_laoshi : tw_img_chat_top_laoshi" />
    </div>
    <div class="bottom" @click="downClick">
      <img :src="bottom_img" />
    </div>
    <div class="content-container">
      <div class="item" v-if="message_show1">
        <img src="../../../assets/img/emotion_fate/img_chat_avatar.webp" />
        <div class="message">
          {{ `您好，${username}，我是本次服务您的xxx老师！` }}
        </div>
      </div>

      <div class="item" v-if="message_show2">
        <img src="../../../assets/img/emotion_fate/img_chat_avatar.webp" />
        <div class="message">
          <span>您的八字信息：</span>
          <span>姓名：{{ username }}</span>
          <span>日期：{{ gongli_nongli ? picker_date_yangli : picker_date_nongli }}</span>
        </div>
      </div>

      <div class="item" v-if="message_show3">
        <img src="../../../assets/img/emotion_fate/img_chat_avatar.webp" />
        <div class="message">
          <div class="title">您的【Ta是你的正缘吗？】真人1v1咨询订单已生成，您可前往【命理寻真】App中进行实时咨询</div>
          <div class="desc">复制邀请码，打开App即可咨询，前往「我的订单」—点击「继续沟通」</div>
          <div class="code">
            <div>邀请码：{{ transfer_code }}</div>
            <div class="copy" @click="handleCopyCode(1)">复制</div>
          </div>
          <img class="logo" :src="logo_img" />
          <div class="btn" @click="downClick(1)">复制邀请码并下载查看</div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
//@ts-ignore
import contentDetail from './content_detail.vue';
import ChatCard from '../../../components/ChatCard.vue'
import utils from '../../../libs/utils.js';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import cn_img_chat_top_laoshi from '../../../assets/img/emotion_fate/cn/img_chat_top_laoshi_cn.webp';
import tw_img_chat_top_laoshi from '../../../assets/img/emotion_fate/tw/img_chat_top_laoshi_tw.webp';

import img_chat_dibu_ios_cn from '../../../assets/img/emotion_fate/cn/img_chat_dibu_ios_cn.webp';
import img_chat_dibu_android_cn from '../../../assets/img/emotion_fate/cn/img_chat_dibu_android_cn.webp';

import img_chat_dibu_ios_tw from '../../../assets/img/emotion_fate/tw/img_chat_dibu_ios_tw.webp';
import img_chat_dibu_android_tw from '../../../assets/img/emotion_fate/tw/img_chat_dibu_android_tw.webp';


import img_popovers_logo_ios_cn from '../../../assets/img/emotion_fate/cn/img_popovers_logo_ios_cn.webp';
import img_popovers_logo_android_cn from '../../../assets/img/emotion_fate/cn/img_popovers_logo_android_cn.webp';

import img_popovers_logo_ios_tw from '../../../assets/img/emotion_fate/tw/img_popovers_logo_ios_tw.webp';
import img_popovers_logo_android_tw from '../../../assets/img/emotion_fate/tw/img_popovers_logo_android_tw.webp';

const lang = utils.getLanguage();
const tips_arr4 = {
  'zh-CN': '复制成功',
  'zh-TW': '複製成功',
};

const show_info = {
  h5_wealth2024: { module: 10005, 'content_id': -10020, 'event_name': 'view_2024wealty_download', type: 'view' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10020, 'event_name': 'view_2024report_download', type: 'view' }, // 2024年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10020, 'event_name': 'view_chenggu_download', type: 'view' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10020, 'event_name': 'view_64gua_download', type: 'view' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10029, 'event_name': 'view_2024lovely_download', type: 'view' }, // 2024年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10031, 'event_name': 'view_marriage_download', type: 'view' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10020, 'event_name': 'view_2024career_download', type: 'view' }, // 2024年事业运势 
  consult_time: { module: 10005, 'content_id': -10020, 'event_name': 'view_2024wealty_download', type: 'view' }, // 2024年财运
}
const copy_info = {
  h5_wealth2024: { module: 10005, 'content_id': -10021, 'event_name': 'click_2024wealty_copy', type: 'click' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10021, 'event_name': 'click_2024report_copy', type: 'click' }, // 2024年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10021, 'event_name': 'click_chenggu_copy', type: 'click' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10021, 'event_name': 'click_64gua_copy', type: 'click' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10030, 'event_name': 'click_2024lovely_copy', type: 'click' }, // 2024年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10032, 'event_name': 'click_marriage_copy', type: 'click' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10021, 'event_name': 'click_2024career_copy', type: 'click' }, // 2024年事业运势 
  consult_time: { module: 10004, 'content_id': -10021, 'event_name': 'click_2024career_copy', type: 'click' }, // 2024年事业运势 
}
const down_info = {
  h5_wealth2024: { module: 10005, 'content_id': -10022, 'event_name': 'click_2024wealty_download', type: 'click' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10022, 'event_name': 'click_2024report_download', type: 'click' }, // 2024年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10022, 'event_name': 'click_chenggu_download', type: 'click' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10022, 'event_name': 'click_64gua_download', type: 'click' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10031, 'event_name': 'click_2024lovely_download', type: 'click' }, // 2024年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10033, 'event_name': 'click_marriage_download', type: 'click' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10022, 'event_name': 'click_2024career_download', type: 'click' }, // 2024年事业运势 
  consult_time: { module: 10004, 'content_id': -10022, 'event_name': 'click_2024career_download', type: 'click' }, // 2024年事业运势 
}

import {
  getFateResultAPI,
  resultCheckAPI,
  getBaziAPI,
  checkSendEventApi,
  sendEventApi,
} from '../../../api/api';
export default {
  components: { contentDetail, ChatCard },
  data() {
    return {
      tips_arr4,
      lang,
      img_popovers_logo_ios_cn,
      img_popovers_logo_android_cn,
      img_popovers_logo_ios_tw,
      img_popovers_logo_android_tw,
      cn_img_chat_top_laoshi,
      tw_img_chat_top_laoshi,
      img_chat_dibu_ios_cn,
      img_chat_dibu_ios_tw,
      img_chat_dibu_android_cn,
      img_chat_dibu_android_tw,



      count: 0,
      status: '',
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
      is_first: false,
      message_show1: false,
      message_show2: false,
      message_show3: false,
      product_key: 'consult_time',

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
      '10006',
      '-10009',
      'page_view_2024lovely_result',
      'page_view',
      {
        args_name: 'page_view_2024lovely_result',
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
    logo_img() {

      if (utils.isIos()) {
        if (utils.getLanguage() === 'zh-CN') {
          return img_popovers_logo_ios_cn;
        } else {
          return img_popovers_logo_ios_tw;
        }
      } else {
        if (utils.getLanguage() === 'zh-CN') {
          return img_popovers_logo_android_cn;
        } else {
          return img_popovers_logo_android_tw;
        }
      }
    },
    bottom_img() {
      if (utils.isIos()) {
        if (utils.getLanguage() === 'zh-CN') {
          return img_chat_dibu_ios_cn;
        } else {
          return img_chat_dibu_ios_tw;
        }
      } else {
        if (utils.getLanguage() === 'zh-CN') {
          return img_chat_dibu_android_cn;
        } else {
          return img_chat_dibu_android_tw;
        }
      }
    },
  },
  watch: {
    is_first(val) {
      console.log('va', val)
      if (val) {
        setTimeout(() => {
          this.message_show1 = true;

        }, 1500);
        setTimeout(() => {
          this.message_show2 = true;
        }, 2900);
        setTimeout(() => {

          this.message_show3 = true;
        }, 4500);
      }
    },
  },
  methods: {
    async handleCopyCode(val) {
      utils.copyText('mlxz-' + this.transfer_code);
      Toast(tips_arr4[lang]);
      if (val === 0) return
      utils.firebaseLogEvent(copy_info[this.product_key]['module'], copy_info[this.product_key]['content_id'], copy_info[this.product_key]['event_name'], copy_info[this.product_key]['type'], {
        args_name: copy_info[this.product_key]['event_name'],
        channel: utils.getFBChannel(),
      });
    },
    downClick(arg) {
      console.log('down_info', down_info)
      utils.firebaseLogEvent(down_info[this.product_key]['module'], down_info[this.product_key]['content_id'], down_info[this.product_key]['event_name'], down_info[this.product_key]['type'], {
        args_name: down_info[this.product_key]['event_name'],
        channel: utils.getFBChannel(),
      });
      if (arg) {
        this.handleCopyCode(0);
      }
      utils.openApp();
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
            '10006',
            '-10024',
            'event_status_2024lovelydiscont_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024lovelydiscont_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (repay) {
          let history_name =
            repay == 3
              ? 'event_status_2024lovelymarriagehistory_pay_success'
              : 'event_status_2024lovelyhistory_pay_success';

          utils.firebaseLogEvent(
            '10002',
            repay == 3 ? '-10032' : '-10013',
            history_name,
            'event_status',
            {
              args_name: history_name,
              channel: utils.getFBChannel(),
            }
          );
        }
        if (!discount_pay && !repay && !combine_product_ids) {
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
        }
        if (combine_product_ids) {
          //成功
          utils.firebaseLogEvent(
            '10006',
            '-10026',
            'event_status_2024lovelymarriage_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024lovelymarriage_pay_success',
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
        if (discount_pay) {
          utils.firebaseLogEvent(
            '10006',
            '-10025',
            'event_status_2024lovelydiscount_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024lovelydiscount_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (repay) {
          let history_name =
            repay == 3
              ? 'event_status_2024lovelymarriagehistory_pay_fail'
              : 'event_status_2024lovelyhistory_pay_fail';
          utils.firebaseLogEvent(
            '10002',
            repay === 3 ? '-10033' : '-10022',
            history_name,
            'event_status',
            {
              args_name: history_name,
              channel: utils.getFBChannel(),
            }
          );
        }
        if (!discount_pay && !repay && !combine_product_ids) {
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
        if (combine_product_ids) {
          //失败
          utils.firebaseLogEvent(
            '10006',
            '-10027',
            'event_status_2024lovelymarriage_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024lovelymarriage_pay_fail',
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
      Indicator.open(this.$t('result-check'));
      getFateResultAPI({ order_id: this.$route.query.order_id }).then(res => {
        if (res.data.order_status === 'PAYED') {
          this.renderResultAndComplete(res);
          this.transfer_code = res.data.transfer_code;
          console.log('aaa', !localStorage.getItem(`emotion_fate_order_${this.order_id}`))
          if (!localStorage.getItem(`emotion_fate_order_${this.order_id}`)) {
            this.is_first = true;
          } else {
            this.message_show1 = true;
            this.message_show2 = true;
            this.message_show3 = true;
          }
          localStorage.setItem(`emotion_fate_order_${this.order_id}`, 1)
        } else if (this.count < 6) {
          if (['PAYED', 'FAIL', 'REFUNDED'].includes(res.data.order_status)) {
            this.backNotice();
            this.status = res.data.order_status;
            return;
          }
          setTimeout(() => {
            this.query();
          }, 1000);
        } else {
          this.backNotice();
        }
        this.status = res.data.order_status;
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
      if (res.data.user_info) {

        this.formateQueryUserInfo(res.data.user_info);
      }


    },

    renderResultAndComplete(res) {
      this.renderResult(res);
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
    formateQueryUserInfo(user_info) {
      let {
        name,
        birth_hour,
        birth_year,
        birth_month,
        birth_date,
        is_gongli,
        sex,
      } = user_info;
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
  // padding: 0.43rem 0.22rem 0.5rem;
  width: 7.5rem;
  // height: 15.36rem;
  min-height: 100vh;
  background-image: url('../../../assets/img/emotion_fate/img_chat_bj.webp');
  // background-repeat: no-repeat;
  background-size: cover;
  padding-top: 2.28rem;
  padding-bottom: 2.68rem;

  // background-color: #ec436b;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 7.5rem;
    height: 1.84rem;

    img {
      width: 7.5rem;
      height: 1.84rem;
    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 7.5rem;
    height: 2.45rem;

    img {
      width: 7.5rem;
      height: 2.45rem;
    }
  }

  .content-container {
    display: flex;
    flex-direction: column;

    .item {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 0.24rem;
      margin-left: 0.24rem;

      img {
        height: 0.74rem;
        width: 0.74rem;
        margin-right: 0.12rem;
      }

      .message {
        display: flex;
        flex-direction: column;
        padding: 0.2rem;
        background: #FFFFFF;
        border-radius: 0.12rem;
        font-weight: 400;
        font-size: 0.28rem;
        color: #3A0922;
        line-height: 0.42rem;
        text-align: left;
        font-style: normal;
        max-width: 6.12rem;

        .title {
          font-weight: 400;
          font-size: 0.28rem;
          color: #3A0922;
          line-height: 0.42rem;
          text-align: left;
          font-style: normal;
          margin-bottom: 0.12rem;
        }

        .desc {
          font-weight: 400;
          font-size: 0.26rem;
          color: #A1969B;
          line-height: 0.39rem;
          text-align: left;
          font-style: normal;
          margin-bottom: 0.2rem;
        }

        .code {
          width: 5.72rem;
          height: 0.82rem;
          background: #F6F6F6;
          border-radius: 0.16rem;
          display: flex;
          justify-content: space-between;
          padding: 0.2rem;
          font-weight: 600;
          font-size: 0.28rem;
          color: #E8302E;
          line-height: 0.42rem;
          text-align: left;
          font-style: normal;
          margin-bottom: 0.2rem;

          .copy {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            font-size: 0.24rem;
            color: #3A0922;
            line-height: 0.36rem;
            text-align: left;
            font-style: normal;
            border-radius: 0.12rem;
            border: 1px solid #3A0922;
            padding: 0.12rem;

          }

        }

        .logo {
          width: 5.72rem;
          height: 0.82rem;
          margin-bottom: 0.2rem;
        }

        .btn {
          width: 5.72rem;
          height: 0.84rem;
          background: linear-gradient(180deg, #F47553 0%, #E92424 99%);
          border-radius: 0.16rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          font-size: 0.3rem;
          color: #FFFCF6;
          line-height: 0.44rem;
          text-align: center;
          font-style: normal;
        }
      }

    }
  }
}
</style>
