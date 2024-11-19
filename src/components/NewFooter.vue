<template>
  <div class="new-footer">
    <img :src="imgUrl" />
  </div>
</template>

<script>

import h5_emotion2024 from '../assets/img/bottom_bg/emotion.webp';
import h5_emotion2025 from '../assets/img/bottom_bg/emotion_2025.webp';
import h5_marriage from '../assets/img/bottom_bg/h5_marriage.webp';
import h5_wealth2024 from '../assets/img/bottom_bg/h5_wealth2024.webp';
import h5_career2024 from '../assets/img/bottom_bg/h5_career2024.webp';
import h5_bai_gua from '../assets/img/bottom_bg/h5_bai_gua.webp';
import h5_annual2024 from '../assets/img/bottom_bg/h5_annual2024.webp';
import h5_annual2025 from '../assets/img/bottom_bg/h5_annual2025.webp';
import consult_time from '../assets/img/bottom_bg/consult_time.webp';
import consult_time1 from '../assets/img/emotion_marriages/hunyin_img_btnmengban.webp';


export default {
  name: "NewFooter",
  props: {
    product_key: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      h5_emotion2024,
      h5_emotion2025,
      h5_marriage,
      h5_wealth2024,
      h5_career2024,
      h5_bai_gua,
      h5_annual2024,
      h5_annual2025,
      consult_time,
      consult_time1,
    }
  },
  computed: {
    imgUrl() {
      if (this.type) {
        return consult_time1;
      }
      switch (this.product_key) {
        case 'h5_emotion2024':
          return this.h5_emotion2024
        case 'h5_emotion2025':
          return this.h5_emotion2025
        case 'h5_marriage':
          return this.h5_marriage
        case 'h5_wealth2024':
          return this.h5_wealth2024
        case 'h5_career2024':
          return this.h5_career2024
        case 'h5_bai_gua':
          return this.h5_bai_gua
        case 'h5_annual2024':
          return this.h5_annual2024
        case 'h5_annual2025':
          return this.h5_annual2025
        case 'consult_time':
          return this.consult_time
        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="less">
.new-footer {
  position: fixed;
  width: 100%;
  height: 2rem;
  z-index: 98;
  bottom: -0.03rem;

  img {
    width: 7.5rem;
    // height: 2rem;
  }
}
</style>
