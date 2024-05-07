<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:33:50
 * @LastEditors: wujiang 
 * @LastEditTime: 2023-11-15 11:35:52
 * @Description: 24年年运
-->
<template>
  <div id="app" data-own="1">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  created() {
    document.title = this.$t('dom-title');
  },
};
</script>
<style lang="less">
@import './../../less/reset.less';
@import './../../less/common.less';
html,
body,
#app {
  height: 100%;
}

img,
div,
p {
  -webkit-tap-highlight-color: transparent;
}
</style>
