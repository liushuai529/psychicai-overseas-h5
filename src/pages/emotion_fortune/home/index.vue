<template>
  <div
    :class="{
      container: true,
      'fix-box': choose_time ? true : false,
      'cn-bg': language === 'zh-CN',
      'tw-bg': language === 'zh-TW',
    }"
  >
    <header-notice v-if="has_pay"></header-notice>
    <div @click="backHome()" class="back-box">
      <img
        src="../../../assets/img/common/baogao_icon_home.png"
        class="left"
        alt=""
      />
      <div class="right">{{ is_cn ? '首页' : '首頁' }}</div>
    </div>
    <canvas id="bg-svga"></canvas>
    <img
      class="order-icon"
      @click="toOrder"
      :src="is_cn ? cn_history_order : tw_history_order"
      alt=""
    />
    <div :class="['info', language === 'zh-CN' ? 'cn-info-bg' : 'tw-info-bg']">
      <div class="info-content">
        <div class="info-item">
          <div class="info-label">{{ $t('name-label') }}</div>
          <div class="info-input">
            <input
              type="text"
              id="username"
              v-model="username"
              :placeholder="$t('name-placeholder')"
            />
          </div>
        </div>

        <div class="info-item">
          <div class="info-label">{{ $t('birth-label') }}</div>
          <div class="info-input">
            <div
              class="info-birth"
              :style="{ color: picker_date ? '#333' : 'rgba(51, 51, 51, 0.5)' }"
              @click="openPicker"
            >
              {{ picker_date || $t('birth-placeholder') }}
            </div>
            <img
              @click="openPicker"
              class="info-arrow"
              src="../../../assets/img/emotion/icon_you.png"
            />
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">{{ $t('sex-label') }}</div>
          <div class="info-input">
            <div
              class="sex-tab"
              :class="{ active: sex === '1' }"
              ref="sex_male"
              @click="changeSex(1)"
            >
              <img
                v-if="sex === '1'"
                class="sex-icon"
                src="../../../assets/img/emotion/icon_boy_w.png"
              />
              <img
                v-else
                class="sex-icon"
                src="../../../assets/img/emotion/icon_boy_b.png"
              />
              <div class="sex-text">男</div>
            </div>
            <div
              class="sex-tab"
              :class="{ active: sex === '0' }"
              ref="sex_female"
              @click="changeSex(0)"
            >
              <img
                v-if="sex === '0'"
                class="sex-icon"
                src="../../../assets/img/emotion/icon_girl_w.png"
              />
              <img
                v-else
                class="sex-icon"
                src="../../../assets/img/emotion/icon_girl_b.png"
              />
              <div class="sex-text">女</div>
            </div>
          </div>
        </div>
        <img
          id="info-btn"
          class="info-btn huxi-btn"
          :src="language === 'zh-CN' ? cn_home_btn : tw_home_btn"
          @click="check"
        />
        <div class="info-bottom">
          <img
            v-if="privacyChecked"
            class="info-check"
            src="../../../assets/img/emotion/xieyi-checked.png"
            @click="privacyChecked = !privacyChecked"
          />
          <img
            v-else
            class="info-check"
            src="../../../assets/img/emotion/xieyi-no-check.png"
            @click="privacyChecked = !privacyChecked"
          />
          {{ $t('check-label') }}
          <span @click="link('user_agreement.html')"
            >{{ $t('user-agreement') }} </span
          >{{ $t('and') }}
          <span @click="link('privacy.html')">{{ $t('privacy-policy') }}</span>
        </div>
      </div>
    </div>
    <div class="card-box">
      <canvas id="qian"></canvas>
    </div>
    <img class="card" :src="is_cn ? cn_card_1 : tw_card_1" />
    <img class="card" :src="is_cn ? cn_card_2 : tw_card_2" />
    <img
      v-if="showFixedBtn"
      class="fix-btn huxi-btn"
      :src="language === 'zh-CN' ? cn_home_btn : tw_home_btn"
      @click="check"
    />
    <!-- 時间选择控件 -->
    <DatetimePicker
      start="1960"
      end="2000"
      :year="year"
      :month="month"
      :date="date"
      :birth_hour="birth_hour"
      v-show="choose_time && !show_nongli"
    ></DatetimePicker>
    <NongliPicker
      start="1960"
      end="2000"
      :year="year"
      :month="month"
      :date="date"
      :birth_hour="birth_hour"
      v-show="choose_time && show_nongli"
    ></NongliPicker>
    <!-- <combinePayPop
      :visible="pay_modal"
      :all_list="productList"
      :product_key="product_key"
      :product_price="product_price"
      :query_user_string="query_user_string"
      @update-visible="pay_modal = false"
      @getOrderId="getOrderId"
    ></combinePayPop> -->
    <HotProduct
      product_key="h5_emotion2024"
      url="emotion_fortune"
      e_id="10006"
    />

    <HomeFooter v-if="showFixedBtn" product_key="h5_emotion2024" />
    <PopNotice
      v-if="is_show_notice"
      @close="closeNotice"
      :count_down="count_down"
      :product_key="product_key"
      e_id="10006"
      c_id="-10021"
      c_name="click_2024lovely_discount1"
    />
    <FixedOrder
      v-if="show_fixed_order && !is_show_notice"
      :title="local_title"
      :is_show_move="is_show_notice"
      :new_order_key="new_order_key"
      name="local"
      top="4.7rem"
      :time="local_time"
      @payOrder="checkOrder"
      @jumpDetail="jumpOrder"
    />
    <FixedOrder
      v-if="show_api_order && !is_show_notice"
      :title="last_title"
      :is_show_move="is_show_notice"
      :last_order="last_order"
      name="api"
      top="6.7rem"
      :time="api_time"
      @payOrder="checkOrder"
      @jumpDetail="jumpOrder"
    />
  </div>
