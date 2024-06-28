<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-08 20:35:24
 * @LastEditors: Tahiti
 * @LastEditTime: 2024-06-17 17:45:26
 * @Description: 
-->
<template>
  <div :class="['detail', pay_modal ? 'fix-pop' : '']">
    <FbShareNotice v-if="is_show_fb_notice"/>
    <div class="pay-box">
      <img class="title1" :src="is_cn ? cn_txt_title : tw_txt_title" alt="" />
      <img class="title2" :src="is_cn ? cn_img_word3 : tw_img_word3" alt="" />
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
        text_color="#C18204"
        minge_color="#C18204"
        :show_daji="false"
        :change_color="false"
      ></BaziTable>
      <div class="name-gua">
        {{ username | filter_name }}的{{ $t('tips-gua') }}
      </div>
      <div class="title3">
        <img
          class="gua"
          src="../../../assets/img/mlxz/lucky_year_report/detail/new_detail/lock.webp"
          alt=""
        />
        <canvas id="ji"></canvas>
      </div>

      <img
        id="info-btn"
        @click="showPayModal"
        class="btn"
        :src="is_cn ? cn_pay_btn : tw_pay_btn"
        alt=""
      />
    </div>
    <div
      :style="`background-image:url(${
        is_cn ? cn_static_duan : tw_static_duan
      })`"
      class="card-duan"
    >
      <canvas id="canvas"></canvas>
    </div>

    <img class="card" :src="is_cn ? cn_zhong_2 : tw_zhong_2" alt="" />
    <img class="card" :src="is_cn ? cn_zhong_3 : tw_zhong_3" alt="" />
    <img class="card" :src="is_cn ? cn_zhong_4 : tw_zhong_4" alt="" />
    <img class="card" :src="is_cn ? cn_zhong_5 : tw_zhong_5" alt="" />
    <img
      v-if="showFixedBtn"
      @click="showPayModal"
      class="btn fix-box"
      :src="is_cn ? cn_pay_btn : tw_pay_btn"
      alt=""
    />
    <div class="footer-box"></div>
    <payModal
      :product_key="product_key"
      v-model="pay_modal"
      :bg="is_cn ? cn_modal_bg : tw_modal_bg"
      :query_user_string="query_user_string"
      :title="username_title"
      @close="pay_modal = false"
      e_view_id="10005"
      c_view_id="-10005"
      e_view_name="view_2024wealty_pay"
      a_view_token="xa0760"
      c_click_id="-10006"
      e_click_name="click_2024wealty_pay"
      a_click_token="rckacf"
    />
    <NewFooter v-if="showFixedBtn" product_key="h5_wealth2024" />
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { Downloader, Parser, Player } from 'svga.lite';
import utils from '../../../libs/utils';
import PayCard from '../../../components/PayCard.vue';
import BaziTable from '../../../components/baziTable.vue';
import { getBaziAPI } from '../../../api/api';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import payModal from '../../../components/PayModal.vue';

import cn_static_duan from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_1.webp';
import tw_static_duan from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_1.webp';
import cn_txt_title from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/txt-xinxi.webp';
import tw_txt_title from '../../../assets/img/tw_mlxz/wealth_24/detail/txt-xinxi.webp';
import cn_img_word3 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/img_word3.webp';
import tw_img_word3 from '../../../assets/img/tw_mlxz/wealth_24/detail/img_word3.webp';
import cn_pay_btn from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/bt.webp';
import tw_pay_btn from '../../../assets/img/tw_mlxz/wealth_24/detail/bt.webp';
import cn_zhong_2 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_2.webp';
import tw_zhong_2 from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_2.webp';
import cn_zhong_3 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_3.webp';
import tw_zhong_3 from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_3.webp';
import cn_zhong_4 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_4.webp';
import tw_zhong_4 from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_4.webp';
import cn_zhong_5 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_5.webp';
import tw_zhong_5 from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_5.webp';
import tw_modal_bg from '../../../assets/img/tw_mlxz/wealth_24/detail/modal_bg.webp';
import { report_id_arr } from '../../../libs/enum';
import NewFooter from '../../../components/NewFooter.vue';
import FbShareNotice from '../../../components/FbShareNotice.vue';
export default {
  components: { PayCard, BaziTable, payModal, NewFooter,FbShareNotice  },
  
  data() {
    return {
      cn_zhong_2,
      tw_zhong_2,
      cn_zhong_3,
      tw_zhong_3,
      cn_zhong_4,
      tw_zhong_4,
      cn_zhong_5,
      tw_zhong_5,
      cn_pay_btn,
      tw_pay_btn,
      cn_img_word3,
      tw_img_word3,
      cn_txt_title,
      tw_txt_title,
      ji_svga:
        'https://psychicai-static.psychicai.pro/imgs/2406b773dd3ac3734007bb172f18387d456e.svga',
      cn_static_duan,
      tw_static_duan,
      cn_duanyu:
        'https://psychicai-static.psychicai.pro/imgs/24063f85fe4eef7048d28db51d74b19e54e2.svga',
      tw_duanyu:
        'https://psychicai-static.psychicai.pro/imgs/240606203c18b8ab4474a137526332c24b26.svga',
      product_id: 21,
      product_key: 'h5_wealth2024',
      query_user_string: '',
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
      gan: ['甲', '丙', '壬', '丙'],
      zhi: ['戌', '子', '辰', '午'],
      nayin: ['？', '？', '？', '？'],
      is_result: false,
      pay_modal: false, //支付弹窗
      cn_modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/24046cb4eb8a55fe42b98cbf02a04c94f0d8.png',
      tw_modal_bg,
      is_show_btn: true,
      showFixedBtn: false,
    };
  },
  computed: {
    is_show_fb_notice() {
      return utils.isFBContainer() && utils.getFBChannel().indexOf('02')>-1;
    },
    username_title() {
      return `${utils.getShortStr(this.username)}的2024年${this.$t(
        'report-name'
      )}`;
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {
    showFixedBtn(val) {
      if (val) {
        utils.firebaseLogEvent(
          '10005',
          '-10019',
          'view_2024wealty_button',
          'view',
          {
            args_name: 'view_2024wealty_button',
            channel: utils.getFBChannel(),
          }
        );
      }
    },
  },
  async created() {
    utils.firebaseLogEvent(
      '10005',
      '-10003',
      'page_view_2024wealty_mid',
      'page_view',
      {
        args_name: 'page_view_2024wealty_mid',
        channel: utils.getFBChannel(),
      }
    );
    this.query_user_string = this.$route.query.querystring;

    await this.formateQueryUserInfo(this.query_user_string);
    let pay_modal = this.$route.query.pay_modal;
    if (pay_modal) {
      this.pay_modal = true;
    }
    this.getUserBazi();
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 8);
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
    self.loadBg('#canvas', self.is_cn ? self.cn_duanyu : self.tw_duanyu);
    self.loadBg('#ji', self.ji_svga);
  },
  methods: {
    // 端内加载背景SVGA动画
    loadBg(dom, url, is_loop = true) {
      const downloader = new Downloader();
      const parser = new Parser();
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
      this.sex = ['男', 'male', 1, '1'].includes(arr[1]) ? 1 : 0;
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
      utils.firebaseLogEvent(
        '10005',
        '-10004',
        'click_2024wealty_mid',
        'click',
        {
          args_name: 'click_2024wealty_mid',
          channel: utils.getFBChannel(),
        }
      );
      this.pay_modal = true;
    },
  },
};
</script>

<style scoped lang="less">
.card-duan {
  width: 6.9rem;
  height: 5.1rem;
  background-repeat: no-repeat;
  background-size: contain;
  margin-bottom: 0.3rem;
  #canvas {
    width: 100%;
    height: 100%;
  }
}
.detail {
  width: 7.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8de95;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pay-box {
    margin-top: 0.4rem;
    width: 7.42rem;
    height: 14.58rem;
    background: url('../../../assets/img/mlxz/lucky_year_report/detail/bg.webp')
      no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.3rem;
    .title1 {
      width: 4.07rem;
      height: 0.84rem;
      margin: 0.83rem auto 0.27rem;
    }
    .title2 {
      width: 3.74rem;
      height: 0.46rem;
    }
    .name-gua {
      width: 100%;
      height: 0.32rem;
      font-weight: 600;
      font-size: 0.32rem;
      color: #c18204;
      line-height: 0.32rem;
      text-align: center;
      margin-top: 0.3rem;
    }
    .title3 {
      width: 4.8rem;
      height: 3.68rem;
      margin-bottom: 0.4rem;
      position: relative;
      .gua {
        width: 100%;
        height: 100%;
      }
      #ji {
        width: 1rem;
        height: 1.57rem;
        position: absolute;
        top: -0.7rem;
        right: -0.5rem;
      }
    }
  }
  .card {
    width: 6.9rem;
    margin-bottom: 0.3rem;
  }
  .footer-box {
    width: 7.5rem;
    height: 2.46rem;
    // background: url('../../../assets/img/mlxz/lucky_year_report/detail/new_detail/img_btn_bj.webp')
    //   no-repeat;
    // background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.fix-pop {
  // overflow-y: hidden;
  // height: 100vh;
  position: fixed !important;
  overflow-y: hidden;
  top: 0;
}
.btn {
  width: 5.92rem;
  height: 1.06rem;
  animation: scaleBtn 1s infinite ease-in-out alternate;
}
.fix-box {
  position: fixed !important;
  bottom: 0.2rem;
  z-index: 99;
}
</style>
