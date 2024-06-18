<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-10 15:23:55
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-09 20:44:16
 * @Description: 
-->
<template>
  <div class="detail">
    <div v-show="card_index !== 4" class="title">
      <img :src="getTitle(card_index)" alt="" />
    </div>
    <div v-if="card_index === 1" class="card-1">
      <div class="mingge">
        {{ fortune.mingge }}
      </div>
      <div class="weight">
        <span class="left">骨重</span>
        <span>{{ fortune.weight }}</span>
      </div>
      <div class="divider-w"></div>
      <div v-html="fortune.ge" class="ge"></div>
    </div>
    <div v-if="card_index === 2" :class="`card-2 level-${level}`">
      <div :class="`qipao qipao-${level}`">
        <span> {{ fortune }}</span>
      </div>
    </div>
    <div v-if="card_index === 3" v-html="fortune" class="card-3"></div>
    <CopyCode
      v-if="card_index === 4"
      :is_black_logo="false"
      :set_title="true"
      title_icon="https://psychicai-static.psychicai.pro/imgs/2404f6078b9f52f1423db567e9d254e7888d.png"
      title_icon_style="width: 3.64rem;height: .81rem;margin:.4rem auto .5rem;"
      className="weight-box"
      tips1_color="#fff"
      code_color="#1D2764"
      :transfer_code="fortune.transfer_code"
      codeClass="weight-code"
      :code_btn="is_cn ? cn_code_btn : tw_code_btn"
      code_text_style="margin:.4rem auto .3rem;color:#999FC2"
      tips5_style="width: 5.12rem;height: 1rem;margin-bottom: .4rem;"
      @showModal="code_modal = true"
      a_token="m00746"
      e_id="10009"
      c_id="-10010"
      e_name="click_chenggu_result"
    />

    <CodePop v-if="code_modal" @close="code_modal = false" />
  </div>
</template>

<script>
import cn_title1 from '../../../assets/img/mlxz/weigh_bone/img_title4.webp';
import cn_title2 from '../../../assets/img/mlxz/weigh_bone/img_title5.webp';
import cn_title3 from '../../../assets/img/mlxz/weigh_bone/img_title6.webp';
import tw_title1 from '../../../assets/img/mlxz/weigh_bone/tw/img_title4_fanti.webp';
import tw_title2 from '../../../assets/img/mlxz/weigh_bone/tw/img_title5_fanti.webp';
import tw_title3 from '../../../assets/img/mlxz/weigh_bone/tw/img_title6_fanti.webp';
import utils from '../../../libs/utils';
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import tw_code_btn from '../../../assets/img/mlxz/downloadBtn/tw/weigh_bone.webp';
export default {
  props: ['fortune', 'card_index'],
  data() {
    return {
      cn_title1,
      cn_title2,
      cn_title3,
      tw_title1,
      tw_title2,
      tw_title3,
      level: null,
      code_modal: false,
      cn_code_btn:
        'https://psychicai-static.psychicai.pro/imgs/2404493abf2d845947b98c073cdab646aaed.png',
      tw_code_btn,
    };
  },
  components: {
    CodePop,
    CopyCode,
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  mounted() {
    this.card_index === 2 && this.getLevel(this.fortune);
  },
  methods: {
    /**
     * @description: 获取图片title
     * @param {*} card_index
     * @return {*}
     */
    getTitle(card_index) {
      return this[(this.is_cn ? 'cn_' : 'tw_') + 'title' + card_index];
    },

    /**
     * @description: 获取分数
     * @param {*} fortune
     * @return {*}
     */
    getLevel(fortune) {
      if (!fortune) return '';
      if (fortune > 87) {
        this.level = 4;
      } else if (fortune > 75) {
        this.level = 3;
      } else if (fortune > 63) {
        this.level = 2;
      } else {
        this.level = 1;
      }
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  width: 7.1rem;
  min-height: 4.75rem;
  border-radius: 0.2rem;
  background-image: url('../../../assets/img/mlxz/weigh_bone/img_mokuai_bg.webp');
  background-color: #37438a;
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.4rem auto 0.3rem;
    img {
      width: 3.64rem;
      height: 0.81rem;
    }
  }
}
.card-1 {
  width: 6.02rem;
  height: 3.4rem;
  background: url('../../../assets/img/mlxz/weigh_bone/img_paper_bg.webp')
    no-repeat;
  background-size: contain;
  margin-bottom: 0.5rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  .mingge {
    height: 0.67rem;
    font-size: 0.38rem;
    color: #1d2764;
    line-height: 0.67rem;
    margin: 0.35rem auto 0.04rem;
  }
  .weight {
    color: #ca0915;
    font-size: 0.3rem;
    .left {
      margin-right: 0.2rem;
    }
  }
  .divider-w {
    width: 4.52rem;
    height: 2px;
    background: #37438a;
    opacity: 0.5;
    margin: 0.21rem auto 0.28rem;
  }
  .ge {
    font-size: 0.3rem;
    color: #1d2764;
  }
}
.card-3 {
  width: 6.1rem;
  font-size: 0.3rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.48rem;
  margin-bottom: 0.4rem;
}

.card-2 {
  width: 5.84rem;
  height: 2.56rem;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
}
.level-1 {
  background-image: url('../../../assets/img/mlxz/weigh_bone/quxian_lv1.webp');
}
.level-2 {
  background-image: url('../../../assets/img/mlxz/weigh_bone/quxian_lv2.webp');
}
.level-3 {
  background-image: url('../../../assets/img/mlxz/weigh_bone/quxian_lv3.webp');
}
.level-4 {
  background-image: url('../../../assets/img/mlxz/weigh_bone/quxian_lv4.webp');
}
.qipao {
  width: 0.92rem;
  height: 0.57rem;
  background: url('../../../assets/img/mlxz/weigh_bone/img_qipao.webp') no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  font-size: 0.32rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  position: absolute;
  span {
    height: 0.36rem;
    line-height: 0.36rem;
    margin-top: 0.05rem;
  }
}
.qipao-4 {
  right: 0.3rem;
  top: -0.35rem;
}
.qipao-3 {
  right: 0.7rem;
  top: 0;
}
.qipao-2 {
  right: 1rem;
  top: 0.3rem;
}
.qipao-1 {
  right: 1.25rem;
  top: 0.6rem;
}

.card-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 400;
  font-size: 0.28rem;
  color: #ffffff;
  .title-1 {
    width: 3.64rem;
    height: 0.81rem;
    margin: 0.4rem auto 0.5rem;
  }
  .title-2 {
    width: 3.05rem;
    height: 0.82rem;
    margin: 0 auto 0.32rem;
  }
  .title-3 {
    width: 5.12rem;
    height: 1rem;
    margin: 0.39rem auto;
  }
  .code {
    width: 5.56rem;
    height: 1.04rem;
    background: url('https://psychicai-static.psychicai.pro/imgs/24043fee2a7a62944e02baa3fa2d56cc64d1.png')
      no-repeat;
    background-size: contain;
    margin-top: 0.4rem;
    color: #1d2764;
    font-weight: 600;
    font-size: 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    span {
      margin-left: 0.1rem;
      text-decoration: underline;
    }
  }
  .desc {
    font-size: 0.26rem;
    color: #ccc;
    opacity: 0.6;
  }
}
</style>
