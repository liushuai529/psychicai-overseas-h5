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
    <canvas class="canvas1" id="canvas1"></canvas>

    <div class="info">
      <img
        class="info-bg"
        src="../../../assets/img/mlxz/lucky_year_report/card.png"
      />
      <div class="info-content">
        <img class="info-title" :src="is_cn ? cn_info_title : tw_info_title" />
        <div class="info-item">
          <div class="info-label">姓名</div>
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
          <div class="info-label">性别</div>
          <div class="info-input">
            <div
              class="sex-tab"
              :class="{ active: sex === 'male' }"
              ref="sex_male"
              @click="changeSex('male')"
            >
              <img
                v-if="sex === 'male'"
                class="sex-icon"
                src="../../../assets/img/mlxz/lucky_year_report/male-active.png"
              />
              <img
                v-else
                class="sex-icon"
                src="../../../assets/img/mlxz/lucky_year_report/male.png"
              />
              <div class="sex-text">男</div>
            </div>
            <div
              class="sex-tab"
              :class="{ active: sex === 'female' }"
              ref="sex_female"
              @click="changeSex('female')"
            >
              <img
                v-if="sex === 'female'"
                class="sex-icon"
                src="../../../assets/img/mlxz/lucky_year_report/female-active.png"
              />
              <img
                v-else
                class="sex-icon"
                src="../../../assets/img/mlxz/lucky_year_report/female.png"
              />
              <div class="sex-text">女</div>
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">生日</div>
          <div class="info-input">
            <div
              class="info-birth"
              :style="{ color: picker_date ? '#c18204' : ' #C5A667' }"
              @click="openPicker"
            >
              {{ picker_date || $t('birth-placeholder') }}
            </div>
            <img
              @click="openPicker"
              class="info-arrow"
              src="../../../assets/img/mlxz/lucky_year_report/arrow.png"
            />
          </div>
        </div>
        <img
          id="info-btn"
          class="info-btn"
          :src="is_cn ? cn_btn : tw_btn"
          @click="check"
        />
        <div class="info-bottom">
          <img
            v-if="privacyChecked"
            class="info-check"
            src="../../../assets/img/mlxz/lucky_year_report/check.png"
            @click="privacyChecked = !privacyChecked"
          />
          <img
            v-else
            class="info-check"
            src="../../../assets/img/mlxz/lucky_year_report/uncheck.png"
            @click="privacyChecked = !privacyChecked"
          />
          查看
          <span @click="link('user_agreement.html')">{{
            $t('user-agreement')
          }}</span
          >和
          <span @click="link('privacy.html')">{{ $t('privacy-policy') }}</span>
        </div>
      </div>
    </div>
    <img class="card" :src="is_cn ? cn_card1 : tw_card1" />
    <div
      :style="`background-image:url(${is_cn ? cn_card2 : cn_card2})`"
      class="canvas2"
    >
      <canvas id="canvas2"></canvas>
    </div>
    <img class="card" :src="is_cn ? cn_card3 : tw_card3" />
    <img class="card" :src="is_cn ? cn_card4 : tw_card4" />
    <img class="order" :src="is_cn ? cn_order : tw_order" @click="toOrder()" />
    <img
      v-show="showFixedBtn"
      class="btn-fixed huxi-btn"
      :src="is_cn ? cn_btn : tw_btn"
      @click="check"
    />

    <!-- 时间选择控件 -->
    <datetime-picker
      start="1960"
      end="2000"
      :year="year"
      :month="month"
      :date="date"
      :birth_hour="birth_hour"
      v-show="choose_time && !show_nongli"
    ></datetime-picker>
    <nongli-picker
      start="1960"
      end="2000"
      :year="year"
      :month="month"
      :date="date"
      :birth_hour="birth_hour"
      v-show="choose_time && show_nongli"
    ></nongli-picker>
    <!-- <combinePayPop
      :visible="pay_modal"
      :all_list="productList"
      :product_key="product_key"
      :product_price="product_price"
      :query_user_string="query_user_string"
      @update-visible="pay_modal = false"
      @getOrderId="getOrderId"
    ></combinePayPop> -->
    <HomeFooter v-if="showFixedBtn" product_key="h5_wealth2024" />
    <PopNotice
      v-if="is_show_notice"
      @close="closeNotice"
      :count_down="count_down"
      :product_key="product_key"
    />
    <FixedOrder
      v-if="show_fixed_order"
      :new_order_key="new_order_key"
      name="local"
      top="4.7rem"
      :time="local_time"
      @payOrder="checkOrder"
      @jumpDetail="jumpOrder"
    />
    <FixedOrder
      v-if="show_api_order"
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
import utils from '../../../libs/utils.js';
import {
  getPayOrderInfoAPI,
  payOrderAPI,
  getLastOrderAPI,
} from '../../../api/api';
import moment from 'moment';
import HeaderNotice from '../../../components/headerNotice.vue';
import { reportEnum, reportName, path_enums } from '../../../libs/enum';
import combinePayPop from '../../../components/combinePayPop.vue';

