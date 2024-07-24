<template>
  <div class="fb-share-notice" v-if="is_show_fb_notice">
   <div></div>
   <div>{{ text?text: show_text }}</div>
   <img class="logo" src="../../../assets/img/components/fb_share_notice/arrow_more_yindao.webp"/>
    
  </div>
</template>
<script>

import utils from '../../../libs/utils';

export default {
  name: 'FbShareNotice',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
 
  watch: {
    
  },
  mounted() {
  
  },
  computed: {
    is_show_fb_notice() {
      // return true
      return utils.isFBContainer();
    },
    show_text() {
      return utils.getLanguage() === 'zh-CN'? '点击右上角…使用浏览器打开体验更流畅': '點擊右上角…使用瀏覽器打開體驗更流暢';
    }
    
   },
   methods: {
    
   }
}
</script>

<style scoped lang="less">
.fb-share-notice {
  width: 7.5rem;
  height: 0.66rem;
  background: rgba(0, 0, 0, 0.6);
  // opacity: 0.6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: 600;
  font-size: 0.26rem;
  color: #FFFFFF;
  line-height: 0.26rem;
  font-style: normal;
  .logo {
    width: 0.26rem;
    height: 0.26rem;
  }
}
</style>

