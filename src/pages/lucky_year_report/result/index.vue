<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-09 11:34:10
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-09 21:23:41
 * @Description: 
-->
<template>
  <div class="detail result-detail">
    <top-banner />
    <user-info :userInfo="userInfo" :dayun="dayun" :orderId="adverTise_order" />
    <div class="main-outer">
      <div class="main">
        <img
          class="main-banner"
          src="../../../assets/img/mlxz/lucky_year_report/result/img_2024.png"
        />
        <!-- 财运断语 -->
        <img
          class="section-title"
          src="../../../assets/img/mlxz/lucky_year_report/result/content_title_1.png"
          alt=""
        />
        <img
          v-if="fortune.keyword24 === '大吉'"
          class="duanyu"
          src="../../../assets/img/mlxz/lucky_year_report/result/daji.png"
          alt=""
        />
        <img
          v-if="fortune.keyword24 === '中吉'"
          class="duanyu"
          src="../../../assets/img/mlxz/lucky_year_report/result/zhongji.png"
          alt=""
        />
        <img
          v-if="fortune.keyword24 === '小吉'"
          class="duanyu"
          src="../../../assets/img/mlxz/lucky_year_report/result/xiaoji.png"
          alt=""
        />
        <img
          v-if="fortune.keyword24 === '平'"
          class="duanyu"
          src="../../../assets/img/mlxz/lucky_year_report/result/ping.png"
          alt=""
        />
        <img
          v-if="fortune.keyword24 === '凶'"
          class="duanyu"
          src="../../../assets/img/mlxz/lucky_year_report/result/xiong.png"
          alt=""
        />

        <!-- 财富精批 -->
        <img
          class="section-title"
          src="../../../assets/img/mlxz/lucky_year_report/result/content_title_2.png"
          alt=""
        />
        <div class="section">
          <div style="text-align: center">{{ fortune.fenxi124 }}</div>
          <div style="text-indent: 1.5em">{{ fortune.fenxi224 }}</div>
          <div style="text-indent: 1.5em">{{ fortune.fenxi324 }}</div>
          <div style="text-indent: 1.5em">{{ fortune.fenxi424 }}</div>
        </div>

        <!-- 财运开运指南 -->
        <img
          class="section-title"
          src="../../../assets/img/mlxz/lucky_year_report/result/content_title_3.png"
          alt=""
        />
        <div class="section" style="text-indent: 1.5em">
          {{ fortune.zhinan24 }}
        </div>

        <img
          class="main-banner"
          src="../../../assets/img/mlxz/lucky_year_report/result/img_life.png"
        />
        <!-- 关键词 -->
        <img
          class="section-title"
          src="../../../assets/img/mlxz/lucky_year_report/result/content_title_4.png"
          alt=""
        />
        <div class="keywords">
          <div class="keyword" v-for="item in fortune.keyword_life" :key="item">
            {{ item }}
          </div>
        </div>

        <!-- 财运分析 -->
        <img
          class="section-title"
          src="../../../assets/img/mlxz/lucky_year_report/result/content_title_5.png"
          alt=""
        />
        <div class="section">
          <div style="text-align: center">{{ fortune.fenxi1_life }}</div>
          <div style="text-indent: 1.5em">{{ fortune.fenxi2_life }}</div>
        </div>
      </div>
    </div>
    <div class="more-title">更多精彩</div>
    <CopyCode
      style="margin: 0.2rem auto"
      className="wealth-box"
      tips1_color="#D62D44"
      code_color="#D62D44"
      :transfer_code="fortune.transfer_code"
      codeClass="wealth-code"
      :code_btn="is_cn ? cn_code_btn : tw_code_btn"
      code_text_style="margin:.27rem auto .39rem;color:#6E6E6E"
      tips5_style="width: 5.92rem;height: 1.06rem;"
      @showModal="code_modal = true"
      a_token="r6mrbi"
      e_id="10005"
      c_id="-10010"
      e_name="click_2024wealty_result"
    />

    <CodePop v-if="code_modal" @close="code_modal = false" />
  </div>
</template>

