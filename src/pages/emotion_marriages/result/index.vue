<template>
  <div class="result" :class="['result']">
    <ChatCard  :transfer_code="transfer_code" sub_type="life_marriages"/>
    <div class="top" @click="downClick">
      <img :src="is_cn ? cn_img_chat_top_laoshi : tw_img_chat_top_laoshi" />
    </div>
    <div class="bottom" @click="downClick">
      <img :src="bottom_img" />
    </div>
    <div class="content-container">
      <div class="item" v-if="message_show1">
        <img src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="message">
          {{ `您好，${username}，${is_cn ? '我是本次服务您的老师！' : '我是本次服務您的老師！'}` }}
        </div>
      </div>

      <div class="item" v-if="message_show2">
        <img src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="message">
          <span>您的八字信息：</span>
          <span>姓名：{{ username }}</span>
          <span>日期：{{ gongli_nongli ? picker_date_yangli : picker_date_nongli }}</span>
        </div>
      </div>

      <div class="item" v-if="message_show3">
        <img src="../../../assets/img/emotion_marriages/hunyin_img_chat_avatar.webp" />
        <div class="message">
          <div class="title">{{ get_card_title}}</div>
          <div class="desc">{{ is_cn ? '复制邀请码，打开App即可咨询，前往「我的订单」—点击「继续沟通」' : '復製邀請碼，打開App即可咨詢，前往「我的訂單」—點擊「繼續溝通」' }}</div>
          <div class="code">
            <div>{{ `${is_cn ? '邀请码：' : '邀請碼：'}${transfer_code}` }}</div>
            <div class="copy" @click="handleCopyCode(1)">{{ is_cn ? '复制' : '復製' }}</div>
          </div>
          <img class="logo" :src="logo_img" />
          <div class="btn" @click="downClick(1)">{{ is_cn ? '复制邀请码并下载查看' : '復製邀請碼並下載查看' }}</div>
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
import cn_img_chat_top_laoshi from '../../../assets/img/emotion_marriages/cn/hunyin_img_chat_top_laoshi_cn.webp';
import tw_img_chat_top_laoshi from '../../../assets/img/emotion_marriages/tw/hunyin_img_chat_top_laoshi_tw.webp';

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

const copy_info = {
  consult_time: { module: 10012, 'content_id': -10012, 'event_name': 'click_marriages_copy', type: 'click' },
}
const down_info = {
  consult_time: { module: 10012, 'content_id': -10014, 'event_name': 'click_marriages_result', type: 'click' },
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
      duration_time: {
        entry_time: 0,
        exit_time: 0,
      }

    };
  },
  created() {

    // localStorage.removeItem('mlxz_fixed_order_info');
    // localStorage.removeItem('mlxz_fixed_order_key');
    // localStorage.removeItem('mlxz_fixed_local_order_time');
    // localStorage.removeItem('mlxz_fixed_api_order_time');
  },
  async mounted() {
    this.duration_time.entry_time = new Date().getTime()
    this.order_id = this.$route.query.id || this.$route.query.order_id;
    window.scrollTo(0, 0);
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '已进入结果页',
    });

    utils.firebaseLogEvent(
      '10012',
      '-10010',
      'page_view_marriages_chatpage',
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

  destroyed() {
    this.duration_time.exit_time = new Date().getTime();
    if (this.duration_time.entry_time) {
      utils.firebaseLogEvent(
        '10012',
        '-10011',
        'view_marriages_chatpage_duration',
        'view',
        {
          channel: utils.getFBChannel(),
          time: (this.duration_time.entry_time - this.duration_time.exit_time)/1000
        }
      );
    }
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
    get_card_title() {
      let app_name;
      if (utils.isIos()) {
        if (utils.getLanguage() === 'zh-CN') {
          app_name = '寻真';
        } else {
          app_name = '尋真';
        }
      } else {
        if (utils.getLanguage() === 'zh-CN') {
          app_name = '命理寻真';
        } else {
          app_name = '命理尋真';
        }
      } 
      return utils.getLanguage() === 'zh-CN'? `您的【你一生有几段婚姻】真人1v1咨询订单已生成，您可前往【${app_name}】App中进行实时咨询`: `您的【你一生有幾段婚姻】真人1v1咨詢訂單已生成，您可前往【${app_name}】App中進行實時咨詢`
    }
  },
  watch: {
    is_first(val) {
      console.log('va', val)
      if (val) {
        setTimeout(() => {
          this.message_show1 = true;

        }, 6500);
        setTimeout(() => {
          this.message_show2 = true;
        }, 7900);
        setTimeout(() => {

          this.message_show3 = true;
        }, 9500);
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


        utils.firebaseLogEvent(
          '10012',
          '-10008',
          'event_status_marriages_pay_success',
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
          await utils.checkFB();
          try {
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: '开始上报FB埋点，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: currency_type,
              mlxz_order_status: report_status,
            });
            // fbq('track', 'Purchase', {
            //   value: report_price.toFixed(2),
            //   currency: currency_type,
            // }, { eventID: this.order_id });
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
          '10012',
          '-10009',
          'event_status_marriages_pay_fail',
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
        let querystring = localStorage.getItem('_emotion_fate_info');
        let path = 'detail?querystring=' + querystring;
        this.$router.push({ path });
        // location.href = 'emotion_fate.html';
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
