<template>
  <div :class="{ detail: true, 'hidden-scroll': pay_modal || showAnimation}">
    <AnimationPage product_key="h5_emotion2024" :visible="showAnimation"  @update-visible="showAnimation = false"/>
    <img
      class="header-title"
      :src="is_cn ? cn_info_title : tw_info_title"
      alt=""
    />

    <div :class="{ 'pay-box': true, 'cn-bg': is_cn, 'tw-bg': !is_cn }">
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
        text_color="#6D2215"
        minge_color="#EC436B"
        :show_daji="false"
        bg="#fff"
        width="6.5rem"
        table_border="0.02rem solid #EC436B"
        border_color="#EC436B"
        :is_show_taohua="1"
        :change_color="true"
      >
      </BaziTable>
    </div>
    <div :class="['method-box', !is_show_combination ? 'method-height' : null]">
      <img
        id="method-title-img"
        class="method-title-img"
        :src="is_cn ? img_zhifu_jian : img_zhifu_fan"
      />
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
    </div>
    <GejuInfo
      v-if="is_show_combinationSpecial02"
      style="margin-bottom: 0.36rem"
      :product_key="product_key"
      :user_desc="[mingge_desc]"
      :dataList="[gejujiedu]"
    />
    <!-- <div class="card-box">
      <canvas id="qian"></canvas>
    </div> -->
    <img class="module" :src="is_cn ? cn_bg_1 : tw_bg_1" />
    <img class="module" :src="is_cn ? cn_bg_2 : tw_bg_2" />
    <img class="module" :src="is_cn ? cn_bg_3 : tw_bg_3" />
    <NewFooter product_key="h5_emotion2024" />

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
    <img @click="payOrder" class="fix-btn emo-btn" :src="btn_url" />
    <HomeFooter product_key="h5_emotion2024" />
  </div>
</template>

<script>
import { getBaziAPI } from '../../../api/api';
import utils from '../../../libs/utils';
// @ts-ignore
import UserInfo from './user_info.vue';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import cn_pay_btn from '../../../assets/img/emotion/home_btn.webp';

import cn_home_btn1 from '../../../assets/img/emotion_v2/new/cn/btn.webp';
import tw_home_btn1 from '../../../assets/img/emotion_v2/new/tw/btn.webp';
import cn_home_btn from '../../../assets/img/emotion_v2/new/cn/pay.webp';
import tw_home_btn from '../../../assets/img/emotion_v2/new/tw/pay.webp';
import cn_home_xs_btn from '../../../assets/img/emotion_v2/new/cn/pay_xs.webp';
import tw_home_xs_btn from '../../../assets/img/emotion_v2/new/tw/pay_xs.webp';

import PayCard from '../../../components/PayCard.vue';
import cn_card_1 from '../../../assets/img/emotion/home_card1.webp';
import tw_card_1 from '../../../assets/img/tw_mlxz/emotion/home_card1.webp';
import cn_card_2 from '../../../assets/img/emotion/home_card2.webp';
import tw_card_2 from '../../../assets/img/tw_mlxz/emotion/home_card2.webp';
import payModal from '../../../components/PayModal.vue';
import BaziTable from '../../../components/baziTable.vue';
import { Downloader, Parser, Player } from 'svga.lite';
import cn_info_title from '../../../assets/img/emotion_v2/new/cn/detail/zhongjian_img_toutu.webp';
import tw_info_title from '../../../assets/img/emotion_v2/new/tw/detail/zhongjian_img_toutu.webp';
import cn_zhong3 from '../../../assets/img/emotion/new/zhong_3.webp';
import tw_zhong3 from '../../../assets/img/emotion/new/tw/zhong_3.webp';
import cn_zhong4 from '../../../assets/img/emotion/new/zhong_4.webp';
import tw_zhong4 from '../../../assets/img/emotion/new/tw/zhong_4.webp';
import { report_id_arr } from '../../../libs/enum';
import HomeFooter from '../../../components/HomeFooter.vue';
import PayDetail from '../../../components/PayDetail.vue';