import cn_header from '../../../assets/img/mlxz/svga/wealth24/cn_header.svga';
import tw_header from '../../../assets/img/mlxz/svga/wealth24/tw_header.svga';

import cn_kaiyun from '../../../assets/img/mlxz/svga/wealth24/cn_kaiyun.svga';
import tw_kaiyun from '../../../assets/img/mlxz/svga/wealth24/tw_kaiyun.svga';

import cn_info_title from '../../../assets/img/mlxz/lucky_year_report/info-title.png';
import tw_info_title from '../../../assets/img/tw_mlxz/wealth_24/home/txt.png';

import cn_btn from '../../../assets/img/common/bt.png';
import tw_btn from '../../../assets/img/common/tw_bt.png';

import cn_card1 from '../../../assets/img/mlxz/lucky_year_report/1.png';
import tw_card1 from '../../../assets/img/tw_mlxz/wealth_24/home/1.png';

import cn_card2 from '../../../assets/img/mlxz/lucky_year_report/2.png';
import tw_card2 from '../../../assets/img/tw_mlxz/wealth_24/home/2.png';

import cn_card3 from '../../../assets/img/mlxz/lucky_year_report/3.png';
import tw_card3 from '../../../assets/img/tw_mlxz/wealth_24/home/3.png';

import cn_card4 from '../../../assets/img/mlxz/lucky_year_report/4.png';
import tw_card4 from '../../../assets/img/tw_mlxz/wealth_24/home/4.png';

