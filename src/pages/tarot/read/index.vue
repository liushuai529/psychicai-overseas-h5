<template>
  <div :class="{
    'tarot-read': true,
  
  }">
    <!-- <div class="pai-container">
      <img class="img1" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img2" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img3" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img4" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img5" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img6" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img7" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img8" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img9" src="../../../assets/img/tarot/paimian.webp"/>
      <img class="img10" src="../../../assets/img/tarot/paimian.webp"/>
    </div> -->

    <div class="box">
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
        <img  src="../../../assets/img/tarot/paimian.webp" alt=""/>
    </div>

  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
let channel = utils.getQueryStr('channel');

export default {
  components: {

  },
  data() {
    return {

    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {

  },
  created() {

  },
  beforeDestroy() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="less">
// .cn-bg {
//   background-image: url('../../../assets/img/tarot/cn/bg.webp');
// }

// .tw-bg {
//   background-image: url('../../../assets/img/tarot/tw/bg.webp');
// }
body{
            overflow: hidden;
        }
        .box{
            width: 310px;
            height: 441px;

            margin:100px auto;
            position: relative;
            
        }

    .box img{
        position: absolute;
        left:0;
        top:0;
        transition:all 1s;

        /* 设置变换中心*/
        transform-origin: center bottom;
        box-shadow: 2px 2px 3px 0px #333;

    }

        .box:hover img:nth-child(6){
            transform:rotate(-10deg);
        }

        .box:hover img:nth-child(5){
            transform:rotate(-20deg);
        }

        .box:hover img:nth-child(4){
            transform:rotate(-30deg);
        }
        .box:hover img:nth-child(3){
            transform:rotate(-40deg);
        }
        .box:hover img:nth-child(2){
            transform:rotate(-50deg);
        }
        .box:hover img:nth-child(1){
            transform:rotate(-60deg);
        }

        .box:hover img:nth-child(8){
            transform:rotate(10deg);
        }

        .box:hover img:nth-child(9){
            transform:rotate(20deg);
        }

        .box:hover img:nth-child(10){
            transform:rotate(30deg);
        }
        .box:hover img:nth-child(11){
            transform:rotate(40deg);
        }
        .box:hover img:nth-child(12){
            transform:rotate(50deg);
        }
        .box:hover img:nth-child(13){
            transform:rotate(60deg);
        }


.tarot-read { 
  width: 7.5rem;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-size: 7.5rem 15.36rem;
  background-repeat: no-repeat;
  // padding-top: 7.4rem;
  position: relative;
  background: #0F031A;
  .pai-container {
    margin-top: 2rem;
    width: 100%;
    height: 5rem;
    border: 1px solid red;
    position: relative;
    .img1 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 0rem;
      transform: rotate(-52.5deg); animation-delay: 0.65s;
      transform-origin: 50% 100%;
    }
    .img2 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 0.3rem;
      transform: rotate(-47.5deg);animation-delay: 0.7s;
      transform-origin: 50% 100%;
    }
    .img3 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 0.6rem;
      transform: rotate(-42.5deg); animation-delay: 0.75s;
      transform-origin: 50% 100%;
    }
    .img4 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 0.9rem;
      transform: rotate(-37.5deg); animation-delay: 0.85s;
      transform-origin: 50% 100%;

    }
    .img5 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.2rem;
      transform: rotate(-32.5deg); animation-delay: 0.9s;
      transform-origin: 50% 100%;
    }

    .img6 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.5rem;
      transform: rotate(-27.5deg); animation-delay: 0.95s;
      transform-origin: 50% 100%;
    }
    .img7 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.8rem;
      transform: rotate(-22.5deg); animation-delay: 1s;
      transform-origin: 50% 100%;
    }
    .img8 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 2.1rem;
      transform: rotate(-17.5deg); animation-delay: 1.1s;
      transform-origin: 50% 100%;
    }
    .img9 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 2.4rem;
      transform: rotate(-12.5deg); animation-delay: 1.2s;
      transform-origin: 50% 100%;
    }
    .img10 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 2.7rem;
      transform: rotate(-7.5deg); animation-delay: 1.3s;
      transform-origin: 50% 100%;
    }
    .img11 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1rem;
    }
    .img12 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.1rem;
    }
    .img13 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.2rem;
    }
    .img14{
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.3rem;
    }
    .img15 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.4rem;
    }
    .img16 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.5rem;
    }
    .img17 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.6rem;
    }
    .img18{
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.7rem;
    }
    .img19 {
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.8rem;
    }
    .img20{
      width: 1.44rem;
      height: 2.46rem;
      position: absolute;
      top: 0rem;
      right: 1.9rem;
    }

  }
}
</style>
