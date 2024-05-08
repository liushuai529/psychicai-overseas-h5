<template>
  <div class="detail">
    <top-banner />
    <div class="main">
      <user-info
        v-if="hasData"
        :userInfo="userInfo"
        :userInfoStr="userInfoStr"
      />
      <orderItem v-if="create_time" :createtime="create_time" />
      <gossip v-if="fortune.title" :data="fortune.title"></gossip>
      <!-- <content-detail v-if="fortune.divination" :data="fortune.divination" :index="1" :title="fortune.title.t" /> -->
      <content-detail v-if="fortune.whole" :data="fortune.whole" :index="1" />
      <content-detail v-if="fortune.taohua" :data="fortune.taohua" :index="2" />
      <content-detail v-if="fortune.yudao" :data="fortune.yudao" :index="3" />
      <content-detail
        v-if="fortune.xianren"
        :data="fortune.xianren"
        :index="4"
      />
      <content-detail v-if="fortune.hunhou" :data="fortune.hunhou" :index="5" />
      <content-detail
        v-if="fortune.lucky_words"
        :data="fortune.lucky_words"
        :index="6"
      />
    </div>
    <img
      class="detail-bottom"
      src="./../../../assets/img/marriage_divination_overseas/detail/detail_bottom.jpg"
      alt
    />
  </div>
</template>

<script>
import { getResultAPI, resultCheckAPI } from '../../../api/api';
import { Toast, Indicator } from 'mint-ui';
import utils from './../../../libs/utils.js';
import topBanner from './../detail/topBanner.vue';
// @ts-ignore
import userInfo from './../detail/userInfo.vue';
// @ts-ignore
import contentDetail from './contentDetail.vue';
import orderItem from './orderItem.vue';
// @ts-ignore
import gossip from './gossip.vue';

export default {
  components: {
    topBanner,
    userInfo,
    contentDetail,
    orderItem,
    gossip,
  },
  computed: {},
  data() {
    return {
      fortune: {
        career: '',
        healthy: '',
        love: '',
        study: '',
        wealth: '',
        whole: '',
        lucky_words: '',
      },
      userInfo: {},
      create_time: '',

      loading: false,
      hasData: false,
      count: 0,
      status: '',
      userInfoStr: '',
    };
  },
  created() {
    utils.firebaseLogEvent(
      '20003',
      '-10001',
      'page_view_interpretation',
      'page_view',
      {
        args_name: 'page_view_interpretation',
        report_id: '60006',
      }
    );
    window.scrollTo(0, 0);
    this.checkResult() && this.query();
  },
  watch: {},
  methods: {
    async checkResult() {
      let data = {
        order_id: this.$route.query.order_id,
        pkg: "''",
        receipt: '',
        transaction_id: '',
        version_name: '',
      };
      const res = await resultCheckAPI(data);
      return res.status === 1000 ? 1 : 0;
    },

    async query() {
      this.count++;
      this.loading = true;
      Indicator.open('结果查询中...');
      const res = await getResultAPI({ order_id: this.$route.query.order_id });
      let can_store =
        (res.data && ['PAYED', 'FAIL'].includes(res.data.status)) ||
        (this.count === 6 && ['PAYED', 'FAIL'].includes(res.data.status))
          ? true
          : false;
      can_store &&
        utils.firebaseLogEvent(
          '20003',
          '-10002',
          'event_status_reports',
          'event_status',
          {
            args_name: 'event_status_reports',
            report_id: '60006',
            pay_status: res.data.status === 'PAYED' ? 'success' : 'failure',
          }
        );
      if (res.data.status === 'PAYED') {
        this.renderResult(res);
        this.loading = false;
        this.hasData = true;
        Indicator.close();
      } else if (this.count < 6) {
        if (['PAYED', 'FAIL', 'REFUNDED'].includes(res.data.status)) {
          this.backNotice();
          this.status = res.data.status;
          return;
        }
        setTimeout(() => {
          this.query();
        }, 1000);
      } else {
        this.backNotice();
        // let querystring = localStorage.getItem('lucky_overseas_info');
        // location.href = `marriage_divination_overseas.html#/detail?querystring=  + ${querystring}&order_id=${this.$route.query.order_id}`;
      }
      this.status = res.data.status;
    },
    backNotice() {
      Indicator.close();
      Toast('订单查询失败');
      setTimeout(() => {
        location.href = 'marriage_divination_overseas.html';
      }, 1000);
    },
    renderResult(res) {
      // this.create_time = res.data.order.create_time;
      this.fortune = res.data.result;
      this.fortune = JSON.parse(
        JSON.stringify(this.fortune).replace(
          /2018/g,
          new Date().getFullYear() + ''
        )
      );

      if (this.fortune.career) {
        this.fortune.career = this.fortune.career.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.healthy) {
        this.fortune.healthy = this.fortune.healthy.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.love) {
        this.fortune.love = this.fortune.love.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.study) {
        this.fortune.study = this.fortune.study.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.wealth) {
        this.fortune.wealth = this.fortune.wealth.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.whole) {
        this.fortune.whole = this.fortune.whole.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.lucky_words) {
        this.fortune.lucky_words = this.fortune.lucky_words.replace(
          /\\n/g,
          '<br><br>'
        );
      }
      this.userInfoStr = localStorage.getItem('lucky_overseas_info');
      this.userInfo = res.data.extra_ce_suan;
    },
  },
};
</script>

<style scoped>
.detail {
  background-color: #df0039;
  background-repeat: repeat;
  background-size: 7.5rem auto;
}

.main {
  margin: 0 0.2rem;
  padding-bottom: 0.6rem;
}

.advertisement {
  margin-top: 0.6rem;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  overflow: hidden;
}

.advertisement img {
  width: 100%;
  display: block;
}

.detail-bottom {
  width: 100%;
  display: block;
}
</style>
