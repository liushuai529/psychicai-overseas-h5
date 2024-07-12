<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 13:51:21
 * @LastEditors: wujiang 
 * @LastEditTime: 2023-11-09 16:01:43
 * @Description: 24年财运
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
    document.title = '塔罗';
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
