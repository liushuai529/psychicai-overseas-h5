<template>
  <div class="fb-share-notice">
   <div>{{ is_cn? '真人塔罗占卜师答疑解惑': '真人塔羅占蔔師答疑解惑' }}</div>
 
    
  </div>
</template>
<script>
import utils from '../libs/utils';
const lang = utils.getLanguage();

export default {
  name: 'TarotNotice',
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
  height: 0.88rem;
  background: #1E0A2D;
  // opacity: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.34rem;
  color: #FFFFFF;
  line-height: 0.48rem;
  font-style: normal;
 
}
</style>

