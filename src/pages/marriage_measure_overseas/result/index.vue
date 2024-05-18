<template>
  <div class="detail result-detail">
    <top-banner />
    <div v-if="!loading && hasData" class="info_container">
      <div class="user_info">
        <div
          :class="{
            message: true,
            youdayun: data_obj.dayun,
            'border-line': true,
          }"
        >
          <p>男方</p>
          <p>
            姓名：{{ decodeUnicode(maleinfo.name) }}
            <span>先生</span>
          </p>
          <p>
            出生日期：
            <span>{{
              user_ext.male_is_gongli === '1'
                ? maleinfo.gldate
                : maleinfo.nldate
            }}</span>
          </p>
          <p>八字：{{ maleinfo.bazi }}</p>
        </div>
        <div class="big_yun" v-if="data_obj.dayun">
          <p class="zm">{{ $t('dayun-label') }}：</p>
          <p>年份</p>
          <p>甲</p>
          <p>{{ $t('age-label') }}</p>
        </div>
        <div :class="{ message: true }">
          <p>女方</p>
          <p>
            姓名：{{ decodeUnicode(femaleinfo.name) }}
            <span>女士</span>
          </p>
          <p>
            出生日期：
            <span>{{
              user_ext.female_is_gongli === '1'
                ? femaleinfo.gldate
                : femaleinfo.nldate
            }}</span>
          </p>
          <p>八字：{{ femaleinfo.bazi }}</p>
        </div>
        <div class="big_yun" v-if="data_obj.dayun">
          <p class="zm">{{ $t('dayun-label') }}：</p>
          <p>年份</p>
          <p>甲</p>
          <p>{{ $t('age-label') }}</p>
        </div>
        <!-- <p class="copy" @click="copyOrder" data-clipboard-target="#foo">
          {{ $t('order-number') }}：{{ this.order_id }}{{ $t('click-order') }}
        </p> -->
        <input class="copyInput" type="text" id="foo" :value="this.order_id" />
      </div>
    </div>

    <div v-if="!loading && hasData" class="main-outer">
      <img
        v-if="data_obj.hemu_rate"
        :src="language === 'zh-CN' ? cn_hemu : tw_hemu"
        alt
        class="info_img"
      />
      <div class="common_cn" v-if="data_obj.hemu_rate">
        <p class="zm">
          <span
            >女宅命官：{{ data_obj.hemu_rate.fm }}（{{
              data_obj.hemu_rate.fdx
            }}）</span
          >
        </p>
        <p class="zm" style="margin-top: 0.1rem">
          <span
            >男宅命官：{{ data_obj.hemu_rate.mm }}（{{
              data_obj.hemu_rate.mdx
            }}）</span
          >
        </p>
        <p class="fenge" style="font-weight: bold">{{ $t('hepan-label') }}</p>
        <p v-html="data_obj.hemu_rate.hepan"></p>
        <p class="fenge" style="font-weight: bold">{{ $t('yiju-label') }}</p>
        <p v-html="data_obj.hemu_rate.juzhu"></p>
      </div>
      <img
        v-if="data_obj.energy"
        :src="language === 'zh-CN' ? cn_nengliang : tw_nengliang"
        class="info_img"
      />
      <div v-if="data_obj.energy" class="common_cn">
        <p class="zm">
          <span>女方生肖：{{ data_obj.energy.fsx }}</span>
          <span style="float: right; margin-right: 0.4rem"
            >男方生肖：{{ data_obj.energy.msx }}</span
          >
        </p>
        <p class="zm fenge">男女生肖合盘：{{ data_obj.energy.title }}</p>
        <p v-html="data_obj.energy.total"></p>
      </div>
      <img
        v-if="data_obj.career"
        :src="language === 'zh-CN' ? cn_career : tw_career"
        alt
        class="info_img"
      />
      <div class="common_cn" v-if="data_obj.career">
        <p v-html="data_obj.career"></p>
      </div>
      <img
        v-if="data_obj.family"
        :src="language === 'zh-CN' ? cn_family : tw_family"
        alt
        class="info_img"
      />
      <div class="common_cn" v-if="data_obj.family">
        <p v-html="data_obj.family"></p>
      </div>
      <img
        v-if="data_obj.character"
        src="../../../assets/img/mlxz/bzhh/result/character.jpg"
        alt
        class="info_img"
      />
      <div class="common_cn" v-if="data_obj.character">
        <p v-html="data_obj.character"></p>
      </div>
      <img
        v-if="data_obj.parents"
        :src="language === 'zh-CN' ? cn_parents : tw_parents"
        alt
        class="info_img"
      />
      <div class="common_cn" v-if="data_obj.parents">
        <p class="zm">婆媳关系</p>
        <p class="fenge" v-html="data_obj.parents.poxi"></p>
        <p class="zm">丈夫关系</p>
        <p class="fenge" v-html="data_obj.parents.fuzhang"></p>
      </div>
      <img
        v-if="data_obj.blossom"
        :src="language === 'zh-CN' ? cn_blossom : tw_blossom"
        alt
        class="info_img"
      />
      <div class="common_cn" v-if="data_obj.blossom">
        <p v-html="data_obj.blossom"></p>
      </div>
      <img
        v-if="data_obj.all"
        :src="language === 'zh-CN' ? cn_all : tw_all"
        alt
        class="info_img"
      />
      <div class="common_cn" v-if="data_obj.all">
        <div class="star">
          <img
            v-for="item in getStarts(data_obj.all.score)"
            :src="item"
            alt
            :key="item.index"
          />
        </div>
        <p v-html="data_obj.all.desc"></p>
      </div>
      <CopyCode
        :set_title="true"
        title_icon="https://psychicai-static.psychicai.pro/imgs/2404e7ce06d17d704985b300bbb80fd6080c.png"
        title_icon_style="width: 5.26rem;height: .92rem;margin:.24rem auto .44rem;"
        className="marry-box"
        tips1_color="#222"
        code_color="#B1031F"
        :transfer_code="transfer_code"
        codeClass="marry-code"
        :code_btn="is_cn ? cn_code_btn : tw_code_btn"
        code_text_style="margin:.27rem auto .39rem;color:#6E6E6E"
        tips5_style="width: 6.34rem;height: .92rem;"
        @showModal="code_modal = true"
        a_token="bkl8h9"
        e_id="10007"
        c_id="-10010"
        e_name="click_marriage_result"
      />
    </div>
    <CodePop v-if="code_modal" @close="code_modal = false" />
  </div>
