<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-06 17:21:37
 * @Description: 姻缘分析
-->
<template>
  <div class="detail">
    <img
      class="top-banner"
      src="../../../assets/img/mlxz/marry/detail/img_word_head.png"
    />
    <div class="pay-box">
      <img
        class="banner"
        src="../../../assets/img/mlxz/marry/detail/img_banner.png"
      />
      <div style="padding: 0 0.2rem">
        <PayCard
          ref="paycard"
          :type="product_id"
          :product_key="product_key"
          :query_user_string="query_user_string"
          back_url="marriage_divination_overseas"
          lucky_re_id="60006"
        />
        <Marquee :mock_users="mock_users"></Marquee>
      </div>
    </div>
    <img
      class="text"
      src="../../../assets/img/mlxz/marry/detail/img_word_line.png"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/marry/detail/mokuai1.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/marry/detail/mokuai2.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/marry/detail/mokuai3.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/marry/detail/mokuai4.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/marry/detail/mokuai5.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/marry/detail/mokuai6.png"
      @click="pay(102)"
    />
    <img
      class="module"
      style="margin-bottom: 1.59rem"
      src="../../../assets/img/mlxz/marry/detail/mokuai7.png"
      @click="pay(102)"
    />
    <div v-if="showBottomBtn" class="fixed-btn">
      <img
        src="../../../assets/img/marriage_divination_overseas/detail/btn.png"
        @click="pay(103)"
      />
    </div>
  </div>
</template>

<script>
import PayCard from '../../../components/PayCard.vue';
import Marquee from './../../../components/Marquee.vue';
import utils from './../../../libs/utils.js';

export default {
  components: {
    PayCard,
    Marquee,
  },
  computed: {},
  data() {
    return {
      product_id: 24,
      product_key: 'h5_love',
      query_user_string: '',
      mock_users: [
        '5分钟前 我的***成功解锁了姻缘心卦的详细解析',
        '6分钟前 vt1***成功解锁了姻缘心卦的详细解析',
        '12分钟前 椒***成功解锁了姻缘心卦的详细解析',
        '2分钟前 14***成功解锁了姻缘心卦的详细解析',
        '1分钟前 96***成功解锁了姻缘心卦的详细解析',
        '8分钟前 小***成功解锁了姻缘心卦的详细解析',
        '7分钟前 il***成功解锁了姻缘心卦的详细解析',
        '21分钟前 2o***成功解锁了姻缘心卦的详细解析',
        '4分钟前 22***成功解锁了姻缘心卦的详细解析',
      ],
      showBottomBtn: false,
    };
  },
  created() {
    this.query_user_string = this.$route.query.querystring;
    utils.firebaseLogEvent('20002', '-10001', 'page_view_pay', 'page_view', {
      args_name: 'page_view_pay',
      report_id: '60006',
      channel: utils.getFBChannel(),
    });
  },
  mounted() {
    window.scrollTo(0, 0);
    let screenH = window.screen.height;
    window.onscroll = () => {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > screenH * 0.6) {
        this.showBottomBtn = true;
      } else {
        this.showBottomBtn = false;
      }
    };
  },
  methods: {
    pay(c_id) {
      this.$refs.paycard.pay('60006');
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  background-color: #601621;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-banner {
    width: 100%;
    margin: 0.51rem 0 0.14rem;
  }

  .pay-box {
    width: 7.02rem;
    border: 0.06rem solid #ffbf5f;
    border-radius: 0.16rem;
    background-color: #fbf8ed;
    box-sizing: border-box;
    margin-bottom: 0.27rem;
    .banner {
      width: 100%;
    }
  }

  .text {
    width: 6.74rem;
    margin-bottom: 0.25rem;
  }

  .module {
    width: 7.02rem;
    margin-bottom: 0.24rem;
  }

  .fixed-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.35rem;
    text-align: center;
    background-color: #c72e35;
    display: flex;
    justify-content: center;
    img {
      width: 5.2rem;
      height: 1.14rem;
      margin-top: 0.11rem;
    }
  }
}
</style>
