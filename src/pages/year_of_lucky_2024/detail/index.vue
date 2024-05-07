<template>
  <div :class="{ detail: true, 'hidden-scroll': pay_modal }">
    <div class="pay-box">
      <UserInfo
        :username="username"
        :sex="sex"
        :gongli_nongli="gongli_nongli"
        :picker_date_yangli="picker_date_yangli"
        :picker_date_nongli="picker_date_nongli"
        :gan="gan"
        :zhi="zhi"
        :nayin="nayin"
        :is_result="false"
        :score="[10, 30, 40, 35, 30, 60, 70, 68, 60, 78, 85, 100]"
      />

      <!-- <PayCard
        ref="paycard"
        :type="product_id"
        :product_key="product_key"
        :query_user_string="query_user_string"
        back_url="year_of_lucky_2024"
        lucky_re_id="60009"
        :is_show="true"
      >
      </PayCard> -->
      <div @click="showPayModal" id="info-btn" class="get-report-btn">
        <img class="huxi-btn" :src="is_cn ? cn_pay_btn : tw_pay_btn" alt="" />
      </div>
    </div>
    <img :src="is_cn ? cn_card_1 : tw_card_1" class="card-bg" alt="" />
    <img :src="is_cn ? cn_card_2 : tw_card_2" class="card-bg" alt="" />
    <img :src="is_cn ? cn_card_3 : tw_card_3" class="card-bg" alt="" />
    <img :src="is_cn ? cn_card_4 : tw_card_4" class="card-bg" alt="" />
    <img :src="is_cn ? cn_card_5 : tw_card_5" class="card-bg" alt="" />
    <img :src="is_cn ? cn_card_6 : tw_card_6" class="card-bg" alt="" />
    <img :src="is_cn ? cn_card_7 : tw_card_7" class="card-bg" alt="" />
    <img :src="is_cn ? cn_card_8 : tw_card_8" class="card-bg" alt="" />
    <img :src="is_cn ? cn_card_9 : tw_card_9" class="card-bg" alt="" />

    <div
      v-if="showFixedBtn"
      @click="showPayModal"
      class="get-report-btn fix-box"
    >
      <img class="huxi-btn" :src="is_cn ? cn_pay_btn : tw_pay_btn" alt="" />
    </div>
    <div class="footer"></div>

    <payModal
      :product_key="product_key"
      v-model="pay_modal"
      :bg="modal_bg"
      :query_user_string="query_user_string"
      :title="username_title"
      @close="pay_modal = false"
    />
  </div>
</template>

<script>
import PayCard from '../../../components/PayCard.vue';
import { getBaziAPI } from '../../../api/api';
import utils from '../../../libs/utils';
import UserInfo from './user_info.vue';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import tw_pay_btn from '../../../assets/img/mlxz/year_of_lucky_2024/tw/img_button3.png';
import analyzeModal from './analyze.vue';
import payModal from '../../../components/PayModal.vue';
import { report_id_arr } from '../../../libs/enum';
import title1 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_1.png';
import title2 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_2.png';
import title3 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_3.png';
import title4 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_nian.png';
import title5 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_4.png';
import title6 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_caifu.png';
import title7 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_5.png';
import title8 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_6.png';
import title9 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_7.png';

import cn_card_1 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_1.png';
import cn_card_2 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_2.png';
import cn_card_3 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_3.png';
import cn_card_4 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_4.png';
import cn_card_5 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_5.png';
import cn_card_6 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_6.png';
import cn_card_7 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_7.png';
import cn_card_8 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_8.png';
import cn_card_9 from './../../../assets/img/mlxz/year_of_lucky_2024/detail/img_zhong_9.png';

import tw_card_1 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_1.png';
import tw_card_2 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_2.png';
import tw_card_3 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_3.png';
import tw_card_4 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_4.png';
import tw_card_5 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_5.png';
import tw_card_6 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_6.png';
import tw_card_7 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_7.png';
import tw_card_8 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_8.png';
import tw_card_9 from './../../../assets/img/tw_mlxz/year_24/detail/img_zhong_9.png';
const topic1 = [
  '23年事业是否变动？',
  '财运是否受到影响？',
  '感情生活是否有新的变化？',
];

const topic2 = ['24年你的开运方位在哪里？', '你又能如何提升自身运势呢？'];

const topic3 = ['专属你的太岁破解指南'];
const topic4 = ['2024年是你的？？之年'];

const topic5 = [
  '24年你的事业运势起伏如何？',
  '事业机会在哪里？会有更好的发展吗？',
  '是继续在公司等待升职？',
  '还是挖掘自己的第二职业？',
];

const topic6 = [
  '24年你的财富机缘在哪里？',
  '正财收入是否稳定？',
  '偏财运势又如何？',
  '会不会破财？',
];

const topic7 = [
  '24年感情运势如何？',
  '单身的你，有机会遇到另一半吗？',
  '恋爱中的你，关系会更进一步吗？',
  '已婚的你，婚姻中有没有注意事项？',
];