</template>
<script>
import FixedOrder from '../../../components/FixedOrder.vue';
import HomeFooter from '../../../components/HomeFooter.vue';
import { Toast, Indicator } from 'mint-ui';
import utils from '../../../libs/utils.js';
import {
  getPayOrderInfoAPI,
  payOrderAPI,
  getLastOrderAPI,
} from '../../../api/api';
import moment from 'moment';
// @ts-ignore
import HeaderNotice from '../../../components/headerNotice.vue';

import DatetimePicker from '../../../components/DatetimePicker';
import NongliPicker from '../../../components/NongliPicker';
import {
  reportEnum,
  reportName,
  path_enums,
  maidianEnum,
} from '../../../libs/enum';

import cn_home_btn from '../../../assets/img/emotion_v2/cn/home_btn.png';
import tw_home_btn from '../../../assets/img/emotion_v2/tw/home_btn.png';

import combinePayPop from '../../../components/combinePayPop.vue';
import { Downloader, Parser, Player } from 'svga.lite';

import cn_header from '../../../assets/img/mlxz/svga/emotion24/cn_header.svga';
import tw_header from '../../../assets/img/mlxz/svga/emotion24/tw_header.svga';
import cn_qian from '../../../assets/img/mlxz/svga/emotion24/cn_qian.svga';
import tw_qian from '../../../assets/img/mlxz/svga/emotion24/tw_qian.svga';

import cn_card_1 from '../../../assets/img/emotion/new/2.png';
import tw_card_1 from '../../../assets/img/emotion/new/tw/2.png';
import cn_card_2 from '../../../assets/img/emotion/new/3.png';
import tw_card_2 from '../../../assets/img/emotion/new/tw/3.png';
import cn_history_order from '../../../assets/img/mlxz/downloadBtn/emotion24.png';
import tw_history_order from '../../../assets/img/mlxz/downloadBtn/tw/emotion24_order.png';

