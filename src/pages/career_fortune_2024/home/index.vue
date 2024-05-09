<template>
  <div
    :class="{
      container: true,
      'fix-box': choose_time ? true : false,
      'lang-cn': language === 'zh-CN',
      'lang-tw': language === 'zh-TW',
    }"
  >
    <header-notice v-if="has_pay"></header-notice>
    <canvas id="bg-svga"></canvas>
    <div class="info">
      <div class="info-content">
        <div class="info-item">
          <div class="info-label">姓名</div>
          <div class="info-input">
            <input
              type="text"
              v-model="username"
              :placeholder="$t('name-placeholder')"
            />
          </div>
        </div>

        <div class="info-item">
          <div class="info-label">生日</div>
          <div class="info-input">
            <div
              class="info-birth"
              :style="{ color: picker_date ? '#333' : '#4b3d3a80' }"
              @click="openPicker"
            >
              {{ picker_date || $t('birth-placeholder') }}
            </div>
            <img
              @click="openPicker"
              class="info-arrow"
              src="../../../assets/img/mlxz/career_2024/icon_you.png"
            />
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
                src="../../../assets/img/mlxz/career_2024/icon_boy_b.png"
              />
              <div class="sex-text">男性</div>
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
                src="../../../assets/img/mlxz/career_2024/icon_girl_b.png"
              />
              <div class="sex-text">女性</div>
            </div>
          </div>
        </div>
        <img
          id="info-btn"
          class="info-btn huxi-btn"
          :src="language === 'zh-CN' ? cn_lock_btn : tw_lock_btn"
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
          <span @click="link('user_agreement.html')">{{
            $t('user-agreement')
          }}</span
          >和
          <span @click="link('privacy.html')">{{ $t('privacy-policy') }}</span>
        </div>
      </div>
    </div>
    <div
      :style="`background-image:url(${is_cn ? cn_card_1 : tw_card_1})`"
      class="card-box"
    >
      <canvas id="zhanwang"></canvas>
    </div>
    <!-- <img class="card" :src="language === 'zh-CN' ? cn_card_1 : tw_card_1" /> -->
    <img class="card" :src="language === 'zh-CN' ? cn_card_2 : tw_card_2" />
    <img class="card" :src="language === 'zh-CN' ? cn_card_3 : tw_card_3" />

    <img
      class="order"
      :src="is_cn ? cn_history_order : tw_history_order"
      @click="toOrder()"
    />
    <img
      v-show="showFixedBtn"
      class="btn-fixed huxi-btn"
      :src="language === 'zh-CN' ? cn_lock_btn : tw_lock_btn"
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
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import { Downloader, Parser, Player } from 'svga.lite';
import DatetimePicker from '../../../components/DatetimePicker';
import NongliPicker from '../../../components/NongliPicker';
import PayPopup from '../../../components/PayPopup';
import utils from '../../../libs/utils.js';
import HeaderNotice from '../../../components/headerNotice.vue';
import { getPayOrderInfoAPI, payOrderAPI } from '../../../api/api';
import moment from 'moment';
import { reportEnum } from '../../../libs/enum';
import combinePayPop from '../../../components/combinePayPop.vue';
let show_popup = utils.getQueryString('show_popup');

import cn_lock_btn from '../../../assets/img/mlxz/career_2024/home_btn.png';
import cn_card_1 from '../../../assets/img/mlxz/career_2024/home_img_mokuai2.png';
import cn_card_2 from '../../../assets/img/mlxz/career_2024/home_img_mokuai3.png';
import cn_card_3 from '../../../assets/img/mlxz/career_2024/pignjia.png';

import tw_lock_btn from '../../../assets/img/tw_mlxz/career_24/lock_btn.png';
import tw_card_1 from '../../../assets/img/tw_mlxz/career_24/card_1.png';
import tw_card_2 from '../../../assets/img/tw_mlxz/career_24/card_2.png';
import tw_card_3 from '../../../assets/img/tw_mlxz/career_24/card_3.png';

