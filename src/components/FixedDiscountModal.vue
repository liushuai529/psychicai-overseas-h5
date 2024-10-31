<template>
  <div class="fixed-discount-modal" v-show="show">
    <div :class="['modal', is_cn ? 'cn_bg' : 'tw_bg']">
      <div class="code-container">
        <div class="left">{{ `${is_cn ? '邀请码' : '邀請碼'}：${transfer_code}` }}</div>
        <div class="right" @click="copy">{{ is_cn ? '复制' : '復製' }}</div>
      </div>
      <div class="tip-container">{{ is_cn ? '复制邀请码，打开命理寻真App即可享受更多折扣' : '復製邀請碼，打開命理尋真App即可享受更多折扣' }}</div>
      <img class="btn-logo" @click="down" :src="is_cn ? cn_btn_zhekou_xaizai : tw_btn_zhekou_xaizai" />
    </div>
    <div class="close" @click="close">
      <img src="../assets/img/components/fixed_discount_modal/icon_close.webp" />
    </div>

  </div>
</template>
<script>
import utils from '../libs/utils';

import cn_img_zhekou_bj from '../assets/img/components/fixed_discount_modal/cn/img_zhekou_bj.webp';
import tw_img_zhekou_bj from '../assets/img/components/fixed_discount_modal/tw/img_zhekou_bj.webp';
import cn_btn_zhekou_xaizai from '../assets/img/components/fixed_discount_modal/cn/btn_zhekou_xaizai_cn.webp';
import tw_btn_zhekou_xaizai from '../assets/img/components/fixed_discount_modal/tw/btn_zhekou_xaizai_tw.webp';
import { Toast } from 'mint-ui';
import { getDiscountGetAPI, getTarotDiscountGetAPI } from '../api/api';

const lang = utils.getLanguage();
const show_info = {
  master_tarot: { module: 10010, 'content_id': -10027, 'event_name': 'view_tarotfail_download', type: 'view' },
  h5_wealth2024: { module: 10005, 'content_id': -10025, 'event_name': 'view_2024wealtyfail_download', type: 'view' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10025, 'event_name': 'view_2024reportfail_download', type: 'view' }, // 2024年年运
  h5_annual2025: { module: 10003, 'content_id': -10025, 'event_name': 'view_2024reportfail_download', type: 'view' }, // 2025年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10025, 'event_name': 'view_chenggufail_download', type: 'view' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10025, 'event_name': 'view_64guafail_download', type: 'view' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10035, 'event_name': 'view_2024lovelyfail_download', type: 'view' }, // 2024年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10037, 'event_name': 'view_marriagefail_download', type: 'view' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10025, 'event_name': 'view_2024careerfail_download', type: 'view' }, // 2024年事业运势 
}

const copy_info = {
  master_tarot: { module: 10010, 'content_id': -10028, 'event_name': 'click_tarotfail_copy', type: 'click' },
  h5_wealth2024: { module: 10005, 'content_id': -10026, 'event_name': 'click_2024wealtyfail_copy', type: 'click' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10026, 'event_name': 'click_2024reportfail_copy', type: 'click' }, // 2024年年运
  h5_annual2025: { module: 10003, 'content_id': -10026, 'event_name': 'click_2024reportfail_copy', type: 'click' }, // 2025年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10026, 'event_name': 'click_chenggufail_copy', type: 'click' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10026, 'event_name': 'click_64guafail_copy', type: 'click' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10036, 'event_name': 'click_2024lovelyfail_copy', type: 'click' }, // 2024年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10038, 'event_name': 'click_marriagefail_copy', type: 'click' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10026, 'event_name': 'click_2024careerfail_copy', type: 'click' }, // 2024年事业运势 
}

