<template>
  <div class="message-card">
    <img class="head-img" :src="is_cn? cn_info_title: tw_info_title"/>
   
  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
import cn_info_title from '../../../assets/img/emotion_marriages/cn/img_pay_top_laoshi_cn.webp';
import tw_info_title from '../../../assets/img/emotion_marriages/tw/img_pay_top_laoshi_tw.webp';
export default {
  props: [
   
  ],
  data() {
    return {
      language: utils.getLanguage(),
      cn_info_title,
      tw_info_title,
    };
  },
  created() { },
  computed: {
    is_cn() {
      return this.language === 'zh-CN';
    },
  },

  methods: {

  },
};
</script>

<style scoped lang="less">
.message-card {
  width: 7.1rem;
  height: 7.74rem;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  background: #FFF3F3;
  border-radius: 0.3rem;
  border: 0.06rem solid #FFBBBB;
  .head-img {
    width: 6.98rem;
    height: 0.82rem;
  }
}
</style>
