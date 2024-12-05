<template>
  <div>
    <div :class="{
      container: true,
      'fix-box': choose_time ? true : false,
      'cn-bg': language === 'zh-CN',
      'tw-bg': language === 'zh-TW',
    }">
      <canvas id="bg-svga"></canvas>
      <img class="order-icon" @click="toOrder" :src="is_cn ? cn_history_order : tw_history_order" alt="" />
      <div :class="['info', utils.showEmail() ? 'info-height' : '', is_cn ? 'info-cn' : 'info-tw']">
        <div class="info-content">
          <div class="item-container mt-100">
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
                <img src="../../../assets/img/emotion_fortune_2025/icon_rili.webp" @click="openPicker" />
              </div>
            </div>
            <div class="divider-line"></div>
          </div>
          <div id="info-btn" class="btn huxi-btn" @click="check">
            <img :src="is_cn ? cn_home_btn : tw_home_btn" />
          </div>
          <!-- <div class="top-bg"> -->
          <div class="info-bottom">
            <img v-if="privacyChecked" class="info-check"
              src="../../../assets/img/emotion_fortune_2025/login_icon_choose.webp"
              @click="privacyChecked = !privacyChecked" />
            <img v-else class="info-check" src="../../../assets/img/emotion_fortune_2025/login_icon_choose_no.webp"
              @click="privacyChecked = !privacyChecked" />
            {{ $t('check-label') }}
            <span @click="toPrivacy('user_agreement.html')">{{ $t('user-agreement') }} </span>{{ $t('and') }}
            <span @click="toPrivacy('privacy.html')">{{
              $t('privacy-policy')
            }}</span>
          </div>
        </div>
      </div>
      <img class="card mt-34" :src="is_cn ? cn_icon_0 : tw_icon_0" />
      <img class="card" :src="is_cn ? cn_icon_1 : tw_icon_1" />
      <img class="card" :src="is_cn ? cn_icon_2 : tw_icon_2" />
      <img class="card" :src="is_cn ? cn_icon_3 : tw_icon_3" />
      <img class="card" :src="is_cn ? cn_icon_4 : tw_icon_4" />
      <img class="card" :src="is_cn ? cn_icon_5 : tw_icon_5" />
      <img class="card" :src="is_cn ? cn_icon_6 : tw_icon_6" />
      <img v-if="showFixedBtn" class="fix-btn emo-btn" :src="language === 'zh-CN' ? cn_home_btn : tw_home_btn"
        @click="check" />
      <!-- 時间选择控件 -->
      <DatetimePicker start="1900" end="2050" :year="year" :month="month" :date="date" :birth_hour="birth_hour"
        v-show="choose_time && !show_nongli"></DatetimePicker>
      <NongliPicker start="1900" end="2050" :year="year" :month="month" :date="date" :birth_hour="birth_hour"
        v-show="choose_time && show_nongli"></NongliPicker>
      <NewFooter v-if="showFixedBtn" product_key="h5_emotion2025" />
      <HomeFooter v-if="showFixedBtn" product_key="h5_emotion2025" />
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
} from '../../../api/api.js';
import moment from 'dayjs';
// @ts-ignore
import HeaderNotice from '../../../components/headerNotice.vue';

import DatetimePicker from '../../../components/DatetimePicker';
import NongliPicker from '../../../components/NongliPicker';

import cn_home_btn from '../../../assets/img/emotion_fortune_2025/cn/home_btn_cn.webp';
import tw_home_btn from '../../../assets/img/emotion_fortune_2025/tw/home_btn_tw.webp';

import boy from '../../../assets/img/emotion_fortune_2025/img_boy.webp';
import girl from '../../../assets/img/emotion_fortune_2025/img_girl.webp';

import combinePayPop from '../../../components/combinePayPop.vue';
import { Downloader, Parser, Player } from 'svga.lite';


import cn_history_order from '../../../assets/img/emotion_fortune_2025/cn/home_lsdd_cn.webp';
import tw_history_order from '../../../assets/img/emotion_fortune_2025/tw/home_lsdd_tw.webp';

import HotProduct from '../../../components/hotProduct.vue';

