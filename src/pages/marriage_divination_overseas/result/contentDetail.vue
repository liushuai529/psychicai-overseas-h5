<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-07 21:00:52
 * @LastEditors: wujiang 
 * @LastEditTime: 2023-11-09 16:00:22
 * @Description: 姻缘分析
-->
<template>
  <div class="shadow">
    <img class="title" :src="title_url" alt="" />
    <div
      class="content"
      :style="{ backgroundImage: 'url(' + bagua + ')' }"
      v-html="data"
    ></div>
  </div>
</template>

<script>
import title_bg from './../../../assets/img/marriage_divination_overseas/result/sub_title_bg.png';
import bagua from './../../../assets/img/marriage_divination_overseas/result/bagua.png';
import title_1 from './../../../assets/img/mlxz/marry/result/detail_content_title_1.png';
import title_2 from './../../../assets/img/mlxz/marry/result/detail_content_title_2.png';
import title_3 from './../../../assets/img/mlxz/marry/result/detail_content_title_3.png';
import title_4 from './../../../assets/img/mlxz/marry/result/detail_content_title_4.png';
import title_5 from './../../../assets/img/mlxz/marry/result/detail_content_title_5.png';
import title_6 from './../../../assets/img/mlxz/marry/result/detail_content_title_6.png';

export default {
  props: ['data', 'index', 'title'],
  data() {
    return {
      title_bg: title_bg,
      title_1: title_1,
      title_2: title_2,
      title_3: title_3,
      title_4: title_4,
      title_5: title_5,
      title_6: title_6,
      bagua: bagua,
    };
  },
  computed: {
    title_url() {
      return this['title_' + this.index];
    },
    isAndroid() {
      const user_agent = navigator.userAgent.toLocaleLowerCase();
      return /android/i.test(user_agent);
    },
  },
};
</script>

<style scoped>
.shadow {
  text-align: center;
}

div.title {
  width: 6.74rem;
  height: 0.52rem;
  line-height: 0.54rem;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  margin-bottom: 0.4rem;
  color: #fff;
  font-size: 0.36rem;
  text-align: center;
  letter-spacing: 0.08rem;
  font-family: 'FZQKBYSJW';
  font-weight: 300;
}
div.android-title {
  line-height: 0.6rem;
}

img.title {
  height: 0.5rem;
  vertical-align: top;
  margin-top: 0.6rem;
}

.content {
  color: #d13c3e;
  font-size: 0.32rem;
  background-color: #fdf5df;
  padding: 0.3rem;
  border-radius: 0.2rem;
  line-height: 0.54rem;
  text-align: left;
  line-height: 2;
  background-repeat: no-repeat;
  -webkit-background-size: 5rem 5rem;
  background-size: 5rem 5rem;
  background-position: center center;
}
</style>
