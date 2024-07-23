<template>
  <div class="email-info-card">
    <div class="title">{{ is_cn ? '咨询师正在回复' : '咨詢師正在回復' }}</div>
    <div class="desc">{{ is_cn ? '真人塔罗占卜师回复后第一时间通知您' : '真人塔羅占蔔師回復後第一時間通知您' }}</div>
    <div class="info-input" style="margin-top: 0.5rem;">
      <input type="text" id="email" v-model="email" placeholder="aa" />
    </div>
    <div class="info-input" style="margin-top: 0.2rem;">
      <input id="email" v-model="email_code" placeholder="aa" maxlength="6">
      <div class="send-text" :class="{ active: code_statu && !code_loading }" @click="getCodeClick">{{ code_btn_text }}
      </div>
    </div>

    <div class="btn" :class="{ active: btn_statu }" @click="bindHandle">
      <span :class="{ active: btn_statu }">{{ is_cn ? '确认绑定' : '確認綁定' }}</span>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils';
import { Indicator, Toast } from 'mint-ui';
import { bindTarotEmailAPI, getTarotEmailCodeAPI } from '../../../api/api';

export default {
  components: {},
  name: 'EmailInfoCard',
  props: {

  },
  components: {
  },

  data() {
    return {
      email: '',
      email_code: '',
      is_send_code: false,//是否发送过验证码
      number: 0,
      timer: null,
      code_loading: false,
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    btn_statu() {
      return this.email.trim().length && this.email_code.length === 6;
    },
    code_statu() {
      return this.email.trim().length > 6 && this.number === 0;
    },
    code_btn_text() {
      if (this.number) {
        return this.number + 's';
      } else {
        if (!this.is_send_code) {
          return this.is_cn ? '获取验证码' : '獲取驗證碼';
        } else {
          return this.is_cn ? '重新发送' : '重新發送';
        }
      }
    }
  },
  watch: {},
  mounted() {
    utils.firebaseLogEvent(
      '10010',
      '-10016',
      'view_tarot_result_email',
      'page_view',
      {
        args_name: 'view_tarot_result_email',
        channel: utils.getFBChannel(),
      }
    );
  },
  methods: {
    async bindHandle() {
      let res = await bindTarotEmailAPI({
        email: this.email,
        email_code: this.email_code
      });
      if (res && res.status === 1000) {
        Toast(this.is_cn ? '绑定成功' : '綁定成功');
        this.$emit('hidden_modal')
        utils.firebaseLogEvent(
          '10010',
          '-10017',
          'click_tarotresult_mail_check',
          'page_view',
          {
            args_name: 'click_tarotresult_mail_check',
            channel: utils.getFBChannel(),
            click_type: 'confirm',
          }
        );
      } else {
        utils.firebaseLogEvent(
          '10010',
          '-10017',
          'click_tarotresult_mail_check',
          'page_view',
          {
            args_name: 'click_tarotresult_mail_check',
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
      }
    },
    async getCodeClick() {
      if (!this.code_statu) return;
      this.code_loading = true;
      getTarotEmailCodeAPI({ email: this.email }).then((res) => {
        this.code_loading = false;
        if (res.status === 1000) {
          Toast(this.is_cn ? '验证码已发送至您的邮箱' : '驗證碼已發送至您的郵箱');
          this.number = 59;
          this.timer = setInterval(() => {
            if (this.number >= 1) {
              this.number -= 1;
            }
            if (this.number === 0) {
              clearInterval(this.timer)
            }
          }, 1000);
          this.is_send_code = true;
        }
      }).catch(err => {
        this.code_loading = false;
      })
    }
  },
};
</script>

<style scoped lang="less">
.email-info-card {
  position: absolute;
  /* 设置为绝对定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* 使用margin自动居中 */
  height: 5.54rem;
  /* 内容的高度 */
  width: 6.3rem;
  /* 内容的宽度 */
  background: linear-gradient(180deg, #421A88 0%, #2D135A 40%, #2D135A 100%);
  border-radius: 0.4rem;
  z-index: 3;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0.3rem;
  padding-bottom: 0.4rem;
  align-items: center;

  .title {
    font-weight: 600;
    font-size: 0.36rem;
    color: #FFFFFF;
    line-height: 0.54rem;
  }

  .desc {
    font-weight: 400;
    font-size: 0.28rem;
    color: #FFFFFF;
    line-height: 0.42rem;
  }

  .info-input {

    width: 5.1rem;
    height: 0.9rem;
    border-radius: 0.16rem;
    display: flex;
    box-sizing: border-box;
    padding: 0.06rem;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);

    .send-text {
      font-weight: 400;
      font-size: 0.28rem;
      color: #FFFFFF;
      line-height: 0.28rem;
      width: 100%;
      text-align: right;
      margin-right: 0.2rem;
      opacity: 0.3;

      &.active {
        color: #FFD136;
        opacity: 1;
      }
    }

    input {
      width: 100%;
      font-size: 0.3rem;
      line-height: 0.42rem;
      outline: none;
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 0 0.3rem;

      &::input-placeholder {
        color: rgba(51, 51, 51, 0.5);
      }

      &::-webkit-input-placeholder {
        color: rgba(51, 51, 51, 0.5);
      }

      &::-moz-placeholder {
        color: rgba(51, 51, 51, 0.5);
      }

      &::-moz-placeholder {
        color: rgba(51, 51, 51, 0.5);
      }

      &::-ms-input-placeholder {
        color: rgba(51, 51, 51, 0.5);
      }
    }


  }

  .btn {
    width: 5.5rem;
    height: 0.9rem;
    background: linear-gradient(180deg, #66249B 0%, #451484 100%);
    border-radius: 0.16rem;
    border: 0.02rem solid #894CAD;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.4rem;

    span {
      font-weight: 600;
      font-size: 0.32rem;
      color: #FFFFFF;
      line-height: 0.32rem;
      opacity: 0.5;

      &.active {
        opacity: 1;
      }
    }

    &.active {
      background: linear-gradient(180deg, #A136DE 0%, #5C15AC 100%);
    }
  }
}
</style>
