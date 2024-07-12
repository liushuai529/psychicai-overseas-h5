<template>
  <div :class="{
        'tarot-index': true,
        'cn-bg': is_cn,
        'tw-bg': !is_cn,
      }">
    11
  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
let channel = utils.getQueryStr('channel');

export default {
  components: {
   
  },
  data() {
    return {
     
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {
   
  },
  created() {
   
  },
  beforeDestroy() {
    
  },
  mounted() {
   
  },
  methods: {
    
  },
};
</script>

<style scoped lang="less">
.cn-bg {
  background-image: url('../../../assets/img/tarot/cn/bg.webp');
}
.tw-bg {
  background-image: url('../../../assets/img/tarot/tw/bg.webp');
}
.tarot-index {
  width: 7.5rem;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-size: 7.5rem 15.36rem;
  background-repeat: no-repeat;
  // padding-top: 7.4rem;
  position: relative;
  background-color: #0E0512;
}
</style>
