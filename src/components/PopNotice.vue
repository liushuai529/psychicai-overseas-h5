<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-23 10:03:54
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-24 11:52:57
 * @Description: 
-->
<template>
  <div class="pop-notice">
    <div @click="closeModal" class="whole">
      <div
        @click="e => e.stopPropagation()"
        :class="{
          container: true,
          'normal-box': product_key !== 'h5_marriage',
          'big-box': product_key === 'h5_marriage',
          'cn-bg': lang && product_key !== 'h5_marriage',
          'tw-bg': !lang && product_key !== 'h5_marriage',
          'cn-big-bg': lang && product_key === 'h5_marriage',
          'tw-big-bg': !lang && product_key === 'h5_marriage',
          'pt-182': product_key !== 'h5_marriage',
          'pt-190': product_key === 'h5_marriage',
        }"
      >
        <div class="one">
          <img :src="getIcon()" class="logo" lt="" />
          <div class="title">{{ title }}</div>
          <div v-if="product_key === 'h5_marriage'" class="cp-box">
            <div class="male">
              <div class="name">{{ male_info.name | filter_name }}</div>
              <div class="birth">
                {{ male_info.birth }}
                <img
                  src="../assets/img/pop/cn/h5_icon_man.png"
                  class="sex"
                  alt=""
                />
              </div>
            </div>
            <div class="male mt-30">
              <div class="name">{{ female_info.name | filter_name }}</div>
              <div class="birth">
                {{ female_info.birth }}
                <img
                  src="../assets/img/pop/cn/h5_icon_girl.png"
                  class="sex"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div v-else class="single-box">
            <div class="name">{{ user_info.name | filter_name }}</div>
            <div class="birth">
              {{ user_info.birth }}
              <img
                v-if="user_info.sex"
                src="../assets/img/pop/cn/h5_icon_man.png"
                class="sex"
                alt=""
              />
              <img
                v-else
                src="../assets/img/pop/cn/h5_icon_girl.png"
                class="sex"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="divider">
          <div v-for="it in 50" :key="it" class="line"></div>
        </div>
        <div class="two">
          <div :class="{ left: true, 'rgb-color': is_show_shandong }">
            {{ tips1 }}
          </div>
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
              <span :class="{ colon: true, 'rgb-color': is_show_shandong }"
                >:</span
              >
              <span
                :class="{
                  block: true,
                  'rgb-light': is_show_shandong,
                }"
                >{{ timeData.seconds | filterTime }}</span
              >
              <span :class="{ colon: true, 'rgb-color': is_show_shandong }"
                >:</span
              >

              <span
                :class="{
                  block: true,
                  'rgb-light': is_show_shandong,
                }"
                >{{ timeData.milliseconds | filterTime }}</span
              >
            </template>
          </count-down>
        </div>
        <div @click="toDetailPage()" class="get-btn">
          <div class="text">{{ tips2 }}</div>
        </div>
        <img
          @click="closeModal"
          src="../assets/img/pop/icon_close.png"
          class="close"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../libs/utils';
import { CountDown } from 'vant';
import { banner_enums, reportName } from '../libs/enum';
import { Solar, Lunar } from 'lunar-javascript';

const tipsArr1 = {
  'zh-CN': '您的限时优惠即将截止',
  'zh-TW': '您的限時優惠即將截止',
};

