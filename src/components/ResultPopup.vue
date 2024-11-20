<template>
  <div class="result-popup" :style="{'background': getbgStyle}" v-show="show_modal">
    <div class="result-container">
      <div class="head">
        <div class="title">{{ tips_arr1[lang] }}</div>
        <div style="margin-top: 0.2rem;">{{ `您的【${tips_arr9[product_key][lang]}】${tips_arr2[lang]}` }}</div>
        <div style="margin-top: 0.2rem;">{{ is_cn? '【命理寻真】赠送15分钟免费在线咨询，职业咨询师针对性解决您的困扰。': '【命理尋真】贈送15分鐘免費在線咨詢，職業咨詢師針對性解決您的困擾。' }}</div>
      </div>
      <div class="copy-container">
        <div class="left">{{tips_arr6[lang]}}：{{ transfer_code }}</div>
        <div class="right" @click="handleCopyCode" v-if="transfer_code">{{ tips_arr3[lang] }}</div>
      </div>
      <div class="tip">
        <div>{{ tips_arr5[lang] }}</div>
        <div>{{ tips_arr7[lang] }}</div>
      </div>
      <img class="logo" :src="is_cn? cn_img_popovers_logo: tw_img_popovers_logo"/>
      <div class="btn" @click="downClick">{{ tips_arr8[lang] }}</div>
    </div>
  </div>
</template>
<script>
import utils from '../libs/utils';
//h5_emotion2024

import cn_img_popovers_logo from '../assets/img/components/result_popup/cn/img_popovers_logo_cn.webp';
import tw_img_popovers_logo from '../assets/img/components/result_popup/tw/img_popovers_logo_tw.webp';
import { Toast } from 'mint-ui';
const lang = utils.getLanguage();
const tips_arr1 = {
  'zh-CN': '尊敬的用户您好：',
  'zh-TW': '尊敬的用戶您好：',
};
const tips_arr2 = {
  'zh-CN': '已生成，为了保障您的隐私，全部报告请在【命理寻真】App中查看。',
  'zh-TW': '已生成，為了保障您的隱私，全部報告請在【命理尋真】App中查看。',
};
const tips_arr3 = {
  'zh-CN': '复制',
  'zh-TW': '複製',
};
const tips_arr4 = {
  'zh-CN': '复制成功',
  'zh-TW': '複製成功',
};
const tips_arr5 = {
  'zh-CN': '复制邀请码，打开命理寻真App',
  'zh-TW': '復製邀請碼，打開命理尋真App',
};
const tips_arr6 = {
  'zh-CN': '邀请码',
  'zh-TW': '邀請碼',
};
const tips_arr7 = {
  'zh-CN': '请在我的——我的报告中查看。',
  'zh-TW': '請在我的——我的報告中查看。',
};
const tips_arr8 = {
  'zh-CN': '复制邀请码并立即下载查看',
  'zh-TW': '復製邀請碼並立即下載查看',
};
const tips_arr9 = {
  h5_wealth2024: {
    'zh-CN': '2024年财运',
    'zh-TW': '2024年財運', 
  },
  h5_annual2024: {
    'zh-CN': '2024年年运',
    'zh-TW': '2024年年運', 
  },
  h5_annual2025: {
    'zh-CN': '2025年年运',
    'zh-TW': '2025年年運', 
  },
  h5_weigh_bone: {
    'zh-CN': '袁天罡秤骨',
    'zh-TW': '袁天罡秤骨', 
  }, // 袁天罡秤骨
  h5_bai_gua: {
    'zh-CN': '鬼谷子',
    'zh-TW': '鬼谷子', 
  }, // 鬼谷子
  h5_emotion2024: {
    'zh-CN': '2024年爱情运势',
    'zh-TW': '2024年愛情運勢', 
  }, // 2024年爱情运势
  h5_emotion2025: {
    'zh-CN': '2025年爱情运势',
    'zh-TW': '2025年愛情運勢', 
  }, // 2025年爱情运势
  h5_marriage: {
    'zh-CN': '八字合婚',
    'zh-TW': '八字合婚', 
  },
  h5_career2024: {
    'zh-CN': '2024年事业运势',
    'zh-TW': '2024年事業運勢', 
  }, // 2024年事业运势
};

