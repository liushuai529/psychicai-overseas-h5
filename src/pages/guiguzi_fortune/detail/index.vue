<template>
  <div :class="{ detail: true, 'hidden-scroll': pay_modal }">
    <FbShareNotice v-if="is_show_fb_notice"/>
    <PayGuideModal v-if="showPayGuideModal" @show_modal="showModal"/> 
    <img
      class="top-banner"
      :src="language === 'zh-CN' ? cn_header : tw_header"
    />
    <div class="pay-box">
      <div class="title-box">
        <img
          class="info-title"
          :src="language === 'zh-CN' ? cn_word : tw_word"
          alt=""
        />
      </div>
      <div class="info-box">
        <div class="row-1 c-mb c-row">
          <div class="c-label">
            <span>您的名字：</span>
            <span class="c-value mr-50">{{ username | filter_name }}</span>
          </div>
          <div class="c-label">
            <span>您的性别：</span>
            <span class="c-value">{{ sex ? '男' : '女' }}</span>
          </div>
        </div>
        <div class="row-2 c-mb c-row">
          <span class="c-label">出生日期：</span>
          <span class="c-value">
            {{ picker_date_yangli }}
          </span>
        </div>
        <div class="row-3 c-mb c-row">
          <span class="h-label c-label">出生日期：</span>
          <span class="c-value">
            {{ picker_date_nongli }}
          </span>
        </div>
        <div class="row-4 c-row">
          <span class="h-label c-label">您的八字：</span>
          <span class="zhu-label">年柱</span>
          <span class="zhu-label">月柱</span>
          <span class="zhu-label">日柱</span>
          <span class="zhu-label">{{ $t('shizhu-label') }}</span>
        </div>
        <div v-if="gan.length > 0" class="row-5 c-mb c-row">
          <span class="c-label">您的八字：</span>
          <span
            v-for="(it, k) in gan"
            :key="'gan' + k"
            :class="`zhu-value  ${styleColor(it)}`"
            >{{ it }}</span
          >
        </div>
        <div v-if="zhi.length > 0" class="row-5 c-mb c-row">
          <span class="h-label c-label">您的八字：</span>
          <span
            v-for="(it, k) in zhi"
            :key="'zhi' + k"
            :class="`zhu-value ${styleColor(it)}`"
            >{{ it }}</span
          >
        </div>
        <img
          id="info-btn"
          @click="showPayModal"
          class="ce-btn huxi-btn"
          :src="language === 'zh-CN' ? cn_pay_btn : tw_pay_btn"
          alt=""
        />
      </div>

      <!-- <PayCard
        ref="paycard"
        :type="product_id"
        :product_key="product_key"
        :query_user_string="query_user_string"
        btn_width="5.9rem"
        back_url="guiguzi_fortune"
        lucky_re_id="60003"
      >
        <div class="price">吉时价 RM68</div>
      </PayCard> -->
    </div>
    <PayItem product_key="h5_bai_gua" @show_modal="showModal"/>
    <img class="card" :src="language === 'zh-CN' ? cn_card_1 : tw_card_1" />
    <img class="card" :src="language === 'zh-CN' ? cn_card_2 : tw_card_2" />
    <div class="footer-box"></div>
    <img
      v-if="showFixedBtn"
      @click="showPayModal"
      class="ce-btn huxi-btn fix-box"
      :src="language === 'zh-CN' ? cn_pay_btn : tw_pay_btn"
      alt=""
    />

    <payModal
      :product_key="product_key"
      v-model="pay_modal"
      :bg="language === 'zh-CN' ? cn_modal_bg : tw_modal_bg"
      :query_user_string="query_user_string"
      :title="username_title"
      title_style="color:#000"
      @close="pay_modal = false"
      e_view_id="10008"
      c_view_id="-10005"
      e_view_name="view_64gua_pay"
      a_view_token="d87aek"
      c_click_id="-10006"
      e_click_name="click_64gua_pay"
      a_click_token="y33o5l"
    />
    <NewFooter v-show="showFixedBtn" product_key="h5_bai_gua"/>
  </div>
</template>

<script>
import PayCard from '../../../components/PayCard.vue';
import Marquee from './../../../components/Marquee.vue';
import utils from '../../../libs/utils';
import { getBaziAPI } from '../../../api/api';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import cn_header from '../../../assets/img/mlxz/guiguzi/img_result_head@2x.webp';
import tw_header from '../../../assets/img/tw_mlxz/guiguzi/detail/img_result_head.webp';
import cn_word from '../../../assets/img/mlxz/guiguzi/result_img_word.webp';
import tw_word from '../../../assets/img/tw_mlxz/guiguzi/detail/result_img_word.webp';

