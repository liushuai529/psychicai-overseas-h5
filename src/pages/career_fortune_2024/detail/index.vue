<template>
  <div :class="{ detail: true, 'hidden-scroll': pay_modal }">
    <div class="new-pay-box">
      <div class="title-box">
        <img :src="is_cn ? cn_info_title : tw_info_title" />
      </div>
      <div class="top-one"></div>
      <div class="center-one">
        <img class="word3" :src="is_cn ? cn_word3 : tw_word3" alt="" />
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
          text_color="#E34A42"
          minge_color="#E34A42"
          :show_daji="true"
          :is_career="true"
          :change_color="false"
        ></BaziTable>

        <!-- 折线图 -->
        <div v-if="!is_result" class="graph-box">
          <div class="mock-box"></div>
          <div id="shiye" class="tag-1 com-text shiye">{{ $t('tag-1') }}</div>
          <div id="jiankang" class="tag-1 com-text jiankang">
            {{ $t('tag-2') }}
          </div>
          <div id="haoyun" class="tag-2 com-text haoyun">{{ $t('tag-3') }}</div>
          <div id="echarts" class="echarts"></div>
        </div>
        <img class="huode" :src="is_cn ? cn_hude : tw_hude" alt="" />
        <img
          id="info-btn"
          class="info-btn huxi-btn"
          :src="is_cn ? cn_home_btn : tw_home_btn"
          @click="showPayModal()"
        />
      </div>
      <div class="bottom-one"></div>
    </div>

    <img class="card" :src="is_cn ? cn_bg : tw_bg" />
    <img
      v-if="showFixedBtn"
      class="info-btn fix-box huxi-btn"
      :src="is_cn ? cn_home_btn : tw_home_btn"
      @click="showPayModal()"
    />
    <div class="footer"></div>

    <payModal
      :product_key="product_key"
      v-model="pay_modal"
      :bg="language === 'zh-CN' ? cn_modal_bg : tw_modal_bg"
      :query_user_string="query_user_string"
      :title="username_title"
      title_style="color:#fff"
      @close="pay_modal = false"
      e_view_id="10004"
      c_view_id="-10005"
      e_view_name="view_2024career_pay"
      a_view_token="43oykj"
      c_click_id="-10006"
      e_click_name="click_2024career_pay"
      a_click_token="889e3j"
    />
    <NewFooter v-if="showFixedBtn" />
  </div>
</template>

<script>
import PayCard from '../../../components/PayCard.vue';
import Marquee from './../../../components/Marquee.vue';
import utils from '../../../libs/utils';
import { getBaziAPI } from '../../../api/api';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import payModal from '../../../components/PayModal.vue';
import BaziTable from '../../../components/baziTable.vue';
import * as echarts from 'echarts';

import cn_info_title from '../../../assets/img/mlxz/career_2024/detail/yu_img_title.png';
import cn_hude from '../../../assets/img/mlxz/career_2024/detail/huode.png';
import cn_home_btn from '../../../assets/img/mlxz/career_2024/home_btn.png';
import cn_bg from '../../../assets/img/mlxz/career_2024/detail/bg.png';

