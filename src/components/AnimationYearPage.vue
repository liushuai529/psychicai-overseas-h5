<template>
  <div :class="['animation-page', is_cn ? 'cn-bg' : 'tw-bg']" v-if="show_modal">

    <UserInfoAnimation :username="username" :sex="sex" :gongli_nongli="gongli_nongli"
      :picker_date_yangli="picker_date_yangli" :picker_date_nongli="picker_date_nongli" :gan="gan" :zhi="zhi"
      :nayin="nayin" :is_result="false" :score="[10, 30, 40, 35, 30, 60, 70, 68, 60, 78, 85, 100]" />
    <div :class="['progress-container', getBgTip, is_consult ? 'consult-color' : '']">
      <div>{{ getTipText }}</div>
      <div :class="['progress-uncheck', is_consult ? 'consult-progress-uncheck' : '']">
        <!-- <div :class="['progress-check', is_consult ? 'consult-progress-check' : '']" :style="{ width: getWidth }"></div> -->
        <div
          :class="['progress-check', is_consult ? 'consult-progress-check' : '', type1Status ? 'slow_animation1' : '', type2Status ? 'slow_animation2' : '', type3Status ? 'fast_animation' : '']"
          style="width: 100%;" :style="{ width: type3Status ? '100%' : 0 }"></div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../libs/utils';

import { Downloader, Parser, Player } from 'svga.lite';
import UserInfoAnimation from '../pages/year_of_lucky_2025/detail/user_info_animation.vue';
import bg_bzhh from '../assets/img/components/animation_page/img_bj_hehun.png';
import bg_emotion from '../assets/img/components/animation_page/img_bj_ganqing.png';
import cn_bg_emotion_fate from '../assets/img/components/animation_page/cn/img_loading_bj_cn.webp';
import tw_bg_emotion_fate from '../assets/img/components/animation_page/tw/img_loading_bj_tw.webp';
import cn_bzhh_mp from '../assets/img/components/animation_page/bzhh_mp.png';
import cn_emotion_mp from '../assets/img/components/animation_page/emotion_mp.png';
import tw_bzhh_mp from '../assets/img/components/animation_page/bzhh_mp.png';
import tw_emotion_mp from '../assets/img/components/animation_page/emotion_mp.png';
import cn_emotion_fate_mp from '../assets/img/components/animation_page/emotion_fate_mp.webp';
import tw_emotion_fate_mp from '../assets/img/components/animation_page/emotion_fate_mp.webp';

const log_info = {
  h5_emotion2024: { module: 10006, 'content_id': -10034, 'event_name': 'page_view_giflove', type: 'page_view' }, // 2024年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10036, 'event_name': 'page_view_gifmarriage', type: 'page_view' }, //合婚
  consult_time: { module: 10011, 'content_id': -10003, 'event_name': 'page_view_giflove', type: 'page_view' }, //正缘报告
}


