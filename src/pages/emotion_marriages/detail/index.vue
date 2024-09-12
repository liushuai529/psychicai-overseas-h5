<template>
  <div
    :class="{ detail: true, 'hidden-scroll': show_discount_modal }">
    <FbShareNotice v-if="is_show_fb_notice && !localStorage.getItem('mlxz_outer_animation')" />

    <PayGuideModal v-if="showPayGuideModal" @show_modal="showModal" />
    <img class="header-title" :src="is_cn ? cn_info_title : tw_info_title" alt="" />
    <img class="order-icon" @click="toOrder" :src="is_cn ? cn_history_order : tw_history_order" alt="" />
    


    <div style="width: 6.98rem; margin-top: -6rem; margin-bottom: 0.24rem;">
      <MessageCard  :date="query_user_string.split('|')[2] ==1 ? picker_date_yangli: picker_date_nongli" :username="username" @scrollClick="scrollClick"/>
    </div>

    <MarriagesPayItem product_key="consult_time" sub_type="life_marriages"  @show_modal="showModal" :show_pay_guide_modal="showPayGuideModal" />
    <div :class="['method-box', !is_show_combination ? 'method-height' : null]">
      <img v-if="product_key !== 'consult_time'" id="method-title-img" class="method-title-img"
        :src="is_cn ? img_zhifu_jian : img_zhifu_fan" />

      <div v-else style="display: flex; flex-direction: column;">
        <div id="method-title-img" class="method-title-img-consult">
          <img :src="is_cn ? cn_paypage_tittle_pay : tw_paypage_tittle_pay" />
        </div>
        <UserInfo style="margin-top: 0.24rem;" :picker_date_nongli="picker_date_nongli" :picker_date_yangli="picker_date_yangli" :username="username"
          :sex="sex" />
      </div>


      <MarriagesPayDetail className="pay-method" ref="payDetail" :product_key="product_key"
        :bg="language === 'zh-CN' ? cn_modal_bg : tw_modal_bg" :query_user_string="query_user_string" e_view_id="10012"
        c_click_id="-10007" e_click_name="click_marriages_pay" :consult_time="consult_time" />
      <div class="img-consult-bottom">

      </div>
    </div>

    <!-- <div class="method-title-img-consult">
      <img :src="is_cn ? cn_paypage_tittle_xiangqing : tw_paypage_tittle_xiangqing" />
    </div> -->

    <div class="tag-bg">
      <img class="module"  :src="is_cn ? cn_bg_1 : tw_bg_1" @click="scrollClick" />
    </div>
    <!-- <div class="img-consult-bottom"></div> -->




    <NewFooter type="emotion_marriages" product_key="consult_time" />

    <div class="footer"></div>

    <img @click="payOrder" class="fix-btn emo-btn" :src="btn_url" />

  </div>
</template>

<script>
import { getBaziAPI } from '../../../api/api';
import utils from '../../../libs/utils';
// @ts-ignore
import UserInfo from './user_info.vue';
import MessageCard from './message_card.vue';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import cn_pay_btn from '../../../assets/img/emotion/home_btn.webp';


import cn_home_btn from '../../../assets/img/emotion_marriages/cn/img_home_btu_zixun_cn.webp';
import tw_home_btn from '../../../assets/img/emotion_marriages/tw/img_home_btu_zixun_tw.webp';
import cn_history_order from '../../../assets/img/emotion_fate/cn/home_lsdd_cn.webp';
import tw_history_order from '../../../assets/img/emotion_fate/tw/home_lsdd_tw.webp';


import PayCard from '../../../components/PayCard.vue';
import cn_card_1 from '../../../assets/img/emotion/home_card1.webp';
import tw_card_1 from '../../../assets/img/tw_mlxz/emotion/home_card1.webp';
import cn_card_2 from '../../../assets/img/emotion/home_card2.webp';
import tw_card_2 from '../../../assets/img/tw_mlxz/emotion/home_card2.webp';
import payModal from '../../../components/PayModal.vue';
import BaziTable from '../../../components/baziTable.vue';
import { Downloader, Parser, Player } from 'svga.lite';
import cn_info_title from '../../../assets/img/emotion_marriages/cn/img_bj_paypage_cn.webp';
import tw_info_title from '../../../assets/img/emotion_marriages/tw/img_bj_paypage_tw.webp';
import cn_zhong3 from '../../../assets/img/emotion/new/zhong_3.webp';
import tw_zhong3 from '../../../assets/img/emotion/new/tw/zhong_3.webp';
import cn_zhong4 from '../../../assets/img/emotion/new/zhong_4.webp';
import tw_zhong4 from '../../../assets/img/emotion/new/tw/zhong_4.webp';
import { report_id_arr } from '../../../libs/enum';
import HomeFooter from '../../../components/HomeFooter.vue';
import MarriagesPayDetail from '../../../components/MarriagesPayDetail.vue';

import cn_bg_1 from '../../../assets/img/emotion_marriages/cn/paypage_neirong_cn.webp';


import tw_bg_1 from '../../../assets/img/emotion_marriages/tw/paypage_neirong_tw.webp';



