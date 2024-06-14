<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-09 14:09:51
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-28 14:11:04
 * @Description: 融合支付
-->
<template>
  <div
    :class="['pay-card', back_url === 'emotion_fortune' ? 'emotion-box' : '']"
  >
    <div :class="['pay-card-wrapper', is_show ? 'pad-78' : '']">
      <div v-if="back_url === 'weigh_bone'" class="weigh-bone">
        <span class="left">RM</span>
        <span class="right">{{ product.price || '-' }}</span>
      </div>
      <div v-else-if="back_url === 'guiguzi_fortune'" class="guiguzi-price">
        <span class="left">RM</span>
        <span class="right">{{ product.price || '-' }}</span>
      </div>
      <div
        v-else-if="back_url === 'year_of_lucky_2024'"
        class="year-2024-price"
      >
        <div
          :class="[
            'now-price',
            is_new_user ? (language === 'zh-CN' ? 'cn-tag' : 'tw-tag') : '',
          ]"
        >
          <span class="left">RM</span>
          <span class="right">{{ product.price || '-' }}</span>
          <!-- v-if="is_new_user" -->
          <!-- <img class="first-order-tag" :src="firstOrderTag" alt="" /> -->
        </div>
        <div v-if="is_new_user" class="origin-price">
          <span>{{ price_desc[language] }} RM</span>
          <span>{{ product.origin_price_str || '-' }}</span>
        </div>
      </div>
      <!-- <div v-else-if="back_url === 'emotion_fortune'" class="emotion-box">
        <span class="left">RM</span>
        <span class="right">{{ product.price || '-' }}</span>
      </div> -->
      <div
        v-else-if="product"
        :class="{ price: true, 'white-text': back_url === 'emotion_fortune' }"
      >
        RM {{ product.price || '-' }}
      </div>
      <div
        v-if="['year_of_lucky_2024', 'career_fortune_2024'].includes(back_url)"
        class="pay-type"
      >
        <img :src="language === 'zh-CN' ? cn_pay_type : tw_pay_type" alt="" />
      </div>
      <div
        v-else
        :class="[
          'title',
          ['weigh_bone', 'emotion_fortune'].includes(back_url)
            ? 'white-text'
            : '',
        ]"
      >
        {{ order_style[language] }}
      </div>
      <template v-for="(item, i) in new_pay_methods">
        <div v-if="i < 10 || expand" class="item" @click="index = i">
          <div class="left">
            <!-- <div class="icon" :class="getPayIcon(item.payment_name)"></div> -->
            <img :src="item.icon" class="icon" alt="" />

            <div
              :class="[
                'name',
                ['weigh_bone', 'emotion_fortune'].includes(back_url)
                  ? 'white-text'
                  : '',
              ]"
            >
              {{ item.title }}
            </div>
            <!-- <div
              :class="[
                'refund',
                ['weigh_bone', 'emotion_fortune'].includes(back_url)
                  ? 'white-text'
                  : '',
              ]"
            >
              {{ canRefund(item.payment_name) }}
            </div> -->
          </div>
          <img
            class="check"
            v-if="index === i"
            :src="
              ['weigh_bone', 'emotion_fortune'].includes(back_url)
                ? BoneCheckImg
                : ['year_of_lucky_2024', 'career_fortune_2024'].includes(
                    back_url
                  )
                ? yearCheck
                : commonCheck
            "
            alt
          />
          <img
            class="check"
            v-else
            :src="
              ['year_of_lucky_2024', 'career_fortune_2024'].includes(back_url)
                ? yearUncheck
                : commonUncheck
            "
            alt
          />
        </div>
      </template>
      <div
        v-if="!expand && new_pay_methods.length > 2"
        class="expand hidden"
        @click="expand = true"
      >
        <span
          :class="{
            'expand-text': [
              'year_of_lucky_2024',
              'career_fortune_2024',
            ].indexOf(back_url),
            'white-text': ['weigh_bone', 'emotion_fortune'].includes(back_url),
          }"
          >{{ tips_style_1[language] }}</span
        >
        <img
          v-if="['year_of_lucky_2024', 'emotion_fortune'].includes(back_url)"
          src="../assets/img/mlxz/year_of_lucky_2024/icon_arrow.png"
          alt=""
        />
        <img v-else src="../assets/img/arrow.png" alt="" />
      </div>
    </div>
    <div
      v-if="back_url === 'guiguzi_fortune'"
      :class="[
        'guiguzi-btn',
        language === 'zh-CN' ? 'cn-guiguzi-btn' : 'tw-guiguzi-btn',
      ]"
      @click="pay()"
    ></div>

    <div
      v-else-if="back_url === 'weigh_bone'"
      @click="pay()"
      class="bone-btn"
    ></div>
    <div
      v-else-if="back_url === 'year_of_lucky_2024'"
      @click="pay()"
      :class="[
        'lucky-2024-btn',
        language === 'zh-CN' ? 'cn-lucky-2024-btn' : 'tw-lucky-2024-btn',
      ]"
    ></div>
    <div
      v-else-if="back_url === 'career_fortune_2024'"
      @click="pay()"
      class="career-2024-btn"
    ></div>
    <div
      v-else
      class="pay-card-btn"
      :style="{ width: btn_width }"
      @click="pay()"
    >
      {{ unlock_style[language] }}
    </div>

    <!-- <div v-else class="guiguzi-btn" @click="pay()"></div> -->
  </div>
