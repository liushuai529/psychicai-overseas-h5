<template>
  <div class="pay-item" v-if="last_order"
    :style="{ marginBottom: product_key === 'h5_emotion2024' ? '0.37rem' : '0.24rem' }" @click="pay">
    <div class="pay-contaienr">
      <div class="left">
        <div class="title">{{ is_cn ? '您有待支付订单' : '您有待支付訂單' }}</div>
        <div class="desc">{{ is_cn ? '已根据您的八字信息成功生成「报告」' : '已根據您的八字信息成功生成「報告」' }}</div>
      </div>
      <div class="right">立即支付</div>
    </div>
    <div class="time">
      <div>{{ is_cn ? '请在' : '請在' }}</div>
      <count-down :time="time" @change="getTime" style="margin-left: 5px; margin-right: 5px;" />
      <div>{{ is_cn ? '内完成支付' : '內完成支付' }}</div>
    </div>

  </div>

</template>

<script>
import utils from '../libs/utils';
import { Indicator, Toast } from 'mint-ui';
import { getLastOrderGetAPI } from '../api/api';

import { path_enums } from '../libs/enum';
import { payOrderAPI } from '../api/api';

import { CountDown } from 'vant';

const pay_info = {
  h5_wealth2024: { module: 10005, 'content_id': -10023, 'event_name': 'click_paycardwealty_pay', type: 'click' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10023, 'event_name': 'click_paycardyear_pay', type: 'click' }, // 2024年年运
  h5_annual2025: { module: 10015, 'content_id': -10010, 'event_name': 'click_Year2025_end_wait_pay', type: 'click' }, // 2025年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10023, 'event_name': 'click_paycardchenggu_pay', type: 'click' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10023, 'event_name': 'click_paycard64gua_pay', type: 'click' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10032, 'event_name': 'click_paycardlove_pay', type: 'click' }, // 2024年爱情运势
  h5_emotion2025: { module: 10017, 'content_id': -10010, 'event_name': 'click_LOVE2025_end_wait_pay', type: 'click' }, // 2025年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10034, 'event_name': 'click_paycardmarriage_pay', type: 'click' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10023, 'event_name': 'click_paycardcareer_pay', type: 'click' }, // 2024年事业运势 
}
const modal_info = {
  h5_wealth2024: { module: 10005, 'content_id': -10024, 'event_name': 'page_view_ioswealty_guidance', type: 'page_view' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10024, 'event_name': 'page_view_iosyear_guidance', type: 'page_view' }, // 2024年年运
  h5_annual2025: { module: 10015, 'content_id': -10011, 'event_name': 'page_view_Year2025_end_guidance', type: 'page_view' }, // 2025年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10024, 'event_name': 'page_view_ioschenggu_guidance', type: 'page_view' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10024, 'event_name': 'page_view_ios64gua_guidance', type: 'page_view' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10033, 'event_name': 'page_view_ioslove_guidance', type: 'page_view' }, // 2024年爱情运势
  h5_emotion2025: { module: 10017, 'content_id': -10011, 'event_name': 'page_view_LOVE2025_end_guidance', type: 'page_view' }, // 2025年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10035, 'event_name': 'page_view_iosmarriage_guidance', type: 'page_view' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10024, 'event_name': 'page_view_ioscareer_guidance', type: 'page_view' }, // 2024年事业运势 
}
export default {
  components: {
    CountDown,
  },
  data() {
    return {
      time: localStorage.getItem(`mlxz_count_pay_item_${this.product_key}`) || 30 * 60 * 1000,
      last_order: null,
    };
  },
  props: {
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    },
    show_pay_guide_modal: {
      type: Boolean,
      default: false
    },
  },


  async created() {
    if (!localStorage.getItem(`mlxz_count_pay_item_${this.product_key}`)) {
      localStorage.setItem(`mlxz_count_pay_item_${this.product_key}`, 30 * 60 * 1000);
    }
    this.time = localStorage.getItem(`mlxz_count_pay_item_${this.product_key}`) ? localStorage.getItem(`mlxz_count_pay_item_${this.product_key}`) : 30 * 60 * 1000
    if (this.product_key === 'consult_time') {
      this.$store.dispatch('common/getProduction', 'consult_time');
    } else {
      this.$store.dispatch('common/getProduction');
    }
    const res = await getLastOrderGetAPI(this.product_key);
    if (res.status !== 1000) return;
    if (res.data && res.data.status !== 'PAYED') {
      this.last_order = res.data;
    }
    if (this.last_order) {
      //自动下单
      this.autoPay()
    }
  },
  watch: {
    async show_pay_guide_modal(newVal) {
      if (!newVal) {
        console.log('刷新卡片')
        const res = await getLastOrderGetAPI(this.product_key);
        if (res.status !== 1000) return;
        if (res.data.status !== 'PAYED') {
          this.last_order = res.data;
        } else {
          this.last_order = null;
        }
      }
    }
  },

  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    show() {
      return utils.getFBChannel().indexOf('02') > -1 && this.last_order
    },
    productList() {
      return this.$store.state.common.productList;
    },
    canAutoPay() {
      return !utils.isFBContainer() && localStorage.getItem(`mlxz_outer_visitor_id`) && utils.getQueryStr('timestamp') && !localStorage.getItem(`auto_pay_${utils.getQueryStr('timestamp')}`)
    }
  },
  methods: {
    findSecondIndexOf(str, char) {
      const firstIndex = str.indexOf(char);
      if (firstIndex === -1) {
        return -1; // 字符没有出现，返回-1
      }
      return str.indexOf(char, firstIndex + 1);
    },
    autoPay() {
      if (this.canAutoPay) {
        localStorage.setItem(`auto_pay_${utils.getQueryStr('timestamp')}`, 1)
        this.pay();
      }
    },
    getTime(val) {
      const { minutes, seconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000;
      if (localStorage.getItem(`mlxz_count_pay_item_${this.product_key}`)) {
        localStorage.setItem(`mlxz_count_pay_item_${this.product_key}`, time_);
      } else {
        this.time = 30 * 60 * 1000
      }


    },
    async pay() {
      utils.firebaseLogEvent(pay_info[this.product_key]['module'], pay_info[this.product_key]['content_id'], pay_info[this.product_key]['event_name'], pay_info[this.product_key]['type'], {
        channel: utils.getFBChannel(),
        container: utils.isFBContainer() ? 'fb' : 'web'
      });
      if (utils.isFBContainer()) {
        this.$emit('show_modal', true)
        if (!utils.getQueryStr('mlxz_outer_visitor_id')) {
          location.href += `&mlxz_outer_open_uid=${localStorage.getItem('mlxz_outer_open_uid')}&mlxz_outer_access_token=${localStorage.getItem('mlxz_outer_access_token')}&mlxz_outer_visitor_id=${localStorage.getItem('mlxz_outer_visitor_id')}&_fbc=${localStorage.getItem('_fbc')}&_fbp=${localStorage.getItem('_fbp')}&timestamp=${new Date().getTime()}`
        }
        utils.firebaseLogEvent(modal_info[this.product_key]['module'], modal_info[this.product_key]['content_id'], modal_info[this.product_key]['event_name'], modal_info[this.product_key]['type'], {
          channel: utils.getFBChannel(),
          os: utils.isAndroid() ? 'android' : 'ios'
        });
        return
      }
      Indicator.open('订单创建中');
      const {
        payment,
        pay_method,
        product_key,
        product_id,
        ext,
        trade_pay_type,
        trade_currency,
        trade_target_org,
        combine_product_ids,
      } = this.last_order;
      let url = path_enums[product_key];

      if (combine_product_ids && combine_product_ids.length) {
        let length_ = combine_product_ids.length;
        let params_combine = {
          pay_method,
          product_key,
          product_id,
          platform: 'WEB',
          extra_ce_suan: {},
          trade_pay_type,
          trade_target_org,
          combine_product_ids: combine_product_ids,
          fb_param: {
            fbc: utils.getcookieInfo('_fbc'),
            fbp: utils.getcookieInfo('_fbp'),
            external_id: localStorage.getItem('mlxz_outer_visitor_id'),
          },
        };
        if (utils.getLocalStorage('google_client_id')) {
          params_combine = Object.assign({}, params_combine, {
            ga_param: {
              client_id: utils.getLocalStorage('google_client_id')
            },
          });
        }
        if (utils.getLocalStorage('ttclid') || utils.getcookieInfo('_ttp')) {
          pay_max_params = Object.assign({}, pay_max_params, {
            tt_param: {
              ttclid: utils.getLocalStorage('ttclid'),
              ttp: utils.getcookieInfo('_ttp'),
              page_url: location.href,
            },
          });
        }
        if (product_key === 'h5_combo2_attach') {
          let same_product = this.productList.find(
            item => item.product_id === combine_product_ids[0]
          );
          const back_url = path_enums[same_product.product_key];
          params_combine.extra_ce_suan = ext;
          params_combine.callback_url = `${location.origin
            }/${utils.getFBChannel()}/${back_url}.html#/result?path=${path_enums[same_product.product_key]
            }&report_price=${payment}&repay=3&product_id=${product_id}`;
        } else {
          params_combine.callback_url =
            location.origin +
            `/${utils.getFBChannel()}/` +
            'index.html' +
            '?pay_index=' +
            length_ +
            '&report_price=' +
            payment +
            '&repay=1' + '&product_id=' + product_id;
        }

        const res_combine = await payOrderAPI(params_combine);
        Indicator.close();

        if (res_combine.status !== 1000) return;
        localStorage.setItem('mlxz_reload_page_history', 1);

        location.href = res_combine.data.pay_url;
        // 组合下单结束
        return;
      }

      let params = {
        pay_method,
        product_key,
        product_id,
        platform: 'WEB',
        extra_ce_suan: ext,
        trade_pay_type,
        trade_target_org,
        fb_param: {
          fbc: utils.getcookieInfo('_fbc'),
          fbp: utils.getcookieInfo('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id'),
        },
      };
      if (localStorage.getItem('google_client_id')) {
        params = Object.assign({}, params, {
          ga_param: {
            client_id: localStorage.getItem('google_client_id')
          },
        });
      }

      params.callback_url = `${location.origin
        }/${utils.getFBChannel()}/${url}.html#/result?path=${path_enums[product_key]
        }&report_price=${payment}&repay=1&currency_type=${trade_currency || 'MYR'}&product_id=${product_id}`;
      const res = await payOrderAPI(params);

      Indicator.close();

      if (res.status !== 1000) return;


      location.href = res.data.pay_url;
    }
  }
}
</script>

