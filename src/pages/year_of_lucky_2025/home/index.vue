<template>
  <div>
    <NavigationBar v-if="is_channel_01" />
    <header-notice v-if="has_pay"></header-notice>
    <FbShareNotice v-if="is_show_fb_notice" />
    <div :class="{
      container: true,
      'fix-box': choose_time ? true : false,
      'cn-bg': is_cn,
      'tw-bg': !is_cn,
    }">

      <img v-if="!is_channel_01" class="order-icon" @click="toOrder" :src="is_cn ? cn_history_order : tw_history_order"
        alt="" />
      <canvas class="canvas-bg" id="canvas1"></canvas>
      <!-- <div class="bar">
        <canvas class="canvas-tag" id="canvas2"></canvas>
      </div> -->

      <div :class="['info',]">
        <div :class="['info-content']">
          <div class="title">
            <img :src="is_cn ? cn_img_tittle_home_xinxi : tw_img_tittle_home_xinxi" />
          </div>


          <div class="item-container">
            <div class="info-item">
              <div class="left input-container">
                <div>姓名：</div>
                <div class="info-input">
                  <input type="text" id="username" v-model="username" :placeholder="$t('name-placeholder')" />
                </div>

              </div>
              <div class="sex-container">
                <img :src="sex == 1 ? boy : girl" @click="changeSex()" />
              </div>
            </div>
            <div class="divider-line"></div>

            <div class="info-item">
              <div class="left input-container">
                <div>生辰：</div>
                <div class="info-input">
                  <div class="info-birth" :style="{
                    color: picker_date ? '#333' : 'rgba(51, 51, 51, 0.5)',
                  }" @click="openPicker">
                    {{ picker_date || $t('birth-placeholder') }}
                  </div>
                </div>

              </div>
              <div class="birth-container">
                <img src="../../../assets/img/year_of_lucky_2025/icon_rili_1x.webp" @click="openPicker" />
              </div>
            </div>
            <div class="divider-line"></div>
          </div>



          <div id="info-btn" class="btn huxi-btn" @click="check_year">
            <img :src="is_cn ? btn_chakan_cn_1x : btn_chakan_tw_1x" />
          </div>




          <!-- <div class="top-bg"> -->
          <div class="info-bottom">
            <img v-if="privacyChecked" class="info-check" src="../../../assets/img/year_of_lucky_2025/login_icon_choose.webp"
              @click="privacyChecked = !privacyChecked" />
            <img v-else class="info-check" src="../../../assets/img/year_of_lucky_2025/login_icon_choose_no.webp"
              @click="privacyChecked = !privacyChecked" />
            {{ $t('check-label') }}
            <span @click="toPrivacy('user_agreement.html')">{{ $t('user-agreement') }} </span>{{ $t('and') }}
            <span @click="toPrivacy('privacy.html')">{{
              $t('privacy-policy')
            }}</span>
          </div>
          <!-- <img class="top-bg" src="../../../assets/img/year_of_lucky_2025/xinxi_img_bj_xia.webp" /> -->
          <!-- </div> -->




        </div>


      </div>





















      <div :style="`background-image:url(${is_cn ? cn_card_1 : tw_card_1})`" class="card-1">
        <canvas class="canvas-card" id="canvas3"></canvas>
      </div>
      <img class="card" :src="is_cn ? cn_card_2 : tw_card_2" />
      <img class="card" :src="is_cn ? cn_card_3 : tw_card_3" />
      <img class="card" :src="is_cn ? cn_card_4 : tw_card_4" />
      <img class="card" :src="is_cn ? cn_card_5 : tw_card_5" />
      <img class="card last-card" :src="is_cn ? cn_card_6 : tw_card_6" />
      <img v-if="showFixedBtn" class="fix-btn fix-box huxi-btn" :src="pay_btn_img" @click="check_year" />
      <!-- 時间选择控件 -->
      <DatetimePicker start="1900" end="2050" :year="year" :month="month" :date="date" :birth_hour="birth_hour"
        v-show="choose_time && !show_nongli"></DatetimePicker>
      <NongliPicker start="1900" end="2050" :year="year" :month="month" :date="date" :birth_hour="birth_hour"
        v-show="choose_time && show_nongli"></NongliPicker>


      <HomeFooter v-if="showFixedBtn" product_key="h5_annual2025" />

      <NewFooter v-if="showFixedBtn" product_key="h5_annual2025" />
    </div>
  </div>