import cn_card_2 from '../../../assets/img/mlxz/guiguzi/home_img_mo2@2x.webp';
import tw_card_2 from '../../../assets/img/tw_mlxz/guiguzi/home_img_mo2.webp';
import tw_model_bg from '../../../assets/img/mlxz/guiguzi/guiguzi_tw.webp';
import payModal from '../../../components/PayModal.vue';
import { report_id_arr } from '../../../libs/enum';
import NewFooter from '../../../components/NewFooter.vue';
import FbShareNotice from '../../../components/FbShareNotice.vue';
import PayItem from '../../../components/PayItem.vue';
import PayGuideModal from '../../../components/PayGuideModal.vue';

export default {
  components: {
    PayCard,
    Marquee,
    payModal,
    NewFooter,
    FbShareNotice,
    PayItem,
    PayGuideModal,
  },
  data() {
    return {
      product_id: 26,
      product_key: 'h5_bai_gua',
      query_user_string: '',

      showBottomBtn: false,
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      gan: ['-', '-', '-', '-'],
      zhi: ['-', '-', '-', '-'],
      language: utils.getLanguage(),
      cn_header,
      tw_header,
      cn_word,
      tw_word,
      cn_card_1:
        'https://psychicai-static.psychicai.pro/imgs/24044c3c7ad56f9f4e08a25d585164be739f.png',
      tw_card_1:
        'https://psychicai-static.psychicai.pro/imgs/24045923298c6eff48f1ac256edf9ed6d17d.png',
      cn_card_2,
      tw_card_2,
      cn_pay_btn:
        'https://psychicai-static.psychicai.pro/imgs/24041942d492b21040a290a0e288bec2a509.png',
      tw_pay_btn:
        'https://psychicai-static.psychicai.pro/imgs/24047dba6d58e4b840d8a3e2403d367ad384.png',
      pay_modal: false, //支付弹窗
      cn_modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/24045a7fea405a0f48ee92a0c267fbe8ed5f.png',
      tw_modal_bg: tw_model_bg,
      showFixedBtn: false,
      is_show_btn: true,
      showPayGuideModal: false,//待支付蒙版  
    };
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
  },

  async created() {
    utils.firebaseLogEvent(
      '10008',
      '-10003',
      'page_view_64gua_mid',
      'page_view',
      {
        args_name: 'page_view_64gua_mid',
        channel: utils.getFBChannel(),
      }
    );

    this.query_user_string = this.$route.query.querystring;
    this.formateQueryUserInfo(this.query_user_string);
    let pay_modal = this.$route.query.pay_modal;
    if (pay_modal) {
      this.pay_modal = true;
    }
  },

  computed: {
    is_show_fb_notice() {
      return utils.isFBContainer() && utils.getFBChannel().indexOf('02')>-1;
    },
    username_title() {
      return `${utils.getShortStr(this.username)}的${this.$t('dom-title')}`;
    },
  },
  watch: {
    showFixedBtn(val) {
      if (val) {
        utils.firebaseLogEvent('10008', '-10019', 'view_64gua_button', 'view', {
          args_name: 'view_64gua_button',
          channel: utils.getFBChannel(),
        });
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    let btn = document.getElementById('info-btn');
    let self = this;
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
  },
  methods: {
    showModal() {
      this.showPayGuideModal = !this.showPayGuideModal;
    },
    /**
     * @description: 获取八字
     * @return {*}
     */
    async getUserBazi() {
      let hour_ = this.birth_hour === '-1' ? '12' : this.birth_hour;
      let str_date = `${this.year}-${this.month}-${this.date} ${hour_}:00:00`;
      let ios_date = `${this.year}/${this.month}/${this.date} ${hour_}:00:00`;
      var solar = Solar.fromDate(
        new Date(utils.isAndroid() ? str_date : ios_date)
      );

      var lunar = solar.getLunar();
      var lunarMonth = LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      let is_leap = lunarMonth.isLeap();
      let data_ = {
        year: this.year,
        month: this.month,
        day: this.date,
        hour: this.birth_hour,
        minute: '0',
        is_gongli: this.gongli_nongli,
        leap_month: '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(data_);
      if (status !== 1000) return;
      this.gan = data.gan;
      this.zhi = data.zhi;
    },
    pay() {
      this.$refs.paycard.pay('60003');
    },
    /**
     * @description: 格式化用户信息 用来展示
     * @param {*} string
     * @return {*}
     */
    async formateQueryUserInfo(string) {
      let arr = string.split('|');
      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.username = arr[0];
      this.sex = +arr[1];
      this.gongli_nongli = +arr[2];
      this.picker_hour = utils.formateNongliHour(arr[6]);
      let android_date = `${this.year}-${this.month}-${this.date}`;
      let ios_date = `${this.year}/${this.month}/${this.date}`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? android_date : ios_date)
      );
      let lunar = solar.getLunar();
      this.picker_date_nongli = +this.gongli_nongli
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${
            this.picker_hour
          }`
        : `${this.year}年${utils.formateNongliMonth(
            this.month
          )}${utils.formateNongliDate(this.date)} ${this.picker_hour}`;
      this.picker_date_yangli = +this.gongli_nongli
        ? `${this.year}-${this.month}-${this.date} ${this.picker_hour}`
        : `${Lunar.fromYmd(+this.year, +this.month, +this.date)
            .getSolar()
            .toString()} ${this.picker_hour}`;
      this.getUserBazi();
    },
    /**
     * @description: 获取八字属性颜色
     * @param {*} val
     * @return {*}
     */
    styleColor(val) {
      return utils.getBaziStyleColor(val);
    },
    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    showPayModal() {
      utils.firebaseLogEvent('10008', '-10004', 'click_64gua_mid', 'click', {
        args_name: 'click_64gua_mid',
        channel: utils.getFBChannel(),
      });
      this.pay_modal = true;
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-banner {
    width: 7.5rem;
    height: 2.58rem;
    margin-top: 0.3rem;
  }
  .card {
    display: block;
    width: 7.2rem;
    margin-bottom: 0.2rem;
  }

  .pay-box {
    width: 7.1rem;
    height: 6.73rem;
    margin: 0.2rem;
    box-sizing: border-box;
    background-image: url('https://psychicai-static.psychicai.pro/imgs/2404ec659610a8b74c3bbc3d11c337a86345.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 0.6rem;
    .title-box {
      width: 100%;
      height: 0.5rem;
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.3rem;
      .info-title {
        width: 3.98rem;
        height: 100%;
      }
    }
    .info-box {
      display: flex;
      flex-direction: column;
      margin: 0 0.09rem;
    }
    .c-row {
      display: flex;
    }
    .c-label {
      font-size: 0.3rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #33333380;
      line-height: 0.42rem;
    }
    .c-mb {
      margin-bottom: 0.2rem;
    }
    .c-value {
      color: #333333 !important;
      font-size: 0.3rem;
      height: 0.42rem;
      font-weight: 600;
    }
  }
  .mr-50 {
    margin-right: 0.5rem;
  }
  .h-label {
    visibility: hidden;
  }
  .zhu-label {
    width: 0.5rem;
    height: 0.24rem;
    font-size: 0.24rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #33333380;
    line-height: 0.24rem;
    text-align: center;
    margin-right: 0.5rem;
    white-space: nowrap;
  }
  .zhu-value {
    width: 0.5rem;
    height: 0.42rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 0.42rem;
    text-align: center;
    margin-right: 0.5rem;
    white-space: nowrap;
  }
  .nian-huo {
    color: #f33f3f;
  }
  .nian-shui {
    color: #0f71d2;
  }
  .nian-mu {
    color: #19be1d;
  }
  .nian-jin {
    color: #fb9400;
  }
  .nian-tu {
    color: #9a7a4b;
  }
  .info-divider {
    width: 5.9rem;
    height: 1px;
    background: #8e877f;
    margin-top: 0.2rem;
  }

  .fixed-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.35rem;
    text-align: center;
    display: flex;
    justify-content: center;
    img {
      width: 5.92rem;
      height: 1.06rem;
    }
  }
}
.ce-btn {
  margin-top: 0.37rem;
  width: 5.92rem;
  height: 1.06rem;
  margin-left: -0.1rem;
}

.fix-box {
  position: fixed !important;
  bottom: 0.2rem;
  z-index: 99;
}
.footer-box {
  width: 100%;
  height: 2.5rem;
}
</style>
