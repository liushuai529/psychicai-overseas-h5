<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-04 10:06:24
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-19 16:33:15
 * @Description: 隐私协议
-->
<template>
  <div class="main">
    <cnAgreement v-if="language === 'zh-CN'" />
    <twAgreement v-else />
  </div>
</template>

<script>
import utils from '@/libs/utils';
import cnAgreement from './cn_privacy';
import twAgreement from './tw_privacy.vue';

const titleEnum = {
  'zh-CN': '隐私权政策',
  'zh-TW': '隱私權政策',
};
export default {
  components: {
    cnAgreement,
    twAgreement,
  },
  data() {
    return {
      language: '',
    };
  },

  created() {
    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: 'avn915',
      });
    console.log('Adjust', 'avn915');

    this.language = utils.getLanguage();
    document.title = titleEnum[this.language];
  },
  async mounted() {},
  watch: {},

  methods: {},
};
</script>

<style>
.main {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.3rem;
  text-align: justify;
}

.title {
  margin-top: 0.6rem;
  font-size: 0.4rem;
  font-weight: bold;
  color: #393939;
}

p {
  /* margin-top: 0.4rem; */
  line-height: 1.5;
  font-size: 0.32rem;
  color: #666;
}
a {
  text-decoration: none;
  color: #008bff;
}

b {
  color: #2a2a2a;
  font-weight: bold;
}
.text-center {
  text-align: center;
}
.text-left {
  text-indent: 0.64rem;
}
.text-flex {
  display: flex;
}
.ml-32 {
  margin-left: 0.32rem;
}
</style>
