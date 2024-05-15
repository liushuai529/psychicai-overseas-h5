<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-15 18:40:32
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-15 19:26:30
 * @Description: 
-->
<template>
  <div class="footer-tab">
    <img :src="bg_obj[product_key]" alt="" />
  </div>
</template>

<script>
import bzhh from '../assets/img/common/bazihehun_img_btnmengban.png';
import emotion from '../assets/img/common/ganqing_img_btnmengban.png';
import career from '../assets/img/common/shiye_img_btnmengban.png';
import wealth from '../assets/img/common/caiyun_img_btnmengban.png';
import year from '../assets/img/common/nianyun_img_btnmengban.png';
import ggz from '../assets/img/common/guiguzi_img_btnmengban.png';

const bg_obj = {
  h5_marriage: bzhh,
  h5_emotion2024: emotion,
  h5_career2024: career,
  h5_wealth2024: wealth,
  h5_annual2024: year,
  h5_bai_gua: ggz,
};
export default {
  name: 'HomeFooter',
  props: {
    product_key: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      bg_obj,
    };
  },

  methods: {},
  mounted() {},
};
</script>

<style scoped lang="less">
.footer-tab {
  width: 7.5rem;
  height: 1.96rem;
  position: fixed;
  bottom: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