export default {
  name: 'AnimationPage',
  components: {
    UserInfoAnimation,

  },
  data() {
    return {
      show_modal: true,
      timer: null,
      content: 0,
      max_time: 10,//最大时长5秒，500毫秒执行一次。
      current_time: 1,//当前阶段
      bzhh_svga:
        'https://psychicai-static.psychicai.pro/imgs/24069960be53a74c43b38ef1d79903e63d13.svga',
      emotion_svga:
        'https://psychicai-static.psychicai.pro/imgs/2406c6f666683c824312b07e66feb0c73ad2.svga',
      emotion_fate_svga:
        'https://psychicai-static.psychicai.pro/imgs/24084481306c796346a5ac7aafae1d5c50bf.svga',
      bg_bzhh,
      bg_emotion,
      cn_bzhh_mp,
      cn_emotion_mp,
      tw_bzhh_mp,
      tw_emotion_mp,
      cn_bg_emotion_fate,
      tw_bg_emotion_fate,
      cn_emotion_fate_mp,
      tw_emotion_fate_mp,
      type1Status: false,
      type2Status: false,
      type3Status: false,
    }
  },
  // :username="username" :sex="sex" :gongli_nongli="gongli_nongli"
  //         :picker_date_yangli="picker_date_yangli" :picker_date_nongli="picker_date_nongli" :gan="gan" :zhi="zhi"
  //         :nayin="nayin" :is_result="false" :score="[10, 30, 40, 35, 30, 60, 70, 68, 60, 78, 85, 100]"
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    },
    username: {
      type: String,
    },
    sex: {
      type: Number,
    },
    gongli_nongli: {
      type: Number,
    },
    picker_date_yangli: {
      type: String,
    },
    picker_date_nongli: {
      type: String,
    },
    gan: {
      type: Array,
    },
    zhi: {
      type: Array,
    },
    nayin: {
      type: Array,
    },
    is_result: {
      type: Boolean,
    },
    score: {
      type: Array,
    },

  },
  watch: {
    visible(val) {
      this.show_modal = val;
    },
    type3Status(val) {
      // if(val) {
      //   this.
      // }
    },
    gan(val) {
      if (val) {

      }
    }
  },
  created() {
    //延迟1秒执行底部滚动条动画
    setTimeout(() => {
      this.type1Status = true;
    }, 1000);
    //执行第二遍滚动条动画
    setTimeout(() => {
      this.type1Status = false;
      this.type2Status = true;
    }, 2000);
    //执行第三遍滚动条动画
    setTimeout(() => {
      this.type2Status = false;
      this.type3Status = true;
    }, 3000);

    // setTimeout(() => {
    //   this.show_modal = false;
    //   this.$emit('update-visible', false);
    //   localStorage.removeItem('mlxz_outer_animation');
    // }, 6000);
    // this.timer = setInterval(this.updateTime, 100);
    // utils.firebaseLogEvent(log_info[this.product_key]['module'], log_info[this.product_key]['content_id'], log_info[this.product_key]['event_name'], log_info[this.product_key]['type'], {
    //   args_name: log_info[this.product_key]['event_name'],
    //   channel: utils.getFBChannel(),
    // });
  },
  mounted() {
    // this.loadBg(
    //   '#canvas_mp',
    //   this.getSvgUrl
    // );
  },
  computed: {
    is_consult() {
      return this.product_key === 'consult_time';
    },
    getWidth() {
      console.log('this.conten', 6.3 * (this.content / 10))
      return `${6.3 * (this.content / 10)}rem`
    },
    getSvgUrl() {
      if (this.product_key === 'h5_emotion2024') {
        return this.emotion_svga
      } else if (this.product_key === 'consult_time') {
        return this.emotion_fate_svga
      } else {
        return this.bzhh_svga;
      }
    },


    getMpImg() {
      if (this.product_key === 'h5_emotion2024') {
        return utils.getLanguage() === 'zh-CN' ? cn_emotion_mp : tw_emotion_mp
      } else if (this.product_key === 'consult_time') {
        return utils.getLanguage() === 'zh-CN' ? cn_emotion_fate_mp : tw_emotion_fate_mp
      } else {
        return utils.getLanguage() === 'zh-CN' ? cn_bzhh_mp : tw_bzhh_mp
      }
    },
    getBgTip() {
      return 'tip-bg';
    },
    getTipText() {
      if (this.type1Status) {
        return utils.getLanguage() === 'zh-CN' ? '1.正在录入你的信息...' : '1.正在錄入你的信息...'
      } else if (type2Status) {
        return utils.getLanguage() === 'zh-CN' ? '2.正在计算你的八字...' : '2.正在計算你的八字...'
      } else if (type3Status) {
        return utils.getLanguage() === 'zh-CN' ? '3.正在分析你的运势...' : '3.正在分析你的運勢...'
      }
    },
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  methods: {
    /**
     * @description: 加载svga动画
     * @param {*} dom 元素dom
     * @param {*} url svga地址
     * @param {*} is_loop 是否循环
     * @return {*}
     */
    loadBg(dom, url, is_loop = true) {
      const downloader = new Downloader();
      // 默认调用 WebWorker 线程解析
      // 可配置 new Parser({ disableWorker: true }) 禁止
      const parser = new Parser();
      // #canvas 是 HTMLCanvasElement
      const player = new Player(dom);
      (async () => {
        const fileData = await downloader.get(url);
        const svgaData = await parser.do(fileData);
        player.set({ loop: is_loop });
        await player.mount(svgaData);
        // 开始播放动画
        player.start();
      })();
    },
    updateTime() {
      this.content = this.content + 1; // 
      if (this.content > 10) {
        setTimeout(() => {
          this.content = 0
        }, 150);
      }

      // if (this.content >= this.max_time) {
      //   // 当时间大于5秒，停止计时器
      //   clearInterval(this.timer); // 清除计时器
      //   setTimeout(() => {
      //     this.show_modal = false;
      //     this.$emit('update-visible', false);
      //     localStorage.removeItem('mlxz_outer_animation');
      //   }, 2000);

      // }
      if (this.content > 1 && this.content <= 3) {
        this.current_time = 1
      } else if (this.content > 3 && this.content <= 6) {
        this.current_time = 2
      } else if (this.content > 7 && this.content <= 10) {
        this.current_time = 3
      }
    },
  }
}
</script>