import tw_info_title from '../../../assets/img/tw_mlxz/career_24/info_title.png';
import tw_hude from '../../../assets/img/tw_mlxz/career_24/huode.png';
import tw_home_btn from '../../../assets/img/tw_mlxz/career_24/home_btn.png';
import tw_bg from '../../../assets/img/tw_mlxz/career_24/2.png';
import cn_word3 from '../../../assets/img/mlxz/career_2024/detail/img_word3.png';
import tw_word3 from '../../../assets/img/tw_mlxz/career_24/tw_word3.png';
import { report_id_arr } from '../../../libs/enum';
import NewFooter from '../../../components/NewFooter.vue';
const Getmonth = () => {
  let arr = [];
  for (let i = 0; i < 12; i++) {
    arr.push(`${i + 1}月`);
  }
  return arr;
};
export default {
  components: {
    PayCard,
    Marquee,
    payModal,
    BaziTable,
    NewFooter,
  },
  data() {
    return {
      cn_word3,
      tw_word3,
      cn_info_title,
      tw_info_title,
      cn_hude,
      cn_home_btn,
      cn_bg,
      tw_hude,
      tw_home_btn,
      tw_bg,
      product_id: 26,
      product_key: 'h5_career2024',
      query_user_string: '',
      language: utils.getLanguage(),
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
      nayin: ['-', '-', '-', '-'],
      cai_bo_num: 0,
      gui_ren_num: 0,
      hun_yin_num: 0,
      ming_ge: '',
      riyuanqiangruo: '',
      shi_ye_num: 0,
      wuxingqiang: '',
      is_result: false,
      score: [10, 30, 40, 35, 30, 60, 70, 68, 60, 78, 85, 100],
      showFixedBtn: false,
      is_show_btn: true,
      cn_pay_btn:
        'https://psychicai-static.psychicai.pro/imgs/2404ef4eba890d5b4678b27ef01bc42bcd45.png',
      tw_pay_btn:
        'https://psychicai-static.psychicai.pro/imgs/2404f15ec1a10d0449e3b72da597030b2631.png',
      pay_modal: false, //支付弹窗
      tw_modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/2404decca054fa0640bf94f151ddf77e8e5d.png',
      cn_modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/24044f85a11130fe41fbad46e43aec4ed6fb.png',
    };
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
  },
  computed: {
    username_title() {
      return `${utils.getShortStr(this.username)}的${this.$t('pop-title')}`;
    },

    is_cn() {
      return this.language === 'zh-CN';
    },
  },
  created() {
    utils.firebaseLogEvent(
      '10004',
      '-10003',
      'page_view_2024career_mid',
      'page_view',
      {
        args_name: 'page_view_2024career_mid',
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
  watch: {
    showFixedBtn(val) {
      if (val) {
        utils.firebaseLogEvent(
          '10004',
          '-10019',
          'view_2024career_button',
          'view',
          {
            args_name: 'view_2024career_button',
            channel: utils.getFBChannel(),
          }
        );
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$nextTick(async () => {
      if (!this.is_result) {
        this.getEcharts();
        const shiye = document.getElementById('shiye');
        const jiankang = document.getElementById('jiankang');
        const haoyun = document.getElementById('haoyun');
        await utils.asleep(2000);
        shiye.classList.add('move1');
        await utils.asleep(500);
        jiankang.classList.add('move2');
        await utils.asleep(500);
        haoyun.classList.add('move3');
      }
    });
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
      this.nayin = data.nayin;
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
     * @description: 折线图配置及初始化
     * @return {*}
     */
    getEcharts() {
      let self = this;
      let myChart = echarts.init(document.getElementById('echarts'));

      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'axis',
          show: false,
        },
        grid: {
          top: 20,
          left: 5,
          right: 20,
          bottom: 20,
          containLabel: true,
        },
        animationDuration: 2000,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Getmonth(),
          axisLabel: {
            interval: 0,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: 5,
          min: 0,
          max: 100,
          // 展示Y轴
          axisLine: {
            show: true,
            onZero: false,
          },

          offset: 1,
          //   刻度线设置
          axisTick: {
            show: false,
          },
          //   网格线设置
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: '#666',
            fontSize: 10,
            formatter: function (value) {
              if (value === 20) {
                return self.$t('line-20');
              } else if (value === 40) {
                return self.$t('line-40');
              } else if (value === 60) {
                return self.$t('line-60');
              } else if (value === 80) {
                return self.$t('line-80');
              } else if (value === 100) {
                return self.$t('line-100');
              } else if (value === 0) {
                return '';
              }
            },
          },
        },
        series: [
          {
            name: self.$t('score-line'),
            type: 'line', //类型 折线
            smooth: true, //是否平滑
            itemStyle: {
              color: '#FF7A00',
            },
            data: self.score,
            showSymbol: false,
            areaStyle: {
              color: echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FFF1E3',
                },
                {
                  offset: 1,
                  color: '#FDFAEC',
                },
              ]),
            },
          },
        ],
      };
      myChart.setOption(option);
    },

    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    showPayModal() {
      utils.firebaseLogEvent(
        '10004',
        '-10004',
        'click_2024career_mid',
        'click',
        {
          args_name: 'click_2024career_mid',
          channel: utils.getFBChannel(),
        }
      );

      this.pay_modal = true;
    },
  },
};
</script>

