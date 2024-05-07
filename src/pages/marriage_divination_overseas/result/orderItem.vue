<template>
  <div class="order-item">
    <img
      class="title"
      src="./../../../assets/img/marriage_divination_overseas/result/qiguashijian.png"
    />
    <div class="content">
      <div class="item">
        <span class="sub-title">公历时间：</span>
        <span class="words">{{ gongli_time }}</span>
      </div>
      <div class="item">
        <span class="sub-title">农历时间：</span>
        <span class="words">{{ nongli_time }}</span>
      </div>
      <div class="item">
        <span class="sub-title">干支时间：</span>
        <span class="words">{{ ganzhi_time }}</span>
      </div>
      <!--
                <div class="item">
                    <span class="sub-title">旬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;空：</span>
                    <span class="words">2018年01月25日15时08分</span>
                </div>
            -->
    </div>
  </div>
</template>

<script>
import wnl from '../../../libs/suishen.wnl.js';
import huangli_utils from '../../../libs/haungli_utils.js';

export default {
  props: ['createtime'],
  data() {
    return {
      // 農历数字时间
      nongli_num: null,
      // 農历字符串时间
      nongli_str: null,
      // 陰历时间
      gongli_time: '',
      // 農历时间
      nongli_time: '',
      // 干支时间
      ganzhi_time: '',
    };
  },
  mounted() {
    // 时间不確定怎么取值
    let _date = new Date(this.createtime);
    let year = _date.getFullYear();
    let month = _date.getMonth() + 1;
    let date = _date.getDate();
    let hour = _date.getHours();
    let minute = _date.getMinutes();
    let obj = {
      year: year,
      month: month,
      date: date,
    };

    this.nongli_num = wnl.calGongliToNongli(year, month, date);
    this.nongli_str = huangli_utils.getHuangliInfo(obj);
    // 计算公历时间
    let gongli_month = month < 10 ? '0' + month : month;
    let gongli_date = date < 10 ? '0' + date : date;
    let gongli_hour = hour < 10 ? '0' + hour : hour;
    let gongli_minute = minute < 10 ? '0' + minute : minute;
    this.gongli_time =
      year +
      '年' +
      gongli_month +
      '月' +
      gongli_date +
      '日' +
      gongli_hour +
      '时' +
      gongli_minute +
      '分';

    // 计算農历时间
    let nongli_year_info =
      this.nongli_str.huangli.huangli_another_info.split(' ');
    let nongli_month_info = this.nongli_str.nongli.date;
    this.nongli_time =
      nongli_year_info[0] + nongli_month_info + this.transHour(hour);

    // 干支时间
    this.ganzhi_time = this.nongli_str.huangli.huangli_info;
  },
  computed: {},
  methods: {
    transHour(val) {
      let result = '';
      switch (val) {
        case 0:
          result = '子时';
          break;
        case 1:
          result = '丑时';
          break;
        case 2:
          result = '丑时';
          break;
        case 3:
          result = '寅时';
          break;
        case 4:
          result = '寅时';
          break;
        case 5:
          result = '卯时';
          break;
        case 6:
          result = '卯时';
          break;
        case 7:
          result = '辰时';
          break;
        case 8:
          result = '辰时';
          break;
        case 9:
          result = '巳时';
          break;
        case 10:
          result = '巳时';
          break;
        case 11:
          result = '午时';
          break;
        case 12:
          result = '午时';
          break;
        case 13:
          result = '未时';
          break;
        case 14:
          result = '未时';
          break;
        case 15:
          result = '申时';
          break;
        case 16:
          result = '申时';
          break;
        case 17:
          result = '酉时';
          break;
        case 18:
          result = '酉时';
          break;
        case 19:
          result = '戌时';
          break;
        case 20:
          result = '戌时';
          break;
        case 21:
          result = '亥时';
          break;
        case 22:
          result = '亥时';
          break;
        case 23:
          result = '子时';
          break;
      }
      return result;
    },
  },
};
</script>

<style scoped>
.order-item {
  font-size: 0.28rem;
  background-color: #fdf5dd;
  -webkit-border-radius: 0.12rem;
  border-radius: 0.12rem;
  text-align: center;
  height: 3rem;
  color: #d13c3e;
  margin-top: 0.4rem;
}

.order-item .title {
  width: 1.5rem;
  padding: 0.34rem 0;
}

.item {
  font-size: 0.3rem;
  margin-bottom: 0.1rem;
  overflow: hidden;
}

.item .sub-title {
  float: left;
  width: 33%;
  text-align: right;
}
.item .words {
  float: left;
  text-align: left;
}
</style>
