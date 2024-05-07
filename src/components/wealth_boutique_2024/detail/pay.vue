<template>
  <div class="pay-outer">
    <div class="pay">
      <p class="fontsize">
        已有<span class="color-red">{{ user_number }}</span
        >人进行了测算，<span>99%</span>的用户认为分析准确，帮他们解决心中疑惑，指明人生前程！
      </p>
      <div class="line">
        <img src="./../../../assets/img/year/fgxmy@2x.png" alt="" />
      </div>

      <!-- 好运币支付 -->
      <template v-if="useCoinPay">
        <div @click="coinPay">
          <coin-pay :detailData="detailData"></coin-pay>
        </div>
      </template>
      <!-- 会员价格组件 -->
      <template v-else>
        <member-pay
          :detailData="detailData"
          :item_id="item_id"
          origin_color="#bababa"
        />
        <div class="weixin" v-if="show_wxpay" @click="weChatPay">
          <img src="./../../../assets/img/gossip/wxpay.png" alt="" />
        </div>
        <div class="zfb" v-if="show_alipay" @click="aliPay">
          <img src="./../../../assets/img/gossip/alipay.png" alt="" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
import memberPay from '../../base/member_pay.vue';
import coinPay from '../../base/coin_pay.vue';

export default {
  data() {
    return {
      item_id: 10639,
    };
  },
  props: {
    useCoinPay: {
      type: Boolean,
      default: false,
    },
    // 商品详情
    detailData: {
      default: function () {
        return {};
      },
    },
  },
  components: {
    memberPay,
    coinPay,
  },
  computed: {
    user_number() {
      return this.$store.state.year_user;
    },
    show_wxpay() {
      return true;
    },
    show_alipay() {
      if (utils.isMiniProgram()) {
        return false;
      }

      return !utils.isWechat();
    },
  },
  methods: {
    coinPay() {
      this.$parent.unlock('fortune_coin');
    },
    weChatPay() {
      let pay_method = 'wx_wap';
      if (utils.isWechat()) {
        pay_method = 'wx_pub';
      }
      this.$parent.unlock(pay_method);
    },
    aliPay() {
      this.$parent.unlock('alipay_wap');
    },
    formateDate(y, m, d) {
      if (m < 10) {
        m = '0' + m;
      }
      if (d < 10) {
        d = '0' + d;
      }
      return y + '' + m + '' + d;
    },
  },
};
</script>

<style scoped>
.pay-outer {
  border-radius: 10px;
  margin-top: 0.64rem;
  background-color: #f9eabb;
}
.fontsize {
  font-size: 0.3rem;
}
.weixin,
.zfb {
  width: 94%;
  margin: 0 auto;
  margin-top: 0.1rem;
}

.weixin img,
.zfb img {
  width: 100%;
  display: block;
}

.pay {
  -webkit-border-radius: 0.12rem;
  border-radius: 0.12rem;
  font-size: 0.28rem;
  padding: 0.4rem 0.6rem;
  color: #7f7d76;
}

.line {
  width: 100%;
  text-align: center;
  margin: 0.2rem 0;
}

.desc {
  font-size: 0.26rem;
  color: #a6a3a3;
  text-align: center;
  margin-top: 0.2rem;
}

.line img {
  width: 2.6rem;
  display: block;
  margin: 0 auto;
}

.price-box {
  width: 5.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: 0 auto;
}

.price-box .origin {
  color: #bababa;
  text-decoration: line-through;
  font-size: 0.26rem;
  float: left;
}

.price-box .price {
  float: right;
  color: #7f7d76;
  font-size: 0.34rem;
}

.way {
  font-size: 0.24rem;
  color: #666666;
  text-align: center;
  margin-top: 0.2rem;
}

.color-red {
  color: #c31a26;
}
</style>
