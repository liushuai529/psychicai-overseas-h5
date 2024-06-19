<template>
  <div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="pay-popup">
        <div class="pay-header">
          <div class="pay-title">选择支付方式</div>
          <div class="pay-close" @click="close">
            <img src="../assets/img/index2/pay-close.webp" />
          </div>
        </div>
        <div class="pay-wrapper">
          <div class="price">
            RM <span>{{ product.price || '-' }}</span>
          </div>
          <template v-for="(item, i) in list">
            <div v-if="i < 2 || expand" class="item" @click="index = i">
              <div class="left">
                <div class="icon" :class="getPayIcon(item.payment_name)"></div>
                <div class="name">{{ item.name }}</div>
                <div class="refund">{{ canRefund(item.payment_name) }}</div>
              </div>
              <img
                class="check"
                v-if="index === i"
                src="../assets/img/mlxz/cold_start/img_choose2@3x.webp"
                alt
              />
              <img
                class="check"
                v-else
                src="../assets/img/mlxz/cold_start/img_choose1@3x.webp"
                alt
              />
            </div>
          </template>
          <div v-if="!expand" class="expand" @click="expand = true">
            展开更多
            <img src="../assets/img/arrow.webp" alt="" />
          </div>
        </div>
        <div class="pay-btn" @click="pay">立即支付</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Popup, Indicator } from 'mint-ui';
import moment from 'dayjs';
import {
  getGoodsListAPI,
  orderAPI,
  getCombineGoodsListAPI,
  payOrderAPI,
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

export default {
  components: { Popup },
  data() {
    return {
      popupVisible: false,
      loading: false,
      product: {},
      payment_details: [],
      index: 0,
      paying: false,
      currency: '',
      price: '',
      expand: false,
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
    // 组合支付时用
    is_combine: {
      default: false,
      type: Boolean,
    },
    // 组合支付时用
    combine_ids: {
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
      return list;
    },
    isFortune() {
      return (
        this.product_id == 101 ||
        this.product_id == 102 ||
        this.product_id == 103
      );
    },
  },
  created() {},
  methods: {
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
      let arr = [];
      this.checked_list.forEach(it => {
        if (it.id) {
          arr.push(it);
        }
      });
      if (arr.length === 2) {
        this.product = this.all_list.find(it => it.product_key === 'h5_combo2');
      } else if (arr.length === 3) {
        this.product = this.all_list.find(it => it.product_key === 'h5_combo3');
      }
      this.payment_details = this.product.payment_details || {};
      this.product_id = this.product.product_id;
    },
    // 解析参数字符串
    getExtra() {
      let params = null;
      let query_user_string = this.query_user_string;
      let query_user_string_array = query_user_string.split('|');

      // 八字合婚 双人信息
      if (this.product_id == 23) {
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
          date: moment(`${birth_year}/${birth_month}/${birth_date}`).format(
            'YYYYMMDD'
          ),
        };
      }
      return params;
    },
    // 支付
    pay() {
      // 2秒的防抖
      if (this.loading) return false;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      Indicator.open('订单创建中...');
      const { product_id } = this.product;
      // 支付公共参数
      let params = {
        pay_method: 'payer_max_pay',
        platform: utils.isAndroid() ? 'ANDROID' : 'IPHONE',
        trade_pay_type: this.index ? 'WALLET' : 'NET_BANKING',
        trade_target_org: !this.index ? null : newPayMap[this.index],
        product_id: product_id,
        product_key: '',
        // main_order_id: product_id,
        combine_product_ids: this.checked_list
          .filter(it => it.product_id)
          .map(it => it.product_id),
        extra_ce_suan: {},
        fb_param: {
          fbc: utils.getcookieInfo('_fbc'),
          fbp: utils.getcookieInfo('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id'),
        }
      };
      params.callback_url = `${location.origin}/index.html`;
      this.paying = true;
      this.popupVisible = false;
      payOrderAPI(params)
        .then(res => {
          if (res.status === 1000) {
            location.href = res.data.pay_url;
            Indicator.close();
            this.paying = false;
          }
        })
        .catch(err => {
          this.paying = false;
        });
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
  background: #222;
  border-radius: 0.4rem 0.4rem 0 0;
  position: relative;
  .pay-header {
    width: 100%;
    height: 1.16rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pay-title {
      color: #fff;
      font-size: 0.36rem;
      font-weight: bold;
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
      font-weight: bold;
      margin: 0.2rem 0 0.25rem;
      text-align: center;
      span {
        font-size: 0.6rem;
        margin-top: 2px;
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
      margin-bottom: 0.4rem;
      &:last-child {
        margin: 0;
      }
      .left {
        display: flex;
        align-items: center;
        .icon {
          width: 0.48rem;
          height: 0.48rem;
          background-color: #fff;
          margin-right: 0.16rem;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
        .name {
          color: #fff;
          font-size: 0.28rem;
          font-weight: bold;
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
