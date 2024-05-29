<template>
  <div :class="{ detail: true, 'hidden-scroll': pay_modal }">
    <div :class="{ 'pay-box': true, 'cn-bg': is_cn, 'tw-bg': !is_cn }">
      <!-- <img class="title" :src="is_cn ? cn_info_title : tw_info_title" alt="" /> -->
      <BaziTable
        :sex="sex"
        :is_result="is_result"
        :username="username"
        :gongli_nongli="gongli_nongli"
        :picker_date_yangli="picker_date_yangli"
        :picker_date_nongli="picker_date_nongli"
        :gan="gan"
        :zhi="zhi"
        :nayin="nayin"
        :cai_bo_num="cai_bo_num"
        :gui_ren_num="gui_ren_num"
        :hun_yin_num="hun_yin_num"
        :ming_ge="ming_ge"
        :riyuanqiangruo="riyuanqiangruo"
        :shi_ye_num="shi_ye_num"
        :wuxingqiang="wuxingqiang"
        :tao_hua_num="0"
        fuqigong=""
        text_color="#000"
        minge_color="#ED1A86"
        :show_daji="false"
        bg="#fff"
        width="6.14rem"
        table_border="0.02rem solid #FD1E96"
        border_color="#FD1E96"
        :is_show_taohua="1"
      ></BaziTable>
      <PayDetail
        className="pay-method"
        ref="payDetail"
        :product_key="product_key"
        :bg="language === 'zh-CN' ? cn_modal_bg : tw_modal_bg"
        :query_user_string="query_user_string"
        e_view_id="10006"
        c_view_id="-10005"
        e_view_name="view_2024lovely_pay"
        a_view_token="184kba"
        c_click_id="-10006"
        e_click_name="click_2024lovely_pay"
        a_click_token="2rov44"
      />
      <!-- <img
        id="info-btn"
        @click="showPayModal"
        class="ce-btn huxi-btn"
        :src="language === 'zh-CN' ? cn_pay_btn : tw_pay_btn"
        alt=""
      /> -->
      <!-- <PayCard
        ref="paycard"
        :type="product_id"
        :product_key="product_key"
        :query_user_string="query_user_string"
        btn_width="5.9rem"
        back_url="emotion_fortune"
        lucky_re_id="600010"
      >
        <div class="price">吉时价 RM68</div>
      </PayCard> -->
    </div>
    <div class="card-box">
      <canvas id="qian"></canvas>
    </div>
    <img class="module" :src="is_cn ? cn_zhong3 : tw_zhong3" />
    <img class="module" :src="is_cn ? cn_zhong4 : tw_zhong4" />
    <div class="footer"></div>
    <!-- <img
      v-if="showFixedBtn"
      @click="showPayModal"
      class="ce-btn huxi-btn fix-box"
      :src="language === 'zh-CN' ? cn_pay_btn : tw_pay_btn"
      alt=""
    /> -->
    <!-- <payModal
      :product_key="product_key"
      v-model="pay_modal"
      :bg="language === 'zh-CN' ? cn_modal_bg : tw_modal_bg"
      :query_user_string="query_user_string"
      :title="username_title"
      title_style="color:#fff"
      @close="pay_modal = false"
      e_view_id="10006"
      c_view_id="-10005"
      e_view_name="view_2024lovely_pay"
      a_view_token="184kba"
      c_click_id="-10006"
      e_click_name="click_2024lovely_pay"
      a_click_token="2rov44"
    /> -->
    <img
      @click="payOrder"
      class="fix-btn huxi-btn"
      :src="language === 'zh-CN' ? cn_home_btn : tw_home_btn"
    />
    <HomeFooter product_key="h5_emotion2024" />
  </div>
</template>

