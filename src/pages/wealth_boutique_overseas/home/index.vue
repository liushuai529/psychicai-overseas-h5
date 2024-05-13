<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-13 10:06:27
 * @Description: 2023兔年一生财运
-->
<template>
  <div :class="{ container: true, 'fix-box': choose_time ? true : false }">
    <header-notice v-if="has_pay"></header-notice>

    <img class="header" src="../../../assets/img/mlxz/2023tnys/whole_bg.png" />
    <div class="info">
      <img class="info-bg" src="../../../assets/img/mlxz/2023tnys/card.png" />
      <div class="info-content">
        <img
          class="info-title"
          src="../../../assets/img/mlxz/2023tnys/txt.png"
        />
        <div class="info-item">
          <div class="info-label">姓名</div>
          <div class="info-input">
            <input type="text" v-model="username" placeholder="请输入" />
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">性別</div>
          <div class="info-input">
            <div
              class="sex-tab"
              :class="{ active: sex == '1' }"
              ref="sex_male"
              @click="changeSex(1)"
            >
              <img
                v-if="sex == '1'"
                class="sex-icon"
                src="../../../assets/img/wealth_boutique_overseas/home/male-active.png"
              />
              <img
                v-else
                class="sex-icon"
                src="../../../assets/img/wealth_boutique_overseas/home/male.png"
              />
              <div class="sex-text">男</div>
            </div>
            <div
              class="sex-tab"
              :class="{ active: sex == '0' }"
              ref="sex_female"
              @click="changeSex(0)"
            >
              <img
                v-if="sex == '0'"
                class="sex-icon"
                src="../../../assets/img/wealth_boutique_overseas/home/female-active.png"
              />
              <img
                v-else
                class="sex-icon"
                src="../../../assets/img/wealth_boutique_overseas/home/female.png"
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
              :style="{ color: picker_date ? '#333' : '#b2663e' }"
              @click="openPicker"
            >
              {{ picker_date || '请选择' }}
            </div>
            <img
              @click="openPicker"
              class="info-arrow"
              src="../../../assets/img/wealth_boutique_overseas/home/arrow.png"
            />
          </div>
        </div>
        <img
          id="info-btn"
          class="info-btn"
          src="../../../assets/img/mlxz/2023tnys/bt.png"
          @click="check"
        />
        <div class="info-bottom">
          <img
            v-if="privacyChecked"
            class="info-check"
            src="../../../assets/img/wealth_boutique_overseas/home/check.png"
            @click="privacyChecked = !privacyChecked"
          />
          <img
            v-else
            class="info-check"
            src="../../../assets/img/wealth_boutique_overseas/home/uncheck.png"
            @click="privacyChecked = !privacyChecked"
          />
          查看
          <span @click="link('user_agreement.html')">《用户协议》</span>和
          <span @click="link('privacy.html')">《隐私协议》</span>
        </div>
      </div>
    </div>
    <img class="card" src="../../../assets/img/mlxz/2023tnys/2.png" />
    <img class="card" src="../../../assets/img/mlxz/2023tnys/3.png" />
    <img class="card" src="../../../assets/img/mlxz/2023tnys/4.png" />
    <img class="card" src="../../../assets/img/mlxz/2023tnys/card5.png" />
    <img class="card" src="../../../assets/img/mlxz/2023tnys/6.png" />
    <img
      class="order"
      src="../../../assets/img/mlxz/2023tnys/bgm_lsdd.png"
      @click="toOrder()"
    />
    <img
      v-show="showFixedBtn"
      class="btn-fixed"
      src="../../../assets/img/mlxz/2023tnys/bt.png"
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
import HeaderNotice from '../../../components/headerNotice.vue';

import { getPayOrderInfoAPI } from '../../../api/api';
import moment from 'moment';

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
      svg: 'https://mixmedia.rili.cn/c89f1fd7-acb1-48b8-9130-774512dfec70.svga',
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
      gongli_nongli: '1', // 1公曆 0農曆

      choose_time: false,
      show_nongli: false,

      // 底部弹出popup版本所需数据
      visible: false,
      product_id: 4,
      product_key: 'h5_wealth2023',
      query_user_string: '',

      is_combine,
      has_pay: '',
    };
  },
  created() {
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    utils.firebaseLogEvent('20001', '-10001', 'page_view_report', 'page_view', {
      args_name: 'page_view_report',
      report_id: '60008',
      channel: utils.getFBChannel(),
    });

    // 赋默认值
    let storaged_userInfo = window.localStorage.getItem(
      '_wealth_overseas_info'
    );
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
    let screenH = window.screen.height;

    let btn = document.getElementById('info-btn');
    document.addEventListener('scroll', e => {
      let flag = utils.isElementInViewport(btn);
      if (!this.is_show_btn) {
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
    // this.loadBg();
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
    toOrder() {
      location.href = 'mlxz://h5order?type=1';
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
      window.localStorage.setItem('_wealth_overseas_info', querystring);
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
          report_id: '60008',
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
      window.localStorage.setItem('_wealth_overseas_info', querystring);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #efd5be;
  padding-bottom: 1.6rem;
  .header {
    display: block;
    width: 100%;
  }
  .info {
    position: relative;
    margin-top: -2.1rem;
    margin-bottom: 0.24rem;
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
        margin-top: 0.5rem;
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
          background-color: #f1d6b7;
          border-radius: 0.24rem;
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
              color: #b2663e;
            }
            &::-webkit-input-placeholder {
              color: #b2663e;
            }
            &::-moz-placeholder {
              color: #b2663e;
            }
            &::-moz-placeholder {
              color: #b2663e;
            }
            &::-ms-input-placeholder {
              color: #b2663e;
            }
          }
          .info-birth {
            flex: auto;
            font-size: 0.3rem;
            line-height: 0.42rem;
            color: #b2663e;
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
            color: #b2663e;
            border-radius: 0.2rem;
            .sex-icon {
              display: block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
            }
            &.active {
              color: #fff;
              background-color: #ca8059;
            }
          }
        }
      }
      .info-btn {
        width: 5.92rem;
        margin-top: 0.3rem;
        margin-bottom: 0.4rem;
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
          color: #b2663e;
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
  }
  .btn-fixed {
    position: fixed;
    width: 5.86rem;
    left: 50%;
    margin-left: -2.93rem;
    bottom: 0.43rem;
  }
}
</style>
