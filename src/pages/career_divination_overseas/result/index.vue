<template>
  <div class="detail result-detail">
    <img
      v-if="language == 'zh-CN'"
      class="top-baner"
      src="../../../assets/img/mlxz/career/result/detail_banner.jpg"
      alt
    />
    <img
      v-else
      class="top-baner"
      src="../../../assets/img/tw_mlxz/career/result/detail_banner.jpg"
    />
    <div class="main">
      <user-info
        v-if="fortune.taisui"
        :userInfo="userInfo"
        :data="fortune.taisui"
      />
      <img
        v-if="language == 'zh-CN'"
        class="title"
        src="../../../assets/img/mlxz/career/result/result_content_title.png"
        style="width: 100%"
      />
      <img
        v-else
        class="title"
        src="../../../assets/img/tw_mlxz/career/result/result_content_title.png"
        style="width: 100%"
      />
      <content-detail v-if="fortune.score" :data="fortune.score" :index="1" />
      <content-detail v-if="fortune.zodiac" :data="fortune.zodiac" :index="2" />
      <content-detail v-if="fortune.whole" :data="fortune.whole" :index="3" />
      <content-detail v-if="fortune.team" :data="fortune.team" :index="4" />
      <content-detail v-if="fortune.chance" :data="fortune.chance" :index="5" />
      <content-detail v-if="fortune.job" :data="fortune.job" :index="6" />
      <content-detail v-if="fortune.ent" :data="fortune.ent" :index="7" />
    </div>
  </div>
</template>

<script>
import { getResultAPI, resultCheckAPI } from '../../../api/api';
import { Toast, Indicator } from 'mint-ui';
import utils from './../../../libs/utils.js';
import userInfo from './userInfo.vue';
// @ts-ignore
import contentDetail from './contentDetail.vue';

export default {
  components: {
    userInfo,
    contentDetail,
  },
  computed: {},
  data() {
    return {
      resource: {
        order: {
          order_id: 0,
        },
      },
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

      loading: false,
      order_id: 0,
      count: 0, // 轮训次数
      status: '',
      language: utils.getLanguage('language'),
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
        report_id: '60004',
      }
    );
    this.order_id = this.$route.query.order_id;
    this.checkResult() && this.query();
  },
  watch: {
    status(val) {
      if (val) {
        let stop = utils.getQueryString('stop');
        if (stop) return;
        const new_url = window.location.href + '&stop=1';
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
      Indicator.open(this.$t('result-check'));
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
              report_id: '60004',
              pay_status: res.data.status === 'PAYED' ? 'success' : 'failure',
            }
          );
        if (res.data.status === 'PAYED') {
          this.renderResult(res);
          this.loading = false;
          Indicator.close();
          return;
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
        }
        this.status = res.data.status;
      });
    },

    backNotice() {
      Indicator.close();
      Toast(this.$t('fail-result'));
      setTimeout(() => {
        location.href = 'career_divination_overseas.html';
      }, 1000);
    },
    renderResult(res) {
      this.resource = res.data;
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

      this.userInfo = res.data.extra_ce_suan;
    },
  },
};
</script>

<style scoped>
.top-baner {
  display: block;
  width: 100%;
}
.detail {
  background-color: #c72e35;
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
</style>
