<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-23 10:03:54
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-23 11:12:54
 * @Description: 
-->
<template>
  <div class="pop-notice">
    <div :class="{ container: true, 'cn-bg': lang, 'tw-bg': !lang }">
      <img src="../assets/img/pop/icon_close.png" class="close" alt="" />
    </div>
  </div>
</template>

<script>
import utils from '../libs/utils';
export default {
  name: 'PopNotice',
  data() {
    return {
      // Your data properties go here
    };
  },
  computed: {
    lang() {
      return utils.getLanguage();
    },
  },
  methods: {
    // Your methods go here
  },
  mounted() {
    // Code to run when the component is mounted goes here
  },
};
</script>

<style scoped lang="less">
.pop-notice {
  width: 100%;
  height: 100vh;
  background: rgb(17 17 17 / 70%);
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
  .container {
    width: 6.3rem;
    height: 6.34rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .close {
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      bottom: -1.2rem;
    }
  }
}

.cn-bg {
  background: url('../assets/img/pop/cn/youhui.png') no-repeat;
  background-size: contain;
}
.tw-bg {
  background: url('../assets/img/pop/cn/youhui.png') no-repeat;
  background-size: contain;
}
</style>
