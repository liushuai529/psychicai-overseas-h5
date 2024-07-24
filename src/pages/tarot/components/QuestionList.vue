<template>
  <div class="question-list">
    <div class="title-container">
      <div class="left">
        <img src="../../../assets/img/tarot/taluo_img_xing.webp" />
        <span> {{ is_cn? '猜你想问': '猜你想問' }}</span>
      </div>
      <div class="right" @click="changeQuestion">
        <img src="../../../assets/img/tarot/taluo_img_huan.webp" />
        <span>{{ is_cn? '换一换': '換一換' }}</span>
      </div>
    </div>
    <div class="question-container">
      <div class="item">
        <div style="margin-top: 0.2rem;" v-for="item in list">
          <div class="content-container" @click="questionClick(item)">
            <div class="text">{{ item.content }}</div>
            <img src="../../../assets/img/tarot/dingdan_icon_back.webp" />
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils';
import {
  getQuestionAPI
} from '../../../api/api';


export default {
  components: {},
  name: 'QuestionList',
  props: {

  },
  components: {
  },

  data() {
    return {
      list: [],
      all_list: [],
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    }
  },
  watch: {},
  mounted() {
    this.getQuestionData()
   },
  methods: {
    questionClick(item) {
      utils.firebaseLogEvent(
        '10010',
        '-10009',
        'click_question_choise',
        'click',
        {
          args_name: 'click_question_choise',
          channel: utils.getFBChannel(),
          question_id: item.id
        }
      );
      this.$emit('get_question', item)
    },
    changeQuestion() {
      // console.log(111)
      // if(this.all_list.length>=4) {
      //   // this.all_list.splice(4)
      //   this.list = this.all_list.slice(0, 4);
        
      // } else {
      //   this.getQuestionData()
      // }
      this.getQuestionData()
      utils.firebaseLogEvent(
        '10010',
        '-10010',
        'click_question_change',
        'click',
        {
          args_name: 'click_question_change',
          channel: utils.getFBChannel(),
        }
      );
    },
    async getQuestionData() {
      const res = await getQuestionAPI();
      if(res.status === 1000) {
        this.all_list = this.shuffleArray(res.data)
        this.list = this.all_list.slice(0, 4);
        // this.all_list.splice(4)
      }
      
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  },
};
</script>

<style scoped lang="less">
.question-list {
  width: 7.02rem;
  display: flex;
  flex-direction: column;

  .title-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;

      img {
        width: 0.48rem;
        height: 0.5rem;
      }

      span {
        font-weight: 600;
        font-size: 0.36rem;
        color: #FFFFFF;
        line-height: 0.54rem;
      }
    }

    .right {
      display: flex;
      align-items: center;
      opacity: 0.8;
      img {
        width: 0.36rem;
        height: 0.36rem;
      }

      span {
        font-weight: 400;
        font-size: 0.26rem;
        color: #FFFFFF;
        line-height: 0.54rem;
      }

    }
  }

  .question-container {
    width: 7.02rem;
    // height: 343px;
    background: #201A2F;
    border-radius: 0.16rem;
    display: flex;
    flex-direction: column;
    padding: 0 0.24rem;
    margin-top: 0.15rem;

    .item {
      display: flex;
      flex-direction: column;

      .content-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
          width: 6.1rem;
          font-weight: 400;
          font-size: 0.28rem;
          color: #FFFFFF;
          line-height: 0.42rem;
          opacity: 0.8;
        }

        img {
          width: 0.28rem;
          height: 0.28rem;
        }


      }

      .line {
        width: 6.54rem;
        height: 0.01rem;
        background: #FFFFFF;
        opacity: 0.1;
        margin-top: 0.22rem;
      }
    }
  }
}
</style>
