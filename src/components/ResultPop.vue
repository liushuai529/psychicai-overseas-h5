<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-16 20:35:56
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-19 15:30:00
 * @Description: 
-->
<template>
  <div class="result">
    <!-- Your HTML code goes here -->
    <div class="pop-box">
      <img src="../assets/img/common/pay_success.png" class="pay-logo" alt="" />
      <div class="title">{{ tipsArr1[lang] }}</div>
      <div class="tips">{{ tipsArr2[lang] }}</div>
      <input
        type="text"
        id="email"
        v-model="email"
        :placeholder="tipsArr3[lang]"
      />
      <div class="code-box">
        <input
          type="number"
          id="code"
          v-model="code"
          :placeholder="tipsArr4[lang]"
        />
        <div
          @click="getCode()"
          :class="{
            'send-com': true,
            'send-disabled': !is_email || count < 60,
            'send-active': is_email && count === 60,
          }"
        >
          {{ time_text }}
        </div>
      </div>
      <div
        @click="getReport()"
        :class="{
          'btn-box': true,
          'btn-box-disabled': !can_send,
          'btn-box-active': can_send,
        }"
      >
        <div class="text">
          {{ tipsArr6[lang] }}
        </div>
      </div>
      <img
        @click="closePop"
        src="../assets/img/common/icon_close.png"
        class="close-icon"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import utils from '../libs/utils';
const tipsArr1 = {
  'zh-CN': '支付成功',
  'zh-TW': '支付成功',
};
const tipsArr2 = {
  'zh-CN': '请输入邮箱，后续查看报告',
  'zh-TW': '请输入邮箱，后续查看报告',
};

const tipsArr3 = {
  'zh-CN': '请输入您的邮箱号码',
  'zh-TW': '',
};
const tipsArr4 = {
  'zh-CN': '请输入验证码',
  'zh-TW': '',
};
const tipsArr5 = {
  'zh-CN': '获取验证码',
  'zh-TW': '',
};
const tipsArr6 = {
  'zh-CN': '免费接受报告结果',
  'zh-TW': '',
};
const tipsArr7 = {
  'zh-CN': '验证码已发送至您的邮箱',
  'zh-TW': '',
};
const tipsArr8 = {
  'zh-CN': '报告已发送至您的邮箱，请注意查收',
  'zh-TW': '',
};

const lang = utils.getLanguage();
export default {
  name: 'ResultPop',
  props: {
    close: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      // Your data properties go here
      tipsArr1,
      tipsArr2,
      tipsArr3,
      tipsArr4,
      tipsArr5,
      tipsArr6,
      tipsArr7,
      tipsArr8,
      email: '',
      code: '',
      can_send: false,
      is_email: false,
      minute_num: 60,
      time_text: tipsArr5[lang],
      lang,
      count: 60,
    };
  },
  computed: {
    // Your computed properties go here
    // lang() {
    //   return utils.getLanguage();
    // },
  },
  watch: {
    // Your watch properties go here
    code(val) {
      if (val.length > 5) {
        this.code = val.slice(0, 6);
      }
      this.can_send = val.length > 5 ? true : false;
    },
    email(val) {
      this.validateEmail(val);
      if (val.length > 50) {
        this.email = val.slice(0, 50);
      }
    },
  },
  methods: {
    validateEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      this.is_email = emailRegex.test(email);
    },
    getCode() {
      if (!this.is_email) return;
      Toast(this.tipsArr7[this.lang]);
      this.minuteCountDown();
    },
    minuteCountDown() {
      let timer = setInterval(() => {
        this.count--;
        if (this.count <= 0) {
          clearInterval(timer);
          this.time_text = '重新获取';
          this.count = 60;
          return;
        }
        this.time_text = `${this.count}s`;
      }, 1000);
    },
    getReport() {
      Toast(this.tipsArr8[lang]);
    },
    closePop() {
      this.$emit('close');
    },
  },
  mounted() {
    // Code to run when the component is mounted
  },
};
</script>

<style scoped lang="less">
.result {
  width: 7.5rem;
  height: 100vh;
  background: rgb(17 17 17 / 70%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  .pop-box {
    width: 6.3rem;
    height: 6.74rem;
    background: linear-gradient(180deg, #d3f2e5 0%, #ffffff 100%);
    border-radius: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .pay-logo {
      width: 1.86rem;
      height: 1.18rem;
      margin-top: 0.4rem;
    }
    .title {
      width: 100%;
      height: 0.36rem;
      font-weight: 500;
      font-size: 0.36rem;
      color: #314a46;
      line-height: 0.36rem;
      text-align: center;
      margin: 0.2rem auto 0.22rem;
    }
    .tips {
      width: 100%;
      height: 0.28rem;
      font-weight: 400;
      opacity: 0.5;
      font-size: 0.28rem;
      color: #314a46;
      line-height: 0.28rem;
      text-align: center;
      margin: 0 auto 0.4rem;
    }
  }
}
input {
  width: 4.5rem;
  height: 0.9rem;
  font-size: 0.3rem;
  line-height: 0.42rem;
  outline: none;
  border: none;
  background: #eaf0ee;
  border-radius: 0.16rem;
  padding: 0 0.3rem;
  color: #314a46;
  &::input-placeholder {
    color: #314a46;
    opacity: 0.3;
  }
  &::-webkit-input-placeholder {
    color: #314a46;
    opacity: 0.3;
  }
  &::-moz-placeholder {
    color: #314a46;
    opacity: 0.3;
  }
  &::-moz-placeholder {
    color: #314a46;
    opacity: 0.3;
  }
  &::-ms-input-placeholder {
    color: #314a46;
    opacity: 0.3;
  }
}

.code-box {
  width: 5.1rem;
  height: 0.9rem;
  font-size: 0.3rem;
  line-height: 0.42rem;
  background: #eaf0ee;
  border-radius: 0.16rem;
  position: relative;
  z-index: 1;
  margin-top: 0.22rem;
  overflow: hidden;
  .send-com {
    position: absolute;
    right: 0.3rem;
    top: 0.26rem;
    font-weight: 400;
    z-index: 10;
    font-size: 0.28rem;
  }
}

.btn-box {
  width: 5.5rem;
  height: 0.9rem;
  border-radius: 0.16rem;
  margin-top: 0.4rem;
  .text {
    width: 100%;
    height: 100%;
    font-weight: 600;
    font-size: 0.32rem;
    border-radius: 0.16rem;
    display: flex;
    align-items: center;
    color: #fef8eb;
    justify-content: center;
  }
}

.btn-box-disabled {
  border: 0.02rem solid #ffedd3;
  .text {
    background: linear-gradient(180deg, #fbc8ba 0%, #f6a8a8 100%);
  }
}
.btn-box-active {
  border: 0.02rem solid #ffd192;
  .text {
    background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
  }
}
.send-disabled {
  opacity: 0.3;
  color: #314a46;
}

.send-active {
  color: #407b61;
}
.close-icon {
  width: 0.8rem;
  height: 0.8rem;
  // margin-top: .4rem;
  position: absolute;
  bottom: -1.2rem;
}
</style>
