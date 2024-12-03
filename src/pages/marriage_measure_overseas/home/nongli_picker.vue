<template>
  <div class="calendar-picker">
    <div class="picker-shadow" @click="cancel()"></div>
    <div class="picker-container">
      <div class="header">
        <img
          @click="cancel()"
          class="close"
          src="../../../assets/img/common/liu_icon_dialog_no.webp"
          alt=""
        />
        <div class="check-box">
          <div @click="showGongli()" class="common-tab">
            {{ $t('gongli-label') }}
          </div>
          <div class="common-tab active-tab">{{ $t('nongli-label') }}</div>
        </div>
        <img
          src="../../../assets/img/common/liu_icon_dialog_yes.webp"
          class="right"
          @click="submit()"
        />
      </div>
      <div class="select">
        <Picker
          :data="year_col"
          :name="'year'"
          :value="year"
          :position="'left'"
        ></Picker>
        <Picker
          :data="month_col"
          :name="'month'"
          :value="month"
          :position="'left'"
        ></Picker>
        <Picker
          :data="date_col"
          :name="'date'"
          :value="date"
          :position="'left'"
        ></Picker>
        <Picker
          :data="language === 'zh-CN' ? cn_hour_col : tw_hour_col"
          :name="'hour'"
          :value="birth_hour"
          :position="'left'"
        ></Picker>
      </div>
    </div>
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
import wnl from './../../../libs/suishen.wnl.js';
import Picker from './../../../components/Picker';

let pick_timer;
const month_name = [
  '正月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '冬月',
  '腊月',
];
const date_name = [
  '初一',
  '初二',
  '初三',
  '初四',
  '初五',
  '初六',
  '初七',
  '初八',
  '初九',
  '初十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
  '十六',
  '十七',
  '十八',
  '十九',
  '二十',
  '廿一',
  '廿二',
  '廿三',
  '廿四',
  '廿五',
  '廿六',
  '廿七',
  '廿八',
  '廿九',
  '三十',
];

const today = new Date();
const today_year = today.getFullYear();
const today_month = today.getMonth() + 1;
const today_day = today.getDate();
const today_nongli_arr = wnl.calGongliToNongli(
  today_year,
  today_month,
  today_day
);

