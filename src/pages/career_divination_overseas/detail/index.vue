<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-06 17:19:52
 * @Description: 八字事业详批
-->
<template>
  <div class="detail">
    <img
      v-if="language == 'zh-CN'"
      class="top-banner"
      src="../../../assets/img/mlxz/career/detail/img_word_head.png"
    />
    <img
      v-else
      class="top-banner"
      src="../../../assets/img/tw_mlxz/career/detail/head.png"
    />
    <div class="pay-box">
      <img
        class="banner"
        src="../../../assets/img/mlxz/career/detail/img_head.png"
      />
      <div style="padding: 0 0.2rem">
        <PayCard
          ref="paycard"
          :type="product_id"
          :product_key="product_key"
          :query_user_string="query_user_string"
          back_url="career_divination_overseas"
          lucky_re_id="60004"
        ></PayCard>
        <Marquee :mock_users="mock_users"></Marquee>
      </div>
    </div>
    <img
      v-if="language == 'zh-CN'"
      class="text"
      src="../../../assets/img/mlxz/career/detail/img_word.png"
    />
    <img
      v-else
      class="text"
      src="../../../assets/img/tw_mlxz/career/detail/text.png"
    />
    <img
      v-if="language == 'zh-CN'"
      class="module"
      src="../../../assets/img/mlxz/career/detail/mokuai1.png"
      @click="pay()"
    />
    <img
      v-else
      class="module"
      src="../../../assets/img/tw_mlxz/career/detail/module1.png"
      @click="pay()"
    />

    <img
      v-if="language == 'zh-CN'"
      class="module"
      src="../../../assets/img/mlxz/career/detail/mokuai2.png"
      @click="pay()"
    />
    <img
      v-else
      class="module"
      src="../../../assets/img/tw_mlxz/career/detail/module2.png"
      @click="pay()"
    />

    <img
      v-if="language == 'zh-CN'"
      class="module"
      src="../../../assets/img/mlxz/career/detail/mokuai3.png"
      @click="pay()"
    />
    <img
      v-else
      class="module"
      src="../../../assets/img/tw_mlxz/career/detail/module3.png"
      @click="pay()"
    />
    <img
      v-if="language == 'zh-CN'"
      class="module module-last"
      src="../../../assets/img/mlxz/career/detail/mokuai4.png"
      @click="pay()"
    />
    <img
      v-else
      class="module module-last"
      src="../../../assets/img/tw_mlxz/career/detail/module4.png"
      @click="pay()"
    />
    <div v-if="showBottomBtn" class="fixed-btn">
      <img
        src="../../../assets/img/career_divination_overseas/detail/btn.png"
        @click="pay()"
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
      product_id: 22,
      product_key: 'h5_career',
      query_user_string: '',
      mock_users: [
        '5分钟前 我的***成功解锁了八字事业详批的详细解析',
        '6分钟前 vt1***成功解锁了八字事业详批的详细解析',
        '12分钟前 椒***成功解锁了八字事业详批的详细解析',
        '2分钟前 14***成功解锁了八字事业详批的详细解析',
        '1分钟前 96***成功解锁了八字事业详批的详细解析',
        '8分钟前 小***成功解锁了八字事业详批的详细解析',
        '7分钟前 il***成功解锁了八字事业详批的详细解析',
        '21分钟前 2o***成功解锁了八字事业详批的详细解析',
        '4分钟前 22***成功解锁了八字事业详批的详细解析',
      ],
      language: utils.getLanguage('language'),
      showBottomBtn: false,
    };
  },

  created() {
    utils.firebaseLogEvent('20002', '-10001', 'page_view_pay', 'page_view', {
      args_name: 'page_view_pay',
      report_id: '60004',
      channel: utils.getFBChannel(),
    });
    if (this.language === 'zh-TW') {
      this.mock_users.forEach((it, index) => {
        it = it.replace('分钟前', '分鐘前');
        it = it.replace(
          '成功解锁了八字事业详批的详细解析',
          '成功解鎖了八字事業詳批的詳細分析'
        );
        this.$set(this.mock_users, index, it);
      });
    }
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
    pay() {
      this.$refs.paycard.pay('60004');
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
    margin: 0.4rem 0 0.24rem;
  }
  .module-last {
    margin-bottom: 1.59rem !important;
  }

  .pay-box {
    width: 7.02rem;
    border: 0.06rem solid #91482a;
    border-radius: 0.16rem;
    background-color: #fbf8ed;
    box-sizing: border-box;
    margin-bottom: 0.24rem;
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
    background-color: #dba267;
    display: flex;
    justify-content: center;
    img {
      width: 5.98rem;
      height: 1.41rem;
      margin-top: 0.18rem;
    }
  }
}
</style>
