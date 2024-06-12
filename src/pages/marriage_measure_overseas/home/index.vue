<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-06-05 20:54:43
 * @Description: 八字合婚
-->
<template>
  <div>
    <NavigationBar v-if="is_channel_01" />
    <CalculateBar v-if="comboAttachData && is_show_combination && is_show_current_combination" :is_home="false"
      :product_key="comboAttachData.product_key" :call_back="startCalculateClick" />
    <div :class="{
      home: true,
      'fix-box': choose_time ? true : false,
      'cn-bg': is_cn,
      'tw-bg': !is_cn,
    }" id="home">
      <header-notice v-if="has_pay"></header-notice>
      <div class="top-banner">
        <!-- <canvas id="canvas"></canvas> -->

        <img v-if="language === 'zh-CN'" class="top-banner-img" src="./../../../assets/img/mlxz/bzhh/bzhh_bg.png" />
        <img v-else class="top-banner-img" src="./../../../assets/img/tw_mlxz/bazihehun/home/top-banner.png" />
        <div class="top-content">
          <div class="icon-container">
            <img v-if="language === 'zh-CN'" src="./../../../assets/img/mlxz/bzhh/left-icon.png" />
            <img v-else  src="./../../../assets/img/tw_mlxz/bazihehun/home/left-icon.png" />

            <img v-if="language === 'zh-CN'"  src="./../../../assets/img/mlxz/bzhh/right-icon.png" />
            <img v-else  src="./../../../assets/img/tw_mlxz/bazihehun/home/right-icon.png" />

          </div>
          <info class="info-card" :malename="male.username" :femalename="female.username" :maledate="male.picker_date"
            :malehour="male.picker_hour" :femaledate="female.picker_date" :femalehour="female.picker_hour" />
          <div class="privacy">
            <img v-if="privacyChecked" src="./../../../assets/img/mlxz/bzhh/check.png"
              @click="privacyChecked = !privacyChecked" />
            <img v-else src="./../../../assets/img/mlxz/bzhh/nocheck.png" @click="privacyChecked = !privacyChecked" />
            <span>{{ $t('check-label') }}</span>
            <span style="color: #FFDA27" @click="toService('user_agreement.html')">{{ $t('user-agreement') }}</span>
            <span>和</span>
            <span style="color: #FFDA27" @click="toService('privacy.html')">{{
              $t('privacy-policy')
              }}</span>
          </div>
          <img id="info-btn" class="btn" :src="language === 'zh-CN' ? cn_btn : tw_btn" @click="check" />
          <div class="user">
            <div>已有</div>
            <span>{{ user_number }}人</span>
            <div>{{ $t('cesuan-label') }}</div>
          </div>
        </div>
      </div>
      <img class="card" :src="language === 'zh-CN' ? cn_card1 : tw_card1" />
      <img class="card" :src="language === 'zh-CN' ? cn_card2 : tw_card2" />
      <img class="card" :src="language === 'zh-CN' ? cn_card3 : tw_card3" />
      <img class="card" :src="language === 'zh-CN' ? cn_card4 : tw_card4" />
      <img class="card" :src="language === 'zh-CN' ? cn_card5 : tw_card5" />
      <img v-if="!is_channel_01" class="order" :src="language === 'zh-CN' ? cn_order : tw_order"
        @click="toOrderUrl()" />
      <img v-show="showFixedBtn" class="btn-fixed" :src="language === 'zh-CN' ? cn_btn : tw_btn" @click="check" />

      <!-- 時間選擇控件 -->
      <DatetimePicker :male="sex" start="1959" end="2008" :year="year" :month="month" :date="date"
        :birth_hour="birth_hour" v-show="choose_time && !show_nongli" />
      <NongliPicker :male="sex" start="1959" end="2008" :year="year" :month="month" :date="date"
        :birth_hour="birth_hour" v-show="choose_time && show_nongli" />

      <!-- Popup -->
      <!-- <PayPopup
      ref="PayPopup"
      :visible="visible"
      :product_key="product_key"
      :query_user_string="query_user_string"
      @update-visible="visible = false"
    ></PayPopup> -->

      <!-- <combinePayPop
      :visible="pay_modal"
      :all_list="productList"
      :product_key="product_key"
      :product_price="product_price"
      :query_user_string="query_user_string"
      @update-visible="pay_modal = false"
      @getOrderId="getOrderId"
    ></combinePayPop> -->
      <HomeFooter v-if="showFixedBtn" product_key="h5_marriage" />
      <PopNotice v-if="is_show_notice" @close="closeNotice" :count_down="count_down" :product_key="product_key"
        e_id="10007" c_id="-10014" c_name="click_marriage_discount1" />
      <FixedOrder v-if="show_fixed_order && !is_show_notice" :title="local_title" :is_show_move="is_show_notice"
        :new_order_key="new_order_key" name="local" top="4.7rem" :time="local_time" @payOrder="checkOrder"
        @jumpDetail="jumpOrder" />
      <FixedOrder v-if="show_api_order && !is_show_notice" :title="last_title" :is_show_move="is_show_notice"
        :last_order="last_order" name="api" top="6.7rem" :time="api_time" @payOrder="checkOrder"
        @jumpDetail="jumpOrder" />
      <NewFooter v-if="showFixedBtn" />
    </div>
  </div>