import HotProduct from '../../../components/hotProduct.vue';
import PopNotice from '../../../components/PopNotice.vue';
// 组合测算相关参数
let is_combine = utils.getQueryString('is_combine');
const tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...',
};
export default {
  components: {
    DatetimePicker,
    NongliPicker,
    HeaderNotice,
    combinePayPop,
    HotProduct,
    HomeFooter,
    PopNotice,
    FixedOrder,
  },
  data() {
    return {
      cn_history_order,
      tw_history_order,
      cn_header,
      tw_header,
      cn_qian,
      tw_qian,
      privacyChecked: true, // 同意隐私协议
      showFixedBtn: false,
      sex: '1',
      year: '1995',
      month: '',
      date: '',
      birth_hour: '-1',
      username: '',
      picker_date: '',
      picker_date_obj: null,
      picker_hour: '',
      gongli_nongli: '1',
      choose_time: false,
      show_nongli: false,
      // 底部弹出popup版本所需数据
      visible: false,
      product_id: 2,
      product_key: 'h5_emotion2024',
      query_user_string: '',
      is_combine,
      has_pay: '',
      showFixedBtn: false,
      //
      language: utils.getLanguage(),
      cn_home_btn,
      tw_home_btn,
      cn_card_1,
      tw_card_1,
      cn_card_2,
      tw_card_2,
      is_show_btn: true,
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
    };
  },
  computed: {
    productList() {
      return this.$store.state.common.productList;
    },
    is_cn() {
      return this.language === 'zh-CN';
    },
    is_show_hot() {
      return ['enjoy02', 'panda02'].includes(utils.getFBChannel());
    },
    show_fixed_order() {
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
  },
  watch: {
    is_show_notice(val) {
      if (val) {
      }
    },
    username(val) {
      if (val) {
        let new_ = val.trim();
        let regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.username = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.username = new_.slice(0, 20);
        }
      }
    },
    is_show_notice(val) {
      if (val) {
        utils.firebaseLogEvent(
          '10006',
          '-10020',
          'view_2024lovely_discount1',
          'view',
          {
            args_name: 'view_2024lovely_discount1',
            channel: utils.getFBChannel(),
          }
        );
      }
    },
  },
  created() {
    // window.Adjust &&
    //   window.Adjust.trackEvent({
    //     eventToken: 'x1em8r',
    //   });
    this.$store.dispatch('common/getProduction');
    utils.firebaseLogEvent(
      '10006',
      '-10001',
      'page_view_2024lovely_main',
      'page_view',
      {
        args_name: 'page_view_2024lovely_main',
        channel: utils.getFBChannel(),
      }
    );
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    this.getLastOrder();
  },
  mounted() {
    this.showNoticePop();
    if (utils.isProd()) {
      utils.gcyLog(`查看感情运首页`, {
        mlxz_action_desc: '查看感情运首页FB上报',
        mlxz_action_type: 'view',
        mlxz_channel: `pageview_main_${utils.getFBChannel()}`,
      });
      try {
        fbq('trackCustom', 'CustomChannel', {
          channel: `pageview_main_${utils.getFBChannel()}`,
        });
        utils.gcyLog(`感情运首页`, {
          mlxz_action_desc: '查看感情运首页FB渠道上报',
          mlxz_action_type: 'view',
          mlxz_channel: `pageview_main_${utils.getFBChannel()}`,
        });
      } catch (err) {
        console.log('no fbq:', err);
      }
    }
    // 赋默认值
    let storaged_userInfo = window.localStorage.getItem(
      '_emotion_fortune_info'
    );
    if (storaged_userInfo) {
      let arr = storaged_userInfo.split('|');

      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];

      this.username = arr[0];
      this.sex = arr[1] + '';
      this.gongli_nongli = arr[2];
      this.picker_hour = utils.formateNongliHour(arr[6]);
      // 生日默认值
      if (arr[2] == '1') {
        this.show_nongli = false;
        this.picker_date = `${arr[3]}年${arr[4]}月${arr[5]}日 ${this.picker_hour}`;
      } else {
        this.show_nongli = true;
        this.picker_date = `${arr[3]}年${utils.formateNongliMonth(
          arr[4]
        )}${utils.formateNongliDate(arr[5])} ${this.picker_hour}`;
      }
      // 生日实际传值
      let pick_date = {
        year: arr[3],
        month: arr[4],
        date: arr[5],
        birth_hour: arr[6],
      };
      this.picker_date_obj = pick_date;
      this.$nextTick(() => {
        if (this.sex !== '1') {
          this.$refs.sex_male.click();
          setTimeout(() => {
            this.$refs.sex_female.click();
          }, 10);
        } else {
          this.$refs.sex_female.click();
          setTimeout(() => {
            this.$refs.sex_male.click();
          }, 10);
        }
      });
    }
    let self = this;

    let screenH = window.screen.height;

    let btn = document.getElementById('info-btn');
    document.addEventListener('scroll', e => {
      let flag = utils.isElementInViewport(btn);
      let scroll_distance =
        window.pageYOffset || document.documentElement.scrollTop;
      if (!self.is_show_btn || scroll_distance < 100) {
        self.showFixedBtn = false;
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
    self.loadBg('#bg-svga', self.is_cn ? cn_header : tw_header);
    self.loadBg('#qian', self.is_cn ? cn_qian : tw_qian);
  },
  methods: {
    // 获取订单ID
    getOrderId(val) {
      this.order_id = val;
    },
    // 协议
    link(url) {
      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        location.href = url;
        return;
      }
      if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
        location.href = url;
        return;
      }
      if (time_obj == null) {
        location.href = url;
        return;
      }

      let querystring = '';
      querystring += username;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += gongli_nongli;
      querystring += '|';
      querystring += time_obj.year;
      querystring += '|';
      querystring += time_obj.month;
      querystring += '|';
      querystring += time_obj.date;
      querystring += '|';
      querystring += time_obj.birth_hour || '-1';
      window.localStorage.setItem('_emotion_fortune_info', querystring);
      location.href = url;
    },
    /**
     * @description: 跳转历史订单页
     * @return {*}
     */
    toOrder() {
      utils.jumpToOrder();
    },

    /**
     * @description: 选择性别 这里用于在跳转协议页面返回后清空姓名问题
     * @param {*} val
     * @return {*}
     */
    changeSex(val) {
      this.sex = val + '';
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

    /**
     * @description: 跳转协议页面
     * @param {*} url
     * @return {*}
     */
    toPrivacy(url) {
      this.storeUserInfo(url);
    },

    /**
     * @description: 打开时间选择器
     * @return {*}
     */
    openPicker() {
      this.choose_time = true;
    },

    /**
     * @description: 关闭时间选择器
     * @return {*}
     */
    closePicker() {
      this.choose_time = false;
    },

    /**
     * @description: 跳转协议页面时 如已填充信息 则缓存到本地
     * @param {*} url
     * @return {*}
     */
    storeUserInfo(url) {
      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        location.href = url;
        return;
      }
      // if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
      //   location.href = url;
      //   return;
      // }
      if (time_obj == null) {
        location.href = url;
        return;
      }
      let querystring = '';
      querystring += username;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += gongli_nongli;
      querystring += '|';
      querystring += time_obj.year;
      querystring += '|';
      querystring += time_obj.month;
      querystring += '|';
      querystring += time_obj.date;
      querystring += '|';
      querystring += time_obj.birth_hour || '-1';

      window.localStorage.setItem('_emotion_fortune_info', querystring);
      location.href = url;
    },

    /**
     * @description: 跳转到支付页
     * @return {*}
     */
    async check() {
      // window.Adjust &&
      //   window.Adjust.trackEvent({
      //     eventToken: '2rv42m',
      //   });

      utils.firebaseLogEvent(
        '10006',
        '-10002',
        'click_2024lovely_main',
        'click',
        {
          args_name: 'click_2024lovely_main',
          channel: utils.getFBChannel(),
        }
      );
      await utils.asleep(500);
      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        Toast(this.$t('name-tips'));
        let dom = document.getElementById('username');
        dom.focus();
        return;
      }

      // if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
      //   Toast(this.$t('name-tips-2'));
      //   return;
      // }
      if (time_obj == null) {
        Toast(this.$t('birth-tips'));
        return;
      }
      if (!this.privacyChecked) {
        Toast(this.$t('xieyi-tips'));
        return;
      }

      let querystring = '';
      querystring += username;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += gongli_nongli;
      querystring += '|';
      querystring += time_obj.year;
      querystring += '|';
      querystring += time_obj.month;
      querystring += '|';
      querystring += time_obj.date;
      querystring += '|';
      querystring += time_obj.birth_hour || '-1';

      window.localStorage.setItem('_emotion_fortune_info', querystring);

      let path = 'detail?querystring=' + querystring;
      this.query_user_string = querystring;

      let { has_pay, order_id, product_key } = this.$route.query;

      if (has_pay) {
        if (has_pay === 'SUCCESS') {
          getPayOrderInfoAPI(
            order_id,
            this.getExtra(product_key, querystring)
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
        const { price, unit, product_id, google_goods_id, product_key } = same_;
        // 缓存最新一个订单信息
        localStorage.setItem('mlxz_fixed_order_info', querystring);
        localStorage.setItem('mlxz_fixed_order_key', this.product_key);
        localStorage.setItem(
          `mlxz_new_time_down_${this.product_key}`,
          15 * 60 * 1000
        );

        localStorage.setItem(
          `mlxz_user_info_${this.product_key}`,
          JSON.stringify({
            user_info: querystring,
            product_key: this.product_key,
          })
        );
        let num_ = localStorage.getItem(`mlxz_show_notice_${this.product_key}`);
        localStorage.setItem(
          `mlxz_show_notice_${this.product_key}`,
          num_ ? 2 : 1
        );
        this.product_price = price || '-';
        this.$router.push({ path });
        return;
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
    },

    /**
     * @description: 解析用户信息
     * @param {*} product_key 商品key
     * @param {*} querystring 用户信息拼接string
     * @return {*}
     */
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
            `${birth_year}${
              +birth_month < 10 ? '0' + birth_month : birth_month
            }${+birth_date < 10 ? '0' + birth_date : birth_date}`
          ).format('YYYYMMDD'),
        };
      }

      return params;
    },

    async backHome() {
      utils.firebaseLogEvent(
        '10006',
        '-10011',
        'click_2024lovely_main_home',
        'click',
        {
          args_name: 'click_2024lovely_main_home',
          channel: utils.getFBChannel(),
        }
      );
      await utils.asleep(600);
      let check_event = utils.getQueryStr('check_event');
      if (!check_event && utils.isProd()) {
        location.href = 'index.html';
      } else {
        window.open('index.html', '_blank');
      }
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
        this.count_down = +time_ || 10;
        // this.count_down = time_ ? (set_time_ > +time_ ? set_time_ : +time_) : 0;
        this.local_time =
          +localStorage.getItem('mlxz_fixed_local_order_time') || 10;
      }, 500);
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
      const { ext, pay_method, product_key, product_id, payment } =
        this.last_order;
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
        callback_url: `${location.origin}/${utils.getFBChannel()}/${
          path_enums[product_key]
        }.html#/result?path=${
          path_enums[product_key]
        }&report_price=${payment}&discount_pay=1`,
      };

      const res = await payOrderAPI(params);
      localStorage.removeItem('mlxz_fixed_api_order_id');
      localStorage.removeItem('mlxz_fixed_api_order_time');
      Indicator.close();
      if (res.status !== 1000) return;

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
      if (this.new_order_key === 'h5_marriage') {
        let marry_info = JSON.parse(
          localStorage.getItem('mlxz_user_info_h5_marriage')
        );
        let male_str = marry_info.male_str;
        let female_str = marry_info.female_str;
        let path = `detail?querystring=${marry_info.user_info}&male_str=${male_str}&female_str=${female_str}
&pay_modal=1&use_fixed_time=1&discount_pay=1`;
        location.href = `${location.origin}/${utils.getFBChannel()}/${
          path_enums[this.new_order_key]
        }.html#/${path}`;

        return;
      }
      let path =
        'detail?querystring=' +
        this.fix_order_info +
        '&pay_modal=1' +
        '&use_fixed_time=1&discount_pay=1';

      location.href = `${location.origin}/${utils.getFBChannel()}/${
        path_enums[this.new_order_key]
      }.html#/${path}`;
    },
  },
};
</script>
<style scoped lang="less">
.fix-box {
  position: fixed !important;
}
@keyframes scaleBtn {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.96);
  }
  100% {
    transform: scale(1.04);
  }
}
.cn-bg {
  background-image: url('../../../assets/img/emotion/img_head.png');
}
.tw-bg {
  background-image: url('../../../assets/img/tw_mlxz/emotion/img_head.png');
}
#bg-svga {
  position: absolute;
  width: 7.5rem;
  height: 9rem;
  top: 0;
}

