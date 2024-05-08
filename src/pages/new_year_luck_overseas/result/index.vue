<template>
  <div class="result">
    <img
      class="result-title"
      src="../../../assets/img/mlxz/yasuo_tunianyunchen/result/result_1.png"
      alt
    />
    <div class="result-content">
      <custom-template class="item">
        <img
          class="item-title"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/result/result_4.png"
          alt
        />
        <div class="item-text" v-html="fortune.character"></div>
      </custom-template>
      <custom-template class="item">
        <img
          class="item-title"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/result/result_5.png"
          alt
        />
        <div class="item-text">
          <div class="star">
            <img
              v-for="item in getStarts(getR(4, 5))"
              :src="item"
              alt
              :key="item.index"
            />
          </div>
          <p class="whole" v-html="fortune.whole"></p>
        </div>
      </custom-template>
      <custom-template class="item">
        <img
          class="item-title"
          style="width: 2.3rem"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/result/wealth.png"
          alt
        />
        <div class="item-text">
          <div class="star">
            <img
              v-for="item in getStarts(getR(4, 5))"
              :src="item"
              alt
              :key="item.index"
            />
          </div>
          <p class="whole" v-html="fortune.money"></p>
        </div>
      </custom-template>
      <custom-template class="item">
        <img
          class="item-title"
          style="width: 2.3rem"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/result/career.png"
          alt
        />
        <div class="item-text">
          <div class="star">
            <img
              v-for="item in getStarts(getR(4, 5))"
              :src="item"
              alt
              :key="item.index"
            />
          </div>
          <p class="whole" v-html="fortune.work"></p>
        </div>
      </custom-template>
      <custom-template class="item">
        <img
          class="item-title"
          style="width: 2.3rem"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/result/emotion.png"
          alt
        />
        <div class="item-text">
          <div class="star">
            <img
              v-for="item in getStarts(getR(4, 5))"
              :src="item"
              alt
              :key="item.index"
            />
          </div>
          <p class="whole" v-html="fortune.emotion"></p>
        </div>
      </custom-template>
      <custom-template class="item">
        <img
          class="item-title"
          style="width: 2.3rem"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/result/health.png"
          alt
        />
        <div class="item-text">
          <div class="star">
            <img
              v-for="item in getStarts(getR(4, 5))"
              :src="item"
              alt
              :key="item.index"
            />
          </div>
          <p class="whole" v-html="fortune.health"></p>
        </div>
      </custom-template>
      <custom-template class="item">
        <img
          class="item-title"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/result/result_6.png"
          alt
        />
        <div class="item-text">
          <p v-html="fortune.advice.desc"></p>
          <div class="luck">
            <p>本命佛：{{ fortune.advice.buddha }}</p>
            <p>相合生肖：{{ fortune.advice.zodiac }}</p>
            <p>幸运颜色：{{ fortune.advice.color }}</p>
          </div>
          <div class="open-luck">
            <p>开运数字：{{ fortune.advice.number }}</p>
            <p>开运物品：{{ fortune.advice.goods }}</p>
            <p>开运水果：{{ fortune.advice.fruit }}</p>
            <p>开运活动：{{ fortune.advice.activity }}</p>
          </div>
        </div>
      </custom-template>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { getResultAPI, resultCheckAPI } from '../../../api/api';

import utils from '../../../libs/utils.js';
// @ts-ignore
import customTemplate from './new_year_template.vue';
import solidStar from '../../../assets/img/new_year_luck_overseas/result/rate_1.png';
import dashedStar from '../../../assets/img/new_year_luck_overseas/result/rate_2.png';
export default {
  components: {
    customTemplate,
  },
  data() {
    return {
      loading: false,
      hasData: false,

      resource: {
        order: {
          order_id: 0,
        },
      },
      fortune: {
        character: '',
        whole: '',
        money: '',
        emotion: '',
        work: '',
        advice: {
          desc: '',
          buddha: '',
          zodiac: '',
          color: '',
          number: '',
          goods: '',
          fruit: '',
          activity: '',
        },
      },
      userInfo: {},
      channel: utils.getQueryString('channel'),

      count: 0,
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
        report_id: '60007',
      }
    );
    window.scrollTo(0, 0);
    this.order_id = this.$route.query.order_id;
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
              report_id: '60007',
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
          //   let querystring = localStorage.getItem('new_overseas_info');
          //   location.href = `new_year_luck_overseas.html#/detail?querystring=  + ${querystring}&order_id=${this.$route.query.order_id}`;
        }
        this.status = res.data.status;
      });
    },
    backNotice() {
      Indicator.close();
      Toast('订单查询失败');
      setTimeout(() => {
        location.href = 'new_year_luck_overseas.html';
      }, 1000);
    },
    renderResult(res) {
      if (res.data.result) {
        this.fortune = res.data.result;
      }
      this.fortune = JSON.parse(
        JSON.stringify(this.fortune).replace(
          /2019/g,
          new Date().getFullYear() + ''
        )
      );
      if (this.fortune.character) {
        this.fortune.character = this.fortune.character.replace(
          /\\n/g,
          '<br><br>'
        );
      }
      if (this.fortune.whole) {
        this.fortune.whole = this.fortune.whole.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.work) {
        this.fortune.work = this.fortune.work.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.emotion) {
        this.fortune.emotion = this.fortune.emotion.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.health) {
        this.fortune.health = this.fortune.health.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.money) {
        this.fortune.money = this.fortune.money.replace(/\\n/g, '<br><br>');
      }
      if (this.fortune.advice) {
        this.fortune.advice = this.fortune.advice;
      }
    },
    getR(m, n) {
      return m + Math.round(Math.random() * (n - m));
    },
    getStarts(star) {
      let starts = [dashedStar, dashedStar, dashedStar, dashedStar, dashedStar];
      for (var i = 0; i < star; i++) {
        starts.unshift(solidStar);
      }
      starts.length = 5;
      return starts;
    },
  },
};
</script>

<style scoped>
.result {
  background-color: #ff6c4d;
  padding-bottom: 1.4rem;
  padding-top: 0.5rem;
}

.result-content {
  margin: 0.4rem 0.2rem;
  padding-bottom: 0.4rem;
}

.result-title {
  width: 5.3rem;
  display: block;
  margin: 0 auto;
}

.item {
  margin-top: 0.6rem;
}

.item-title {
  width: 2.5rem;
  margin: 0 auto;
  display: block;
}

.item-text {
  background-color: #fff;
  border-radius: 0.15rem;
  margin: 0.3rem;
  padding: 0.3rem;
  font-size: 0.32rem;
  color: #434343;
  text-align: left;
  margin-top: 0.2rem;
}

.desc {
  font-size: 0.3rem;
  margin-top: 0.1rem;
  text-align: left;
}

.star {
  width: 2rem;
}

.star img {
  width: 18%;
  vertical-align: middle;
  margin-left: 2%;
}

.whole {
  margin-top: 0.2rem;
}

.luck {
  margin-top: 0.3rem;
}

.open-luck {
  margin-top: 0.3rem;
}
</style>