<script>
import topBanner from '@/components/wealth_boutique_2024/detail/topBanner.vue';
import userInfo from '@/components/wealth_boutique_2024/result/userInfo.vue';
import contentDetail from '@/components/wealth_boutique_2024/detail/contentDetail.vue';
import { getResultAPI, resultCheckAPI } from '@/api/api';
import { Toast, Indicator } from 'mint-ui';
import utils from '@/libs/utils.js';
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import tw_code_btn from '../../../assets/img/mlxz/downloadBtn/tw/wealth24.png';
export default {
  components: {
    topBanner,
    userInfo,
    contentDetail,
    CodePop,
    CopyCode,
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  data() {
    return {
      resource: {
        order: {
          order_id: 0,
        },
      },
      dayun: null,
      fortune: {
        keyword_life: [],
      },
      userInfo: {
        name: '',
        sex: '',
        gldate: '',
        nldate: '',
      },
      create_time: '',

      adverTise_order: 0,
      count: 0,
      status: '',
      code_modal: false,
      cn_code_btn:
        'https://psychicai-static.psychicai.pro/imgs/240454546072b63847a9aad72a93359f78f7.png',
      tw_code_btn,
    };
  },
  async mounted() {
    window.scrollTo(0, 0);

    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: 'crbib8',
      });

    utils.firebaseLogEvent(
      '10005',
      '-10009',
      'page_view_2024wealty_result',
      'page_view',
      {
        args_name: 'page_view_2024wealty_result',
        channel: utils.getFBChannel(),
      }
    );
    let query = this.$route.query;
    this.adverTise_order = parseInt(query.order_id);
    await this.checkResult();
    this.getDetail(this.adverTise_order);
  },
  watch: {},
  methods: {
    /**
     * @description: 订单结果校验
     * @return {*}
     */
    async checkResult() {
      let data = {
        order_id: this.$route.query.order_id,
        pkg: "''",
        receipt: '',
        transaction_id: '',
        version_name: '',
      };
      const res = await resultCheckAPI(data);
      if (res.status === 1000) {
        if (!localStorage.getItem('report_price')) return;

        const price = +localStorage.getItem('report_price');
        const { status } = res.data;
        const product_key = '2024_wealty_report';
        if (status === 'PAYED') {
          window.Adjust &&
            window.Adjust.trackEvent({
              eventToken: 's1u6sh',
              revenue: price,
              currency: 'MYR',
            });

          utils.firebaseLogEvent(
            '10005',
            '-10007',
            'event_status_2024wealty_pay_success',
            'event_status',
            {
              args_name: 'event_status_2024wealty_pay_success',
              pay_page: product_key,
              price: price,
              channel: utils.getFBChannel(),
            }
          );
          if (utils.isProd()) {
            try {
              utils.fbEvent().track('Purchase', {
                currency: 'MYR',
                value: price.toFixed(2),
              });
            } catch (err) {
              console.error('Purchase  error message:', err);
            }
          }
        } else {
          window.Adjust &&
            window.Adjust.trackEvent({
              eventToken: 'merbjw',
            });
          utils.firebaseLogEvent(
            '10005',
            '-10008',
            'event_status_2024wealty_pay_fail',
            'event_status',
            {
              args_name: 'event_status_2024wealty_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }
      }
      localStorage.removeItem('report_price');
      return res.status === 1000 ? 1 : 0;
    },
    /**
     * @description: 订单支付结果查询
     * @param {*} order_id 订单ID
     * @return {*}
     */
    getDetail(order_id) {
      this.count++;
      Indicator.open('结果查询中...');
      getResultAPI({ order_id: order_id }).then(res => {
        let can_store =
          (res.data && ['PAYED', 'FAIL'].includes(res.data.status)) ||
          (this.count === 6 && ['PAYED', 'FAIL'].includes(res.data.status))
            ? true
            : false;

        if (res.data.status === 'PAYED') {
          let responseData = res.data.result;
          this.userInfo = {
            name: responseData.name,
            sex: ['1', 'male'].includes(res.data.extra_ce_suan.sex)
              ? '男'
              : '女',
            gldate: responseData.gldate,
            nldate: responseData.nldate,
          };
          this.fortune = responseData;

          this.fortune.transfer_code = res.data.transfer_code;
          Indicator.close();
        } else if (this.count < 6) {
          if (['PAYED', 'FAIL', 'REFUNDED'].includes(res.data.status)) {
            this.backNotice();
            this.status = res.data.status;
            return;
          }
          setTimeout(() => {
            this.getDetail(this.adverTise_order);
          }, 1000);
        } else {
          this.backNotice();
          // let querystring = localStorage.getItem('etouch_luck_userinfo_new');
          // location.href = `lucky_year_report.html#/detail?querystring=  + ${querystring}&order_id=${this.$route.query.order_id}`;
        }
        this.status = res.data.status;
      });
    },
    /**
     * @description: 查询失败提示
     * @return {*}
     */
    backNotice() {
      Indicator.close();
      Toast('订单查询失败');
      setTimeout(() => {
        location.href = 'lucky_year_report.html';
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  background-color: #d62d44;
  background-repeat: repeat-y;
  background-size: 100%;
  padding-bottom: 1.4rem;
}

.main {
  margin: 0 0.2rem;
  padding-bottom: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main .main-banner {
  width: 5.2rem;
  height: 0.84rem;
  margin-top: 0.5rem;
}

.main div {
  white-space: pre-wrap;
}

.duanyu {
  width: 216px;
  display: block;
  margin: 0 auto;
}

.keywords {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.keyword {
  background-color: #f4e5c2;
  padding: 6px 0;
  text-align: center;
  width: 20%;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1;
  margin: 0 10px;
  color: #d62d44;
  white-space: normal !important;
}

.section-title {
  width: 60%;
  margin: 0.4rem 0;
}
.section {
  color: #d62d44;
  background-color: #f4e5c2;
  font-size: 0.32rem;
  line-height: 2;
  padding: 0.3rem;
  border-radius: 0.2rem;
  margin: 0 0.2rem;
  text-align: justify;
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
.more-title {
  height: 0.62rem;
  font-weight: 600;
  font-size: 0.44rem;
  color: #ffffff;
  line-height: 0.62rem;
  text-align: center;
  margin-bottom: 0.3rem;
}
.more-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.3rem;

  .code-box {
    width: 6.7rem;
    height: 3.68rem;
    background: #f3e5c2;
    border-radius: 0.19rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      width: 3.05rem;
      height: 0.82rem;
      margin: 0.4rem auto 0.32rem;
    }
    .tip {
      height: 0.28rem;
      font-weight: 400;
      font-size: 0.28rem;
      color: #d62d44;
      line-height: 0.28rem;
      margin-bottom: 0.4rem;
    }
    .copy-box {
      width: 5.56rem;
      height: 1.04rem;
      background: url('../../../assets/img/mlxz/lucky_year_report/detail/new_detail/img_shibiema_card.png')
        no-repeat;
      background-size: contain;
      font-weight: 600;
      font-size: 0.32rem;
      color: #d62d44;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 0.2rem;
      span {
        margin-left: 0.1rem;
        text-decoration: underline;
      }
    }
    .desc {
      margin-bottom: 0.2rem;
      color: #999;
      font-size: 0.24rem;
    }
    .copy {
      width: 5.92rem;
      height: 1.06rem;
      margin-bottom: 0.3rem;
    }
  }
}
</style>
