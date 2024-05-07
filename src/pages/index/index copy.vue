<template>
  <div :class="['container', fix_pop ? 'fix-pop' : '']">
    <mt-swipe :auto="3000" :showIndicators="false" class="swiper-contain">
      <mt-swipe-item
        v-for="(item, k) in header_list"
        :key="'swiper' + k"
        class="swiper-item"
      >
        <img @click="handleReport(item, 1)" :src="item.icon" alt="" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- <div style="font-size: 0.26rem">
      {{ user_agent }}
    </div> -->
    <!-- 多买多折扣 -->
    <div class="sale-box">
      <div class="title-box">
        <div class="left">多买多折扣</div>
        <div class="right">
          <div v-if="zhekouList[zhekou].total" class="total">
            {{ zhekouList[zhekou].total }}RM
          </div>
          <div v-if="zhekouList[zhekou].percent" class="percent">
            {{ zhekouList[zhekou].percent }}
          </div>
          <div class="price">{{ zhekouList[zhekou].price }}RM</div>
        </div>
      </div>
      <div class="sale-list">
        <div
          @click="showPop()"
          v-for="(it, k) in checked_list"
          :key="'sale' + k"
          class="item"
        >
          <img v-if="it.check_icon" :src="it.check_icon" class="icon" alt="" />
        </div>
        <img
          src="../../assets/img/mlxz/cesuan_home/cesuan_icon_add2.png"
          class="add-icon add-1"
          alt=""
        />
        <img
          src="../../assets/img/mlxz/cesuan_home/cesuan_icon_add2.png"
          class="add-icon add-2"
          alt=""
        />
      </div>
      <div @click="payModal()" class="lock-btn">
        解锁命运密码
        <img
          v-show="zhekou === 2"
          class="btn-icon"
          src="../../assets/img/mlxz/cold_start/cesuan_img_tag2@3x.png"
          alt=""
        />
        <img
          v-show="zhekou === 1"
          class="btn-icon"
          src="../../assets/img/mlxz/cold_start/cesuan_img_tag@3x.png"
          alt=""
        />
      </div>
      <div @click="showPop()" class="change-btn">更改选项</div>
    </div>
    <!-- 爆款推荐 -->
    <div class="hot-product">
      <div class="title">爆款推荐</div>
      <div class="product-box swiper">
        <div class="swiper-wrapper">
          <img
            v-for="(it, k) in recommend_list"
            :key="'reco' + k"
            class="swiper-slide"
            :src="it.icon"
            @click="handleReport(it, 2)"
            alt=""
          />

          <div
            style="display: none"
            :class="`swiper-slide swiper-${it.id}`"
            v-for="(it, index) in hot_product_list"
            :key="index"
          >
            <img
              src="../../assets/img/mlxz/cesuan_home/luck_img_word1.png"
              class="title"
              alt=""
            />
            <div :class="`info text-${it.id}`">{{ it.content }}</div>
            <div @click="jumpAsk(it)" :class="`ask-btn ask-bg-${it.id}  `">
              立即提问
            </div>
            <img
              v-show="it.id === 1"
              src="../../assets/img/mlxz/cesuan_home/luck_img_ce_bg1.png"
              class="bg"
              alt=""
            />
            <img
              v-show="it.id === 2"
              src="../../assets/img/mlxz/cesuan_home/luck_img_ce_bg2.png"
              class="bg"
              alt=""
            />
            <img
              v-show="it.id === 3"
              src="../../assets/img/mlxz/cesuan_home/luck_img_ce_bg3.png"
              class="bg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 广告位 -->
    <div class="ad-list">
      <img
        v-for="(ad, k) in ad_list"
        @click="handleReport(ad, 3)"
        :key="'ad' + k"
        class="item"
        :src="!k ? longnianBanner : ad.icon"
      />
    </div>

    <!-- 选择商品弹窗 -->
    <mt-popup
      v-model="sale_visible"
      :closeOnClickModal="false"
      position="bottom"
    >
      <div class="pop-box">
        <div class="pop-header">
          <div class="left">任选3项享特惠</div>
          <img
            @click="closeSalePop()"
            src="../../assets/img/mlxz/cesuan_home/icon_close2.png"
            class="close"
            alt=""
          />
        </div>
        <div class="pop-content">
          <div
            v-for="(it, k) in pop_list"
            :key="'sale-' + k"
            @click="chooseSale(it, k)"
            :class="[
              'item',
              !can_choose && !it.checked ? 'forbidden-item' : 'normal-item',
            ]"
          >
            <img
              v-if="it.checked"
              class="check-icon"
              src="../../assets/img/mlxz/cesuan_home/sale_check.png"
              alt=""
            />
            <img
              v-else
              class="check-icon"
              src="../../assets/img/mlxz/cesuan_home/sale-uncheck.png"
              alt=""
            />
            <img class="top-icon" :src="it.icon" alt="" />

            <div :id="`text-${k}`" v-if="measureProduct[k]" class="bottom-box">
              <!-- {{ hiddenText(measureProduct[k].tips) }} -->
              {{ measureProduct[k].tips }}
            </div>
          </div>
        </div>
        <!-- 确认 -->

        <div
          :class="{
            'confirm-box': true,
            'disabled-confirm': !can_submit ? true : false,
          }"
          @click="handleConfirm()"
        >
          确认
        </div>
      </div>
    </mt-popup>
    <!-- 调起支付页-->
    <PayPopup
      :visible="pay_visible"
      :is_combine="true"
      :total_money="zhekouList[zhekou].price"
      :checked_list="checked_list"
      :all_list="all_list"
      :combine_ids="combine_ids"
      @update-visible="pay_visible = false"
    ></PayPopup>
    <!-- 支付成功弹窗 -->
    <PopResult
      :visible="pay_result_visible"
      :result_list="result_list"
      :sub_orders="sub_orders"
      :pop_list="pop_list"
      @handleReport="hasPayReport"
      @update-visible="pay_result_visible = false"
    ></PopResult>
  </div>
