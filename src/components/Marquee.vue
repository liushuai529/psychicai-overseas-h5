<template>
  <div v-if="!product_key" class="marquee">
    <div class="marquee-wrapper">
      <div class="marquee-box" :class="{ scrollmarquee: scrollMarquee }">
        <div class="marquee-text">
          <div class="marquee-icon"></div>
          <span>{{ curMarqueeText }}</span>
        </div>
        <div class="marquee-text next">
          <div class="marquee-icon"></div>
          <span>{{ nextMarqueeText }}</span>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="marquee"
    :style="{
      margin: '0.28rem auto 0.44rem',
    }"
  >
    <div class="marquee-wrapper">
      <div class="marquee-box" :class="{ scrollmarquee: scrollMarquee }">
        <div class="marquee-text item">
          <img src="../assets/img/bzhh_v2/icon_laba.webp" class="laba" alt="" />
          <span>{{ cur_marry_obj.desc1 }}</span>
          <span>{{ cur_marry_obj.desc2 }}</span>
          <span @click="jumpHome" class="light-red">八字合婚</span>
          <span>{{ cur_marry_obj.desc3 }}</span>
        </div>
        <div class="marquee-text next item">
          <img src="../assets/img/bzhh_v2/icon_laba.webp" class="laba" alt="" />
          <span>{{ next_marry_obj.desc1 }}</span>
          <span>{{ next_marry_obj.desc2 }}</span>
          <span @click="jumpHome" class="light-red">八字合婚</span>
          <span>{{ next_marry_obj.desc3 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../libs/utils';

const default_mock_users = [
  '5分钟前 我*** 成功解锁了事业精批的详细解析',
  '6分钟前 vt*** 成功解锁了事业精批的详细解析',
  '12分钟前 辣椒***成功解锁了事业精批的详细解析',
  '2分钟前 14***成功解锁了事业精批的详细解析',
  '1分钟前 96***成功解锁了事业精批的详细解析',
  '8分钟前 小***成功解锁了事业精批的详细解析',
  '7分钟前 il***成功解锁了事业精批的详细解析',
  '21分钟前 lo***成功解锁了事业精批的详细解析',
  '4分钟前 2t***成功解锁了事业精批的详细解析',
];

export default {
  props: {
    mock_users: {
      default: default_mock_users,
      type: Array,
    },
    product_key: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      scrollMarquee: false, // 跑马灯动画
      nextMarqueeText: '', // 下一条跑马灯文案
      curMarqueeText: '', // 当前跑马灯文案
      cur_marry_obj: {},
      next_marry_obj: {},
    };
  },
  created() {
    if (this.product_key) {
      this.marryMock();
    } else {
      this.runMarquee();
    }
  },

  methods: {
    marryMock() {
      this.cur_marry_obj =
        this.mock_users[utils.getRandom(this.mock_users.length)];
      setInterval(() => {
        this.next_marry_obj =
          this.mock_users[utils.getRandom(this.mock_users.length)];
        this.scrollMarquee = true;

        setTimeout(() => {
          this.cur_marry_obj = this.next_marry_obj;
          this.next_marry_obj = {};
          this.scrollMarquee = false;
        }, 500);
      }, 4000);
    },
    jumpHome() {
      location.href = location.origin + location.pathname;
    },
    runMarquee() {
      this.curMarqueeText =
        this.mock_users[utils.getRandom(this.mock_users.length)];
      setInterval(() => {
        this.nextMarqueeText =
          this.mock_users[utils.getRandom(this.mock_users.length)];
        this.scrollMarquee = true;

        setTimeout(() => {
          this.curMarqueeText = this.nextMarqueeText;
          this.nextMarqueeText = '';
          this.scrollMarquee = false;
        }, 500);
      }, 4000);
    },
  },
};
</script>

<style scoped lang="less">
.marquee {
  margin: 0.14rem 0;
  .marquee-wrapper {
    width: 100%;
    position: relative;
    height: 0.4rem;
    font-size: 0.24rem;
    line-height: 1;
    text-align: center;
    overflow: hidden;

    .scrollmarquee {
      animation: scrollmarquee linear 0.5s 1;
    }
    .marquee-box {
      display: flex;
      flex-direction: column;

      .marquee-text {
        flex: none;
        height: 0.4rem;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #F2CFCF;
        .marquee-icon {
          width: 0.28rem;
          height: 0.24rem;
          background-image: url('../assets/img/3.0/horn.webp');
          background-position: top;
          background-repeat: no-repeat;
          background-size: contain;
          margin-right: 0.08rem;
        }
      }
    }
  }
}
@keyframes scrollmarquee {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: -0.4rem;
  }
}

.laba {
  width: 0.28rem;
  height: 0.24rem;
  margin-right: 0.08rem;
}
.light-red {
  color: #FFDA27;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
