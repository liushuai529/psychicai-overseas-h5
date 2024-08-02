<template>
  <div class="result-popup"  v-show="show_modal">
    <div class="result-container">
      <div class="head">
        <div class="title">{{ tips_arr1[lang] }}</div>
        <div style="margin-top: 0.2rem;">{{ `${tips_arr2[lang]}` }}</div>
      </div>
      <div class="copy-container">
        <div class="left">{{tips_arr6[lang]}}：{{ transfer_code }}</div>
        <div class="right" @click="handleCopyCode" >{{ tips_arr3[lang] }}</div>
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
import utils from '../../../libs/utils';

import cn_img_popovers_logo from '../../../assets/img/components/result_popup/cn/img_popovers_logo.webp';
import tw_img_popovers_logo from '../../../assets/img/components/result_popup/tw/img_popovers_logo_tw.webp';
import { Toast } from 'mint-ui';
const lang = utils.getLanguage();
const tips_arr1 = {
  'zh-CN': '尊敬的用户您好：',
  'zh-TW': '尊敬的用戶您好：',
};
const tips_arr2 = {
  'zh-CN': '咨询师正在回复您的问题，为了保障您的隐私，真人塔罗占卜师的回复请在【命理寻真】app中查看。',
  'zh-TW': '咨询师正在回复您的问题，为了保障您的隐私，真人塔罗占卜师的回复请在【命理寻真】app中查看。',
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
  'zh-CN': '复制识别码，打开命理寻真App即可查看；',
  'zh-TW': '復製識別碼，打開命理尋真App即可查看；',
};
const tips_arr6 = {
  'zh-CN': '识别码',
  'zh-TW': '識別碼',
};
const tips_arr7 = {
  'zh-CN': '识别码可在我的——我的报告中查看。',
  'zh-TW': '識別碼可在我的——我的報告中查看。',
};
const tips_arr8 = {
  'zh-CN': '复制识别码并立即下载查看',
  'zh-TW': '復製識別碼並立即下載查看',
};


const show_info = {
  h5_wealth2024: {module: 10005, 'content_id': -10020, 'event_name': 'view_2024wealty_download', type: 'view'}, // 2024年财运
  h5_annual2024: {module: 10003, 'content_id': -10020, 'event_name': 'view_2024report_download', type: 'view'}, // 2024年年运
  h5_weigh_bone: {module: 10009, 'content_id': -10020, 'event_name': 'view_chenggu_download', type: 'view'}, // 袁天罡秤骨
  h5_bai_gua: {module: 10008, 'content_id': -10020, 'event_name': 'view_64gua_download', type: 'view'}, // 鬼谷子
  h5_emotion2024: {module: 10006, 'content_id': -10029, 'event_name': 'view_2024lovely_download', type: 'view'}, // 2024年爱情运势
  h5_marriage: {module: 10007, 'content_id': -10031, 'event_name': 'view_marriage_download', type: 'view'}, //合婚
  h5_career2024: {module: 10004, 'content_id': -10020, 'event_name': 'view_2024career_download', type: 'view'}, // 2024年事业运势 
}
const copy_info = {
  h5_wealth2024: {module: 10005, 'content_id': -10021, 'event_name': 'click_2024wealty_copy', type: 'click'}, // 2024年财运
  h5_annual2024: {module: 10003, 'content_id': -10021, 'event_name': 'click_2024report_copy', type: 'click'}, // 2024年年运
  h5_weigh_bone: {module: 10009, 'content_id': -10021, 'event_name': 'click_chenggu_copy', type: 'click'}, // 袁天罡秤骨
  h5_bai_gua: {module: 10008, 'content_id': -10021, 'event_name': 'click_64gua_copy', type: 'click'}, // 鬼谷子
  h5_emotion2024: {module: 10006, 'content_id': -10030, 'event_name': 'click_2024lovely_copy', type: 'click'}, // 2024年爱情运势
  h5_marriage: {module: 10007, 'content_id': -10032, 'event_name': 'click_marriage_copy', type: 'click'}, //合婚
  h5_career2024: {module: 10004, 'content_id': -10021, 'event_name': 'click_2024career_copy', type: 'click'}, // 2024年事业运势 
}
const down_info = {
  h5_wealth2024: {module: 10005, 'content_id': -10022, 'event_name': 'click_2024wealty_download', type: 'click'}, // 2024年财运
  h5_annual2024: {module: 10003, 'content_id': -10022, 'event_name': 'click_2024report_download', type: 'click'}, // 2024年年运
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

    }
  },
 
  watch: {
    
  },
  mounted() {
    if(this.show_modal) {
      this.$emit('change_pop_modal', true)
      utils.firebaseLogEvent(show_info[this.product_key]['module'], show_info[this.product_key]['content_id'], show_info[this.product_key]['event_name'], show_info[this.product_key]['type'], {
        args_name: show_info[this.product_key]['event_name'],
        channel: utils.getFBChannel(),
      });
    }
  },
  computed: {
    show_modal() {
      return !["enjoy01", "panda01"].includes(utils.getFBChannel()) && utils.isAndroid() && !utils.getQueryStr('hidden_modal');
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
   
   },
   methods: {
    async handleCopyCode(val) {
      utils.copyText('mlxz-' + this.transfer_code);
      if(val === 0) return
      Toast(tips_arr4[lang]);
      utils.firebaseLogEvent(copy_info[this.product_key]['module'], copy_info[this.product_key]['content_id'], copy_info[this.product_key]['event_name'], copy_info[this.product_key]['type'], {
        args_name: copy_info[this.product_key]['event_name'],
        channel: utils.getFBChannel(),
      });
    },
    downClick() {
      utils.firebaseLogEvent(down_info[this.product_key]['module'], down_info[this.product_key]['content_id'], down_info[this.product_key]['event_name'], down_info[this.product_key]['type'], {
        args_name: down_info[this.product_key]['event_name'],
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
  height: 11rem;
  display: flex;
  justify-content: center;
  background: linear-gradient( 180deg, rgba(15,3,26,0) 0%, #0F031A 30%, #0F031A 100%);
  .result-container {
    width: 7.1rem;
    // background: linear-gradient( 180deg, rgba(15,3,26,0) 0%, #0F031A 30%, #0F031A 100%);
    background: linear-gradient( 180deg, #421A88 0%, #2D135A 38%, #2D135A 100%);
    border-radius: 0.4rem;
    margin-bottom: 0.2rem;
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
      background-image: url(../../../assets/img/components/result_popup/img_popovers_topbj.webp);
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: center;
      font-weight: 400;
      font-size: 0.3rem;
      color: #FFFFFF;
      text-align: left;
      font-style: normal;
      // overflow-y: hidden;
      .title {
        font-weight: bold;
        font-size: 0.36rem;
        color: #FFFFFF;
      }
    }

    .copy-container {
      width: 6.3rem;
      height: 0.84rem;
      min-height: 0.84rem;
      background: rgba(255,255,255,0.1);
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
        color: #FFD136;
        line-height: 0.42rem;
        text-align: left;
        font-style: normal;
      }

      .right {
        width: 0.72rem;
        height: 0.44rem;
        border-radius: 0.12rem;
        border: 0.01rem solid #FFFFFF;
        font-weight: 600;
        font-size: 0.24rem;
        color: #FFFFFF;
        line-height: 0.36rem;
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
      line-height: 0.39rem;
      color: rgba(255,255,255,0.5);
      font-style: normal;
      margin-top: 0.3rem;
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
      background: linear-gradient( 180deg, #A136DE 0%, #5C15AC 100%);
      border-radius: 0.16rem;
      border: 0.02rem solid #E585FF;
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
