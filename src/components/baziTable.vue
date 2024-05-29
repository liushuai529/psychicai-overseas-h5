<template>
  <div class="table-box">
    <table
      :style="{
        background: bg,
        width: width,
        border: table_border,
      }"
      class="user-table"
    >
      <div class="gua">
        <img
          src="https://psychicai-static.psychicai.pro/imgs/2404347a9915ae984267b0aab1e48afe650c.png"
          alt=""
        />
        <span>{{ sex | filter_sex }}</span>
      </div>
      <canvas
        v-show="!is_result && show_daji"
        id="canvasji"
        :class="['daji', is_career ? 'career-ji' : 'year-ji']"
      >
      </canvas>

      <tr
        class="name"
        :style="{
          borderColor: border_color,
          color: change_color ? text_color : '',
        }"
      >
        <span>姓名：</span>
        <span>{{ username | filter_name }}</span>
      </tr>
      <tr
        :style="{
          borderColor: border_color,
          color: change_color ? text_color : '',
        }"
        class="birth name"
      >
        {{
          gongli_nongli ? picker_date_yangli : picker_date_nongli
        }}
      </tr>
      <tr
        :style="{
          color: change_color ? text_color : '',

          borderColor: border_color,
        }"
        class="name c-zhu"
      >
        <td
          :style="{
            borderColor: border_color,
          }"
        >
          年柱
        </td>
        <td
          :style="{
            borderColor: border_color,
          }"
        >
          月柱
        </td>
        <td
          :style="{
            borderColor: border_color,
          }"
        >
          日柱
        </td>
        <td
          :style="{
            borderColor: border_color,
          }"
        >
          时柱
        </td>
      </tr>
      <tr class="v-zhu">
        <td
          v-for="(it, k) in gan"
          :key="'gan' + k"
          :style="{
            borderColor: border_color,
          }"
          :class="styleColor(it)"
        >
          {{ it }}
        </td>
      </tr>
      <tr
        :style="{
          borderColor: border_color,
        }"
        class="v-zhu bottom-1"
      >
        <td
          v-for="(it, k) in zhi"
          :key="'zhi' + k"
          :style="{
            borderColor: border_color,
          }"
          :class="styleColor(it)"
        >
          {{ it }}
        </td>
      </tr>
      <!-- 用户纳音 -->
      <tr
        :style="{
          borderColor: border_color,
          color: change_color ? text_color : '',
        }"
        class="v-nayin bottom-1"
      >
        <td
          v-for="(it, k) in nayin"
          :style="{
            borderColor: border_color,
          }"
          :key="'zhi' + k"
        >
          {{ it }}
        </td>
      </tr>
      <tr class="v-minge">
        <td
          :style="{
            color: change_color ? text_color : '',

            borderColor: border_color,
          }"
          class="label-minge"
        >
          {{ tips1 }}
        </td>
        <td class="minge-text">
          <div
            :style="{
              borderColor: border_color,
              color: change_color ? text_color : '',
            }"
            class="bottom-1 minge-row"
          >
            <div class="label-100">五行</div>
            <div>{{ wuxingqiang ? wuxingqiang + ' 强' : '？' }}</div>
          </div>
          <div
            :style="{
              borderColor: border_color,
              color: change_color ? text_color : '',
            }"
            class="bottom-1 minge-row"
          >
            <div class="label-100">{{ tips2 }}</div>
            <div>{{ getStarNum(gui_ren_num) }}</div>
          </div>
          <div v-if="!is_show_taohua" class="minge-row">
            <div class="label-100">{{ tips3 }}</div>
            <div>{{ getStarNum(cai_bo_num) }}</div>
          </div>
          <div
            :style="{
              borderColor: border_color,
              color: change_color ? text_color : '',
            }"
            v-else
            class="minge-row"
          >
            <div class="label-100">{{ tips6 }}</div>
            <div>{{ getStarNum(tao_hua_num) }}</div>
          </div>
        </td>
        <td :style="{ background: minge_color }" class="geju">
          <div v-if="!ming_ge">
            <div>?</div>
            <div>?</div>
            <div>格</div>
            <div>局</div>
          </div>
          <div v-else>
            {{ ming_ge }}
          </div>
        </td>
        <td class="minge-text">
          <div
            :style="{
              borderColor: border_color,
              color: change_color ? text_color : '',
            }"
            class="bottom-1 minge-row"
          >
            <div class="label-100">日元</div>
            <div>{{ riyuanqiangruo ? riyuanqiangruo : '？' }}</div>
          </div>
          <div
            :style="{
              borderColor: border_color,
              color: change_color ? text_color : '',
            }"
            class="bottom-1 minge-row"
          >
            <div class="label-100">{{ tips4 }}</div>
            <div>{{ getStarNum(hun_yin_num) }}</div>
          </div>

          <div
            v-if="!is_show_taohua"
            class="minge-row"
            :style="{
              color: change_color ? text_color : '',
            }"
          >
            <div class="label-100">{{ tips5 }}</div>
            <div>{{ getStarNum(shi_ye_num) }}</div>
          </div>
          <div
            v-else
            class="minge-row"
            :style="{
              color: change_color ? text_color : '',
            }"
          >
            <div class="label-100">{{ tips7 }}</div>
            <div>{{ fuqigong ? fuqigong : '？' }}</div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import utils from '../libs/utils';
import year_ji_svga from '../assets/img/mlxz/svga/year24/detail_ji.svga';
import career_ji from '../assets/img/mlxz/svga/career24/career_ji.svga';
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
      default: '#cb6735',
    },
    minge_color: {
      type: String,
      default: '#cb6735',
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
      default: '0.02rem solid #cb6735',
    },
    border_color: {
      type: String,
      default: '#cb6735',
    },
    change_color: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      year_ji_svga,
      career_ji,
      tips1: tipsArr1[lang],
      tips2: tipsArr2[lang],
      tips3: tipsArr3[lang],
      tips4: tipsArr4[lang],
      tips5: tipsArr5[lang],
      tips6: tipArr6[lang],
      tips7: tipArr7[lang],
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
  mounted() {
    this.loadBg(
      '#canvasji',
      this.is_career ? this.career_ji : this.year_ji_svga
    );
  },
  methods: {
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
  border: 0.02rem solid #cb6735;
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
    border-bottom: 1px solid #cb6735;
    font-weight: 600;
    font-size: 0.28rem;
    color: #444;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .c-zhu {
    font-weight: 400;
    font-size: 0.28rem;
    color: #cb6735;
    td {
      width: 25%;
      height: 100%;
      border-right: 1px solid #cb6735;
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
      border-right: 1px solid #cb6735;
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
    td {
      width: 25%;
      height: 100%;
      border-right: 1px solid #cb6735;
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
      color: #cb6735;
      height: 100%;
      border-right: 1px solid #cb6735;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .minge-text {
      width: 34%;
      height: 100%;
      .minge-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 33.33%;
        justify-content: space-around;
      }
    }
    .geju {
      width: 7%;
      height: 100%;
      background: #cb6735;
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
  border-bottom: 1px solid #cb6735;
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
