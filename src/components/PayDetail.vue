<template>
  <div :class="className">
    <div v-if="!pay_methods.length && loading" class="no-empty">
      <mt-spinner type="fading-circle" :size="60"></mt-spinner>
    </div>
    <div v-else class="pay-list">
      <!-- 老版限时优惠 -->
      <div class="discount" v-if="!is_show_combination">
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

      <div class="discount-comb" v-else>
        <GroupPurchase :product=product :h5_combo2_attach=h5_combo2_attach :all_product=all_product
          @get_combine_product_ids="getCombineProductIds" :product_key=product_key :currentIndex=0 />

      </div>







      <div class="divider-line"></div>

      <div class="pay-type">支付方式</div>
      <div class="buy-people">
        今日已有<span>{{ buy_people }}</span>{{ tips2 }}
      </div>
      <!-- 支付方式 -->
      <div class="method-list">
        <div v-for="(it, k) in pay_methods" @click="check_index = k" :key="k" class="item">
          <div class="left">
            <img :src="it.icon" alt="" />
            <div class="name">{{ it.title }}</div>
          </div>
          <img class="right" :src="check_index === k ? checked_icon : no_check_icon" alt="" />
        </div>
        <!--此处引用按钮组件-->
        <PayBtn v-if="product_key !== 'consult_time'" :product_key="product_key" :callback="payMoney" />
        <ConsultPayBtn v-else :product_key="product_key" :callback="payMoney" />
      </div>


    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import {
  getPayMethodsAPI,
  getProductionsAPI,
  payOrderAPI,
  payFateOrderAPI,
  reportEventAPI,
} from '../api/api';
import utils from '../libs/utils';
import { path_enums } from '../libs/enum';
import { CountDown, Toast } from 'vant';
import 'vant/lib/index.css';
import GroupPurchase from '../components/GroupPurchase.vue';
import PayBtn from '../components/PayBtn.vue';
import ConsultPayBtn from './ConsultPayBtn.vue';


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
  'zh-CN': '人购买当前报告',
  'zh-TW': '人購買當前報告',
};

