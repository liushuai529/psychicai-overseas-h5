<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-06-05 20:55:06
 * @Description: 袁天罡称骨
-->
<template>
  <div>
    <NavigationBar v-if="is_channel_01" />
    <div :class="{ container: true, 'fix-box': choose_time ? true : false }">
      <header-notice v-if="has_pay"></header-notice>
      <canvas class="canvas" id="canvas"></canvas>
      <div class="info">
        <div class="info-name">
          <input
            v-model="username"
            class="info-input"
            id="username"
            type="text"
            :placeholder="$t('name-placeholder')"
          />

          <img
            v-if="sex === '1'"
            class="sex"
            src="../../../assets/img/mlxz/weigh_bone/img_boy.png"
            ref="sex_male"
            @click="changeSex(0)"
          />
          <img
            v-else
            class="sex"
            src="../../../assets/img/mlxz/weigh_bone/img_gril.png"
            ref="sex_female"
            @click="changeSex(1)"
          />
        </div>
        <div class="info-time">
          <div
            class="info-input"
            :style="{ color: picker_date ? '#aeb5d9' : '#aeb5d9' }"
            @click="openPicker"
          >
            {{ picker_date || $t('birth-placeholder') }}
          </div>
          <img
            class="calendar"
            src="../../../assets/img/mlxz/weigh_bone/icon_rili.png"
            @click="openPicker"
          />
        </div>
        <img
          id="info-btn"
          class="info-btn"
          :src="is_cn ? cn_btn : tw_btn"
          @click="check"
        />
        <div class="info-privacy">
          <img
            v-if="privacyChecked"
            class="check"
            src="../../../assets/img/career_divination_overseas/home/checked.png"
            @click="privacyChecked = !privacyChecked"
          />
          <img
            v-else
            class="check"
            src="../../../assets/img/career_divination_overseas/home/unchecked.png"
            @click="privacyChecked = !privacyChecked"
          />
          <span>查看</span>
          <span class="link" @click="link('user_agreement.html')">{{
            $t('user-agreement')
          }}</span>
          <span>和</span>
          <span class="link" @click="link('privacy.html')">{{
            $t('privacy-policy')
          }}</span>
        </div>
        <div v-if="!is_channel_01" class="info-history" @click="toOrder">
          <span>{{ $t('history-order') }}</span>
          <img src="../../../assets/img/mlxz/weigh_bone/img_arrow.png" />
        </div>
      </div>
      <footerBanner />

      <!-- <img
      v-show="showFixedBtn"
      class="btn-fixed"
      src="../../../assets/img/mlxz/career/img_btn.png"
      @click="check"
    /> -->

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

      <!-- Popup -->
      <!-- <PayPopup
      ref="PayPopup"
      :visible="visible"
      :product_key="product_key"
      :query_user_string="query_user_string"
      @update-visible="visible = false"
    ></PayPopup>
    <combinePayPop
      :visible="pay_modal"
      :all_list="productList"
      :product_key="product_key"
      :product_price="product_price"
      :query_user_string="query_user_string"
      @update-visible="pay_modal = false"
      @getOrderId="getOrderId"
    ></combinePayPop> -->
      <PopNotice
        v-if="is_show_notice"
        @close="closeNotice"
        :count_down="count_down"
        :product_key="product_key"
        e_id="10009"
        c_id="-10014"
        c_name="click_chenggu_discount1"
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
import FixedOrder from '../../../components/FixedOrder.vue';
import NavigationBar from '../../../components/NavigationBar.vue';
import { Toast, Indicator } from 'mint-ui';
import { Downloader, Parser, Player } from 'svga.lite';
import DatetimePicker from '../../../components/DatetimePicker';
import NongliPicker from '../../../components/NongliPicker';
import PayPopup from '../../../components/PayPopup';
import TopBar from '../../../components/TopBar';
import utils from '../../../libs/utils.js';
import {
  getPayOrderInfoAPI,
  payOrderAPI,
  getLastOrderAPI,
} from '../../../api/api';
import moment from 'dayjs';
import HeaderNotice from '../../../components/headerNotice.vue';
import footerBanner from './footer.vue';
import {
  reportEnum,
  reportName,
  path_enums,
  maidianEnum,
} from '../../../libs/enum';
import combinePayPop from '../../../components/combinePayPop.vue';
import cn_header from '../../../assets/img/mlxz/svga/weight_bone/cn_header.svga';
import tw_header from '../../../assets/img/mlxz/svga/weight_bone/tw_header.svga';

