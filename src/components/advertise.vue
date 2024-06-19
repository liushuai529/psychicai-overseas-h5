<!--
    /**
    *
    * 底部广告栏组件
    * 必填参数
    * @param  imgSrc  String  图片地址 必填参数
    * @param  text    String  文案    必填参数
    * @param  buttonText String  按钮文案  必填参数 
    * @param  wechatSrc  String  微信内部链接  必填参数
    * @param  outsideSrc String  微信外部链接  必填参数
    * @param  order  Number   订单号   必填参数
    * 非必填参数
    * @param  background  String  背景   非必填参数
    * @param  position    String  位置   非必填参数

-->
<template>
  <div class="container">
    <div class="contento" @click="to_url" data-clipboard-target="#fooo">
      <img :src="imgSrc" alt="" />
      <p v-html="text"></p>
      <span class="button"
        ><i :style="{ background: bg, backgroundSize: '100% 100%' }"></i
        ><span>{{ buttonText }}</span></span
      >
    </div>
    <input type="text" class="copyInput" id="fooo" value="renshengruqi05" />
    <div class="tip" ref="tip">
      <div>微信号已复制到粘贴板</div>
    </div>
  </div>
</template>
<script>
import wechat_bg from '../assets/img/wechat@3x.webp';
import Clipboard from 'clipboard'; //引入复制插件
export default {
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    wechatSrc: {
      type: String,
      required: true,
    },
    outsideSrc: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  computed: {
    bg() {
      return 'url(' + wechat_bg + ') no-repeat center center';
    },
  },
  methods: {
    is_weixn() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    to_url() {
      this.$refs.tip.style.display = 'block';
      setTimeout(() => {
        this.$refs.tip.style.display = 'none';
        if (this.is_weixn()) {
          window.location.href = this.wechatSrc;
        } else {
          window.location.href = this.outsideSrc;
        }
      }, 1000);
    },
  },
  created() {
    var clipboard = new Clipboard('.contento');
    clipboard.on('success', function (e) {
      e.clearSelection();
    });

    clipboard.on('error', function (e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  },
};
</script>
<style scoped>
.container {
  height: 1.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  bottom: 0;
  font-size: 0.3rem;
  padding: 0.2rem;
  width: 7.5rem;
  padding-top: 0.25rem;
}
.contento {
  position: relative;
}
.contento img {
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.contento p {
  width: 55%;
  display: inline-block;
  font-size: 0.28rem;
  color: white;
  vertical-align: middle;
}
.contento .button {
  display: inline-block;
  width: 2rem;
  height: 0.6rem;
  background-color: #2ad074;
  border-radius: 0.4rem;
  color: white;
  vertical-align: middle;
  /* line-height: 0.5rem; */
  padding-top: 0.05rem;
  margin-left: 0.2rem;
  padding-left: 0.1rem;
  position: absolute;
  right: 0;
  top: calc(50% - 0.3rem);
}
.contento .button i {
  width: 0.4rem;
  height: 0.3rem;
  display: inline-block;
  background-size: 100% 100%;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  vertical-align: middle;
}
.contento .button span {
  font-size: 0.25rem;
  line-height: 0.3rem;
  text-align: center;
  vertical-align: middle;
}
.copyInput {
  opacity: 0;
  position: absolute;
  z-index: -999999;
  /* width:1px;
      height:1px; */
}
.tip {
  position: fixed;
  top: 0;
  font-size: 0.3rem;
  height: 100%;
  width: 100%;
  z-index: 999999999;
  display: none;
}
.tip div {
  margin: 0 auto;
  max-width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  color: white;
  text-align: center;
  padding: 0.2rem 0;
  top: 40%;
  position: relative;
}
</style>
