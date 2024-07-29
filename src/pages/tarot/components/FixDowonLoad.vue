<template>
  <div class="fix-dowon-load" v-show="show"  id="fix-dowon-load" @click="downApp" :style="{top: `${windowHeight - divHeight}px`}">
    <div class="left">
      <img src="../../../assets/img/tarot/taluo_img_mingli.webp" />
      <div class="content-container">
        <div class="title">{{ is_cn ? '下载命理寻真' : '下載命理尋真' }}</div>
        <div class="desc">{{ is_cn ? '获取更多塔罗真人咨询师解答' : '獲取更多塔羅真人咨詢師解答' }}</div>
      </div>
    </div>
    <img class="right" :src="is_cn ? cn_taluo_img_xiazai : tw_taluo_img_xiazai" />
  </div>
</template>

<script>
import utils from '../../../libs/utils';
import cn_taluo_img_xiazai from '../../../assets/img/tarot/cn/taluo_img_xiazai.webp';
import tw_taluo_img_xiazai from '../../../assets/img/tarot/tw/taluo_img_xiazai.webp';

export default {
  components: {},
  name: 'FixDowonLoad',
  props: {

    list: {
      type: Array,
      default: () => [1, 2, 3],
    },


  },
  components: {
  },

  data() {
    return {
      cn_taluo_img_xiazai,
      tw_taluo_img_xiazai,
      windowHeight: document.body.clientHeight,
      divHeight: 0,
    };
  },
  computed: {
    show() {
      return utils.isAndroid();
    },
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  watch: {
    windowHeight(val, old) {
      console.log('时时高度', val, old)
    }
  },
  mounted() { 
    window.onresize = () => {
      this.windowHeight = document.documentElement.clientHeight;
    }
    this.divHeight = document.getElementById('fix-dowon-load').offsetHeight;
  },
  methods: {
    downApp() {
      utils.openApp();
      utils.firebaseLogEvent(
        '10010',
        '-10018',
        'click_tarot_download',
        'click',
        {
          args_name: 'click_tarot_download',
          channel: utils.getFBChannel(),
        }
      );
    },
  },
};
</script>

<style scoped lang="less">
.fix-dowon-load {
  width: 7.5rem;
  height: 1.08rem;
  display: flex;
  position: fixed;
  z-index: 10;
  left: 0rem;
  // bottom: 0rem;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.24rem;
  padding-right: 0.24rem;
  background: #1E0A2D;

  .left {
    display: flex;
    flex: 5;
    align-items: center;

    img {
      width: 0.76rem;
      height: 0.76rem;
    }

    .content-container {
      margin-left: 0.2rem;

      .title {
        font-weight: 600;
        font-size: 0.3rem;
        color: #FFFFFF;
        line-height: 0.3rem;
      }

      .desc {
        font-weight: 400;
        font-size: 0.24rem;
        color: #89858B;
        line-height: 0.24rem;
        margin-top: 0.14rem;
      }
    }
  }

  .right {
    width: 1.62rem;
    height: 0.64rem;
  }
}
</style>
