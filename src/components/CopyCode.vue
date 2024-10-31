<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-04-19 10:41:34
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-29 17:54:27
 * @Description: 更多精彩
-->
<template>
  <div :class="['more-content', className]">
    <img v-if="set_title" :style="title_icon_style" :src="title_icon" alt="" />
    <img :src="is_black_logo ? black_logo : white_logo" class="logo" alt="" />
    <div :style="`color:${tips1_color}`" class="tips1">{{ tips1 }}</div>
    <div :class="['code-common', codeClass]">
      <span :style="`color:${code_color}`">
        {{ tips2 }}：{{ transfer_code || '-' }}
      </span>
      <span
        @click="handleCopyCode(1)"
        :style="`color:${tips3_color}`"
        class="tips3"
        >{{ tips3 }}</span
      >
    </div>

    <div :style="code_text_style" class="tips4">
      {{ tips5 }}
    </div>
    <img
      @click="handleCopyCode(0)"
      :style="tips5_style"
      :src="code_btn"
      alt=""
    />
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import utils from '../libs/utils';
import black_logo from '../assets/img/mlxz/career_2024/result/home_img_logo.webp';
const lang = utils.getLanguage();
const tips_arr1 = {
  'zh-CN': '神准测算报告，请下载「命理寻真」',
  'zh-TW': '神準測算報告，請下載「命理尋真」',
};
const tips_arr2 = {
  'zh-CN': '邀请码',
  'zh-TW': '邀請碼',
};
const tips_arr3 = {
  'zh-CN': '复制',
  'zh-TW': '複製',
};
const tips_arr4 = {
  'zh-CN': '复制成功',
  'zh-TW': '複製成功',
};
const tips_arr5 = {
  'zh-CN': '复制邀请码，打开命理寻真，可重复查看您购买的报告',
  'zh-TW': '復製邀請碼，打開命理尋真，可重復查看您購買的報告',
};
export default {
  name: 'CopyCode',
  props: {
    className: {
      type: String,
      default: '',
    },
    tips1_color: {
      type: String,
      default: '#000',
    },
    transfer_code: {
      type: String,
      default: '',
    },
    codeClass: {
      type: String,
      default: '',
    },
    tips3_color: {
      type: String,
      default: '#000',
    },
    code_btn: {
      type: String,
      default: '',
    },
    showModal: {
      type: Function,
      default: () => {},
    },
    code_color: {
      type: String,
      default: '#000',
    },
    code_text_style: {
      type: String,
      default: 'margin: 0.3rem auto 0.39rem',
    },
    set_title: {
      type: Boolean,
      default: false,
    },
    tips5_style: {
      type: String,
      default: 'width: 4.98rem;height: 1rem;',
    },
    title_icon: {
      type: String,
      default: '',
    },
    title_icon_style: {
      type: String,
      default: '',
    },
    is_black_logo: {
      type: Boolean,
      default: true,
    },
    e_name: {
      type: String,
      default: '',
    },
    e_id: {
      type: String,
      default: '',
    },
    c_id: {
      type: String,
      default: '',
    },
    a_token: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tips1: tips_arr1[lang],
      tips2: tips_arr2[lang],
      tips3: tips_arr3[lang],
      tips5: tips_arr5[lang],
      white_logo:
        'https://psychicai-static.psychicai.pro/imgs/240401762cbffce2420f95f7b526da19163c.png',
      black_logo,
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  methods: {
    /**
     * @description: 复制邀请码
     * @param {*} val
     * @return {*}
     */
    async handleCopyCode(val) {
      utils.copyText('mlxz-' + this.transfer_code);
      Toast(tips_arr4[lang]);

      if (!val) {
        utils.firebaseLogEvent(this.e_id, this.c_id, this.e_name, 'click', {
          channel: utils.getFBChannel(),
        });
        await utils.asleep(1000);
        utils.openApp();
        return;
      }
      this.$emit('showModal');

    },
  },
};
</script>

<style scoped lang="less">
.more-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: system-ui;
  .logo {
    width: 3.05rem;
    height: 0.82rem;
  }
  .tips1 {
    height: 0.28rem;
    font-weight: 400;
    font-size: 0.28rem;
    line-height: 0.28rem;
    margin: 0.4rem auto;
  }
}
.code-common {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  padding: 0 0.4rem;
  font-weight: 600;
  font-size: 0.32rem;
  width: 6.18rem;
  min-height: 1.04rem;
  span {
    line-height: 0.32rem;
    height: 0.32rem;
  }
}
.tips3 {
  text-decoration: underline;
}
.tips4 {
  height: 0.26rem;
  font-size: 0.26rem;
  line-height: 0.26rem;
  text-align: center;
}
.tips5 {
  width: 4.98rem;
  height: 1rem;
}
.career-code {
  background: url('../assets/img/mlxz/moreResult/career_24.webp') no-repeat;
  background-size: 100% 100%;
  padding-top: 0.05rem;
}

.emotion-box {
  width: 7.11rem;
  height: 6.94rem;
  padding-top: 1.53rem;
  background: url('../assets/img/emotion_v2/new/cn/result/img_xiazai_jian.webp')
    no-repeat;
  background-size: 100% 100%;
}
.emotion-code {
  background: url('../assets/img/emotion_v2/new/cn/result/img_shibiema_card.webp')
    no-repeat;
  background-size: 100% 100%;
}

.guiguzi-code {
  background: url('../assets/img/mlxz/moreResult/ggz_bg.webp') no-repeat;
  background-size: 100% 100%;
}
.guiguzi-box {
  width: 7.1rem;
  height: 7.11rem;
  padding-top: 0.53rem;
  background: url('../assets/img/mlxz/moreResult/ggz_content.webp') no-repeat;
  background-size: 100% 100%;
}

.wealth-box {
  width: 6.7rem;
  height: 5.62rem;
  background: #f3e5c2;
  border-radius: 0.19rem;
  padding-top: 0.4rem;
}
.wealth-code {
  background: url('../assets/img/mlxz/moreResult/wealth_bg.webp') no-repeat;
  background-size: 100% 100%;
}

.marry-box {
  width: 7rem;
  min-height: 6.7rem;
  background: #fbf8ed;
  border-radius: 0.16rem;
  border: 0.06rem solid #d19a47;
}
.marry-code {
  background: url('../assets/img/mlxz/moreResult/bzhh_bg.webp') no-repeat;
  background-size: 100% 100%;
}

.weight-box {
  width: 7.1rem;
  min-height: 6.93rem;
  background-image: url('../assets/img/mlxz/weigh_bone/img_mokuai_bg.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #37438a;
  border-radius: 0.2rem;
}
.weight-code {
  background: url('../assets/img/mlxz/moreResult/weight_bg.webp') no-repeat;
  background-size: 100% 100%;
}

.year-box {
  width: 7.1rem;
  min-height: 6.74rem;
  background: url('https://psychicai-static.psychicai.pro/imgs/24043fd43250af19446888c2b6c6723ebf4f.png')
    no-repeat;
  background-size: 100% 100%;
}
.year-box-2025 {
  width: 7.1rem;
  min-height: 6.74rem;
  background: url('../assets/img/year_of_lucky_2025/img_cardbj_xinxi.webp')
    no-repeat;
  background-size: 100% 100%;
}
.year-code {
  background: url('../assets/img/mlxz/moreResult/year_bg.webp') no-repeat;
  background-size: 100% 100%;
  padding-top: 0.05rem;
}
</style>