const show_info = {
  h5_wealth2024: {module: 10005, 'content_id': -10020, 'event_name': 'view_2024wealty_download', type: 'view'}, // 2024年财运
  h5_annual2024: {module: 10003, 'content_id': -10020, 'event_name': 'view_2024report_download', type: 'view'}, // 2024年年运
  h5_annual2025: {module: 10015, 'content_id': -10020, 'event_name': 'view_year2025_download', type: 'view'}, // 2025年年运
  h5_weigh_bone: {module: 10009, 'content_id': -10020, 'event_name': 'view_chenggu_download', type: 'view'}, // 袁天罡秤骨
  h5_bai_gua: {module: 10008, 'content_id': -10020, 'event_name': 'view_64gua_download', type: 'view'}, // 鬼谷子
  h5_emotion2024: {module: 10006, 'content_id': -10029, 'event_name': 'view_2024lovely_download', type: 'view'}, // 2024年爱情运势
  h5_marriage: {module: 10007, 'content_id': -10031, 'event_name': 'view_marriage_download', type: 'view'}, //合婚
  h5_career2024: {module: 10004, 'content_id': -10020, 'event_name': 'view_2024career_download', type: 'view'}, // 2024年事业运势 
}
const copy_info = {
  h5_wealth2024: {module: 10005, 'content_id': -10021, 'event_name': 'click_2024wealty_copy', type: 'click'}, // 2024年财运
  h5_annual2024: {module: 10003, 'content_id': -10021, 'event_name': 'click_2024report_copy', type: 'click'}, // 2024年年运
  h5_annual2025: {module: 10015, 'content_id': -10021, 'event_name': 'click_year2025_copy', type: 'click'}, // 2025年年运
  h5_weigh_bone: {module: 10009, 'content_id': -10021, 'event_name': 'click_chenggu_copy', type: 'click'}, // 袁天罡秤骨
  h5_bai_gua: {module: 10008, 'content_id': -10021, 'event_name': 'click_64gua_copy', type: 'click'}, // 鬼谷子
  h5_emotion2024: {module: 10006, 'content_id': -10030, 'event_name': 'click_2024lovely_copy', type: 'click'}, // 2024年爱情运势
  h5_marriage: {module: 10007, 'content_id': -10032, 'event_name': 'click_marriage_copy', type: 'click'}, //合婚
  h5_career2024: {module: 10004, 'content_id': -10021, 'event_name': 'click_2024career_copy', type: 'click'}, // 2024年事业运势 
}
const down_info = {
  h5_wealth2024: {module: 10005, 'content_id': -10022, 'event_name': 'click_2024wealty_download', type: 'click'}, // 2024年财运
  h5_annual2024: {module: 10003, 'content_id': -10022, 'event_name': 'click_2024report_download', type: 'click'}, // 2024年年运
  h5_annual2025: {module: 10015, 'content_id': -10022, 'event_name': 'click_year2025_download', type: 'click'}, // 2025年年运
  h5_weigh_bone: {module: 10009, 'content_id': -10022, 'event_name': 'click_chenggu_download', type: 'click'}, // 袁天罡秤骨
  h5_bai_gua: {module: 10008, 'content_id': -10022, 'event_name': 'click_64gua_download', type: 'click'}, // 鬼谷子
  h5_emotion2024: {module: 10006, 'content_id': -10031, 'event_name': 'click_2024lovely_download', type: 'click'}, // 2024年爱情运势
  h5_marriage: {module: 10007, 'content_id': -10033, 'event_name': 'click_marriage_download', type: 'click'}, //合婚
  h5_career2024: {module: 10004, 'content_id': -10022, 'event_name': 'click_2024career_download', type: 'click'}, // 2024年事业运势 
}

//h5_marriage