</template>
<script>
import NavigationBar from '../../../components/NavigationBar.vue';
import FbShareNotice from '../../../components/FbShareNotice.vue';

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
import moment from 'dayjs';
import HeaderNotice from '../../../components/headerNotice.vue';


import cn_img_tittle_home_xinxi from '../../../assets/img/year_of_lucky_2025/cn/home_img_tittle_xinxi_cn.webp';
import tw_img_tittle_home_xinxi from '../../../assets/img/year_of_lucky_2025/tw/home_img_tittle_xinxi_tw_1x.webp';

import btn_chakan_cn_1x from '../../../assets/img/year_of_lucky_2025/cn/btn_chakan_cn_1x.webp';
import btn_chakan_tw_1x from '../../../assets/img/year_of_lucky_2025/tw/btn_chakan_tw_1x.webp';

import boy from '../../../assets/img/year_of_lucky_2025/img_boy.webp';
import girl from '../../../assets/img/year_of_lucky_2025/img_girl.webp';


import cn_tag from '../../../assets/img/mlxz/year_of_lucky_2024/img_4tag.webp';
import tw_tag from '../../../assets/img/tw_mlxz/year_24/img_4tag.webp';
// import cn_order from '../../../assets/img/mlxz/year_of_lucky_2024/btn_ling.webp';
// import tw_order from '../../../assets/img/mlxz/year_of_lucky_2024/tw/btn_ling.webp';

import cn_order from '../../../assets/img/year_of_lucky_2025/cn/btn_chakan_cn_1x.webp';
import tw_order from '../../../assets/img/year_of_lucky_2025/tw/btn_chakan_tw_1x.webp';

import cn_card_1 from '../../../assets/img/year_of_lucky_2025/cn/home_img_details_1_cn_1x.webp';
import tw_card_1 from '../../../assets/img/year_of_lucky_2025/tw/home_img_details_1_tw_1x.webp';

import cn_card_2 from '../../../assets/img/year_of_lucky_2025/cn/home_img_details_2_cn_1x.webp';
import tw_card_2 from '../../../assets/img/year_of_lucky_2025/tw/home_img_details_2_tw_1x.webp';

import cn_card_3 from '../../../assets/img/year_of_lucky_2025/cn/home_img_details_3_cn_1x.webp';
import tw_card_3 from '../../../assets/img/year_of_lucky_2025/tw/home_img_details_3_tw_1x.webp';

import cn_card_4 from '../../../assets/img/year_of_lucky_2025/cn/home_img_details_4_cn_1x.webp';
import tw_card_4 from '../../../assets/img/year_of_lucky_2025/tw/home_img_details_4_tw_1x.webp';

import cn_card_5 from '../../../assets/img/year_of_lucky_2025/cn/home_img_details_5_cn_1x.webp';
import tw_card_5 from '../../../assets/img/year_of_lucky_2025/tw/home_img_details_5_tw_1x.webp';
import cn_card_6 from '../../../assets/img/year_of_lucky_2025/cn/home_img_details_pingjia_cn_1x.webp';
import tw_card_6 from '../../../assets/img/year_of_lucky_2025/tw/home_img_details_pingjia_tw_1x.webp';
import {
  reportEnum,
  reportName,
  path_enums,
  maidianEnum,
} from '../../../libs/enum';
import combinePayPop from '../../../components/combinePayPop.vue';
import cn_new_user_btn from '../../../assets/img/mlxz/year_of_lucky_2024/nianyun_btn_jiexiao.webp';
import tw_new_user_btn from '../../../assets/img/tw_mlxz/year_24/nianyun_btn_jiexiao_fanti.webp';

