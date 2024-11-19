<template>
  <div class="content-item">
    <div v-show="item_index === 1" :class="`item-${item_index} ${language}-item${item_index}-bg`">
      <img :src="qian_obj[result.qian]" alt="" />
      <span>{{ result.keywords }}</span>
    </div>

    <div v-show="item_index === 2" :class="`item-${item_index} ${language}-item${item_index}-bg`">
      <img class="title-img" :src="is_cn? result_img_tittle_02_cn: result_img_tittle_02_tw"/>
      <span>{{ result }}</span>
    </div>

    <div v-show="item_index === 3" :class="`item-${item_index} ${language}-item${item_index}-bg`">
      <img class="title-img" :src="is_cn? result_img_tittle_03_cn: result_img_tittle_03_tw"/>
      <span>{{ result }}</span>
    </div>

    <div v-show="item_index === 4" :class="`item-${item_index} ${language}-item${item_index}-bg`">
      <img class="title-img" :src="is_cn? result_img_tittle_04_cn: result_img_tittle_04_tw"/>
      <span>{{ result }}</span>
    </div>

    <div v-show="item_index === 5" :class="`item-${item_index} ${language}-item${item_index}-bg`">
      <img class="title-img" :src="is_cn? result_img_tittle_05_cn: result_img_tittle_05_tw"/>
      <div class="zodiac">{{ result.zodiac }}</div>
      <div>{{ result.fortunezodiac }}</div>
    </div>

    <div v-show="item_index === 6" :class="`item-${item_index} ${language}-item${item_index}-bg`">
      <img class="title-img" :src="is_cn? result_img_tittle_06_cn: result_img_tittle_06_tw"/>
      <span>{{ result }}</span>
    </div>

    <div v-show="item_index === 7" :class="`item-${item_index} ${language}-item${item_index}-bg`">
      <img class="title-img" :src="is_cn? result_img_tittle_07_cn: result_img_tittle_07_tw"/>
      <span>{{ result }}</span>
    </div>




    <!-- <div v-show="item_index === 3" class="emo-common-box">
      <div class="emo-back-box">
        <img :src="language === 'zh-CN' ? cn_emo_back : tw_emo_back" alt="" />
      </div>
      <div class="header-box"></div>
      <div class="content-box">
        <div :class="`item-${item_index}`">
          <img class="title-3" :src="language === 'zh-CN' ? cn_title1 : tw_title1" alt="" />
          <div v-html="result.concept" class="text-box"></div>
        </div>
        <div class="item-4">
          <img class="title-3" :src="language === 'zh-CN' ? cn_title2 : tw_title2" alt="" />
          <div v-html="result.review" class="text-box"></div>
        </div>
      </div>
      <div class="footer-box"></div>
    </div>
    <div v-show="item_index === 5" class="emo-common-box">
      <div class="emo-back-box">
        <img :src="language === 'zh-CN' ? cn_ganqingzhanwang : tw_ganqingzhanwang" alt="" />
      </div>
      <div class="header-box"></div>
      <div class="content-box">
        <div class="item-4">
          <img class="title-3" :src="language === 'zh-CN' ? cn_title3 : tw_title3" alt="" />
          <div class="keyword-box">
            <div class="bg-box">
              {{ result.keyword }}
            </div>
          </div>
        </div>
        <div class="item-4">
          <img class="title-3" :src="language === 'zh-CN' ? cn_title4 : tw_title4" alt="" />
          <div v-html="result.status" class="text-box"></div>
          <div v-html="result.road_desc" class="text-box"></div>
        </div>
        <div class="item-4">
          <img class="title-3" :src="language === 'zh-CN' ? cn_title5 : tw_title5" alt="" />
          <div v-html="result.trend" class="text-box"></div>
        </div>
        <div v-if="result.notice" class="item-4">
          <img class="title-3" :src="language === 'zh-CN' ? cn_title6 : tw_title6" alt="" />
          <div v-html="result.notice" class="text-box"></div>
        </div>
      </div>
      <div class="footer-box"></div>
    </div> -->
    <CopyCode style="margin-top: 0.2rem" className="emotion2025-box" v-show="item_index === 8" tips1_color="#222"
      code_color="#EC436B" :transfer_code="result.transfer_code" codeClass="emotion2025-code"
      :code_btn="is_cn ? cn_code_btn : tw_code_btn" code_text_style="margin:.3rem auto;color:#A18884"
      @showModal="code_modal = true" a_token="idjkql" e_id="10006" c_id="-10010"
      tips5_style="width: 5.9rem;height: 0.98rem;" e_name="click_2024lovely_result" />

    <CopyCode style="margin-top: 0.2rem" className="emotion2025-download-box" v-show="item_index === 9"
      tips1_color="#222" code_color="#EC436B" :code_btn="is_cn ? cn_download_btn : tw_download_btn"
      code_text_style="margin:.3rem auto;color:#A18884" e_id="10006" c_id="-10010"
      tips5_style="width: 5.9rem;height: 0.98rem;" e_name="click_2024lovely_result" />

    <CodePop v-if="code_modal" @close="code_modal = false" />
  </div>