<style scoped lang="less">
.footer {
  width: 7.5rem;
  height: 2.6rem;
}
.new-pay-box {
  width: 7.1rem;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0.33rem 0.2rem 0;
  .title-box {
    position: absolute;
    top: -0.13rem;
    width: 100%;
    height: 0.76rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    img {
      width: 4.66rem;
      height: 100%;
    }
  }
  .top-one {
    width: 100%;
    height: 1.2rem;
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_top.png')
      no-repeat;
    background-size: 100% 100%;
  }
  .center-one {
    width: 100%;
    min-height: 1.2rem;
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_mid.png')
      no-repeat;
    background-size: 100% 100%;
    margin-top: -0.3rem;
    padding: 0 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    .word3 {
      width: 3.61rem;
      height: 0.53rem;
    }
  }
  .bottom-one {
    width: 100%;
    height: 1.2rem;
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_bot.png')
      no-repeat;
    background-size: 100% 100%;
    margin-top: -0.8rem;
    margin-bottom: 0.2rem;
    position: relative;
    z-index: 1;
  }
}
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  .card {
    width: 7.1rem;
    height: 100%;
    margin-bottom: 0.2rem;
  }

  .pay-box {
    min-height: 5.06rem;
    margin: 0 0.2rem;
    box-sizing: border-box;

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
    font-weight: 600;
    line-height: 0.42rem;
    text-align: center;
    margin-right: 0.5rem;
    white-space: nowrap;
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
  width: 4.98rem;
  height: 1rem;
  margin: 0.3rem auto;
  z-index: 9;
}

.move1 {
  animation: moveDown1 1s ease-in-out forwards;
}
.move2 {
  animation: moveDown2 1s ease-in-out forwards;
}
.move3 {
  animation: moveDown3 1s ease-in-out forwards;
}

@keyframes moveDown1 {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    opacity: 1;
    top: 1.58rem;
  }
}

@keyframes moveDown2 {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: 0.85rem;
    opacity: 1;
  }
}

@keyframes moveDown3 {
  0% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: 0.3rem;
    opacity: 1;
  }
}

.graph-box {
  width: 6.62rem;
  height: 3.58rem;
  margin: 0 auto;
  position: relative;
  .mock-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .com-text {
    width: 1.16rem;
    height: 0.49rem;
    font-weight: 500;
    font-size: 0.24rem;
    color: #ffffff;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    padding-top: 0.01rem;
    z-index: 2;
    opacity: 0;
  }

  .tag-1 {
    background: url('https://psychicai-static.psychicai.pro/imgs/240478be5c9f4f28446ca874ac8ce89ec686.png')
      no-repeat;
    background-size: contain;
  }
  .tag-2 {
    background: url('https://psychicai-static.psychicai.pro/imgs/24044ec478d6521a4a0caa0950cc8d7ca107.png')
      no-repeat;
    background-size: contain;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .shiye {
    left: 2.1rem;
  }
  .jiankang {
    right: 1.3rem;
  }
  .haoyun {
    right: 0.7rem;
  }
}
.info-btn {
  width: 4.98rem;
  height: 1rem;
  margin-top: 0.1rem;
  margin-bottom: 0.2rem;
  // animation: scaleBtn 1s infinite ease-in-out alternate;
  margin-top: 0.4rem;
  z-index: 99;
}
.huode {
  width: 5.95rem;
  height: 2.4rem;
}

.fix-box {
  position: fixed !important;
  bottom: 1.2rem;
}
</style>
