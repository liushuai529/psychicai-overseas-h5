<template>
  <div
    :class="{
      container: true,
      'fix-box': choose_time ? true : false,
      'cn-bg': is_cn,
      'tw-bg': !is_cn,
    }"
  >
    <header-notice v-if="has_pay"></header-notice>
    <img
      class="order-icon"
      @click="toOrder"
      :src="is_cn ? cn_history_order : tw_history_order"
      alt=""
    />
    <canvas class="canvas-bg" id="canvas1"></canvas>
    <div class="bar">
      <canvas class="canvas-tag" id="canvas2"></canvas>
    </div>
    <div class="info">
      <div class="info-content">
        <div class="info-name">
          <div class="label">姓名</div>
          <input
            v-model="username"
            id="username"
            class="info-input"
            type="text"
            :placeholder="$t('name-placeholder')"
          />
          <img
            v-if="sex == '1'"
            class="sex"
            src="../../../assets/img/new_year_luck_overseas/home/switch-male.png"
            ref="sex_male"
            @click="changeSex(0)"
          />
          <img
            v-else
            class="sex"
            src="../../../assets/img/new_year_luck_overseas/home/switch-female.png"
            ref="sex_female"
            @click="changeSex(1)"
          />
        </div>
        <div class="info-time">
          <div class="label">生辰</div>
          <div
            class="info-input"
            :style="{
              color: picker_date ? '#3c2f22' : 'rgba(60, 47, 34, 0.5)',
            }"
            @click="openPicker"
          >
            {{ picker_date || $t('birth-placeholder') }}
          </div>
          <img
            class="calendar"
            src="../../../assets/img/new_year_luck_overseas/home/calendar.png"
            @click="openPicker"
          />
        </div>
        <img
          id="info-btn"
          class="info-btn huxi-btn"
          :src="pay_btn_img"
          @click="check"
        />
        <div class="info-bottom">
          <img
            v-if="privacyChecked"
            class="check"
            src="../../../assets/img/new_year_luck_overseas/home/checked.png"
            @click="privacyChecked = !privacyChecked"
          />
          <img
            v-else
            class="check"
            src="../../../assets/img/new_year_luck_overseas/home/unchecked.png"
            @click="privacyChecked = !privacyChecked"
          />
          <span>{{ $t('agree-label') }}</span>
          <span class="link" @click="toPrivacy('user_agreement.html')">{{
            $t('user-agreement')
          }}</span>
          <span>{{ $t('and') }}</span>
          <span class="link" @click="toPrivacy('privacy.html')">{{
            $t('privacy-policy')
          }}</span>
        </div>
      </div>
    </div>
    <div
      :style="`background-image:url(${is_cn ? cn_card_1 : tw_card_1})`"
      class="card-1"
    >
      <canvas class="canvas-card" id="canvas3"></canvas>
    </div>
    <img class="card" :src="is_cn ? cn_card_3 : tw_card_3" />
    <img class="card" :src="is_cn ? cn_card_2 : tw_card_2" />
    <img class="card" :src="is_cn ? cn_card_4 : tw_card_4" />
    <img class="card last-card" :src="is_cn ? cn_card_5 : tw_card_5" />
    <img
      v-if="showFixedBtn"
      class="fix-btn fix-box huxi-btn"
      :src="pay_btn_img"
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
    <HomeFooter v-if="showFixedBtn" product_key="h5_annual2024" />
    <PopNotice
      v-if="is_show_notice"
      @close="closeNotice"
      :count_down="count_down"
      :product_key="product_key"
      e_id="10003"
      c_id="-10014"
      c_name="click_2024report_discount1"
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
import moment from 'moment';
import HeaderNotice from '../../../components/headerNotice.vue';

import cn_tag from '../../../assets/img/mlxz/year_of_lucky_2024/img_4tag.png';
import tw_tag from '../../../assets/img/tw_mlxz/year_24/img_4tag.png';
import cn_order from '../../../assets/img/mlxz/year_of_lucky_2024/btn_ling.png';
import tw_order from '../../../assets/img/mlxz/year_of_lucky_2024/tw/btn_ling.png';

import cn_card_1 from '../../../assets/img/mlxz/year_of_lucky_2024/home_img_mokuai1.png';
import tw_card_1 from '../../../assets/img/tw_mlxz/year_24/home_img_mokuai1.png';

import cn_card_2 from '../../../assets/img/mlxz/year_of_lucky_2024/home_img_mokuai2.png';
import tw_card_2 from '../../../assets/img/tw_mlxz/year_24/home_img_mokuai2.png';

import cn_card_3 from '../../../assets/img/mlxz/year_of_lucky_2024/card_2_cn.png';
import tw_card_3 from '../../../assets/img/mlxz/year_of_lucky_2024/card_2_tw.png';

