<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-12-20 14:26:33
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-23 10:21:32
 * @Description: 
-->
<template>
  <div class="content-item">
    <div
      v-show="item_index === 2"
      :class="`item-${item_index} ${language}-item${item_index}-bg`"
    >
      <img :src="qian_obj[result]" alt="" />
    </div>
    <div v-show="item_index === 3" class="emo-common-box">
      <div class="emo-back-box">
        <img :src="language === 'zh-CN' ? cn_emo_back : tw_emo_back" alt="" />
      </div>
      <div class="header-box"></div>
      <div class="content-box">
        <div :class="`item-${item_index}`">
          <img
            class="title-3"
            :src="language === 'zh-CN' ? cn_title1 : tw_title1"
            alt=""
          />
          <div v-html="result.concept" class="text-box"></div>
        </div>
        <div class="item-4">
          <img
            class="title-3"
            :src="language === 'zh-CN' ? cn_title2 : tw_title2"
            alt=""
          />
          <div v-html="result.review" class="text-box"></div>
        </div>
      </div>
      <div class="footer-box"></div>
    </div>
    <div v-show="item_index === 5" class="emo-common-box">
      <div class="emo-back-box">
        <img
          :src="language === 'zh-CN' ? cn_ganqingzhanwang : tw_ganqingzhanwang"
          alt=""
        />
      </div>
      <div class="header-box"></div>
      <div class="content-box">
        <div class="item-4">
          <img
            class="title-3"
            :src="language === 'zh-CN' ? cn_title3 : tw_title3"
            alt=""
          />
          <div class="keyword-box">
            <div class="bg-box">
              {{ result.keyword }}
            </div>
          </div>
        </div>
        <div class="item-4">
          <img
            class="title-3"
            :src="language === 'zh-CN' ? cn_title4 : tw_title4"
            alt=""
          />
          <div v-html="result.status" class="text-box"></div>
          <div v-html="result.road_desc" class="text-box"></div>
        </div>
        <div class="item-4">
          <img
            class="title-3"
            :src="language === 'zh-CN' ? cn_title5 : tw_title5"
            alt=""
          />
          <div v-html="result.trend" class="text-box"></div>
        </div>
        <div v-if="result.notice" class="item-4">
          <img
            class="title-3"
            :src="language === 'zh-CN' ? cn_title6 : tw_title6"
            alt=""
          />
          <div v-html="result.notice" class="text-box"></div>
        </div>
      </div>
      <div class="footer-box"></div>
    </div>
    <CopyCode
      style="margin-top: 0.2rem"
      className="emotion-box"
      v-show="item_index === 6"
      tips1_color="#fff"
      code_color="#FF4455"
      :transfer_code="result.transfer_code"
      codeClass="emotion-code"
      :code_btn="is_cn ? cn_code_btn : tw_code_btn"
      code_text_style="margin:.3rem auto;color:#FFD3EB"
      @showModal="code_modal = true"
    />

    <CodePop v-if="code_modal" @close="code_modal = false" />
  </div>
</template>
<script>
import ji from './../../../assets/img/emotion/result_img_qian1.png';
import xiaoji from './../../../assets/img/emotion/result_img_qian2.png';
import ping from './../../../assets/img/emotion/result_img_qian3.png';
import cn_xiaoxiong from './../../../assets/img/emotion/result_img_qian4.png';
import tw_xiaoxiong from './../../../assets/img/tw_mlxz/emotion/result/result_img_qian4.png';
import cn_emo_back from './../../../assets/img/emotion/qingganhuigu.png';
import tw_emo_back from './../../../assets/img/tw_mlxz/emotion/result/yu_img_title.png';

import cn_title1 from './../../../assets/img/emotion/result_img_title1.png';
import tw_title1 from './../../../assets/img/tw_mlxz/emotion/result/result_img_title1.png';

import cn_title2 from './../../../assets/img/emotion/result_img_title2.png';
import tw_title2 from './../../../assets/img/tw_mlxz/emotion/result/result_img_title2.png';

import cn_title3 from './../../../assets/img/emotion/result_img_title3.png';
import tw_title3 from './../../../assets/img/tw_mlxz/emotion/result/result_img_title3.png';

import cn_title4 from './../../../assets/img/emotion/result_img_title4.png';
import tw_title4 from './../../../assets/img/tw_mlxz/emotion/result/result_img_title4.png';

import cn_title5 from './../../../assets/img/emotion/result_img_title5.png';
import tw_title5 from './../../../assets/img/tw_mlxz/emotion/result/result_img_title5.png';

import cn_title6 from './../../../assets/img/emotion/result_img_title6.png';
import tw_title6 from './../../../assets/img/tw_mlxz/emotion/result/result_img_title6.png';
import utils from '../../../libs/utils';