export default {
  name: 'ResultPopup',
  props: {
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    },
    visible: {
      type: Boolean,
      default: true,
    },
    transfer_code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cn_img_popovers_logo,
      tw_img_popovers_logo,
      bg_style: {
        h5_wealth2024: 'linear-gradient( 180deg, rgba(208,61,61,0) 0%, #D03D3D 32%, #D03D3D 100%)', // 2024年财运
        h5_annual2024: 'linear-gradient( 180deg, rgba(255,170,65,0) 0%, #FFAA41 32%, #FFAA41 100%)', // 2024年年运
        h5_annual2025: 'linear-gradient( 180deg, rgba(181,41,30,0) 0%, #B5291E 32%, #B5291E 100%)', // 2025年年运
        h5_weigh_bone: 'linear-gradient( 180deg, rgba(81,95,173,0) 0%, #515FAD 32%, #515FAD 100%)', // 袁天罡秤骨
        h5_bai_gua: 'linear-gradient( 180deg, rgba(164,51,30,0) 0%, #A4331E 32%, #A4331E 100%)', // 鬼谷子
        h5_emotion2024: 'linear-gradient( 180deg, rgba(236,67,107,0) 0%, #EC436B 32%, #EC436B 100%)', // 2024年爱情运势
        h5_marriage: 'linear-gradient( 180deg, rgba(127,20,22,0) 0%, #7F1416 32%, #7F1416 100%)',
        h5_career2024: 'linear-gradient( 180deg, rgba(222,36,46,0) 0%, #DE242E 32%, #DE242E 100%)', // 2024年事业运势
      },
      lang,
      tips_arr1,
      tips_arr2,
      tips_arr3,
      tips_arr4,
      tips_arr5,
      tips_arr6,
      tips_arr7,
      tips_arr8,
      tips_arr9, 

    }
  },
 
  watch: {
    
  },
  mounted() {
    if(this.show_modal) {
      this.$emit('change_pop_modal', true)
      utils.firebaseLogEvent(show_info[this.product_key]['module'], show_info[this.product_key]['content_id'], show_info[this.product_key]['event_name'], show_info[this.product_key]['type'], {
        channel: utils.getFBChannel(),
      });
    }
  },
  computed: {
    show_modal() {
      /**
       * 所有报告的渠道均展示引导app下载遮罩
       */
      return !utils.getQueryStr('hidden_modal');
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    getbgStyle() {
      return this.bg_style[this.product_key]
    },
   },
   methods: {
    async handleCopyCode(val) {
      utils.copyText('mlxz-' + this.transfer_code);
      if(val === 0) return
      Toast(tips_arr4[lang]);
      utils.firebaseLogEvent(copy_info[this.product_key]['module'], copy_info[this.product_key]['content_id'], copy_info[this.product_key]['event_name'], copy_info[this.product_key]['type'], {
        channel: utils.getFBChannel(),
      });
    },
    downClick() {
      utils.firebaseLogEvent(down_info[this.product_key]['module'], down_info[this.product_key]['content_id'], down_info[this.product_key]['event_name'], down_info[this.product_key]['type'], {
        channel: utils.getFBChannel(),
      });
      this.handleCopyCode(0);
      utils.openApp();
    }
   }
}
</script>

<style scoped lang="less">
.result-popup {
  position: fixed;
  z-index: 99999;
  bottom: 0;
  left: 0;
  width: 7.5rem;
  height: 9.43rem;
  display: flex;
  justify-content: center;
  .result-container {
    // width: 7.1rem;
    // background: linear-gradient( 180deg, #D3F2E5 0%, #FFFFFF 38%, #FFFFFF 100%);
    // border-radius: 0.4rem;
    // // margin-top: 2rem;
    // margin-bottom: 0.2rem;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // padding: 0.4rem;
    width: 7.1rem;
    background: linear-gradient(180deg, #D3F2E5 0%, #FFFFFF 38%, #FFFFFF 100%);
    border-radius: 0.4rem;
    /* margin-top: 1.8rem; */
    // margin-bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.4rem;
    padding-bottom: 0.4rem;
    position: absolute;
    left: 0.2rem;
    bottom: 0.2rem;
    .head {
      // width: 100%;
      //头部背景图宽度充满
      margin-left: 0.8rem;
      padding-right: 0.8rem;
      width: calc(100% + 0.8rem);
      // min-height: 1.88rem;
      // height: 1.88rem;
      background-image: url(../assets/img/components/result_popup/img_popovers_topbj.webp);
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: center;
      font-weight: 400;
      font-size: 0.3rem;
      color: #314A46;
      text-align: left;
      font-style: normal;
      // overflow-y: hidden;
      .title {
        font-weight: bold;
        font-size: 0.36rem;
        color: #314A46;
      }
    }

    .copy-container {
      width: 6.3rem;
      height: 0.84rem;
      min-height: 0.84rem;
      background: #EAF0EE;
      border-radius: 0.16rem;
      margin-top: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.2rem;
      padding-right: 0.2rem;

      .left {
        font-weight: 600;
        font-size: 0.28rem;
        color: #E8302E;
        text-align: left;
        font-style: normal;
      }

      .right {
        width: 0.72rem;
        height: 0.44rem;
        border-radius: 0.12rem;
        border: 0.01rem solid #314A46;
        font-weight: 600;
        font-size: 0.24rem;
        color: #314A46;
        font-style: normal;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .tip {
      width: 6.3rem;
      font-weight: 400;
      font-size: 0.26rem;
      color: #314A46;
      font-style: normal;
      margin-top: 0.3rem;
      opacity: 0.5;
    }
    .logo {
      margin-top: 0.4rem;
      width: 6.3rem;
      height: 0.94rem;
    }
    .btn {
      width: 6.3rem;
      height: 0.9rem;
      min-height: 0.9rem;
      background: linear-gradient( 180deg, #F47553 0%, #E92424 99%);
      border-radius: 0.16rem;
      border: 0.02rem solid #FFD192;
      margin-top: 0.4rem;
      font-weight: 600;
      font-size: 0.32rem;
      color: #FEF8EB;
      font-style: normal;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

}

</style>
<style lang="less">
.mint-toast.is-placemiddle {
  z-index: 100000000 !important;
}
</style>
