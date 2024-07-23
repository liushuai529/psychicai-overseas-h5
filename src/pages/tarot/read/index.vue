<template>
  <div class="tarot-read-container">

    <FbShareNotice v-if="!rise_move_end" style="position: absolute; top: 0; left:0; z-index: 5;" />
    <FbShareNotice v-else />


    <DealCards ref="dealDards" v-if="!rise_move_end" />
    <CardList style="margin-left: 0.24rem;" v-show="rise_move_end"/>
    <!-- <div class="question-container" v-if="rise_move_end"> -->
    <div class="question-container" v-if="rise_move_end">
      <div class="input-question-container">
        <div class="title">
          <img src="../../../assets/img/tarot/taluo_img_xing.webp" />
          <div>{{ is_cn ? '你的问题' : '你的問題' }}</div>
        </div>
        <div class="input-container">
          <textarea cols="5" v-model="question" placeholder="请详细描述你现在的状态及信众的疑问，真人塔
罗占卜师实时为您解答问题。" maxlength="50"></textarea>
          <div class="num-container">{{ `${question.length}/50` }}</div>
        </div>
      </div>
      <div class="btn-container">
        <img class="btn" :src="btn_url" @click="adviceClick" />
      </div>
      <QuestionList style="margin-left: 0.24rem; margin-top: 0.5rem;" @get_question="getQuestion" />
      <div style="height: 1.2rem; width: 100%; background: #0F031A;"></div>
      <!-- <FixDowonLoad /> -->
    </div>
    <FixDowonLoad />
  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
import FbShareNotice from '../components/FbShareNotice.vue'
import TarotNotice from '../../../components/TarotNotice.vue'
import CardList from '../components/CardList.vue'
import QuestionList from '../components/QuestionList.vue'
import FixDowonLoad from '../components/FixDowonLoad.vue'

import DealCards from '../components/DealCards.vue'
import cn_taluo_btn_zixun_normal from '../../../assets/img/tarot/cn/taluo_btn_zixun_normal.webp';
import cn_taluo_btn_zixun_disable from '../../../assets/img/tarot/cn/taluo_btn_zixun_disable.webp';
import tw_taluo_btn_zixun_normal from '../../../assets/img/tarot/tw/taluo_btn_zixun_normal_fan.webp';
import tw_taluo_btn_zixun_disable from '../../../assets/img/tarot/tw/taluo_btn_zixun_disable_fan.webp';

let channel = utils.getQueryStr('channel');

export default {
  components: {
    FbShareNotice,
    TarotNotice,
    QuestionList,
    DealCards,
    CardList,
    FixDowonLoad,
  },
  data() {
    return {
      dealDards: null,
      btn_statu: false,
      question: '',
      rise_move_end: false,//上移动画结束
      product_key: 'master_tarot',
      select_card_list: [],
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
        if(val.length>4) {
          this.btn_statu = true;
        } else {
          this.btn_statu = false; 
        }
      } else {
        this.btn_statu = false;
      }
    },
    //上移动画结束
    "dealDards.rise_move_end"(val) {
      if (val) {
        this.rise_move_end = true
        //问题输入页面出现埋点
        utils.firebaseLogEvent(
          '10010',
          '-10007',
          'page_view_question',
          'page_view',
          {
            args_name: 'page_view_question',
            channel: utils.getFBChannel(),
          }
        );
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
    utils.firebaseLogEvent(
      '10010',
      '-10003',
      'page_view_pullcards',
      'page_view',
      {
        args_name: 'page_view_pullcards',
        channel: utils.getFBChannel(),
      }
    );
  },
  methods: {
    getQuestion(item) {
      this.question = item.content;
      setTimeout(() => {
        this.adviceClick();
      }, 0);
    },
    adviceClick() {
      if (!this.btn_statu) {
        utils.firebaseLogEvent(
          '10010',
          '-10008',
          'click_question_check',
          'click',
          {
            args_name: 'click_question_check',
            channel: utils.getFBChannel(),
            click_type: 'error'
          }
        );
        return
      };
      localStorage.setItem('question', this.question)
      utils.firebaseLogEvent(
        '10010',
        '-10008',
        'click_question_check',
        'click',
        {
          args_name: 'click_question_check',
          channel: utils.getFBChannel(),
          click_type: 'screen_tracking'
        }
      );
      this.$router.push({
        path: 'detail',
        query: { product_key: this.product_key },
      });
    }
  },
};
</script>

<style scoped lang="less">
.tarot-read-container {
  width: 7.5rem;
  overflow-x: hidden;
  min-height: 100%;
  // background: #0F031A;
  background-image: url('../../../assets/img/tarot/taluo_img_bj.webp');
  // background-size: 7.5rem 15.36rem;
  background-repeat: no-repeat;

  .question-container {
    margin-top: 0.6rem;

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
        margin-bottom: 0.15rem;
        margin-left: 0.18rem;
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
        position: relative;

        .num-container {
          position: absolute;
          right: 0.24rem;
          bottom: 0.24rem;
          opacity: 0.3;
          font-weight: 400;
          font-size: 0.24rem;
          color: #FFFFFF;
          line-height: 0.24rem;
        }


        textarea {
          width: 100%;
          height: 2.26rem;
          font-size: 0.3rem;
          line-height: 0.42rem;
          outline: none;
          // border: none;
          background-color: transparent;
          padding: 0;
          // margin: 0 0.3rem;
          color: #FFFFFF;
          white-space: pre-wrap;
          padding: 0.3rem 0.3rem;
          border-radius: 0.16rem;
          border: 0.01rem solid rgba(76, 47, 116, 1);
          outline: none;

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
