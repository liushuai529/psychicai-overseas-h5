<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-06 17:16:05
 * @Description: 八字事业详批
-->
<template>
  <div :class="{ container: true, 'fix-box': choose_time ? true : false }">
    <header-notice v-if="has_pay"></header-notice>
    <!-- <canvas class="canvas" id="canvas" style="width: 100%"></canvas> -->
    <div class="header-box">
      <img src="../../../assets/img/mlxz/career/head_bg.png" alt="" />
    </div>
    <div class="info">
      <img class="info-card" src="../../../assets/img/mlxz/career/card.png" />
      <div class="info-content">
        <div class="info-name">
          <input
            v-model="username"
            class="info-input"
            type="text"
            :placeholder="$t('name-placeholder')"
          />
          <img
            v-if="sex === '1'"
            class="sex"
            src="../../../assets/img/career_divination_overseas/home/male.png"
            ref="sex_male"
            @click="changeSex(0)"
          />
          <img
            v-else
            class="sex"
            src="../../../assets/img/career_divination_overseas/home/female.png"
            ref="sex_female"
            @click="changeSex(1)"
          />
        </div>
        <div class="info-time">
          <div
            class="info-input"
            :style="{ color: picker_date ? '#3c2f22' : '#636363' }"
            @click="openPicker"
          >
            {{ picker_date || $t('birth-placeholder') }}
          </div>
          <img
            class="calendar"
            src="../../../assets/img/career_divination_overseas/home/calendar.png"
            @click="openPicker"
          />
        </div>
        <img
          id="info-btn"
          v-if="language === 'zh-CN'"
          class="info-btn"
          src="../../../assets/img/mlxz/career/img_btn.png"
          @click="check"
        />
        <img
          id="info-btn"
          v-else
          class="info-btn"
          src="../../../assets/img/tw_mlxz/career/btn.png"
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
          <span>{{ $t('check-label') }}</span>
          <span class="link" @click="link('user_agreement.html')">{{
            $t('user-agreement')
          }}</span>
          <span>{{ $t('and') }}</span>
          <span class="link" @click="link('privacy.html')">{{
            $t('privacy-policy')
          }}</span>
        </div>
        <div class="info-history" @click="toOrder">
          <span>{{ $t('history-order') }}</span>
          <img
            src="../../../assets/img/career_divination_overseas/home/arrow.png"
          />
        </div>
      </div>
    </div>
    <img
      class="card"
      v-if="language === 'zh-CN'"
      src="../../../assets/img/mlxz/career/msg_img_2.png"
    />
    <img
      class="card"
      v-else
      src="../../../assets/img/tw_mlxz/career/card1.png"
    />

    <img
      class="card"
      v-if="language === 'zh-CN'"
      src="../../../assets/img/mlxz/career/msg_img_3.png"
    />
    <img
      class="card"
      v-else
      src="../../../assets/img/tw_mlxz/career/card2.png"
    />

    <img
      class="card"
      v-if="language === 'zh-CN'"
      src="../../../assets/img/mlxz/career/msg_img_4.png"
    />
    <img
      class="card"
      v-else
      src="../../../assets/img/tw_mlxz/career/card3.png"
    />

    <img
      class="card"
      v-if="language === 'zh-CN'"
      src="../../../assets/img/mlxz/career/msg_img_5.png"
    />
    <img
      class="card"
      v-else
      src="../../../assets/img/tw_mlxz/career/card4.png"
    />

    <img
      class="card"
      v-if="language === 'zh-CN'"
      src="../../../assets/img/mlxz/career/msg_img_6.png"
    />
    <img
      class="card"
      v-else
      src="../../../assets/img/tw_mlxz/career/card5.png"
    />

    <div class="bottom"></div>
    <div v-show="showFixedBtn" class="btn-fixed">
      <img
        v-if="language === 'zh-CN'"
        src="../../../assets/img/mlxz/career/img_btn.png"
        @click="check"
      />
      <img
        v-else
        src="../../../assets/img/tw_mlxz/career/btn.png"
        @click="check"
      />
    </div>

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
    <PayPopup
      ref="PayPopup"
      :visible="visible"
      :product_key="product_key"
      :query_user_string="query_user_string"
      @update-visible="visible = false"
    ></PayPopup>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Downloader, Parser, Player } from 'svga.lite';

import DatetimePicker from '../../../components/DatetimePicker';
import NongliPicker from '../../../components/NongliPicker';
import PayPopup from '../../../components/PayPopup';
import TopBar from '../../../components/TopBar';
import utils from '../../../libs/utils.js';
import { getPayOrderInfoAPI } from '../../../api/api';
import moment from 'moment';
import HeaderNotice from '../../../components/headerNotice.vue';

let show_popup = utils.getQueryString('show_popup');

// 组合测算相关参数
let is_combine = utils.getQueryString('is_combine');
let main_order_id = utils.getQueryString('main_order_id');
let from_nav = utils.getQueryString('from_nav');