const tipsArr3 = {
  'zh-CN': '结缘价 ',
  'zh-TW': '結緣價 ',
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
    GroupPurchase,
    PayBtn,
    ConsultPayBtn,
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
      xsyh_icon:
        'https://psychicai-static.psychicai.pro/imgs/24049b44461fceb64a04b15edd6b2a8bb79e.png',
      new_user_icon:
        'https://psychicai-static.psychicai.pro/imgs/24040fcec5baef7f4fcea5a1eed3552d734e.png',
      time: 0,
      // time: 5 * 1000,
      time_str_1: '',
      time_str_2: '',
      time_str_3: '',
      product: null,
      is_new_user: false, // 是否是新用户
      check_index: 0, //选中支付方式
      checked_icon:
        'https://psychicai-static.psychicai.pro/imgs/24048e756ae2d40f436184b0bc8018199fbb.png',
      no_check_icon:
        'https://psychicai-static.psychicai.pro/imgs/2404f091a163349f45d3909f82e4660cc3c6.png',
      start_down: false,
      is_show_shandong: false,
      is_show_daoqi: false,
      payCanClick: false,
      pay_lock_time: 0,
      h5_combo2_attach: undefined,//组合下单信息
      combine_product_ids: [],//组合下单ID集合，由前端拼接

      all_product: [],//所有测算报告、组合优惠
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
    query_user_string: {
      default: '',
      type: String,
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
    consult_time: {
      type: Object,
      default: null,
    }

  },

  computed: {
    buy_people() {
      const buyList = {
        h5_marriage: '87',
        h5_wealth2024: '142',
        h5_career2024: '103',
        h5_emotion2024: '98',
        h5_annual2024: '193',
        h5_bai_gua: '146',
        h5_weigh_bone: '138',
        consult_time: '138',
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
    // 首次挽留的弹窗计时
    let use_fixed_time = this.$route.query.use_fixed_time;
    if (use_fixed_time) {
      this.time = +localStorage.getItem(`mlxz_fixed_local_order_time`);
      localStorage.removeItem('mlxz_fixed_local_order_time');
    } else {
      this.time = 15 * 60 * 1000;
    }


    this.getProductionList();

    this.getPayMethod();

    if (this.c_view_id) {
      utils.firebaseLogEvent(
        this.e_view_id,
        this.c_view_id,
        this.e_view_name,
        'view',
        {
          args_name: this.e_view_name,
          channel: utils.getFBChannel(),
        }
      );
    }



  },
  mounted() { },

  methods: {
    getCombineProductIds(product_ids) {
      this.combine_product_ids = product_ids;
      console.warn('this.combine_product_ids', this.combine_product_ids);
    },
    getTime(val) {
      const { minutes, seconds, milliseconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      // 是否展示首次挽留弹窗 0 1展示 2不展示  并缓存当前时间用于弹窗倒计时
      let notice_num = localStorage.getItem(
        `mlxz_show_notice_${this.product_key}`
      );
      if (notice_num) {
        if (+notice_num === 1) {
          localStorage.setItem(`mlxz_count_down_${this.product_key}`, time_);
        }
      } else {
        localStorage.setItem(`mlxz_count_down_${this.product_key}`, time_);
      }
      localStorage.setItem(`mlxz_fixed_local_order_time`, time_);

      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time = 0;
        this.$refs.countDown.pause();
        this.$refs.countDown.reset();
      }
    },


    /**
     * @description: 获取当前商品信息
     * @return {*}
     */
    async getProductionList() {
      this.product = null;
      let productGroup = 'ceh5';
      if (this.product_key === 'consult_time') {
        productGroup = 'consult_time'
      }
      const { status, data } = await getProductionsAPI(productGroup);
      if (status === 1000) {
        this.product = data.find(item => item.product_key === this.product_key);
        //获取所有报告以及套餐
        this.all_product = data;
        //组合两项优惠
        this.h5_combo2_attach = data.find(item => item.product_key === 'h5_combo2_attach');

        this.is_new_user = this.getNewUser();
      }
    },
    getNewUser() {
      //Ternary operators should not be nested 三元运算符不应嵌套
      if (this.product) {
        if (this.product.tags) {
          return this.product.tags.includes('newcomer_discount')
        } else {
          return false
        }
      } else {
        return false
      }
    },
    /**
     * @description: 获取支付方式列表
     * @return {*}
     */
    async getPayMethod() {
      this.loading = true;
      try {
        const res = await getPayMethodsAPI();
        this.loading = false;
        if (res.status === 1000) {
          this.start_down = true;
          this.pay_methods = res.data;
        }
      } catch (e) {
        this.loading = false;
      }
    },
    isShowBannerSort() {
      let channel = utils.getFBChannel();
      return ['enjoy02', 'panda02'].includes(channel) ? false : true;
    },
    // 事件排序
    async logEventForSort(it) {
      if (!this.isShowBannerSort()) return;
      try {
        const res = await reportEventAPI({
          event_name: it.e_name,
          product_id: it.product_id,
        });
        if (res.status !== 1000) return;
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * @description: 创建订单 支付
     * @return {*}
     */
    async payMoney() {
      if (this.all_product.length === 0) return
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

        Indicator.close();
        try {
          fbq && fbq('track', 'AddToCart', {
            value: this.product.price.toFixed(2),
            currency: this.product.currency_type || 'MYR',
          });
        } catch (err) {
          console.error('AddToCart error message:', err);
        }
        utils.getFBChannel().indexOf('google')> -1 && gtag && gtag("event", "add_to_cart", {
          value: this.product.price.toFixed(2),
          currency: this.product.currency_type || 'MYR',
          items: [
            {
              item_id: this.product.product_id,
            }
          ]
        });
      }

      this.logEventForSort({
        e_name: 'pay_click',
        product_id: this.product.product_id,
      });
      //组合套餐购买埋点上报
      if (this.combine_product_ids.length) {
        utils.firebaseLogEvent(
          this.product_key === 'h5_emotion2024' ? 10006 : 10007,
          this.product_key === 'h5_emotion2024' ? -10028 : -10030,
          this.product_key === 'h5_emotion2024' ? 'click_2024lovelymarriage_pay' : 'click_marriage2024lovely_pay',
          'click',
          {
            args_name: this.product_key === 'h5_emotion2024' ? 'click_2024lovelymarriage_pay' : 'click_marriage2024lovely_pay',
            pay_type: this.pay_methods[this.check_index].title,
            channel: utils.getFBChannel(),
          }
        );
      } else {
        utils.firebaseLogEvent(
          this.e_view_id,
          this.c_click_id,
          this.e_click_name,
          'click',
          {
            args_name: this.e_click_name,
            pay_type: this.pay_methods[this.check_index].title,
            channel: utils.getFBChannel(),
          }
        );
      }
      let pick_method = this.pay_methods[this.check_index];
      const { pay_method, trade_pay_type, trade_target_org, fake } = pick_method;
      //假支付
      if (fake) {
        Toast(this.is_cn ? '请选择其他支付方式' : '請選擇其他支付方式')
        return
      }
      localStorage.setItem('report_price', this.product.price);
      Indicator.open(tipsArr5[utils.getLanguage()]);
      let params = {
        pay_method: pay_method,
        product_key: this.combine_product_ids.length ? this.h5_combo2_attach.product_key : this.product_key,
        product_id: this.combine_product_ids.length ? this.h5_combo2_attach.product_id : this.product.product_id,
        combine_product_ids: this.combine_product_ids,
        platform: 'WEB',
        extra_ce_suan: utils.getExtraParams(
          this.product_key,
          this.query_user_string
        ),
        fb_param: {
          fbc: utils.getcookieInfo('_fbc'),
          fbp: utils.getcookieInfo('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id'),
        }
      };

      let discount_pay = this.$route.query.discount_pay || 0;
      let user_time = true;

      let pay_max_params = Object.assign({}, params, {
        trade_pay_type,
        trade_target_org,
      });
      if (this.product_key === 'consult_time') {
        pay_max_params = Object.assign({}, pay_max_params, {
          consult_time: this.consult_time,
          product_sub_type: 'zheng_yuan',
        });
      }

      pay_max_params.callback_url = `${location.origin}${location.pathname
        }#/result?path=${path_enums[this.product_key]}&report_price=${this.product.price
        }&discount_pay=${discount_pay}&combine_product_ids=${this.combine_product_ids.length ? 1 : 0}&currency_type=${this.product.currency_type || 'MYR'}&product_id=${this.product.product_id}`;
      let res = null;
      if (this.product_key === 'consult_time') {
        delete pay_max_params.extra_ce_suan
        res = await payFateOrderAPI(pay_max_params);
      } else {
        res = await payOrderAPI(pay_max_params);
      }
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
        color: #e24c2e;
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

    // color: #e24c2e;
    // div {
    //   height: 0.24rem;
    //   line-height: 0.24rem;
    // }
    .title {
      height: 0.24rem;
      line-height: 0.24rem;
      color: #e24c2e;
    }
  }

  .right div:first-child {
    margin-bottom: 0.08rem;
  }
}

.discount-comb {
  height: 4.86rem;
  width: 100%;
}

.buy-people {
  width: 100%;
  height: 0.26rem;
  font-weight: 400;
  font-size: 0.26rem;
  color: #99999a;
  line-height: 0.26rem;
  text-align: center;
  margin-bottom: 0.4rem;

  span {
    color: #e24c2e;
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
        height: 0.26rem;
        font-weight: 600;
        font-size: 0.26rem;
        color: #5d5d5e;
        line-height: 0.26rem;
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
  background-color: #e24c2e;
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
  width: 100%;
  height: 0.3rem;
  font-weight: 600;
  font-size: 0.36rem;
  color: #333333;
  line-height: 0.3rem;
  text-align: center;
  margin-bottom: 0.19rem;
}

.time-box {
  display: flex;
  flex-direction: row;
  height: 0.4rem;
}
</style>