import cn_header from '../../../assets/img/mlxz/svga/career24/cn_header.svga';
import tw_header from '../../../assets/img/mlxz/svga/career24/tw_header.svga';
import cn_zhanwang from '../../../assets/img/mlxz/svga/career24/cn_zhanwang.svga';
import tw_zhanwang from '../../../assets/img/mlxz/svga/career24/tw_zhanwang.svga';
import cn_history_order from '../../../assets/img/mlxz/career_2024/bgm_lsdd.png';
import tw_history_order from '../../../assets/img/mlxz/downloadBtn/tw/career_order.png';
// 组合测算相关参数
let is_combine = utils.getQueryString('is_combine');
let main_order_id = utils.getQueryString('main_order_id');

export default {
  components: {
    DatetimePicker,
    NongliPicker,
    PayPopup,
    HeaderNotice,
    combinePayPop,
  },
  data() {
    return {
      cn_history_order,
      tw_history_order,
      cn_header,
      tw_header,
      cn_zhanwang,
      tw_zhanwang,
      cn_lock_btn,
      cn_card_1,
      cn_card_2,
      cn_card_3,
      tw_lock_btn,
      tw_card_1,
      tw_card_2,
      tw_card_3,
      svg: 'https://mixmedia.rili.cn/c89f1fd7-acb1-48b8-9130-774512dfec70.svga',
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
      product_id: 4,
      product_key: 'h5_career2024',
      query_user_string: '',

      is_combine,
      has_pay: '',
      is_show_btn: true,
      pay_modal: false,
      product_price: '',
      language: utils.getLanguage(),
    };
  },
  computed: {
    productList() {
      return this.$store.state.common.productList;
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  created() {
    this.$store.dispatch('common/getProduction');

    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: '5ewewi',
      });

    utils.firebaseLogEvent(
      '10004',
      '-10001',
      'page_view_2024career_main',
      'page_view',
      {
        args_name: 'page_view_2024career_main',
        channel: utils.getFBChannel(),
      }
    );
  },
  async mounted() {
    // 赋默认值
    let storaged_userInfo = localStorage.getItem('mlxz_career_2024_info');
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
      if (this.sex !== '1') {
        this.$refs.sex_male.click();
        await utils.asleep(10);
        this.$refs.sex_female.click();
      } else {
        this.$refs.sex_female.click();
        await utils.asleep(10);
        this.$refs.sex_male.click();
      }
    }
    let self = this;

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
    self.loadBg('#bg-svga', self.is_cn ? cn_header : tw_header);
    self.loadBg('#zhanwang', self.is_cn ? cn_zhanwang : tw_zhanwang);
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
     * @description: 选择性别
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
     * @description: 跳转历史订单页
     * @return {*}
     */
    toOrder() {
      utils.jumpToOrder();
    },
    /**
     * @description: 打开时间选择器
     * @return {*}
     */
    openPicker() {
      this.choose_time = true;
    },
    // 关闭时间选择器
    closePicker() {
      this.choose_time = false;
    },
    // 协议页面
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
      window.localStorage.setItem('mlxz_career_2024_info', querystring);
      location.href = url;
    },
    /**
     * @description: 检查用户信息 调整详情页
     * @return {*}
     */
    async check() {
      window.Adjust &&
        window.Adjust.trackEvent({
          eventToken: 'femk1d',
        });

      utils.firebaseLogEvent(
        '10004',
        '-10002',
        'click_2024career_main',
        'click',
        {
          args_name: 'click_2024career_main',
          channel: utils.getFBChannel(),
        }
      );
      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        Toast(this.$t('tips-1'));
        return;
      }
      if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
        Toast(this.$t('tips-2'));
        return;
      }
      if (time_obj == null) {
        Toast(this.$t('tips-3'));
        return;
      }
      if (!this.privacyChecked) {
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
      window.localStorage.setItem('mlxz_career_2024_info', querystring);
      let path = 'detail?querystring=' + querystring;
      this.query_user_string = querystring;

      if (show_popup) {
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
          `${birth_year}${+birth_month < 10 ? '0' + birth_month : birth_month}${
            +birth_date < 10 ? '0' + birth_date : birth_date
          }`
        ).format('YYYYMMDD'),
      };
      return params;
    },
  },
};
</script>

