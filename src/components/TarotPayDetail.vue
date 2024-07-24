<template>
  <div class="pay-method">
    <div v-if="!pay_methods.length && loading" class="no-empty">
      <mt-spinner type="fading-circle" :size="60"></mt-spinner>
    </div>
    <div v-else class="pay-list">
      <!-- 老版限时优惠 -->
      <div class="discount">
        <div class="left">
          <img :src="is_new_user ? new_user_icon : xsyh_icon" class="xsyh" alt="" />
          <div class="price-box">
            <div class="now-price">{{ now_price }}</div>
            <div class="origin-price">{{ origin_price }}</div>
          </div>
        </div>
        <div class="right">
          <div class="desc">
            <count-down ref="countDown" :time="time" millisecond class="time-box" @change="getTime">
              <template #default="timeData">
                <span :class="{
                  block: true,
                  'rgb-light': is_show_shandong,
                }">{{ timeData.minutes | filterTime }}</span>
                <span :class="{ colon: true, 'rgb-color': is_show_shandong }">:</span>
                <span :class="{
                  block: true,
                  'rgb-light': is_show_shandong,
                }">{{ timeData.seconds | filterTime }}</span>
                <span :class="{ colon: true, 'rgb-color': is_show_shandong }">:</span>

                <span :class="{
                  block: true,
                  'rgb-light': is_show_shandong,
                }">
                  <span :class="{ mill: time === 1 }">
                    {{ timeData.milliseconds | filterTime }}
                  </span></span>
              </template>
            </count-down>
          </div>
          <div :class="{
            title: true,
            'rgb-color': is_show_shandong,
          }">
            {{ is_show_daoqi ? new_tips1 : tips1 }}
          </div>
        </div>
      </div>



      <div class="pay-type">支付方式</div>

      <!-- 支付方式 -->
      <div class="method-list">
        <div v-for="(it, k) in pay_methods" @click="check_index = k" :key="k" class="item">
          <div class="left">
            <img :src="it.icon" alt="" />
            <div class="name">{{ it.title }}</div>
          </div>
          <img class="right" :src="check_index === k ? checked_icon : no_check_icon" alt="" />
        </div>

      </div>
    </div>




    <div class="buy-desc-container">
      <div class="buy-people">
        已有<span>{{ buy_people }}</span>{{ tips2 }}
      </div>
      <div class="buy-people">
        {{ tips3 }}<span>3815</span>
      </div>
    </div>
    <!--此处引用按钮组件-->
    <div style="display: flex;justify-content: center;">
      <TarotPayBtn :callback="payMoney" :btn_text="btn_text" />
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import {
  getTarotPayMethodsAPI,
  getProductionsAPI,
  payTarotOrderAPI,
  reportEventAPI,
} from '../api/api';
import utils from '../libs/utils';
import { path_enums } from '../libs/enum';
import { CountDown, Toast } from 'vant';
import 'vant/lib/index.css';
import TarotPayBtn from './TarotPayBtn.vue';
import checked_icon from '../assets/img/tarot/checked_icon.webp';
import no_check_icon from '../assets/img/tarot/img_choose1.webp';

import cn_xsyh_icon from '../assets/img/tarot/cn/img_xianshi_cn.webp'; 
import tw_xsyh_icon from '../assets/img/tarot/tw/ceh5_img_youhui_fan.webp';

const e_id_arr = {
  h5_wealth2024: '60001',
  h5_weigh_bone: '60002',
  h5_bai_gua: '60003',
  h5_marriage: '60005',
  h5_annual2024: '60009',
  h5_emotion2024: '60010',
  h5_career2024: '60011',
};

const tipsArr1 = {
  'zh-CN': '优惠倒计时',
  'zh-TW': '優惠倒計時',
};

const newTipsArr1 = {
  'zh-CN': '您的限时优惠即将到期',
  'zh-TW': '您的限時優惠即將到期',
};
const tipsArr2 = {
  'zh-CN': '人购买塔罗占卜咨询',
  'zh-TW': '人購買塔羅占卜咨詢',
};

const tipsArr3 = {
  'zh-CN': '好评人数',
  'zh-TW': '好評人數',
};
const tipsArr4 = {
  'zh-CN': ' 立即解锁内容',
  'zh-TW': ' 立即解鎖內容',
};

const originPriceArr = {
  'zh-CN': '原价 ',
  'zh-TW': '原價 ',
};

const tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...',
};
const tipsArr6 = {
  'zh-CN': '请稍等...',
  'zh-TW': '請稍等...',
};
export default {
  components: {
    CountDown,
    TarotPayBtn,
  },
  data() {
    return {
      tips1: tipsArr1[utils.getLanguage()],
      tips2: tipsArr2[utils.getLanguage()],
      tips3: tipsArr3[utils.getLanguage()],
      tips4: tipsArr4[utils.getLanguage()],
      new_tips1: newTipsArr1[utils.getLanguage()],
      pay_methods: [],
      loading: false,
      cn_xsyh_icon,
      tw_xsyh_icon,
      // xsyh_icon:
      //   'https://psychicai-static.psychicai.pro/imgs/24049b44461fceb64a04b15edd6b2a8bb79e.png',
      new_user_icon:
        'https://psychicai-static.psychicai.pro/imgs/24040fcec5baef7f4fcea5a1eed3552d734e.png',
      time: 15 * 60 * 1000,
      // time: 5 * 1000,
      time_str_1: '',
      time_str_2: '',
      time_str_3: '',
      product: null,
      is_new_user: false, // 是否是新用户
      check_index: 0, //选中支付方式
      checked_icon,
      no_check_icon,
      // no_check_icon:
      //   'https://psychicai-static.psychicai.pro/imgs/2404f091a163349f45d3909f82e4660cc3c6.png',
      start_down: false,
      is_show_shandong: false,
      is_show_daoqi: false,
      payCanClick: false,
      pay_lock_time: 0,
      combine_product_ids: [],//组合下单ID集合，由前端拼接

    };
  },
  props: {
    product_key: {
      type: String,
      default: '',
    },
    pay_modal: {
      type: Boolean,
      default: false,
    },

    e_view_id: {
      type: String,
      default: '',
    },
    c_view_id: {
      type: String,
      default: '',
    },
    e_view_name: {
      type: String,
      default: '',
    },
    a_view_token: {
      type: String,
      default: '',
    },
    e_click_name: {
      type: String,
      default: '',
    },
    c_click_id: {
      type: String,
      default: '',
    },
    a_click_token: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },

  },

  computed: {
    xsyh_icon() {
      if (this.is_cn) {
        return cn_xsyh_icon;
      } else {
        return tw_xsyh_icon;
      }
    },
    btn_text() {
      if (this.is_cn) {
        return `${this.product && this.product.unit || ''}${this.product && this.product.price_str || ''} 真人咨询师解答`
      } else {
        return `${this.product && this.product.unit || ''}${this.product && this.product.price_str || ''} 真人咨詢師解答`
      }
    },
    buy_people() {
      const buyList = {
        h5_marriage: '87',
        h5_wealth2024: '142',
        h5_career2024: '103',
        h5_emotion2024: '98',
        h5_annual2024: '193',
        h5_bai_gua: '146',
        h5_weigh_bone: '138',
        master_tarot: '3854',
      };
      return buyList[this.product_key];
    },
    now_price() {
      return this.product
        ? this.product.unit + ' ' + this.product.price_str
        : '-';
    },
    origin_price() {
      return this.product
        ? originPriceArr[utils.getLanguage()] +
        this.product.unit +
        ' ' +
        this.product.origin_price_str
        : '-';
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    is_show_combination() {
      return ["enjoy01", "panda01"].includes(utils.getFBChannel());
    }
  },
  filters: {
    filterTime(val_) {
      let val = val_.toString();
      if (val.length === 1) {
        return '0' + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    },
  },
  created() {
    // this.time = +localStorage.getItem(`mlxz_count_down_${this.product_key}`);

    this.getProductionList();
    this.getPayMethod();

    utils.firebaseLogEvent(
      this.e_view_id,
      this.c_view_id,
      this.e_view_name,
      'page_view',
      {
        args_name: this.e_view_name,
        channel: utils.getFBChannel(),
      }
    );
  },
  mounted() { },

  methods: {
    getTime(val) {
      // const { minutes, seconds, milliseconds } = val;
      // let time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      // // 是否展示首次挽留弹窗 0 1展示 2不展示  并缓存当前时间用于弹窗倒计时
      // let notice_num = localStorage.getItem(
      //   `mlxz_show_notice_${this.product_key}`
      // );
      // console.log('time_', time_)
      // if (notice_num) {
      //   if (+notice_num === 1) {
      //     localStorage.setItem(`mlxz_count_down_${this.product_key}`, time_);
      //   }
      // } else {
      //   localStorage.setItem(`mlxz_count_down_${this.product_key}`, time_);
      // }
      // localStorage.setItem(`mlxz_fixed_local_order_time`, time_);

      // this.is_show_shandong = time_ < 60 * 1000;
      // this.is_show_daoqi = time_ < 31 * 1000;
      // if (!minutes && !seconds && milliseconds < 10) {
      //   this.time = 0;
      //   this.$refs.countDown.pause();
      //   this.$refs.countDown.reset();
      // }
      
      const { minutes, seconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000;
      // if (this.time) {
      //   localStorage.setItem(`mlxz_count_down_${this.product_key}`, time_ ,);
      // } else {
      //   this.time = 15 * 60 * 1000
      // }
      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
    },

    /**
     * @description: 获取当前商品信息
     * @return {*}
     */
    async getProductionList() {
      this.product = null;
      const { status, data } = await getProductionsAPI('master', true);
      if (status === 1000) {
        this.product = data.find(item => item.product_key === this.product_key);
        //获取所有报告以及套餐
        this.all_product = data;
        this.is_new_user = this.product
          ? this.product.tags
            ? this.product.tags.includes('newcomer_discount')
            : false
          : false;
      }
    },



    /**
     * @description: 获取支付方式列表
     * @return {*}
     */
    async getPayMethod() {
      this.loading = true;
      try {
        const res = await getTarotPayMethodsAPI();
        this.loading = false;
        if (res.status === 1000) {
          this.start_down = true;
          this.pay_methods = res.data;
          // this.pay_methods = [...res.data,...res.data,...res.data];
        }
      } catch (e) {
        this.loading = false;
      }
    },
    isShowBannerSort() {
      let channel = utils.getFBChannel();
      return ['enjoy02', 'panda02'].includes(channel) ? false : true;
    },

    /**
     * @description: 创建订单 支付
     * @return {*}
     */
    async payMoney() {

      //防抖
      if (this.payCanClick) {
        return false
      }
      this.payCanClick = true
      localStorage.removeItem(`mlxz_count_pay_item_${this.product_key}`);
      clearTimeout(this.pay_lock_time)
      this.pay_lock_time = setTimeout(() => {
        this.payCanClick = false
      }, 2000);
      if (utils.isProd()) {
        Indicator.open(tipsArr6[utils.getLanguage()]);
        await utils.checkFB();
        Indicator.close();
        try {
          fbq('track', 'AddToCart');
        } catch (err) {
          console.error('AddToCart error message:', err);
        }
      }


      //购买埋点上报
      utils.firebaseLogEvent(
        this.e_view_id,
        this.c_click_id,
        this.e_click_name,
        'click',
        {
          args_name: this.e_click_name,
          // pay_type: this.pay_methods[this.check_index].title,
          pay_type: this.pay_methods[this.check_index].trade_pay_type,
          channel: utils.getFBChannel(),
        }
      );
      let pick_method = this.pay_methods[this.check_index];
      const { pay_method, trade_pay_type, trade_target_org, fake } = pick_method;
      //假支付
      if (fake) {
        Toast(this.is_cn ? '请选择其他支付方式' : '請選擇其他支付方式')
        return
      }
      // localStorage.setItem('report_price', this.product.price);
      Indicator.open(tipsArr5[utils.getLanguage()]);
      let selected_card_list = JSON.parse(localStorage.getItem('selected_card_list'));
      selected_card_list = selected_card_list.map((item) => {
        return {
          card_key: item.card.card_key, upright: item.upright
        }
      })
      let params = {
        pay_method: pay_method,
        product_key: this.product_key,
        product_id: this.product.product_id,
        combine_product_ids: this.combine_product_ids,
        question: localStorage.getItem('question'),
        question_tarot: {
          array_type: 'timeline',
          ask_type: 'array',
          items: selected_card_list
        },
        platform: 'WEB',
        fb_param: {
          fbc: utils.getcookieInfo('_fbc'),
          fbp: utils.getcookieInfo('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id'),
        }
      };
      // let user_time = this.$route.query.use_fixed_time;

      let discount_pay = this.$route.query.discount_pay || 0;
      let user_time = true;
      let pay_max_params = Object.assign({}, params, {
        trade_pay_type,
        trade_target_org,
      });
      pay_max_params.callback_url = `${location.origin}${location.pathname
        }#/result?path=${path_enums[this.product_key]}&report_price=${this.product && this.product.price ? this.product.price : '19.9'
        }&currency_type=${this.product.currency_type || 'MYR'}`;
      const res = await payTarotOrderAPI(pay_max_params);
      localStorage.removeItem('mlxz_set_event_times');
      Indicator.close();
      if (res.status !== 1000) return;
      if (user_time) {
        localStorage.removeItem('mlxz_fixed_order_info');
        localStorage.removeItem('mlxz_fixed_order_key');
        localStorage.removeItem('mlxz_fixed_local_order_time');
        localStorage.removeItem('mlxz_fixed_api_order_time');
      }
      await utils.asleep(1000);
      location.href = res.data.pay_url;
    },
  },
};
</script>

<style lang="less">
.mint-indicator-wrapper {
  z-index: 1000;
}

.mint-popup {
  background: transparent !important;
}

.v-modal {
  z-index: 3 !important;
}

// .van-count-down {
//   font-family: 'Courier New', Courier, monospace;
// }</style>
<style scoped lang="less">
.pay-method {
  width: 7.02rem;
  margin-bottom: 2rem;
}

.no-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pay-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #201A2F;
  border-radius: 0.16rem;
  margin-top: 0.3rem;
}

.discount {
  width: 100%;
  display: flex;
  align-items: center;

  justify-content: space-between;
  padding: 0 0.14rem;
  margin-top: 0.14rem;

  .left {
    display: flex;
    align-items: center;

    .xsyh {
      width: 0.84rem;
      height: 0.84rem;
      margin-right: 0.2rem;
    }

    .price-box {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      font-weight: 600;

      .now-price {
        height: 0.4rem;
        font-size: 0.4rem;
        color: #FF2937;
        line-height: 0.4rem;
        margin-bottom: 0.1rem;
      }

      .origin-price {
        height: 0.22rem;
        font-size: 0.22rem;
        color: #99999a;
        line-height: 0.22rem;
        text-decoration-line: line-through;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    font-weight: 600;
    font-size: 0.24rem;

    .title {
      height: 0.24rem;
      line-height: 0.24rem;
      color: #FF2937;
    }
  }

  .right div:first-child {
    margin-bottom: 0.08rem;
  }
}



.buy-desc-container {
  width: 7.02rem;
  height: 0.58rem;
  background: #201A2F;
  border-radius: 0.16rem;
  margin-top: 0.24rem;
  margin-bottom: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.16rem;
  padding-right: 0.16rem;

  .buy-people {
    height: 0.26rem;
    font-weight: 400;
    font-size: 0.26rem;
    color: #99999a;
    line-height: 0.26rem;

    span {
      color: #FF2937;
    }
  }
}

.method-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0.14rem;
  width: 100%;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;

    .left {
      display: flex;
      align-items: center;

      img {
        width: 0.48rem;
        height: 0.48rem;
        margin-right: 0.2rem;
      }

      .name {
        height: 0.28rem;
        font-weight: 400;
        font-size: 0.28rem;
        color: #FFFFFF;
        line-height: 0.28rem;
      }
    }

    .right {
      width: 0.36rem;
      height: 0.36rem;
    }
  }
}

.pay-btn {
  width: 6.3rem;
  height: 0.88rem;
  background: #e24c2e;
  border-radius: 0.44rem;
  font-weight: 600;
  font-size: 0.32rem;
  color: #fff;
  line-height: 0.32rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0.2rem;
  left: 0.6rem;
  z-index: 99;

  span {
    margin: 0 0.1rem;
  }
}

.divider-line {
  width: 6.5rem;
  height: 1px;
  background: #000000;
  opacity: 0.13;
  margin: 0.3rem auto;
}

.colon {
  margin: 0 0.02rem;
  display: flex;
  align-items: center;
  color: #e24c2e;
}

.block {
  width: 0.4rem;
  height: 100%;
  font-size: 0.26rem;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #FF2937;
  /* 初始背景色 */
}

.desc {
  display: flex;
  flex-direction: row;
  height: 0.4rem;
}

.count-down {
  height: 100%;
  display: flex;
}

@keyframes noticeTime {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.mill {
  animation: noticeTime 0.24s infinite;
}

@keyframes rgb-light {
  0% {
    background-color: #e24c2e;
  }

  33.333% {
    background-color: #f5ae00;
  }

  66.666% {
    background-color: #662cf3;
  }

  100% {
    background-color: #e24c2e;
  }
}

.rgb-light {
  animation: rgb-light 720ms infinite linear;
}

.rgb-color {
  animation: rgb-text 720ms infinite linear;
}

@keyframes rgb-text {
  0% {
    color: #e24c2e;
  }

  33.333% {
    color: #f5ae00;
  }

  66.666% {
    color: #662cf3;
  }

  100% {
    color: #e24c2e;
  }
}

.pay-type {
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: 0.3rem;
  font-weight: 600;
  font-size: 0.24rem;
  color: #9E99AA;
  line-height: 0.24rem;
  text-align: center;
  margin-top: 0.4rem;
  margin-bottom: 0.32rem;

  display: flex;
}

.pay-type::before,
.pay-type::after {
  content: "";
  width: 0.5rem;
  flex: 1;
  margin: auto;
  border-bottom: 0.01rem dashed #9E99AA;
}

.time-box {
  display: flex;
  flex-direction: row;
  height: 0.4rem;
}
</style>
