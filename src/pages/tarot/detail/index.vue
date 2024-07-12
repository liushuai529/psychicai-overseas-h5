
<template>
  <div :class="['tarot-detail']">
    <CardList/>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { Downloader, Parser, Player } from 'svga.lite';
import utils from '../../../libs/utils';
import CardList from '../components/cardList.vue';
import BaziTable from '../../../components/baziTable.vue';
import { getBaziAPI } from '../../../api/api';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import payModal from '../../../components/PayModal.vue';


import { report_id_arr } from '../../../libs/enum';


export default {
  components: { CardList  },
  
  data() {
    return {
      product_id: 21,
      product_key: 'h5_wealth2024',
      query_user_string: '',
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      gan: ['甲', '丙', '壬', '丙'],
      zhi: ['戌', '子', '辰', '午'],
      nayin: ['？', '？', '？', '？'],
      is_result: false,
      pay_modal: false, //支付弹窗
      cn_modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/24046cb4eb8a55fe42b98cbf02a04c94f0d8.png',
      tw_modal_bg,
      is_show_btn: true,
      showFixedBtn: false,
      showPayGuideModal: false,//待支付蒙版  
    };
  },
  computed: {
   
  },
  watch: {
  
  },
  async created() {
    
  },
  
  mounted() {
   
  },
  methods: {
    
  },
};
</script>

<style scoped lang="less">
.tarot-detail {
  background: #0F031A;
  width: 7.5rem;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
}

</style>
