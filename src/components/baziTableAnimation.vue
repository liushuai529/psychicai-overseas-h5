<template>
  <div class="table-box">
    <table :style="{
      background: bg,
      width: width,
      border: table_border,
    }" class="user-table">
      <th>
        <div  :class="[{ 'gua': true, 'not-show': true, show: status0, fadein_animation: status0 }]">
          <img src="https://psychicai-static.psychicai.pro/imgs/2404347a9915ae984267b0aab1e48afe650c.png" alt="" />
          <span>{{ sex | filter_sex }}</span>
        </div>
        <!-- <canvas
          v-show="!is_result && show_daji"
          id="canvasji"
          :class="['daji', is_career ? 'career-ji' : 'year-ji']" 
        >
        </canvas> -->
      </th>
      <tr class="name" :style="{
        borderColor: border_color,
        color: change_color ? text_color : '',
      }">
        <div :class="[{ 'not-show': true, show: status1, fadein_animation: status1 }]">
          <span>姓名：</span>
          <span>{{ username | filter_name }}</span>
        </div>
      </tr>
      <tr :style="{
        borderColor: border_color,
        color: change_color ? text_color : '',
      }" class="birth name">
        <div :class="[{ 'not-show': true, show: status2, fadein_animation: status2 }]">{{
          gongli_nongli ? picker_date_yangli : picker_date_nongli
        }}</div>
      </tr>
      <tr :style="{
        color: change_color ? text_color : '',

        borderColor: border_color,
      }" class="name c-zhu">
        <td :style="{
          borderColor: border_color,
        }">

          <div :class="[{ 'not-show': true, show: status3, fadein_animation: status3 }]">年柱</div>
        </td>
        <td :style="{
          borderColor: border_color,
        }">

          <div :class="[{ 'not-show': true, show: status3, fadein_animation: status3 }]">月柱</div>
        </td>
        <td :style="{
          borderColor: border_color,
        }">

          <div :class="[{ 'not-show': true, show: status3, fadein_animation: status3 }]">日柱</div>
        </td>
        <td :style="{
          borderColor: border_color,
        }">

          <div :class="[{ 'not-show': true, show: status3, fadein_animation: status3 }]">时柱</div>
        </td>
      </tr>
      <tr class="v-zhu">
        <td v-for="(it, k) in gan" :key="'gan' + k" :style="{
          borderColor: border_color,
        }" :class="styleColor(it)">

          <div :class="[{ 'not-show': true, show: get4Status(k), fadein_animation: get4Status(k) }]">{{ it }}</div>
        </td>
      </tr>
      <tr :style="{
        borderColor: border_color,
      }" class="v-zhu bottom-1">
        <td v-for="(it, k) in zhi" :key="'zhi' + k" :style="{
          borderColor: border_color,
        }" :class="styleColor(it)">
          <!-- <div :class="[{ fadein_animation: true }]">{{ it }}</div> -->
          <div :class="[{ 'not-show': true, show: get4Status(k), fadein_animation: get4Status(k) }]">{{ it }}</div>
        </td>
      </tr>
      <!-- 用户纳音 -->
      <tr :style="{
        borderColor: border_color,
        color: change_color ? text_color : '',
      }" class="v-nayin bottom-1">
        <td v-for="(it, k) in nayin" :style="{
          borderColor: border_color,
        }" :key="'zhi' + k">
          <div :class="[{ 'not-show': true, show: status5, fadein_animation: status5 }]">{{ it }}</div>
        </td>
      </tr>
      <tr class="v-minge">
        <td :style="{
          color: change_color ? text_color : '',

          borderColor: border_color,
        }" class="label-minge">
          <div :class="[{ 'not-show': true, show: status6, fadein_animation: status6 }]">{{ tips1 }}</div>
        </td>
        <td class="minge-text">
          <div :style="{
            borderColor: border_color,
            color: change_color ? text_color : '',
          }" class="bottom-1 minge-row">
            <div style="width: 100%;"
              :class="[, 'minge-row', { 'not-show': true, show: status7, fadein_animation: status7 }]">
              <div class="label-100">五行</div>
              <div>?</div>
            </div>

          </div>
          <div :style="{
            borderColor: border_color,
            color: change_color ? text_color : '',
          }" class="bottom-1 minge-row">


            <div style="width: 100%;"
              :class="[, 'minge-row', { 'not-show': true, show: status7, fadein_animation: status7 }]">
              <div class="label-100">{{ tips2 }}</div>
              <div>?</div>
            </div>
          </div>
          <div v-if="!is_show_taohua" class="minge-row">

            <div style="width: 100%;"
              :class="[, 'minge-row', { 'not-show': true, show: status7, fadein_animation: status7 }]">
              <div class="label-100">{{ tips3 }}</div>
              <div>?</div>
            </div>
          </div>
          <div :style="{
            borderColor: border_color,
            color: change_color ? text_color : '',
          }" v-else class="minge-row">
            <div class="label-100">{{ tips6 }}</div>
            <div>{{ getStarNum(tao_hua_num) }}</div>
          </div>
        </td>
        <td :style="{ background: minge_color }" class="geju">
          <div v-if="!ming_ge">
            <div style="width: 100%;" :class="[, 'minge-row', { 'not-show': true, show: status8, fadein_animation: status8 }]">
              <div>?</div>
              <div>?</div>
              <div>格</div>
              <div>局</div>
            </div>

          </div>
          <div v-else>
            {{ ming_ge }}
          </div>
        </td>
        <td class="minge-text">
          <div :style="{
            borderColor: border_color,
            color: change_color ? text_color : '',
          }" class="bottom-1 minge-row">
            <div style="width: 100%;" :class="[, 'minge-row', { 'not-show': true, show: status9, fadein_animation: status9 }]">
              <div class="label-100">日元</div>
              <div>{{ riyuanqiangruo ? riyuanqiangruo : '？' }}</div>
            </div>
          </div>
          <div :style="{
            borderColor: border_color,
            color: change_color ? text_color : '',
          }" class="bottom-1 minge-row">
            <div style="width: 100%;" :class="[, 'minge-row', { 'not-show': true, show: status9, fadein_animation: status9 }]">
              <div class="label-100">{{ tips4 }}</div>
              <div>{{ getStarNum(hun_yin_num) }}</div>
            </div>
          </div>

          <div v-if="!is_show_taohua" class="minge-row" :style="{
            color: change_color ? text_color : '',
          }">
            <div style="width: 100%;" :class="[, 'minge-row', { 'not-show': true, show: status9, fadein_animation: status9 }]">
              <div class="label-100">{{ tips5 }}</div>
              <div>{{ getStarNum(shi_ye_num) }}</div>
            </div>
          </div>
          <div v-else class="minge-row" :style="{
            color: change_color ? text_color : '',
          }">

            <div style="width: 100%;" :class="[, 'minge-row', { fadein_animation: true }]">
              <div class="label-100">{{ tips7 }}</div>
              <div>{{ fuqigong ? fuqigong : '？' }}</div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import utils from '../libs/utils';