</template>

<script>
import FixedOrder from '../../../components/FixedOrder.vue';
import NavigationBar from '../../../components/NavigationBar.vue';
import CalculateBar from '../../../components/CalculateBar.vue';
import HomeFooter from '../../../components/HomeFooter.vue';
import utils from './../../../libs/utils.js';
import topBanner from './top_banner.vue';
// @ts-ignore
import info from './info.vue';
import toOrder from './../../../components/to_order.vue';
// @ts-ignore
import DatetimePicker from './datetime_picker.vue';
import NongliPicker from './nongli_picker.vue';
import PayPopup from '../../../components/PayPopup';
import TopBar from '../../../components/TopBar';
import { Toast, Indicator } from 'mint-ui';
import {
  getPayOrderInfoAPI,
  payOrderAPI,
  getLastOrderAPI,
  reportBuryingEventAPI,
  getComboAttachAPI,
} from '../../../api/api';
import moment from 'moment';
import HeaderNotice from '../../../components/headerNotice.vue';
import {
  reportEnum,
  reportName,
  path_enums,
  maidianEnum,
} from '../../../libs/enum';

import tw_btn from './../../../assets/img//bzhh_v2/tw/img_btn1.png';
import cn_btn from './../../../assets/img/bzhh_v2/cn/img_btn1.png';

import cn_order from './../../../assets/img/mlxz/bzhh/btn_dingdan.png';
import tw_order from './../../../assets/img/tw_mlxz/bazihehun/home/order.png';

import cn_card1 from './../../../assets/img/mlxz/bzhh/card1.png';
import cn_card2 from './../../../assets/img/mlxz/bzhh/card2.png';
import cn_card3 from './../../../assets/img/mlxz/bzhh/card3.png';
import cn_card4 from './../../../assets/img/mlxz/bzhh/card4.png';
import cn_card5 from './../../../assets/img/mlxz/bzhh/card5.png';

import tw_card1 from './../../../assets/img/tw_mlxz/bazihehun/home/card1.png';
import tw_card2 from './../../../assets/img/tw_mlxz/bazihehun/home/card2.png';
import tw_card3 from './../../../assets/img/tw_mlxz/bazihehun/home/card3.png';
import tw_card4 from './../../../assets/img/tw_mlxz/bazihehun/home/card4.png';
import tw_card5 from './../../../assets/img/tw_mlxz/bazihehun/home/card5.png';
import combinePayPop from '../../../components/combinePayPop.vue';
import cn_header from '../../../assets/img/mlxz/svga/bzhh/cn_header.svga';
import tw_header from '../../../assets/img/mlxz/svga/bzhh/tw_header.svga';
import { Downloader, Parser, Player } from 'svga.lite';
import PopNotice from '../../../components/PopNotice.vue';
import NewFooter from '../../../components/NewFooter.vue';
import tStatistic from 'tstatistic';
tStatistic.init({
  app_key: 20002003,
  channel: utils.getFBChannel(),
});
const tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...',
};
let show_popup = utils.getQueryString('show_popup');

// 组合测算相关参数
let is_combine = utils.getQueryString('is_combine');
let main_order_id = utils.getQueryString('main_order_id');

