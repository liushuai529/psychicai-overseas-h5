<template>
  <div class="pay-item" v-if="last_order" @click="pay">
    <div class="pay-contaienr">
      <div class="left">
        <div class="title">{{ is_cn ? '您有待支付订单' : '您有待支付訂單' }}</div>
        <div class="desc">{{ is_cn ? '已根据您的八字信息成功生成「咨询订单」' : '已根據您的八字信息成功生成「咨詢訂單」' }}</div>
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
import { getFateLastOrderGetAPI, payFateOrderAPI } from '../api/api';

import { path_enums } from '../libs/enum';

import { CountDown } from 'vant';

const pay_info = {
  consult_time_life_marriages: { module: 10012, 'content_id': -10015, 'event_name': 'click_marriages_wait_pay', type: 'click' },
  consult_time_fu_he: { module: 10013, 'content_id': -10014, 'event_name': 'click_complex_wait_pay', type: 'click' },
  consult_time_yuan_jin: { module: 10014, 'content_id': -10015, 'event_name': 'click_fate_end_wait_pay', type: 'click' },
  consult_time_zhuan_chang: { module: 10016, 'content_id': -10017, 'event_name': 'click_love_voice_wait_pay', type: 'click' },
}
const modal_info = {
  consult_time_life_marriages: { module: 10012, 'content_id': -10016, 'event_name': 'page_view_marriages_guidance', type: 'page_view' },
  consult_time_fu_he: { module: 10013, 'content_id': -10015, 'event_name': 'page_view_complex_guidance', type: 'page_view' },
  consult_time_yuan_jin: { module: 10014, 'content_id': -10016, 'event_name': 'page_view_fate_end_guidance', type: 'page_view' },
  consult_time_zhuan_chang: { module: 10016, 'content_id': -10018, 'event_name': 'page_view_love_voice_guidance', type: 'page_view' },
  
}
export default {
  components: {
    CountDown,
  },
  data() {
    return {
      time: localStorage.getItem(`mlxz_count_pay_item_${this.product_key}_${this.sub_type}`) || 30 * 60 * 1000,
      last_order: null,
    };
  },
  props: {
    product_key: {
      type: String,
      default: 'consult_time'
    },
    sub_type: {
      type: String,
    },
    show_pay_guide_modal: {
      type: Boolean,
      default: false
    },
  },


  async created() {
    if (!localStorage.getItem(`mlxz_count_pay_item_${this.product_key}_${this.sub_type}`)) {
        localStorage.setItem(`mlxz_count_pay_item_${this.product_key}_${this.sub_type}`, 30 * 60 * 1000);
      }
      this.time = localStorage.getItem(`mlxz_count_pay_item_${this.product_key}_${this.sub_type}`) ? localStorage.getItem(`mlxz_count_pay_item_${this.product_key}_${this.sub_type}`) : 30 * 60 * 1000
    
    if (this.product_key === 'consult_time') {
      this.$store.dispatch('common/getProduction', 'consult_time');
    } else {
      this.$store.dispatch('common/getProduction');
    }
    const res = await getFateLastOrderGetAPI(this.product_key, this.sub_type);
    if (res.status !== 1000) return;
    if (res.data && res.data.order_status !== 'PAYED') {
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
        const res = await getFateLastOrderGetAPI(this.product_key, this.sub_type);
        if (res.status !== 1000) return;
        if (res.data.order_status !== 'PAYED') {
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
    autoPay() {
      if (this.canAutoPay) {
        localStorage.setItem(`auto_pay_${utils.getQueryStr('timestamp')}`, 1)
        this.pay();
      }
    },
    getTime(val) {
      const { minutes, seconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000;
      let new_product_key = this.product_key+'_'+this.sub_type
      if (localStorage.getItem(`mlxz_count_pay_item_${new_product_key}`)) {
        localStorage.setItem(`mlxz_count_pay_item_${new_product_key}`, time_);
      } else {
        this.time = 30 * 60 * 1000
      }


    },
    async pay() {
      utils.firebaseLogEvent(pay_info[this.product_key+'_'+this.sub_type]['module'], pay_info[this.product_key+'_'+this.sub_type]['content_id'], pay_info[this.product_key+'_'+this.sub_type]['event_name'], pay_info[this.product_key+'_'+this.sub_type]['type'], {
        channel: utils.getFBChannel(),
        container: utils.isFBContainer() ? 'fb' : 'web'
      });
      if (utils.isFBContainer()) {
        this.$emit('show_modal', true)
        if (!utils.getQueryStr('mlxz_outer_visitor_id')) {
          location.href += `&mlxz_outer_open_uid=${localStorage.getItem('mlxz_outer_open_uid')}&mlxz_outer_access_token=${localStorage.getItem('mlxz_outer_access_token')}&mlxz_outer_visitor_id=${localStorage.getItem('mlxz_outer_visitor_id')}&current_country=${localStorage.getItem('current_country')}&_fbc=${localStorage.getItem('_fbc')}&_fbp=${localStorage.getItem('_fbp')}&timestamp=${new Date().getTime()}`
        }
        utils.firebaseLogEvent(modal_info[this.product_key+'_'+this.sub_type]['module'], modal_info[this.product_key+'_'+this.sub_type]['content_id'], modal_info[this.product_key+'_'+this.sub_type]['event_name'], modal_info[this.product_key+'_'+this.sub_type]['type'], {
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
        trade_pay_type,
        trade_currency,
        trade_target_org,
        user_info,
      } = this.last_order;
      let url = 'emotion_marriages';
      if(this.sub_type === 'fu_he') {
        url = 'emotion_remarriage';
      } else if(this.sub_type === 'yuan_jin') {
        url = 'emotion_end';
      } else if(this.sub_type === 'zhuan_chang') {
        url = 'emotion_voice';
      } 
      let params = {
        pay_method,
        product_key,
        product_id,
        platform: 'WEB',
        trade_pay_type,
        trade_target_org,
        fb_param: {
          fbc: utils.getcookieInfo('_fbc'),
          fbp: utils.getcookieInfo('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id'),
        },
        consult_time: {
          user_info: user_info
        },
        product_sub_type: this.sub_type,

      };

      params.callback_url = `${location.origin
        }/${utils.getFBChannel()}/${url}.html#/result?path=${url}&report_price=${payment}&repay=1&currency_type=${trade_currency || 'MYR'}&product_id=${product_id}`;
      const res = await payFateOrderAPI(params);

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
  background: linear-gradient( 180deg, #FDFAEC 0%, #FFF5D8 100%);
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
        color: rgba(96,46,3,0.7);
        line-height: 0.39rem;
        text-align: left;
        font-style: normal;
      }
    }

    .right {
      width: 1.68rem;
      height: 0.74rem;
      background: linear-gradient( 180deg, #F47553 0%, #E92424 100%);
      border-radius: 0.2rem;
      border: 0.02rem solid #FFCC97;
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
