<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-06-05 11:30:04
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-06-05 16:56:29
 * @Description: 多买多折扣倒计时
-->
<template>
  <div class="timer-box">
    <div class="left">
      <img
        src="../../../assets/img/new_combine/home_icon_daojishi.png"
        class="clock"
        alt=""
      />
      <div class="tips1">{{ tips1 }}</div>
    </div>
    <div class="right">
      <count-down
        ref="countDown"
        :time="time_"
        millisecond
        class="time-box"
        @change="getTime"
      >
        <template #default="timeData">
          <span
            :class="{
              block: true,
              'rgb-light': is_show_shandong,
            }"
            >{{ timeData.minutes | filterTime }}</span
          >
          <span :class="{ colon: true, 'rgb-color': is_show_shandong }">:</span>
          <span
            :class="{
              block: true,
              'rgb-light': is_show_shandong,
            }"
            >{{ timeData.seconds | filterTime }}</span
          >
          <span :class="{ colon: true, 'rgb-color': is_show_shandong }">:</span>

          <span
            :class="{
              block: true,
              'rgb-light': is_show_shandong,
            }"
          >
            <span>
              {{ timeData.milliseconds | filterTime }}
            </span>
          </span>
        </template>
      </count-down>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils';
import { CountDown } from 'vant';

const tipsArr1 = {
  'zh-CN': '优惠倒计时',
  'zh-TW': '優惠倒計時',
};
export default {
  name: 'TimeDown',
  props: {
    is_show: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => [],
    },

    time_key: {
      type: Number,
      default: 3,
    },
    count_time: {
      type: Number,
      default: 15 * 60 * 1000,
    },
  },
  components: {
    CountDown,
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
    filterTime(val_) {
      let val = val_.toString();
      if (val.length === 1) {
        return '0' + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    },
  },
  data() {
    return {
      tips1: tipsArr1[utils.getLanguage()],
      time_: this.count_time,
      is_show_shandong: false,
    };
  },
  computed: {
    is_show_time() {
      return this.list.every(item => item.product_key);
    },
  },
  watch: {},
  mounted() {},
  methods: {
    getTime(val) {
      const { minutes, seconds, milliseconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      if (seconds !== this.second_) {
        if (this.time_key === 3) {
          localStorage.setItem('mlxz_combine_3', time_);
        } else {
          localStorage.setItem('mlxz_combine_2', time_);
        }
      }
      this.second_ = seconds;

      this.is_show_shandong = time_ < 60 * 1000;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time_ = 0;
        if (this.$refs.countDown) {
          this.$refs.countDown.pause();
          this.$refs.countDown.reset();
        }
      }
    },
    restartTime(val) {
      this.time_ = val;
      if (this.$refs.countDown) {
        console.log(this.$refs.countDown);
        this.$refs.countDown.reset();
        this.$refs.countDown.start();
      }
    },
  },
};
</script>

<style scoped lang="less">
.timer-box {
  width: 100%;
  height: 0.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.24rem;
  margin: 0.24rem auto;
  .left {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 0.3rem;
    color: #e24c2e;
    .clock {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.1rem;
    }
    .tips1 {
      height: 0.3rem;
      line-height: 0.3rem;
    }
  }
  .right {
    font-weight: 600;
  }
}

.colon {
  margin: 0 0.02rem;
  display: flex;
  align-items: center;
  color: #e24c2e;
  font-size: 0.26rem;
}

.block {
  width: 0.4rem;
  height: 100%;
  font-size: 0.26rem;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  background-color: #e24c2e; /* 初始背景色 */
}
.time-box {
  height: 0.4rem;
  display: flex;
}
@keyframes noticeTime {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.mill {
  animation: noticeTime 0.24s infinite;
}

@keyframes rgb-light {
  0% {
    background-color: #e24c2e;
  }
  33.333% {
    background-color: #f5ae00;
  }
  66.666% {
    background-color: #662cf3;
  }
  100% {
    background-color: #e24c2e;
  }
}

.rgb-light {
  animation: rgb-light 720ms infinite linear;
}

.rgb-color {
  animation: rgb-text 720ms infinite linear;
}
@keyframes rgb-text {
  0% {
    color: #e24c2e;
  }
  33.333% {
    color: #f5ae00;
  }
  66.666% {
    color: #662cf3;
  }
  100% {
    color: #e24c2e;
  }
}
</style>
