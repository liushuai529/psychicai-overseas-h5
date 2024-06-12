<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-30 18:47:46
 * @Description: 八字合婚
-->

<template>
  <div :class="{ detail: true, 'hidden-scroll': pay_modal }">
    <img
      class="top-banner"
      src="../../../assets/img/mlxz/bzhh/detail/img_head.png"
    />
    
    <div class="pay-box" >
      <img
        class="banner"
        :src="language === 'zh-CN' ? cn_img_title : tw_img_title"
      />
      <div class="user-info">
        <div class="male-info">
          <div class="info-name">{{ mname | nameFilter }}</div>
          <div class="info-birth">{{ mbirth }}</div>
          <baziInfo :key="0" :user_info="male_user_string" @get_user_info="getUserInfo"/>
        </div>
        <img
          class="heart"
          src="../../../assets/img/marriage_measure_overseas/detail/heart.png"
        />
        <div class="female-info">
          <div class="info-name">{{ fname | nameFilter }}</div>
          <div class="info-birth">{{ fbirth }}</div>
          <baziInfo :key="1" :user_info="female_user_string" @get_user_info="getUserInfo"/>
        </div>
      </div>
   
      <div class="bazi-box">
        <!-- <PayCard
          ref="paycard"
          :type="product_id"
          :product_key="product_key"
          back_url="marriage_measure_overseas"
          :query_user_string="query_user_string"
          lucky_re_id="60005"
          ><div class="price">结缘价 RM68</div></PayCard
        > -->
        <!-- <shengxiao
          :male_str="male_user_string"
          :female_str="female_user_string"
          :is_result="false"
        /> -->
        <!-- <div id="info-btn" @click="showPayModal" class="pay-btn">
          {{ $t('tips-1') }}
        </div> -->
      </div>
    </div>
    <img
      id="title-pay"
      class="title-pay"
      src="../../../assets/img/bzhh_v2/img_title.png"
      alt=""
    />
    <PayDetail
      className="method-box"
      ref="payDetail"
      :product_key="product_key"
      :query_user_string="query_user_string"
      e_view_id="10007"
      c_view_id="-10005"
      e_view_name="view_marriage_pay"
      a_view_token="g790s3"
      c_click_id="-10006"
      e_click_name="click_marriage_pay"
      a_click_token="2ijw47"
    />
    <Marquee
      :mock_users="getRandomList()"
      product_key="h5_marriage"
      class="user"
    />

    <GejuInfo v-if="is_show_combination"  style="margin-bottom: 0.22rem;" :product_key="product_key" :user_desc="mingge_desc" :dataList="[mingge_minfo, mingge_finfo]"/>

    <img class="text" :src="language === 'zh-CN' ? cn_img_word : tw_img_word" />
    <img class="module" :src="language === 'zh-CN' ? cn_mokuai1 : tw_mokuai1" />
    <img class="module" :src="language === 'zh-CN' ? cn_mokuai2 : tw_mokuai2" />
    <img class="module" :src="language === 'zh-CN' ? cn_mokuai3 : tw_mokuai3" />
    <img class="module" :src="language === 'zh-CN' ? cn_mokuai4 : tw_mokuai4" />
    <img class="module" :src="language === 'zh-CN' ? cn_mokuai5 : tw_mokuai5" />
    <img class="module" :src="language === 'zh-CN' ? cn_mokuai6 : tw_mokuai6" />
    <img
      class="module"
      style="margin-bottom: 2.7rem"
      :src="language === 'zh-CN' ? cn_mokuai7 : tw_mokuai7"
    />
    <!-- <div v-if="showFixedBtn" @click="showPayModal" class="pay-btn fix-box">
      {{ $t('tips-1') }}
    </div> -->
    <payModal
      :product_key="product_key"
      v-model="pay_modal"
      :bg="is_cn ? cn_modal_bg : tw_modal_bg"
      :query_user_string="query_user_string"
      title="八字合婚"
      title_style="color:#fff"
      @close="pay_modal = false"
      e_view_id="10007"
      c_view_id="-10005"
      e_view_name="view_marriage_pay"
      a_view_token="g790s3"
      c_click_id="-10006"
      e_click_name="click_marriage_pay"
      a_click_token="2ijw47"
    />
    <img
      @click="showPayModal"
      class="btn-fixed"
      :src="language === 'zh-CN' ? cn_btn : tw_btn"
    />
    <NewFooter />
    <!-- <div class="footer-box"></div> -->
  </div>
</template>

<script>
import PayCard from '../../../components/PayCard.vue';
import Marquee from './../../../components/Marquee.vue';
import utils from './../../../libs/utils.js';
import hour_ganzi from './../../../libs/suishen.huangli.js';
import year_ganzi from './../../../libs/suishen.wnl.js';