</template>

<script>
import login from '../../api/login';
// @ts-ignore
import Recommend from './recommend.vue';
// @ts-ignore
import Fortune from './fortune.vue';
import utils from '../../libs/utils';
import PayPopup from '../../components/PayPopup.vue';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import { Toast, Indicator } from 'mint-ui';
import PopResult from './pay_result.vue';
import {
  getGoodsListAPI,
  orderAPI,
  getPayOrderInfoAPI,
  getResultAPI,
} from '../../api/api';
import { getProductions } from '../../libs/common_api';
import { getProductionsAPI } from '../../api/api';

import longnianImg from '../../assets/img/mlxz/cold_start/banner-2024caiyun@3x.png';
import career_2024 from '../../assets/img/mlxz/career_2024/home_img_head.png';
const hotRecommendProduction = [
  //  {
  //   name:'良缘合婚',
  // content:'',
  //   url:'',
  //  },
  //  {
  //   name:'姓名风水',
  // content:'',
  //   url:'',
  //  },
  {
    id: 1,
    name: '瞬时卦',
    url: 'mlxz://time/calculate',
    content: '这是瞬时卦',
  },
  {
    id: 2,
    name: '号码测测运',
    url: 'mlxz://numbermoney/calculate',
    content: '这是号码测测运',
  },
  {
    id: 3,
    name: '数字风水',
    url: 'mlxz://phonenumber/calculate',
    content: '这是数字风水',
  },
];

let index = utils.getQueryString('index') || 0;
let channel = utils.getQueryString('channel');

localStorage.setItem('suishen_overseas_channel', channel || '');

const initCheck = [{ value: '' }, { value: '' }, { value: '' }];

const eventProductKey = {
  h5_wealth2024: '2024_wealty_report',
  h5_career: 'profession_bazi_report',
  h5_marriage: 'marriage_contract_report',
  h5_love: 'emotion_report',
  h5_fortune2023: '2023_report',
  h5_wealth2023: '2023_wealty_report',
};

const eventProductValue = {
  '2024_wealty_report': '80001',
  profession_bazi_report: '80004',
  marriage_contract_report: '80005',
  emotion_report: '80006',
  '2023_report': '80007',
  '2023_wealty_report': '80008',
};