.container {
  width: 7.5rem;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-color: #ffdaf5;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  .title {
    position: relative;
    z-index: 10;
    width: 100%;
    img {
      margin-top: 0.35rem;
      margin-left: 0.51rem;
      width: 2.8rem;
    }
  }
  .cn-info-bg {
    background-image: url('../../../assets/img/emotion/img_name_bg.png');
  }
  .tw-info-bg {
    background-image: url('../../../assets/img/tw_mlxz/emotion/img_name_bg.png');
  }
  .info {
    justify-content: center;
    position: relative;
    display: flex;
    justify-content: center;
    width: 7.06rem;
    height: 7.28rem;
    margin-bottom: 0.2rem;
    // background: url('../../../assets/img/emotion/img_name_bg.png') no-repeat;
    background-size: contain;
    margin-top: 7.36rem;
    .info-bg {
      display: block;
      width: 7.22rem;
      height: 8.06rem;
    }
    .info-content {
      position: absolute;
      top: 1.5rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .info-item {
        margin-bottom: 0.2rem;
        width: 5.8rem;
        display: flex;
        align-items: center;
        .info-label {
          flex: none;
          color: #fff;
          font-size: 0.3rem;
          font-weight: 600;
          margin-right: 0.14rem;
        }
        .info-input {
          flex: auto;
          height: 0.92rem;
          background-color: #fff;
          border-radius: 0.12rem;
          display: flex;
          box-sizing: border-box;
          padding: 0.06rem;
          align-items: center;
          input {
            width: 3rem;
            font-size: 0.3rem;
            line-height: 0.42rem;
            outline: none;
            border: none;
            background-color: transparent;
            padding: 0;
            margin: 0 0.3rem;
            &::input-placeholder {
              color: rgba(51, 51, 51, 0.5);
            }
            &::-webkit-input-placeholder {
              color: rgba(51, 51, 51, 0.5);
            }
            &::-moz-placeholder {
              color: rgba(51, 51, 51, 0.5);
            }
            &::-moz-placeholder {
              color: rgba(51, 51, 51, 0.5);
            }
            &::-ms-input-placeholder {
              color: rgba(51, 51, 51, 0.5);
            }
          }
          .info-birth {
            flex: auto;
            font-size: 0.3rem;
            line-height: 0.42rem;
            margin-left: 0.24rem;
          }
          .info-arrow {
            flex: none;
            width: 0.12rem;
            height: 0.22rem;
            margin-right: 0.14rem;
          }
          .sex-tab {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.3rem;
            color: #333;
            border-radius: 0.08rem;
            .sex-icon {
              display: block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
            }
            &.active {
              color: #fff;
              background-color: #fe60b5;
            }
          }
        }
      }
      .info-btn {
        width: 5.82rem;
        height: 1.24rem;
        margin-top: 0.1rem;
        // animation: scaleBtn 1s infinite ease-in-out alternate;
      }
      .info-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 0.22rem;
        line-height: 0.3rem;
        margin-top: 0.14rem;
        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.12rem;
        }
      }
    }
  }
  .card {
    width: 7.06rem;
    margin-bottom: 0.2rem;
  }
}
.footer {
  width: 100%;
  height: 1rem;
}

.fix-btn {
  width: 5.8rem;
  height: 1.24rem;
  position: fixed;
  bottom: 0;
  z-index:2
  // animation: scaleBtn 1s infinite ease-in-out alternate;
}
.order-icon {
  position: fixed;
  right: 0;
  top: 2.86rem;
  width: 1.08rem;
  height: 1.56rem;
  z-index: 100;
}

.card-box {
  width: 7.06rem;
  height: 4.68rem;
  background: url('../../../assets/img/emotion/new/result_card2.png') no-repeat;
  background-size: contain;
  margin-bottom: 0.2rem;
  #qian {
    width: 100%;
    height: 100%;
  }
}
.footer-box {
  width: 7.5rem;
  height: 1.6rem;

}

.back-box {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  width: 1.32rem;
  height: 0.6rem;
  background: url('../../../assets/img/common/baogao_img_btnbj.png') no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  font-weight: 500;
  font-size: 0.28rem;
  color: #ffffff;
  .left {
    margin-right: 0.08rem;
    width: 0.32rem;
    height: 0.32rem;
  }
}
</style>
../../../api/api.js../../../libs/enum.js