const down_info = {
  master_tarot: { module: 10010, 'content_id': -10029, 'event_name': 'click_tarotfail_download', type: 'click' },
  h5_wealth2024: { module: 10005, 'content_id': -10027, 'event_name': 'click_2024wealtyfail_download', type: 'click' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10027, 'event_name': 'click_2024reportfail_download', type: 'click' }, // 2024年年运
  h5_annual2025: { module: 10003, 'content_id': -10027, 'event_name': 'click_2024reportfail_download', type: 'click' }, // 2025年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10027, 'event_name': 'click_chenggufail_download', type: 'click' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10027, 'event_name': 'click_64guafail_download', type: 'click' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10037, 'event_name': 'click_2024lovelyfail_download', type: 'click' }, // 2024年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10039, 'event_name': 'click_marriagefail_download', type: 'click' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10027, 'event_name': 'click_2024careerfail_download', type: 'click' }, // 2024年事业运势 
}

const tips_arr4 = {
  'zh-CN': '复制成功',
  'zh-TW': '複製成功',
};

export default {
  name: 'FixedDiscountModal',
  data() {
    return {
      cn_img_zhekou_bj,
      tw_img_zhekou_bj,
      cn_btn_zhekou_xaizai,
      tw_btn_zhekou_xaizai,
      tips_arr4,
      show: false,
      transfer_code: ''
    }
  },
  props: {
    product_key: {
      default: '',
      type: String,
    },
  },
  methods: {
    close() {
      this.$emit('change_discount_modal', false)
      this.show = false
    },
    copy(val) {
      utils.copyText('mlxz-' + this.transfer_code);
      if (val === 0) return
      Toast(tips_arr4[lang]);
      utils.firebaseLogEvent(copy_info[this.product_key]['module'], copy_info[this.product_key]['content_id'], copy_info[this.product_key]['event_name'], copy_info[this.product_key]['type'], {
        args_name: copy_info[this.product_key]['event_name'],
        channel: utils.getFBChannel(),
      });
    },
    down() {
      utils.firebaseLogEvent(down_info[this.product_key]['module'], down_info[this.product_key]['content_id'], down_info[this.product_key]['event_name'], down_info[this.product_key]['type'], {
        args_name: down_info[this.product_key]['event_name'],
        channel: utils.getFBChannel(),
      });
      this.copy(0);
      utils.openApp();
    },
    async getData() {
      //塔罗测算报告逻辑判断删除。time:2024-10-22
      let res = await getDiscountGetAPI(this.product_key);
      if (res && res.status === 1000) {
        if (res.data.discount) {
          this.transfer_code = res.data.transfer_code;
          this.$emit('change_discount_modal', true)
          this.show = true;
          utils.firebaseLogEvent(show_info[this.product_key]['module'], show_info[this.product_key]['content_id'], show_info[this.product_key]['event_name'], show_info[this.product_key]['type'], {
            args_name: show_info[this.product_key]['event_name'],
            channel: utils.getFBChannel(),
          });
        }
      }
    }
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  mounted() {
    this.getData();
  }
}
</script>

<style scoped lang="less">
.fixed-discount-modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .modal {
    width: 6.3rem;
    height: 5.7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: contain;

    .code-container {
      width: 5.22rem;
      height: 0.84rem;
      background: #FFF6E3;
      border-radius: 0.16rem;
      border: 0.01rem solid #9E5613;
      margin-top: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.2rem;

      .left {
        font-weight: 600;
        font-size: 0.28rem;
        color: #E8302E;
        line-height: 0.42rem;
        text-align: left;
        font-style: normal;
        display: flex;
        align-items: center;
      }

      .right {
        width: 0.72rem;
        height: 0.44rem;
        border-radius: 0.12rem;
        border: 1px solid #9E5613;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 0.24rem;
        color: #9E5613;
        line-height: 0.36rem;
        text-align: left;
        font-style: normal;
      }
    }

    .tip-container {
      width: 3.88rem;
      height: 0.84rem;
      font-weight: 400;
      font-size: 0.28rem;
      color: #9E5613;
      line-height: 0.42rem;
      text-align: center;
      font-style: normal;
      margin-top: 0.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn-logo {
      width: 4.8rem;
      height: 0.94rem;
      margin-top: 1.03rem;
    }

  }

  .cn_bg {
    background-image: url(../assets/img/components/fixed_discount_modal/cn/img_zhekou_bj.webp);
  }

  .tw_bg {
    background-image: url(../assets/img/components/fixed_discount_modal/tw/img_zhekou_bj.webp);
  }

  .close {
    width: 0.8rem;
    height: 0.8rem;

    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>