export default {
  components: { Recommend, Fortune, PayPopup, PopResult },
  data() {
    return {
      index,
      emotion_report: '80001',
      w: 750,
      visible: false,
      //
      zhekou: 2,
      checked_list: initCheck, //已选择的产品
      mySwiper: null,
      sale_visible: false,
      can_choose: true, // 选择商品
      pop_list: [],
      pay_visible: false,
      product_id: 0,
      combine_ids: '',
      pay_result_visible: false, //支付结果弹窗页
      can_submit: true, // 是否可以提交
      hot_product_list: hotRecommendProduction, // 爆款推荐
      user_agent: utils.getDataArrayFromUserAgent(),
      all_list: [],
      result_list: [],
      // order_status: utils.getQueryString('status') || '',
      order_id: utils.getQueryString('order_id') || '',
      continue: true,
      sub_orders: [],
      fix_pop: false,
    };
  },
  computed: {
    // 顶部广告
    header_list() {
      return [
        {
          id: 80001,
          icon: 'https://psychicai-static.psychicai.pro/imgs/2311eb3228469c9b4dbaa96df65acd9b3418.png',
          name: '2024年财运',
          url: 'lucky_year_report',
          ios_id: '',
          android_id: '21',
        },
        {
          id: 80004,
          icon: 'https://psychicai-static.psychicai.pro/imgs/231163a3ceab6ba14d97bbca80544b9c3cfd.png',
          name: '八字事业详批',
          url: 'career_divination_overseas',
          ios_id: '',
          android_id: '22',
        },
        {
          id: 80005,
          icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/af8b0b8a9c3484c4f4a5428e984c5e8c.png',
          name: '袁天罡',
          url: 'weigh_bone',
          ios_id: '',
          android_id: '23',
        },
        {
          id: 80005,
          icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/630c7179844d4b3b20f5cf3ff46ff4b6.png',
          name: '鬼谷子',
          url: 'guiguzi_fortune',
          ios_id: '',
          android_id: '24',
        },
        {
          id: 80001,
          icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/21fdbe04b4913ca464cc71222552327d.png',
          name: '24年年运',
          url: 'year_of_lucky_2024',
          ios_id: '',
          android_id: '25',
        },
        {
          id: 80002,
          icon: 'http://imgcom.static.suishenyun.net/img_head-5e6238.png',
          name: '2024感情运势',
          url: 'emotion_fortune',
          ios_id: '',
          android_id: '',
        },
        {
          id: 80003,
          icon: career_2024,
          name: '2024事业运',
          url: 'career_fortune_2024',
          ios_id: '',
          android_id: '',
        },
      ];
    },
    // 推荐
    recommend_list() {
      return [
        {
          id: 80006,
          icon: 'https://psychicai-static.psychicai.pro/imgs/23117ebd6d842c8a4a0e99b031e71ec573c1.png',
          name: '姻缘分析',
          url: 'marriage_divination_overseas',
        },
        {
          id: 80005,
          icon: 'https://psychicai-static.psychicai.pro/imgs/2311f52ca97fe90b4bb5ad0acae48730ec8b.png',
          name: '八字合婚',
          url: 'marriage_measure_overseas',
        },
        {
          id: 80007,
          icon: 'https://psychicai-static.psychicai.pro/imgs/23110a86f7cdd6614d988f25fc38366656f2.png',
          name: '2023兔年运程',
          url: 'new_year_luck_overseas',
        },
        {
          id: 80008,
          icon: 'https://psychicai-static.psychicai.pro/imgs/23114b247276ab29478d907ccf869a19092b.png',
          name: '一生财运',
          url: 'wealth_boutique_overseas',
        },
      ];
    },
    // 底部广告
    ad_list() {
      return [
        {
          id: 1,
          icon: 'https://psychicai-static.psychicai.pro/imgs/2311eb3228469c9b4dbaa96df65acd9b3418.png',
          name: '2024年财运',
          url: 'lucky_year_report',
          banner_id: 80001,
        },
        {
          id: 3,
          icon: 'https://psychicai-static.psychicai.pro/imgs/2311b40b5048a8204cc7a6f7cf389d015423.png',
          name: '八字合婚',
          url: 'marriage_measure_overseas',
          banner_id: 80005,
        },
      ];
    },
    swiperList() {
      return [
        {
          id: 4,
          icon: 'https://psychic-h5.wezhaxi.com/img/prod-banner_3.e8f0dee.png',
          name: '姻缘分析',
          url: 'marriage_divination_overseas',
          banner_id: 80006,
        },
        {
          id: 1,
          icon: 'https://psychicai-static.psychicai.pro/imgs/2311eb3228469c9b4dbaa96df65acd9b3418.png',
          name: '2024年财运',
          url: 'lucky_year_report',
          banner_id: 80001,
        },
        {
          id: 2,
          icon: 'https://psychicai-static.psychicai.pro/imgs/231115f4b309b51d4749aebf2957ce4d06d8.png',
          name: '八字事业详批',
          url: 'career_divination_overseas',
          banner_id: 80004,
        },
        {
          id: 3,
          icon: 'https://psychic-h5.wezhaxi.com/img/prod-banner_1.2d72554.png',
          name: '八字合婚',
          url: 'marriage_measure_overseas',
          banner_id: 80005,
        },

        {
          id: 5,
          icon: 'https://psychic-h5.wezhaxi.com/img/prod-banner_2.cfb0c61.png',
          name: '2023年兔年运程详批',
          url: 'new_year_luck_overseas',
          banner_id: 80007,
        },
        {
          id: 6,
          icon: 'https://psychic-h5.wezhaxi.com/img/prod-banner_4.f85b3b9.png',
          name: '2023兔年一生财运',
          url: 'wealth_boutique_overseas',
          banner_id: 80008,
        },
      ];
    },
    // 折扣列表
    zhekouList() {
      return [
        {
          id: 1,
          num: 1,
          total: 0,
          percent: 0,
          price: 68,
        },
        {
          id: 2,
          num: 2,
          total: 138,
          percent: '-37%',
          price: 88,
        },
        {
          id: 3,
          num: 3,
          total: 204,
          percent: '-47%',
          price: 108,
        },
      ];
    },
    // 爆款推荐
    productionList() {
      let arr = [];
      for (let i = 1; i < 11; i++) {
        arr.push({
          id: i,
          checked: false,
          name: '2024财运',
          desc: '預知運勢順遂，預測好運危月份，把握流年機遇！預知運勢順遂，預測好運危月份，把握流年機遇！',
          url: 'www.baidu.com',
          icon: 'https://psychic-h5.wezhaxi.com/img/prod-combine_5.759e0d4.png',
        });
      }
      return arr;
    },
    // 测算产品
    measureProduct() {
      return [
        {
          id: 21,
          name: '2024年财运',
          banner_id: 80001,
          checked: false,
          icon: 'https://psychicai-static.psychicai.pro/imgs/23115681e58a5c544fee8ac8c2f259080607.png',
          url: 'lucky_year_report',
          product_key: 'h5_wealth2024',
          tips: '2024全景扫描，预知财运高低浮沉，提前为你揭示财富脉络，帮助你致富之道，拥有财富满盈的2024年！',
          check_icon:
            'https://psychicai-static.psychicai.pro/imgs/2311c537595a580c452fb90354ab4244bd78.png',
        },
        {
          id: 22,
          name: '八字事业详批',
          banner_id: 80004,
          checked: false,
          icon: 'https://psychicai-static.psychicai.pro/imgs/2311f9a18eab2fba41eb87c6b74a69c112f2.png',
          url: 'career_divination_overseas',
          product_key: 'h5_career',
          tips: '预知事业低谷，成功时机，把握你的先天优势，让你的事业一帆风顺！',
          check_icon:
            'https://psychicai-static.psychicai.pro/imgs/2311ff0388985646470a8302f1547167ba46.png',
        },
        {
          id: 23,
          name: '八字合婚',
          banner_id: 80005,
          checked: false,
          icon: 'https://psychicai-static.psychicai.pro/imgs/2311b43a350070e54399beb014774e98dccd.png',
          url: 'marriage_measure_overseas',
          product_key: 'h5_marriage',
          tips: '合八字测试姻缘，专业分析婚配指数，拥有更加幸福美满的婚姻！',
          check_icon:
            'https://psychicai-static.psychicai.pro/imgs/2311012132873f174e7ebcd518f2253c909a.png',
        },
        {
          id: 24,
          name: '姻缘分析',
          banner_id: 80006,
          checked: false,
          icon: 'https://psychicai-static.psychicai.pro/imgs/231106e4f92e19ab4095b50fcaa5075ad621.png',
          url: 'marriage_divination_overseas',
          product_key: 'h5_love',
          tips: '姻缘分析，知己知彼，为你扫除情感障碍，帮你打造天赐良缘！',
          check_icon:
            'https://psychicai-static.psychicai.pro/imgs/231184d2494396114e79bdd2f5cdf7ab4f81.png',
        },
        {
          id: 25,
          name: '2023年兔年运程详批',
          banner_id: 80007,
          checked: false,
          icon: 'https://psychicai-static.psychicai.pro/imgs/23111d65fa2098a5428fb4cdb8e793a1d3de.png',
          url: 'new_year_luck_overseas',
          product_key: 'h5_fortune2023',
          tips: '预知运势顺利，预测好运、危机出现月份，助你把握流年机遇！ ',
          check_icon:
            'https://psychicai-static.psychicai.pro/imgs/2311e8b5bdf1352f40ed80ec4239f8246eef.png',
        },
        {
          id: 26,
          name: '2023兔年一生财运',
          banner_id: 80008,
          checked: false,
          icon: 'https://psychicai-static.psychicai.pro/imgs/2311dab2e4808856460198f9fb5d00335a02.png',
          url: 'wealth_boutique_overseas',
          product_key: 'h5_wealth2023',
          tips: '把握财运先机，揭晓财富运程，助你财运亨通，财源滚滚！',
          check_icon:
            'https://psychicai-static.psychicai.pro/imgs/2311451b81975b92422dba50e3ecb43a6c71.png',
        },
        {
          id: 27,
          name: '袁天罡推背称骨',
          banner_id: 80002,
          checked: false,
          icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/af8b0b8a9c3484c4f4a5428e984c5e8c.png',
          url: 'weigh_bone',
          product_key: 'h5_weigh_bone',
          tips: '通过袁天罡古老占算法，探究身体骨骼，揭示生命密码，为你清晰了解生涯命运走向，让你事业、爱情、健康三线并进，并在生活中找到最佳平衡！',
          check_icon:
            'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/af8b0b8a9c3484c4f4a5428e984c5e8c.png',
        },
        {
          id: 28,
          name: '鬼谷子百卦论命',
          banner_id: 80003,
          checked: false,
          icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/630c7179844d4b3b20f5cf3ff46ff4b6.png',
          url: 'guiguzi_fortune',
          product_key: 'h5_bai_gua',
          tips: '关乎命运的百卦，把握生活中的转机与挑战。通过古老的易经知识演绎生活，精准预判运势，解析个性、爱情、职业、健康等生活重要环节，让你能够明察秋毫，走好人生每一步！',
          check_icon:
            'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/630c7179844d4b3b20f5cf3ff46ff4b6.png',
        },
        {
          id: 29,
          name: '2024年年运',
          banner_id: 80009,
          checked: false,
          icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/21fdbe04b4913ca464cc71222552327d.png',
          url: 'year_of_lucky_2024',
          product_key: 'h5_annual2024',
          tips: '预知全年吉凶，揭示人生起伏，明晰先机，决策无忧，助力你掌握全年运势，开启更好的2024年！',
          check_icon:
            'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/21fdbe04b4913ca464cc71222552327d.png',
        },
        {
          id: 30,
          name: '2024感情运势',
          banner_id: 12345,
          checked: false,
          icon: 'http://imgcom.static.suishenyun.net/img_head-5e6238.png',
          url: 'emotion_fortune',
          product_key: 'h5_emotion2024',
          tips: '2024感情运势，暂无简介',
          check_icon: 'http://imgcom.static.suishenyun.net/img_head-5e6238.png',
        },
        {
          id: 31,
          name: '2024事业运',
          banner_id: 123456,
          checked: false,
          icon: career_2024,
          url: 'career_fortune_2024',
          product_key: 'h5_career2024',
          tips: '2024事业运，暂无简介',
          check_icon: career_2024,
        },
      ];
    },
    longnianBanner() {
      return longnianImg;
    },
  },
  watch: {
    sale_visible(val) {
      this.fix_pop = val ? true : false;
      if (!val) {
        this.can_choose = true;
      } else {
        this.$nextTick(() => {
          this.pop_list.forEach((it, k) => {
            this.handleText(k);
          });
        });
      }
    },
    pay_visible(val) {
      this.fix_pop = val ? true : false;
    },
    pay_result_visible(val) {
      this.fix_pop = val ? true : false;
    },
  },
  async created() {
    document.title = '测算择吉';

    getProductionsAPI('ceh5').then(res => {
      this.all_list = res.data;
      this.pop_list = this.mergeArray(this.measureProduct, this.all_list);
    });
  },
  async mounted() {
    this.getStoreChecked();
    window.onload = this.getSwiper();
    let arr = localStorage.getItem('mlxz_checked_list');
    if (!this.order_id) return;
    const { status, sub_orders } = await this.getOrderResult();
    if (status) {
      const stop = utils.getQueryString('stop') || '';
      if (stop) {
        if (status === 'PAYED') {
          this.result_list = arr ? JSON.parse(arr) : initCheck;
          this.checked_list = initCheck;
          if (this.result_list.find(it => it.id !== '')) {
            this.pay_result_visible = true;
          }
          localStorage.removeItem('mlxz_checked_list');
          this.sub_orders = sub_orders;
        }
        let url = new URL(window.location.href);
        let newUrl = url.origin + url.pathname;
        history.pushState(null, '', newUrl);
        return;
      }
      const new_url = window.location.href + '&stop=1';
      // window.location.href = new_url;
      if (utils.isAndroid()) {
        window.psychicai_client.onWebPayResult(new_url, true);
      } else {
        let params = {
          url: new_url,
          main_page: 1,
        };
        window.prompt('onWebPayResult', JSON.stringify(params));
      }
    }
  },
  beforeDestroy() {
    this.pay_result_visible = false;
  },
  methods: {
    getProductions,
    // 查询订单支付结果
    async getOrderResult() {
      if (!this.continue || !this.order_id) return;
      Indicator.open('订单结果查询中');
      const { status, data } = await getResultAPI({ order_id: this.order_id });
      Indicator.close();
      this.continue = false;
      if (status !== 1000) return;
      return data;
    },

    // 两个数组中的key相同的合并成一个数组
    mergeArray(arr1, arr2) {
      let arr = [];
      arr1.forEach(it => {
        arr2.forEach(item => {
          if (it.product_key === item.product_key) {
            arr.push(Object.assign(it, item));
          }
        });
      });
      return arr;
    },

    /**
     * @description: 获取缓存的已选商品
     * @return {*}
     */
    getStoreChecked() {
      let arr = localStorage.getItem('mlxz_checked_list');
      this.checked_list = arr ? JSON.parse(arr) : initCheck;
      let i = 0;
      this.checked_list.forEach(it => {
        if (it.product_key) {
          i++;
        }
      });
      this.zhekou = i > 0 ? i - 1 : 2;
    },

    /**
     * @description: 初始化轮播图
     * @return {*}
     */
    getSwiper() {
      if (this.mySwiper) {
        this.mySwiper.destroy(true, true);
      }
      this.mySwiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: false, // 循环模式选项
        slidesPerView: 'auto',
      });
    },

    /**
     * @description: 初始化勾选的商品
     * @param {*} arr1
     * @param {*} arr2
     * @return {*}
     */
    formatProductList(arr1, arr2) {
      arr1.forEach(it => {
        arr2.forEach(item => {
          it.checked = it.product_key === item.product_key ? true : false;
        });
      });
      return arr1;
    },

    /**
     * @description: 开启商品弹窗
     * @return {*}
     */
    showPop() {
      utils.firebaseLogEvent(
        '10009',
        '-10004',
        'click_fortune_report_choice',
        'click',
        {
          args_name: 'click_fortune_report_choice',
        }
      );
      utils.firebaseLogEvent(
        '10010',
        '-10001',
        'page_view_report_choice',
        'page_view',
        {
          args_name: 'page_view_report_choice',
        }
      );

      let arr = localStorage.getItem('mlxz_checked_list');
      if (arr) {
        this.checked_list = JSON.parse(arr);
      }
      this.pop_list = this.formatProductList(this.pop_list, this.checked_list);

      let id_arr = [];
      this.checked_list.forEach(it => {
        if (it.id) {
          id_arr.push(it.id);
        }
      });
      if (!id_arr.length) {
        this.sale_visible = true;
        return;
      }
      id_arr.forEach(it => {
        this.pop_list.forEach(item => {
          if (item.id === it) {
            item.checked = true;
          }
        });
      });
      let has_num = this.formatChecked();
      this.can_choose = has_num >= 3 ? false : true;
      this.sale_visible = true;
    },

    /**
     * @description: 选择商品
     * @param {*} it 当前选中
     * @param {*} k
     * @return {*}
     */
    chooseSale(it, k) {
      if (!this.can_choose && !it.checked) {
        return;
      }
      this.pop_list[k].checked = !this.pop_list[k].checked;
      utils.firebaseLogEvent(
        '10010',
        '-10003',
        'click_report_choice',
        'click',
        {
          args_name: 'click_report_choice',
          // that[it.product_key]:eventProductValue[it.product_key],
          report_id: it.banner_id + '',
          channel: utils.getFBChannel(),
        }
      );
      let has_num = this.formatChecked();
      this.can_choose = has_num >= 3 ? false : true;
    },

    /**
     * @description: 校验时候选择了3个商品
     * @return {*}
     */
    formatChecked() {
      let i = 0;
      this.pop_list.forEach(it => {
        if (it.checked) {
          i++;
        }
      });
      return i;
    },

    closeSalePop() {
      this.getStoreChecked();
      this.sale_visible = false;
    },

    /**
     * @description: 按照ID大小排序
     * @param {*} arr
     * @return {*}
     */
    sortData(arr) {
      return arr.sort((a, b) => {
        return a.id - b.id;
      });
    },

    /**
     * @description: 确认选择的产品
     * @return {*}
     */
    handleConfirm() {
      let i = 0;
      this.pop_list.forEach(it => {
        if (it.checked) {
          i++;
        }
      });
      if (i < 2) {
        Toast('请至少选择两个报告');
        return false;
      }
      this.checked_list = [];
      this.pop_list.forEach(it => {
        if (it.checked) {
          this.checked_list.push(it);
        }
      });
      if (this.checked_list.length < 3) {
        for (let i = 0; i < 4 - this.checked_list.length; i++) {
          this.checked_list.push({ value: '' });
        }
      }
      let has_num = this.formatChecked();
      this.zhekou = has_num > 0 ? has_num - 1 : 2;
      this.sortData(this.checked_list);
      localStorage.setItem(
        'mlxz_checked_list',
        JSON.stringify(this.checked_list)
      );
      utils.firebaseLogEvent(
        '10010',
        '-10002',
        'click_fortune_report_choice_confirm',
        'click',
        {
          args_name: 'click_fortune_report_choice_confirm',
        }
      );

      this.sale_visible = false;
    },

    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    payModal() {
      let i = 0;
      this.checked_list.find(it => {
        if (it.id) {
          i++;
        }
      });
      if (i < 2) {
        Toast('请选择至少两个报告');
        return;
      }

      utils.firebaseLogEvent(
        '10009',
        '-10005',
        'click_fortune_report_sales',
        'click',
        {
          args_name: 'click_fortune_report_sales',
        }
      );
      this.pay_visible = true;
    },

    /**
     * @description: 查看报告/或者填写信息
     * @param {*} val
     * @return {*}
     */
    handleReport(val, index) {
      if (index === 1) {
        utils.firebaseLogEvent(
          '10009',
          '-10003',
          'click_fortune_report_banner',
          'click',
          {
            args_name: 'click_fortune_report_banner',
            banner_id: val.banner_id,
          }
        );
      }
      if (index === 2) {
        utils.firebaseLogEvent(
          '10009',
          '-10006',
          'click_fortune_report_banner2',
          'click',
          {
            args_name: 'click_fortune_report_banner2',
            banner_id: val.banner_id,
          }
        );
      }
      if (index === 3) {
        utils.firebaseLogEvent(
          '10009',
          '-10007',
          'click_fortune_report_banner3',
          'click',
          {
            args_name: 'click_fortune_report_banner3',
            banner_id: val.banner_id,
          }
        );
      }
      location.href = `${val.url}.html`;
    },

    backUrl() {
      location.href = 'mlxz://back';
    },
    jumpAsk(it) {
      if (!it.url) {
        Toast('开发中');
        return;
      }
      location.href = it.url;
    },

    hasPayReport(item) {
      setTimeout(() => {
        this.pay_result_visible = false;
      }, 1000);
      location.href = `${item.url}.html#/?has_pay=SUCCESS&order_id=${item.order_id}&product_key=${item.product_key}`;
    },
    handleText(id) {
      // 使用JavaScript截断文本并添加省略号
      const element = document.getElementById(`text-${id}`);
      let lineHeight = parseInt(
        window.getComputedStyle(element).lineHeight,
        10
      );
      let maxHeight = lineHeight * 2; // 两行文本的高度
      if (element.offsetHeight > maxHeight) {
        // element.textContent = element.textContent.replace(/\W*\s(\S)*$/, '...');
        element.style.webkitLineClamp = '2';
        element.style.webkitBoxOrient = 'vertical';
        element.style.display = '-webkit-box';
        element.style.overflow = 'hidden';
      }
    },
    hiddenText(text) {
      // return text;
      if (text.length > 23) {
        return text.substring(0, 23) + '......';
      } else {
        return text;
      }
    },
  },
};
</script>

