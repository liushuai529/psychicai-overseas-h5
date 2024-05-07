<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-04-08 10:26:58
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-08 11:29:09
 * @Description: 
-->
<template>
  <div class="analyze">
    <div :style="`height:${height}rem;`" class="title">
      <img :style="`width:${width}rem;`" :src="title" alt="" />
    </div>
    <div class="content">
      专业兴趣上，我比较喜欢贸易类的，尽管自我主修的是数学，但我就是对这个专业知识充满兴趣，我认为此专业能够让我接触到更多的人与事情。在《职业生涯规划》的课程中，我做过一次人格分析和职业分析，鉴于测评结果，我的优势职业类型为企业型，创业型。我认为这很贴合我的专业需要。
      <div class="boli-box">
        <img
          class="lock"
          src="https://psychicai-static.psychicai.pro/imgs/240478e834eef7774dbb9b8c7be56e7c7ef9.png"
          alt=""
        />
        <div v-for="(item, key) in topic" :key="key" class="topic">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Analyze',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    topic: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // Your data properties go here
    };
  },
  created() {
    // Code to run when the component is created
  },
  mounted() {
    // Code to run when the component is mounted
  },
  methods: {
    // Your methods go here
  },
};
</script>

<style scoped lang="less">
/* Your component styles go here */
.analyze {
  width: 7.1rem;
  min-height: 4.64rem;
  background: url('../../../assets/img/mlxz/year_of_lucky_2024/result_img_bg.png')
    no-repeat;
  background-size: 100% 100%;
  margin: 0 0.2rem 0.2rem;
  font-family: PingFangSC;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.3rem auto;
    img {
      height: 100%;
    }
  }
  .content {
    width: 6.1rem;
    height: 2.88rem;
    font-weight: 400;
    font-size: 0.28rem;
    color: #222;
    line-height: 0.48rem;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    .boli-box {
      width: 6.1rem;
      height: 2.88rem;
      position: absolute;
      top: 0;
      left: 0;
      backdrop-filter: blur(0.1rem);
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;

      font-weight: 600;
      font-size: 0.28rem;
      color: #582809;
      line-height: 0.36rem;
      text-align: center;
      .lock {
        width: 0.52rem;
        height: 0.64rem;
        margin-bottom: 0.18rem;
        margin-top: 0.48rem;
      }
    }
  }
}
</style>