import cn_img_title from '../../../assets/img/bzhh_v2/cn/img_title.png';
import tw_img_title from '../../../assets/img/bzhh_v2/tw/img_title.png';
import tw_img_word from '../../../assets/img/tw_mlxz/bazihehun/detail/text.png';
import cn_img_word from '../../../assets/img/mlxz/bzhh/detail/img_word.png';

import cn_mokuai1 from '../../../assets/img/mlxz/bzhh/detail/1.png';
import cn_mokuai2 from '../../../assets/img/mlxz/bzhh/detail/2.png';
import cn_mokuai3 from '../../../assets/img/mlxz/bzhh/detail/3.png';
import cn_mokuai4 from '../../../assets/img/mlxz/bzhh/detail/4.png';
import cn_mokuai5 from '../../../assets/img/mlxz/bzhh/detail/5.png';
import cn_mokuai6 from '../../../assets/img/mlxz/bzhh/detail/6.png';
import cn_mokuai7 from '../../../assets/img/mlxz/bzhh/detail/7.png';
import cn_mokuai8 from '../../../assets/img/mlxz/bzhh/detail/8.png';

import tw_mokuai1 from '../../../assets/img/tw_mlxz/bazihehun/detail/1.png';
import tw_mokuai2 from '../../../assets/img/tw_mlxz/bazihehun/detail/2.png';
import tw_mokuai3 from '../../../assets/img/tw_mlxz/bazihehun/detail/3.png';
import tw_mokuai4 from '../../../assets/img/tw_mlxz/bazihehun/detail/4.png';
import tw_mokuai5 from '../../../assets/img/tw_mlxz/bazihehun/detail/5.png';
import tw_mokuai6 from '../../../assets/img/tw_mlxz/bazihehun/detail/6.png';
import tw_mokuai7 from '../../../assets/img/tw_mlxz/bazihehun/detail/7.png';
import tw_mokuai8 from '../../../assets/img/tw_mlxz/bazihehun/detail/8.png';

import tw_modal_bg from '../../../assets/img/tw_mlxz/bazihehun/detail/modal_bg.png';
import payModal from '../../../components/PayModal.vue';
import shengxiao from './shengxiao.vue';
import baziInfo from './bazi.vue';
import tw_btn from './../../../assets/img//bzhh_v2/tw/img_btn.png';
import cn_btn from './../../../assets/img/bzhh_v2/cn/img_btn.png';
import { report_id_arr } from '../../../libs/enum';
import HomeFooter from '../../../components/HomeFooter.vue';
import PayDetail from '../../../components/PayDetail.vue';
import NewFooter from '../../../components/NewFooter.vue';
import GejuInfo from '../../../components/GejuInfo.vue';

