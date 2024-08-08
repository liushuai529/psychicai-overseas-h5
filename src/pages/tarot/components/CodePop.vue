<template>
  <div class="pop-box">
    <div class="pop-modal">
      <div class="pop-content">
        <div class="title">{{ tips1 }}</div>
        <div class="tip">
          <img
            src="../../../assets/img/tarot/shibiema_img_1.webp"
            alt=""
          />
          <span>{{ tips2 }}</span>
        </div>
       
        <div class="tip">
          <img
          src="../../../assets/img/tarot/shibiema_img_3.webp"
            alt=""
          />
          <span>{{ tips4 }}</span>
        </div>
        <div @click="downloadApp" class="btn">
          <span>{{ tips5 }}</span>
          <span class="right">{{ tips6 }}</span>
        </div>
        <img
          @click="closeModal"
          class="close"
          src="../../../assets/img/mlxz/index/modal_close.webp"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils';

const tipsArr1 = {
  'zh-CN': '邀请码已复制',
  'zh-TW': '邀請碼已復製',
};
const tipsArr2 = {
  'zh-CN': '1.打开命理寻真App',
  'zh-TW': '1.打開命理尋真App',
};

const tipsArr4 = {
  'zh-CN': '2.在“我的提问”中可重复查看',
  'zh-TW': '2.在“我的提問“中可重復查看',
};
const tipsArr5 = {
  'zh-CN': '下载',
  'zh-TW': '下載',
};
const tipsArr6 = {
  'zh-CN': '命理寻真',
  'zh-TW': '命理尋真',
};
const language = utils.getLanguage();
export default {
  name: 'CodePop',
  components: {},
  props: {
    close: {
      type: Function,
      default: () => {},
    },
    m_id: {
      type: String,
      default: '20003',
    },
    is_report: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Your data properties here
      show: true,
      tips1: tipsArr1[language],
      tips2: tipsArr2[language],
      tips4: tipsArr4[language],
      tips5: tipsArr5[language],
      tips6: tipsArr6[language],
    };
  },
  computed: {},
  created() {},
  mounted() {
    var windowHeight = window.innerHeight;
    let dom = document.querySelector('.pop-modal');
    dom.style.height = windowHeight + 'px';
    dom.style.overflow = 'hidden';
  },
  methods: {
    /**
     * @description: 关闭弹窗
     * @return {*}
     */
    closeModal() {
      this.$emit('close');
    },
    /**
     * @description: 下载app
     * @return {*}
     */
    async downloadApp() {
      utils.firebaseLogEvent(
        '10010',
        '-10024',
        'click_tarothistory_download',
        'click',
        {
          args_name: 'click_tarothistory_download',
          channel: utils.getFBChannel(),
        }
      ); 
      await utils.asleep(200);
      utils.openApp();
    },
  },
};
</script>

<style scoped lang="less">
/* Your component styles here */
.pop-box {
  width: 7.5rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(0 0 0 / 60%);
  z-index: 999;
  .pop-modal {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .pop-content {
    width: 6.3rem;
    height: 4.44rem;
    background: linear-gradient( 180deg, #421A88 0%, #2D135A 40%, #2D135A 100%);
    border-radius: 0.4rem;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .title {
      height: 0.36rem;
      font-weight: 500;
      font-size: 0.36rem;
      line-height: 0.36rem;
      margin: 0.4rem auto 0.2rem;
    }
    .tip {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 0.1rem 0;
      img {
        width: 0.7rem;
        height: 0.7rem;
        margin-right: 0.2rem;
        margin-left: 0.8rem;
      }
      span {
        font-weight: 400;
        font-size: 0.3rem;
        line-height: 0.3rem;
      }
    }
    .btn {
      width: 5.5rem;
      height: 0.9rem;
      background: linear-gradient( 180deg, #A136DE 0%, #5C15AC 100%);
      border-radius: 0.16rem;
      border: 0.02rem solid #E585FF;
      position: absolute;
      bottom: 0.4rem;
      font-weight: 600;
      font-size: 0.32rem;
      color: #fef8eb;
      display: flex;
      align-items: center;
      justify-content: center;
      .right {
        margin-left: 0.1rem;
      }
    }
  }
}
.close {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  bottom: -1.2rem;
}
</style>