</template>

<script>
import moment from 'dayjs';
import { Indicator } from 'mint-ui';
import {
  getGoodsListAPI,
  orderAPI,
  payOrderAPI,
  getPayMethodsAPI,
  getProductionsAPI,
  getResultAPI,
} from '../api/api';
import { path_enums } from '../libs/enum';
import Marquee from './Marquee.vue';
import { getProductions } from '../libs/common_api';
import utils from '../libs/utils';
import BoneCheckImg from '../assets/img/mlxz/weigh_bone/img_choose2.png';
import commonCheck from '../assets/img/3.0/checked.png';
import commonUncheck from '../assets/img/3.0/unchecked.png';
import yearCheck from '../assets/img/mlxz/year_of_lucky_2024/img_choose2.png';
import yearUncheck from '../assets/img/mlxz/year_of_lucky_2024/img_choose1.png';
import cn_pay_type from '../assets/img/mlxz/year_of_lucky_2024/result_img_word2.png';
import tw_pay_type from '../assets/img/tw_mlxz/year_24/detail/result_img_word2.png';

import cn_firstOrderTag from '../assets/img/mlxz/year_of_lucky_2024/youhui_img_tag_big.png';
import tw_firstOrderTag from '../assets/img/tw_mlxz/year_24/detail/youhui_img_tag_big_fan.png';

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

const orderCreateTips = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...',
};