</template>
<script>
import ji from './../../../assets/img/emotion_v2/new/cn/result/img_qian_jian_ji.webp';
import xiaoji from './../../../assets/img/emotion_fortune_2025/result_img_qiian_xiaoji.webp';
import ping from './../../../assets/img/emotion_fortune_2025/result_img_qiian_ping.webp';
import cn_xiaoxiong from './../../../assets/img/emotion_fortune_2025/result_img_qiian_xiaoxiong.webp';

import cn_emo_back from './../../../assets/img/emotion_v2/new/cn/result/tittle_1_jian.webp';
import tw_emo_back from './../../../assets/img/emotion_v2/new/tw/result/tittle_1_fan.webp';

import cn_title1 from './../../../assets/img/emotion_v2/new/cn/result/tittle_1_1_jian.webp';
import tw_title1 from './../../../assets/img/emotion_v2/new/tw/result/tittle_1_1_fan.webp';

import cn_title2 from './../../../assets/img/emotion_v2/new/cn/result/tittle_1_2_jian.webp';
import tw_title2 from './../../../assets/img/emotion_v2/new/tw/result/tittle_1_2_fan.webp';

import cn_title3 from './../../../assets/img/emotion_v2/new/cn/result/tittle_2_1_jian.webp';
import tw_title3 from './../../../assets/img/emotion_v2/new/tw/result/tittle_2_1_fan.webp';

import cn_title4 from './../../../assets/img/emotion_v2/new/cn/result/tittle_2_2_jian.webp';
import tw_title4 from './../../../assets/img/emotion_v2/new/tw/result/tittle_2_2_fan.webp';

import cn_title5 from './../../../assets/img/emotion_v2/new/cn/result/tittle_2_3_jian.webp';
import tw_title5 from './../../../assets/img/emotion_v2/new/tw/result/tittle_2_3_fan.webp';

import cn_title6 from './../../../assets/img/emotion_v2/new/cn/result/tittle_2_4_jian.webp';
import tw_title6 from './../../../assets/img/emotion_v2/new/tw/result/tittle_2_4_fan.webp';
import utils from '../../../libs/utils';

import cn_ganqingzhanwang from '../../../assets/img/emotion_v2/new/cn/result/tittle_2_jian.webp';
import tw_ganqingzhanwang from '../../../assets/img/emotion_v2/new/tw/result/tittle_2_fan.webp';
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import tw_code_btn from '../../../assets/img/emotion_fortune_2025/cn/result_btn_copy_download_cn.webp';
import cn_code_btn from '../../../assets/img/emotion_fortune_2025/tw/result_btn_copy_download_tw.webp';
import tw_download_btn from '../../../assets/img/emotion_fortune_2025/cn/result_btn_download_cn.webp';
import cn_download_btn from '../../../assets/img/emotion_fortune_2025/tw/result_btn_download_tw.webp';
import result_img_tittle_02_cn from '../../../assets/img/emotion_fortune_2025/cn/result_img_tittle_02_cn.webp';
import result_img_tittle_02_tw from '../../../assets/img/emotion_fortune_2025/tw/result_img_tittle_02_tw.webp';

import result_img_tittle_03_cn from '../../../assets/img/emotion_fortune_2025/cn/result_img_tittle_03_cn.webp';
import result_img_tittle_03_tw from '../../../assets/img/emotion_fortune_2025/tw/result_img_tittle_03_tw.webp';

import result_img_tittle_04_cn from '../../../assets/img/emotion_fortune_2025/cn/result_img_tittle_04_cn.webp';
import result_img_tittle_04_tw from '../../../assets/img/emotion_fortune_2025/tw/result_img_tittle_04_tw.webp';

import result_img_tittle_05_cn from '../../../assets/img/emotion_fortune_2025/cn/result_img_tittle_05_cn.webp';
import result_img_tittle_05_tw from '../../../assets/img/emotion_fortune_2025/tw/result_img_tittle_05_tw.webp';

import result_img_tittle_06_cn from '../../../assets/img/emotion_fortune_2025/cn/result_img_tittle_06_cn.webp';
import result_img_tittle_06_tw from '../../../assets/img/emotion_fortune_2025/tw/result_img_tittle_06_tw.webp';

import result_img_tittle_07_cn from '../../../assets/img/emotion_fortune_2025/cn/result_img_tittle_07_cn.webp';
import result_img_tittle_07_tw from '../../../assets/img/emotion_fortune_2025/tw/result_img_tittle_07_tw.webp';

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
      cn_code_btn,
      tw_code_btn,
      cn_download_btn,
      tw_download_btn,
      result_img_tittle_02_cn,
      result_img_tittle_02_tw,
      result_img_tittle_03_cn,
      result_img_tittle_03_tw,
      result_img_tittle_04_cn,
      result_img_tittle_04_tw,
      result_img_tittle_05_cn,
      result_img_tittle_05_tw,
      result_img_tittle_06_cn,
      result_img_tittle_06_tw,
      result_img_tittle_07_cn,
      result_img_tittle_07_tw,
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
    this.qian_obj[4] = cn_xiaoxiong
  },
  mounted() { },
  methods: {},
};
</script>
<style scoped lang="less">
.zh-CN-item1-bg {
  background: url('../../../assets/img/emotion_fortune_2025/cn/result_img_cardbj_01_cn.webp') no-repeat;

}

