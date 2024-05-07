<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-06 17:17:34
 * @Description: 2023兔年流年运程详批
-->
<template>
  <div :class="{ container: true, 'fix-box': choose_time ? true : false }">
    <header-notice v-if="has_pay"></header-notice>
    <div class="title">
      <img
        src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_head_word3.png"
      />
    </div>
    <canvas
      class="canvas"
      id="canvas"
      style="width: 7rem; height: 7rem"
    ></canvas>
    <div class="bar">
      <div class="top">
        <img
          class="tab"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/gua_img_chenyu1.png"
        />
        <img
          class="tab"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/gua_img_chenyu2.png"
        />
        <img
          class="tab"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/gua_img_chenyu3.png"
        />
        <img
          class="tab"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/gua_img_chenyu4.png"
        />
      </div>
      <img
        class="desc"
        src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_head_word1.png"
      />
    </div>
    <div class="info">
      <!-- <img
        class="info-card"
        src="../../../assets/img/new_year_luck_overseas/home/card.png"
      /> -->
      <div class="info-content">
        <img
          class="info-title"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_head_word2.png"
        />
        <div class="info-name">
          <div class="label">您的姓名</div>
          <input
            v-model="username"
            class="info-input"
            type="text"
            placeholder="请输入姓名(汉字)"
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
          <div class="label">出生日期</div>
          <div
            class="info-input"
            :style="{
              color: picker_date ? '#3c2f22' : 'rgba(60, 47, 34, 0.5)',
            }"
            @click="openPicker"
          >
            {{ picker_date || '请输入出生日期(必填)' }}
          </div>
          <img
            class="calendar"
            src="../../../assets/img/new_year_luck_overseas/home/calendar.png"
            @click="openPicker"
          />
        </div>
        <img
          class="info-btn"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/btn_ling.png"
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
          <span>我已阅读并同意</span>
          <span class="link" @click="toPrivacy('user_agreement.html')"
            >《用户协议》</span
          >
          <span>和</span>
          <span class="link" @click="toPrivacy('privacy.html')"
            >《隐私协议》</span
          >
        </div>
      </div>
    </div>
    <img
      class="card"
      src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_yun1.png"
    />
    <img
      class="card"
      src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_yun2.png"
    />
    <img
      class="card"
      src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_yun3.png"
    />
    <img
      class="card"
      src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_yun4.png"
    />
    <img
      class="card"
      src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_yun5.png"
    />
    <div class="info" style="margin-bottom: 3.7rem; margin-top: 0.4rem">
      <!-- <img
        class="info-card"
        src="../../../assets/img/new_year_luck_overseas/home/card.png"
      /> -->
      <div class="info-content">
        <img
          class="info-title2"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/img_biao2.png"
        />
        <div class="info-name">
          <div class="label">您的姓名</div>
          <input
            v-model="username"
            class="info-input"
            type="text"
            placeholder="请输入姓名(汉字)"
          />
          <img
            v-if="sex == '1'"
            class="sex"
            src="../../../assets/img/new_year_luck_overseas/home/switch-male.png"
            @click="sex = '0'"
          />
          <img
            v-else
            class="sex"
            src="../../../assets/img/new_year_luck_overseas/home/switch-female.png"
            @click="sex = '1'"
          />
        </div>
        <div class="info-time">
          <div class="label">出生日期</div>
          <div
            class="info-input"
            :style="{
              color: picker_date ? '#3c2f22' : 'rgba(60, 47, 34, 0.5)',
            }"
            @click="openPicker"
          >
            {{ picker_date || '请输入出生日期(必填)' }}
          </div>
          <img
            class="calendar"
            src="../../../assets/img/new_year_luck_overseas/home/calendar.png"
            @click="openPicker"
          />
        </div>
        <img
          class="info-btn"
          src="../../../assets/img/mlxz/yasuo_tunianyunchen/btn_ling.png"
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
          <span>我已阅读并同意</span>
          <span class="link" @click="toPrivacy('user_agreement.html')"
            >《用户协议》</span
          >
          <span>和</span>
          <span class="link" @click="toPrivacy('privacy.html')"
            >《隐私协议》</span
          >
        </div>
      </div>
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
    HeaderNotice,
    TopBar,
  },
  data() {
    return {
      svg: 'https://mixmedia.rili.cn/1425252e-6c76-4bec-9d74-1b09ec40d6bd.svga',

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
      product_key: 'h5_fortune2023',
      query_user_string: '',

      is_combine,
      has_pay: '',
      is_show_btn: true,
    };
  },
  created() {
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    utils.firebaseLogEvent('20001', '-10001', 'page_view_report', 'page_view', {
      args_name: 'page_view_report',
      report_id: '60007',
      channel: utils.getFBChannel(),
    });

    // 赋默认值
    let storaged_userInfo = window.localStorage.getItem('new_overseas_info');
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

    this.loadBg();
  },
  methods: {
    changeSex(val) {
      this.sex = val + '';
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
    toPrivacy(url) {
      this.storeUserInfo(url);
    },
    openPicker() {
      this.choose_time = true;
    },
    closePicker() {
      this.choose_time = false;
    },
    storeUserInfo(url) {
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

      window.localStorage.setItem('new_overseas_info', querystring);
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
          report_id: '60007',
          channel: utils.getFBChannel(),
        }
      );
      await utils.asleep(500);

      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        Toast('请输入姓名');
        return;
      }
      if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
        Toast('请输入中文姓名');
        return;
      }
      if (time_obj == null) {
        Toast('请选择时间');
        return;
      }
      if (!this.privacyChecked) {
        Toast('请阅读并同意用户协议及隐私条款');
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

      window.localStorage.setItem('new_overseas_info', querystring);
      let path = 'detail?querystring=' + querystring;

      if (show_popup) {
        this.query_user_string = querystring;
        this.visible = true;

        // 测算详情 支付抽屉的浏览
        tStatistic.send({
          event: 'view',
          md: 12,
          c_id: 102,
          args: {
            type: this.product_id,
            origin: location.origin,
            channel: localStorage.getItem('suishen_overseas_channel'),
          },
        });
      } else if (is_combine) {
        let paypopup = this.$refs.PayPopup;
        paypopup.combinePay(main_order_id, this.product_id, querystring);
      } else {
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

.container {
  width: 7.5rem;
  position: relative;
  background-image: url('../../../assets/img/mlxz/yasuo_tunianyunchen/2023_tnllycxp_bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-color: #eac293;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .canvas {
    position: absolute;
    right: -1.5rem;
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
    .top {
      display: flex;
      justify-content: center;
      .tab {
        width: 1.22rem;
        margin: 0 0.2rem;
      }
    }
    .desc {
      margin: 0.08rem 0;
      width: 6.7rem;
      height: 0.39rem;
    }
  }
  .info {
    // width: 96.8%;
    position: relative;
    display: flex;
    justify-content: center;
    width: 7.26rem;
    height: 5.12rem;
    .info-card {
      width: 7.26rem;
      height: 5.12rem;
    }
    .info-content {
      // position: absolute;
      // top: 0;
      width: 100%;
      height: 100%;
      padding: 0 0.48rem;
      background: url('../../../assets/img/new_year_luck_overseas/home/card.png')
        no-repeat;
      background-size: contain;
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
        border-bottom: 1px solid #ddc798;
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
        margin-top: 0.1rem;
      }
      .info-bottom {
        font-size: 0.24rem;
        line-height: 1;
        display: flex;
        align-items: center;
        color: rgba(60, 47, 34, 0.6);
        margin-top: 0.2rem;
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
    width: 96.8%;
    margin-bottom: 0.05rem;
  }
}
</style>