<style lang="less">
.pay-item {
  width: 7.1rem;
  height: 2.04rem;
  background: linear-gradient(180deg, #FDFAEC 0%, #FFF5D8 100%);
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0.24rem;
  padding-right: 0.24rem;
  padding-top: 0.15rem;
  padding-bottom: 0.24rem;
  margin-bottom: 0.24rem;
  animation: btnMove 0.5s infinite ease-in-out alternate;

  .pay-contaienr {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      flex-direction: column;

      .title {
        font-weight: 600;
        font-size: 0.36rem;
        color: #602E03;
        line-height: 0.54rem;
        text-align: left;
        font-style: normal;
      }

      .desc {
        font-weight: 400;
        font-size: 0.26rem;
        color: #602E03;
        line-height: 0.39rem;
        text-align: left;
        font-style: normal;
      }
    }

    .right {
      width: 1.68rem;
      height: 0.74rem;
      background: linear-gradient(180deg, #F47553 0%, #E92424 99%);
      border-radius: 0.2rem;
      border: 0.02rem solid #FFFBED;
      font-weight: 600;
      font-size: 0.3rem;
      color: #FFFAEE;
      line-height: 0.3rem;
      text-align: left;
      font-style: normal;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .time {
    width: 6.62rem;
    height: 0.5rem;
    background: #FFF2CF;
    border-radius: 0.12rem;
    border: 0.01rem solid #F6B87E;
    margin-top: 0.18rem;
    font-weight: 600;
    font-size: 0.26rem;
    color: #E24C2E;
    line-height: 0.26rem;
    text-align: right;
    font-style: normal;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .van-count-down {
    font-weight: 600;
    font-size: 0.26rem;
    color: #E24C2E;
    line-height: 0.26rem;
  }
}
</style>
