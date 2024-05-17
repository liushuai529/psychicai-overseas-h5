<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-17 14:05:53
 * @Description: 八字合婚
-->
<template>
  <div
    :class="{
      home: true,
      'fix-box': choose_time ? true : false,
      'cn-bg': is_cn,
      'tw-bg': !is_cn,
    }"
    id="home"
  >
    <header-notice v-if="has_pay"></header-notice>
    <div class="top-banner">
      <canvas id="canvas"></canvas>

      <img
        v-if="language === 'zh-CN'"
        class="top-banner-img"
        src="./../../../assets/img/mlxz/bzhh/bzhh_bg.png"
      />
      <img
        v-else
        class="top-banner-img"
        src="./../../../assets/img/tw_mlxz/bazihehun/home/top-banner.png"
      />
      <div class="top-content">
        <info
          class="info-card"
          :malename="male.username"
          :femalename="female.username"
          :maledate="male.picker_date"
          :malehour="male.picker_hour"
          :femaledate="female.picker_date"
          :femalehour="female.picker_hour"
        />
        <div class="privacy">
          <img
            v-if="privacyChecked"
            src="./../../../assets/img/mlxz/bzhh/check.png"
            @click="privacyChecked = !privacyChecked"
          />
          <img
            v-else
            src="./../../../assets/img/mlxz/bzhh/nocheck.png"
            @click="privacyChecked = !privacyChecked"
          />
          <span>{{ $t('check-label') }}</span>
          <span
            style="color: #b1031f"
            @click="toService('user_agreement.html')"
            >{{ $t('user-agreement') }}</span
          >
          <span>和</span>
          <span style="color: #b1031f" @click="toService('privacy.html')">{{
            $t('privacy-policy')
          }}</span>
        </div>
        <img
          id="info-btn"
          class="btn"
          :src="language === 'zh-CN' ? cn_btn : tw_btn"
          @click="check"
        />
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
    <img
      class="order"
      :src="language === 'zh-CN' ? cn_order : tw_order"
      @click="toOrderUrl()"
    />
    <img
      v-show="showFixedBtn"
      class="btn-fixed"
      :src="language === 'zh-CN' ? cn_btn : tw_btn"
      @click="check"
    />

    <!-- 時間選擇控件 -->
    <DatetimePicker
      :male="sex"
      start="1959"
      end="2008"
      :year="year"
      :month="month"
      :date="date"
      :birth_hour="birth_hour"
      v-show="choose_time && !show_nongli"
    />
    <NongliPicker
      :male="sex"
      start="1959"
      end="2008"
      :year="year"
      :month="month"
      :date="date"
      :birth_hour="birth_hour"
      v-show="choose_time && show_nongli"
    />

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
  </div>
</template>

<script>
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
import { getPayOrderInfoAPI, payOrderAPI } from '../../../api/api';
import moment from 'moment';
import HeaderNotice from '../../../components/headerNotice.vue';
import { reportEnum } from '../../../libs/enum';

import tw_btn from './../../../assets/img/tw_mlxz/bazihehun/home/btn.png';
import cn_btn from './../../../assets/img/mlxz/bzhh/img_btn.png';

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
    };
  },

  created() {
    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: 'jsjb8g',
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
  },
  mounted() {
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
    self.loadBg('#canvas', self.is_cn ? self.cn_header : self.tw_header);
  },
  computed: {
    user_number() {
      return this.$store.state.year_user;
    },
    productList() {
      return this.$store.state.common.productList;
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {},
  methods: {
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
      window.Adjust &&
        window.Adjust.trackEvent({
          eventToken: 'z82ece',
        });

      utils.firebaseLogEvent(
        '10007',
        '-10002',
        'click_marriage_main',
        'click',
        {
          args_name: 'click_marriage_main',
          channel: utils.getFBChannel(),
        }
      );
      await utils.asleep(500);

      let gongli_nongli = this.gongli_nongli;
      if (this.male.username == '') {
        Toast(this.$t('male-name-check'));
        let dom = document.getElementById('maleusername');
        dom.focus();
        return;
      }
      if (this.female.username == '') {
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
        Toast(this.$t('male-date-check'));
        return;
      }
      if (this.female.picker_date_obj == null) {
        Toast(this.$t('female-date-check'));
        return;
      }
      if (!this.privacyChecked) {
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
  background-color: #f197ad;
  background-size: contain;
  background-repeat: no-repeat;
  min-height: 100vh;
  font-size: 0;
  padding-bottom: 1.6rem;
  position: relative;
}

.top-banner {
  position: relative;
  font-size: 0;
}

.top-banner-img {
  width: 100%;
}

.top-content {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
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
  width: 6.9rem;
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
  color: #b1031f;
}

.card {
  width: 100%;
}

.info {
  width: 100%;
}

.order {
  position: fixed;
  width: 0.56rem;
  height: 1.96rem;
  top: 1.6rem;
  right: 0.12rem;
  z-index: 3;
}

.btn-fixed {
  position: fixed;
  width: 6.9rem;
  left: 50%;
  margin-left: -3.46rem;
  bottom: 0.3rem;
  z-index: 2;
  animation: btnMove 1s infinite ease-in-out alternate;
}
</style>