<style>
.mint-toast {
  z-index: 2200 !important;
}

.v-modal {
  opacity: 0.7 !important;
}
</style>

<style scoped lang="less">
@import './../../less/reset.less';
@import './../../less/common.less';

.fix-pop {
  position: fixed !important;
  overflow-y: hidden;
}

.container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  background: #f7f3ed;
  // background-image: url('../../assets/img/3.0/header-bg.png');
  // background-repeat: no-repeat;
  // background-size: contain;
  // background-position: top;
  .index-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    .header {
      width: 4.16rem;
      height: 0.8rem;
      margin: 0.3rem auto;
      background-image: url('../../assets/img/3.0/slide.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .slide {
        position: relative;
        width: 3.56rem;
        height: 0.68rem;
        display: flex;
        .slider {
          position: absolute;
          top: 0;
          left: 0;
          width: 1.78rem;
          height: 0.68rem;
          z-index: 1;
          transition-duration: 0.2s;
        }
        .tab {
          position: relative;
          z-index: 2;
          width: 50%;
          font-size: 0.32rem;
          line-height: 0.68rem;
          text-align: center;
          font-weight: bold;
          color: #e6ffff;
          transition-duration: 0.2s;
        }
      }
    }
    .content {
      margin-top: 0.44rem;
    }
  }
}
.header-box {
  width: 7.5rem;
  height: 1.76rem;
  background: url('../../assets/img/mlxz/cesuan_home/bar_img_head2.png')
    no-repeat;
  background-size: contain;
  position: relative;
  .back-icon {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    left: 0.3rem;
    bottom: 0.22rem;
  }
  .title {
    width: 100%;
    text-align: center;
    height: 0.36rem;
    font-size: 0.36rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 0.36rem;
    position: absolute;
    bottom: 0.22rem;
  }
  .icon-right {
    position: absolute;
    right: 0.3rem;
    bottom: 0.22rem;
    width: 0.44rem;
    height: 0.44rem;
  }
}
.swiper-contain {
  height: 3rem;
  width: 100%;
  .swiper-item {
    width: 7.5rem;
    height: 3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.sale-box {
  width: 7.1rem;
  height: 4.32rem;
  background: #ffffff;
  box-shadow: 0 0 0.12rem 0 rgba(68, 68, 68, 0.06);
  border-radius: 0.24rem;
  margin: 0.24rem 0.2rem;
  overflow-x: hidden;
  .title-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem 0.3rem 0.34rem;
    font-family: PingFangSC-Semibold, PingFang SC;

    .left {
      height: 0.32rem;
      font-size: 0.32rem;
      font-weight: 700;
      color: #333333;
      line-height: 0.32rem;
    }
    .right {
      display: flex;
      flex-direction: row;
      justify-content: end;
      align-items: center;
      .total {
        height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #999999;
        line-height: 0.24rem;
        text-decoration: line-through;
      }
      .percent {
        height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #333333;
        line-height: 0.24rem;
        margin: 0 0.04rem;
      }
      .price {
        height: 0.28rem;
        font-size: 0.32rem;
        font-weight: 700;
        color: #962bd1;
        line-height: 0.28rem;
      }
    }
  }
  .sale-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    .item {
      width: 2.02rem;
      height: 1.3rem;
      background: url('../../assets/img/mlxz/cesuan_home/cesuan_btn_add1.png')
        no-repeat;
      background-size: contain;
      margin: 0 0.11rem;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 100%;
        height: 100%;
      }
    }
    .add-icon {
      width: 0.52rem;
      height: 0.52rem;
      position: absolute;
      top: 0.39rem;
      z-index: 10;
    }
    .add-1 {
      left: 2.17rem;
    }
    .add-2 {
      right: 2.19rem;
    }
  }
  .lock-btn {
    position: relative;
    width: 5.86rem;
    height: 0.96rem;
    background: url('../../assets/img/mlxz/cesuan_home/mymm_btn.png') no-repeat;
    background-size: contain;
    margin: 0.4rem 0.62rem 0.14rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 700;
    font-size: 0.32rem;
    color: #fdf4be;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .change-btn {
    width: 100%;
    height: 0.26rem;
    font-size: 0.26rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #666666;
    line-height: 0.26rem;
    text-align: center;
  }
}