import cn_ganqingzhanwang from '../../../assets/img/emotion/new/tw/yu_img_title.png';
import tw_ganqingzhanwang from '../../../assets/img/emotion/new/tw/yu_img_title.png';
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import tw_code_btn from '../../../assets/img/mlxz/downloadBtn/tw/emotion24.png';
import { Toast } from 'vant';
export default {
  props: {
    item_index: {
      type: Number,
      default: 1,
    },
    result: {
      type: String | Object | Array,
      default: '',
    },
    content_arr: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CodePop,
    CopyCode,
  },
  data() {
    return {
      ji,
      xiaoji,
      ping,
      cn_xiaoxiong,
      tw_xiaoxiong,
      cn_emo_back,
      tw_emo_back,
      qian_obj: {
        1: ji,
        2: xiaoji,
        3: ping,
      },
      cn_title1,
      tw_title1,
      cn_title2,
      tw_title2,
      cn_title3,
      tw_title3,
      cn_title4,
      tw_title4,
      cn_title5,
      tw_title5,
      cn_title6,
      tw_title6,
      language: utils.getLanguage(),
      cn_ganqingzhanwang,
      tw_ganqingzhanwang,
      code_modal: false,
      cn_code_btn:
        'https://psychicai-static.psychicai.pro/imgs/2404ad14caba9a0446039d7e3f8f8a1f37f2.png',
      tw_code_btn,
    };
  },
  computed: {
    titleImg() {
      return this[`title${this.item_index - 2}`];
    },
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  created() {
    this.qian_obj[4] = this.language === 'zh-CN' ? cn_xiaoxiong : tw_xiaoxiong;
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="less">
.zh-CN-item2-bg {
  background: url('../../../assets/img/emotion/result_card2.png') no-repeat;
}
.zh-TW-item2-bg {
  background: url('../../../assets/img/tw_mlxz/emotion/result/result_card2.png')
    no-repeat;
}
.item-2 {
  width: 7.06rem;
  height: 4.68rem;
  // background: url('../../../assets/img/emotion/result_card2.png') no-repeat;
  background-size: contain;
  img {
    width: 4.79rem;
    height: 3.12rem;
    margin-top: 1.2rem;
    margin-left: 1.14rem;
  }
}
.emo-common-box {
  width: 7.06rem;
  min-height: 6rem;
  margin-top: 0.4rem;
  position: relative;
  .header-box {
    width: 100%;
    height: 2.26rem;
    background: url('../../../assets/img/emotion/result_kuang_bg1.png')
      no-repeat;
    background-size: contain;
  }
  .content-box {
    width: 100%;
    min-height: 4.26rem;
    background: url('../../../assets/img/emotion/result_kuang_bg2.png') repeat-y;
    background-size: 100% auto;
    margin-top: -1rem;
    font-size: 0.28rem;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 0.4rem;
    .text-box {
      width: 5.9rem;
      min-height: 2rem;
    }
  }
  .footer-box {
    width: 100%;
    height: 2.26rem;
    background: url('../../../assets/img/emotion/result_kuang_bg3.png')
      no-repeat;
    background-size: contain;
    margin-top: -1.5rem;
  }
}
.emo-back-box {
  width: 100%;
  height: 0.84rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -0.13rem;
  img {
    width: 4.68rem;
    height: 100%;
  }
}

.item-3,
.item-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.4rem;
  .title-3 {
    width: 5.16rem;
    height: 0.72rem;
    margin-bottom: 0.2rem;
  }
}

.keyword-box {
  width: 100%;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg-box {
    width: 3.3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../../../assets/img/emotion/result_img_ci.png') no-repeat;
    background-size: contain;
    font-size: 0.44rem;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    color: #ff4455;
    line-height: 0.62rem;
  }
}

.code-box {
  // width: 7.06rem;
  // height: 7.11rem;
  // background: url('../../../assets/img/emotion/new/result_name_bg.png')
  //   no-repeat;
  width: 7.06rem;
  height: 5.12rem;
  background: url('../../../assets/img/mlxz/downloadBtn/emo-bg.png') no-repeat;
  background-size: contain;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 3.05rem;
    height: 0.82rem;
    margin-top: 1.53rem;
    margin-bottom: 0.32rem;
  }
  .tip {
    height: 0.28rem;
    font-weight: 400;
    font-size: 0.28rem;
    color: #ffffff;
    line-height: 0.28rem;
  }
  .code {
    width: 5.56rem;
    height: 1.04rem;
    background: url('../../../assets/img/emotion/new/img_shibiema_card.png')
      no-repeat;
    background-size: contain;
    margin-top: 0.4rem;
    color: #ff4455;
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
    margin-bottom: 0.2rem;
    color: #fff;
    font-size: 0.24rem;
    opacity: 0.6;
  }
  .copy {
    width: 5.8rem;
    height: 1.24rem;
    margin-top: 0.38rem;
  }
}
</style>
