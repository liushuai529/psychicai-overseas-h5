<template>
  <div :class="['animation-page', getBgImg]" v-if="show_modal">
    <canvas id="canvas_mp" :class="['daji', product_key==='consult_time'?'po-top': '']">
    </canvas>
    <img :class="['mp', product_key==='consult_time'?'mg-top': '']" :src="getMpImg" />
    <div :class="['progress-container', getBgTip, is_consult ? 'consult-color' : '']">
      <div>{{ getTipText }}</div>
      <div :class="['progress-uncheck', is_consult ? 'consult-progress-uncheck' : '']">
        <div :class="['progress-check', is_consult ? 'consult-progress-check' : '']" :style="{ width: getWidth }"></div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../libs/utils';

import { Downloader, Parser, Player } from 'svga.lite';
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
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    }
  },
  watch: {
    visible(val) {
      this.show_modal = val;
    },
  },
  created() {
    this.timer = setInterval(this.updateTime, 500);
    utils.firebaseLogEvent(log_info[this.product_key]['module'], log_info[this.product_key]['content_id'], log_info[this.product_key]['event_name'], log_info[this.product_key]['type'], {
      args_name: log_info[this.product_key]['event_name'],
      channel: utils.getFBChannel(),
    });
  },
  mounted() {
    this.loadBg(
      '#canvas_mp',
      this.getSvgUrl
    );
  },
  computed: {
    is_consult() {
      return this.product_key === 'consult_time';
    },
    getWidth() {
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
    getBgImg() {
      if (this.product_key === 'h5_emotion2024') {
        return 'emotion-bg';
      } else if (this.product_key === 'consult_time') {
        return utils.getLanguage() === 'zh-CN' ? 'consult-bg-cn' : 'consult-bg-tw'
      } else {
        return 'bzhh-bg';
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
      if (this.product_key === 'h5_emotion2024') {
        return 'emotion-tip-bg';
      } else if (this.product_key === 'consult_time') {
        return 'emotion-fate-tip-bg';
      } else {
        return 'bzhh-tip-bg';
      }
    },
    getTipText() {
      if (this.product_key === 'h5_emotion2024') {
        if (this.current_time === 1) {
          return utils.getLanguage() === 'zh-CN' ? '1.正在录入你的信息...' : '1.正在錄入你的信息...'
        } else if (this.current_time === 2) {
          return utils.getLanguage() === 'zh-CN' ? '2.正在计算你的八字...' : '2.正在計算你的八字...'
        } else if (this.current_time === 3) {
          return utils.getLanguage() === 'zh-CN' ? '3.正在分析你的运势...' : '3.正在分析你的運勢...'
        }
      } else {
        if (this.current_time === 1) {
          return utils.getLanguage() === 'zh-CN' ? '1.正在录入你的信息...' : '1.正在錄入你的信息...'
        } else if (this.current_time === 2) {
          return utils.getLanguage() === 'zh-CN' ? '2.正在计算你的八字...' : '2.正在計算你的八字...'
        } else if (this.current_time === 3) {
          return utils.getLanguage() === 'zh-CN' ? '3.正在分析你的运势...' : '3.正在分析你的運勢...'
        }
      }
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
      if (this.content >= this.max_time) {
        // 当时间大于5秒，停止计时器
        clearInterval(this.timer); // 清除计时器
        setTimeout(() => {
          this.show_modal = false;
          this.$emit('update-visible', false);
          localStorage.removeItem('mlxz_outer_animation');
        }, 2000);

      }
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
    margin-top: 2rem;
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
        width: 3rem;
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

.bzhh-bg {
  background: url('../assets/img/components/animation_page/img_bj_hehun.png') no-repeat;
  background-color: rgba(127, 20, 22, 1);
  background-size: cover
}

.emotion-bg {
  background: url('../assets/img/components/animation_page/img_bj_ganqing.png') no-repeat;
  background-color: rgba(236, 69, 106, 1);
  background-size: cover
}

.consult-bg-cn {
  background: url('../assets/img/components/animation_page/cn/img_loading_bj_cn.webp') no-repeat;
  // background-color: rgba(236, 69, 106, 1);
  background-size: cover;
  background-position: center center;
 
}

.consult-bg-tw {
  background: url('../assets/img/components/animation_page/tw/img_loading_bj_tw.webp') no-repeat;
  // background-color: rgba(236, 69, 106, 1);
  background-size: cover;
  background-position: center center;
}

.bzhh-tip-bg {
  background: url('../assets/img/components/animation_page/img_jindu_bj_hehun.png') no-repeat;
  background-size: contain;
}

.emotion-tip-bg {
  background: url('../assets/img/components/animation_page/img_jindu_bj_ganqing.png') no-repeat;
  background-size: contain;
}

.emotion-fate-tip-bg {
  background: url('../assets/img/components/animation_page/img_jindu_bj_zhengyuan.webp') no-repeat;
  background-size: contain;
}
</style>
