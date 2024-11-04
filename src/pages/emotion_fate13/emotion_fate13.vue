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
