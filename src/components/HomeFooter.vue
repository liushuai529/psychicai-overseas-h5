<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-15 18:40:32
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-28 15:38:52
 * @Description: 
-->
<template>
  <div
    class="footer-tab"
    :style="{
      bottom: is_android ? '1.2rem' : '0',
    }"
  >
    <img :src="bg_obj[product_key]" alt="" />
  </div>
</template>

<script>
import bzhh from '../assets/img/common/bazihehun_img_btnmengban.webp';
import emotion from '../assets/img/common/ganqing_img_btnmengban.webp';
import career from '../assets/img/common/shiye_img_btnmengban.webp';
import wealth from '../assets/img/common/caiyun_img_btnmengban.webp';
import year from '../assets/img/common/nianyun_img_btnmengban.webp';
import ggz from '../assets/img/common/guiguzi_img_btnmengban.webp';
import utils from '../libs/utils';
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
  computed: {
    is_android() {
      return utils.isAndroid();
    },
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
  display: none;
  // bottom: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
