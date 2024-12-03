<template>
  <div class="calendar-picker">
    <div class="picker-shadow" @click="cancel()"></div>
    <div class="picker-container">
      <div class="header">
        <img
          @click="cancel()"
          class="close"
          src="../assets/img/common/liu_icon_dialog_no.webp"
          alt=""
        />
        <div class="check-box">
          <div class="common-tab active-tab">{{ $t('gongli-label') }}</div>
          <div @click="showNongli()" class="common-tab">
            {{ $t('nongli-label') }}
          </div>
        </div>
        <img
          src="../assets/img/common/liu_icon_dialog_yes.webp"
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
import Picker from './Picker';
import utils from '../libs/utils.js';
let pick_timer;

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
            text: i >= 10 ? i + '月' : '0' + i + '月',
          });
        }
        return month;
      })(),
      sele_month: new Date().getMonth() + 1,
      sele_year: new Date().getFullYear(),

      cn_hour_col: (() => {
        return [
          {
            value: '-1',
            text: '未知时间',
          },
          {
            value: '0',
            text: '23:00-00:59（子）',
          },
          {
            value: '2',
            text: '01:00-02:59（丑）',
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
      language: utils.getLanguage('language'),
    };
  },
  props: {
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
      return this.$store.state.current_info.year - 25;
    },
    current_month() {
      return this.$store.state.current_info.month;
    },
    current_date() {
      return this.$store.state.current_info.date;
    },
    date_col() {
      let date = [];
      let len = getDaysInOneMonth(this.sele_year, this.sele_month) + 1;

      for (let i = 1; i < len; i++) {
        date.push({
          value: i,
          text: i >= 10 ? i + '日' : '0' + i + '日',
        });
      }
      function getDaysInOneMonth(year, month) {
        month = parseInt(month, 10);
        var d = new Date(year, month, 0);
        return d.getDate();
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
    // 起始时间不能大于结束时间
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
  },
  methods: {
    // 展示农历
    showNongli() {
      this.$parent.show_nongli = true;
    },
    // 关闭
    cancel() {
      this.$parent.closePicker();
    },
    // 提交
    submit() {
      let selected = {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour'),
      };

      let timestamp =
        selected.year +
        '年' +
        selected.month +
        '月' +
        selected.date +
        '日' +
        ' ' +
        utils.formateNongliHour(selected.birth_hour);
      this.$parent.picker_date = timestamp;
      this.$parent.picker_date_obj = selected;
      this.$parent.gongli_nongli = '1';
      // 关闭
      this.$parent.closePicker();
    },

    // 返回选择的时间对象
    getPickerDateObj() {
      return {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour'),
      };
    },

    // 返回选择的时间
    getPickerDate() {
      let selected = {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour'),
      };
      console.log('this.getValue("hour")', this.getValue('hour'));
      return (
        selected.year +
        '年' +
        selected.month +
        '月' +
        selected.date +
        '日' +
        ' ' +
        utils.formateNongliHour(selected.birth_hour)
      );
    },

    // 获取值
    getValue(type) {
      let col = this.$children;
      for (let i = 0; i < col.length; i++) {
        if (col[i].name == type && col[i].getValue) {
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
  /* width: 33.3% !important; */
  // width: 25% !important;
}

.all-day {
  /* width: 33.3% !important; */
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
