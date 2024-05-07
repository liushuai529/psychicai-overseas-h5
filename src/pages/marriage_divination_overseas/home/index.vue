<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-06 17:17:16
 * @Description: 姻缘分析
-->
<template>
  <div :class="{ container: true, 'fix-box': choose_time ? true : false }">
    <header-notice v-if="has_pay"></header-notice>

    <img class="header" src="../../../assets/img/mlxz/marry/header.png" />
    <div class="info">
      <img
        class="info-bg"
        src="../../../assets/img/marriage_divination_overseas/home/card.png"
      />
      <div class="info-content">
        <img class="info-title" src="../../../assets/img/mlxz/marry/tip.png" />
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
              :class="{ active: sex === '1' }"
              ref="sex_male"
              @click="changeSex(1)"
            >
              <img
                v-if="sex === '1'"
                class="sex-icon"
                src="../../../assets/img/marriage_divination_overseas/home/male-active.png"
              />
              <img
                v-else
                class="sex-icon"
                src="../../../assets/img/marriage_divination_overseas/home/male.png"
              />
              <div class="sex-text">男</div>
            </div>
            <div
              class="sex-tab"
              :class="{ active: sex === '0' }"
              ref="sex_female"
              @click="changeSex(0)"
            >
              <img
                v-if="sex === '0'"
                class="sex-icon"
                src="../../../assets/img/marriage_divination_overseas/home/female-active.png"
              />
              <img
                v-else
                class="sex-icon"
                src="../../../assets/img/marriage_divination_overseas/home/female.png"
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
              :style="{ color: picker_date ? '#333' : 'rgba(51, 51, 51, 0.5)' }"
              @click="openPicker"
            >
              {{ picker_date || '请选择' }}
            </div>
            <img
              @click="openPicker"
              class="info-arrow"
              src="../../../assets/img/marriage_divination_overseas/home/arrow.png"
            />
          </div>
        </div>
        <img
          id="info-btn"
          class="info-btn"
          src="../../../assets/img/mlxz/marry/bt1.png"
          @click="check"
        />
        <div class="info-bottom">
          <img
            v-if="privacyChecked"
            class="info-check"
            src="../../../assets/img/marriage_divination_overseas/home/checked.png"
            @click="privacyChecked = !privacyChecked"
          />
          <img
            v-else
            class="info-check"
            src="../../../assets/img/marriage_divination_overseas/home/unchecked.png"
            @click="privacyChecked = !privacyChecked"
          />
          查看
          <span @click="link('user_agreement.html')">《用户协议》</span>和
          <span @click="link('privacy.html')">《隐私协议》</span>
        </div>
      </div>
    </div>
    <img class="card" src="../../../assets/img/mlxz/marry/card1.png" />
    <img class="card" src="../../../assets/img/mlxz/marry/card2.png" />
    <img class="card" src="../../../assets/img/mlxz/marry/card3.png" />
    <img class="card" src="../../../assets/img/mlxz/marry/card4.png" />
    <img
      class="order"
      src="../../../assets/img/mlxz/marry/order.png"
      @click="toOrder()"
    />
    <img
      v-show="showFixedBtn"
      class="btn-fixed"
      src="../../../assets/img/mlxz/marry/bt1.png"
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

import DatetimePicker from '../../../components/DatetimePicker';
import NongliPicker from '../../../components/NongliPicker';
import PayPopup from '../../../components/PayPopup';
import TopBar from '../../../components/TopBar';
import utils from '../../../libs/utils.js';
import { getProductions } from '../../../libs/common_api';
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
      gongli_nongli: '1', // 1公曆 0農曆

      choose_time: false,
      show_nongli: false,

      // 底部弹出popup版本所需数据
      visible: false,
      product_id: 24,
      query_user_string: '',
      product_key: 'h5_love',
      is_combine,

      sum_arr: [],
      product: {},
      payment_details: [],
      has_pay: '',
      is_show_btn: true,
    };
  },
  async created() {
    utils.firebaseLogEvent('20001', '-10001', 'page_view_report', 'page_view', {
      args_name: 'page_view_report',
      report_id: '60006',
      channel: utils.getFBChannel(),
    });
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    // this.sum_arr = await this.getProductions();

    // 赋默认值
    let storaged_userInfo = window.localStorage.getItem('lucky_overseas_info');
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
  },
  methods: {
    getProductions,
    changeSex(val) {
      this.sex = val + '';
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
      window.localStorage.setItem('lucky_overseas_info', querystring);
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
          report_id: '60006',
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
        Toast('请选择生日');
        return;
      }
      if (!this.privacyChecked) {
        Toast('请阅读并同意用户协议和隐私协议');
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

      window.localStorage.setItem('lucky_overseas_info', querystring);
      let path = 'detail?querystring=' + querystring;
      if (show_popup) {
        this.query_user_string = querystring;
        this.visible = true;
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
  background-color: #601621;
  padding-bottom: 1.54rem;
  .header {
    display: block;
    width: 100%;
  }
  .info {
    position: relative;
    margin-top: -1.8rem;
    margin-bottom: 0.24rem;
    display: flex;
    justify-content: center;
    .info-bg {
      display: block;
      width: 7.22rem;
      height: 8.06rem;
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
        width: 3.96rem;
        margin-bottom: 0.45rem;
      }
      .info-item {
        margin-bottom: 0.2rem;
        width: 5.46rem;
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
          background-color: #eee1c8;
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
            color: #333;
            border-radius: 0.2rem;
            .sex-icon {
              display: block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
            }
            &.active {
              color: #fff;
              background-color: #d32741;
            }
          }
        }
      }
      .info-btn {
        width: 3.9rem;
        margin-top: 0.2rem;
        margin-bottom: 0.3rem;
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
          color: #d32741;
        }
      }
    }
  }
  .card {
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .order {
    position: fixed;
    width: 0.92rem;
    top: 2rem;
    right: 0.05rem;
  }
  .btn-fixed {
    position: fixed;
    width: 3.9rem;
    left: 50%;
    margin-left: -1.95rem;
    bottom: 0.4rem;
  }
}
</style>