<script>
import { getBaziAPI } from '../../../api/api';
import utils from '../../../libs/utils';
// @ts-ignore
import UserInfo from './user_info.vue';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import cn_pay_btn from '../../../assets/img/emotion/home_btn.png';
import PayCard from '../../../components/PayCard.vue';
import cn_card_1 from '../../../assets/img/emotion/home_card1.png';
import tw_card_1 from '../../../assets/img/tw_mlxz/emotion/home_card1.png';
import cn_card_2 from '../../../assets/img/emotion/home_card2.png';
import tw_card_2 from '../../../assets/img/tw_mlxz/emotion/home_card2.png';
import payModal from '../../../components/PayModal.vue';
import BaziTable from '../../../components/baziTable.vue';
import { Downloader, Parser, Player } from 'svga.lite';
import cn_qian from '../../../assets/img/mlxz/svga/emotion24/cn_qian.svga';
import tw_qian from '../../../assets/img/mlxz/svga/emotion24/tw_qian.svga';
import cn_info_title from '../../../assets/img/emotion/new/pay_title1.png';
import tw_info_title from '../../../assets/img/emotion/new/tw/info_title.png';
import cn_zhong3 from '../../../assets/img/emotion/new/zhong_3.png';
import tw_zhong3 from '../../../assets/img/emotion/new/tw/zhong_3.png';
import cn_zhong4 from '../../../assets/img/emotion/new/zhong_4.png';
import tw_zhong4 from '../../../assets/img/emotion/new/tw/zhong_4.png';
import { report_id_arr } from '../../../libs/enum';
import cn_home_btn from '../../../assets/img/emotion_v2/cn/home_btn.png';
import tw_home_btn from '../../../assets/img/emotion_v2/tw/home_btn.png';
import HomeFooter from '../../../components/HomeFooter.vue';
import PayDetail from '../../../components/PayDetail.vue';
export default {
  components: {
    UserInfo,
    PayCard,
    payModal,
    BaziTable,
    HomeFooter,
    PayDetail,
  },
  data() {
    return {
      cn_home_btn,
      tw_home_btn,
      cn_zhong3,
      cn_zhong4,
      tw_zhong3,
      tw_zhong4,
      cn_info_title,
      tw_info_title,
      cn_qian,
      tw_qian,
      product_id: 25,
      product_key: 'h5_emotion2024',
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
      cn_card_1,
      tw_card_1,
      cn_card_2,
      tw_card_2,
      cn_pay_btn,
      tw_pay_btn:
        'https://psychicai-static.psychicai.pro/imgs/24042269434e28dd4083b3f1f63ad52b09bf.png',
      pay_modal: false, //支付弹窗
      cn_modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/240417650ffa5df14b56ab7b1be09971e885.png',
      tw_modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/240413f79ffd1c864e35a747295e1eb15e4f.png',

      nayin: ['？', '？', '？', '？'],
      cai_bo_num: 0,
      gui_ren_num: 0,
      hun_yin_num: 0,
      ming_ge: '',
      riyuanqiangruo: '',
      shi_ye_num: 0,
      wuxingqiang: '',
      is_result: false,
      showFixedBtn: false,
      is_show_btn: true,
    };
  },
  computed: {
    username_title() {
      return `${utils.getShortStr(this.username)}的2024年${this.$t(
        'report-title'
      )}`;
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  async created() {
    utils.firebaseLogEvent(
      '10006',
      '-10003',
      'page_view_2024lovely_mid',
      'page_view',
      {
        args_name: 'page_view_2024lovely_mid',
        channel: utils.getFBChannel(),
      }
    );
    this.query_user_string = this.$route.query.querystring;

    await this.formateQueryUserInfo(this.query_user_string);
    this.getUserBazi();
  },

  mounted() {
    window.scrollTo(0, 0);
    let self = this;
    let initialWindowHeight = window.innerHeight;
    // 添加resize事件监听器
    window.addEventListener('resize', function () {
      self.is_show_btn =
        initialWindowHeight > window.innerHeight ? false : true;
    });
    self.loadBg('#qian', self.is_cn ? cn_qian : tw_qian);
    this.$nextTick(() => {
      let dom = document.querySelector('.fix-btn');
      if (dom) {
        utils.firebaseLogEvent(
          '10006',
          '-10019',
          'view_2024lovely_button',
          'view',
          {
            args_name: 'view_2024lovely_button',
            channel: utils.getFBChannel(),
          }
        );
      }
    });
  },
  methods: {
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
      let params = {
        year: this.year,
        month: this.month,
        day: this.date,
        hour: this.birth_hour,
        minute: '0',
        is_gongli: this.gongli_nongli,
        leap_month: is_leap ? '1' : '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(params);
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

    // 支付弹窗
    showPayModal() {
      utils.firebaseLogEvent(
        '10006',
        '-10004',
        'click_2024lovely_mid',
        'click',
        {
          args_name: 'click_2024lovely_mid',
          channel: utils.getFBChannel(),
        }
      );

      this.pay_modal = true;
    },
    payOrder() {
      this.$refs.payDetail.payMoney();
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.43rem;
  background-color: #ffdaf5;
  .pay-box {
    margin-bottom: 0.21rem;
    width: 7.06rem;
    height: 13.58rem;
    padding-top: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cn-bg {
    background: url(../../../assets/img/emotion_v2/cn/result_name_bg.png)
      no-repeat;
    background-size: 100% 100%;
  }
  .tw-bg {
    background: url(../../../assets/img/emotion_v2/tw/result_name_bg.png)
      no-repeat;
    background-size: 100% 100%;
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
.ce-btn {
  width: 5.8rem;
  height: 1.24rem;
}
.fix-box {
  position: fixed !important;
  bottom: 0;
}

.footer {
  width: 100%;
  height: 3rem;
}

.card-box {
  width: 7.06rem;
  height: 4.68rem;
  background: url('../../../assets/img/emotion/new/result_card2.png') no-repeat;
  background-size: contain;
  margin-bottom: 0.2rem;
  #qian {
    width: 100%;
    height: 100%;
  }
}
.fix-btn {
  width: 5.8rem;
  height: 1.24rem;
  position: fixed;
  bottom: 1.2rem;
  z-index: 2;
}

.pay-method {
  width: 6.14rem;
  min-height: 5.8rem;
  font-family: system-ui, sans-serif;
  margin-top: -0.11rem;
  background: #ffffff;
  border-radius: 0.1rem;
}
</style>