<style scoped lang="less">
.animation-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;



  .daji {
    position: absolute;
    left: 0.68rem;
    top: 2rem;
    width: 6.1rem;
    height: 6.1rem
  }

  .mp {
    margin-top: 2rem;
    width: 6.1rem;
    height: 6.1rem;
  }

  .mg-top {
    margin-top: 2.5rem;
  }

  .po-top {
    top: 2.5rem;
  }

  .progress-container {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    margin-top: 0.5rem;
    width: 6.9rem;
    height: 1.46rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 0.3rem;
    color: #FFE14A;

    .progress-uncheck {
      position: relative;
      margin-top: 0.2rem;
      width: 6.3rem;
      height: 0.16rem;
      background: rgba(250, 209, 128, 0.2);
      border-radius: 0.08rem;

      .progress-check {
        transition: width 0.5s ease-in-out;
        /* 过渡效果应用于宽度变化 */
        position: absolute;
        top: 0;
        left: 0;
        // width: 3rem;
        height: 0.16rem;
        background: #FAD180;
        border-radius: 0.08rem;
        opacity: 1;
      }

      .consult-progress-check {
        background: linear-gradient(90deg, #DD8BC4 0%, #B85391 100%);
      }
    }

    .consult-progress-uncheck {
      background: rgba(184, 83, 145, 0.1);
    }

  }

  .consult-color {
    color: #B85391;
  }
}


.cn-bg {
  background: url('../assets/img/year_of_lucky_2025/cn/mig_img_topbj_cn_1x.webp') no-repeat;
  // background: #B5291E;
  background-size: 100% 100%;
  width: 7.5rem;
  // height: 12rem;
}

.tw-bg {
  background: url('../assets/img/year_of_lucky_2025/tw/mig_img_topbj_tw_1x.webp') no-repeat;
  // background: #B5291E;
  background-size: 100% 100%;
  width: 7.5rem;
  // height: 12rem;
}




.tip-bg {
  // background: url('../assets/img/components/animation_page/img_jindu_bj_hehun.png') no-repeat;
  // background-size: contain;
  background: linear-gradient(90deg, rgba(251, 134, 37, 0) 0%, rgba(251, 134, 37, 0.4) 50%, rgba(251, 134, 37, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  border: 0.02rem solid;
  border-image: linear-gradient(90deg, rgba(255, 214, 185, 0), rgba(255, 214, 185, 0.6), rgba(255, 214, 185, 0)) 2 2;
}


@keyframes scroll1 {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

@keyframes scroll2 {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

@keyframes scroll3 {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

.slow_animation1 {
  animation: scroll1 1s;
}

.slow_animation2 {
  animation: scroll2 1s;
}

.fast_animation {
  animation: scroll3 3s;
}
</style>
