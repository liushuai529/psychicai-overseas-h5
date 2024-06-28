<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-07 21:00:52
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-18 15:31:02
 * @Description: 
-->
<template>
  <div class="header-notice">{{ tips }}</div>
</template>

<script>
import utils from '../libs/utils';
export default {
  name: 'HeaderNotice',
  data() {
    return {
      language: utils.getLanguage(),
      tips: '',
    };
  },
  created() {
    this.tips =
      this.language === 'zh-CN'
        ? '当前报告已购买，填写信息后可直接查看'
        : '當前報告已購買，填寫信息後可直接查看';
  },
};
</script>

<style scoped lang="less">
.header-notice {
  width: 100%;
  height: 0.6rem;
  background: #ffe6e6;
  font-size: 0.24rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fe2f2f;
  line-height: 0.28rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
</style>
