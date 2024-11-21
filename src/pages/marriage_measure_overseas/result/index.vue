<template>
  <div :class="['detail', 'result-detail', show_pop_modal? 'hidden-scroll': '']">  
    <ResultPopup product_key="h5_marriage" @change_pop_modal="change_pop_modal" :transfer_code="transfer_code|| ''" />  
    <top-banner />
    

    <!-- 新版信息start -->
    <div v-if="!loading && hasData" class="pay-box">
      <img
        class="banner"
        :src="language === 'zh-CN' ? cn_img_title : tw_img_title"
      />
      <div class="user-info">
        <div class="male-info">
          <div class="info-name">{{ user_ext.male_name | nameFilter }}</div>
          <div class="info-birth">{{ mbirth }}</div>
          <baziInfo v-if="show_bazi" :user_info="init_male_str" />
        </div>
        <img
          class="heart"
          src="../../../assets/img/marriage_measure_overseas/detail/heart.webp"
        />
        <div class="female-info">
          <div class="info-name">{{ user_ext.female_name | nameFilter }}</div>
          <div class="info-birth">{{ fbirth }}</div>
          <baziInfo v-if="show_bazi" :user_info="init_female_str" />
        </div>
      </div>

      <div class="bazi-box">
        <shengxiao
          v-if="show_bazi"
          :male_str="init_male_str"
          :female_str="init_female_str"
          :is_result="true"
        />
      </div>
    </div>
    <!-- 新版信息 end -->
    <div
      v-if="!loading && hasData"
      style="display: none"
      class="info_container"
    >
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
        src="../../../assets/img/mlxz/bzhh/result/character.webp"
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
import {
  getResultAPI,
  resultCheckAPI,
  checkSendEventApi,
  sendEventApi,
} from '../../../api/api';
import { Toast, Indicator } from 'mint-ui';
import utils from './../../../libs/utils.js';
import topBanner from './../detail/topBanner.vue';
import cn_img_title from '../../../assets/img/bzhh_v2/cn/img_title.webp';
import tw_img_title from '../../../assets/img/bzhh_v2/tw/img_title.webp';
import solidStar from './../../../assets/img/marriage_measure_overseas/result/star_light.webp';
import dashedStar from './../../../assets/img/marriage_measure_overseas/result/star_gray.webp';

import cn_hemu from '../../../assets/img/mlxz/bzhh/result/hemu_rate.webp';
import tw_hemu from '../../../assets/img/tw_mlxz/bazihehun/result/hemu_rate.webp';

import cn_nengliang from '../../../assets/img/mlxz/bzhh/result/energy.webp';
import tw_nengliang from '../../../assets/img/tw_mlxz/bazihehun/result/energy.webp';

import cn_career from '../../../assets/img/mlxz/bzhh/result/career.webp';
import tw_career from '../../../assets/img/tw_mlxz/bazihehun/result/career.webp';

import cn_family from '../../../assets/img/mlxz/bzhh/result/family.webp';
import tw_family from '../../../assets/img/tw_mlxz/bazihehun/result/family.webp';

import cn_parents from '../../../assets/img/mlxz/bzhh/result/parents.webp';
import tw_parents from '../../../assets/img/tw_mlxz/bazihehun/result/parents.webp';

import cn_blossom from '../../../assets/img/mlxz/bzhh/result/blossom.webp';
import tw_blossom from '../../../assets/img/tw_mlxz/bazihehun/result/blossom.webp';

import cn_all from '../../../assets/img/mlxz/bzhh/result/all.webp';
import tw_all from '../../../assets/img/tw_mlxz/bazihehun/result/all.webp';
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import tw_code_btn from '../../../assets/img/mlxz/downloadBtn/tw/bzhh.webp';
import shengxiao from '../detail/shengxiao.vue';
import baziInfo from '../detail/bazi.vue';
import year_ganzi from './../../../libs/suishen.wnl.js';
import ResultPopup from '../../../components/ResultPopup.vue'


