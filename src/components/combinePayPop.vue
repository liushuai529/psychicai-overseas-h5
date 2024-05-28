<template>
  <div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div :class="['pay-popup', expand ? 'whole-pop' : 'small-pop']">
        <div class="pay-header">
          <div class="pay-title">{{ tips_1[language] }}</div>
          <div class="pay-close" @click="close">
            <img src="../assets/img/index2/pay-close.png" />
          </div>
        </div>
        <div class="pay-wrapper">
          <div class="price">
            <span class="unit-text">{{ unit }}</span>
            <span class="price-text">{{ product_price || '-' }}</span>
          </div>
          <template v-for="(item, i) in new_pay_methods">
            <div v-if="i < 2 || expand" class="item" @click="index = i">
              <div class="left">
                <!-- <div class="icon" :class="getPayIcon(item.payment_name)"></div> -->
                <img :src="item.icon" class="icon" alt="" />
                <div class="name">{{ item.title }}</div>
                <!-- <div class="refund">{{ canRefund(item.payment_name) }}</div> -->
              </div>
              <img
                class="check"
                v-if="index === i"
                src="../assets/img/mlxz/cold_start/img_choose2@3x.png"
                alt
              />
              <img
                class="check"
                v-else
                src="../assets/img/mlxz/cold_start/img_choose1@3x.png"
                alt
              />
            </div>
          </template>
          <div
            v-if="!expand && new_pay_methods.length > 2"
            class="expand"
            @click="expand = true"
          >
            {{ tips_2[language] }}
            <img src="../assets/img/arrow.png" alt="" />
          </div>
        </div>
        <div class="pay-btn" @click="pay">{{ tips_3[language] }}</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Popup, Indicator } from 'mint-ui';
import moment from 'moment';
import {
  getGoodsListAPI,
  orderAPI,
  getCombineGoodsListAPI,
  payOrderAPI,
  getPayMethodsAPI,
} from '../api/api';
import { getFortuneGoodsListAPI } from '../api/fortune';
import { path_enums } from '../libs/enum';
import utils from '../libs/utils';

// 名称映射
const payMethodsMap = {
  NET_BANKING: 'FPX',
  AXIATABOOST: 'Boost',
  TNG: "Touch'n Go",
  GRABPAY: 'Grabpay',
  MAYBANK: 'Maybank QR',
};
const newPayMap = {
  1: 'AXIATABOOST',
  2: 'TNG',
  3: 'GRABPAY',
  4: 'MAYBANK',
};

const tips_1 = {
  'zh-CN': '选择支付方式',
  'zh-TW': '選擇支付方式',
};

const tips_2 = {
  'zh-CN': '展开更多',
  'zh-TW': '展開更多',
};
const tips_3 = {
  'zh-CN': '立即支付',
  'zh-TW': '立即支付',
};

const tips_4 = {
  'zh-CN': '订单创建中',
  'zh-TW': '訂單創建中',
};

