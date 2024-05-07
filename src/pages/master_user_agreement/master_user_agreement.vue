<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-04 10:06:24
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-02-27 10:40:29
 * @Description: 用户协议
-->
<template>
  <div class="main">
    <!-- v-if="language === 'zh-CN'" -->
    <cnAgreement />
    <!-- <twAgreement v-else /> -->
  </div>
</template>

<script>
import utils from '@/libs/utils';
import cnAgreement from './cn_agreement.vue';
import twAgreement from './tw_agreement.vue';

const titleEnum = {
  'zh-CN': '用户协议',
  'zh-TW': '用戶協議',
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
