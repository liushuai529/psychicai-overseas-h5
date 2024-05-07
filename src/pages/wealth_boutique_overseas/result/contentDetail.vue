<template>
  <div class="shadow">
    <img class="title" :src="title_url" alt />
    <div v-if="index == 2" class="content">
      <p class="bold">总体运势-{{ data.title }}</p>
      <p>财运详解： {{ data.desc }}</p>
    </div>
    <div v-if="index == 5" class="content">
      <p class="bold">正财：</p>
      <p>
        主业收入所得，通常为靠付出劳动获得的对等收入。上班族指单位里的正经工作做生意者指投入主要精力长期经营的事业、买卖生意等
      </p>
      <p class="bold" style="margin-top: 0.3rem">2023年正财财运：</p>
      <p>{{ data.zc }}</p>
      <p class="bold" style="margin-top: 0.3rem">偏财：</p>
      <p>
        副业收入所得，通常为投入财力或精力较少，但是能获得丰富回报的不对等收入。做生意者指主业外出现的其他方面的机遇，上班族一般指投资、股票、理财等。
      </p>
      <p class="bold" style="margin-top: 0.3rem">2023偏财财运：</p>
      <p>{{ data.pc }}</p>
    </div>
    <div v-if="index == 6 || index == 7" class="content">{{ data }}</div>
    <div v-if="index == 8 || index == 9" class="content content-bg-red">
      {{ data }}
    </div>
    <div v-if="index == 4" class="content special">
      <div class="chart">
        <div class="chart-ylabel">
          <p>有财</p>
          <p>尚可</p>
          <p>中平</p>
          <p>平平</p>
          <p>欠佳</p>
        </div>
        <canvas ref="myChart" id="myChart" style></canvas>
      </div>
      <div class="fenyue-content">
        <p>分月财运解析：</p>
        <p>有财—财运很好，进财几率很高，求财成功可能较大。</p>
        <p>尚可—财运较好，有一定进益，但不可抱太高期望。</p>
        <p>中平—财运尚可，可通过努力求财，收获与付出成正比。</p>
        <p>平平—财运一般，可能入不敷出，求财需思虑周详。</p>
        <p>欠佳—财运不佳，有破财可能，求财需格外谨慎。</p>
      </div>
    </div>
    <div v-if="index == 3" class="content content-bg-red">
      <p class="fenyue">
        <span>1月</span>
        <span>2月</span>
        <span>3月</span>
        <span>4月</span>
        <span>5月</span>
        <span>6月</span>
      </p>
      <p class="fenyue">
        <span>{{ fenyue_arr[data[0]] }}</span>
        <span>{{ fenyue_arr[data[1]] }}</span>
        <span>{{ fenyue_arr[data[2]] }}</span>
        <span>{{ fenyue_arr[data[3]] }}</span>
        <span>{{ fenyue_arr[data[4]] }}</span>
        <span>{{ fenyue_arr[data[5]] }}</span>
      </p>
      <p class="fenyue">
        <span>7月</span>
        <span>8月</span>
        <span>9月</span>
        <span>10月</span>
        <span>11月</span>
        <span>12月</span>
      </p>
      <p class="fenyue">
        <span>{{ fenyue_arr[data[6]] }}</span>
        <span>{{ fenyue_arr[data[7]] }}</span>
        <span>{{ fenyue_arr[data[8]] }}</span>
        <span>{{ fenyue_arr[data[9]] }}</span>
        <span>{{ fenyue_arr[data[10]] }}</span>
        <span>{{ fenyue_arr[data[11]] }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

import title_2 from '../../../assets/img/mlxz/2023tnys/result/content_title_2.png';
import title_3 from '../../../assets/img/mlxz/2023tnys/result/content_title_3.png';
import title_4 from '../../../assets/img/mlxz/2023tnys/result/content_title_4.png';
import title_5 from '../../../assets/img/mlxz/2023tnys/result/content_title_6.png';
import title_6 from '../../../assets/img/mlxz/2023tnys/result/content_title_7.png';
import title_7 from '../../../assets/img/mlxz/2023tnys/result/content_title_8.png';
import title_8 from '../../../assets/img/mlxz/2023tnys/result/content_title_9.png';
import title_9 from '../../../assets/img/mlxz/2023tnys/result/content_title_10.png';

export default {
  props: ['data', 'index', 'title'],
  data() {
    return {
      title_2,
      title_3,
      title_4,
      title_5,
      title_6,
      title_7,
      title_8,
      title_9,
      fenyue_arr: ['欠佳', '平平', '中平', '尚可', '有财'],
      chartData: [
        {
          Month: '1月',
          Score: this.data[0],
        },
        {
          Month: '2月',
          Score: this.data[1],
        },
        {
          Month: '3月',
          Score: this.data[2],
        },
        {
          Month: '4月',
          Score: this.data[3],
        },
        {
          Month: '5月',
          Score: this.data[4],
        },
        {
          Month: '6月',
          Score: this.data[5],
        },
        {
          Month: '7月',
          Score: this.data[6],
        },
        {
          Month: '8月',
          Score: this.data[7],
        },
        {
          Month: '9月',
          Score: this.data[8],
        },
        {
          Month: '10月',
          Score: this.data[9],
        },
        {
          Month: '11月',
          Score: this.data[10],
        },
        {
          Month: '12月',
          Score: this.data[11],
        },
      ],
    };
  },
  mounted() {
    if (this.index == 4) {
      this.chartData[0].Score = this.data[0];
      this.chartData[1].Score = this.data[1];
      this.chartData[2].Score = this.data[2];
      this.chartData[3].Score = this.data[3];
      this.chartData[4].Score = this.data[4];
      this.chartData[5].Score = this.data[5];
      this.chartData[6].Score = this.data[6];
      this.chartData[7].Score = this.data[7];
      this.chartData[8].Score = this.data[8];
      this.chartData[9].Score = this.data[9];
      this.chartData[10].Score = this.data[10];
      this.chartData[11].Score = this.data[11];
      this.chart(this.chartData);
    }
  },
  watch: {
    // data (newval,oldval) {
    //     this.chartData.forEach((item,index)=>{
    //         item.Score=newval[index];
    //     })
    //    this.chart(this.chartData);
    // }
  },
  methods: {
    chart(chartData) {
      let _color = '#676152';
      let labelArr = [];
      let dataArr = [];
      for (var i = 0, len = chartData.length; i < len; i++) {
        labelArr.push(chartData[i].Month);
        dataArr.push(chartData[i].Score);
      }
      // 获取canvas dom元素
      let ctx = this.$refs.myChart;
      // chart.js 配置项
      let options = {
        type: 'line',
        data: {
          labels: labelArr,
          datasets: [
            {
              data: dataArr,
              backgroundColor: ['transparent'],
              borderWidth: 2,
              pointBackgroundColor: '#578ca3',
              lineTension: 0,
              pointStyle: 'circle',
              borderColor: '#578ca3',
              radius: 4,
            },
          ],
        },

        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 10,
              bottom: 0,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  fontColor: _color,
                },
                gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
                },

                display: false,
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: _color,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: true,
            bodyFontColor: '#fff',
            displayColors: false,
            callbacks: {
              label: function (tooltipItem, chart) {
                if (tooltipItem.xLabel.substring(0, 1) == '0') {
                  tooltipItem.xLabel = tooltipItem.xLabel.slice(1);
                }
                return (
                  tooltipItem.xLabel + '运势 : ' + tooltipItem.yLabel + '分'
                );
              },
              title() {
                return [];
              },
            },
          },
        },
      };
      // 实例化一个chart对象
      let myChart = new Chart(ctx, options);
    },
  },
  computed: {
    title_url() {
      return this['title_' + this.index];
    },
    isAndroid() {
      const user_agent = navigator.userAgent.toLocaleLowerCase();
      return /android/i.test(user_agent);
    },
  },
};
</script>