export default {
  components: { Popup },
  data() {
    return {
      tips_1: tips_1,
      tips_2: tips_2,
      tips_3: tips_3,
      tips_4: tips_4,
      popupVisible: false,
      loading: false,
      product: {},
      payment_details: [],
      index: 0,
      paying: false,
      currency: '',
      price: '',
      expand: false,
      product_id: 0,
      google_goods_id: 0,
      new_pay_methods: [],
      language: utils.getLanguage(),
      unit: '',
    };
  },
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    // product_id: {
    //   type: Number,
    // },
    // 测算类需要 运势类不需要
    query_user_string: {
      default: '',
      type: String,
    },
    checked_list: {
      type: Array,
      default: () => [],
    },
    all_list: {
      type: Array,
      default: () => [],
    },
    product_key: {
      type: String,
      default: '',
    },
    getOrderId: {
      type: Function,
      default: () => {},
    },
    product_price: {
      type: String | Number,
      default: '',
    },
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        this.popupVisible = true;
        this.query();
      }
    },
    popupVisible(newValue) {
      if (!newValue) {
        this.expand = false;
        this.index = 0;
        this.$emit('update-visible', false);
      }
    },
  },
  computed: {
    user_number() {
      return this.$store.state.year_user;
    },
    // 支付列表
    list() {
      let list = [];
      this.payment_details.forEach(item => {
        if (item.payment_target_orgs.length) {
          item.payment_target_orgs.forEach(item2 => {
            list.push({
              payment_name: item2,
              name: payMethodsMap[item2],
              payment_target_org: item2,
              payment_type: item.payment_type,
            });
          });
        } else {
          list.push({
            payment_name: item.payment_type,
            name: payMethodsMap[item.payment_type],
            payment_target_org: null,
            payment_type: item.payment_type,
          });
        }
      });
      list[list.length] = {
        payment_name: 'GooglePay',
        name: 'GooglePay',
        payment_target_org: null,
        payment_type: 'google_pay',
      };

      return [
        {
          payment_name: 'TNG',
          name: "Touch'n Go",
          payment_target_org: 'TNG',
          payment_type: 'WALLET',
        },
        {
          payment_name: 'AXIATABOOST',
          name: 'Boost',
          payment_target_org: 'AXIATABOOST',
          payment_type: 'WALLET',
        },
        {
          payment_name: 'GRABPAY',
          name: 'Grabpay',
          payment_target_org: 'GRABPAY',
          payment_type: 'WALLET',
        },
        {
          payment_name: 'MAYBANK',
          name: 'Maybank QR',
          payment_target_org: 'MAYBANK',
          payment_type: 'WALLET',
        },
        {
          payment_name: 'GOOGLEPAY',
          name: 'GooglePay',
          payment_target_org: null,
          payment_type: 'google_pay',
        },
      ];
    },
  },
  created() {
    this.getPayMethods();
  },
  methods: {
    // 获取支付方式
    getPayMethods() {
      let data = {
        ad_channel: utils.getRequestParams('ad_channel'),
      };
      getPayMethodsAPI(data).then(res => {
        if (res.status === 1000) {
          this.new_pay_methods = res.data;
          console.log(this.new_pay_methods);
        }
      });
    },
    // 关闭弹窗
    close() {
      this.popupVisible = false;
    },
    // 能否退款文本
    canRefund(type) {
      return type === 'NET_BANKING' ? '不支持退款' : '支持退款';
    },
    // 获取图标
    getPayIcon(type) {
      return {
        [type]: true,
      };
    },
    // 请求支付类型
    query() {
      let same_ = this.all_list.find(
        item => item.product_key === this.product_key
      );
      const { price, unit, product_id, google_goods_id, payment_details } =
        same_;
      this.payment_details = payment_details;
      this.product_id = product_id;
      this.price = price;
      this.google_goods_id = google_goods_id;
      this.unit = unit;
    },
    // 解析参数字符串
    getExtra(product_key, querystring) {
      let params = null;
      let query_user_string = querystring;
      let query_user_string_array = query_user_string.split('|');

      // 八字合婚 双人信息
      if (product_key === 'h5_marriage') {
        let [
          male_name,
          female_name,
          male_birth_year,
          male_birth_month,
          male_birth_date,
          female_birth_year,
          female_birth_month,
          female_birth_date,
          male_birth_hour,
          female_birth_hour,
          male_is_gongli,
          female_is_gongli,
          sex,
        ] = query_user_string_array;

        params = {
          male_name,
          female_name,
          male_birth_year,
          male_birth_month,
          male_birth_date,
          female_birth_year,
          female_birth_month,
          female_birth_date,
          male_birth_hour,
          female_birth_hour,
          male_is_gongli,
          female_is_gongli,
          sex,
        };
      }
      // 其他 单人信息
      else {
        let [
          name,
          sex,
          is_gongli,
          birth_year,
          birth_month,
          birth_date,
          birth_hour,
        ] = query_user_string_array;

        params = {
          name,
          sex,
          is_gongli,
          birth_year,
          birth_month,
          birth_date,
          birth_hour,
          date: moment(
            `${birth_year}${
              +birth_month < 10 ? '0' + birth_month : birth_month
            }${+birth_date < 10 ? '0' + birth_date : birth_date}`
          ).format('YYYYMMDD'),
        };
      }
      return params;
    },
    // 支付
    pay() {
      Indicator.open(this.tips_4[this.language]);
      if (this.loading) return;
      this.loading = true;
      let click_ = this.new_pay_methods[this.index];
      utils.firebaseLogEvent(
        '10060',
        '-10006',
        'event_status_pay_type',
        'event_status',
        {
          args_name: 'event_status_pay_type',
          pay_type: click_.title,
        }
      );

      const { pay_method, trade_pay_type, trade_target_org } = click_;
      if (click_.pay_method === 'google_pay') {
        let params = {
          pay_method: pay_method,
          product_key: this.product_key,
          platform: 'ANDROID',
          product_id: this.product_id,
          extra_ce_suan: this.getExtra(
            this.product_key,
            this.query_user_string
          ),
        };
        payOrderAPI(params)
          .then(res => {
            this.loading = false;
            if (res.status === 1000) {
              Indicator.close();
              this.order_id = res.data.id;
              this.$emit('getOrderId', res.data.id);
            }
          })
          .catch(err => {
            this.loading = false;
            Indicator.close();
          });
      } else {
        // 支付公共参数
        let params = {
          pay_method: pay_method,
          platform: utils.isAndroid() ? 'ANDROID' : 'IPHONE',
          trade_pay_type: trade_pay_type,
          trade_target_org: trade_target_org || null,
          product_id: this.product_id,
          product_key: this.product_key,
          // main_order_id: product_id,
          // combine_product_ids: this.checked_list
          //   .filter(it => it.product_id)
          //   .map(it => it.product_id),
          extra_ce_suan: this.getExtra(
            this.product_key,
            this.query_user_string
          ),
        };
        params.callback_url = `${location.origin}${location.pathname}#/result`;
        payOrderAPI(params)
          .then(res => {
            this.loading = false;
            if (res.status === 1000) {
              Indicator.close();
              this.popupVisible = false;
              location.href = res.data.pay_url;
            }
          })
          .catch(err => {
            this.loading = false;
            Indicator.close();
          });
      }
    },
  },
};
</script>