export default {
  components: { Marquee },
  data() {
    return {
      loading: false,
      product: {},
      payment_details: [],
      index: 0,
      paying: false,
      currency: '',
      price: '',
      expand: false,
      list: [],
      product_id: null,
      pay_url: '',
      BoneCheckImg,
      commonCheck,
      yearCheck,
      commonUncheck,
      yearUncheck,
      language: utils.getLanguage(),
      order_style: {
        'zh-CN': '请选择支付方式',
        'zh-TW': '請選擇支付方式',
      },
      tips_style_1: {
        'zh-CN': '展开更多',
        'zh-TW': '展開更多',
      },
      unlock_style: {
        'zh-CN': '立即解锁',
        'zh-TW': '立即解鎖',
      },
      cn_pay_type,
      tw_pay_type,
      new_pay_methods: [],
      cn_firstOrderTag,
      tw_firstOrderTag,
      is_new_user: false,
      price_desc: {
        'zh-CN': '原价',
        'zh-TW': '原價',
      },
    };
  },
  props: {
    type: {
      default: '',
      type: String | Number,
    },
    product_key: {
      default: '',
      type: String,
    },
    query_user_string: {
      default: '',
      type: String,
    },
    btn_width: {
      default: '6.3rem',
      type: String,
    },
    back_url: {
      default: '',
      type: String,
    },
    is_show: {
      type: Boolean,
      default: false,
    },
    lucky_re_id: {
      type: '',
      default: String,
    },
    // getOrderId: {
    //   type: Function,
    //   default: () => {},
    // },
    // product: {
    //   type: Object,
    //   default: () => {},
    // },
    // payment_details: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  computed: {
    user_number() {
      return this.$store.state.year_user;
    },
    firstOrderTag() {
      return this.language === 'zh-CN' ? cn_firstOrderTag : tw_firstOrderTag;
    },
  },
  async created() {
    this.getPayMethods();
    const { status, data } = await getProductionsAPI('ceh5');
    if (status === 1000) {
      this.product = data.find(it => it.product_key === this.product_key);
      this.is_new_user = this.product
        ? this.product.tags
          ? this.product.tags.includes('newcomer_discount')
          : false
        : false;
      this.payment_details = this.product.payment_details || {};
      this.product_id = this.product.product_id;
    }
    this.pay_url = '';
    if (this.$route.query.order_id) {
      const res = await getResultAPI({ order_id: this.$route.query.order_id });
      if (res.status !== 1000) return;
      this.pay_url = res.data.pay_url;
    }
  },
  mounted() {},
  methods: {
    getProductions,

    /**
     * @description: 获取支付方式列表
     * @return {*}
     */
    getList() {
      let list = [];
      console.log(this.payment_details);
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

    /**
     * @description: 展示是否支持退款
     * @param {*} type
     * @return {*}
     */
    canRefund(type) {
      return type === 'NET_BANKING' ? '不支持退款' : '支持退款';
    },

    /**
     * @description: 获取支付方式的Icon
     * @param {*} type
     * @return {*}
     */
    getPayIcon(type) {
      return {
        [type]: true,
      };
    },

    /**
     * @description: 解析用户信息 即额外参数
     * @return {*}
     */
    getExtra() {
      let params = null;
      let query_user_string = this.query_user_string;
      let query_user_string_array = query_user_string.split('|');
      // 八字合婚 双人信息
      if (this.product_key === 'h5_marriage') {
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
          birth_hour: birth_hour,
          date: moment(
            `${birth_year}${
              +birth_month < 10 ? '0' + birth_month : birth_month
            }${+birth_date < 10 ? '0' + birth_date : birth_date}`
          ).format('YYYYMMDD'),
        };
      }

      return params;
    },

    /**
     * @description: 支付
     * @param {*} re_id
     * @return {*}
     */
    pay(re_id) {
      utils.firebaseLogEvent(
        '20002',
        '-10002',
        'click_report_choice',
        'click',
        {
          args_name: 'click_report_choice',
          // pay_type: newPayMap[this.index],
          pay_type: this.index ? newPayMap[this.index] : 'NET_BANKING',
          report_id: this.lucky_re_id,
          channel: utils.getFBChannel(),
        }
      );

      // 2秒的防抖
      if (this.loading) return false;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);

      if (this.pay_url) {
        location.href = this.pay_url;
        return;
      }

      let click_ = this.new_pay_methods[this.index];
      localStorage.setItem('report_price', this.product.price);

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
          )
        };
        payOrderAPI(params)
          .then(res => {
            this.loading = false;
            if (res.status === 1000) {
              Indicator.close();
              this.order_id = res.data.id;
              // this.$emit('getOrderId', res.data.id);
              localStorage.setItem('report_order_id', res.data.id);
            }
          })
          .catch(err => {
            console.log(err);
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
          fb_param: {
            fbc: localStorage.getItem('_fbc'),
            fbp: localStorage.getItem('_fbp'),
            external_id: localStorage.getItem('mlxz_outer_visitor_id'),
          }
        };
        params.callback_url = `${location.origin}${
          location.pathname
        }#/result?path=${path_enums[this.product_key]}`;
        params.extra_ce_suan = this.getExtra();
        if (this.paying) return false;
        this.paying = true;
        Indicator.open(orderCreateTips[this.language]);
        payOrderAPI(params).then(res => {
          if (res.status === 1000) {
            location.href = res.data.pay_url;
            Indicator.close();
          }
          this.paying = false;
        });
      }
    },

    getPayMethods() {
      let data = {
        ad_channel: utils.getRequestParams('ad_channel'),
      };
      getPayMethodsAPI(data).then(res => {
        if (res.status === 1000) {
          this.new_pay_methods = res.data;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import './../less/pay.less';

.pad-78 {
  padding: 0 0.78rem;
}

.pay-card {
  font-size: 0.25rem;
  color: #7f7d76;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pay-card-wrapper {
    width: 100%;
    margin-top: -1px;
    box-sizing: border-box;
    .price {
      width: 100%;
      color: #cc4b44;
      font-size: 0.4rem;
      font-weight: bold;
      margin: 0.3rem 0 0.25rem;
      text-align: center;
      line-height: 1;
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
          width: 0.56rem;
          height: 0.56rem;
          background-color: #fff;
          margin-right: 0.16rem;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
        .name {
          color: #222222;
          font-size: 0.32rem;
          font-weight: bold;
        }
        .refund {
          color: rgba(91, 65, 13, 0.5);
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
  .pay-card-btn {
    width: 6.3rem;
    height: 0.88rem;
    color: #fef8eb;
    font-size: 0.32rem;
    line-height: 0.88rem;
    background-image: linear-gradient(to bottom, #f47553, #e92424);
    border-radius: 0.24rem;
    border: 0.02rem solid #ffd192;
    text-align: center;
    font-weight: bold;
    margin-top: 0.24rem;
  }
}

.guiguzi-btn {
  width: 5.92rem;
  height: 1.06rem;
  margin-bottom: 0.5rem;
  margin-top: 0.24rem;
}
.cn-guiguzi-btn {
  background: url('../assets/img/mlxz/guiguzi/bt2.png') no-repeat;
  background-size: contain;
}
.tw-guiguzi-btn {
  background: url('../assets/img/tw_mlxz/guiguzi/detail/bt2.png') no-repeat;
  background-size: contain;
}

.guiguzi-price {
  width: 100%;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 700;
  color: #cc4b44;
  height: 0.72rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0.4rem auto;
  .left {
    font-size: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
  }
  .right {
    font-size: 0.72rem;
    height: 0.72rem;
    line-height: 0.72rem;
    margin-left: 0.05rem;
  }
}
.year-2024-price {
  width: 100%;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 700;
  color: #ee8130;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 0.4rem;

  .now-price {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
  }

  .origin-price {
    width: 100%;
    height: 0.24rem;
    font-weight: 500;
    font-size: 0.24rem;
    color: #787879;
    line-height: 0.24rem;
    text-decoration-line: line-through;
    margin-top: 0.1rem;
    text-align: center;
  }
  .left {
    font-size: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    margin-bottom: 0.05rem;
  }
  .right {
    font-size: 0.72rem;
    height: 0.72rem;
    line-height: 0.72rem;
    margin-left: 0.05rem;
  }
}

.cn-tag::after {
  content: '';
  display: block;
  width: 1.16rem;
  height: 0.36rem;
  position: absolute;
  right: -1.2rem;
  top: 0;
  background: url('../assets/img/mlxz/year_of_lucky_2024/youhui_img_tag_big.png')
    no-repeat;
  background-size: contain;
  background-position: center;
}
.tw-tag::after {
  content: '';
  display: block;
  width: 1.16rem;
  height: 0.36rem;
  position: absolute;
  right: -1.2rem;
  top: 0;
  background: url('../assets/img/tw_mlxz/year_24/detail/youhui_img_tag_big_fan.png')
    no-repeat;
  background-size: contain;
  background-position: center;
}

.weigh-bone {
  width: 100%;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 700;
  color: #fff7cc;
  height: 0.72rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0.7rem auto 0.4rem;
  .left {
    font-size: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
  }
  .right {
    font-size: 0.72rem;
    height: 0.72rem;
    line-height: 0.72rem;
    margin-left: 0.05rem;
  }
}
.white-text {
  color: #ffffff !important;
}
.bone-btn {
  width: 5.12rem;
  height: 1rem;
  background-image: url('../assets/img/mlxz/weigh_bone/btn_pay.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 0.5rem;
  margin-top: 0.24rem;
}
.lucky-2024-btn {
  width: 5.19rem;
  height: 1.03rem;
  // background-image: url('../assets/img/mlxz/year_of_lucky_2024/img_button3.png');
  // background-size: contain;
  background-repeat: no-repeat;
  margin-top: 0.24rem;
}
.career-2024-btn {
  width: 4.98rem;
  height: 1rem;
  background-image: url('../assets/img/mlxz/career_2024/home_btn.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 0.24rem;
  position: relative;
  z-index: 100;
}

.cn-lucky-2024-btn {
  background-image: url('../assets/img/mlxz/year_of_lucky_2024/img_button3.png');
  background-size: contain;
}
.tw-lucky-2024-btn {
  background-image: url('../assets/img/mlxz/year_of_lucky_2024/img_button3.png');
  background-size: contain;
}

.pay-type {
  width: 100%;
  height: 0.36rem;
  text-align: center;
  margin-bottom: 0.4rem;
  img {
    width: 3.98rem;
    height: 100%;
  }
}
.expand-text {
  color: #8d95c4;
}

.emotion-box {
  margin: 0 0.8rem 0.4rem;
  color: #fff;
}
.emotion-text {
  color: #fff !important;
}

.hidden {
  display: none;
}

.first-order-tag {
  width: 1.16rem;
  height: 0.36rem;
  position: absolute;
  right: 0.25rem;
  top: 0;
}
</style>