</template>

<script>
import { getResultAPI, resultCheckAPI } from '../../../api/api';
import { Toast, Indicator } from 'mint-ui';
import utils from './../../../libs/utils.js';
import topBanner from './../detail/topBanner.vue';

import solidStar from './../../../assets/img/marriage_measure_overseas/result/star_light.png';
import dashedStar from './../../../assets/img/marriage_measure_overseas/result/star_gray.png';

import cn_hemu from '../../../assets/img/mlxz/bzhh/result/hemu_rate.jpg';
import tw_hemu from '../../../assets/img/tw_mlxz/bazihehun/result/hemu_rate.jpg';

import cn_nengliang from '../../../assets/img/mlxz/bzhh/result/energy.jpg';
import tw_nengliang from '../../../assets/img/tw_mlxz/bazihehun/result/energy.jpg';

import cn_career from '../../../assets/img/mlxz/bzhh/result/career.jpg';
import tw_career from '../../../assets/img/tw_mlxz/bazihehun/result/career.jpg';

import cn_family from '../../../assets/img/mlxz/bzhh/result/family.jpg';
import tw_family from '../../../assets/img/tw_mlxz/bazihehun/result/family.jpg';

import cn_parents from '../../../assets/img/mlxz/bzhh/result/parents.jpg';
import tw_parents from '../../../assets/img/tw_mlxz/bazihehun/result/parents.jpg';

import cn_blossom from '../../../assets/img/mlxz/bzhh/result/blossom.jpg';
import tw_blossom from '../../../assets/img/tw_mlxz/bazihehun/result/blossom.jpg';