<style scoped>
.shadow {
  /* margin-top: 0.4rem; */
  text-align: center;
}

div.title {
  width: 4.74rem;
  line-height: 0.54rem;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  margin-bottom: 0.4rem;
  color: #fff;
  font-size: 0.36rem;
  text-align: center;
  letter-spacing: 0.08rem;
  font-family: 'FZQKBYSJW';
  font-weight: 300;
}

div.android-title {
  line-height: 0.6rem;
}

img.title {
  width: 4.4rem;
  vertical-align: top;
  margin-top: 0.6rem;
}

.content {
  color: #d62d44;
  font-size: 0.32rem;
  background-color: #f4e5c2;
  padding: 0.3rem;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  line-height: 0.54rem;
  text-align: left;
  line-height: 2;
}

.bold {
  font-weight: bold;
}

.fenyue {
  display: flex;
  justify-content: space-around;
}

.fenyue span {
  width: 1rem;
  text-align: center;
}

.special {
  padding: 0rem;
  background-color: transparent;
}

.content-bg-red {
  background-color: #d62d44;
  color: #f4e5c2;
  border: 0.02rem solid #f4e5c2;
}

.chart {
  height: 3.4rem;
  overflow: auto;
  background-color: #f4e5c2;
  padding: 0.2rem;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
}

.chart-ylabel {
  width: 10%;
  float: left;
  height: 87%;
  font-size: 0.12rem;
  color: #676152;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: -1px;
}

#myChart {
  width: 90% !important;
  height: 100% !important;
  float: left;
}

.fenyue-content {
  margin-top: 0.4rem;
  color: #f4e5c2;
  border: 0.02rem dashed #f4e5c2;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  padding: 0.3rem;
  font-size: 0.25rem;
}
</style>