const mockTipsArr = {
  'zh-CN': '成功解锁了八字合婚的详细解析',
  'zh-TW': '成功解鎖了八字合婚的詳細解析',
};
const tips1 = {
  'zh-CN': '成功解锁了',
  'zh-TW': '成功解鎖了',
};
const tips2 = {
  'zh-CN': '的详细解析',
  'zh-TW': '的詳細解析',
};
export default {
  components: {
    PayCard,
    Marquee,
    baziInfo,
    payModal,
    shengxiao,
    HomeFooter,
    PayDetail,
    NewFooter,
    GejuInfo,
  },
  data() {
    return {
      cn_btn,
      tw_btn,
      product_id: 23,
      product_key: 'h5_marriage',
      query_user_string: '',
      tips1,
      tips2,
      mname: '',
      mbirth: '',
      fname: '',
      fbirth: '',
      language: utils.getLanguage(),
      cn_img_title,
      tw_img_title,
      cn_img_word,
      tw_img_word,
      cn_mokuai1,
      cn_mokuai2,
      cn_mokuai3,
      cn_mokuai4,
      cn_mokuai5,
      cn_mokuai6,
      cn_mokuai7,
      tw_mokuai1,
      tw_mokuai2,
      tw_mokuai3,
      tw_mokuai4,
      tw_mokuai5,
      tw_mokuai6,
      tw_mokuai7,
      showFixedBtn: false,
      // baziInfo
      male_user_string: this.$route.query.male_str,
      female_user_string: this.$route.query.female_str,
      is_show_btn: true,
      pay_modal: false,
      tw_modal_bg,
      cn_modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/240439e6ef4d89894c5d88378c3cbd7790fb.png',
      mingge_desc:[],//命格生日信息展示  
      mingge_minfo:[],//命格男性信息
      mingge_finfo:[],//命格女性信息
    };
  },
  filters: {
    nameFilter(val) {
      return utils.getShortStr(val, 4);
    },
  },

  created() {
    utils.firebaseLogEvent(
      '10007',
      '-10003',
      'page_view_marriage_mid',
      'page_view',
      {
        args_name: 'page_view_marriage_mid',
        channel: utils.getFBChannel(),
      }
    );
    this.query_user_string = this.$route.query.querystring;

    this.parseUserString();
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    //套餐支付显示逻辑
    is_show_combination() {
      return !["enjoy03", "panda03"].includes(utils.getFBChannel());
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$nextTick(() => {
      //排除渠道3
      if(!this.is_show_combination) return
      // 滚动到指定元素
      const element = document.getElementById('title-pay');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });

    let btn = document.getElementById('info-btn');
    let self = this;

    let initialWindowHeight = window.innerHeight;
    // 添加resize事件监听器
    window.addEventListener('resize', function () {
      self.is_show_btn =
        initialWindowHeight > window.innerHeight ? false : true;
    });
    this.$nextTick(() => {
      let dom = document.querySelector('.btn-fixed');
      if (dom) {
        utils.firebaseLogEvent(
          '10007',
          '-10019',
          'view_ marriage_button',
          'view',
          {
            args_name: 'view_ marriage_button',
            channel: utils.getFBChannel(),
          }
        );
      }
    });
  },
  methods: {
   
    getUserInfo(sex, info) {
      if(sex === 0) {
        this.mingge_finfo = info;
      } else {
        this.mingge_minfo = info;
      }
      
    },

    /**
     * @description: 获取随机用户列表
     * @return {*}
     */
    getRandomList() {
      let arr = ['我的', 'vt1', '椒', '14', '96', '小', 'il', '2o', '22'];
      let new_arr = [];
      for (let i = 0; i < 200; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        new_arr.push({
          desc1: arr[randomIndex] + '***',
          desc2: tips1[this.language],
          desc3: tips2[this.language],
        });
      }

      return new_arr;
    },

    /**
     * @description: 用户生辰解析
     * @return {*}
     */
    parseUserString() {
      let query_user_string_array = this.query_user_string.split('|');
      let myear = query_user_string_array[2];
      let mmonth = query_user_string_array[3];
      let mdate = query_user_string_array[4];
      this.mname = query_user_string_array[0];
      let fyear = query_user_string_array[5];
      let fmonth = query_user_string_array[6];
      let fdate = query_user_string_array[7];
      this.fname = query_user_string_array[1];
      // 男性生日農曆
      if (query_user_string_array[10] === '0') {
        let mday = this.getGlDate(myear, mmonth, mdate);
        this.mbirth = `${this.$t('nongli-label')} ${myear}年${mday.nmonthstr}${
          mday.ndatestr
        }`;
        this.mingge_desc.push(`${utils.getShortStr(this.mname, 4)}，男，${myear}年${mday.nmonthstr}${mday.ndatestr}生人，`)
      } else {
        this.mbirth = `${this.$t(
          'gongli-label'
        )} ${myear}年${mmonth}月${mdate}日`;
        this.mingge_desc.push(`${utils.getShortStr(this.mname, 4)}，男，${myear}年${mmonth}月${mdate}日生人，`)
      }
      // 女性生日農曆
      if (query_user_string_array[11] === '0') {
        let fday = this.getGlDate(fyear, fmonth, fdate);
        this.fbirth = `${this.$t('nongli-label')} ${fyear}年${fday.nmonthstr}${
          fday.ndatestr
        }`;
        this.mingge_desc.push(`${utils.getShortStr(this.fname, 4)}，女，${fyear}年${fday.nmonthstr}${fday.ndatestr}生人`)
      } else {
        this.fbirth = `${this.$t(
          'gongli-label'
        )} ${fyear}年${fmonth}月${fdate}日`;
        this.mingge_desc.push(`${utils.getShortStr(this.fname, 4)}，女，${fyear}年${fmonth}月${fdate}日生人`)
      }
    },

    /**
     * @description: 获取公历日期
     * @param {*} year
     * @param {*} month
     * @param {*} date
     * @return {*}
     */
    getGlDate(year, month, date) {
      let twoYearAllDate = [];
      for (let i = 0; i < 12; i++) {
        twoYearAllDate = twoYearAllDate.concat(
          year_ganzi.getOneMonthData(year, i + 1)
        );
      }
      for (let i = 0; i < 12; i++) {
        twoYearAllDate = twoYearAllDate.concat(
          year_ganzi.getOneMonthData(year / 1 + 1, i + 1)
        );
      }

      twoYearAllDate.concat(year_ganzi.getOneMonthData(year + 1, 1));
      twoYearAllDate.concat(year_ganzi.getOneMonthData(year + 1, 2));

      let gldate = twoYearAllDate.find(item => {
        return item.nyear == year && item.nmonth == month && item.ndate == date;
      });
      if (this.language === 'zh-TW' && gldate.nmonth === 12) {
        gldate.nmonthstr = '臘月';
      }
      return gldate;
    },

    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    showPayModal() {
      this.$refs.payDetail.payMoney();
      return;
      utils.firebaseLogEvent('10007', '-10004', 'click_marriage_mid', 'click', {
        args_name: 'click_marriage_mid',
        channel: utils.getFBChannel(),
      });
      this.pay_modal = true;
    },
    jumpHome() {
      location.href = location.origin + location.pathname;
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  background-color: #7F1416;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-banner {
    width: 100%;
    margin-bottom: 0.24rem;
  }
  
  .pay-box {
    position: relative;
    margin-top: -1.6rem;
    // width: 7.02rem;
    // border: 0.06rem solid #d19a47;
    // border-radius: 0.16rem;
    // background-color: #fbf8ed;
    width: 7.3rem;
    height: 4.2rem;
    background: #FFEDD8;
    border-radius: 0.2rem;
    border: 0.09rem solid #B70E08;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    
    .banner {
      position: absolute;
      top: -0.45rem;
      left: 0;
      margin-left: -0.15rem;
      width: 7.5rem;
      height: 1.32rem;
    }
    .user-info {
      // width: 100%;
      // display: flex;
      // align-items: flex-start;
      // justify-content: center;
      // margin: 0.68rem 0 0.49rem;
      // padding: 0 0.28rem;
          /* width: 100%; */
      margin-top: 1rem;
      height: 2.76rem;
      width: 6.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.28rem;
      border: 0.03rem solid #B87F40;
      background: #FFEDD8;
      .heart {
        width: 1.4rem;
        flex: none;
      }
      .male-info,
      .female-info {
        color: #6f3300;
        text-align: center;
        width: 2.25rem;
        .info-name {
          font-size: 0.32rem;
          line-height: 0.45rem;
          font-weight: bold;
          margin-bottom: 0.07rem;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .info-birth {
          font-size: 0.24rem;
          line-height: 0.33rem;
        }
        flex: 1;
      }
    }
    .line {
      width: 5.57rem;
    }
  }

  .text {
    width: 6.74rem;
    margin-bottom: 0.25rem;
  }

  .module {
    width: 7.02rem;
    margin-bottom: 0.24rem;
  }
}
.pay-btn {
  width: 6.3rem;
  height: 0.88rem;
  background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
  border-radius: 0.24rem;
  border: 0.02rem solid #ffd192;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.32rem;
  color: #fef8eb;
  margin: 0 auto;
  margin-top: 0.16rem;
  animation: btnMove 1s infinite ease-in-out alternate;
}
.fix-box {
  position: fixed !important;
  bottom: 0.1rem;
}

.bazi-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-fixed {
  position: fixed;
  width: 6.89rem;
  left: 50%;
  margin-left: -3.46rem;
  bottom: 1.4rem;
  z-index: 99;
  animation: btnMove 1s infinite ease-in-out alternate;
}

.footer-box {
  width: 7.5rem;
  height: 3rem;
  // background: url('../../../assets/img/bzhh_v2/bazihehun_img_btnmengban.png')
  //   no-repeat;
  // background-size: contain;
  // position: fixed;
  // bottom: 0;
  z-index: 3;
}

.method-box {
  width: 7.3rem;
  min-height: 6rem;
  font-family: system-ui, sans-serif;
  border-radius: 0.16rem;
  border: 0.09rem solid #B70E08;
  padding: 0.4rem 0.16rem 0;
  margin-top: -0.45rem;
  background: #FFEDD8;
}
.title-pay {
  width: 7.5rem;
  height: 1.32rem;
  margin: 0.29rem auto 0;
  position: relative;
  z-index: 2;
}
.user {
  width: 7.02rem;
  height: 0.72rem;
  // background: #fbf8ed;
  border-radius: 0.16rem;
  // border: 0.06rem solid #d19a47;
  margin: 0.28rem auto 0.44rem;
  font-weight: 400;
  font-size: 0.24rem;
  color: #F2CFCF;
  display: flex;
  align-items: center;
  justify-content: center;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 0.7rem !important;
    padding-bottom: 0.4rem;
  }
  .laba {
    width: 0.28rem;
    height: 0.24rem;
    margin-right: 0.08rem;
  }
  .light-red {
    color: #FFDA27;
  }
}
</style>