import { Downloader, Parser, Player } from 'svga.lite';
const lang = utils.getLanguage();

const tipsArr1 = {
  'zh-CN': '命格特点',
  'zh-TW': '命格特點',
};
const tipsArr2 = {
  'zh-CN': '贵人星',
  'zh-TW': '貴人星',
};
const tipsArr3 = {
  'zh-CN': '财帛星',
  'zh-TW': '財帛星',
};
const tipsArr4 = {
  'zh-CN': '婚姻星',
  'zh-TW': '婚姻星',
};
const tipsArr5 = {
  'zh-CN': '事业星',
  'zh-TW': '事業星',
};

const tipArr6 = {
  'zh-CN': '桃花星',
  'zh-TW': '桃花星',
};
const tipArr7 = {
  'zh-CN': '夫妻宫',
  'zh-TW': '夫妻宮',
};
export default {
  name: 'BaziTable',
  props: {
    sex: {
      type: String | Number,
      default: '',
    },
    is_result: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      default: '',
    },
    gongli_nongli: {
      type: Number | String,
      default: 1,
    },
    picker_date_yangli: {
      type: String,
      default: '',
    },
    picker_date_nongli: {
      type: String,
      default: '',
    },
    gan: {
      type: Array,
      default: () => [],
    },
    zhi: {
      type: Array,
      default: () => [],
    },
    nayin: {
      type: Array,
      default: () => [],
    },
    cai_bo_num: {
      type: Number,
      default: 0,
    },
    gui_ren_num: {
      type: Number,
      default: 0,
    },
    hun_yin_num: {
      type: Number,
      default: 0,
    },
    ming_ge: {
      type: String,
      default: '',
    },
    riyuanqiangruo: {
      type: String,
      default: '',
    },
    shi_ye_num: {
      type: Number,
      default: 0,
    },
    wuxingqiang: {
      type: String,
      default: '',
    },
    tao_hua_num: {
      type: Number,
      default: 0,
    },
    fuqigong: {
      type: String,
      default: '',
    },
    text_color: {
      type: String,
      default: '#4D1A1A',
    },
    minge_color: {
      type: String,
      default: '#DB4539',
    },
    show_daji: {
      type: Boolean,
      default: true,
    },
    bg: {
      type: String,
      default: '#fdfaec',
    },
    width: {
      type: String,
      default: '6.5rem',
    },
    is_career: {
      type: Boolean,
      default: false,
    },
    is_show_taohua: {
      type: Number,
      default: 0,
    },
    table_border: {
      type: String,
      default: '0.02rem solid #4D1A1A',
    },
    border_color: {
      type: String,
      default: '#4D1A1A',
    },
    change_color: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      year_ji_svga:
        'https://psychicai-static.psychicai.pro/imgs/2406b49edbb8fccf436b86052299b7f9f7de.svga',
      career_ji:
        'https://psychicai-static.psychicai.pro/imgs/240657a6f19704a34c04ab580f370e148424.svga',
      tips1: tipsArr1[lang],
      tips2: tipsArr2[lang],
      tips3: tipsArr3[lang],
      tips4: tipsArr4[lang],
      tips5: tipsArr5[lang],
      tips6: tipArr6[lang],
      tips7: tipArr7[lang],
      status0: false,
      status1: false,
      status2: false,
      status3: false,
      'status4-0': false,
      'status4-1': false,
      'status4-2': false,
      'status4-3': false,
      status5: false,
      status6: false,
      status7: false,
      status8: false,
      status9: false,
    };
  },

  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 8);
    },
    filter_sex(val) {
      return +val ? '乾' : '坤';
    },
  },

  computed: {},
  watch: {
    gan(val) {
      if (val) {
        setTimeout(() => {
          this.status1 = true;
        }, 200);
        setTimeout(() => {
          this.status2 = true;
        }, 400);
        setTimeout(() => {
          this.status0 = true;
        }, 600); 
        setTimeout(() => {
          this.status3 = true;
        }, 800);
        setTimeout(() => {
          this['status4-0'] = true;
        }, 1000);
        setTimeout(() => {
          this['status4-1'] = true;
        }, 1200);
        setTimeout(() => {
          this['status4-2'] = true;
        }, 1400);
        setTimeout(() => {
          this['status4-3'] = true;
        }, 1600);
        setTimeout(() => {
          this.status5 = true;
        }, 1800);
        setTimeout(() => {
          this.status6 = true;
        }, 2000);
        setTimeout(() => {
          this.status7 = true;
        }, 2200);
        setTimeout(() => {
          this.status8 = true;
        }, 2400);
        setTimeout(() => {
          this.status9 = true;
        }, 2600);

      }
    },
  },
  mounted() {
   
  },
  methods: {
    get4Status(index) {
      switch (index) {
        case 0:
          return this['status4-0']
          break;
        case 1:
          return this['status4-1']
          break;
        case 2:
          return this['status4-2']
          break;
        case 3:
          return this['status4-3']
          break;

        default:
          break;
      }
    },
    /**
     * @description: 获取八字颜色
     * @param {*} val
     * @return {*}
     */
    styleColor(val) {
      return utils.getBaziStyleColor(val);
    },

    /**
     * @description: 展示几颗星
     * @param {*} val
     * @return {*}
     */
    getStarNum(val) {
      return this.is_result ? val + '颗' : '？';
    },

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
  },
};
</script>

