<template>
  <div class="detail">
    <img
      class="top-banner"
      src="../../../assets/img/mlxz/2023tnys/detail/img_word_head.png"
    />
    <div class="pay-box">
      <img
        class="pay-box-top"
        src="../../../assets/img/mlxz/2023tnys/detail/img_juanzhou.png"
      />
      <!-- <img
        class="pay-box-top"
        src="../../../assets/img/wealth_boutique_overseas/detail/pay-box-top.png"
        alt=""
      /> -->
      <div class="pay-box-middle">
        <PayCard
          ref="paycard"
          :type="product_id"
          :product_key="product_key"
          :query_user_string="query_user_string"
          btn_width="5.9rem"
          back_url="wealth_boutique_overseas"
          lucky_re_id="60008"
        >
          <div class="price">吉时价 RM68</div>
        </PayCard>
      </div>
      <div class="pay-box-bottom">
        <Marquee :mock_users="mock_users"></Marquee>
      </div>
    </div>
    <img
      class="text"
      src="../../../assets/img/mlxz/2023tnys/detail/mokuai1.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/2023tnys/detail/mokuai2.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/2023tnys/detail/mokuai3.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/2023tnys/detail/mokuai4.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/2023tnys/detail/mokuai5.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/2023tnys/detail/mokuai6.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/2023tnys/detail/mokuai7.png"
      @click="pay(102)"
    />
    <img
      class="module"
      src="../../../assets/img/mlxz/2023tnys/detail/mokuai8.png"
      @click="pay(102)"
    />
    <!-- <img
      class="module"
      style="margin-bottom: 1.59rem"
      src="../../../assets/img/wealth_boutique_overseas/detail/module8.png"
      @click="pay(102)"
    /> -->
    <div v-if="showBottomBtn" class="fixed-btn">
      <img
        src="../../../assets/img/wealth_boutique_overseas/detail/btn.png"
        @click="pay(103)"
      />
    </div>
  </div>
</template>

<script>
import PayCard from '../../../components/PayCard.vue';
import Marquee from './../../../components/Marquee.vue';
import utils from '../../../libs/utils';

export default {
  components: {
    PayCard,
    Marquee,
  },
  data() {
    return {
      product_id: 26,
      product_key: 'h5_wealth2023',
      query_user_string: '',
      mock_users: [
        '5分钟前 我的***成功解锁了财运精批的详细解析',
        '6分钟前 vt1***成功解锁了财运精批的详细解析',
        '12分钟前 椒***成功解锁了财运精批的详细解析',
        '2分钟前 14***成功解锁了财运精批的详细解析',
        '1分钟前 96***成功解锁了财运精批的详细解析',
        '8分钟前 小***成功解锁了财运精批的详细解析',
        '7分钟前 il***成功解锁了财运精批的详细解析',
        '21分钟前 2o***成功解锁了财运精批的详细解析',
        '4分钟前 22***成功解锁了财运精批的详细解析',
      ],
      showBottomBtn: false,
    };
  },
  created() {
    utils.firebaseLogEvent('20002', '-10001', 'page_view_pay', 'page_view', {
      args_name: 'page_view_pay',
      report_id: '60008',
      channel: utils.getFBChannel(),
    });

    this.query_user_string = this.$route.query.querystring;
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
      console.log(1);
      this.$refs.paycard.pay('60008');
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  background-color: #f1bf8b;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-banner {
    width: 6.9rem;
    margin: 0.27rem 0 0.31rem;
  }

  .pay-box {
    margin-bottom: 0.21rem;
    .pay-box-top {
      width: 100%;
      margin-bottom: 0;
    }
    .pay-box-middle {
      width: 100%;
      padding: 0 0.78rem;
      margin-top: -0.45rem;
      box-sizing: border-box;
      background-image: url('../../../assets/img/wealth_boutique_overseas/detail/pay-box-middle.png');
      background-repeat: repeat;
      background-position: center;
      background-size: contain;
    }
    .pay-box-bottom {
      overflow: hidden;
      width: 100%;
      height: 13.4vw;
      margin-top: -1px;
      background-image: url('../../../assets/img/wealth_boutique_overseas/detail/pay-box-bottom.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      box-sizing: border-box;
      padding-top: 0.1rem;
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
    display: flex;
    justify-content: center;
    img {
      width: 5.92rem;
      height: 1.06rem;
    }
  }
}
</style>
