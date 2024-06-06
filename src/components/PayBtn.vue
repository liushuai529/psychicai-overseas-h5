<template>
    <img 
     
      :style="{
        marginBottom: product_key === 'h5_marriage' ? '0.2rem' : '0',
        width: '6.26rem',    
      }"
      :src="imgMap[product_key][is_cn?'cn':'tw']" 
      @click="callback()"/>
</template>
<script>
import utils from '../libs/utils';
//h5_emotion2024
import cn_h5_emotion2024 from '../assets/img/emotion_v2/new/pay.png';
import tw_h5_emotion2024 from '../assets/img/emotion_v2/new/pay.png';
//h5_marriage
import tw_h5_marriage from '../assets/img//bzhh_v2/tw/img_btn.png';
import cn_h5_marriage from '../assets/img/bzhh_v2/cn/img_btn.png';
export default {
  name: 'PayBtn',
  data(){
    return{
      imgMap:{
        h5_emotion2024: {
            cn:cn_h5_emotion2024,
            tw:tw_h5_emotion2024
        },
        h5_marriage:{
                cn:cn_h5_marriage,
                tw:tw_h5_marriage
        }
      }
    }
  },
  props:{
    callback:{
        type:Function,
        default:function(){}
    },
    product_key:{
        type:String,
        default:'h5_emotion2024'
    }
  },
  computed:{
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    }
  }
}
</script>

<style scoped lang="less">

  
</style>
