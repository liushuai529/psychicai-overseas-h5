<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-22 15:12:56
 * @Description: 底部banner展示
-->
<template>
  <div class="content-1">
    <img class="title" :src="is_cn ? cn_title : tw_title" />
    <div class="card-box">
      <img class="card-item" :src="is_cn ? cn_card1 : tw_card1" />
      <img class="card-item" :src="is_cn ? cn_card2 : tw_card2" />
      <img class="card-item" :src="is_cn ? cn_card3 : tw_card3" />
      <img class="card-item" :src="is_cn ? cn_card4 : tw_card4" />
    </div>
  </div>
</template>
<script>
import utils from '../../../libs/utils';
import cn_title from '../../../assets/img/mlxz/weigh_bone/home_img_title1.png';
import cn_card1 from '../../../assets/img/mlxz/weigh_bone/home_img_card1.png';
import cn_card2 from '../../../assets/img/mlxz/weigh_bone/home_img_card2.png';
import cn_card3 from '../../../assets/img/mlxz/weigh_bone/home_img_card3.png';
import cn_card4 from '../../../assets/img/mlxz/weigh_bone/home_img_card4.png';
import tw_title from '../../../assets/img/mlxz/weigh_bone/tw/home_img_title1_fanti.png';
import tw_card1 from '../../../assets/img/mlxz/weigh_bone/tw/home_img_card1_fanti.png';
import tw_card2 from '../../../assets/img/mlxz/weigh_bone/tw/home_img_card2_fanti.png';
import tw_card3 from '../../../assets/img/mlxz/weigh_bone/tw/home_img_card3_fanti.png';
import tw_card4 from '../../../assets/img/mlxz/weigh_bone/tw/home_img_card4_fanti.png';
export default {
  name: 'footerBanner',
  components: {},
  data() {
    return {
      cn_card1,
      tw_card1,
      cn_card2,
      tw_card2,
      cn_card3,
      tw_card3,
      cn_card4,
      tw_card4,
      cn_title,
      tw_title,
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
};
</script>
<style scoped lang="less">
.content-1 {
  width: 7.1rem;
  min-height: 3.79rem;
  background-image: url('../../../assets/img/mlxz/weigh_bone/img_mokuai_bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #37438a;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 0.4rem;
  .title {
    width: 3.64rem;
    height: 0.81rem;
    margin-top: 0.4rem;
    margin-bottom: 0.5rem;
  }
  .card-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4rem;
    img {
      margin: 0 0.15rem;
      width: 1.44rem;
      height: 1.68rem;
      animation: moveUpDown 2s infinite ease-in-out alternate;
    }
  }
}

// 先上移10px 再下移10px的动画

@keyframes moveUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0.1rem);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