<style scoped lang="less">
#bg-svga {
  position: absolute;
  top: 0;
  width: 7.5rem;
  height: 7.08rem;
}
.pay-box {
  display: flex;
  flex-direction: column;
  width: 7.5rem;
  height: 8.56rem;
  background: #222222;
  font-family: PingFangTC, PingFangTC;
  border-radius: 0.4rem 0.4rem 0 0;
  padding: 0.4rem 0.5rem;
  .title {
    height: 0.36rem;
    font-size: 0.36rem;
    font-weight: 600;
    color: #ffffff;
    line-height: 0.36rem;
    margin-bottom: 0.6rem;
  }
  .price-box {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-end;
    font-weight: 600;
    color: #cc4b44;
    margin-bottom: 0.4rem;
    .unit {
      font-size: 0.32rem;
      height: 0.32rem;
    }
    .price {
      font-size: 0.6rem;
      height: 0.6rem;
    }
  }
}

.card-box {
  width: 7.1rem;
  height: 3.7rem;
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 0.2rem;
  #zhanwang {
    width: 100%;
    height: 100%;
  }
}

.pay-wrapper {
  width: 100%;
  margin-top: -1px;
  box-sizing: border-box;
  .price {
    width: 100%;
    color: #cc4b44;
    font-size: 0.32rem;
    font-weight: bold;
    margin: 0.2rem 0 0.25rem;
    text-align: center;
    span {
      font-size: 0.6rem;
      margin-top: 2px;
    }
  }
  .title {
    color: rgba(91, 65, 13, 0.5);
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    &:last-child {
      margin: 0;
    }
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.48rem;
        height: 0.48rem;
        background-color: #fff;
        margin-right: 0.16rem;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
      .name {
        color: #fff;
        font-size: 0.28rem;
        font-weight: bold;
      }
      .refund {
        color: rgb(255 255 255 / 50%);
        font-size: 0.24rem;
        margin-left: 0.2rem;
      }
    }
    .check {
      width: 0.36rem;
      height: 0.36rem;
    }
  }
  .expand {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.24rem;
    line-height: 1;
    color: #999;
    font-weight: bold;
    img {
      width: 0.2rem;
      margin-left: 0.05rem;
    }
  }
}
.pay-btn {
  width: 6.3rem;
  height: 0.88rem;
  color: #fef8eb;
  font-size: 0.32rem;
  line-height: 0.88rem;
  background: #cc883f;
  border-radius: 0.44rem;
  text-align: center;
  font-weight: bold;
  margin-top: 0.4rem;
  margin-bottom: 0.6rem;
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
.fix-box {
  position: fixed !important;
}
.lang-cn {
  background-image: url('../../../assets/img/mlxz/career_2024/home_img_head.png');
}
.lang-tw {
  background-image: url('../../../assets/img/tw_mlxz/career_24/bg.png');
}
.container {
  width: 7.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: contain;
  background-repeat: no-repeat;
  padding-bottom: 1.6rem;
  padding-top: 6.38rem;
  position: relative;
  .info {
    position: relative;
    margin-bottom: 0.24rem;
    .info-content {
      background: url('../../../assets/img/mlxz/career_2024/home_card_name.png')
        no-repeat;
      background-size: contain;
      width: 7.1rem;
      height: 5.25rem;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      padding-top: 0.4rem;

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
          height: 0.8rem;
          background-color: #f7dbaf;
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
              color: #4b3d3a80;
            }
            &::-webkit-input-placeholder {
              color: #4b3d3a80;
            }
            &::-moz-placeholder {
              color: #4b3d3a80;
            }
            &::-moz-placeholder {
              color: #4b3d3a80;
            }
            &::-ms-input-placeholder {
              color: #4b3d3a80;
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
            color: #4b3d3a;
            border-radius: 0.08rem;
            .sex-icon {
              display: block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
            }
            &.active {
              color: #fff;
              background-color: #ef6e62;
            }
          }
        }
      }
      .info-btn {
        width: 4.98rem;
        height: 1rem;
        margin-top: 0.1rem;
        margin-bottom: 0.2rem;
        // animation: scaleBtn 1s infinite ease-in-out alternate;
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
    width: 7.2rem;
    margin-bottom: 0.2rem;
  }
  .order {
    position: fixed;
    width: 0.58rem;
    top: 3rem;
    right: 0;
  }
  .btn-fixed {
    position: fixed;
    width: 4.98rem;
    height: 1rem;
    bottom: 0.43rem;
    // animation: scaleBtn 1s infinite ease-in-out alternate;
  }
}
</style>
