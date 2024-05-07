<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-08 20:35:24
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-06 17:25:34
 * @Description: 
-->
<template>
  <div class="detail">
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
      ></BaziTable>
      <div class="name-gua">
        {{ username | filter_name }}的{{ $t('tips-gua') }}
      </div>
      <div class="title3">
        <img
          class="gua"
          src="../../../assets/img/mlxz/lucky_year_report/detail/new_detail/lock.png"
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
    <div class="footer-box">
      <img
        v-if="showFixedBtn"
        @click="showPayModal"
        class="btn fix-box"
        :src="is_cn ? cn_pay_btn : tw_pay_btn"
        alt=""
      />
    </div>
    <payModal
      :product_key="product_key"
      v-model="pay_modal"
      :bg="is_cn ? cn_modal_bg : tw_modal_bg"
      :query_user_string="query_user_string"
      :title="username_title"
      @close="pay_modal = false"
    />
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
import cn_duanyu from '../../../assets/img/mlxz/svga/wealth24/cn_duanyu.svga';
import tw_duanyu from '../../../assets/img/mlxz/svga/wealth24/tw_duanyu.svga';
import ji_svga from '../../../assets/img/mlxz/svga/wealth24/caiyun_ji.svga';

import cn_static_duan from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_1.png';
import tw_static_duan from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_1.png';
import cn_txt_title from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/txt-xinxi.png';
import tw_txt_title from '../../../assets/img/tw_mlxz/wealth_24/detail/txt-xinxi.png';
import cn_img_word3 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/img_word3.png';
import tw_img_word3 from '../../../assets/img/tw_mlxz/wealth_24/detail/img_word3.png';
import cn_pay_btn from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/bt.png';
import tw_pay_btn from '../../../assets/img/tw_mlxz/wealth_24/detail/bt.png';
import cn_zhong_2 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_2.png';
import tw_zhong_2 from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_2.png';
import cn_zhong_3 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_3.png';
import tw_zhong_3 from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_3.png';
import cn_zhong_4 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_4.png';
import tw_zhong_4 from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_4.png';
import cn_zhong_5 from '../../../assets/img/mlxz/lucky_year_report/detail/new_detail/zhong_5.png';
import tw_zhong_5 from '../../../assets/img/tw_mlxz/wealth_24/detail/zhong_5.png';
import tw_modal_bg from '../../../assets/img/tw_mlxz/wealth_24/detail/modal_bg.png';
import { report_id_arr } from '../../../libs/enum';
export default {
  components: { PayCard, BaziTable, payModal },
  computed: {},
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
      ji_svga,
      cn_static_duan,
      tw_static_duan,
      cn_duanyu,
      tw_duanyu,
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
    username_title() {
      return `${utils.getShortStr(this.username)}的2024年${this.$t(
        'report-name'
      )}`;
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
      report_id: '60001',
      channel: utils.getFBChannel(),
    });
    this.query_user_string = this.$route.query.querystring;
    await this.formateQueryUserInfo(this.query_user_string);
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
    background: url('../../../assets/img/mlxz/lucky_year_report/detail/bg.png')
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
    height: 1.46rem;
    background: url('../../../assets/img/mlxz/lucky_year_report/detail/new_detail/img_btn_bj.png')
      no-repeat;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.btn {
  width: 5.92rem;
  height: 1.06rem;
  animation: scaleBtn 1s infinite ease-in-out alternate;
}
.fix-box {
  position: fixed !important;
  bottom: 0.1rem;
}
</style>
