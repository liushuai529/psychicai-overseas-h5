<template>
  <div
    :class="`content-item ${
      [1, 4, 9].includes(item_index) ? 'item-1-bg' : 'item-normal-bg'
    }`"
  >
    <img
      class="title-box"
      :src="item_index === 4 ? getGoldYear(result.gold2024) : titleImg"
      alt=""
    />
    <div v-if="item_index === 2" class="content-2">
      <div class="item-box">
        <div class="tip">{{ $t('kaiyun-label') }}</div>
        <img
          :src="getDirection(result.guide2024direction)"
          class="baoshi"
          alt=""
        />
        <div class="desc">{{ result.guide2024direction }}</div>
      </div>
      <div class="item-box">
        <div class="tip">{{ $t('lucky-color') }}</div>
        <div class="lucky-color" :style="getColor(result.guide2024color)"></div>
        <div class="desc">
          {{ result.guide2024color }}
        </div>
      </div>
      <div v-if="baoshi_icon" class="item-box">
        <div class="tip">{{ $t('lucky-treasure') }}</div>
        <img :src="baoshi_icon" class="baoshi" alt="" />
        <div class="desc">
          {{ result.guide2024decoration }}
        </div>
      </div>
    </div>
    <div v-else-if="item_index === 3" v-html="result" class="content"></div>
    <div v-else-if="item_index === 1" v-html="result" class="content"></div>
    <div v-else-if="item_index === 4" class="content-4 content">
      <!-- <template v-if="result.gold2024content.length">
        <span v-for="(it, k) in result.gold2024content" :key="'gold' + k">
          {{ it }}
        </span>
      </template> -->
      <div class="year-title">今年是你的{{ result.gold2024 }}之年</div>
      <div>
        {{ result.gold2024content }}
      </div>
      <div>{{ result.whole2024 }}</div>
    </div>
    <div v-else-if="item_index === 9" class="content-tu">
      <div id="echarts" class="echarts"></div>
      <template v-if="content_arr.length">
        <div
          v-for="(it, k) in content_arr"
          :key="'score' + k"
          class="content-score"
        >
          {{ it }}
        </div>
      </template>
    </div>
    <div v-else class="content">
      {{ result }}
    </div>
  </div>
</template>
<script>
import title1 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_1.png';
import title2 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_2.png';
import title3 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_3.png';
import title4 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_guiren.png';
import title5 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_4.png';
import title6 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_caifu.png';
import title7 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_5.png';
import title8 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_6.png';
import title9 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_7.png';

import tw_title1 from './../../../assets/img/tw_mlxz/year_24/result/title/result_title_1.png';
import tw_title2 from './../../../assets/img/tw_mlxz/year_24/result/title/result_title_2.png';
import tw_title3 from './../../../assets/img/tw_mlxz/year_24/result/title/result_title_3.png';
import tw_title5 from './../../../assets/img/tw_mlxz/year_24/result/title/result_title_4.png';
import tw_title7 from './../../../assets/img/tw_mlxz/year_24/result/title/result_title_5.png';
import tw_title6 from './../../../assets/img/tw_mlxz/year_24/result/title/result_title_6.png';
import tw_title9 from './../../../assets/img/tw_mlxz/year_24/result/title/result_title_7.png';
import tw_title8 from './../../../assets/img/mlxz/year_of_lucky_2024/result_title_6.png';

// import * as echarts from 'echarts';
import { color_enums, icon_enums } from '../../../libs/enum';

import directionIcon1 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_1@3x.png';
import directionIcon2 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_2@3x.png';
import directionIcon3 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_3@3x.png';
import directionIcon4 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_4@3x.png';
import directionIcon5 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_5@3x.png';
import directionIcon6 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_6@3x.png';
import directionIcon7 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_7@3x.png';
import directionIcon8 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_8@3x.png';

import cn_guiren from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_1@3x.png';
import tw_guiren from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_1.png';

import cn_taohua from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_2@3x.png';
import tw_taohua from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_2.png';

import cn_benbo from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_3@3x.png';
import tw_benbo from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_3.png';

import cn_yangsheng from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_4@3x.png';
import tw_yangsheng from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_4.png';

import cn_xiuxing from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_5@3x.png';
import tw_xiuxing from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_5.png';

import cn_tiba from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_6@3x.png';
import tw_tiba from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_6.png';

import cn_tisheng from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_7@3x.png';
import tw_tisheng from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_7.png';

import cn_qinmian from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_8@3x.png';
import tw_qinmian from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_8.png';

import cn_jiaoji from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_9@3x.png';
import tw_jiaoji from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_9.png';

import cn_shenzao from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_10@3x.png';
import tw_shenzao from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_10.png';

import cn_dandang from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_11@3x.png';
import tw_dandang from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_11.png';

import cn_wuyou from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_12@3x.png';
import tw_wuyou from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_12.png';

import cn_pinshun from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_13@3x.png';
import tw_pinshun from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_13.png';

import cn_xiuxian from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_14@3x.png';
import tw_xiuxian from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_14.png';
import utils from '../../../libs/utils';

const Getmonth = () => {
  let arr = [];
  for (let i = 0; i < 12; i++) {
    arr.push(`${i + 1}月`);
  }
  return arr;
};
export default {
  props: {
    item_index: {
      type: Number,
      default: 1,
    },
    result: {
      type: String | Object | Array,
      default: '',
    },
    content_arr: {
      type: Array,
      default: () => [],
    },
    baoshi_icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      title1,
      title2,
      title3,
      title4,
      title5,
      title6,
      title7,
      title8,
      title9,
      tw_title1,
      tw_title2,
      tw_title3,
      tw_title5,
      tw_title5,
      tw_title6,
      tw_title7,
      tw_title8,
      tw_title9,
      direction_arr: [
        {
          k: '北方',
          v: directionIcon1,
        },
        {
          k: '东北方',
          v: directionIcon2,
        },
        {
          k: '東北方',
          v: directionIcon2,
        },
        {
          k: '东方',
          v: directionIcon3,
        },
        {
          k: '東方',
          v: directionIcon3,
        },
        {
          k: '东南方',
          v: directionIcon4,
        },
        {
          k: '東南方',
          v: directionIcon4,
        },
        {
          k: '南方',
          v: directionIcon5,
        },
        {
          k: '西南方',
          v: directionIcon6,
        },
        {
          k: '西方',
          v: directionIcon7,
        },
        {
          k: '西北方',
          v: directionIcon8,
        },
      ],
      year_arr: [
        {
          cn_k: '贵人',
          tw_k: '貴人',
          cn_v: cn_guiren,
          tw_v: tw_guiren,
        },
        {
          cn_k: '桃花',
          tw_k: '桃花',
          cn_v: cn_taohua,
          tw_v: tw_taohua,
        },
        {
          cn_k: '奔波',
          tw_k: '奔波',
          cn_v: cn_benbo,
          tw_v: tw_benbo,
        },
        {
          cn_k: '养生',
          tw_k: '養生',
          cn_v: cn_yangsheng,
          tw_v: tw_yangsheng,
        },
        {
          cn_k: '修行',
          tw_k: '修行',
          cn_v: cn_xiuxing,
          tw_v: tw_xiuxing,
        },
        {
          cn_k: '提拔',
          tw_k: '提拔',
          cn_v: cn_tiba,
          tw_v: tw_tiba,
        },
        {
          cn_k: '提升',
          tw_k: '提升',
          cn_v: cn_tisheng,
          tw_v: tw_tisheng,
        },
        {
          cn_k: '勤勉',
          tw_k: '勤勉',
          cn_v: cn_qinmian,
          tw_v: tw_qinmian,
        },
        {
          cn_k: '交际',
          tw_k: '交際',
          cn_v: cn_jiaoji,
          tw_v: tw_jiaoji,
        },
        {
          cn_k: '深造',
          tw_k: '深造',
          cn_v: cn_shenzao,
          tw_v: tw_shenzao,
        },
        {
          cn_k: '担当',
          tw_k: '擔當',
          cn_v: cn_dandang,
          tw_v: tw_dandang,
        },
        {
          cn_k: '无忧',
          tw_k: '無憂',
          cn_v: cn_wuyou,
          tw_v: tw_wuyou,
        },
        {
          cn_k: '平顺',
          tw_k: '平順',
          cn_v: cn_pinshun,
          tw_v: tw_pinshun,
        },
        {
          cn_k: '休闲',
          tw_k: '休閒',
          cn_v: cn_xiuxian,
          tw_v: tw_xiuxian,
        },
      ],
      language: utils.getLanguage(),
    };
  },
  computed: {
    titleImg() {
      return this[
        `${utils.getLanguage() === 'zh-CN' ? '' : 'tw_'}title${this.item_index}`
      ];
    },
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.item_index === 9) {
        this.getEcharts();
      }
    });
  },
  methods: {
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
        },
        grid: {
          top: 20,
          left: 5,
          right: 20,
          bottom: 20,
          containLabel: true,
        },
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
            data: self.result,
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
    /**
     * @description: 获取开运颜色
     * @param {*} val
     * @return {*}
     */
    getColor(val) {
      if (!val) return;
      let _same = color_enums.find(it => val === it.cn_k || val === it.tw_k);
      return `backgroundColor:${_same.v}`;
    },
    /**
     * @description: 获取宝石颜色
     * @param {*} val
     * @return {*}
     */
    getBaoshi(val) {
      if (!val) return;
      let _same = icon_enums.find(it => val === it.cn_k || val === it.tw_k);
      return _same.icon;
    },
    /**
     * @description: 获取开运方位图标
     * @param {*} val
     * @return {*}
     */
    getDirection(val) {
      if (!val) return;
      return this.direction_arr.find(it => it.k === val).v;
    },
    /**
     * @description: 获取运势定语标题
     * @param {*} val
     * @return {*}
     */
    getGoldYear(val) {
      if (!val) return;
      let _same = this.year_arr.find(it => val === it.cn_k || val === it.tw_k);
      let _lang = this.language === 'zh-CN' ? 'cn_v' : 'tw_v';
      return _same[_lang];
    },
  },
};
</script>
<style scoped lang="less">
.item-1-bg {
  background: url('../../../assets/img/mlxz/year_of_lucky_2024/pay_img_bg.png')
    no-repeat;
}
.item-normal-bg {
  background: url('../../../assets/img/mlxz/year_of_lucky_2024/result_img_bg.png')
    no-repeat;
}
.content-item {
  width: 7.1rem;
  min-height: 4.64rem;
  background-size: 100% 100%;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.29rem 0.4rem 0.3rem;
  .title-box {
    height: 0.8rem;
  }
  .content {
    // width: 6.1rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 0.48rem;
    margin-top: 0.31rem;
    font-weight: 400;
  }
}
.content-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.36rem;
  .item-box {
    width: 1.82rem;
    height: 2.18rem;
    background: url('../../../assets/img/mlxz/year_of_lucky_2024/result_img_kuang.png')
      no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: PingFangSC-Regular, PingFang SC;
    margin: 0 0.15rem;
    .tip {
      height: 0.26rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #666666;
      line-height: 0.26rem;
      position: absolute;
      top: 0.24rem;
    }
    .desc {
      height: 0.28rem;
      font-size: 0.28rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 0.28rem;
      position: absolute;
      bottom: 0.24rem;
    }
    .baoshi {
      width: 0.72rem;
      height: 0.72rem;
    }
  }
}

.lucky-color {
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
}
.year-title {
  height: 0.4rem;
  font-weight: 600;
  font-size: 0.28rem;
  color: #fb3400;
  line-height: 0.4rem;
  margin-bottom: 0.15rem;
}

.echarts {
  width: 6.62rem;
  height: 3.2rem;
}
.content-score {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  line-height: 0.48rem;
  margin: 0 0.2rem 0.1rem;
}
</style>