.zh-TW-item1-bg {
  background: url('../../../assets/img/emotion_fortune_2025/tw/result_img_cardbj_01_tw.webp') no-repeat;
}

.zh-CN-item2-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;

}

.zh-TW-item2-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;
}

.zh-CN-item3-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;

}

.zh-TW-item3-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;
}

.zh-CN-item4-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;

}

.zh-TW-item4-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;
}

.zh-CN-item5-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;

}

.zh-TW-item5-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;
}

.zh-CN-item6-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;

}

.zh-TW-item6-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;
}


.zh-CN-item7-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;

}

.zh-TW-item7-bg {
  background: url('../../../assets/img/emotion_fortune_2025/result_img_cardbj.webp') no-repeat;
}



.item-1 {
  width: 7.1rem;
  height: 5.3rem;
  background-size: 100% 100%;
  margin-bottom: 0.36rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.2rem;
    margin-top: 0.5rem;
  }

  span {
    font-size: 0.35rem;
    color: #ED003F;
   
  }
}

.item-2 {
  position: relative;
  width: 7.1rem;
  background-size: 100% 100%;
  color: #5A132E;
  font-size: 0.3rem;
  line-height: 0.35rem;
  // min-height: 3.5rem;
  padding: 0.3rem;
  padding-top: 1rem;
  margin-bottom: 0.36rem;
  .title-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 7.1rem;
    height: 1rem;
  }
}

.item-3,
.item-4,
.item-6,
.item-7 {
  position: relative;
  width: 7.1rem;
  background-size: 100% 100%;
  color: #5A132E;
  font-size: 0.3rem;
  line-height: 0.35rem;
  // min-height: 3.5rem;
  padding: 0.3rem;
  padding-top: 1rem;
  margin-bottom: 0.36rem;
  .title-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 7.1rem;
    height: 1rem;
  }
}

.item-5 {
  position: relative;
  width: 7.1rem;
  background-size: 100% 100%;
  color: #5A132E;
  font-size: 0.3rem;
  line-height: 0.35rem;
  padding: 0.3rem;
  padding-top: 1rem;
  margin-bottom: 0.36rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 7.1rem;
    height: 1rem;
  }
}



.emo-common-box {
  width: 7.06rem;
  min-height: 6rem;
  margin-top: 0.4rem;
  position: relative;
  background: #fffafa;
  color: #6d2215;
  border-radius: 0.16rem;
  margin-bottom: 0.36rem;

  .header-box {
    width: 100%;
    height: 2rem;
    // background: url('../../../assets/img/emotion/result_kuang_bg1.webp')
    // no-repeat;
    background-size: contain;
  }

  .content-box {
    width: 100%;
    min-height: 4.26rem;
    // background: url('../../../assets/img/emotion/result_kuang_bg2.webp') repeat-y;
    background-size: 100% auto;
    margin-top: -1rem;
    font-size: 0.28rem;
    font-family: PingFangSC;
    font-weight: normal;
    line-height: 0.4rem;

    .text-box {
      width: 6.5rem;
      min-height: 2rem;
      line-height: 0.4rem;
    }
  }

  .footer-box {
    width: 100%;
    height: 2.26rem;
    // background: url('../../../assets/img/emotion/result_kuang_bg3.webp')
    //   no-repeat;
    background-size: contain;
    margin-top: -2.6rem;
  }
}

.emo-back-box {
  width: 100%;
  height: 0.9rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -0.13rem;

  img {
    width: 6.68rem;
    height: 0.9rem;
  }
}

.item-3,
.item-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.7rem;

  .title-3 {
    width: 5.16rem;
    height: 0.72rem;
    margin-bottom: 0.4rem;
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
    background: url('../../../assets/img/emotion_v2/new/cn/result/result_img_ci.webp') no-repeat;
    background-size: contain;
    font-size: 0.44rem;
    font-family: PingFangSC;
    font-weight: 600;
    color: #fff;
    line-height: 0.62rem;
  }
}

.code-box {
  // width: 7.06rem;
  // height: 7.11rem;
  // background: url('../../../assets/img/emotion/new/result_name_bg.webp')
  //   no-repeat;
  width: 7.06rem;
  height: 5.12rem;
  background: url('../../../assets/img/mlxz/downloadBtn/emo-bg.webp') no-repeat;
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
    background: url('../../../assets/img/emotion/new/img_shibiema_card.webp') no-repeat;
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