export default {
  components: {
    topBanner,
    info,
    DatetimePicker,
    NongliPicker,
    toOrder,
    PayPopup,
    TopBar,
    HeaderNotice,
    combinePayPop,
    HomeFooter,
    PopNotice,
    FixedOrder,
    NewFooter,
    NavigationBar,
    CalculateBar,
  },
  data() {
    return {
      cn_header,
      tw_header,
      privacyChecked: true, // 同意隱私協議
      showFixedBtn: false,

      year: '1995',
      month: '',
      date: '',
      birth_hour: '-1',

      choose_time: false,
      choose_hour: false,
      show_nongli: false,
      male: {
        username: '',
        picker_date: '',
        picker_hour: '',
        picker_date_obj: null,
        gongli_nongli: '1',
      },
      female: {
        username: '',
        picker_date: '',
        picker_hour: '',
        picker_date_obj: null,
        gongli_nongli: '1',
      },
      sex: '1',
      gongli_nongli: '1',

      // 底部弹出popup版本所需数据
      visible: false,
      product_id: 1,
      product_key: 'h5_marriage',
      query_user_string: '',

      has_pay: '',
      is_combine,
      is_show_btn: true,
      language: utils.getLanguage(),
      tw_btn,
      cn_btn,
      cn_order,
      tw_order,
      cn_card1,
      cn_card2,
      cn_card3,
      cn_card4,
      cn_card5,
      tw_card1,
      tw_card2,
      tw_card3,
      tw_card4,
      tw_card5,
      pay_modal: false,
      product_price: '',
      // 挽留弹窗
      is_show_notice: false, // 是否展示挽留弹窗
      count_down: 0, // 挽留弹窗倒计时
      fix_order_info: null, //最新一个订单信息
      new_order_key: '',
      reportName,
      show_api_order: false,
      last_order: null,
      api_time: 0,
      local_time: 0,
      last_title: '',
      timer: null,
      comboAttachData: null, //套餐未使用报告信息
    };
  },

  created() {
    this.showComboAttach();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.showComboAttach();
      }
    });
    utils.isProd() &&
      tStatistic &&
      tStatistic.send({
        event: 'page_view_marriage_main',
        md: 10007,
        c_id: -10001,
        args: {
          args_name: 'page_view_marriage_main',
          channel: utils.getFBChannel(),
        },
      });
    this.$store.dispatch('common/getProduction');
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    utils.firebaseLogEvent(
      '10007',
      '-10001',
      'page_view_marriage_main',
      'page_view',
      {
        args_name: 'page_view_marriage_main',
        channel: utils.getFBChannel(),
      }
    );
    this.getLastOrder();

    // 埋点事件上传
    reportBuryingEventAPI({
      event: 'page_view_marriage_main',
      channel: utils.getFBChannel(),
    })
      .then()
      .catch(err => {
        console.warn(`埋点事件上传失败${err}`);
      });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  mounted() {
    this.showNoticePop();

    // 賦默認值
    let storaged_userInfo = window.localStorage.getItem(
      'etouch_marriage_measure_new_userinfo'
    );
    if (storaged_userInfo) {
      let arr = storaged_userInfo.split('|');
      this.male.gongli_nongli = arr[10];
      this.female.gongli_nongli = arr[11];
      this.male.username = arr[0];
      this.female.username = arr[1];
      let maleobj = {
        year: arr[2],
        month: arr[3],
        date: arr[4],
        birth_hour: arr[8],
      };
      let femaleobj = {
        year: arr[5],
        month: arr[6],
        date: arr[7],
        birth_hour: arr[9],
      };

      // 男方生日是否為公曆
      if (arr[10] === '1') {
        this.male.picker_date =
          arr[2] +
          '年' +
          arr[3] +
          '月' +
          arr[4] +
          '日' +
          ' ' +
          utils.formateNongliHour(arr[8]);
      } else {
        this.male.picker_date =
          arr[2] +
          '年' +
          utils.formateNongliMonth(arr[3]) +
          utils.formateNongliDate(arr[4]) +
          ' ' +
          utils.formateNongliHour(arr[8]);
      }
      // 女方生日是否為公曆
      if (arr[11] === '1') {
        this.female.picker_date =
          arr[5] +
          '年' +
          arr[6] +
          '月' +
          arr[7] +
          '日' +
          ' ' +
          utils.formateNongliHour(arr[9]);
      } else {
        this.female.picker_date =
          arr[5] +
          '年' +
          utils.formateNongliMonth(arr[6]) +
          utils.formateNongliDate(arr[7]) +
          ' ' +
          utils.formateNongliHour(arr[9]);
      }
      this.male.picker_date_obj = maleobj;
      this.female.picker_date_obj = femaleobj;
    }
    let self = this;

    let btn = document.getElementById('info-btn');
    document.addEventListener('scroll', e => {
      let flag = utils.isElementInViewport(btn);
      let scroll_distance =
        window.pageYOffset || document.documentElement.scrollTop;
      if (!self.is_show_btn || scroll_distance < 100) {
        this.showFixedBtn = false;
        return;
      }
      if (!flag) {
        self.showFixedBtn = true;
      } else {
        self.showFixedBtn = false;
      }
    });
    let initialWindowHeight = window.innerHeight;
    // 添加resize事件监听器
    window.addEventListener('resize', function () {
      self.is_show_btn =
        initialWindowHeight > window.innerHeight ? false : true;
    });
    // self.loadBg('#canvas', self.is_cn ? self.cn_header : self.tw_header);
  },
  computed: {
    //套餐支付显示逻辑
    is_show_combination() {
      return !["enjoy03", "panda03","enjoy02", "panda02"].includes(utils.getFBChannel());
    },
    //当前报告类型与引导类型不同，则显示
    is_show_current_combination() {
      return this.comboAttachData.product_key !== this.product_key;
    },
    user_number() {
      return this.$store.state.year_user;
    },
    productList() {
      return this.$store.state.common.productList;
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    show_fixed_order() {
      // return true;
      if (this.last_order) {
        if (
          this.last_order.product_key === this.new_order_key &&
          this.last_order.status !== 'PAYED'
        ) {
          return false;
        }
      }

      let flag =
        this.fix_order_info && this.new_order_key !== this.product_key
          ? true
          : false;

      if (flag) {
        const { main_id, click_id, view_id, click_name, view_name } =
          maidianEnum[this.new_order_key];
        utils.firebaseLogEvent(main_id, view_id, view_name, 'view', {
          args_name: view_name,
          channel: utils.getFBChannel(),
        });
      }
      return flag;
    },
    local_title() {
      return utils.getTitle(this.new_order_key);
    },
    is_channel_01() {
      return utils.getFBChannel().indexOf('01') > -1;
    },
  },
  watch: {
    is_show_notice(val) {
      if (val) {
        utils.firebaseLogEvent(
          '10007',
          '-10013',
          'view_marriage_discount1',
          'view',
          {
            args_name: 'view_marriage_discount1',
            channel: utils.getFBChannel(),
          }
        );
      }
    },
  },
  methods: {
    //顶部引导横幅，开始测算
    async startCalculateClick() {
      //顶部套餐报告与当前报告不同
      // if(this.comboAttachData.product_key !== this.product_key) {
      //   location.href = `${path_enums[product_key]}.html#/?has_pay=SUCCESS&order_id=${this.comboAttachData.order_id}&product_key=${this.comboAttachData.product_key}`;
      // } else {

      // }
      location.href = `${path_enums[this.comboAttachData.product_key]
        }.html#/?has_pay=SUCCESS&order_id=${this.comboAttachData.order_id
        }&product_key=${this.comboAttachData.product_key}`;
    },
    //请求接口，是否展示引导标识
    async showComboAttach() {
      const res = await getComboAttachAPI();
      if (res.status !== 1000) return;
      if (res.data && res.data.combine) {
        //组合套餐中未测算的报告
        let sub_orders = res.data.combine.sub_orders.find(
          item => !item.extra_ce_suan
        );
        //获取到未测算的报告信息
        this.comboAttachData = {
          product_id: sub_orders.product_id,
          order_id: sub_orders.order_id,
          product_key: sub_orders.product_key,
        };
      } else {
        this.comboAttachData = null;
      }
    },
    getOrderId(val) {
      this.order_id = val;
    },
    toOrderUrl() {
      utils.jumpToOrder();
    },
    openPicker(isSdate) {
      let person = null;
      if (isSdate == '1') {
        this.sex = '1';
        person = this.male;
      }
      if (isSdate == '0') {
        this.sex = '0';
        person = this.female;
      }

      if (person.picker_date_obj) {
        this.year = person.picker_date_obj.year;
        this.month = person.picker_date_obj.month;
        this.date = person.picker_date_obj.date;
        this.birth_hour = person.picker_date_obj.birth_hour;
      }

      if (person.gongli_nongli === '1') {
        this.show_nongli = false;
      } else {
        this.show_nongli = true;
      }

      this.choose_time = true;
    },
    closePicker() {
      this.choose_time = false;
    },
    closeHourPicker() {
      this.choose_hour = false;
    },
    my_order() {
      utils.toOrder();
    },
    toService(url) {
      if (this.male.username == '') {
        location.href = url;
        return;
      }
      if (this.female.username == '') {
        location.href = url;
        return;
      }
      // if (
      //   !/^[\u4e00-\u9fa5]+$/g.test(this.male.username) ||
      //   !/^[\u4e00-\u9fa5]+$/g.test(this.female.username)
      // ) {
      //   location.href = url;
      //   return;
      // }
      if (this.male.picker_date_obj == null) {
        location.href = url;
        return;
      }
      if (this.female.picker_date_obj == null) {
        location.href = url;
        return;
      }
      if (isNaN(parseInt(this.male.picker_hour))) {
        this.male.picker_hour = -1;
      }
      if (isNaN(parseInt(this.female.picker_hour))) {
        this.female.picker_hour = -1;
      }

      let maleusername = this.male.username;
      let femaleusername = this.female.username;
      let maleyear = this.male.picker_date_obj.year;
      let malemonth = this.male.picker_date_obj.month;
      let maledate = this.male.picker_date_obj.date;
      let femaleyear = this.female.picker_date_obj.year;
      let femalemonth = this.female.picker_date_obj.month;
      let femaledate = this.female.picker_date_obj.date;
      let malehour = parseInt(this.male.picker_date_obj.birth_hour);
      let femalehour = parseInt(this.female.picker_date_obj.birth_hour);
      let male_rili = this.male.gongli_nongli;
      let female_rili = this.female.gongli_nongli;
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
      window.localStorage.setItem(
        'etouch_marriage_measure_new_userinfo',
        querystring
      );
      location.href = url;
    },
    async check() {
      let gongli_nongli = this.gongli_nongli;
      if (this.male.username == '') {
        utils.firebaseLogEvent(
          '10007',
          '-10002',
          'click_marriage_main',
          'click',
          {
            args_name: 'click_marriage_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('male-name-check'));
        let dom = document.getElementById('maleusername');
        dom.focus();
        return;
      }
      if (this.female.username == '') {
        utils.firebaseLogEvent(
          '10007',
          '-10002',
          'click_marriage_main',
          'click',
          {
            args_name: 'click_marriage_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('female-name-check'));
        let dom2 = document.getElementById('femaleusername');
        dom2.focus();
        return;
      }

      // if (
      //   !/^[\u4e00-\u9fa5]+$/g.test(this.male.username) ||
      //   !/^[\u4e00-\u9fa5]+$/g.test(this.female.username)
      // ) {
      //   Toast(this.$t('chinese-name-check'));
      //   return;
      // }
      if (this.male.picker_date_obj == null) {
        utils.firebaseLogEvent(
          '10007',
          '-10002',
          'click_marriage_main',
          'click',
          {
            args_name: 'click_marriage_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('male-date-check'));
        return;
      }
      if (this.female.picker_date_obj == null) {
        utils.firebaseLogEvent(
          '10007',
          '-10002',
          'click_marriage_main',
          'click',
          {
            args_name: 'click_marriage_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('female-date-check'));
        return;
      }
      if (!this.privacyChecked) {
        utils.firebaseLogEvent(
          '10007',
          '-10002',
          'click_marriage_main',
          'click',
          {
            args_name: 'click_marriage_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('agree-check'));
        return;
      }

      if (isNaN(parseInt(this.male.picker_hour))) {
        this.male.picker_hour = -1;
      }
      if (isNaN(parseInt(this.female.picker_hour))) {
        this.female.picker_hour = -1;
      }

      let maleusername = this.male.username;
      let femaleusername = this.female.username;
      let maleyear = this.male.picker_date_obj.year;
      let malemonth = this.male.picker_date_obj.month;
      let maledate = this.male.picker_date_obj.date;
      let femaleyear = this.female.picker_date_obj.year;
      let femalemonth = this.female.picker_date_obj.month;
      let femaledate = this.female.picker_date_obj.date;
      let malehour = parseInt(this.male.picker_date_obj.birth_hour);
      let femalehour = parseInt(this.female.picker_date_obj.birth_hour);
      let male_rili = this.male.gongli_nongli;
      let female_rili = this.female.gongli_nongli;
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
      window.localStorage.setItem(
        'etouch_marriage_measure_new_userinfo',
        querystring
      );
      let male_str = `${maleusername}|1|${male_rili}|${maleyear}|${malemonth}|${maledate}|${malehour}`;
      let female_str = `${femaleusername}|0|${female_rili}|${femaleyear}|${femalemonth}|${femaledate}|${femalehour}`;
      let path =
        'detail?querystring=' +
        querystring +
        '&male_str=' +
        male_str +
        '&female_str=' +
        female_str;
      this.query_user_string = querystring;
      utils.firebaseLogEvent(
        '10007',
        '-10002',
        'click_marriage_main',
        'click',
        {
          args_name: 'click_marriage_main',
          channel: utils.getFBChannel(),
          click_type: 'screen_tracking',
        }
      );
      if (utils.isProd()) {
        await utils.checkFB();
        try {
          fbq('track', 'Lead');
        } catch (err) {
          console.error('Lead  error message:', err);
        }
      }
      if (show_popup) {
        this.visible = true;
      } else if (is_combine) {
        let paypopup = this.$refs.PayPopup;
        paypopup.combinePay(main_order_id, this.product_id, querystring);
      } else {
        let { has_pay, order_id } = this.$route.query;
        if (has_pay) {
          if (has_pay === 'SUCCESS') {
            getPayOrderInfoAPI(
              order_id,
              this.getExtra('h5_marriage', querystring)
            ).then(res => {
              if (res.data) {
                this.$router.push({
                  path: 'result',
                  query: { order_id: order_id, status: 'SUCCESS' },
                });
              }
            });
          }
        } else {
          let same_ = this.productList.find(
            item => item.product_key === this.product_key
          );
          const { price, unit, product_id, google_goods_id, product_key } =
            same_;
          // 缓存最新一个订单信息
          localStorage.setItem('mlxz_fixed_order_info', querystring);
          localStorage.setItem('mlxz_fixed_order_key', this.product_key);
          localStorage.removeItem(`mlxz_new_time_down_${this.product_key}`);

          localStorage.setItem(
            `mlxz_user_info_${this.product_key}`,
            JSON.stringify({
              user_info: querystring,
              product_key: this.product_key,
              male_str: male_str,
              female_str: female_str,
            })
          );
          let num_ = localStorage.getItem(
            `mlxz_show_notice_${this.product_key}`
          );
          localStorage.setItem(
            `mlxz_show_notice_${this.product_key}`,
            num_ ? 2 : 1
          );
          this.$router.push({ path });
          return;
          this.product_price = price || '-';
          if (utils.isVersionMoreThan('1.1.1')) {
            this.pay_modal = true;
            return;
          }

          let params = {
            pay_method: 'google_pay',
            product_key: product_key,
            platform: 'ANDROID',
            product_id: product_id,
            extra_ce_suan: this.getExtra(product_key, querystring),
          };
          payOrderAPI(params).then(res => {
            if (res.status === 1000) {
              Indicator.close();
              this.order_id = res.data.id;
              window.psychicai_client.onWebPayDialog(
                res.data.id,
                price + '',
                unit,
                google_goods_id,
                reportEnum[product_key]
              );
            }
          });
          return;
          this.$router.push({ path });
        }
      }
    },
    // 解析参数字符串
    getExtra(product_key, querystring) {
      let params = null;
      let query_user_string = querystring;
      let query_user_string_array = query_user_string.split('|');

      // 八字合婚 双人信息
      if (product_key === 'h5_marriage') {
        let [
          male_name,
          female_name,
          male_birth_year,
          male_birth_month,
          male_birth_date,
          female_birth_year,
          female_birth_month,
          female_birth_date,
          male_birth_hour,
          female_birth_hour,
          male_is_gongli,
          female_is_gongli,
          sex,
        ] = query_user_string_array;

        params = {
          male_name,
          female_name,
          male_birth_year,
          male_birth_month,
          male_birth_date,
          female_birth_year,
          female_birth_month,
          female_birth_date,
          male_birth_hour,
          female_birth_hour,
          male_is_gongli,
          female_is_gongli,
          sex,
        };
      }
      // 其他 单人信息
      else {
        let [
          name,
          sex,
          is_gongli,
          birth_year,
          birth_month,
          birth_date,
          birth_hour,
        ] = query_user_string_array;

        params = {
          name,
          sex,
          is_gongli,
          birth_year,
          birth_month,
          birth_date,
          birth_hour,
          date: moment(
            `${birth_year}${+birth_month < 10 ? '0' + birth_month : birth_month
            }${+birth_date < 10 ? '0' + birth_date : birth_date}`
          ).format('YYYYMMDD'),
        };
      }
      return params;
    },
    // 端内加载背景SVGA动画
    loadBg(dom, url, is_loop = true) {
      const downloader = new Downloader();
      // 默认调用 WebWorker 线程解析
      // 可配置 new Parser({ disableWorker: true }) 禁止
      const parser = new Parser();
      // #canvas 是 HTMLCanvasElement
      const player = new Player(dom);

      (async () => {
        const fileData = await downloader.get(url);
        const svgaData = await parser.do(fileData);

        player.set({ loop: is_loop });

        await player.mount(svgaData);

        // 开始播放动画
        player.start();
      })();
    },
    // 展示挽留弹窗  通过定时器
    showNoticePop() {
      setInterval(() => {
        this.fix_order_info = localStorage.getItem('mlxz_fixed_order_info');
        this.new_order_key = localStorage.getItem('mlxz_fixed_order_key');
        let is_show_notice = localStorage.getItem(
          `mlxz_show_notice_${this.product_key}`
        );
        this.is_show_notice = is_show_notice
          ? +is_show_notice === 1
            ? true
            : false
          : false;
        let time_ = localStorage.getItem(`mlxz_count_down_${this.product_key}`);
        let set_time_ = (5 * 60 + 48) * 1000 + 280;

        this.count_down = +time_ || 0;
        // this.count_down = time_ ? (set_time_ > +time_ ? set_time_ : +time_) : 0;
        this.local_time =
          +localStorage.getItem('mlxz_fixed_local_order_time') || 0;
      }, 1000);
    },
    // 关闭当前报告的挽留弹窗
    closeNotice() {
      localStorage.setItem(`mlxz_show_notice_${this.product_key}`, 2);
      localStorage.removeItem(`mlxz_count_down_${this.product_key}`);
      this.is_show_notice = false;
    },
    // 获取最新一个订单信息
    async getLastOrder() {
      const res = await getLastOrderAPI();
      if (res.status !== 1000) return;
      this.last_order = res.data;
      this.last_title = utils.getTitle(
        this.last_order ? this.last_order.product_key : ''
      );

      if (
        this.last_order &&
        this.last_order.status !== 'PAYED' &&
        this.last_order.product_key !== this.product_key
      ) {
        this.logDiscountEvent();

        //
        if (
          +localStorage.getItem('mlxz_fixed_api_order_id') ===
          this.last_order.id
        ) {
          this.api_time = +localStorage.getItem('mlxz_fixed_api_order_time');
          this.show_api_order = true;
          return;
        }
        this.api_time =
          +localStorage.getItem('mlxz_fixed_api_order_time') || 15 * 60 * 1000;
        localStorage.setItem('mlxz_fixed_api_order_id', this.last_order.id);
        this.show_api_order = true;
      } else {
        this.show_api_order = false;
      }
    },
    logDiscountEvent() {
      const { ext, pay_method, product_key, product_id, payment } =
        this.last_order;
      const { main_id, click_id, view_id, click_name, view_name } =
        maidianEnum[product_key];
      utils.firebaseLogEvent(main_id, view_id, view_name, 'view', {
        args_name: view_name,
        channel: utils.getFBChannel(),
      });
    },
    // api订单下单
    async checkOrder() {
      const {
        ext,
        pay_method,
        product_key,
        product_id,
        payment,
        trade_pay_type,
        trade_target_org,
      } = this.last_order;
      const { main_id, click_id, view_id, click_name, view_name } =
        maidianEnum[product_key];
      utils.firebaseLogEvent(main_id, click_id, click_name, 'click', {
        args_name: click_name,
        channel: utils.getFBChannel(),
      });
      Indicator.open(tipsArr5[utils.getLanguage()]);

      if (this.last_order.status === 'PAYED') return;
      let params = {
        pay_method: pay_method,
        product_key: product_key,
        product_id: product_id,
        platform: 'WEB',
        extra_ce_suan: ext,
        trade_pay_type,
        trade_target_org,
        callback_url: `${location.origin}/${utils.getFBChannel()}/${path_enums[product_key]
          }.html#/result?path=${path_enums[product_key]
          }&report_price=${payment}&discount_pay=1`,
      };

      const res = await payOrderAPI(params);
      localStorage.removeItem('mlxz_fixed_api_order_id');
      localStorage.removeItem('mlxz_fixed_api_order_time');
      Indicator.close();
      if (res.status !== 1000) return;
      this.show_api_order = false;

      await utils.asleep(1000);
      location.href = res.data.pay_url;
    },
    jumpOrder() {
      const { main_id, click_id, view_id, click_name, view_name } =
        maidianEnum[this.new_order_key];
      utils.firebaseLogEvent(main_id, click_id, click_name, 'click', {
        args_name: click_name,
        channel: utils.getFBChannel(),
      });
      let path =
        'detail?querystring=' +
        this.fix_order_info +
        '&pay_modal=1' +
        '&use_fixed_time=1&discount_pay=1';

      location.href = `${location.origin}/${utils.getFBChannel()}/${path_enums[this.new_order_key]
        }.html#/${path}`;
    },
  },
};

</script>

<style scoped>
#canvas {
  width: 7.5rem;
  height: 12rem;
  position: absolute;
  z-index: 1;
}

.fix-box {
  position: fixed !important;
}

/* .cn-bg {
  background-image: url('../../../assets/img/mlxz/bzhh/bzhh_bg.png');
}
.tw-bg {
  background-image: url('../../../assets/img/tw_mlxz/bazihehun/home/top-banner.png');
} */
.home {
  width: 7.5rem;
  background-color: #7F1416;
  background-size: contain;
  background-repeat: no-repeat;
  min-height: 100vh;
  font-size: 0;
  padding-bottom: 2.8rem;
  position: relative;
}

.top-banner {
  position: relative;
  font-size: 0;
}

.top-banner-img {
  width: 7.5rem;
  height: 10.8rem;
}

.top-content {
  /* position: absolute; */
  margin-top: -5.6rem;
  z-index: 2;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  .icon-container {
    width: 100%;
    height: 2.16rem;
    display: flex;
    justify-content: space-between;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    margin-bottom: 0.6rem;
    animation: moveUpDown 2s infinite ease-in-out alternate;
    img {
      width: 2.16rem;
      height: 2.16rem;
    }
  }

  
}

.info-card {
  margin-bottom: 0.3rem;
}

.privacy {
  font-size: 0.28rem;
  line-height: 0.28rem;
  color: #ffe1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3rem;
}

.privacy img {
  width: 0.28rem;
  height: 0.28rem;
  margin-right: 0.1rem;
}

.btn {
  width: 6.6rem;
  height: 1.32rem;
  margin-bottom: 0.2rem;
  animation: btnMove 1s infinite ease-in-out alternate;
}

.user {
  font-size: 0.36rem;
  line-height: 0.36rem;
  font-weight: bold;
  color: #ffe1e1;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
}

.user span {
  color: #FFDA27;
}

.card {
  width: 100%;
  margin-bottom: 0.3rem;
}

.info {
  width: 100%;
}

.order {
  position: fixed;
  width: 0.92rem;
  height: 1.81rem;
  top: 1.6rem;
  right: 0rem;
  z-index: 3;
}

.btn-fixed {
  position: fixed;
  width: 6.6rem;
  left: 50%;
  margin-left: -3.3rem;
  bottom: 1.2rem;
  z-index: 99;
  animation: btnMove 1s infinite ease-in-out alternate;
}
@keyframes moveUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0.2rem);
  }
  100% {
    transform: translateY(0);
  }
}



</style>
