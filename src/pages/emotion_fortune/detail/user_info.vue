<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:33:50
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-18 16:04:22
 * @Description: 
-->
<template>
  <div
    :class="{
      'user-info': true,
      'result-info': is_result,
      'cn-info': is_cn,
      'tw-info': !is_cn,
    }"
  >
    <div v-if="!is_result" class="title">
      <img :src="language === 'zh-CN' ? cn_pay_title1 : tw_pay_title1" alt="" />
    </div>
    <div :class="`info-box ${is_result ? 'result-box' : ''}`">
      <div class="row-1 c-mb c-row">
        <div class="c-label">
          <span>您的名字：</span>
          <span class="c-value mr-50">{{ username | filter_name }}</span>
        </div>
        <div class="c-label">
          <span>您的性别：</span>
          <span class="c-value">{{ +sex ? '男' : '女' }}</span>
        </div>
      </div>
      <div class="row-2 c-mb c-row">
        <span class="c-label">出生日期：</span>
        <span class="c-value">
          {{ picker_date_yangli }}
        </span>
      </div>
      <div class="row-3 c-mb c-row">
        <span class="h-label c-label">出生日期：</span>
        <span class="c-value">
          {{ picker_date_nongli }}
        </span>
      </div>
      <div class="row-4 c-row">
        <span class="h-label c-label">您的八字：</span>
        <span class="zhu-label">年柱</span>
        <span class="zhu-label">月柱</span>
        <span class="zhu-label">日柱</span>
        <span class="zhu-label"> {{ $t('shizhu-label') }}</span>
      </div>
      <div v-if="gan.length > 0" class="row-5 c-mb c-row">
        <span class="c-label">您的八字：</span>
        <span
          v-for="(it, k) in gan"
          :key="'gan' + k"
          :class="`zhu-value  ${styleColor(it)}`"
          >{{ it }}</span
        >
      </div>
      <div v-if="zhi.length > 0" class="row-5 c-mb c-row">
        <span class="h-label c-label">您的八字：</span>
        <span
          v-for="(it, k) in zhi"
          :key="'zhi' + k"
          :class="`zhu-value ${styleColor(it)}`"
          >{{ it }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
import cn_pay_title1 from '../../../assets/img/emotion/pay_title1.png';
import tw_pay_title1 from '../../../assets/img/tw_mlxz/emotion/result/pay_title1.webp';
export default {
  props: [
    'username',
    'sex',
    'picker_date_yangli',
    'picker_date_nongli',
    'gan',
    'zhi',
    'is_result',
  ],
  data() {
    return {
      cn_pay_title1,
      tw_pay_title1,
      language: utils.getLanguage(),
    };
  },
  created() {},
  computed: {
    is_cn() {
      return this.language === 'zh-CN';
    },
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
  },
  methods: {
    /**
     * @description: 获取八字对应颜色
     * @param {*} val
     * @return {*}
     */
    styleColor(val) {
      return 'com-text';
      let mu_arr = ['甲', '乙', '寅', '卯'];
      let huo_arr = ['丙', '丁', '巳', '午'];
      let tu_arr = ['戊', '己', '辰', '戌', '丑', '未'];
      let jin_arr = ['庚', '辛', '申', '酉'];
      let shui_arr = ['壬', '癸', '亥', '子'];
      if (mu_arr.includes(val)) {
        return 'nian-mu';
      } else if (huo_arr.includes(val)) {
        return 'nian-huo';
      } else if (tu_arr.includes(val)) {
        return 'nian-tu';
      } else if (jin_arr.includes(val)) {
        return 'nian-jin';
      } else {
        return 'nian-shui';
      }
    },
  },
};
</script>

<style scoped lang="less">
.user-info {
  margin-top: 1.4rem;

  .title {
    width: 100%;
    height: 0.72rem;
    margin-bottom: 0.36rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 5.16rem;
      height: 100%;
    }
  }
  .info-box {
    display: flex;
    flex-direction: column;
    margin: 0 0.09rem;
    padding-left: 0.69rem;
  }
  .c-row {
    display: flex;
  }
  .c-label {
    font-size: 0.3rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffeba9;
    line-height: 0.42rem;
  }
  .c-mb {
    margin-bottom: 0.2rem;
  }
  .c-value {
    color: #fff !important;
    font-size: 0.3rem;
    height: 0.42rem;
    font-weight: 500;
  }
  .mr-50 {
    margin-right: 0.5rem;
  }
  .h-label {
    visibility: hidden;
  }
  .zhu-label {
    width: 0.5rem;
    height: 0.24rem;
    font-size: 0.24rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffeba9;
    line-height: 0.24rem;
    text-align: center;
    margin-right: 0.5rem;
    white-space: nowrap;
  }
  .zhu-value {
    width: 0.5rem;
    height: 0.42rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 0.42rem;
    text-align: center;
    margin-right: 0.5rem;
    white-space: nowrap;
  }
  .nian-huo {
    color: #f33f3f;
  }
  .nian-shui {
    color: #0f71d2;
  }
  .nian-mu {
    color: #19be1d;
  }
  .nian-jin {
    color: #fb9400;
  }
  .nian-tu {
    color: #9a7a4b;
  }
}

.com-text {
  color: #fff;
}

.result-info {
  width: 7.06rem;
  min-height: 5.48rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 0.3rem;
  padding: 1.56rem 0 0;
  margin-top: 0 !important;
}
.cn-info {
  background-image: url('../../../assets/img/emotion/result_name_bg.png');
}
.tw-info {
  background-image: url('../../../assets/img/emotion/new/tw/result_info.png');
}
.result-box {
  padding-left: 0.95rem !important;
}
</style>