export default {
  components: {
    DatetimePicker,
    NongliPicker,
    PayPopup,
    TopBar,
    HeaderNotice,
  },
  data() {
    return {
      language: utils.getLanguage('language'),
      svg: 'https://mixmedia.rili.cn/422937d4-a997-4686-a8a9-56d33ccb7000.svga',

      privacyChecked: true, // 同意隐私协议
      showFixedBtn: false,

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
      product_key: 'h5_career',

      query_user_string: '',
      product_id: 22,
      is_combine,
      has_pay: '',
      is_show_btn: true,
    };
  },
  created() {
    document.title = this.$t('dom-title');
    utils.firebaseLogEvent('20001', '-10001', 'page_view_report', 'page_view', {
      args_name: 'page_view_report',
      report_id: '60004',
      channel: utils.getFBChannel(),
    });
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';

    // 测算详情 页面浏览

    // 赋默认值
    let storaged_userInfo = window.localStorage.getItem('career_overseas_info');
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
    }
  },
  mounted() {
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

    let screenH = window.screen.height;
    let btn = document.getElementById('info-btn');
    document.addEventListener('scroll', e => {
      let scroll_distance =
        window.pageYOffset || document.documentElement.scrollTop;
      let flag = utils.isElementInViewport(btn);
      if (!this.is_show_btn || scroll_distance < 100) {
        this.showFixedBtn = false;
        return;
      }
      if (!flag) {
        this.showFixedBtn = true;
      } else {
        this.showFixedBtn = false;
      }
    });
    let initialWindowHeight = window.innerHeight;
    // 添加resize事件监听器
    window.addEventListener('resize', function () {
      this.is_show_btn =
        initialWindowHeight > window.innerHeight ? false : true;
    });
  },
  watch: {},
  methods: {
    changeSex(val) {
      this.sex = val + '';
    },
    toOrder() {
      location.href = 'mlxz://h5order?type=1';
    },
    // 端内加载背景SVGA动画
    loadBg() {
      const downloader = new Downloader();
      // 默认调用 WebWorker 线程解析
      // 可配置 new Parser({ disableWorker: true }) 禁止
      const parser = new Parser();
      // #canvas 是 HTMLCanvasElement
      const player = new Player('#canvas');

      (async () => {
        const fileData = await downloader.get(this.svg);
        const svgaData = await parser.do(fileData);

        player.set({ loop: true });

        await player.mount(svgaData);

        // 开始播放动画
        player.start();
      })();
    },

    openPicker() {
      this.choose_time = true;
    },
    closePicker() {
      this.choose_time = false;
    },
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
      window.localStorage.setItem('career_overseas_info', querystring);
      location.href = url;
    },
    async check() {
      utils.firebaseLogEvent(
        '20001',
        '-10005',
        'click_report_confirm',
        'click',
        {
          args_name: 'click_report_confirm',
          report_id: '60004',
          channel: utils.getFBChannel(),
        }
      );
      await utils.asleep(500);

      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        Toast('請輸入姓名');
        return;
      }
      if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
        Toast('請輸入中文姓名');
        return;
      }
      if (time_obj == null) {
        Toast('請選擇時间');
        return;
      }
      if (!this.privacyChecked) {
        Toast('請閱讀並同意用戶協議及隱私條款');
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
      window.localStorage.setItem('career_overseas_info', querystring);
      let path = 'detail?querystring=' + querystring;

      if (show_popup) {
        this.query_user_string = querystring;
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
  },
};
</script>
<style scoped lang="less">
.fix-box {
  position: fixed !important;
}
.header-box {
  width: 7.5rem;
  height: 5.56rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.container {
  width: 7.5rem;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-color: #f1bf8b;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .info {
    width: 96.8%;
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: -0.55rem;
    margin-bottom: 0.2rem;
    .info-card {
      width: 7.3rem;
      height: 5.77rem;
    }
    .info-content {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 0 0.4rem;
      box-sizing: border-box;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
          width: 150px;
          font-size: 0.32rem;
          line-height: 0.45rem;
          outline: none;
          color: #3c2f22;
          background-color: #faf7f7;
          border: 0.03rem solid #ffe1b2;
          border-radius: 0.12rem;
          padding: 0.2rem;
          &::input-placeholder {
            color: #636363;
          }
          &::-webkit-input-placeholder {
            color: #636363;
          }
          &::-moz-placeholder {
            color: #636363;
          }
          &::-moz-placeholder {
            color: #636363;
          }
          &::-ms-input-placeholder {
            color: #636363;
          }
        }
        .sex {
          flex: none;
          display: block;
          width: 2.1rem;
          margin-left: 0.3rem;
        }
        .calendar {
          position: absolute;
          right: 0.23rem;
          width: 0.46rem;
        }
      }
      .info-btn {
        width: 5.98rem;
        margin-top: 0.1rem;
      }
      .info-privacy {
        font-size: 0.24rem;
        line-height: 1;
        display: flex;
        align-items: center;
        color: #181111;
        margin-top: 0.2rem;
        margin-bottom: 0.3rem;
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
        color: #ee6c41;
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
  }
  .card {
    width: 96.8%;
    margin-bottom: 0.2rem;
  }
  .bottom {
    width: 100%;
    height: 1.53rem;
    // background-color: #a1794f;
  }
  .btn-fixed {
    position: fixed;
    width: 5.98rem;
    left: 50%;
    bottom: -0.15rem;
    margin-left: -2.99rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