import tw_history_order from '../../../assets/img/year_of_lucky_2025/tw/home_lsdd_tw_1x.webp';
import cn_history_order from '../../../assets/img/year_of_lucky_2025/cn/home_lsdd_cn_1x.webp';
import NewFooter from '../../../components/NewFooter.vue';
// 组合测算相关参数
let is_combine = utils.getQueryString('is_combine');
const tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...',
};
const year_data = {
  cn_card_6,
  tw_card_6,
  btn_chakan_cn_1x,
  btn_chakan_tw_1x,
  boy,
  girl,
  cn_img_tittle_home_xinxi,
  tw_img_tittle_home_xinxi,
  cn_history_order,
  tw_history_order,
  svg: 'https://mixmedia.rili.cn/1425252e-6c76-4bec-9d74-1b09ec40d6bd.svga',
  privacyChecked: true, // 同意隐私协议
  sex: '0',
  year: '2000',
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
  product_key: 'h5_annual2025',
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
  cn_header_svga:
    'https://psychicai-static.psychicai.pro/imgs/2406ce0cb03241ea456db046b71c40ee417c.svga',
  tw_header_svga:
    'https://psychicai-static.psychicai.pro/imgs/240699790b16f7ff4bdcb0d22c167fcb76d8.svga',
  cn_tag_svga:
    'https://psychicai-static.psychicai.pro/imgs/2406d412215566e64563b9f288d8e6ce1781.svga',
  tw_tag_svga:
    'https://psychicai-static.psychicai.pro/imgs/2406f7acfeff41b54aa491aed151218685a9.svga',
  cn_home_svga:
    'https://psychicai-static.psychicai.pro/imgs/241051d7724daabd4986879ceed0962065f2.svga',
  tw_home_svga:
    'https://psychicai-static.psychicai.pro/imgs/2410f5e3149572634cba992455b98881ee10.svga',
  cn_card_svga:
    'https://psychicai-static.psychicai.pro/imgs/2410153e466e2ee141c1aa2a09cd07760f4a.svga',
  tw_card_svga:
    'https://psychicai-static.psychicai.pro/imgs/2410122a94fd1a32435c8f6233b114d9fdfb.svga',
  // 挽留弹窗
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
  duration_time: {
    entry_time: 0,
    exit_time: 0,
  }
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
    FixedOrder,
    NewFooter,
    NavigationBar,
    FbShareNotice,
  },
  data() {
    return year_data
  },
  computed: {
    is_show_fb_notice() {
      return utils.isFBContainer() && utils.getFBChannel().indexOf('02') > -1;
    },
    local_title() {
      return utils.getTitle(this.new_order_key);
    },
    productList() {
      return this.$store.state.common.productList;
    },
    is_new_user() {
      let obj = this.$store.state.common.productList.find(
        it => it.product_key === 'h5_annual2025'
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



    is_android() {
      return utils.isAndroid();
    },
    is_channel_01() {
      return utils.getFBChannel().indexOf('01') > -1;
    },
  },
  created() {
    this.created_year();
  },
  mounted() {
    this.duration_time.entry_time = new Date().getTime()
    this.mounted_year();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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

  },
  destroyed() {
    this.duration_time.exit_time = new Date().getTime();
    if (this.duration_time.entry_time) {
      utils.firebaseLogEvent(
        '10015',
        '-10002',
        'view_year05_end_main',
        'view',
        {
          channel: utils.getFBChannel(),
          time: (this.duration_time.exit_time - this.duration_time.entry_time) / 1000
        }
      );
    }
  },

  methods: {
    setAnimation() {
      localStorage.setItem('mlxz_outer_animation', '1');
    },
    created_year() {
      this.$store.dispatch('common/getProduction');
      const { has_pay } = this.$route.query;
      this.has_pay = has_pay ? has_pay : '';
      utils.firebaseLogEvent(
        '10015',
        '-10001',
        'page_view_year2025_end_main',
        'page_view',
        {
          channel: utils.getFBChannel(),
        }
      );
      this.getLastOrder();
    },

    mounted_year() {
      // this.showNoticePop();

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
        // this.$nextTick(() => {
        //   if (this.sex === '1') {
        //     this.$refs.sex_male.click();
        //     setTimeout(() => {
        //       this.$refs.sex_female.click();
        //     }, 500);
        //   } else {
        //     this.$refs.sex_female.click();
        //     setTimeout(() => {
        //       this.$refs.sex_male.click();
        //     }, 500);
        //   }
        // });
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
      this.loadBg_year(
        '#canvas1',
        this.is_cn ? this.cn_home_svga : this.tw_home_svga
      );

      this.loadBg_year('#canvas3', this.is_cn ? this.cn_card_svga : this.tw_card_svga);
    },

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
      utils.jumpToOrder(this.product_key);
    },

    /**
     * @description: 选择性别 这里用于在跳转协议页面返回后清空姓名问题
     * @param {*} val
     * @return {*}
     */
    changeSex(val) {
      if (this.sex == 0) {
        this.sex = 1;
      } else {
        this.sex = 0;
      }
      // this.sex = val + '';
    },

    // 端内加载背景SVGA动画
    loadBg_year(dom, url, is_loop = true) {
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
    async check_year() {
      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        utils.firebaseLogEvent(
          '10015',
          '-10003',
          'click_year2025_end_main',
          'click',
          {
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
          '10015',
          '-10003',
          'click_year2025_end_main',
          'click',
          {
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('birth-tips'));
        return;
      }
      if (!this.privacyChecked) {
        utils.firebaseLogEvent(
          '10015',
          '-10003',
          'click_year2025_end_main',
          'click',
          {
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
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
      //设置过渡动画标识
      this.setAnimation();
      window.localStorage.setItem('year_of_lucky_info', querystring);
      let path = 'detail?querystring=' + querystring;
      this.query_user_string = querystring;
      utils.firebaseLogEvent(
        '10015',
        '-10003',
        'click_year2025_end_main',
        'click',
        {
          channel: utils.getFBChannel(),
          click_type: 'screen_tracking',
        }
      );
      if (utils.isProd()) {

        try {
          utils.getFBChannel().indexOf('google') < 0 && fbq && fbq('track', 'Lead');
        } catch (err) {
          console.error('Lead  error message:', err);
        }
        let same_ = this.productList.find(
          item => item.product_key === this.product_key
        );
        const { price, currency_type } = same_;
        utils.getFBChannel().indexOf('google') > -1 && gtag && gtag("event", "generate_lead", {
          currency: currency_type,
          value: price,
        });
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
            `${birth_year}${+birth_month < 10 ? '0' + birth_month : birth_month
            }${+birth_date < 10 ? '0' + birth_date : birth_date}`
          ).format('YYYYMMDD'),
        };
      }
      return params;
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
      // const { ext, pay_method, product_key, product_id, payment } =
      //   this.last_order;
      // const { main_id, click_id, view_id, click_name, view_name } =
      //   maidianEnum[product_key];
      // utils.firebaseLogEvent(main_id, view_id, view_name, 'view', {
      //   args_name: view_name,
      //   channel: utils.getFBChannel(),
      // });
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
  width: 5.7rem;
  height: 0.96rem;
  bottom: 0.2rem;
  z-index: 99;
  // animation: scaleBtn 1s infinite ease-in-out alternate;
}

.cn-bg {
  background-image: url('../../../assets/img/year_of_lucky_2025/cn/home_img_topbj_cn_1x.webp');
  // height: 9.8rem;
}

.tw-bg {
  background-image: url('../../../assets/img/year_of_lucky_2025/tw/home_img_topbj_tw_1x.webp');
  // height: 9.8rem;
}

.divider-line {
  width: 6.3rem;
  height: 0.02rem;
  background: #F1E0D2;
}

.container {
  width: 7.5rem;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  // background-color: #ffaa41;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .canvas-bg {
    position: absolute;
    width: 7.5rem;
    height: 10.42rem;
    z-index: 2;
  }

  .title {
    position: relative;
    z-index: 10;
    width: 100%;

    // img {
    //   margin-top: 0.35rem;
    //   margin-left: 0.51rem;
    //   width: 2.8rem;
    // }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 7.1rem;
    // height: 6.34rem;
    z-index: 2;
    margin-top: 9.8rem;

    // .top-bg {
    //   width: 7.1rem;
    //   height: 1rem;
    //   display: flex;
    //   .info-bottom {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     color: #95979F;
    //     font-size: 0.22rem;
    //     line-height: 0.3rem;
    //     margin-top: 0.3rem;

    //     img {
    //       width: 0.3rem;
    //       height: 0.3rem;
    //       margin-right: 0.12rem;
    //     }

    //     span {
    //       color: #CA8617;
    //     }
    //   }

    // }

    .info-content {
      background: url('../../../assets/img/year_of_lucky_2025/img_cardbj_xinxi.webp') no-repeat;
      background-size: 100% 100%;
      width: 7.1rem;
      height: 5.28rem;
      // height: 4.54rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.2rem;
      // padding: 0 0.4rem;

      .title {
        width: 7.1rem;
        height: 1rem;
        display: flex;

        img {
          width: 7.1rem;
          height: 1rem;
          margin-top: -0.05rem;
        }
      }

      .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.2rem;

        .info-item {
          width: 6.3rem;
          height: 0.82rem;
          line-height: 0.82rem;
          overflow: hidden;
          // border: 1px solid red;
          align-items: center;
          display: flex;
          justify-content: space-between;
          font-weight: 400;
          font-size: 0.32rem;
          color: #3A0922;
          line-height: 0.48rem;
          text-align: justify;
          font-style: normal;

          .left {
            display: flex;
            margin-top: 0.1rem;
          }

          .input-container {
            flex: auto;
            height: 0.92rem;
            // background-color: #fff;
            border-radius: 0.12rem;
            display: flex;
            box-sizing: border-box;
            padding: 0.06rem;
            align-items: center;

            input {
              // width: 100%;
              width: 3.2rem;
              font-size: 0.3rem;
              line-height: 0.42rem;
              outline: none;
              border: none;
              background-color: transparent;
              padding: 0;
              // margin: 0 0.3rem;

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
          }

          .sex-container {
            display: flex;
            width: 1.7rem;
            height: 0.6rem;
            margin-top: 0.1rem;

            img {
              width: 1.7rem;
              height: 0.6rem;
            }
          }

          .birth-container {
            margin-right: 0.13rem;
            display: flex;
            width: 0.46rem;
            height: 0.46rem;
            margin-top: 0.1rem;

            img {
              width: 0.46rem;
              height: 0.46rem;
            }
          }
        }
      }



      .btn {
        display: flex;
        margin-top: 0.4rem;
        width: 5.7rem;
        height: 0.96rem;

        img {
          width: 5.7rem;
          height: 0.96rem;
        }
      }


      .info-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #95979F;
        font-size: 0.22rem;
        line-height: 0.3rem;
        margin-top: 0.3rem;

        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.12rem;
        }

        span {
          color: #CA8617;
        }
      }


    }

    .info-height {
      // height: 5.4rem;
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
  top: 2.33rem;
  width: 0.44rem;
  height: 1.5rem;
  z-index: 100;
}

.last-card {
  margin-bottom: 2.7rem !important;
}
</style>
