<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:33:50
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-29 20:38:59
 * @Description: 
-->
<template>
  <div :class="{ 'user-info': true }">
    <div class="title">
      <img :src="language == 'zh-CN' ? cn_title_1 : tw_title_1" alt="" />
    </div>
    <img
      :src="language == 'zh-CN' ? cn_title_2 : tw_title_2"
      class="title-2"
      alt=""
    />
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
      :change_color="false"
    ></BaziTable>

    <!-- 折线图 -->
    <div v-if="!is_result" class="graph-box">
      <div class="mock-box"></div>
      <div id="shiye" class="tag-1 com-text shiye">{{ $t('tips-1') }}</div>
      <div id="jiankang" class="tag-1 com-text jiankang">
        {{ $t('tips-2') }}
      </div>
      <div id="haoyun" class="tag-2 com-text haoyun">{{ $t('tips-3') }}</div>
      <div id="echarts" class="echarts"></div>
    </div>

  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
import cn_title_1 from '../../../assets/img/mlxz/year_of_lucky_2024/result_img_word.webp';
import tw_title_1 from '../../../assets/img/tw_mlxz/year_24/detail/result_img_word.webp';
import cn_title_2 from '../../../assets/img/mlxz/year_of_lucky_2024/img_word3.webp';
import tw_title_2 from '../../../assets/img/mlxz/year_of_lucky_2024/img_word3.webp';
// import * as echarts from 'echarts';

import BaziTable from '../../../components/baziTable.vue';
const Getmonth = () => {
  let arr = [];
  for (let i = 0; i < 12; i++) {
    arr.push(`${i + 1}月`);
  }
  return arr;
};
export default {
  props: [
    'username',
    'sex',
    'picker_date_yangli',
    'picker_date_nongli',
    'gan',
    'zhi',
    'nayin',
    'gongli_nongli',
    'score',
    'scores2024content',
    'is_result',
    'cai_bo_num',
    'gui_ren_num',
    'hun_yin_num',
    'ming_ge',
    'riyuanqiangruo',
    'shi_ye_num',
    'wuxingqiang',
  ],
  components: {
    BaziTable,
  },
  data() {
    return {
      language: utils.getLanguage(),
      cn_title_1,
      tw_title_1,
      cn_title_2,
      tw_title_2,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      if (!this.is_result) {
        this.getEcharts_year();
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
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 8);
    },
    filter_sex(val) {
      return +val ? '乾' : '坤';
    },
  },
  methods: {
    /**
     * @description: 折线图配置及初始化
     * @return {*}
     */
    async getEcharts_year() {
      let self = this;
      await utils.asleep(1000)
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
  },
};
</script>

<style scoped lang="less">
.title-2 {
  width: 3.56rem;
  height: 0.48rem;
  margin-top: 0.21rem;
  margin-left: 0.32rem;
}
.user-table {
  width: 6.5rem;
  min-height: 5.69rem;
  background: #fdfaec;
  border: 0.02rem solid #cb6735;
  margin: 0 auto 0.21rem;
  display: flex;
  flex-direction: column;
  position: relative;
  .daji {
    width: 1rem;
    height: 1.62rem;
    position: absolute;
    right: 0.1rem;
    top: -0.48rem;
    animation: fanzhuan 2s linear infinite;
  }
  .gua {
    width: 1.1rem;
    height: 1.1rem;
    background: url('https://psychicai-static.psychicai.pro/imgs/2404347a9915ae984267b0aab1e48afe650c.png')
      no-repeat;
    background-size: contain;
    font-weight: 600;
    font-size: 0.32rem;
    color: #feeb9f;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0.1rem;
    top: 0.28rem;
  }
  .name {
    width: 100%;
    height: 0.68rem;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid #cb6735;
    font-weight: 600;
    font-size: 0.28rem;
    color: #444;
    white-space: nowrap;
    .flex-row;
  }
  .c-zhu {
    font-weight: 400;
    font-size: 0.28rem;
    color: #cb6735;
    td {
      width: 25%;
      height: 100%;
      border-right: 1px solid #cb6735;
      .flex-row;
    }
  }
  .c-zhu td:last-child {
    border-right: none;
  }
  .v-zhu {
    width: 100%;
    height: 0.57rem;
    font-weight: 600;
    font-size: 0.32rem;
    text-align: center;
    .flex-row;
    td {
      width: 25%;
      height: 100%;
      border-right: 1px solid #cb6735;
      .flex-row;
    }
  }
  .v-zhu td:last-child {
    border-right: none;
  }
  .v-nayin {
    width: 100%;
    height: 0.71rem;
    font-weight: 600;
    font-size: 0.28rem;
    text-align: center;
    .flex-row;
    td {
      width: 25%;
      height: 100%;
      border-right: 1px solid #cb6735;
      .flex-row;
    }
  }
  .v-nayin td:last-child {
    border-right: none;
  }
  .v-minge {
    width: 100%;
    height: 1.83rem;
    font-weight: 400;
    font-size: 0.28rem;
    text-align: center;
    .flex-row;
    justify-content: flex-start !important;
    .label-minge {
      width: 25%;
      color: #cb6735;
      height: 100%;
      border-right: 1px solid #cb6735;
      .flex-row;
    }
    .minge-text {
      width: 34%;
      height: 100%;
      .minge-row {
        .flex-row;
        height: 33.33%;
        justify-content: space-around;
      }
    }
    .geju {
      width: 7%;
      height: 100%;
      background: #cb6735;
      color: #fff;
    }
  }
}

.label-100 {
  width: 1rem;
  text-align: left;
}
.bottom-1 {
  border-bottom: 1px solid #cb6735;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.user-info {
  margin-top: 0.37rem;
  display: flex;
  flex-direction: column;
  font-family: PingFangSC;

  .title {
    width: 100%;
    height: 0.37rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 3.98rem;
      height: 100%;
    }
  }
  .info-box {
    display: flex;
    flex-direction: column;
    margin: 0 0.09rem;
    padding-left: 0.69rem;
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

.desc {
  font-size: 0.28rem;
  font-weight: 400;
  color: #222222;
  line-height: 0.48rem;
  margin: 0 0.2rem 0.1rem;
}

@keyframes circle_rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fanzhuan {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
