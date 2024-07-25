<template>
  <div class="pay-item" v-show="show" @click="pay">
    <div class="pay-contaienr">
      <div class="left">
        <div class="title">{{ is_cn ? '您有待支付订单' : '您有待支付訂單' }}</div>
        <div class="desc">{{ is_cn ? '真人塔罗咨询师在线为您答疑' : '真人塔羅咨詢師在線為您答疑' }}</div>
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
import { getTarotLastOrderGetAPI } from '../api/api';

import { path_enums } from '../libs/enum';
import { payTarotOrderAPI } from '../api/api';

import { CountDown } from 'vant';

const pay_info = {
  master_tarot: { module: 10010, 'content_id': -10019, 'event_name': 'click_paycardtarot_pay', type: 'click' }, // 塔罗
}
const modal_info = {
  master_tarot: { module: 10005, 'content_id': -10024, 'event_name': 'page_view_ioswealty_guidance', type: 'page_view' }, // 2024年财运

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
      default: 'master_tarot'
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
    this.$store.dispatch('common/getTarotProduction');
    const res = await getTarotLastOrderGetAPI(this.product_key);
    if (res.status !== 1000) return;
    console.log('res.data', res.data)
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
        const res = await getTarotLastOrderGetAPI(this.product_key);
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
      return this.last_order
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
      if (localStorage.getItem(`mlxz_count_pay_item_${this.product_key}`)) {
        localStorage.setItem(`mlxz_count_pay_item_${this.product_key}`, time_);
      } else {
        this.time = 30 * 60 * 1000
      }
    },
    async pay() {
      utils.firebaseLogEvent(pay_info[this.product_key]['module'], pay_info[this.product_key]['content_id'], pay_info[this.product_key]['event_name'], pay_info[this.product_key]['type'], {
        args_name: pay_info[this.product_key]['event_name'],
        channel: utils.getFBChannel(),
        container: utils.isFBContainer() ? 'fb' : 'web'
      });
      
      if (utils.isFBContainer()) {
        this.$emit('show_modal', true)
        if (!utils.getQueryStr('mlxz_outer_visitor_id')) {
          location.href += `&mlxz_outer_open_uid=${localStorage.getItem('mlxz_outer_open_uid')}&mlxz_outer_access_token=${localStorage.getItem('mlxz_outer_access_token')}&mlxz_outer_visitor_id=${localStorage.getItem('mlxz_outer_visitor_id')}&question=${encodeURIComponent(localStorage.getItem('question'))}&selected_card_list=${encodeURIComponent(localStorage.getItem('selected_card_list'))} &_fbc=${localStorage.getItem('_fbc')}&_fbp=${localStorage.getItem('_fbp')}&timestamp=${new Date().getTime()}` 
        }
        // utils.firebaseLogEvent(modal_info[this.product_key]['module'], modal_info[this.product_key]['content_id'], modal_info[this.product_key]['event_name'], modal_info[this.product_key]['type'], {
        //   args_name: modal_info[this.product_key]['event_name'],
        //   channel: utils.getFBChannel(),
        //   os: utils.isAndroid() ? 'android' : 'ios'
        // });
        return
      }
      Indicator.open('订单创建中');
      const {
        order_status,
        payment,
        pay_method,
        product_key,
        product_id,
        trade_pay_type,
        trade_target_org,
        question,
        tarot,
      } = this.last_order;
      let url = path_enums[product_key];
      let selected_card_list = JSON.parse(localStorage.getItem('selected_card_list'));
      selected_card_list = selected_card_list.map((item) => {
        return {
          card_key: item.card.card_key, upright: item.upright
        }
      })
      let params = {
        pay_method,
        product_key,
        product_id,
        platform: 'WEB',
        trade_pay_type,
        trade_target_org,
        question: question,
        question_tarot: {
          array_type: 'timeline',
          ask_type: 'array',
          items: tarot.items
        },
        fb_param: {
          fbc: utils.getcookieInfo('_fbc'),
          fbp: utils.getcookieInfo('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id'),
        },
      };
      params.callback_url = `${location.origin
        }/${utils.getFBChannel()}/${url}.html#/result?path=${path_enums[product_key]
        }&report_price=${payment}`;
      const res = await payTarotOrderAPI(params);

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
  background: linear-gradient(180deg, #F7ECFD 0%, #EED0FF 100%);
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0.24rem;
  padding-right: 0.24rem;
  padding-top: 0.15rem;
  padding-bottom: 0.24rem;
  margin-top: 0.3rem;
  // margin-bottom: 0.3rem;
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
        color: #531C8D;
        line-height: 0.54rem;
        text-align: left;
        font-style: normal;
      }

      .desc {
        font-weight: 400;
        font-size: 0.26rem;
        color: #531C8D;
        line-height: 0.39rem;
        text-align: left;
        font-style: normal;
      }
    }

    .right {
      width: 1.68rem;
      height: 0.74rem;
      background: linear-gradient(180deg, #A136DE 0%, #5C15AC 100%);
      border-radius: 0.2rem;
      border: 0.02rem solid #E585FF;
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
    background: #F4E2FE;
    border-radius: 0.12rem;
    border: 0.01rem solid #E6B6FF;
    margin-top: 0.18rem;
    font-weight: 600;
    font-size: 0.26rem;
    color: #FF2937;
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
