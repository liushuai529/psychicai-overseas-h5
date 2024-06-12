<template>
  <div
    :class="{ 'fixed-order': true, 'move-right': !is_show_move }"
    :style="{
      top: top,
    }"
    @click="orderReport()"
  >
    <div class="title">
      {{ title }}
    </div>
    <div class="divider">
      <div v-for="it in 30" :key="it" class="line"></div>
    </div>
    <div :class="{ 'youhui-tips': true }">限时优惠</div>
    <count-down
      ref="countDown"
      :time="new_time"
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
          <!-- :class="{ mill: new_time === 1 }" -->
          <span>
            {{ timeData.milliseconds | filterTime }}
          </span>
        </span>
      </template>
    </count-down>
  </div>
</template>

<script>
import { reportName } from '../libs/enum';
import utils from '../libs/utils';
import { CountDown } from 'vant';
export default {
  name: 'FixedOrder',
  components: {
    CountDown,
  },
  props: {
    show_pop: {
      type: Boolean,
      default: false,
    },
    new_order_key: {
      type: String,
      default: '',
    },
    top: {
      type: String,
      default: '4.7rem',
    },
    name: {
      type: String,
      default: '',
    },
    last_order: {
      type: Object,
      default: () => {},
    },
    time: {
      type: Number,
      default: 0,
    },
    payOrder: {
      type: Function,
      default: () => {},
    },
    jumpDetail: {
      type: Function,
      default: () => {},
    },
    is_show_move: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  filters: {
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
  watch: {},
  data() {
    return {
      new_time: 0,
      is_show_shandong: false,
      is_show_daoqi: false,
      second_: null,
    };
  },
  computed: {},
  methods: {
    getTitle(val) {
      return val
        ? utils.getLanguage() === 'zh-CN'
          ? reportName[val].cn
          : reportName[val].tw
        : '';
    },

    getTime(val) {
      const { minutes, seconds, milliseconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      if (seconds !== this.second_) {
        if (this.name === 'api') {
          localStorage.setItem('mlxz_fixed_api_order_time', time_);
        } else {
          localStorage.setItem('mlxz_fixed_local_order_time', time_);
        }
      }
      this.second_ = seconds;

      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      this.new_time = time_;
      if (!minutes && !seconds && milliseconds < 10) {
        this.new_time = 0;
        if (this.$refs.countDown) {
          this.$refs.countDown.pause();
          this.$refs.countDown.reset();
        }
      }
    },
    async orderReport() {
      if (this.name === 'api') {
        this.$emit('payOrder');
        this.$refs.countDown.pause();
        await utils.asleep(3000);
        this.new_time = 15 * 60 * 1000;
        this.$refs.countDown.reset();
      } else {
        this.$emit('jumpDetail');
      }
    },
  },
  mounted() {
    this.new_time = this.time;
    // setInterval(() => {
    //   if (this.name === 'local') {
    //     this.new_time = +localStorage.getItem('mlxz_fixed_local_order_time');
    //     this.$refs.countDown.reset();
    //   }
    // }, 500);
  },
};
</script>

<style scoped lang="less">
@keyframes moveRight {
  0% {
    // opacity: 1;
    // right: -2.56rem;
    right: 0;
    opacity: 1;
    transition: right 0.5s;
  }

  100% {
    right: 0;
    opacity: 1;
    transition: right 0.5s;
  }
}
.move-right {
  animation: moveRight 0.5s forwards;
}
.fixed-order {
  width: 2.56rem;
  height: 1.9rem;
  background: url('../assets/img/pop/fix-pop.png') no-repeat;
  background-size: contain;
  position: fixed;
  right: 0;
  opacity: 0;
  z-index: 101;
  padding-top: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 90%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 0.28rem;
    font-weight: 600;
    font-size: 0.28rem;
    color: #5b3825;
    line-height: 0.28rem;
  }
  .divider {
    width: 2.08rem;
    height: 0.01rem;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    margin: 0.12rem auto;
    .line {
      width: 0.05rem;
      height: 100%;
      border-radius: 0.1rem;
      margin-right: 0.03rem;
      background: #ebd1b4;
    }
  }
  .youhui-tips {
    width: 90%;
    text-align: center;
    height: 0.28rem;
    font-weight: 600;
    font-size: 0.28rem;
    color: #e24c2e;
    line-height: 0.28rem;
    margin: 0 auto 0.12rem;
  }
}
.top-470 {
  top: 4.7rem;
}
.top-670 {
  top: 6.7rem;
}

.colon {
  margin: 0 0.02rem;
  display: flex;
  align-items: center;
  color: #e24c2e;
  font-size: 0.24rem;
}

.block {
  width: 0.4rem;
  height: 100%;
  font-size: 0.26rem;
  border-radius: 0.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #e24c2e; /* 初始背景色 */
  padding-top: 0.01rem;
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
