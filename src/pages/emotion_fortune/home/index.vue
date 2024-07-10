<template>
  <div>
    <NavigationBar v-if="is_channel_01" />
    <CalculateBar
      v-if="
        comboAttachData && is_show_combination && is_show_current_combination
      "
      :is_home="false"
      :product_key="comboAttachData.product_key"
      :call_back="startCalculateClick"
    />
    <header-notice v-if="has_pay"></header-notice>
    <FbShareNotice v-if="is_show_fb_notice"/>
    
    <div
      :class="{
        container: true,
        'fix-box': choose_time ? true : false,
        'cn-bg': language === 'zh-CN',
        'tw-bg': language === 'zh-TW',
      }"
    >
     
      <div
        v-if="!is_channel_01 && !is_channel_05"
        @click="backHome()"
        :class="['back-box']"
        :style="getStyle"
      >
        <img
          src="../../../assets/img/common/baogao_icon_home.webp"
          class="left"
          alt=""
        />
        <div class="right">{{ is_cn ? '首页' : '首頁' }}</div>
      </div>
      <!-- <canvas id="bg-svga"></canvas> -->
      <img
        v-if="!is_channel_01"
        class="order-icon"
        @click="toOrder"
        :src="is_cn ? cn_history_order : tw_history_order"
        alt=""
      />
      <div
        :class="['info']"
      >
        <div class="info-content">
          <img class="info-img":src="language === 'zh-CN'? cn_info: tw_info"/>
          <div class="info-item">
            <div class="info-label">{{ $t('name-label') }}:</div>
            <div class="info-input">
              <input
                type="text"
                id="username"
                v-model="username"
                :placeholder="$t('name-placeholder')"
              />
            </div>
          </div>
          <div class="divider-line"></div>
          <div class="info-item">
            <div class="info-label">{{ $t('birth-label') }}:</div>
            <div class="info-input">
              <div
                class="info-birth"
                :style="{
                  color: picker_date ? '#333' : 'rgba(51, 51, 51, 0.5)',
                }"
                @click="openPicker"
              >
                {{ picker_date || $t('birth-placeholder') }}
              </div>
              <img
                @click="openPicker"
                class="info-arrow"
                src="../../../assets/img/emotion_v2/new/icon_you.webp"
              />
            </div>
          </div>
          <div class="divider-line"></div>

          <div class="info-item">
            <div class="info-label">{{ $t('sex-label') }}:</div>
            <div class="info-input">
              <div
                class="sex-tab left-tab"
                :class="{ active: sex === '1' }"
                ref="sex_male"
                @click="changeSex(1)"
              >
                <div class="sex-text">男</div>
              </div>
              <div
                class="sex-tab"
                :class="{ active: sex === '0' }"
                ref="sex_female"
                @click="changeSex(0)"
              >
                <div class="sex-text">女</div>
              </div>
            </div>
            
          </div>
          <div class="divider-line"></div>

          <div class="info-item">
            <div class="info-label">{{ $t('email-label') }}:</div>
            <div class="info-input">
              <input
                type="text"
                id="email"
                v-model="email"
                :placeholder="$t('email-placeholder')"
              />
            </div>
          </div>

          <img
            id="info-btn"
            class="info-btn emo-btn"
            :src="language === 'zh-CN' ? cn_home_btn : tw_home_btn"
            @click="check"
          />
          <div class="info-bottom">
            <img
              v-if="privacyChecked"
              class="info-check"
              src="../../../assets/img/emotion/xieyi-checked.webp"
              @click="privacyChecked = !privacyChecked"
            />
            <img
              v-else
              class="info-check"
              src="../../../assets/img/emotion/xieyi-no-check.webp"
              @click="privacyChecked = !privacyChecked"
            />
            {{ $t('check-label') }}
            <span @click="link('user_agreement.html')"
              >{{ $t('user-agreement') }} </span
            >{{ $t('and') }}
            <span @click="link('privacy.html')">{{
              $t('privacy-policy')
            }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="card-box">
      <canvas id="qian"></canvas>
    </div> -->
      <!-- <img class="card" :src="is_cn ? cn_card_1 : tw_card_1" />
    <img class="card" :src="is_cn ? cn_card_2 : tw_card_2" /> -->
      <img class="card mt-180" :src="is_cn ? cn_icon_1 : tw_icon_1" />
      <img class="card" :src="is_cn ? cn_icon_2 : tw_icon_2" />
      <img class="card" :src="is_cn ? cn_icon_3 : tw_icon_3" />
      <img class="card" :src="is_cn ? cn_icon_4 : tw_icon_4" />
      <img class="card" :src="is_cn ? cn_icon_5 : tw_icon_5" />
      <img
        v-if="showFixedBtn"
        class="fix-btn emo-btn"
        :src="language === 'zh-CN' ? cn_home_btn : tw_home_btn"
        @click="check"
      />
      <!-- 時间选择控件 -->
      <DatetimePicker
        start="1901"
        end="2020"
        :year="year"
        :month="month"
        :date="date"
        :birth_hour="birth_hour"
        v-show="choose_time && !show_nongli"
      ></DatetimePicker>
      <NongliPicker
        start="1901"
        end="2020"
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
        v-if="!is_channel_05"
        product_key="h5_emotion2024"
        url="emotion_fortune"
        e_id="10006"
      />
      <NewFooter v-if="showFixedBtn" product_key="h5_emotion2024" />
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
  </div>
</template>
<script>
import NavigationBar from '../../../components/NavigationBar.vue';
import CalculateBar from '../../../components/CalculateBar.vue';
import FbShareNotice from '../../../components/FbShareNotice.vue';
import FixedOrder from '../../../components/FixedOrder.vue';
import HomeFooter from '../../../components/HomeFooter.vue';
import { Toast, Indicator } from 'mint-ui';
import utils from '../../../libs/utils.js';
import {
  getPayOrderInfoAPI,
  payOrderAPI,
  getLastOrderAPI,
  getComboAttachAPI,
  reportBuryingEventAPI,
} from '../../../api/api';
import moment from 'dayjs';
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

import cn_home_btn from '../../../assets/img/emotion_v2/new/cn/btn.webp';
import tw_home_btn from '../../../assets/img/emotion_v2/new/tw/btn.webp';

import combinePayPop from '../../../components/combinePayPop.vue';
import { Downloader, Parser, Player } from 'svga.lite';

import cn_card_1 from '../../../assets/img/emotion/new/2.webp';
import tw_card_1 from '../../../assets/img/emotion/new/tw/2.webp';
import cn_card_2 from '../../../assets/img/emotion/new/3.webp';
import tw_card_2 from '../../../assets/img/emotion/new/tw/3.webp';
import cn_history_order from '../../../assets/img/emotion_v2/new/bgm_lsdd.webp';
import tw_history_order from '../../../assets/img/emotion_v2/new/bgm_lsdd_fan.webp';

import HotProduct from '../../../components/hotProduct.vue';
import PopNotice from '../../../components/PopNotice.vue';

import cn_icon_1 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home1.webp';
import cn_icon_2 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home2.webp';
import cn_icon_3 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home3.webp';
import cn_icon_4 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home4.webp';
import cn_icon_5 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home5.webp';


import tw_icon_1 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home1_fanti.webp';
import tw_icon_2 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home2_fanti.webp';
import tw_icon_3 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home3_fanti.webp';
import tw_icon_4 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home4_fanti.webp';
import tw_icon_5 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home5_fanti.webp';
import cn_info from '../../../assets/img/emotion_v2/new/cn/info.webp';
import tw_info from '../../../assets/img/emotion_v2/new/cn/info.webp';
import NewFooter from '../../../components/NewFooter.vue';

import tStatistic from 'tstatistic';
tStatistic.init({
  app_key: 20002003,
  channel: utils.getFBChannel(),
});

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
    NewFooter,
    NavigationBar,
    CalculateBar,
    FbShareNotice,
  },
  data() {
    return {
      cn_icon_1,
      cn_icon_2,
      cn_icon_3,
      cn_icon_4,
      cn_icon_5,
      tw_icon_1,
      tw_icon_2,
      tw_icon_3,
      tw_icon_4,
      tw_icon_5,
      cn_history_order,
      tw_history_order,
      cn_info,
      tw_info,

      privacyChecked: true, // 同意隐私协议
      showFixedBtn: false,
      sex: '1',
      year: '1995',
      month: '',
      date: '',
      birth_hour: '-1',
      username: '',
      email: '',
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
      timer: null,
      comboAttachData: null, //套餐未使用报告信息
    };
  },
  computed: {
    is_show_fb_notice() {
      return utils.isFBContainer() && utils.getFBChannel().indexOf('02')>-1;
    },
    getStyle() {
      return
      //有未使用报告引导框、没有支付提醒tips
      if (
        this.comboAttachData &&
        this.comboAttachData.product_key &&
        !this.has_pay
      ) {
        console.warn('有未使用报告引导框、没有支付提醒tips');
        return 'top: 0.5rem';
      } else if (
        this.comboAttachData &&
        this.comboAttachData.product_key &&
        this.has_pay
      ) {
        //有未使用报告引导框、有支付提醒tips
        console.warn('有未使用报告引导框、有支付提醒tips');
        return 'top: 0.7rem';
      } else if (
        !this.comboAttachData && this.has_pay && this.is_show_fb_notice
      ) {
        console.warn('没有有未使用报告引导框、有支付提醒tip、有FB引导');
        //没有有未使用报告引导框、有支付提醒tips
        return 'top: 1.2rem';
      } else if (
        !this.comboAttachData && this.has_pay
      ) {
        console.warn('没有有未使用报告引导框、有支付提醒tips');
        //没有有未使用报告引导框、有支付提醒tips
        return 'top: 0.7rem';
      } else if (
        !this.comboAttachData && this.is_show_fb_notice
      ) {
        console.warn('没有有未使用报告引导框、有FB引导');
        //没有有未使用报告引导框、有FB引导
        return 'top: 0.7rem';
      } 
    },
    //套餐支付显示逻辑
    is_show_combination() {
      return ['enjoy01', 'panda02'].includes(
        utils.getFBChannel()
      );
    },
    //当前报告类型与引导类型不同，则显示
    is_show_current_combination() {
      return this.comboAttachData.product_key !== this.product_key;
    },
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
    is_channel_01() {
      return utils.getFBChannel().indexOf('01') > -1;
    },
    is_channel_05() {
      return utils.getFBChannel().indexOf('05') > -1;
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
    this.showComboAttach();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.showComboAttach();
        console.log('page_back','返回到感情运首页')
        utils.gcyLog(`page_back`, {
          mlxz_action_desc: '返回到感情运首页',
        });
      }
    });
    utils.isProd() &&
      tStatistic &&
      tStatistic.send({
        event: 'page_view_lovely_main',
        md: 10006,
        c_id: -10001,
        args: {
          args_name: 'page_view_lovely_main',
          channel: utils.getFBChannel(),
        },
      });
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
    // 埋点事件上传
    reportBuryingEventAPI({
      event: 'page_view_2024lovely_main',
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
    //svga动画预加载
    this.preloadSVGA()
    if (utils.isProd()) {
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
    this.showNoticePop();

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
      this.email = arr[7];

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
    // self.loadBg('#bg-svga', self.is_cn ? cn_header : tw_header);
    // self.loadBg('#qian', self.is_cn ? cn_qian : tw_qian);
  },
  methods: {
    setAnimation() {
      localStorage.setItem('mlxz_outer_animation', '1');
    },
    async preloadSVGA() {
      var svgaUrl = 'https://psychicai-static.psychicai.pro/imgs/2406c6f666683c824312b07e66feb0c73ad2.svga'; // 替换为你的SVGA文件路径
      var image = new Image();
      image.src = svgaUrl;
      image.onload = function() {
          console.log('SVGA preloaded successfully');
      };
      image.onerror = function() {
          console.error('Failed to preload SVGA');
      };
    },
    //顶部引导横幅，开始测算
    async startCalculateClick() {
      //顶部套餐报告与当前报告不同
      // if(this.comboAttachData.product_key !== this.product_key) {
      //   location.href = `${path_enums[product_key]}.html#/?has_pay=SUCCESS&order_id=${this.comboAttachData.order_id}&product_key=${this.comboAttachData.product_key}`;
      // } else {

      // }
      location.href = `${
        path_enums[this.comboAttachData.product_key]
      }.html#/?has_pay=SUCCESS&order_id=${
        this.comboAttachData.order_id
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
    // 获取订单ID
    getOrderId(val) {
      this.order_id = val;
    },
    // 协议
    link(url) {
      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let email = this.email;
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
      if (email == '') {
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
      querystring += '|';
      querystring += email;
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
      let email = this.email;
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
      querystring += '|';
      querystring += email;

      window.localStorage.setItem('_emotion_fortune_info', querystring);
      location.href = url;
    },

    /**
     * @description: 跳转到支付页
     * @return {*}
     */
    async check() {
      let username = this.username;
      let email = this.email;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        utils.firebaseLogEvent(
          '10006',
          '-10002',
          'click_2024lovely_main',
          'click',
          {
            args_name: 'click_2024lovely_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
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
        utils.firebaseLogEvent(
          '10006',
          '-10002',
          'click_2024lovely_main',
          'click',
          {
            args_name: 'click_2024lovely_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('birth-tips'));
        return;
      }
      if (!this.privacyChecked) {
        utils.firebaseLogEvent(
          '10006',
          '-10002',
          'click_2024lovely_main',
          'click',
          {
            args_name: 'click_2024lovely_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('xieyi-tips'));
        return;
      }

      if (email == '') {
        Toast(this.$t('email-tips'));
        let dom = document.getElementById('email');
        dom.focus();
        return;
      }
      if(!utils.checkEmail(email)) {
        Toast(this.$t('email-tips-1'));
        let dom = document.getElementById('email');
        dom.focus();
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
      querystring += '|';
      querystring += email;
      //设置过渡动画标识
      this.setAnimation();
      window.localStorage.setItem('_emotion_fortune_info', querystring);
      let path = 'detail?querystring=' + querystring;
      this.query_user_string = querystring;
      utils.firebaseLogEvent(
        '10006',
        '-10002',
        'click_2024lovely_main',
        'click',
        {
          args_name: 'click_2024lovely_main',
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
          email,
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
          email,
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
          email,
        ] = query_user_string_array;

        params = {
          name,
          sex,
          is_gongli,
          birth_year,
          birth_month,
          birth_date,
          birth_hour,
          email,
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
      this.timer = setInterval(() => {
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
        fb_param: {
          fbc: utils.getcookieInfo('_fbc'),
          fbp: utils.getcookieInfo('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id'),
        },
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
  background-image: url('../../../assets/img/emotion_v2/new/cn/bg.webp');
}
.tw-bg {
  background-image: url('../../../assets/img/emotion_v2/new/cn/bg.webp');
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
  background-color: #ec436b;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  padding-bottom: 1.2rem;
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

  .info {
    justify-content: center;
    position: relative;
    display: flex;
    justify-content: center;
    width: 7.1rem;
    min-height: 5.45rem;
    border-radius: 0.16rem;
    background: rgba(255, 250, 250, 1);
    margin-top: 8.83rem;
    .info-bg {
      display: block;
      width: 7.22rem;
      height: 8.06rem;
    }
    .info-content {
      position: absolute;
      top: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .info-img {
        width: 6.68rem;
        height: 0.9rem;
        margin-top: -1.1rem;
      }

      .info-item {
        // margin-bottom: 0.2rem;
        width: 6.5rem;
        display: flex;
        align-items: center;
        .info-label {
          flex: none;
          color: #222;
          font-size: 0.3rem;
          margin-right: 0.14rem;
        }
        .info-input {
          flex: auto;
          height: 0.92rem;
          // background-color: #fff;
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
            // flex: auto;
            font-size: 0.3rem;
            line-height: 0.42rem;
            margin-left: 0.24rem;
          }
          .info-arrow {
            flex: none;
            width: 0.12rem;
            height: 0.22rem;
            margin-right: 0.14rem;
            margin-left: 0.1rem;
          }
          .left-tab {
            margin-left: 0.24rem;
          }
          .sex-tab {
            width: 0.58rem;
            height: 0.58rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.3rem;
            color: #909090;
            border-radius: 50%;
            margin-right: 0.17rem;
            background: #fff2f5;
            border: 1px solid #ffcfda;

            .sex-icon {
              display: block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
            }
            &.active {
              color: #fff;
              background-color: #ec436b;
              border: none;
            }
          }
        }
      }
      .info-btn {
        width: 6.26rem;
        height: 1.34rem;
        margin-top: 0.7rem;
        object-fit: contain;
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
    margin-bottom: 0.36rem;
  }
}

.mt-180 {
  margin-top: 2.4rem;
}
.divider-line {
  width: 6.5rem;
  height: 1px;
  background: #000000;
  opacity: 0.13;
  margin-bottom: 0.2rem;
}
.footer {
  width: 100%;
  height: 1rem;
}

.fix-btn {
  object-fit: contain;
  width: 5.8rem;
  height: 1.34rem;
  position: fixed;
  bottom: 0.2rem;
  z-index: 99;

  // animation: scaleBtn 1s infinite ease-in-out alternate;
}
.order-icon {
  position: fixed;
  right: 0;
  top: 3rem;
  width: 1.3rem;
  height: 1.87rem;
  z-index: 100;
}

.card-box {
  width: 7.06rem;
  height: 4.68rem;
  background: url('../../../assets/img/emotion/new/result_card2.webp') no-repeat;
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

.ab-footer {
  position: fixed;
  background: #000;
  opacity: 0.5;
  width: 100%;
  height: 2.8rem;
  z-index: 1;
  bottom: 0;
}

.back-box {
  position: absolute;
  top: 0.5rem;
  left: 0.2rem;
  width: 1.32rem;
  height: 0.6rem;
  background: url('../../../assets/img/common/baogao_img_btnbj.webp') no-repeat;
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
.back-box-combo {
  top: 0.4rem;
}
@keyframes emoBtn {
  0% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1.1);
  }
}
.emo-btn {
  animation: emoBtn 1s infinite ease-in-out alternate;
}
</style>