export default {
  components: {
    topBanner,
    CodePop,
    CopyCode,
    shengxiao,
    baziInfo,
    ResultPopup,
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
      cn_img_title,
      tw_img_title,
      query_user_string: '',
      init_male_str: '',
      init_female_str: '',
      mbirth: '',
      fbirth: '',
      show_bazi: false,
      show_pop_modal: false,//底部引导用户下载遮罩
    };
  },
  filters: {
    nameFilter(val) {
      return utils.getShortStr(val, 4);
    },
  },
  created() {
    // localStorage.removeItem('mlxz_fixed_order_info');
    // localStorage.removeItem('mlxz_fixed_order_key');
    // localStorage.removeItem('mlxz_fixed_local_order_time');
    // localStorage.removeItem('mlxz_fixed_api_order_time');
  },
  async mounted() {
    this.order_id = this.$route.query.order_id;

    window.scrollTo(0, 0);
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '已进入结果页',
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
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '上报了page_view，准备校验是否上报埋点',
    });
    // 上报支付结果埋点  start
    let check_result = await this.checkWithTimeout();
    if (check_result !== null) {
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '已经获取了是否上报埋点的状态',
        mlxz_attribution_status: check_result.data.status,
      });
      if (check_result.data.status) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '准备执行上报埋点',
          mlxz_check_status: check_result.data.status,
        });
        this.handleSendEvent();
      }
    }
    // end
    utils.gcyLog(`order_id:${this.order_id}`, {
      mlxz_action_desc: '开始验单',
    });

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
    /**
     * 显示底部引导用户下载app遮罩
     */
     change_pop_modal() {
      this.show_pop_modal = true;
    },
    /**
     * @description: 校验是否上报埋点
     * @return {*}
     */
    async checkWithTimeout() {
      try {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始调用校验上报埋点接口',
        });
        const result = await Promise.race([
          checkSendEventApi({ order_id: this.order_id }),
          new Promise((resolve, reject) => {
            setTimeout(() => resolve(null), 6000);
          }),
        ]);

        if (result !== null) {
          // 如果有返回数据，则直接返回
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: '已校验是否上报埋点',
            mlxz_check_result_status: result.data.status,
          });
          return result;
        } else {
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: '接口超时，重新调用校验上报埋点接口',
          });
          // 等待 6 秒后再次调用 checkSendEventApi
          const retryResult = await checkSendEventApi({
            order_id: this.order_id,
          });
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: '接口超时，完成重试调用上报埋点接口',
          });
          return retryResult;
        }
      } catch (error) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '接口报错，停止校验',
        });
        throw error;
      }
    },

    /**
     * @description: 完成上报埋点
     * @return {*}
     */
    async handleSendEvent() {
      let report_price = +utils.getQueryStr('report_price');
      let report_status = utils.getQueryStr('status');
      let discount_pay = +utils.getQueryStr('discount_pay');
      let currency_type = utils.getQueryStr('currency_type');
      let combine_product_ids = +utils.getQueryStr('combine_product_ids');
      let repay = +utils.getQueryStr('repay');
      let product_id = utils.getQueryStr('product_id');
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '准备上报埋点，获取订单状态',
        mlxz_order_status: report_status,
      });
      if (report_status === 'SUCCESS' || report_status === 'PAYED') {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始上报firebase埋点',
          mlxz_order_status: report_status,
        });
        if (discount_pay) {
          utils.firebaseLogEvent(
            '10007',
            '-10017',
            'event_status_marriagediscont_pay_success',
            'event_status',
            {
              args_name: 'event_status_marriagediscont_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }
        if (repay) {
          let history_name =
            repay == 3
              ? 'event_status_2024lovelymarriagehistory_pay_success'
              : 'event_status_marriagehistory_pay_success';
          utils.firebaseLogEvent(
            '10002',
            repay == 3 ? '-10032' : '-10018',
            history_name,
            'event_status',
            {
              args_name: history_name,
              channel: utils.getFBChannel(),
            }
          );
        }
        if (!discount_pay && !repay && !combine_product_ids) {
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
        }

        if (combine_product_ids) {
          //成功
          utils.firebaseLogEvent(
            '10007',
            '-10028',
            'event_status_marriagelovely_pay_success',
            'event_status',
            {
              args_name: 'event_status_marriagelovely_pay_success',
              channel: utils.getFBChannel(),
            }
          );
        }

        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成firebase埋点上报',
          mlxz_order_status: report_status,
        });
        console.log('Purchase事件上报', this.order_id)
        if (utils.isProd()) {
          
          try {
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: '开始上报FB埋点，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: currency_type,
              mlxz_order_status: report_status,
            });
            // utils.getFBChannel().indexOf('google') < 0 && fbq && fbq('track', 'Purchase', {
            //   value: report_price.toFixed(2),
            //   currency: currency_type,
            // },{eventID: this.order_id});
            // utils.isGoogleChannel() && gtag && gtag("event", "purchase", {
            //   transaction_id: this.order_id,
            //   value: report_price.toFixed(2),
            //   currency: currency_type, 
            //   items: [
            //     {
            //       item_id: product_id, 
            //     }
            //   ]
            // })
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: '完成FB埋点上报，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: currency_type,
              mlxz_order_status: report_status,
            });
          } catch (err) {
            console.error('error message:', err);
          }
        }
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成埋点上报，开始与接口通信，通知完成上报',
        });
        this.sendEvent();
      } else {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '开始上报埋点',
          mlxz_order_status: report_status,
        });
        if (discount_pay) {
          utils.firebaseLogEvent(
            '10007',
            '-10018',
            'event_status_marriagediscount_pay_fail',
            'event_status',
            {
              args_name: 'event_status_marriagediscount_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }

        if (repay) {
          let history_name =
            repay == 3
              ? 'event_status_2024lovelymarriagehistory_pay_fail'
              : 'event_status_marriagehistory_pay_fail';
          utils.firebaseLogEvent(
            '10002',
            repay === 3 ? '-10033' : '-10027',
            history_name,
            'event_status',
            {
              args_name: history_name,
              channel: utils.getFBChannel(),
            }
          );
        }
        if (!discount_pay && !repay && !combine_product_ids) {
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

        if (combine_product_ids) {
          //失败
          utils.firebaseLogEvent(
            '10007',
            '-10029',
            'event_status_marriagelovely_pay_fail',
            'event_status',
            {
              args_name: 'event_status_marriagelovely_pay_fail',
              channel: utils.getFBChannel(),
            }
          );
        }

        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成上报埋点',
          mlxz_order_status: report_status,
        });
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '完成埋点上报，开始与接口通信，通知完成上报',
        });
        this.sendEvent();
      }
    },

    async sendEvent() {
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: '开始调用接口，通知已上报',
      });
      const res = await sendEventApi({ order_id: this.order_id });
      if (res.status === 1000) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: '已通知已上报',
          mlxz_attribution_status: res.status,
          mlxz_attribution_desc: res.desc,
        });
      }
    },
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
          //是否组合订单
          if (res.data.sub_orders) {
            getResultAPI({ order_id: res.data.sub_orders[0].order_id }).then(
              response => {
                this.renderResultAndComplete(response);
              }
            );
          } else {
            this.renderResultAndComplete(res);
          }
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
      let responseData = res.data.result;
      console.log(res.data.extra_ce_suan);
      this.user_ext = res.data.extra_ce_suan;
      this.getFormateStr();
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
    },
    renderResultAndComplete(res) {
      this.renderResult(res);
      this.loading = false;
      this.hasData = true;
      Indicator.close();
    },

    getFormateStr() {
      let maleusername = this.user_ext.male_name;
      let femaleusername = this.user_ext.female_name;
      let maleyear = this.user_ext.male_birth_year;
      let malemonth = this.user_ext.male_birth_month;
      let maledate = this.user_ext.male_birth_date;
      let femaleyear = this.user_ext.female_birth_year;
      let femalemonth = this.user_ext.female_birth_month;
      let femaledate = this.user_ext.female_birth_date;
      let malehour = parseInt(this.user_ext.male_birth_hour);
      let femalehour = parseInt(this.user_ext.female_birth_hour);
      let male_rili = this.user_ext.male_is_gongli;
      let female_rili = this.user_ext.female_is_gongli;
      let querystring = '';
      querystring += maleusername;
      querystring += '|';
      querystring += femaleusername;
      querystring += '|';
      querystring += maleyear;
      querystring += '|';
      querystring += malemonth;
      querystring += '|';
      querystring += maledate;
      querystring += '|';
      querystring += femaleyear;
      querystring += '|';
      querystring += femalemonth;
      querystring += '|';
      querystring += femaledate;
      querystring += '|';
      querystring += malehour;
      querystring += '|';
      querystring += femalehour;
      querystring += '|';
      querystring += male_rili;
      querystring += '|';
      querystring += female_rili;
      querystring += '|';
      querystring += '0';
      this.init_male_str = `${maleusername}|1|${male_rili}|${maleyear}|${malemonth}|${maledate}|${malehour}`;
      this.init_female_str = `${femaleusername}|0|${female_rili}|${femaleyear}|${femalemonth}|${femaledate}|${femalehour}`;

      this.show_bazi = true;
      this.query_user_string = querystring;
      this.parseUserString();
    },
    /**
     * @description: 用户生辰解析
     * @return {*}
     */
    parseUserString() {
      let query_user_string_array = this.query_user_string.split('|');
      let myear = query_user_string_array[2];
      let mmonth = query_user_string_array[3];
      let mdate = query_user_string_array[4];
      this.mname = query_user_string_array[0];
      let fyear = query_user_string_array[5];
      let fmonth = query_user_string_array[6];
      let fdate = query_user_string_array[7];
      this.fname = query_user_string_array[1];
      // 男性生日農曆
      if (query_user_string_array[10] === '0') {
        let mday = this.getGlDate(myear, mmonth, mdate);
        this.mbirth = `${this.$t('nongli-label')} ${myear}年${mday.nmonthstr}${
          mday.ndatestr
        }`;
      } else {
        this.mbirth = `${this.$t(
          'gongli-label'
        )} ${myear}年${mmonth}月${mdate}日`;
      }
      // 女性生日農曆
      if (query_user_string_array[11] === '0') {
        let fday = this.getGlDate(fyear, fmonth, fdate);
        this.fbirth = `${this.$t('nongli-label')} ${fyear}年${fday.nmonthstr}${
          fday.ndatestr
        }`;
      } else {
        this.fbirth = `${this.$t(
          'gongli-label'
        )} ${fyear}年${fmonth}月${fdate}日`;
      }
    },

    /**
     * @description: 获取公历日期
     * @param {*} year
     * @param {*} month
     * @param {*} date
     * @return {*}
     */
    getGlDate(year, month, date) {
      let twoYearAllDate = [];
      for (let i = 0; i < 12; i++) {
        twoYearAllDate = twoYearAllDate.concat(
          year_ganzi.getOneMonthData(year, i + 1)
        );
      }
      for (let i = 0; i < 12; i++) {
        twoYearAllDate = twoYearAllDate.concat(
          year_ganzi.getOneMonthData(year / 1 + 1, i + 1)
        );
      }

      twoYearAllDate.concat(year_ganzi.getOneMonthData(year + 1, 1));
      twoYearAllDate.concat(year_ganzi.getOneMonthData(year + 1, 2));

      let gldate = twoYearAllDate.find(item => {
        return item.nyear == year && item.nmonth == month && item.ndate == date;
      });
      if (this.language === 'zh-TW' && gldate.nmonth === 12) {
        gldate.nmonthstr = '臘月';
      }
      return gldate;
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
  // background: url('../../../assets/img/mlxz/downloadBtn/bzhh-bg.webp') no-repeat;
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
}

.pay-box {
  position: relative;
  margin: 0.6rem auto 0;
  width: 7.02rem;
  border: 2px solid #d29b48;
  border-radius: 0.16rem;
  background-color: #fbf8ed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  .banner {
    position: absolute;
    top: -0.45rem;
    left: 50%;
    margin-left: -2.245rem;
    width: 4.49rem;
    height: 0.89rem;
  }

  .user-info {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 0.68rem 0 0.49rem;
    padding: 0 0.28rem;

    .heart {
      width: 1.4rem;
      flex: none;
    }

    .male-info,
    .female-info {
      color: #6f3300;
      text-align: center;
      width: 2.25rem;

      .info-name {
        font-size: 0.32rem;
        line-height: 0.45rem;
        font-weight: bold;
        margin-bottom: 0.07rem;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .info-birth {
        font-size: 0.24rem;
        line-height: 0.33rem;
      }

      flex: 1;
    }
  }

  .line {
    width: 5.57rem;
  }
}

.bazi-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
