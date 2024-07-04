<template>
  <div class="pay-guide-modal" @click="close">
    <img class="pay-img" :src="is_cn? cn_imgae: tw_imgae"/>
  </div>
</template>

<script>
import utils from '../libs/utils';
import cn_imgae from '../assets/img/components/pay_guide_modal/img_more_browser_cn.webp'
import tw_imgae from '../assets/img/components/pay_guide_modal/img_more_browser_tw.webp'
export default {
  data() {
    return {
      cn_imgae,
      tw_imgae,
    };
  },
  props: {
   
  },

  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
   
  },
  watch: {
   
  },
  methods: {
    close() {

      this.$emit('show_modal', false)
    }
  },
};
</script>

<style scoped lang="less">
.pay-guide-modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100000;
  background: #333435;
 
  display: flex;
  justify-content: center;
  .pay-img {
    width: 6rem;
    height: 8rem
    
  }
}
</style>