import cn_bg_1 from '../../../assets/img/emotion_v2/new/cn/detail/zhongjian_img_1.webp';
import cn_bg_2 from '../../../assets/img/emotion_v2/new/cn/detail/zhongjian_img_2.webp';
import cn_bg_3 from '../../../assets/img/emotion_v2/new/cn/detail/zhongjian_img_3.webp';
import tw_bg_1 from '../../../assets/img/emotion_v2/new/tw/detail/zhongjian_img_1_fanti.webp';
import tw_bg_2 from '../../../assets/img/emotion_v2/new/tw/detail/zhongjian_img_2_fanti.webp';
import tw_bg_3 from '../../../assets/img/emotion_v2/new/tw/detail/zhongjian_img_3_fanti.webp';
import img_zhifu_jian from '../../../assets/img/emotion_v2/new/cn/detail/img_zhifu_jian.webp';
import img_zhifu_fan from '../../../assets/img/emotion_v2/new/tw/detail/img_zhifu_jian.webp';
import NewFooter from '../../../components/NewFooter.vue';
import GejuInfo from '../../../components/GejuInfo.vue';
import AnimationPage from '../../../components/AnimationPage.vue';
export default {
  components: {
    UserInfo,
    PayCard,
    payModal,
    BaziTable,
    HomeFooter,
    PayDetail,
    NewFooter,
    GejuInfo,
    AnimationPage,
  },
  data() {
    return {
      cn_bg_1,
      cn_bg_2,
      cn_bg_3,
      tw_bg_1,
      tw_bg_2,
      tw_bg_3,
      img_zhifu_jian,
      img_zhifu_fan,
      cn_home_btn,
      tw_home_btn,
      cn_home_btn1,
      tw_home_btn1,
      cn_home_xs_btn,
      tw_home_xs_btn,
      cn_zhong3,
      cn_zhong4,
      tw_zhong3,
      tw_zhong4,
      cn_info_title,
      tw_info_title,
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
      gejujiedu: [], //格局信息
      showAnimation: false,//过渡动画标识
    };
  },
  watch: {
    showAnimation(val) {
      if(!val) {
        setTimeout(() => {
          this.$nextTick(() => {
            //排除渠道3
            if (!this.is_show_combinationSpecial02) return;
            // 滚动到指定元素
            const element = document.getElementById('method-title-img');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          });
        }, 0);
      }
    },
  },

  computed: {
    //套餐支付显示逻辑
    is_show_combination() {
      return !['enjoy03', 'panda03', 'enjoy02', 'panda02'].includes(
        utils.getFBChannel()
      );
    },
    is_show_combinationSpecial02() {
      return !['enjoy03', 'panda03'].includes(utils.getFBChannel());
    },

    //限时特惠
    is_show_limitTime() {
      return ['enjoy02', 'panda02'].includes(utils.getFBChannel());
    },
    username_title() {
      return `${utils.getShortStr(this.username)}的2024年${this.$t(
        'report-title'
      )}`;
    },

    channel1() {
      return ['enjoy01', 'panda01'].includes(utils.getFBChannel());
    },
    channel2() {
      return ['enjoy02', 'panda02'].includes(utils.getFBChannel());
    },
    channel3() {
      return ['enjoy03', 'panda03'].includes(utils.getFBChannel());
    },
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    btn_url() {
      if (this.language === 'zh-CN') {
        if (this.channel1) {
          return cn_home_btn;
        } else if (this.channel2) {
          return cn_home_xs_btn;
        } else if (this.channel3) {
          return cn_home_btn1;
        }
      } else {
        if (this.channel1) {
          return tw_home_btn;
        } else if (this.channel2) {
          return tw_home_xs_btn;
        } else if (this.channel3) {
          return tw_home_btn1;
        }
      }
    },
  },
  beforeCreate() {
    this.showAnimation = true;
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
    // self.loadBg('#qian', self.is_cn ? cn_qian : tw_qian);
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
        leap_month: '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(params);
      if (status !== 1000) return;
      this.gan = data.gan;
      this.zhi = data.zhi;
      this.nayin = data.nayin;
      this.gejujiedu = data.gejujiedu;
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

      let nongli_desc = +this.gongli_nongli
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} `
        : `${this.year}年${utils.formateNongliMonth(
            this.month
          )}${utils.formateNongliDate(this.date)}`;
      this.mingge_desc = +this.gongli_nongli
        ? `${(this.username = utils.getShortStr(arr[0], 4))}，${
            this.sex === 0 ? '女' : '男'
          }，${this.year}年${this.month}月${this.date}日生人`
        : `${(this.username = utils.getShortStr(arr[0], 4))}，${
            this.sex === 0 ? '女' : '男'
          }，${nongli_desc}生人`;
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
.header-title {
  width: 7.5rem;
  height: 3rem;
}

.method-box {
  width: 7.1rem;
  // height: 11.06rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* padding-top: 1.14rem; */
  margin-bottom: 0.49rem;
  background: #fffafa;
  border-radius: 0.16rem;

  .method-title-img {
    width: 6.68rem;
    height: 0.93rem;
    margin-top: -0.13rem;
  }
}

.method-height {
  // height: 7.71rem;
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ec436b;

  .pay-box {
    margin-bottom: 0.49rem;
    width: 7.1rem;
    height: 7.09rem;
    padding-top: 1.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -0.9rem;
  }

  .cn-bg {
    background: url(../../../assets/img/emotion_v2/new/cn/detail/img_xinxi_jian.webp)
      no-repeat;
    background-size: 100% 100%;
  }

  .tw-bg {
    background: url(../../../assets/img/emotion_v2/new/tw/detail/img_xinxi_fan.webp)
      no-repeat;
    background-size: 100% 100%;
  }

  .text {
    width: 6.74rem;
    margin-bottom: 0.25rem;
  }

  .module {
    width: 7.02rem;

    margin-bottom: 0.36rem;
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
  background: url('../../../assets/img/emotion/new/result_card2.webp') no-repeat;
  background-size: contain;
  margin-bottom: 0.2rem;

  #qian {
    width: 100%;
    height: 100%;
  }
}

.fix-btn {
  width: 6.26rem;
  height: 1.34rem;
  position: fixed;
  bottom: 0.2rem;
  z-index: 99;
}

.pay-method {
  width: 6.5rem;
  min-height: 5.8rem;
  font-family: system-ui, sans-serif;
  margin-top: -0.11rem;
  // background: #ffffff;
  border-radius: 0.1rem;
}

@keyframes emoBtn {
  0% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1.1);
  }
}

.emo-btn {
  animation: emoBtn 1s infinite ease-in-out alternate;
}

.ab-footer {
  position: fixed;
  background: #000;
  opacity: 0.5;
  width: 100%;
  height: 2.8rem;
  z-index: 1;
  bottom: 0;
}
</style>