import cn_all from '../../../assets/img/mlxz/bzhh/result/all.jpg';
import tw_all from '../../../assets/img/tw_mlxz/bazihehun/result/all.jpg';
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import tw_code_btn from '../../../assets/img/mlxz/downloadBtn/tw/bzhh.png';
export default {
  components: {
    topBanner,
    CodePop,
    CopyCode,
  },
  data() {
    return {
      cn_all,
      tw_all,
      cn_blossom,
      tw_blossom,
      cn_parents,
      tw_parents,
      cn_career,
      tw_career,
      cn_family,
      tw_family,
      loading: false,
      hasData: false,
      maleinfo: {
        name: '',
        gldate: '',
        nldate: '',
        bazi: '',
        sex: '',
      },
      femaleinfo: {
        name: '',
        gldate: '',
        nldate: '',
        bazi: '',
        sex: '',
      },
      data_obj: {
        hemu_rate: '',
        energy: '',
        career: '',
        family: '',
        character: '',
        parents: '',
        blossom: '',
        all: '',
        dayun: '',
      },
      user_ext: {
        male_is_gongli: '公历',
        female_is_gongli: '公历',
      },
      order_id: 0,
      count: 0, //轮询次数
      status: '',
      is_finish: false,
      language: utils.getLanguage(),
      cn_hemu,
      tw_hemu,
      cn_nengliang,
      tw_nengliang,
      code_modal: false,
      transfer_code: '',
      cn_code_btn:
        'https://psychicai-static.psychicai.pro/imgs/2404234bb0c587034841ab541abf8dd71bc1.png',
      tw_code_btn,
    };
  },
  async created() {
    this.order_id = this.$route.query.order_id;
    let report_price = +utils.getQueryStr('report_price');
    let report_status = utils.getQueryStr('status');
    let set_time = +localStorage.getItem('mlxz_set_event_times');
    if (report_price && !set_time) {
      if (report_status === 'SUCCESS') {
        utils.firebaseLogEvent(
          '10007',
          '-10007',
          'event_status_marriage_pay_success',
          'event_status',
          {
            args_name: 'event_status_marriage_pay_success',
            channel: utils.getFBChannel(),
          }
        );
        if (utils.isProd()) {
          await utils.checkFB();
          try {
            fbq('track', 'Purchase', {
              value: report_price.toFixed(2),
              currency: 'MYR',
            });
          } catch (err) {
            console.error('error message:', err);
          }
        }
      } else {
        utils.firebaseLogEvent(
          '10007',
          '-10008',
          'event_status_marriage_pay_fail',
          'event_status',
          {
            args_name: 'event_status_marriage_pay_fail',
            channel: utils.getFBChannel(),
          }
        );
      }
      await utils.asleep(500);
      localStorage.setItem('mlxz_set_event_times', 1);

      utils.resetPageUrl(this.order_id, report_status);
    }
  },
  async mounted() {
    window.scrollTo(0, 0);

    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: 'hznmbr',
      });

    utils.firebaseLogEvent(
      '10007',
      '-10009',
      'page_view_marriage_result',
      'page_view',
      {
        args_name: 'page_view_marriage_result',
        channel: utils.getFBChannel(),
      }
    );

    await this.checkResult();
    this.query();
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
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
      if (res.status === 1000) {
        if (!localStorage.getItem('report_price')) return;

        const price = +localStorage.getItem('report_price');
        const { status } = res.data;
        const product_key = 'marriage_contract_report';
      }
      localStorage.removeItem('report_price');

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
        }
        this.status = res.data.status;
      });
    },
    backNotice() {
      Indicator.close();
      Toast(this.$t('fail-result'));
      setTimeout(() => {
        location.href = 'marriage_measure_overseas.html';
      }, 1000);
    },
    renderResult(res) {
      var responseData = res.data.result;
      this.transfer_code = res.data.transfer_code;
      // 用戶信息
      this.maleinfo = responseData.maleinfo;
      this.femaleinfo = responseData.femaleinfo;
      // 測算結果
      this.data_obj.hemu_rate = responseData.hemu;
      this.data_obj.energy = responseData.shuxiang;
      this.data_obj.career = responseData.syjk;
      this.data_obj.family = responseData.jtxc;
      this.data_obj.character = responseData.xgpp;
      this.data_obj.parents = responseData.shuangqin;
      this.data_obj.blossom = responseData.taohua;
      this.data_obj.all = responseData.zhpp;
      this.data_obj.dayun = responseData.dayun;
      this.user_ext = res.data.extra_ce_suan;
    },
    getStarts(star) {
      let starts = [dashedStar, dashedStar, dashedStar, dashedStar, dashedStar];
      for (var i = 0; i < star; i++) {
        starts.unshift(solidStar);
      }
      starts.length = 5;
      return starts;
    },
    decodeUnicode(str) {
      str = str.replace(/\\/g, '%');
      return unescape(str);
    },
    copyOrder() {
      utils.copyText(this.order_id);
      Toast('订单号已复制');
    },
  },
};
</script>
<style scoped lang="less">
.download-box {
  width: 7rem;
  min-height: 5.94rem;
  // background: url('../../../assets/img/mlxz/downloadBtn/bzhh-bg.png') no-repeat;
  border-radius: 0.16rem;
  border: 0.06rem solid #d19a47;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 5.26rem;
    height: 0.92rem;
    margin-top: 0.24rem;
  }
  .logo {
    margin-top: 0.44rem;
    width: 3.05rem;
    height: 0.82rem;
    margin-bottom: 0.32rem;
  }
  .tips {
    height: 0.28rem;
    font-weight: 400;
    font-size: 0.28rem;
    color: #222222;
    line-height: 0.28rem;
    margin-bottom: 0.4rem;
  }
  .code {
    width: 5.5rem;
    min-height: 1.04rem;
    background: url('https://psychicai-static.psychicai.pro/imgs/240463fde6a15d8e44cfa0e7dcbc58abfa67.png')
      no-repeat;
    background-size: 100% 100%;
    font-weight: 600;
    font-size: 0.32rem;
    color: #b1031f;
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
    margin-bottom: 0.1rem;
    color: #999;
    font-size: 0.24rem;
  }
  .copy {
    width: 6.3rem;
    height: 0.88rem;
    margin-bottom: 0.38rem;
    background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
    border-radius: 0.24rem;
    border: 0.02rem solid #ffd192;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.32rem;
    color: #fef8eb;
  }
}
.common_cn {
  padding: 0.3rem;
  background-color: #fff;
  border: 2px solid #d29b48;
  font-size: 0.32rem;
  margin-top: 0.3rem;
  border-radius: 8px;
  margin-bottom: 0.3rem;
}