import cn_btn from '../../../assets/img/mlxz/weigh_bone/lock_btn.png';
import tw_btn from '../../../assets/img/mlxz/weigh_bone/tw/tw_lock_btn.png';
import PopNotice from '../../../components/PopNotice.vue';
let show_popup = utils.getQueryString('show_popup');

// 组合测算相关参数
let is_combine = utils.getQueryString('is_combine');
let main_order_id = utils.getQueryString('main_order_id');
const tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...',
};
export default {
  components: {
    DatetimePicker,
    NongliPicker,
    PayPopup,
    TopBar,
    HeaderNotice,
    combinePayPop,
    footerBanner,
    PopNotice,
    FixedOrder,
    NavigationBar,
  },
  data() {
    return {
      cn_btn,
      tw_btn,
      cn_header,
      tw_header,
      svg: 'https://mixmedia.rili.cn/422937d4-a997-4686-a8a9-56d33ccb7000.svga',

      privacyChecked: true, // 同意隐私协议
      showFixedBtn: false,
      is_show_btn: true,

      sex: '1', // 1男 0女
      year: '1995',
      month: '',
      date: '',
      birth_hour: '-1',
      username: '',
      picker_date: '',
      picker_date_obj: null,
      picker_hour: '',
      gongli_nongli: '1', // 1公历 0农历

      choose_time: false,
      show_nongli: false,

      // 底部弹出popup版本所需数据
      visible: false,
      product_key: 'h5_weigh_bone',
      query_user_string: '',
      product_id: 22,
      is_combine,
      has_pay: '',
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
    };
  },
  computed: {
    local_title() {
      return utils.getTitle(this.new_order_key);
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
    is_channel_01() {
      return utils.getFBChannel().indexOf('01') > -1;
    },
  },
  watch: {
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
          '10009',
          '-10013',
          'view_chenggu_discount1',
          'view',
          {
            args_name: 'view_chenggu_discount1',
            channel: utils.getFBChannel(),
          }
        );
      }
    },
  },
  created() {
    utils.firebaseLogEvent(
      '10009',
      '-10001',
      'page_view_chenggu_main',
      'page_view',
      {
        args_name: 'page_view_chenggu_main',
        channel: utils.getFBChannel(),
      }
    );
    this.$store.dispatch('common/getProduction');

    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    this.getLastOrder();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  mounted() {
    this.showNoticePop();

    // 赋默认值
    let storaged_userInfo = localStorage.getItem('weigh_bone_info');
    if (storaged_userInfo) {
      let arr = storaged_userInfo.split('|');

      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];

      this.username = arr[0];
      this.sex = arr[1];
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
        if (this.sex === '1') {
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

    self.loadBg('#canvas', self.is_cn ? self.cn_header : self.tw_header);
  },
  methods: {
    // 获取订单ID
    getOrderId(val) {
      this.order_id = val;
    },
    // 选择性别
    changeSex(val) {
      this.sex = val + '';
    },
    // 跳转到订单列表
    toOrder() {
      utils.jumpToOrder();
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
    // 打开时间选择器
    openPicker() {
      this.choose_time = true;
    },
    // 关闭时间选择器
    closePicker() {
      this.choose_time = false;
    },
    // 协议跳转
    link(url) {
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
      window.localStorage.setItem('weigh_bone_info', querystring);
      location.href = url;
    },
    // 支付选择
    async check() {
      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        utils.firebaseLogEvent(
          '10009',
          '-10002',
          'click_chenggu_main',
          'click',
          {
            args_name: 'click_chenggu_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('tips-1'));
        let dom = document.getElementById('username');
        dom.focus();
        return;
      }
      // if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
      //   Toast(this.$t('tips-2'));
      //   return;
      // }
      if (time_obj == null) {
        utils.firebaseLogEvent(
          '10009',
          '-10002',
          'click_chenggu_main',
          'click',
          {
            args_name: 'click_chenggu_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('tips-3'));
        return;
      }
      if (!this.privacyChecked) {
        utils.firebaseLogEvent(
          '10009',
          '-10002',
          'click_chenggu_main',
          'click',
          {
            args_name: 'click_chenggu_main',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );

        Toast(this.$t('tips-4'));
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
      window.localStorage.setItem('weigh_bone_info', querystring);
      let path = 'detail?querystring=' + querystring;
      this.query_user_string = querystring;
      utils.firebaseLogEvent('10009', '-10002', 'click_chenggu_main', 'click', {
        args_name: 'click_chenggu_main',
        channel: utils.getFBChannel(),
        click_type: 'screen_tracking',
      });
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
        let { has_pay, order_id, product_key } = this.$route.query;
        this.has_pay = has_pay;
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
          const { price, unit, product_id, google_goods_id, product_key } =
            same_;
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
            `${birth_year}${
              +birth_month < 10 ? '0' + birth_month : birth_month
            }${+birth_date < 10 ? '0' + birth_date : birth_date}`
          ).format('YYYYMMDD'),
        };
      }
      return params;
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
#canvas {
  width: 7.5rem;
  height: 8.9rem;
  position: absolute;
  top: 0;
}
.fix-box {
  position: fixed !important;
}

.container {
  width: 7.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://psychicai-static.psychicai.pro/imgs/2404ba89ce61538947eda9a6a240b7f53de0.png');
  background-color: #515fad;
  background-size: contain;
  background-repeat: no-repeat;
  padding: 6.85rem 0.2rem 0;
  .info {
    position: relative;
    margin-bottom: 0.2rem;
    width: 7.1rem;
    min-height: 5.21rem;
    background: #37438a;
    border-radius: 0.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.38rem 0.3rem;
    .info-name,
    .info-time {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
      .label {
        flex: none;
        color: #3c2f22;
        font-size: 0.34rem;
        line-height: 1;
        font-weight: bold;
        margin-right: 0.2rem;
      }
      .info-input {
        flex: 1 1 auto;
        width: 1.5rem;
        font-size: 0.32rem;
        line-height: 0.45rem;
        outline: none;
        color: #aeb5d9;
        background: #47528f;
        border: 0.02rem solid #8d95c4;
        border-radius: 0.12rem;
        padding: 0.2rem;
        &::input-placeholder {
          color: #aeb5d9;
        }
        &::-webkit-input-placeholder {
          color: #aeb5d9;
        }
        &::-moz-placeholder {
          color: #aeb5d9;
        }
        &::-moz-placeholder {
          color: #aeb5d9;
        }
        &::-ms-input-placeholder {
          color: #aeb5d9;
        }
      }
      .sex {
        flex: none;
        display: block;
        width: 1.73rem;
        height: 0.68rem;
        margin-left: 0.3rem;
      }
      .calendar {
        position: absolute;
        right: 0.23rem;
        width: 0.46rem;
        height: 0.43rem;
      }
    }
    .info-btn {
      width: 5.12rem;
      height: 1rem;
      margin-top: 0.2rem;
      animation: scaleBtn 1s infinite ease-in-out alternate;
    }
    .info-privacy {
      font-size: 0.24rem;
      line-height: 1;
      display: flex;
      align-items: center;
      color: #8d95c4;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      .check {
        width: 0.24rem;
        margin-right: 0.1rem;
        display: block;
      }
      .link {
        color: #ee6c41;
      }
    }
    .info-history {
      font-size: 0.3rem;
      line-height: 0.43rem;
      color: #fbb880;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      img {
        width: 0.13rem;
        height: 0.22rem;
        margin-left: 0.08rem;
      }
    }
  }
  .card {
    width: 96.8%;
    margin-bottom: 0.2rem;
  }
  .bottom {
    width: 100%;
    height: 1.53rem;
    background-color: #a1794f;
  }
  .btn-fixed {
    position: fixed;
    width: 5.98rem;
    left: 50%;
    bottom: -0.15rem;
    margin-left: -2.99rem;
  }
}

.content-1 {
  width: 7.1rem;
  min-height: 3.79rem;
  background-image: url('../../../assets/img/mlxz/weigh_bone/img_mokuai_bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #37438a;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 0.4rem;
  .title {
    width: 3.64rem;
    height: 0.81rem;
    margin-top: 0.4rem;
    margin-bottom: 0.5rem;
  }
  .card-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4rem;
    img {
      margin: 0 0.15rem;
      width: 1.44rem;
      height: 1.68rem;
      animation: moveUpDown 2s infinite ease-in-out alternate;
    }
  }
}

// 先上移10px 再下移10px的动画

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