<style lang="less" scoped>
@keyframes fadein {
  0% {
    display: block;
    margin-top: -0.3rem;
    opacity: 0;
  }

  100% {
    margin-top: 0rem;
    opacity: 1;
  }
}

.fadein_animation {
  animation: fadein 0.2s;
}

.not-show {
  visibility: hidden;
}

.show {
  visibility: visible;
}

.career-ji {
  width: 1rem;
  height: 1.57rem;
}

.year-ji {
  width: 1rem;
  height: 1.62rem;
}

.user-table {
  width: 6.5rem;
  min-height: 5.69rem;
  background: #fdfaec;
  border: 0.02rem solid #4D1A1A;
  margin: 0 auto 0.21rem;
  display: flex;
  flex-direction: column;
  position: relative;

  .daji {
    position: absolute;
    right: 0.1rem;
    top: -0.48rem;
  }

  .gua {
    width: 1.1rem;
    height: 1.1rem;

    font-weight: 600;
    font-size: 0.32rem;
    color: #feeb9f;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0.1rem;
    top: 0.28rem;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      animation: circle_rotate 2s linear infinite;
    }

    span {
      z-index: 2;
    }
  }

  .name {
    width: 100%;
    height: 0.68rem;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid #4D1A1A;
    font-weight: 600;
    font-size: 0.28rem;
    color: #4D2B1A;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .c-zhu {
    font-weight: 400;
    font-size: 0.28rem;
    color: #DF2113;

    td {
      width: 25%;
      height: 100%;
      border-right: 1px solid #4D1A1A;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  .c-zhu td:last-child {
    border-right: none;
  }

  .v-zhu {
    width: 100%;
    height: 0.57rem;
    font-weight: 600;
    font-size: 0.32rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    td {
      width: 25%;
      height: 100%;
      border-right: 1px solid #4D1A1A;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  .v-zhu td:last-child {
    border-right: none;
  }

  .v-nayin {
    width: 100%;
    height: 0.71rem;
    font-weight: 600;
    font-size: 0.28rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #4D2B1A;

    td {
      width: 25%;
      height: 100%;
      border-right: 1px solid #4D1A1A;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  .v-nayin td:last-child {
    border-right: none;
  }

  .v-minge {
    width: 100%;
    height: 1.83rem;
    font-weight: 400;
    font-size: 0.28rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start !important;

    .label-minge {
      width: 25%;
      color: #DF2113;
      height: 100%;
      border-right: 1px solid #4D1A1A;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .minge-text {
      width: 34%;
      height: 100%;
      color: #4D2B1A;

      .minge-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 33.33%;
        justify-content: space-around;
      }
    }

    .geju {
      width: 7%;
      height: 100%;
      background: #4D1A1A;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}

.label-100 {
  width: 1rem;
  text-align: left;
}

.bottom-1 {
  border-bottom: 1px solid #4D1A1A;
}

@keyframes circle_rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fanzhuan {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}
</style>