import cn_icon_0 from '../../../assets/img/emotion_fortune_2025/cn/mid_img_details_huode_cn.webp';
import cn_icon_1 from '../../../assets/img/emotion_fortune_2025/cn/home_img_details_01_cn.webp';
import cn_icon_2 from '../../../assets/img/emotion_fortune_2025/cn/home_img_details_02_cn.webp';
import cn_icon_3 from '../../../assets/img/emotion_fortune_2025/cn/home_img_details_03_cn.webp';
import cn_icon_4 from '../../../assets/img/emotion_fortune_2025/cn/home_img_details_04_cn.webp';
import cn_icon_5 from '../../../assets/img/emotion_fortune_2025/cn/home_img_details_05_cn.webp';
import cn_icon_6 from '../../../assets/img/emotion_fortune_2025/cn/home_img_details_06_cn.webp';





import tw_icon_0 from '../../../assets/img/emotion_fortune_2025/tw/mid_img_details_huode_tw.webp';
import tw_icon_1 from '../../../assets/img/emotion_fortune_2025/tw/home_img_details_01_tw.webp';
import tw_icon_2 from '../../../assets/img/emotion_fortune_2025/tw/home_img_details_02_tw.webp';
import tw_icon_3 from '../../../assets/img/emotion_fortune_2025/tw/home_img_details_03_tw.webp';
import tw_icon_4 from '../../../assets/img/emotion_fortune_2025/tw/home_img_details_04_tw.webp';
import tw_icon_5 from '../../../assets/img/emotion_fortune_2025/tw/home_img_details_05_tw.webp';
import tw_icon_6 from '../../../assets/img/emotion_fortune_2025/tw/home_img_details_06_tw.webp';
import NewFooter from '../../../components/NewFooter.vue';



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
    FixedOrder,
    NewFooter,
    NavigationBar,
    CalculateBar,
    FbShareNotice,
  },
  data() {
    return {
      cn_header_svga:
        'https://psychicai-static.psychicai.pro/imgs/2406ce0cb03241ea456db046b71c40ee417c.svga',
      tw_header_svga:
        'https://psychicai-static.psychicai.pro/imgs/240699790b16f7ff4bdcb0d22c167fcb76d8.svga',
      cn_icon_0,
      cn_icon_1,
      cn_icon_2,
      cn_icon_3,
      cn_icon_4,
      cn_icon_5,
      cn_icon_6,
      tw_icon_0,
      tw_icon_1,
      tw_icon_2,
      tw_icon_3,
      tw_icon_4,
      tw_icon_5,
      tw_icon_6,
      cn_history_order,
      tw_history_order,
      utils,
      boy,
      girl,

      privacyChecked: true, // 同意隐私协议
      showFixedBtn: false,
      sex: '0',
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
      product_key: 'h5_emotion2025',
      query_user_string: '',
      has_pay: '',
      showFixedBtn: false,
      //
      language: utils.getLanguage(),
      cn_home_btn,
      tw_home_btn,
      is_show_btn: true,
      duration_time: {
        entry_time: 0,
        exit_time: 0,
      }
    };
  },
  computed: {
    productList() {
      return this.$store.state.common.productList;
    },
    is_cn() {
      return this.language === 'zh-CN';
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
  },
  created() {
    this.$store.dispatch('common/getProduction');
    utils.firebaseLogEvent(
      '10017',
      '-10001',
      'page_view_LOVE2025_end_main',
      'page_view',
      {
        channel: utils.getFBChannel(),
      }
    );
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
  },
  destroyed() {
    this.duration_time.exit_time = new Date().getTime();
    if (this.duration_time.entry_time) {
      utils.firebaseLogEvent(
        '10017',
        '-10002',
        'view_LOVE2025_end_main',
        'view',
        {
          channel: utils.getFBChannel(),
          time: (this.duration_time.exit_time - this.duration_time.entry_time) / 1000
        }
      );
    }
  },
  mounted() {
    //svga动画预加载
    // this.preloadSVGA()
    this.duration_time.entry_time = new Date().getTime()
    if (utils.isProd()) {
      try {
        utils.isFBChannel() && fbq && fbq('trackCustom', 'CustomChannel', {
          channel: `pageview_main_${utils.getFBChannel()}`,
        });
        utils.gcyLog(`感情运首页`, {
          mlxz_action_desc: '查看感情运首页FB渠道上报',
          mlxz_action_type: 'view',
          mlxz_channel: `pageview_main_${utils.getFBChannel()}`,
        });
        utils.isGoogleChannel() && gtag && gtag("event", "select_content", {});
      } catch (err) {
        console.log('no fbq:', err);
      }
    }


    // 赋默认值
    let storaged_userInfo = window.localStorage.getItem(
      '_emotion_fortune_2025_info'
    );
    if (storaged_userInfo) {
      let arr = storaged_userInfo.split('|');

      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.email = (arr[7] == '' || arr[7] == 'undefined') ? '' : arr[7];
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
    this.loadBg('#bg-svga', this.is_cn ? cn_header_svga : tw_header_svga);
  },
  methods: {
    setAnimation() {
      localStorage.setItem('mlxz_outer_animation', '1');
    },
    async preloadSVGA() {
      var svgaUrl = 'https://psychicai-static.psychicai.pro/imgs/2406c6f666683c824312b07e66feb0c73ad2.svga'; // 替换为你的SVGA文件路径
      var image = new Image();
      image.src = svgaUrl;
      image.onload = function () {
        console.log('SVGA preloaded successfully');
      };
      image.onerror = function () {
        console.error('Failed to preload SVGA');
      };
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
      window.localStorage.setItem('_emotion_fortune_2025_info', querystring);
      location.href = url;
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

      window.localStorage.setItem('_emotion_fortune_2025_info', querystring);
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
          '10017',
          '-10003',
          'click_LOVE2025_end_main',
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
          '10017',
          '-10003',
          'click_LOVE2025_end_main',
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
          '10017',
          '-10003',
          'click_LOVE2025_end_main',
          'click',
          {
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('xieyi-tips'));
        return;
      }

      if (email == '' && utils.showEmail()) {
        utils.firebaseLogEvent(
          '10017',
          '-10003',
          'click_LOVE2025_end_main',
          'click',
          {
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('email-tips'));
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
      window.localStorage.setItem('_emotion_fortune_2025_info', querystring);
      let path = 'detail?querystring=' + querystring;
      this.query_user_string = querystring;
      utils.firebaseLogEvent(
        '10017',
        '-10003',
        'click_LOVE2025_end_main',
        'click',
        {
          channel: utils.getFBChannel(),
          click_type: 'screen_tracking',
        }
      );
      if (utils.isProd()) {

        try {
          utils.isFBChannel() && fbq && fbq('track', 'Lead');
        } catch (err) {
          console.error('Lead  error message:', err);
        }
        let same_ = this.productList.find(
          item => item.product_key === this.product_key
        );
        const { price, currency_type } = same_;
        utils.isGoogleChannel() && gtag && gtag("event", "generate_lead", {
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
          email: email === undefined || !utils.showEmail() ? '' : email,
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
          email: email === undefined || !utils.showEmail() ? '' : email,
          date: moment(
            `${birth_year}${+birth_month < 10 ? '0' + birth_month : birth_month
            }${+birth_date < 10 ? '0' + birth_date : birth_date}`
          ).format('YYYYMMDD'),
        };
      }

      return params;
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
  background-image: url('../../../assets/img/emotion_fortune_2025/cn/home_img_topbj_cn.webp');
}


.tw-bg {
  background-image: url('../../../assets/img/emotion_fortune_2025/tw/home_img_topbj_tw.webp');
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
  background-color: #FB789A;
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

  #bg-svga {
    position: absolute;
    width: 7.5rem;
    height: 9rem;
    top: 0;
  }


  .info-cn {
    background-image: url('../../../assets/img/emotion_fortune_2025/cn/home_cardbj_xinxi_cn.webp');
    background-size: 100% 100%;
  }

  .info-tw {
    background-image: url('../../../assets/img/emotion_fortune_2025/tw/home_cardbj_xinxi_tw.webp');
    background-size: 100% 100%;
  }

  .info {
    justify-content: center;
    position: relative;
    display: flex;
    justify-content: center;
    width: 7.1rem;
    // height: 4.47rem;
    border-radius: 0.16rem;
    // background: rgba(255, 250, 250, 1);
    margin-top: 8.83rem;

    .info-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;




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
          color: #5A132E;
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

















      .mt-100 {
        margin-top: 1rem;
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
          width: 1rem;
          // background-color: #fff;
          border-radius: 0.12rem;
          display: flex;
          box-sizing: border-box;
          padding: 0.06rem;
          align-items: center;

          input {
            width: 100%;
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
        width: 5.9rem;
        height: 0.98rem;
        margin-top: 0.7rem;
        object-fit: contain;
      }

      .info-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #95979F;
        font-size: 0.22rem;
        line-height: 0.3rem;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;

        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.12rem;
        }

        span {
          color: #DC0E4D;
        }
      }
    }
  }

  .info-height {
    height: 5.4rem;
  }

  .card {
    width: 7.06rem;
    margin-bottom: 0.36rem;
  }
}

.mt-34 {
  margin-top: 0.34rem;
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
  top: 2.6rem;
  width: 0.44rem;
  height: 1.5rem;
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