import img_zhifu_jian from '../../../assets/img/emotion_v2/new/cn/detail/img_zhifu_jian.webp';
import img_zhifu_fan from '../../../assets/img/emotion_v2/new/tw/detail/img_zhifu_jian.webp';


// import cn_paypage_tittle_xiangqing from '../../../assets/img/emotion_marriages/cn/paypage_tittle_xiangqing_cn.webp';
// import tw_paypage_tittle_xiangqing from '../../../assets/img/emotion_marriages/tw/paypage_tittle_xiangqing_tw.webp';

import cn_paypage_tittle_pay from '../../../assets/img/emotion_marriages/cn/paypage_tittle_pay_cn.webp';
import tw_paypage_tittle_pay from '../../../assets/img/emotion_marriages/tw/paypage_tittle_pay_tw.webp';



import card_img_bj_shang from '../../../assets/img/emotion_fate/card_img_bj_shang.webp';


import NewFooter from '../../../components/NewFooter.vue';
import GejuInfo from '../../../components/GejuInfo.vue';
import AnimationPage from '../../../components/AnimationPage.vue';
import FbShareNotice from '../../../components/FbShareNotice.vue';
import MarriagesPayItem from '../../../components/MarriagesPayItem.vue';
import PayGuideModal from '../../../components/PayGuideModal.vue';