.hot-product {
  width: 7.1rem;
  height: 4.56rem;
  background: #ffffff;
  box-shadow: 0 0 0.12rem 0 rgba(68, 68, 68, 0.06);
  border-radius: 0.24rem;
  margin: 0 0.2rem 0.24rem;
  display: flex;
  flex-direction: column;
  font-family: PingFangSC-Semibold, PingFang SC;
  padding: 0.32rem 0 0.3rem 0.26rem;
  .title {
    width: 100%;
    height: 0.32rem;
    font-size: 0.32rem;
    font-weight: 700;
    color: #333333;
    line-height: 0.32rem;
    text-align: left;
    margin-bottom: 0.32rem;
  }
  .product-box {
    width: 100%;
    height: 3.3rem;
    overflow: hidden;
    .swiper-slide {
      width: 2.3rem;
      height: 100%;
      margin-right: 0.16rem;
      border-radius: 0.16rem;
      // padding-left: 0.22rem;
      position: relative;
      display: flex;
      flex-direction: column;
      .title {
        width: 1.61rem;
        height: 0.35rem;
        margin-top: 0.31rem;
        margin-bottom: 0.16rem;
      }
      .info {
        width: 1.8rem;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        margin-bottom: 0.16rem;
        position: relative;
        z-index: 2;
        .hidden-2;
      }
      .ask-btn {
        width: 1.36rem;
        height: 0.5rem;
        border-radius: 0.27rem;
        font-size: 0.26rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 1.16rem;
        z-index: 2;
      }
      .bg {
        width: 2.1rem;
        height: 1.6rem;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
      }
    }
  }
}
.text-1 {
  color: #8b4800;
}
.text-2 {
  color: #9b3124;
}
.text-3 {
  color: #250864;
}
.swiper-1 {
  background: #ffeddf;
}
.swiper-2 {
  background: #ffdfe2;
}
.swiper-3 {
  background: #e5dbff;
}
.ask-bg-1 {
  color: #ffeddf;
  background: #8b4800;
}
.ask-bg-2 {
  color: #ffdfe2;
  background: #9b3124;
}
.ask-bg-3 {
  color: #e5dbff;
  background: #250864;
}
.ad-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    width: 7.1rem;
    height: 2.06rem;
    border-radius: 0.24rem;
    margin-bottom: 0.24rem;
  }
}

