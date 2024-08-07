<template>
  <div class="result-popup"  v-show="show_modal">
    <div class="modal-container"></div>
  </div>
</template>
<script>
import utils from '../../../libs/utils';

import cn_img_popovers_logo from '../../../assets/img/components/result_popup/cn/img_popovers_logo1.webp';
import tw_img_popovers_logo from '../../../assets/img/components/result_popup/tw/img_popovers_logo_tw1.webp';
import { Toast } from 'mint-ui';
const lang = utils.getLanguage();



const down_info = {
  master_tarot: {module: 10010, 'content_id': -10022, 'event_name': 'click_2024wealty_download', type: 'click'}, 
}

//h5_marriage

export default {
  name: 'ResultPopup',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      show_modal: false
    }
  },
 
  watch: {
    visible(val) {
      this.show_modal = val;
    }, 
  },
  mounted() {
  
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
   
   },
   methods: {
   
    downClick() {
      utils.firebaseLogEvent(down_info[this.product_key]['module'], down_info[this.product_key]['content_id'], down_info[this.product_key]['event_name'], down_info[this.product_key]['type'], {
        args_name: down_info[this.product_key]['event_name'],
        channel: utils.getFBChannel(),
      });
      utils.openApp();
    }
   }
}
</script>

<style scoped lang="less">
.copy-popup {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  

}

</style>
<style lang="less">
.mint-toast.is-placemiddle {
  z-index: 100000000 !important;
}
</style>