import cn_order from '../../../assets/img/mlxz/lucky_year_report/order.png';
import tw_order from '../../../assets/img/tw_mlxz/wealth_24/home/order.png';
import PopNotice from '../../../components/PopNotice.vue';
let channel = utils.getQueryStr('channel');
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
    HomeFooter,
    PopNotice,
    FixedOrder,
  },
  data() {
    return {
      cn_order,
      tw_order,
      cn_card4,
      tw_card4,
      cn_card3,
      tw_card3,
      cn_card2,
      tw_card2,
      cn_card1,
      tw_card1,
      cn_btn,
      tw_btn,
      cn_info_title,
      tw_info_title,
      cn_header,
      tw_header,
      cn_kaiyun,
      tw_kaiyun,
      svg: 'https://mixmedia.rili.cn/c89f1fd7-acb1-48b8-9130-774512dfec70.svga',

      privacyChecked: true, // 同意隐私协议
      showFixedBtn: false,

      sex: 'male',
      year: '1995',
      month: '',
      date: '',
      birth_hour: '-1',

      username: '',
      picker_date: '',
      picker_date_obj: null,
      picker_hour: '',
      gongli_nongli: '公历',

      choose_time: false,
      show_nongli: false,
      channel: channel === '' ? null : channel,
      has_pay: '',
      paymentsClient: null,
      product_key: 'h5_wealth2024',
      is_show_btn: true,
      pay_modal: false,
      query_user_string: '',
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
    };
  },
  computed: {
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

      return this.fix_order_info && this.new_order_key !== this.product_key
        ? true
        : false;
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
    // window.Adjust &&
    //   window.Adjust.trackEvent({
    //     eventToken: 'e6huul',
    //   });
    this.$store.dispatch('common/getProduction');

    utils.firebaseLogEvent(
      '10005',
      '-10001',
      'page_view_2024wealty_main',
      'page_view',
      {
        args_name: 'page_view_2024wealty_main',
        channel: utils.getFBChannel(),
      }
    );
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
  },
  mounted() {
    this.showNoticePop();
    this.getLastOrder();

    // 赋默认值
    let storaged_userInfo = window.localStorage.getItem(
      'etouch_luck_userinfo_new'
    );
    if (storaged_userInfo) {
      let arr = storaged_userInfo.split('|');
      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.username = arr[0];

      if (['男', 'male', '1', 1].includes(arr[1])) {
        this.sex = 'male';
      } else {
        this.sex = 'female';
      }
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
      if (this.sex !== 'male') {
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
    self.loadBg('#canvas1', self.is_cn ? self.cn_header : self.tw_header);
    self.loadBg('#canvas2', self.is_cn ? self.cn_kaiyun : self.tw_kaiyun);
  },
  methods: {
    getOrderId(val) {
      this.order_id = val;
    },
    changeSex(val) {
      this.sex = val;
    },
    // 端内加载背景SVGA动画
    loadBg(dom, url, is_loop = true) {
      const downloader = new Downloader();
      const parser = new Parser();
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
    toOrder() {
      utils.jumpToOrder();
    },
    openPicker() {
      this.choose_time = true;
    },
    closePicker() {
      this.choose_time = false;
    },
    link(url) {
      let username = this.username;
      let sex = this.sex === 'male' ? 1 : 0;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        location.href = url;
        return;
      }
      if (time_obj == null) {
        location.href = url;
        return;
      }
      if (time_obj.year > 2000 || time_obj.year < 1960) {
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
      window.localStorage.setItem('etouch_luck_userinfo_new', querystring);
      location.href = url;
    },
    async check() {
      window.Adjust &&
        window.Adjust.trackEvent({
          eventToken: 'k9jxcj',
        });

      utils.firebaseLogEvent(
        '10005',
        '-10002',
        'click_2024wealty_main',
        'click',
        {
          args_name: 'click_2024wealty_main',
          channel: utils.getFBChannel(),
        }
      );
      await utils.asleep(500);
      let username = this.username;
      let sex = this.sex === 'male' ? 1 : 0;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
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
        Toast(this.$t('tips-3'));
        return;
      }
      if (time_obj.year > 2000 || time_obj.year < 1960) {
        Toast(this.$t('tips-5'));
        return;
      }
      if (!this.privacyChecked) {
        Toast(this.$t('tips-4'));
        return;
      }
      // Indicator.open('支付中');

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
      window.localStorage.setItem('etouch_luck_userinfo_new', querystring);
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
          // this.$router.push('result')
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
      if (
        this.last_order.status !== 'PAYED' &&
        this.last_order.product_key !== this.product_key
      ) {
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

    // api订单下单
    async checkOrder() {
      Indicator.open(tipsArr5[utils.getLanguage()]);
      const { ext, pay_method, product_key, product_id, payment } =
        this.last_order;
      if (this.last_order.status === 'PAYED') return;
      let params = {
        pay_method: pay_method,
        product_key: product_key,
        product_id: product_id,
        platform: 'WEB',
        extra_ce_suan: ext,
        callback_url: `${location.origin}${path_enums[product_key]}.html#/result?path=${path_enums[product_key]}&report_price=${payment}`,
      };

      const res = await payOrderAPI(params);
      Indicator.close();
      if (res.status !== 1000) return;
      localStorage.removeItem('mlxz_fixed_api_order_id');
      localStorage.removeItem('mlxz_fixed_api_order_time');
      await utils.asleep(1000);
      location.href = res.data.pay_url;
    },
    jumpOrder() {
      let path =
        'detail?querystring=' +
        this.fix_order_info +
        '&pay_modal=1' +
        '&use_fixed_time=1';

      location.href = `${location.origin}/${
        path_enums[this.new_order_key]
      }.html#/${path}`;
    },
  },
};
</script>

<style scoped lang="less">
.canvas2 {
  width: 6.9rem;
  height: 4.32rem;
  margin-bottom: 0.3rem;
  background-size: contain;
  background-repeat: no-repeat;

  #canvas2 {
    width: 100%;
    height: 100%;
  }
}
.fix-box {
  position: fixed !important;
}

.canvas1 {
  width: 7.5rem;
  height: 9.4rem;
  position: absolute;
  z-index: 2;
  top: 0;
}

.cn-bg {
  background-image: url('../../../assets/img/mlxz/lucky_year_report/2024caiyun_header.png');
}
.tw-bg {
  background-image: url('../../../assets/img/mlxz/lucky_year_report/2024caiyun_header.png');
}
.container {
  width: 7.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8de95;
  background-size: 7.5rem 9.4rem;
  background-repeat: no-repeat;
  padding-bottom: 1.6rem;
  padding-top: 7.4rem;
  position: relative;
  .header {
    display: block;
    width: 100%;
    z-index: 1;
  }
  .info {
    position: relative;
    margin-bottom: 0.24rem;
    z-index: 2;
    .info-bg {
      display: block;
      width: 100%;
    }
    .info-content {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .info-title {
        display: block;
        width: 4.08rem;
        margin-top: 0.3rem;
        margin-bottom: 0.4rem;
      }
      .info-desc {
        width: 5.8rem;
        font-size: 0.3rem;
        line-height: 0.38rem;
        color: #b2663e;
        margin-bottom: 0.4rem;
      }
      .info-item {
        margin-bottom: 0.2rem;
        width: 5.9rem;
        display: flex;
        align-items: center;
        .info-label {
          flex: none;
          color: #333;
          font-size: 0.3rem;
          font-weight: bold;
          margin-right: 0.14rem;
        }
        .info-input {
          flex: auto;
          height: 0.92rem;
          background-color: #fde4a2;
          border-radius: 0.24rem;
          display: flex;
          box-sizing: border-box;
          padding: 0.06rem;
          align-items: center;
          input {
            width: 95%;
            font-size: 0.3rem;
            line-height: 0.42rem;
            outline: none;
            border: none;
            background-color: transparent;
            padding: 0;
            margin: 0 0.3rem;
            color: #c18204;
            &::input-placeholder {
              color: #c5a667;
            }
            &::-webkit-input-placeholder {
              color: #c5a667;
            }
            &::-moz-placeholder {
              color: #c5a667;
            }
            &::-moz-placeholder {
              color: #c5a667;
            }
            &::-ms-input-placeholder {
              color: #c5a667;
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
            color: #c18204;
            border-radius: 0.2rem;
            .sex-icon {
              display: block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
            }
            &.active {
              color: #fff;
              background-color: #e29d0f;
            }
          }
        }
      }
      .info-btn {
        width: 5.92rem;
        margin-top: 0.3rem;
        margin-bottom: 0.4rem;
        animation: scaleBtn 1s infinite ease-in-out alternate;
      }
      .info-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333333;
        font-size: 0.22rem;
        line-height: 0.3rem;
        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.12rem;
        }
        span {
          color: #c18204;
        }
      }
    }
  }
  .card {
    display: block;
    width: 92%;
    margin-bottom: 0.3rem;
  }
  .order {
    position: fixed;
    width: 0.58rem;
    top: 3rem;
    right: 0;
    z-index: 2;
  }
  .btn-fixed {
    position: fixed;
    width: 5.86rem;
    left: 50%;
    margin-left: -2.93rem;
    bottom: 0.3rem;
    z-index: 2;
  }
}
</style>