const tipsArr2 = {
  'zh-CN': '即刻领取',
  'zh-TW': '即刻領取',
};
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
      time_: 0,
      is_show_shandong: false,
      is_show_daoqi: false,
      title: '',
      user_info: {
        name: '',
        birth: '',
      },
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      tips1: tipsArr1[utils.getLanguage()],
      tips2: tipsArr2[utils.getLanguage()],
      user_: {},
      new_time: null,
      male_info: {},
      female_info: {},
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
    toDetailPage() {
      let path = 'detail?querystring=' + this.user_.user_info + '&pay_modal=1';
      localStorage.setItem(
        `mlxz_new_time_down_${this.product_key}`,
        this.new_time
      );
      this.$emit('close');
      this.$router.push({ path });
    },
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
      this.new_time = time_;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time_ = 1;
        this.$refs.countDown.pause();
        this.$refs.countDown.reset();
      }
    },
    getUserInfo() {
      this.user_ = JSON.parse(
        localStorage.getItem(`mlxz_user_info_${this.product_key}`)
      );
      if (this.user_.product_key === this.product_key) {
        if (this.product_key !== 'h5_marriage') {
          this.formateSingleUserInfo(this.user_.user_info);
        } else {
          this.male_info = this.formateCPUserInfo(this.user_.male_str);
          this.female_info = this.formateCPUserInfo(this.user_.female_str);
        }
      }
    },
    /**
     * @description: 格式化用户信息
     * @param {*} string
     * @return {*}
     */
    async formateSingleUserInfo(string) {
      let arr = string.split('|');
      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.username = arr[0];
      this.user_info.name = this.username;
      this.sex = +arr[1];
      this.gongli_nongli = +arr[2];
      this.picker_hour = utils.formateNongliHour(arr[6]);
      let android_date = `${this.year}-${this.month}-${this.date}`;
      let ios_date = `${this.year}/${this.month}/${this.date}`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? android_date : ios_date)
      );
      let lunar = solar.getLunar();
      this.picker_date_nongli = +this.gongli_nongli
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${
            this.picker_hour
          }`
        : `${this.year}年${utils.formateNongliMonth(
            this.month
          )}${utils.formateNongliDate(this.date)} ${this.picker_hour}`;
      this.picker_date_yangli = +this.gongli_nongli
        ? `${this.year}-${this.month}-${this.date} ${this.picker_hour}`
        : `${Lunar.fromYmd(+this.year, +this.month, +this.date)
            .getSolar()
            .toString()} ${this.picker_hour}`;

      this.user_info.birth = this.gongli_nongli
        ? this.picker_date_yangli
        : this.picker_date_nongli;
      this.user_info.sex = this.sex;
    },

    formateCPUserInfo(str) {
      let arr = str.split('|');
      let year = arr[3];
      let month = arr[4];
      let date = arr[5];
      let birth_hour = arr[6];
      let username = arr[0];
      let sex = +arr[1];
      let gongli_nongli = +arr[2];
      let picker_hour = utils.formateNongliHour(arr[6]);
      let android_date = `${year}-${month}-${date}`;
      let ios_date = `${year}/${month}/${date}`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? android_date : ios_date)
      );
      let lunar = solar.getLunar();
      let picker_date_nongli = +this.gongli_nongli
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${picker_hour}`
        : `${year}年${utils.formateNongliMonth(month)}${utils.formateNongliDate(
            date
          )} ${picker_hour}`;
      let picker_date_yangli = +gongli_nongli
        ? `${year}-${month}-${date} ${this.picker_hour}`
        : `${Lunar.fromYmd(+year, +month, +date)
            .getSolar()
            .toString()} ${picker_hour}`;
      return {
        name: username,
        birth: gongli_nongli ? picker_date_nongli : picker_date_yangli,
      };
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
  .whole {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container {
    width: 6.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 101;
    .close {
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      bottom: -1.2rem;
    }

    .one {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      .logo {
        width: 1.66rem;
        height: 1.66rem;
        margin-right: 0.25rem;
      }
      .title {
        width: 100%;
        text-align: center;
        font-size: 0.36rem;
        font-weight: 600;
        height: 0.35rem;
        line-height: 0.36rem;
        color: #5b3825;
        margin: 0.3rem auto;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

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
          display: flex;
          align-items: center;
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
    .two {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      .left {
        font-size: 0.3rem;
        font-weight: 600;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-right: 0.24rem;
        color: #e24c2e;
      }
    }
  }
}

.cp-box {
  width: 5.02rem;
  min-height: 1.4rem;
  background: #fffcfa;
  border-radius: 0.12rem;
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  .male {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      font-weight: 600;
      font-size: 0.3rem;
      color: #726056;
      height: 0.3rem;
      line-height: 0.3rem;
    }
    .birth {
      font-weight: 400;
      font-size: 0.26rem;
      color: #726056;
      height: 0.3rem;
      line-height: 0.3rem;
    }
    .sex {
      width: 0.26rem;
      height: 0.26rem;
      margin-left: 0.1rem;
    }
  }
}

.single-box {
  width: 5.02rem;
  height: 0.7rem;
  background: #fffcfa;
  border-radius: 0.12rem;
  display: flex;
  align-items: center;
  padding: 0.2rem;
  justify-content: space-between;
  margin-bottom: 0.1rem;
  .name {
    font-weight: 600;
    font-size: 0.3rem;
    color: #726056;
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .birth {
    font-weight: 400;
    font-size: 0.26rem;
    color: #726056;
    height: 0.3rem;
    line-height: 0.3rem;
    display: flex;
    align-items: center;
  }
  .sex {
    width: 0.26rem;
    height: 0.26rem;
    margin-left: 0.1rem;
  }
}

.pt-190 {
  padding-top: 1.9rem;
}
.pt-182 {
  padding-top: 1.82rem;
}

.mt-30 {
  margin-top: 0.3rem;
}

.mt-10 {
  margin-top: 0.1rem;
}
.normal-box {
  height: 8.33rem;
}
.big-box {
  height: 8.87rem;
}
.cn-bg {
  background: url('../assets/img/pop/cn/youhui.png') no-repeat;
  background-size: contain;
}
.tw-bg {
  background: url('../assets/img/pop/cn/youhui.png') no-repeat;
  background-size: contain;
}

.cn-big-bg {
  background: url('../assets/img/pop/cn/big_bg.png') no-repeat;
  background-size: contain;
}
.tw-big-bg {
  background: url('../assets/img/pop/cn/big_bg.png') no-repeat;
  background-size: contain;
}

.colon {
  margin: 0 0.02rem;
  display: flex;
  align-items: center;
  color: #e24c2e;
  font-size: 0.3rem;
}

.block {
  width: 0.48rem;
  height: 100%;
  font-size: 0.3rem;
  border-radius: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #e24c2e; /* 初始背景色 */
}

.time-box {
  height: 0.48rem;
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

.get-btn {
  width: 5.5rem;
  height: 0.9rem;
  border-radius: 0.16rem;
  border: 0.02rem solid #ffd192;
  margin-top: 0.73rem;
  .text {
    width: 100%;
    height: 100%;
    border-radius: 0.16rem;
    background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
    font-weight: 600;
    font-size: 0.32rem;
    color: #fef8eb;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
