<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-04-17 10:04:40
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-17 11:21:06
 * @Description: 咨询师入驻及管理须知
-->
<template>
  <div class="main">
    <cnAgreement />
  </div>
</template>

<script>
import utils from '@/libs/utils';
import cnAgreement from './cn_index';

const titleEnum = {
  'zh-CN': '咨询师入驻及管理须知',
  'zh-TW': '咨詢師入駐及管理須知',
};
export default {
  components: {
    cnAgreement,
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
</style>
