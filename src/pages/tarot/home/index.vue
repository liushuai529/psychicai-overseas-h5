<template>
  <div style="background-color: #0E0512;">
    <div :class="{
      'tarot-index': true,
      'cn-bg': is_cn,
      'tw-bg': !is_cn,
      'rise_move': rise_move
    }">

      <div :class="['animation']">
        <FbShareNotice :text="is_cn ? '点击右上角…使用浏览器打开体验更流畅' : '點擊右上角…使用瀏覽器打開體驗更流暢'" />
        <img class="order-icon" @click="goToOrder" :src="is_cn ? cn_home_img_dingdan : tw_home_img_dingdan" />
        <img class="desc-icon" :src="is_cn ? cn_home_img_text : tw_home_img_text" />
        <img class="btn-icon" @click="goToRead(1)" :src="is_cn ? cn_home_btn_kaishi : tw_home_btn_kaishi" />
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
import {
  getGalleryAPI,
} from '../../../api/api';
import FbShareNotice from '../components/FbShareNotice.vue'
import cn_home_img_dingdan from '../../../assets/img/tarot/cn/home_img_dingdan.png'
import tw_home_img_dingdan from '../../../assets/img/tarot/tw/home_img_dingdan_fan.png'

import cn_home_img_text from '../../../assets/img/tarot/cn/home_img_text.webp'
import tw_home_img_text from '../../../assets/img/tarot/tw/home_img_text_fan.webp'

import cn_home_btn_kaishi from '../../../assets/img/tarot/cn/home_btn_kaishi.webp'
import tw_home_btn_kaishi from '../../../assets/img/tarot/tw/home_btn_kaishi_fan.webp'

export default {
  components: {
    FbShareNotice,
  },
  data() {
    return {
      rise_move: false,//上移开始
      timer: null,//定时器
      num: 0,//时间变量，5秒自动触发页面跳转
      cn_home_img_dingdan,
      tw_home_img_dingdan,
      cn_home_img_text,
      tw_home_img_text,
      cn_home_btn_kaishi,
      tw_home_btn_kaishi,
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
    this.getGalleryData();
    utils.firebaseLogEvent(
      '10010',
      '-10001',
      'page_view_tarotmain',
      'page_view',
      {
        args_name: 'page_view_tarotmain',
        channel: utils.getFBChannel(),
      }
    );
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
  mounted() {
    this.timer = setInterval(() => {
      this.num += 1;
      if (this.num === 5) {
        clearInterval(this.timer);
        this.num = 0;
        if(utils.isIos()) {
          this.goToRead();
        }
      }
    }, 1000);
  },
  methods: {
    async getGalleryData() {
      let res = await getGalleryAPI();
      if (res.status === 1000) {
        localStorage.setItem('gallery_data', JSON.stringify(res.data));
      }
    },
    goToRead(type) {
      this.rise_move = true;
      setTimeout(() => {
        type && utils.firebaseLogEvent(
          '10010',
          '-10002',
          'click_tarotmain_check',
          'click',
          {
            args_name: 'click_tarotmain_check',
            channel: utils.getFBChannel(),
          }
        );
        this.$router.push({
          path: 'read',
        });
      }, 1500);

    },
    goToOrder() {
      this.$router.push({
        path: 'order',
      });
    }
  },
};
</script>

<style scoped lang="less">
@keyframes rise {
  0% {
    transform: translateY(0);
  }


  100% {
    // transform: translateY(-100vh);
    transform: translateY(-15rem);
  }
}

.cn-bg {
  background-image: url('../../../assets/img/tarot/cn/bg.webp');
}

.tw-bg {
  background-image: url('../../../assets/img/tarot/tw/bg.webp');
}

.rise_move {
  // animation: rise 2s ease-in-out forwards;
  animation: rise 1.5s linear forwards;
}

.tarot-index {
  width: 7.5rem;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-size: 7.5rem 15.36rem;
  background-repeat: no-repeat;
  // padding-top: 7.4rem;
  position: relative;
  background-color: #0E0512;

  .bg {
    position: absolute;
    z-index: -1;
    background: #0E0512;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  .animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 7.5rem;

    .order-icon {
      width: 0.5rem;
      height: 1.52rem;
      display: flex;
      align-self: flex-end;
      margin-top: 4.19rem;
    }

    .desc-icon {
      width: 5.62rem;
      height: 0.64rem;
      margin-top: 3.2rem;
    }

    .btn-icon {
      width: 5.72rem;
      height: 0.94rem;
      margin-top: 0.5rem;
    }
  }


}
</style>
