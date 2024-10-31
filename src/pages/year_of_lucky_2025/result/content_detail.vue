<template>
  <div :class="`content-item ${[1, 2, 4, 10].includes(item_index) ? 'item-1-bg' : 'item-normal-bg'
    }`">
    <img class="title-box" :src="titleImg" alt="" />
    <div v-if="item_index === 1" class="content">
      <div class="item-tag">
        <div class="score">{{ `${result.nianscore ? result.nianscore: '' }分` }}</div>
        <div class="year">{{ `${result.gold2024}之年` }}</div>
      </div>
      <div v-html="result.whole2024"></div>
    </div>
    <div v-else-if="item_index === 2" class="content-2">
      <div style="display: flex;">
        <div class="item-box">
        <div class="tip">{{ $t('kaiyun-label') }}</div>
        <img :src="getDirection(result.guide2024direction)" class="baoshi" alt="" />
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
      <div class="content">{{ getText(result) }}</div>
    </div>
    <div v-else-if="item_index === 3" class="content">
      <div v-html="result.xinggedesc" ></div>
      <div v-html="result.gejuall" ></div>
    </div>
    
    <div v-else-if="item_index === 4" class="content-4 content">
     
      <!-- <div class="year-title">今年是你的{{ result.gold2024 }}之年</div>
      <div>
        {{ result.gold2024content }}
      </div>
      <div>{{ result.whole2024 }}</div> -->
      <div class="taisui-container">
        <!-- <div class="tag"> -->
          <img :src="getImage()"/>
        <!-- </div> -->
        <div class="text">{{ result.taisuititle }}</div>
      </div> 
      <div v-html="result.taisuidesc"></div>
    </div>
    <div v-else-if="item_index === 10" class="content">
      <div id="echarts" class="echarts"></div>
      <div v-if="result.scores2024content.length >1" class="red-black-container">
        <img :src="is_cn ? honghei_cn_1x: honghei_tw_1x"/>
        <div class="card-container">
          <div class="item-container">
            <div class="head">
              <img :src="result_icon_gou_cn"/>
              <div>{{ is_cn? '好运连连': '好運連連' }}</div>
            </div>
            <div class="content">
              <div class="month">{{`${result.scores2024content[0].month}月`}}</div>
              <div class="text">{{`${result.scores2024content[0].content}`}}</div>
            </div>
          </div>
          <div class="item-container" style="background: #F7E4D4;">
            <div class="head head1">
              <img :src="result_icon_tan_cn_1x"/>
              <div>{{ is_cn? '警惕注意': '警惕註意' }}</div>
            </div>
            <div class="content">
              <div class="month">{{`${result.scores2024content[1].month}月`}}</div>
              <div class="text">{{`${result.scores2024content[1].content}`}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else v-html="result.scores2024content[0].content" class="content"></div>
    </div> 
    <div v-else class="content">
      {{ result }}
    </div>
  </div>
</template>
<script>
import title1 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_01_cn_1x.webp';
import title2 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_02_cn_1x.webp';
import title3 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_03_cn_1x.webp';
import title4 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_04_cn_1x.webp';
import title5 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_05_cn_1x.webp';
import title6 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_06_cn_1x.webp';
import title7 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_07_cn_1x.webp';
import title8 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_08_cn_1x.webp';
import title9 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_09_cn_1x.webp';
import title10 from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_10_cn_1x.webp';

import tw_title1 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_01_tw_1x.webp';
import tw_title2 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_02_tw_1x.webp';
import tw_title3 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_03_tw_1x.webp';
import tw_title4 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_04_tw_1x.webp';
import tw_title5 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_05_tw_1x.webp';
import tw_title6 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_06_tw_1x.webp';
import tw_title7 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_07_tw_1x.webp';
import tw_title8 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_08_tw_1x.webp';
import tw_title9 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_09_tw_1x.webp';
import tw_title10 from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_10_tw_1x.webp';

import honghei_cn_1x from './../../../assets/img/year_of_lucky_2025/cn/result_img_tittle_honghei_cn_1x.webp';
import honghei_tw_1x from './../../../assets/img/year_of_lucky_2025/tw/result_img_tittle_honghei_tw_1x.webp';

import result_icon_gou_cn from './../../../assets/img/year_of_lucky_2025/result_icon_gou_cn.webp';
import result_icon_tan_cn_1x from './../../../assets/img/year_of_lucky_2025/result_icon_tan_cn_1x.webp';

import hou from './../../../assets/img/year_of_lucky_2025/result_img_shengxiao_hou_1x.webp';
import hu from './../../../assets/img/year_of_lucky_2025/result_img_shengxiao_hu_1x.webp';
import she from './../../../assets/img/year_of_lucky_2025/result_img_shengxiao_she_1x.webp';
import zhu from './../../../assets/img/year_of_lucky_2025/result_img_shengxiao_zhu_1x.webp';

// import * as echarts from 'echarts';
import { color_enums, icon_enums } from '../../../libs/enum';

import directionIcon1 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_1@3x.webp';
import directionIcon2 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_2@3x.webp';
import directionIcon3 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_3@3x.webp';
import directionIcon4 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_4@3x.webp';
import directionIcon5 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_5@3x.webp';
import directionIcon6 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_6@3x.webp';
import directionIcon7 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_7@3x.webp';
import directionIcon8 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_8@3x.webp';

import cn_guiren from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_1@3x.webp';
import tw_guiren from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_1.webp';

import cn_taohua from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_2@3x.webp';
import tw_taohua from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_2.webp';

import cn_benbo from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_3@3x.webp';
import tw_benbo from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_3.webp';

import cn_yangsheng from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_4@3x.webp';
import tw_yangsheng from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_4.webp';

import cn_xiuxing from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_5@3x.webp';
import tw_xiuxing from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_5.webp';

import cn_tiba from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_6@3x.webp';
import tw_tiba from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_6.webp';

import cn_tisheng from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_7@3x.webp';
import tw_tisheng from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_7.webp';

import cn_qinmian from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_8@3x.webp';
import tw_qinmian from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_8.webp';

import cn_jiaoji from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_9@3x.webp';
import tw_jiaoji from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_9.webp';

import cn_shenzao from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_10@3x.webp';
import tw_shenzao from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_10.webp';

import cn_dandang from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_11@3x.webp';
import tw_dandang from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_11.webp';

import cn_wuyou from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_12@3x.webp';
import tw_wuyou from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_12.webp';

import cn_pinshun from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_13@3x.webp';
import tw_pinshun from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_13.webp';

import cn_xiuxian from './../../../assets/img/mlxz/year_of_lucky_2024/title/result_title_nian_14@3x.webp';
import tw_xiuxian from '../../../assets/img/tw_mlxz/year_24/result/result_title_nian_14.webp';
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
      hou,
      hu,
      she,
      zhu,
      result_icon_gou_cn,
      result_icon_tan_cn_1x,
      honghei_cn_1x,
      honghei_tw_1x,
      title1,
      title2,
      title3,
      title4,
      title5,
      title6,
      title7,
      title8,
      title9,
      title10,
      tw_title1,
      tw_title2,
      tw_title3,
      tw_title4,
      tw_title5,
      tw_title6,
      tw_title7,
      tw_title8,
      tw_title9,
      tw_title10,
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
      if (this.item_index === 10) {
        this.getEcharts();
      }
    });
    
  },
  methods: {
    getText(result) {
      if(this.is_cn) {
        return `25年你日常出行或旅行适合去【${result.guide2024direction}】，日常穿搭适合的颜色为【${result.guide2024color}】，也可以搭配【${result.guide2024decoration}】作为装饰，这些都有利于提升你25年的整体运势。`
      } else {
        return `25年你日常出行或旅行適合去【${result.guide2024direction}】，日常穿搭適合的顏色為【${result.guide2024color}】，也可以搭配【${result.guide2024decoration}】作為裝飾，這些都有利於提升你25年的整體運勢。`
      }
    },
    getImage() {
      let taisuititle = this.result.taisuititle;
        if(taisuititle.indexOf('猴')>-1) {
          return this.hou;
        } else if (taisuititle.indexOf('虎')>-1) {
          return this.hu;
        } else if (taisuititle.indexOf('蛇')>-1) {
          return this.she;
        } else if (taisuititle.indexOf('猪')>-1 || taisuititle.indexOf('豬')>-1) {
          return this.zhu;
        }
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
              color: '#FE3A3A',
            },
            data: self.result.scores2024,
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FFCCC0',
                },
                {
                  offset: 1,
                  color: '#FFCCC0',
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
  background: url('../../../assets/img/year_of_lucky_2025/img_cardbj_1x.webp') no-repeat;
}

.item-normal-bg {
  background: url('../../../assets/img/year_of_lucky_2025/img_cardbj_xinxi.webp') no-repeat;
}

.content-item {
  width: 7.1rem;
  min-height: 3rem;
  background-size: 100% 100%;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 0.4rem 0.3rem;

  .title-box {
    height: 1rem;
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


    .item-tag {
      width: 5rem;
      height: 1.85rem;
      background: #FFE6DB;
      border-radius: 0.2rem;
      border: 0.02rem solid #FD8E8E;
      margin: auto;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      margin-bottom: 0.3rem;
      .score {
        font-weight: 500;
        font-size: 0.6rem;
        color: #DF2113;
        text-align: center;
        font-style: normal;
        text-transform: none;
        line-height: 0.9rem;
      }

      .year {
        font-weight: 500;
        font-size: 0.3rem;
        color: #DF2113;
        text-align: center;
        font-style: normal;
        text-transform: none;
        line-height: 0.45rem;
      }
    }
    .taisui-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: auto;
      img {
        width: 2.28rem;
        height: 2.28rem;
      }
      .tag {
        width: 2.28rem;
        height: 2.28rem;
        background: #FFE6DB;
        border-radius: 0.16rem;
        border: 0.02rem solid #FD8E8E;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 1.88rem;
          height: 1.88rem;
        }
      }
      .text {
        font-weight: 600;
        font-size: 0.32rem;
        color: #DF2113;
        line-height: 0.48rem;
        text-align: center;
        font-style: normal;
        text-transform: none;
        margin-top: 0.3rem;
        margin-bottom: 0.2rem;
      }
    }
    .red-black-container {
      width: 6.5rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;
      img {
        width: 6.5rem;
      }
      .card-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .item-container {
          width: 3.13rem;
          background: #FFECE6;
          border-radius: 0.2rem;
          border: 0.02rem solid #E14210;
          .head {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.81rem;
            background: #E14210;
            border-radius: 0.1rem 0.1rem 0rem 0rem;
            font-weight: 600;
            font-size: 0.34rem;
            color: #FFFFFF;
            line-height: 0.51rem;
            img {
              width: 0.39rem;
              height: 0.39rem;
              margin-right: 0.12rem;
            }
          }
          .head1 {
            background: #F67600; 
          }
          .content {
            // background: #FFECE6;
            .month {
              font-weight: 600;
              font-size: 0.36rem;
              color: #E14210;
              line-height: 0.54rem;
              text-align: center;
            }
            .text {
              font-weight: 400;
              margin: 0.1rem;
            }
          }
        }
      }
    
    }
  }
}

.content-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.36rem;
  flex-direction: column;



  .item-box {
    width: 1.82rem;
    height: 2.18rem;
    background: #FFE6DB;
    border-radius: 0.16rem;
    border: 0.02rem solid #FD8E8E;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
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