import cn_card_4 from '../../../assets/img/mlxz/year_of_lucky_2024/card_4_cn.png';
import tw_card_4 from '../../../assets/img/mlxz/year_of_lucky_2024/card_4_tw.png';

import cn_card_5 from '../../../assets/img/mlxz/year_of_lucky_2024/home_img_mokuai5.png';
import tw_card_5 from '../../../assets/img/tw_mlxz/year_24/home_img_mokuai5.png';
import {
  reportEnum,
  reportName,
  path_enums,
  maidianEnum,
} from '../../../libs/enum';
import combinePayPop from '../../../components/combinePayPop.vue';
import cn_new_user_btn from '../../../assets/img/mlxz/year_of_lucky_2024/nianyun_btn_jiexiao.png';
import tw_new_user_btn from '../../../assets/img/tw_mlxz/year_24/nianyun_btn_jiexiao_fanti.png';

import cn_header_svga from '../../../assets/img/mlxz/svga/year24/cn_header.svga';
import tw_header_svga from '../../../assets/img/mlxz/svga/year24/tw_header.svga';
import cn_tag_svga from '../../../assets/img/mlxz/svga/year24/cn_tag.svga';
import tw_tag_svga from '../../../assets/img/mlxz/svga/year24/tw_tag.svga';
import cn_card_svga from '../../../assets/img/mlxz/svga/year24/cn_card.svga';
import tw_card_svga from '../../../assets/img/mlxz/svga/year24/tw_card.svga';
import tw_history_order from '../../../assets/img/mlxz/downloadBtn/tw/year_order.png';
import cn_history_order from '../../../assets/img/mlxz/downloadBtn/year.png';
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
    PayPopup,
    HeaderNotice,
    TopBar,
    combinePayPop,
    HomeFooter,
    PopNotice,
    FixedOrder,
  },
  data() {
    return {
      cn_history_order,
      tw_history_order,
      svg: 'https://mixmedia.rili.cn/1425252e-6c76-4bec-9d74-1b09ec40d6bd.svga',
      privacyChecked: true, // 同意隐私协议
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
      product_key: 'h5_annual2024',
      query_user_string: '',
      is_combine,
      has_pay: '',
      // 繁體
      language: utils.getLanguage(),
      cn_tag,
      tw_tag,
      cn_order,
      tw_order,
      cn_card_1,
      tw_card_1,
      cn_card_2,
      tw_card_2,
      cn_card_3,
      tw_card_3,
      cn_card_4,
      tw_card_4,
      cn_card_5,
      tw_card_5,
      showFixedBtn: false,
      is_show_btn: true,
      pay_modal: false,
      product_price: '',
      cn_new_user_btn,
      tw_new_user_btn,
      cn_header_svga,
      tw_header_svga,
      cn_tag_svga,
      tw_tag_svga,
      cn_card_svga,
      tw_card_svga,
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
    local_title() {
      return utils.getTitle(this.new_order_key);
    },
    productList() {
      return this.$store.state.common.productList;
    },
    is_new_user() {
      let obj = this.$store.state.common.productList.find(
        it => it.product_key === 'h5_annual2024'
      );
      if (obj) {
        return obj.tags ? obj.tags.includes('newcomer_discount') : false;
      } else {
        return false;
      }
    },
    pay_btn_img() {
      if (this.is_new_user) {
        return this.language == 'zh-CN'
          ? this.cn_new_user_btn
          : this.tw_new_user_btn;
      } else {
        return this.language == 'zh-CN' ? this.cn_order : this.tw_order;
      }
    },

    is_cn() {
      return this.language === 'zh-CN';
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
  },
  created() {
    // window.Adjust &&
    //   window.Adjust.trackEvent({
    //     eventToken: '3c1nyu',
    //   });
    this.$store.dispatch('common/getProduction');
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    utils.firebaseLogEvent(
      '10003',
      '-10001',
      'page_view_2024report_main',
      'page_view',
      {
        args_name: 'page_view_2024report_main',
        channel: utils.getFBChannel(),
      }
    );
    this.getLastOrder();
  },
  mounted() {
    this.showNoticePop();

    // 赋默认值
    let storaged_userInfo = localStorage.getItem('year_of_lucky_info');
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
    this.loadBg(
      '#canvas1',
      this.is_cn ? this.cn_header_svga : this.tw_header_svga
    );
    this.loadBg(
      '#canvas2',
      this.is_cn ? this.cn_tag_svga : this.tw_tag_svga,
      1
    );
    this.loadBg('#canvas3', this.is_cn ? this.cn_card_svga : this.tw_card_svga);
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
          '10003',
          '-10013',
          'view_2024report_discount1',
          'view',
          {
            args_name: 'view_2024report_discount1',
            channel: utils.getFBChannel(),
          }
        );
      }
    },
  },

  methods: {
    /**
     * @description: 获取订单ID
     * @param {*} val
     * @return {*}
     */
    getOrderId(val) {
      this.order_id = val;
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

      window.localStorage.setItem('year_of_lucky_info', querystring);
      location.href = url;
    },

    /**
     * @description: 跳转到支付页
     * @return {*}
     */
    async check() {
      // window.Adjust &&
      //   window.Adjust.trackEvent({
      //     eventToken: 'vq6u1b',
      //   });

      utils.firebaseLogEvent(
        '10003',
        '-10002',
        'click_2024report_main',
        'click',
        {
          args_name: 'click_2024report_main',
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

      window.localStorage.setItem('year_of_lucky_info', querystring);
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
        localStorage.removeItem(`mlxz_new_time_down_${this.product_key}`);

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

    // 展示挽留弹窗  通过定时器
    showNoticePop() {
      setInterval(() => {
        // 最新一个订单信息
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
        //
        this.logDiscountEvent();

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
      localStorage.removeItem('mlxz_fixed_api_order_time');
      localStorage.removeItem('mlxz_fixed_api_order_id');
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
.card-1 {
  width: 7.1rem;
  height: 5.28rem;
  margin-bottom: 0.2rem;
  background-repeat: no-repeat;
  background-size: contain;
  .canvas-card {
    width: 100%;
    height: 100%;
  }
}

.fix-box {
  position: fixed !important;
}

.fix-btn {
  width: 5.19rem;
  height: 1.03rem;
  bottom: 0.2rem;
  z-index: 2;
  // animation: scaleBtn 1s infinite ease-in-out alternate;
}
.cn-bg {
  background-image: url('../../../assets/img/mlxz/year_of_lucky_2024/bg.png');
}
.tw-bg {
  background-image: url('../../../assets/img/tw_mlxz/year_24/bg.png');
}
.container {
  width: 7.5rem;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-color: #ffaa41;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .canvas-bg {
    position: absolute;
    width: 7.5rem;
    height: 10.42rem;
    z-index: 1;
  }
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
  .bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6.22rem;
    position: relative;
    width: 7.5rem;
    height: 2.4rem;
    z-index: 2;
    .canvas-tag {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .info {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: center;
    width: 7.1rem;
    height: 4.5rem;
    margin-bottom: 0.3rem;
    background: url('../../../assets/img/mlxz/year_of_lucky_2024/img_info_bg.png')
      no-repeat;
    background-size: contain;

    .info-content {
      width: 100%;
      height: 100%;
      padding: 0 0.8rem;

      box-sizing: border-box;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .info-title {
        width: 5.48rem;
        margin-bottom: 0.3rem;
      }
      .info-title2 {
        width: 5.96rem;
        margin-top: -1.2rem;
        margin-bottom: 0.2rem;
      }
      .info-name,
      .info-time {
        width: 100%;
        height: 0.68rem;
        border-bottom: 2px solid #ac8f52;
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
          font-size: 0.34rem;
          line-height: 1;
          font-weight: bold;
          outline: none;
          border: none;
          color: #3c2f22;
          background-color: transparent;
          padding: 0;
          &::input-placeholder {
            color: rgba(60, 47, 34, 0.5);
          }
          &::-webkit-input-placeholder {
            color: rgba(60, 47, 34, 0.5);
          }
          &::-moz-placeholder {
            color: rgba(60, 47, 34, 0.5);
          }
          &::-moz-placeholder {
            color: rgba(60, 47, 34, 0.5);
          }
          &::-ms-input-placeholder {
            color: rgba(60, 47, 34, 0.5);
          }
        }
        .sex {
          flex: none;
          display: block;
          width: 1.4rem;
        }
        .calendar {
          flex: none;
          display: block;
          width: 0.4rem;
        }
      }
      .info-btn {
        width: 5.19rem;
        height: 1.03rem;
        margin-top: 0.1rem;
        // animation: scaleBtn 1s infinite ease-in-out alternate;
      }
      .info-bottom {
        font-size: 0.24rem;
        line-height: 1;
        display: flex;
        align-items: center;
        color: rgba(60, 47, 34, 0.6);
        position: absolute;
        bottom: 0;
        .check {
          width: 0.24rem;
          margin-right: 0.1rem;
          display: block;
        }
        .link {
          color: #445cba;
        }
      }
    }
  }
  .card {
    width: 7.1rem;
    margin-bottom: 0.2rem;
  }
}
.order-icon {
  position: fixed;
  right: -0.02rem;
  top: 5.33rem;
  width: 0.56rem;
  height: 1.54rem;
  z-index: 100;
}

.last-card {
  margin-bottom: 1.52rem !important;
}
</style>