export default {
  name: 'calendar-picker',
  components: {
    Picker,
  },
  data() {
    return {
      month_col: (() => {
        let month = [];
        for (let i = 1; i < 13; i++) {
          month.push({
            value: i,
            text: month_name[i - 1],
          });
        }
        if (utils.getLanguage() === 'zh-TW') {
          month[month.length - 1].text = '臘月';
        }
        return month;
      })(),
      no_leap_month_col: (() => {
        let month = [];

        for (let i = 1; i < 13; i++) {
          month.push({
            value: i,
            text: month_name[i - 1],
          });
        }
        if (utils.getLanguage() === 'zh-TW') {
          month[month.length - 1].text = '臘月';
        }
        return month;
      })(),
      sele_month: new Date().getMonth() + 1,
      sele_year: new Date().getFullYear(),

      cn_hour_col: (() => {
        return [
          {
            value: '-1',
            text: '未知時間',
          },
          {
            value: '0',
            text: '23:00-00:59（子）',
          },
          {
            value: '2',
            text: '01:00-02:59（醜）',
          },
          {
            value: '4',
            text: '03:00-04:59（寅）',
          },
          {
            value: '6',
            text: '05:00-06:59（卯）',
          },
          {
            value: '8',
            text: '07:00-08:59（辰）',
          },
          {
            value: '10',
            text: '09:00-10:59（巳）',
          },
          {
            value: '12',
            text: '11:00-12:59（午）',
          },
          {
            value: '14',
            text: '13:00-14:59（未）',
          },
          {
            value: '16',
            text: '15:00-16:59（申）',
          },
          {
            value: '18',
            text: '17:00-18:59（酉）',
          },
          {
            value: '20',
            text: '19:00-20:59（戌）',
          },
          {
            value: '22',
            text: '21:00-22:59（亥）',
          },
        ];
      })(),
      tw_hour_col: (() => {
        return [
          {
            value: '-1',
            text: '未知時間',
          },
          {
            value: '0',
            text: '23:00-00:59（子）',
          },
          {
            value: '2',
            text: '01:00-02:59（醜）',
          },
          {
            value: '4',
            text: '03:00-04:59（寅）',
          },
          {
            value: '6',
            text: '05:00-06:59（卯）',
          },
          {
            value: '8',
            text: '07:00-08:59（辰）',
          },
          {
            value: '10',
            text: '09:00-10:59（巳）',
          },
          {
            value: '12',
            text: '11:00-12:59（午）',
          },
          {
            value: '14',
            text: '13:00-14:59（未）',
          },
          {
            value: '16',
            text: '15:00-16:59（申）',
          },
          {
            value: '18',
            text: '17:00-18:59（酉）',
          },
          {
            value: '20',
            text: '19:00-20:59（戌）',
          },
          {
            value: '22',
            text: '21:00-22:59（亥）',
          },
        ];
      })(),
      // birth_hour: 0,
      language: utils.getLanguage(),
    };
  },
  props: {
    male: {
      type: String, // male female
    },
    start: {
      default: '1900',
    },
    end: {
      default: '2100',
    },
    year: {
      default: '1995',
    },
    month: {
      default: new Date().getMonth(),
    },
    date: {
      default: new Date().getDate(),
    },
    birth_hour: {
      default: '-1',
    },
  },
  destroyed() {
    clearInterval(pick_timer);
  },
  mounted() {
    let self = this;

    pick_timer = setInterval(function () {
      self.sele_year = self.getValue('year');
      self.sele_month = self.getValue('month');
    }, 100);
  },
  computed: {
    year_col() {
      let year = [];
      let startSelectedYear = this.start || 1900;
      let endSelectedYear = this.end || 2100;

      for (let i = startSelectedYear; i <= endSelectedYear; i++) {
        year.push({
          value: i,
          text: i + '年',
        });
      }
      return year;
    },
    current_year() {
      return today_nongli_arr[0] - 25;
    },
    current_month() {
      return today_nongli_arr[1];
    },
    current_date() {
      return today_nongli_arr[2];
    },
    date_col() {
      let date = [];
      let len = wnl.monthDays(this.sele_year, this.sele_month) + 1;

      for (let i = 1; i < len; i++) {
        date.push({
          value: i,
          text: date_name[i - 1],
        });
      }

      return date;
    },
    sdate() {
      return this.$store.state.sdate;
    },
    edate() {
      return this.$store.state.edate;
    },
  },
  watch: {
    // 起始时間不能大於結束时間
    sdate(newV, oldV) {
      if (newV > this.edate) {
        this.$store.commit('setEdate', newV);
      }
    },
    edate(newV, oldV) {
      if (newV < this.sdate) {
        this.$store.commit('setSdate', newV);
      }
    },
    // sele_year (newV, oldV) {
    //     let leapMonth = wnl.leapMonth(this.sele_year);
    //     if(leapMonth != 0) {
    //         this.month_col.push({
    //             value: leapMonth,
    //             text: '閏' + month_name[leapMonth-1]
    //         });
    //         // 排序
    //         this.month_col.sort(function(a,b){
    //             var value1 = a.value;
    //             var value2 = b.value;
    //             return value1 - value2;
    //         });
    //     }else {
    //         this.month_col = this.no_leap_month_col;
    //     }
    //     // 向month_col 裏push 閏月
    // },
  },
  methods: {
    showGongli() {
      this.$parent.show_nongli = false;
      this.$parent.gongli_nongli = '1';
    },
    cancel() {
      this.$parent.closePicker();
    },
    submit() {
      let selected = {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour'),
      };

      let formateNongliMonth = utils.formateNongliMonth(selected.month);
      let formateNongliDate = utils.formateNongliDate(selected.date);

      // let timestamp = '農历 ' + selected.year + '年' + selected.month + '月' + selected.date + '日';
      let timestamp =
        selected.year +
        '年' +
        formateNongliMonth +
        formateNongliDate +
        ' ' +
        utils.formateNongliHour(selected.birth_hour);

      if (this.male == '1') {
        this.$parent.male.picker_date = timestamp;
        this.$parent.male.picker_date_obj = selected;
        this.$parent.male.gongli_nongli = '0';
      }
      if (this.male == '0') {
        this.$parent.female.picker_date = timestamp;
        this.$parent.female.picker_date_obj = selected;
        this.$parent.female.gongli_nongli = '0';
      }
      this.$parent.closePicker();
    },
    getValue(type) {
      let col = this.$children;
      for (let i = 0; i < col.length; i++) {
        if (col[i].name == type) {
          return col[i].getValue();
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.header {
  height: 0.72rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.28rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  padding: 0 0.3rem;
  margin-top: 0.3rem;
  .close,
  .right {
    width: 0.32rem;
    height: 0.32rem;
  }
  .check-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.16rem;
    height: 0.72rem;
    border-radius: 0.12rem;
    border: 0.02rem solid #b47835;
    color: #b47835;
    .common-tab {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active-tab {
      background: #b47835;
      color: #fff !important;
    }
  }
}

.calendar-picker {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5) !important;
  z-index: 999999;
  pointer-events: auto;
  margin-bottom: 0 !important;
}

.picker-shadow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999990;
}

.picker-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5.6rem;
  background-color: #fff;
  z-index: 9999999;
  -webkit-animation: slideup 0.2s linear forwards;
  animation: slideup 0.2s linear forwards;
}

.select {
  height: 4.72rem;
}
.calendar-picker .picker {
  // width: 25% !important;
}

.all-day {
  width: 25% !important;
}
.all-day .dw-li {
  text-align: center !important;
}
@keyframes slideup {
  0% {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes slideup {
  0% {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