const topic8 = ['健康的体魄是工作赚钱的根基', '24年要随时关注哪些健康问题'];

const topic9 = [
  '24年运势低谷在几月？',
  '24年运势高光在几月？',
  '又有哪些月份是需要格外注意的？',
];
export default {
  components: {
    PayCard,
    UserInfo,
    analyzeModal,
    payModal,
  },
  data() {
    return {
      cn_pay_btn:
        'https://psychicai-static.psychicai.pro/imgs/2404fd60302100a5446496cdca97c22caf51.png',
      tw_pay_btn,
      product_id: 25,
      product_key: 'h5_annual2024',
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
      gan: ['？', '？', '？', '？'],
      zhi: ['？', '？', '？', '？'],
      nayin: ['？', '？', '？', '？'],
      language: utils.getLanguage(),
      title1,
      title2,
      title3,
      title4,
      title5,
      title6,
      title7,
      title8,
      title9,
      topic1,
      topic2,
      topic3,
      topic4,
      topic5,
      topic6,
      topic7,
      topic8,
      topic9,
      cn_card_1,
      cn_card_2,
      cn_card_3,
      cn_card_4,
      cn_card_5,
      cn_card_6,
      cn_card_7,
      cn_card_8,
      cn_card_9,
      tw_card_1,
      tw_card_2,
      tw_card_3,
      tw_card_4,
      tw_card_5,
      tw_card_6,
      tw_card_7,
      tw_card_8,
      tw_card_9,
      showFixedBtn: false,
      is_show_btn: true,
      pay_modal: false, //支付弹窗
      modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/240444508285d55242dbac9b5ab02272d80a.png',
    };
  },
  computed: {
    username_title() {
      return `${utils.getShortStr(this.username)}的${this.$t('dom-title')}`;
    },
    is_in_app() {
      return utils.isInApp();
    },
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  async created() {
    if (this.is_in_app) {
      utils.payStatusAdjust('page_view_pay', 'hevtih', '');
    } else {
      window.Adjust &&
        window.Adjust.trackEvent({
          eventToken: 'ty18p4',
        });
    }
    utils.firebaseLogEvent('20002', '-10001', 'page_view_pay', 'page_view', {
      args_name: 'page_view_pay',
      report_id: '60009',
      channel: utils.getFBChannel(),
    });

    this.query_user_string = this.$route.query.querystring;
    await this.formateQueryUserInfo(this.query_user_string);
    this.getUserBazi();
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
    /**
     * @description: 获取用户八字
     * @return {*}
     */
    async getUserBazi() {
      let hour_ = this.birth_hour === '-1' ? '12' : this.birth_hour;
      let str_date = `${this.year}-${this.month}-${this.date} ${hour_}:00:00`;
      let ios_date = `${this.year}/${this.month}/${this.date} ${hour_}:00:00`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? str_date : ios_date)
      );
      let lunar = solar.getLunar();
      let lunarMonth = LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      let is_leap = lunarMonth.isLeap();
      let data_ = {
        year: this.year,
        month: this.month,
        day: this.date,
        hour: this.birth_hour,
        minute: '0',
        is_gongli: this.gongli_nongli,
        leap_month: is_leap ? '1' : '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(data_);
      if (status !== 1000) return;
      this.gan = data.gan;
      this.zhi = data.zhi;
      this.nayin = data.nayin;
    },

    /**
     * @description: 格式化用户信息
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
    },

    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    showPayModal() {
      if (this.is_in_app) {
        utils.payStatusAdjust('click_report_choice', 'wp0pby', '');
      } else {
        window.Adjust &&
          window.Adjust.trackEvent({
            eventToken: 'e8qywf',
          });
      }
      utils.firebaseLogEvent(
        '20002',
        '-10002',
        'click_report_choice',
        'click',
        {
          args_name: 'click_report_choice',
          report_id: report_id_arr[this.product_key],
          channel: utils.getFBChannel(),
        }
      );
      this.pay_modal = true;
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  background-color: #ffaa41;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.05rem;
  .pay-box {
    margin-bottom: 0.21rem;
    background: url('../../../assets/img/mlxz/year_of_lucky_2024/pay_img_bg.png')
      no-repeat;
    background-size: 100% 100%;
    width: 7.1rem;
    min-height: 12.72rem;
  }

  .text {
    width: 6.74rem;
    margin-bottom: 0.25rem;
  }

  .module {
    width: 7.02rem;
    margin-bottom: 0.24rem;
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

.get-report-btn {
  width: 100%;
  height: 1.03rem;
  margin: 0.3rem auto 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 5.19rem;
    height: 100%;
    // animation: scaleBtn 1s infinite ease-in-out alternate;
  }
}

.fix-box {
  position: fixed !important;
  bottom: 0;
}

.card-bg {
  width: 7.1rem;
  height: 100%;
  margin-bottom: 0.2rem;
}
.footer {
  width: 7.5rem;
  height: 1.2rem;
}
</style>
