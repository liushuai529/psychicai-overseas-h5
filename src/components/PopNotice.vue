<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-23 10:03:54
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-23 14:03:15
 * @Description: 
-->
<template>
  <div class="pop-notice">
    <div :class="{ container: true, 'cn-bg': lang, 'tw-bg': !lang }">
      <div class="one">
        <img :src="getIcon()" class="logo" lt="" />
        <div class="right">
          <div class="title">{{ title }}</div>
          <div class="name">name</div>
          <div class="birth">birth</div>
        </div>
      </div>
      <div class="divider">
        <div v-for="it in 50" :key="it" class="line"></div>
      </div>
      <count-down
        style="display: none"
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
            >{{ timeData.milliseconds | filterTime }}</span
          >
        </template>
      </count-down>
      <img
        @click="closeModal"
        src="../assets/img/pop/icon_close.png"
        class="close"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import utils from '../libs/utils';
import { CountDown } from 'vant';
import { banner_enums, reportName } from '../libs/enum';
export default {
  name: 'PopNotice',
  props: {
    close: {
      type: Function,
      default: () => {},
    },
    count_down: {
      type: Number,
      default: 0,
    },
    product_key: {
      type: String,
      default: '',
    },
  },
  components: {
    CountDown,
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

  data() {
    return {
      time_: 0,
      is_show_shandong: false,
      is_show_daoqi: false,
      title: '',
    };
  },
  created() {
    this.time_ = this.count_down;
    let name_obj = reportName[this.product_key];
    this.title = this.lang ? name_obj.cn : name_obj.tw;
    this.getUserInfo();
  },
  computed: {
    lang() {
      return utils.getLanguage();
    },
  },
  methods: {
    getIcon() {
      let obj = banner_enums[this.product_key].small;
      return this.lang ? obj.cn : obj.tw;
    },
    closeModal() {
      this.$emit('close');
    },
    getTime(val) {
      const { minutes, seconds, milliseconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time_ = 1;
        this.$refs.countDown.pause();
        this.$refs.countDown.reset();
      }
    },
    getUserInfo() {
      let user_info = JSON.parse(
        localStorage.getItem(`mlxz_user_info_${this.product_key}`)
      );
      console.log(user_info);
    },
  },
};
</script>

<style scoped lang="less">
.pop-notice {
  width: 100%;
  height: 100vh;
  background: rgb(17 17 17 / 70%);
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
  .container {
    width: 6.3rem;
    height: 6.34rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 1.77rem;
    .close {
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      bottom: -1.2rem;
    }

    .one {
      display: flex;
      width: 100%;
      padding-left: 0.64rem;
      .logo {
        width: 1.66rem;
        height: 1.66rem;
        margin-right: 0.25rem;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title {
          width: 100%;
          font-size: 0.36rem;
          font-weight: 600;
          height: 0.35rem;
          line-height: 0.36rem;
          color: #5b3825;
          margin-top: 0.16rem;
        }
        .name {
          width: 100%;
          height: 0.3rem;
          font-weight: 600;
          font-size: 0.3rem;
          color: #726056;
          line-height: 0.3rem;
          margin-top: 0.26rem;
        }
        .birth {
          width: 100%;
          height: 0.26rem;
          font-weight: 400;
          font-size: 0.26rem;
          color: #726056;
          line-height: 0.26rem;
          margin-top: 0.16rem;
        }
      }
    }
    .divider {
      width: 5.02rem;
      height: 1px;
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      margin: 0.24rem auto;
      .line {
        width: 0.2rem;
        height: 100%;
        border-radius: 0.1rem;
        margin-right: 0.03rem;
        background: #ebd1b4;
      }
    }
  }
}

.cn-bg {
  background: url('../assets/img/pop/cn/youhui.png') no-repeat;
  background-size: contain;
}
.tw-bg {
  background: url('../assets/img/pop/cn/youhui.png') no-repeat;
  background-size: contain;
}

.colon {
  margin: 0 0.02rem;
  display: flex;
  align-items: center;
  color: #e24c2e;
}
.block {
  width: 0.48rem;
  height: 100%;
  font-size: 0.26rem;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #e24c2e; /* 初始背景色 */
}
.desc {
  display: flex;
  flex-direction: row;
  height: 0.4rem;
}

.count-down {
  height: 100%;
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
