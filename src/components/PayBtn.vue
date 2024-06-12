<template>
    <img 
     
      :style="{
        marginBottom: product_key === 'h5_marriage' ? '0.2rem' : '0',
        width: '6.26rem', display: 'flex', alignSelf: 'center'   
      }"
      :src="imgMap[product_key][is_cn?'cn':'tw']" 
      @click="callback()"/>
</template>
<script>
import utils from '../libs/utils';
//h5_emotion2024
import cn_h5_emotion2024 from '../assets/img/emotion_v2/new/cn/pay.png';
import tw_h5_emotion2024 from '../assets/img/emotion_v2/new/tw/pay.png';
import cn_h5_emotion2024_xs from '../assets/img/emotion_v2/new/cn/pay_xs.png';
import tw_h5_emotion2024_xs from '../assets/img/emotion_v2/new/tw/pay_xs.png';
//h5_marriage
import tw_h5_marriage from '../assets/img//bzhh_v2/tw/img_btn.png';
import cn_h5_marriage from '../assets/img/bzhh_v2/cn/img_btn.png';
export default {
  name: 'PayBtn',
  data(){
    return{
      imgMap:{
        h5_emotion2024: {
            cn:["enjoy02", "panda02"].includes(utils.getFBChannel())?cn_h5_emotion2024_xs: cn_h5_emotion2024,
            tw:["enjoy02", "panda02"].includes(utils.getFBChannel())?tw_h5_emotion2024_xs:tw_h5_emotion2024
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
