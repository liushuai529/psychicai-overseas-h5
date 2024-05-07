<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-09 15:31:53
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-01-16 11:39:25
 * @Description: 鬼谷子百卦论命
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