<style>
.mint-indicator-wrapper {
  z-index: 99999 !important;
}
</style>

<style scoped lang="less">
@import './../less/pay.less';

.pay-popup {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  box-sizing: border-box;
  position: relative;
  background: #222222;
  border-radius: 0.4rem 0.4rem 0 0;
  font-family: PingFangTC;
  .pay-header {
    width: 100%;
    height: 0.36rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    .pay-title {
      color: #fff;
      font-size: 0.36rem;
      font-weight: 600;
      line-height: 1;
    }
    .pay-close {
      width: 0.28rem;
      height: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.28rem;
      }
    }
  }
  .pay-wrapper {
    width: 100%;
    margin-top: -1px;
    box-sizing: border-box;
    .price {
      width: 100%;
      color: #cc4b44;
      font-size: 0.32rem;
      font-weight: 600;
      margin: 0.2rem 0 0.4rem;
      height: 0.6rem;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      .unit-text {
        height: 0.32rem;
        line-height: 0.32rem;
        margin-right: 0.1rem;
      }
      .price-text {
        font-size: 0.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
      }
    }
    .title {
      color: rgba(91, 65, 13, 0.5);
      font-size: 0.3rem;
      margin-bottom: 0.3rem;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.48rem;
      &:last-child {
        margin: 0;
      }
      .left {
        display: flex;
        align-items: center;
        .icon {
          width: 0.48rem;
          height: 0.48rem;
          margin-right: 0.16rem;
        }
        .name {
          color: #fff;
          font-size: 0.28rem;
          font-weight: 600;
        }
        .refund {
          color: rgb(255 255 255 / 50%);
          font-size: 0.24rem;
          margin-left: 0.2rem;
        }
      }
      .check {
        width: 0.36rem;
        height: 0.36rem;
      }
    }
    .expand {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.24rem;
      line-height: 1;
      color: #999;
      font-weight: bold;
      img {
        width: 0.2rem;
        margin-left: 0.05rem;
      }
    }
  }
  .pay-btn {
    width: 6.3rem;
    height: 0.88rem;
    color: #fef8eb;
    font-size: 0.32rem;
    line-height: 0.88rem;
    background: #cc883f;
    border-radius: 0.44rem;
    text-align: center;
    font-weight: bold;
    margin-top: 0.4rem;
    margin-bottom: 0.6rem;
  }
}
</style>
<style lang="less">
.mint-popup-bottom {
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
}
</style>
