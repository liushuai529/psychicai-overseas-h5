<template>
  <div class="tarot-read-container">
    <!-- <FbShareNotice /> -->
    <DealCards ref="dealDards" v-if="!rise_move_end"/>
    <div class="question-container">
      <div class="input-question-container">
        <div class="title">
          <img src="../../../assets/img/tarot/taluo_img_xing.webp" />
          <div>{{ is_cn ? '你的问题' : '你的問題' }}</div>
        </div>
        <div class="input-container">
          <textarea cols="5" v-model="question" placeholder="请详细描述你现在的状态及信众的疑问，真人塔
罗占卜师实时为您解答问题。" maxlength="50"></textarea>
        </div>
      </div>
      <div class="btn-container">
        <img class="btn" :src="btn_url" @click="adviceClick"/>
      </div>
      <QuestionList style="margin-left: 0.24rem; margin-top: 0.5rem" @get_question="getQuestion" />
    </div>

  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
import FbShareNotice from '../components/FbShareNotice.vue'
import QuestionList from '../components/QuestionList.vue'
import DealCards from '../components/DealCards.vue'
import cn_taluo_btn_zixun_normal from '../../../assets/img/tarot/cn/taluo_btn_zixun_normal.webp';
import cn_taluo_btn_zixun_disable from '../../../assets/img/tarot/cn/taluo_btn_zixun_disable.webp';
import tw_taluo_btn_zixun_normal from '../../../assets/img/tarot/tw/taluo_btn_zixun_normal_fan.webp';
import tw_taluo_btn_zixun_disable from '../../../assets/img/tarot/tw/taluo_btn_zixun_disable_fan.webp';

let channel = utils.getQueryStr('channel');

export default {
  components: {
    FbShareNotice,
    QuestionList,
    DealCards,
  },
  data() {
    return {
      dealDards: null,
      btn_statu: false,
      question: '',
      rise_move_end: false,//上移动画结束
      cn_taluo_btn_zixun_normal,
      cn_taluo_btn_zixun_disable,
      tw_taluo_btn_zixun_normal,
      tw_taluo_btn_zixun_disable,
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    btn_url() {
      if (this.is_cn) {
        if (this.btn_statu) {
          return cn_taluo_btn_zixun_normal
        } else {
          return cn_taluo_btn_zixun_disable;
        }
      } else {
        if (this.btn_statu) {
          return tw_taluo_btn_zixun_normal;
        } else {
          return tw_taluo_btn_zixun_disable;
        }
      }
    }
  },
  watch: {
    question(val) {
      if (val) {
          this.btn_statu = true;
        } else {
          this.btn_statu = false;
        }
    },
    //上移动画结束
    "dealDards.rise_move_end"(val) {
      if(val) {
        this.rise_move_end = true
      }
    }

  },
  created() {

  },
  beforeDestroy() {

  },
  mounted() {
    this.dealDards = this.$refs.dealDards
    setTimeout(() => {
      console.log('dealDards', this.$refs.dealDards)
    }, 2000);
  },
  methods: {
    getQuestion(item) {
      console.log('获取问题', item)
      this.question = item;
    },
    adviceClick() {
      if(!this.btn_statu) return;
      localStorage.setItem('question', this.question)
      this.$router.push({
        path: 'detail',
      });
    }
  },
};
</script>

<style scoped lang="less">
.tarot-read-container {
  width: 7.5rem;
  height: 100%;
  background: #0F031A;

  .question-container {
    margin-top: 3.87rem;

    .input-question-container {
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 0.36rem;
        color: #FFFFFF;
        line-height: 0.54rem;

        img {
          width: 0.48rem;
          height: 0.5rem;
        }
      }

      .input-container {
        width: 7.02rem;
        height: 2.26rem;
        margin-left: 0.24rem;
        border-radius: 0.16rem;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        background: rgba(255, 255, 255, 0.1);


        textarea {
          width: 100%;
          height: 2.26rem;
          font-size: 0.3rem;
          line-height: 0.42rem;
          outline: none;
          border: none;
          background-color: transparent;
          padding: 0;
          // margin: 0 0.3rem;
          color: #FFFFFF;
          white-space: pre-wrap;
          padding: 0.3rem 0.3rem;
          border-radius: 0.16rem;

          &::input-placeholder {
            color: #FFFFFF;
            opacity: 0.3;
          }

          &::-webkit-input-placeholder {
            color: #FFFFFF;
            opacity: 0.3;
          }

          &::-moz-placeholder {
            color: #FFFFFF;
            opacity: 0.3;
          }

          &::-moz-placeholder {
            color: #FFFFFF;
            opacity: 0.3;
          }

          &::-ms-input-placeholder {
            color: #FFFFFF;
            opacity: 0.3;
          }
        }

        textarea:focus {
          border: 0.01rem solid #A464FF;
          outline: none;
          /* 移除默认的蓝色轮廓线 */
        }
      }
    }

    .btn-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 7.5rem;
      margin-top: 0.3rem;

      .btn {
        width: 5.72rem;
        height: 0.94rem;
        display: flex;

      }
    }
  }
}
</style>
