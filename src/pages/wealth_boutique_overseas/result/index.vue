<template>
  <div class="detail result-detail">
    <img
      class="top-banner"
      src="./../../../assets/img/mlxz/2023tnys/result/top_banner.jpg"
      alt
    />
    <user-info :userInfo="userInfo" :dayun="dayun" />
    <div class="main-outer">
      <div class="main">
        <content-detail v-if="fortune.whole" :data="fortune.whole" :index="2" />
        <content-detail
          v-if="fortune.investment"
          :data="fortune.investment"
          :index="3"
        />
        <content-detail
          v-if="fortune.investment"
          :data="fortune.investment"
          :index="4"
        />
        <content-detail v-if="fortune.team" :data="fortune.team" :index="5" />
        <content-detail
          v-if="fortune.chance"
          :data="fortune.chance"
          :index="6"
        />
        <content-detail v-if="fortune.rmfz" :data="fortune.rmfz" :index="7" />
        <content-detail v-if="fortune.tbzy" :data="fortune.tbzy" :index="8" />
        <content-detail v-if="fortune.qcjy" :data="fortune.qcjy" :index="9" />
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { getResultAPI, resultCheckAPI } from '../../../api/api';
import utils from './../../../libs/utils.js';

import contentDetail from './contentDetail.vue';
import userInfo from './userInfo.vue';

export default {
  components: {
    userInfo,
    contentDetail,
  },
  computed: {},
  data() {
    return {
      order_id: 0,
      count: 0, // 輪詢次數

      dayun: null,
      fortune: {
        // investment:[1,2,2,2,3,3,2,2,4,1,2,1],
        investment: null,
        whole: {
          title: '',
          desc: '',
        },
        rmfz: '',
        tbzy: '',
        qcjy: '',
        team: '',
        chance: '',
      },
      userInfo: {
        name: '',
        sex: '',
        gldate: '',
        nldate: '',
        bazi: '',
      },
      create_time: '',
      status: '',
      is_finish: false,
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
        report_id: '60008',
      }
    );
    window.scrollTo(0, 0);
    this.order_id = this.$route.query.order_id;
    this.checkResult() && this.query();
  },
  watch: {
    status(val) {
      let stop = utils.getQueryString('stop');
      if (stop) return;
      const new_url = window.location.href + '&stop=1';
      if (val) {
        if (utils.isAndroid()) {
          window.psychicai_client.onWebPayResult(new_url, false);
        } else {
          let params = {
            url: new_url,
            main_page: 0,
          };
          window.prompt('onWebPayResult', JSON.stringify(params));
        }
        let url = new URL(window.location.href);
        let newUrl = url.origin + url.pathname;
        history.pushState(null, '', newUrl);
      }
    },
  },
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
    query() {
      this.count++;
      this.loading = true;
      Indicator.open('结果查询中..');
      getResultAPI({ order_id: this.$route.query.order_id }).then(res => {
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
              report_id: '60008',
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
          // let querystring = localStorage.getItem('_wealth_overseas_info');
          // location.href = `wealth_boutique_overseas.html#/detail?querystring=  + ${querystring}&order_id=${this.$route.query.order_id}`;
        }
        this.status = res.data.status;
      });
    },

    backNotice() {
      Indicator.close();
      Toast('订单查询失败');
      setTimeout(() => {
        location.href = 'wealth_boutique_overseas.html';
      }, 1000);
    },
    renderResult(res) {
      var responseData = res.data.result;
      responseData = JSON.parse(
        JSON.stringify(responseData).replace(/2018/g, '2023')
      );

      this.userInfo.name = responseData.info.name;
      this.dayun = responseData.dayun;
      this.userInfo.sex = responseData.info.sex;
      this.userInfo.gldate = responseData.info.gldate;
      this.userInfo.nldate = responseData.info.nldate;
      this.userInfo.bazi = responseData.info.bazi;
      this.fortune.whole = responseData.cyjp;
      this.fortune.investment = responseData.fycy;
      this.fortune.team = responseData.qcfs;
      this.fortune.chance = responseData.sysq;
      this.fortune.rmfz = responseData.rmfz;
      this.fortune.tbzy = responseData.tbzy;
      this.fortune.qcjy = responseData.qcjy;
    },
  },
};
</script>

<style scoped>
.top-banner {
  display: block;
  width: 100%;
}
.detail {
  background-color: #d62d44;
  background-repeat: repeat-y;
  background-size: 100%;
  padding-bottom: 1.4rem;
}

.main {
  margin: 0 0.2rem;
  padding-bottom: 0.3rem;
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

.border-bottom {
  display: block;
  width: 100%;
  vertical-align: top;
}
</style>