export default {
  components: {
    UserInfo,
    MessageCard,
    PayCard,
    payModal,
    BaziTable,
    HomeFooter,
    MarriagesPayDetail,
    NewFooter,
    GejuInfo,
    AnimationPage,
    FbShareNotice,
    MarriagesPayItem,
    PayGuideModal,
  },
  data() {
    return {
      localStorage: window.localStorage,
      cn_history_order,
      tw_history_order,
      // cn_paypage_tittle_xiangqing,
      // tw_paypage_tittle_xiangqing,
      cn_paypage_tittle_pay,
      tw_paypage_tittle_pay,
      card_img_bj_shang,
      cn_bg_1,
      tw_bg_1,
      img_zhifu_jian,
      img_zhifu_fan,
      cn_home_btn,
      tw_home_btn,

      cn_zhong3,
      cn_zhong4,
      tw_zhong3,
      tw_zhong4,
      cn_info_title,
      tw_info_title,
      product_id: 25,
      product_key: 'consult_time',
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
      showPayGuideModal: false,//待支付蒙版
      show_discount_modal: false,//低价折扣弹窗
      consult_time: null,//下单参数
      duration_time: {
        entry_time: 0,
        exit_time: 0,
      }
    };
  },
  watch: {

  },

  computed: {
    is_consult() {
      return this.product_key === 'consult_time';
    },
    is_show_fb_notice() {
      return utils.isFBContainer() && utils.getFBChannel().indexOf('02') > -1;
    },
    //套餐支付显示逻辑
    is_show_combination() {
      return ['enjoy01', 'panda01'].includes(
        utils.getFBChannel()
      );
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

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    btn_url() {
      if (this.language === 'zh-CN') {
        return cn_home_btn;
      } else {
        return tw_home_btn;
      }
    },
  },
  beforeCreate() {
  },
  async created() {
    utils.firebaseLogEvent(
      '10012',
      '-10004',
      'page_view_marriages_mid',
      'page_view',
      {
        args_name: 'page_view_marriages_mid',
        channel: utils.getFBChannel(),
      }
    );
    this.query_user_string = this.$route.query.querystring;

    await this.formateQueryUserInfo(this.query_user_string);
    this.getUserBazi();
  },



  mounted() {
    this.duration_time.entry_time = new Date().getTime()
    window.scrollTo(0, 0);
    // setTimeout(() => {
    //   this.$nextTick(() => {
    //     // 滚动到指定元素
    //     const element = document.getElementById('method-title-img');
    //     if (element) {
    //       element.scrollIntoView({ behavior: 'smooth' });
    //     }
    //   });
    // }, 2000);
    let self = this;
    let initialWindowHeight = window.innerHeight;
    // 添加resize事件监听器
    window.addEventListener('resize', function () {
      self.is_show_btn =
        initialWindowHeight > window.innerHeight ? false : true;
    });
  },
  destroyed() {
    this.duration_time.exit_time = new Date().getTime();
    if (this.duration_time.entry_time) {
      utils.firebaseLogEvent(
        '10012',
        '-10005',
        'view_marriages_duration',
        'view',
        {
          args_name: 'view_truelove_duration',
          channel: utils.getFBChannel(),
          time: JSON.stringify({ entry_time: this.duration_time.entry_time, exit_time: this.duration_time.exit_time, })
        }
      );
    }
  },
  methods: {
     /**
     * @description: 跳转历史订单页
     * @return {*}
     */
     toOrder() {
      this.$router.push({
        path: 'order',
      });
    },
    scrollClick() {
      this.$nextTick(() => {
        // 滚动到指定元素
        const element = document.getElementById('method-title-img');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
    /**
    * 显示低价折扣遮罩
    */
    change_discount_modal(val) {
      this.show_discount_modal = val;
    },
    showModal() {
      this.showPayGuideModal = !this.showPayGuideModal;
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
      // const { status, data } = await getBaziAPI(params);
      // if (status !== 1000) return;
      // this.gan = data.gan;
      // this.zhi = data.zhi;
      // this.nayin = data.nayin;
      // this.gejujiedu = data.gejujiedu;
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
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${this.picker_hour
        }`
        : `${this.year}年${utils.formateNongliMonth(
          this.month
        )}${utils.formateNongliDate(this.date)} ${this.picker_hour}`;

      console.log('this.picker_date_nongli', this.picker_date_nongli, this.gongli_nongli)

      this.picker_date_yangli = +this.gongli_nongli
        ? `${this.year}-${this.month}-${this.date} ${this.picker_hour}`
        : `${Lunar.fromYmd(+this.year, +this.month, +this.date)
          .getSolar()
          .toString()} ${this.picker_hour}`;

      console.log('this.picker_date_yangli', this.picker_date_yangli, this.gongli_nongli)


      let nongli_desc = +this.gongli_nongli
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} `
        : `${this.year}年${utils.formateNongliMonth(
          this.month
        )}${utils.formateNongliDate(this.date)}`;



      this.mingge_desc = +this.gongli_nongli
        ? `${(this.username = utils.getShortStr(arr[0], 4))}，${this.sex == 0 ? '女' : '男'
        }，${this.year}年${this.month}月${this.date}日生人`
        : `${(this.username = utils.getShortStr(arr[0], 4))}，${this.sex == 0 ? '女' : '男'
        }，${nongli_desc}生人`;

      this.consult_time = {
        user_info: {
          birth_date: arr[5],
          birth_hour: arr[6],
          birth_month: arr[4],
          birth_year: arr[3],
          email: arr[7] || '',
          is_gongli: +arr[2],
          name: arr[0],
          sex: +arr[1],
        }
      }
      console.log('this.consult_time', this.consult_time)


    },


    payOrder() {
      localStorage.removeItem('mlxz_count_pay_item_h5_emotion2024');
      this.$refs.payDetail.payMoney();
    },
  },
};
</script>

<style scoped lang="less">
.header-title {
  width: 7.5rem;
  height: 7.5rem;
}
.order-icon {
  position: fixed;
  right: 0;
  top: 3rem;
  width: 0.44rem;
  height: 1.5rem;
  z-index: 100;
}

.method-title-img-consult {
  width: 7.1rem;
  height: 0.84rem;
  background-image: url(../../../assets/img/emotion_marriages/card_img_bj_shang.webp);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  background-color: #ED8C8C;
  // flex-direction: column;

  img {
    width: 6.14rem;
    height: 0.9rem;
  }
}

.img-consult-bottom {
  width: 7.1rem;
  height: 0.84rem;
  background-image: url(../../../assets/img/emotion_marriages/card_img_bj_xia.webp);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  // margin-top: -0.07rem;
  background-color: #ED8C8C;


  img {
    width: 6.14rem;
    height: 0.9rem;
  }
}

.method-box {
  width: 7.1rem;
  // height: 11.06rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* padding-top: 1.14rem; */
  margin-bottom: 0.24rem;
  background: #fffafa;
  border-radius: 0.16rem;
  // background: url(../../../assets/img/emotion_marriages/card_img_bj_shang.webp);
  background: url('../../../assets/img/emotion_marriages/card_img_bj_zhong.png') ;
  // background-size: cover;
  background-size: 7.1rem 9.91rem;

  .method-title-img {
    width: 6.68rem;
    height: 0.93rem;
    margin-top: -0.13rem;
  }

}



.tag-bg {
  width: 7.1rem;
  // height: 21.4rem;
  // background-image: url(../../../assets/img/emotion_fate/card_img_bj_zhong.webp);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;

  .module {
    width: 7.1rem;

    margin-bottom: 0.2rem;
  }
}




.bg-color {
  // background: #FFFDF0;

}

.method-height {
  // height: 7.71rem;
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ED8C8C;

  .pay-box {
    margin-bottom: 0.3rem;
    width: 7.1rem;
    height: 7.09rem;
    padding-top: 1.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -0.9rem;
  }

  .cn-bg {
    background: url(../../../assets/img/emotion_v2/new/cn/detail/img_xinxi_jian.webp) no-repeat;
    background-size: 100% 100%;
  }

  .tw-bg {
    background: url(../../../assets/img/emotion_v2/new/tw/detail/img_xinxi_fan.webp) no-repeat;
    background-size: 100% 100%;
  }

  .text {
    width: 6.74rem;
    margin-bottom: 0.25rem;
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
  height: 2rem;
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
  width: 5.9rem;
  height: 0.92rem;
  position: fixed;
  bottom: 0.2rem;
  z-index: 99;
}

.pay-method {
  width: 100%;
  min-height: 5.8rem;
  font-family: system-ui, sans-serif;
  margin-top: -0.31rem;
  // background: #ffffff;
  border-radius: 0.1rem;
  // background: url('../../../assets/img/emotion_marriages/card_img_bj_zhong.png') ;
  // background-size: cover;
  padding: 0 0.2rem;
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
