<template>
  <div class="fb-share-notice">
   <div></div>
   <div>点击右上角浏览器打开体验更流畅</div>
   <img class="logo" src="../assets/img/components/fb_share_notice/arrow_more_yindao.webp"/>
    
  </div>
</template>
<script>
import utils from '../libs/utils';
const lang = utils.getLanguage();

export default {
  name: 'FbShareNotice',
  props: {
   
    visible: {
      type: Boolean,
      default: true,
    },
    transfer_code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      lang,
    }
  },
 
  watch: {
    
  },
  mounted() {
  
  },
  computed: {
   
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    
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