.zm {
  color: #b50000;
  font-weight: bold;
}

.detail {
  background-color: #fcf8ed;
  background-repeat: repeat-y;
  background-size: 100%;
  padding-bottom: 1.4rem;
  min-height: 100vh;
}

.fenge {
  margin-top: 0.08rem;
  margin-bottom: 0.08rem;
}

.info_img {
  width: 4rem;
  height: 0.89rem;
  display: block;
  margin: 0 auto;
}

.user_info {
  font-size: 0.28rem;
  width: 100%;
  margin-top: 0.3rem;
  border: 3px solid #d19a47;
  border-radius: 0.12rem;
  background-size: cover !important;
}

.message {
  padding-top: 0.2rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  padding-bottom: 0.2rem;
  /* border-bottom: 1px solid #050100; */
}
.border-line {
  border-bottom: 1px solid #050100;
}

.youdayun {
  border-bottom: 2px solid #040000;
}

.big_yun {
  padding-top: 0.2rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  padding-bottom: 0.1rem;
}

.main-outer {
  padding: 0.25rem;
}

.main {
  margin: 0 0.2rem;
  padding-bottom: 0.3rem;
}

.info_container {
  padding: 0.3rem;
  padding-top: 0;
  padding-bottom: 0;
  font-weight: bold;
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

.tip {
  position: fixed;
  top: 0;
  font-size: 0.3rem;
  height: 100%;
  width: 100%;
  z-index: 999999999;
  display: none;
}

.tip div {
  margin: 0 auto;
  max-width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  color: white;
  text-align: center;
  padding: 0.2rem 0;
  top: 40%;
  position: relative;
}

.copy {
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
}

.star {
  width: 50%;
  margin-left: 25%;
  margin-bottom: 0.3rem;
}

.star img {
  width: 18%;
  height: 0.55rem;
}

.copyInput {
  opacity: 0;
  position: absolute;
  z-index: -999999;
  left: 0;
  top: 0;
  /* width:1px;
        height:1px; */
}
</style>