.hidden-2 {
  // overflow: hidden !important;
  // text-overflow: ellipsis !important;
  // display: -webkit-box !important;
  // -webkit-box-orient: vertical !important;
  // -webkit-line-clamp: 2 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  word-break: break-all;
  word-wrap: break-word;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
.pop-box {
  width: 7.5rem;
  height: 10.5rem;
  background: linear-gradient(180deg, #ffefeb 0%, #f3ede5 100%);
  border-radius: 0.4rem 0.4rem 0 0;
  padding: 0.4rem 0;
  .pop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFangTC-Semibold, PingFangTC;
    margin-bottom: 0.3rem;
    padding: 0 0.3rem;
    width: 100%;
    .left {
      font-size: 0.36rem;
      font-weight: 700;
      color: #222222;
      line-height: 0.36rem;
      height: 0.36rem;
    }
    .close {
      width: 0.28rem;
      height: 0.28rem;
      position: absolute;
      right: 0.2rem;
    }
  }
  .pop-content {
    // height: 9.6rem;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    padding-bottom: 0.6rem;
    height: 8rem;
    width: 100%;
    margin: 0 0.15rem;
    .item {
      width: 3.34rem;
      height: 2.36rem;
      margin: 0 0.13rem 0.3rem;
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-icon {
        width: 100%;
        height: 1.4rem;
      }
      .bottom-box {
        // margin: 0.16rem 0.22rem 0;
        margin-top: 0.1rem;
        font-size: 0.24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        width: 3rem;
        // height: 0.65rem;
        line-height: 0.35rem;
        // .hidden-2;
      }
    }
    .normal-item {
      background-image: url('../../assets/img/mlxz/cesuan_home/sale_normal_kuang.png');
    }
    .forbidden-item {
      opacity: 0.6;
      background-image: url('../../assets/img/mlxz/cesuan_home/sale_zhezhao_kuang.png');
    }
    .check-icon {
      width: 0.36rem;
      height: 0.36rem;
      position: absolute;
      right: 0;
      top: 0.01rem;
    }
  }
  .confirm-box {
    width: 5.34rem;
    height: 0.88rem;
    background: linear-gradient(180deg, #ff874e 0%, #ef5c36 100%);
    border-radius: 0.44rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0.4rem;
    left: 1.08rem;
  }
}

.btn-icon {
  width: 1.08rem;
  height: 0.48rem;
  position: absolute;
  top: -0.2rem;
  right: 0.18rem;
}
.disabled-confirm {
  // opacity: 0.4;
  display: none !important;
}
</style>
