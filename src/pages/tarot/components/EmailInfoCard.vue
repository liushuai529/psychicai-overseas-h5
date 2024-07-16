<template>
  <div class="email-info-card">
    <div class="title">{{ is_cn ? '咨询师正在回复' : '咨詢師正在回復' }}</div>
    <div class="desc">{{ is_cn ? '真人塔罗占卜师回复后第一时间通知您' : '真人塔羅占蔔師回復後第一時間通知您' }}</div>
    <div class="info-input" style="margin-top: 0.5rem;">
      <input type="text" id="username" v-model="username" placeholder="aa" />
    </div>
    <div class="info-input" style="margin-top: 0.2rem;">
      <input type="number" id="username" v-model="pwd" placeholder="aa" maxlength="6">
      <div class="send-text" :class="{ active: code_statu }">重新发送</div>
    </div>

    <div class="btn" :class="{ active: btn_statu }">
      <span :class="{ active: btn_statu }">确认绑定</span>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils';

export default {
  components: {},
  name: 'EmailInfoCard',
  props: {

  },
  components: {
  },

  data() {
    return {
      username: '',
      pwd: '',
      btn_statu: false,
      code_statu: false,
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {},
  mounted() { },
  methods: {

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
