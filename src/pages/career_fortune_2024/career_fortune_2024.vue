<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-19 10:15:59
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-17 14:19:09
 * @Description: 24年事业运
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
