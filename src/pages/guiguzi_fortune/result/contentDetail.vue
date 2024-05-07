<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-09 18:48:16
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-26 14:00:15
 * @Description: 
-->
<template>
  <div class="shadow">
    <div class="title-box">
      <img class="title" :src="title_url" alt />
    </div>
    <div v-if="title_index !== 6" class="content">
      {{ result }}
    </div>
    <div v-else class="content flex-box mt-0">
      <div v-if="user.name" class="name">
        {{ user.name | filter_name }}的{{ $t('zhongshengua') }}
      </div>
      <div class="gua-box">
        <img
          v-for="(it, k) in str"
          :key="'gua' + k"
          :src="it === '1' ? gua_two : gua_one"
          alt=""
        />
      </div>
      <div v-if="user.name" class="name mt-20">{{ result }}卦</div>
    </div>
  </div>
</template>

<script>
import cn_title_1 from '../../../assets/img/mlxz/guiguzi/result_img_title1@3x.png';
import tw_title_1 from '../../../assets/img/tw_mlxz/guiguzi/result/result_img_title1.png';

import cn_title_2 from '../../../assets/img/mlxz/guiguzi/result_img_title2@3x.png';
import tw_title_2 from '../../../assets/img/tw_mlxz/guiguzi/result/result_img_title2.png';

import cn_title_3 from '../../../assets/img/mlxz/guiguzi/result_img_title3@3x.png';
import tw_title_3 from '../../../assets/img/tw_mlxz/guiguzi/result/result_img_title3.png';

import cn_title_4 from '../../../assets/img/mlxz/guiguzi/result_img_title4@3x.png';
import tw_title_4 from '../../../assets/img/tw_mlxz/guiguzi/result/result_img_title4.png';

import cn_title_5 from '../../../assets/img/mlxz/guiguzi/result_img_title5@3x.png';
import tw_title_5 from '../../../assets/img/tw_mlxz/guiguzi/result/result_img_title5.png';

import cn_title_6 from '../../../assets/img/mlxz/guiguzi/result_img_zhongshen.png';
import tw_title_6 from '../../../assets/img/tw_mlxz/guiguzi/result/result_img_zhongshen.png';

import gua_two from '../../../assets/img/mlxz/guiguzi/img_gua2.png';
import gua_one from '../../../assets/img/mlxz/guiguzi/img_gua1.png';
import utils from '../../../libs/utils';
export default {
  props: ['result', 'title_index', 'title', 'user', 'gua_code'],
  data() {
    return {
      cn_title_1,
      tw_title_1,
      cn_title_2,
      tw_title_2,
      cn_title_3,
      tw_title_3,
      cn_title_4,
      tw_title_4,
      cn_title_5,
      tw_title_5,
      cn_title_6,
      tw_title_6,
      gua_two,
      gua_one,
      str: '111111',
      language: utils.getLanguage(),
    };
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
  },
  computed: {
    title_url() {
      let _lang = utils.getLanguage() === 'zh-CN' ? 'cn' : 'tw';
      return this[_lang + '_title_' + this.title_index];
    },
  },
  mounted() {
    if (this.title_index === 6 && this.gua_code) {
      this.str = this.reverseArr(this.gua_code);
    }
  },
  watch: {},
  methods: {
    // 字符串截取
    reverseArr(string) {
      return string.split('').reverse();
    },
  },
};
</script>

<style scoped lang="less">
.shadow {
  width: 7.1rem;
  min-height: 5.39rem;
  background: url('../../../assets/img/mlxz/guiguzi/content_detail_bg.png')
    no-repeat;
  background-size: 100% 100%;
  padding: 0.54rem 0.5rem 0.4rem;
  margin-bottom: 0.2rem;
  .title-box {
    width: 100%;
    height: 0.86rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      width: 3.4rem;
      height: 0.86rem;
    }
  }
  .content {
    font-size: 0.3rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 0.48rem;
    margin-top: 0.24rem;
    .name {
      width: 100%;
      text-align: center;
      margin: 0.3rem auto 0.2rem;
      height: 0.42rem;
      font-size: 0.3rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 700;
      color: #333333;
      line-height: 0.42rem;
    }
    .gua-box {
      width: 1.8rem;
      min-height: 1.2rem;
      background: #e2d0b9;
      border: 1px solid #9b6a31;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 0.2rem;
      img {
        width: 1.2rem;
        height: 0.2rem;
        margin-bottom: 0.2rem;
      }
    }
  }
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.mt-0 {
  margin-top: 0 !important;
}
.mt-20 {
  margin-top: 0.2rem !important;
}
</style>
