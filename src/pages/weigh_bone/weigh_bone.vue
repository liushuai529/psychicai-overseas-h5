<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-13 15:02:16
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-22 15:17:14
 * @Description: 
-->
<template>
  <div id="app" data-own="1">
    <router-view></router-view>
  </div>
</template>

<script>
import utils from '../../libs/utils.js';
export default {
  name: 'app',
  created() {
    document.title = this.$t('dom-title');

    utils.getChannel();
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
