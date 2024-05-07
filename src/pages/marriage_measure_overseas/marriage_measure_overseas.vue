<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2023-10-27 18:09:01
 * @Description: 八字合婚
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
    document.title = '八字合婚';
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
