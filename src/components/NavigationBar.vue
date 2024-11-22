<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-07 21:00:52
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-31 16:33:59
 * @Description: 
-->
<style>
.psychicai-navbar-banner .van-tabs--line .van-tabs__wrap {
  height: 0.76rem;
}
.psychicai-navbar-banner .van-tabs__nav--line.van-tabs__nav--complete {
  padding: 0;
}
.psychicai-navbar-banner .van-tabs__line {
  bottom: 0;
  width: 1.12rem;
  background-color: #e3453d;
  border-radius: 0;
}
.psychicai-navbar-banner .van-tab--active {
  color: #e3453d !important;
}
.psychicai-navbar-banner .van-nav-bar__text {
  color: #314a46;
  font-size: 0.26rem;
}
.psychicai-navbar-banner .van-tab {
  color: #818484;
}

.psychicai-navbar-header {
  margin: 0;
  width: 100%;
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.24rem;
  background-color: #fff;
}
.psychicai-navbar-header div {
  display: flex;
  align-items: center;
}
.left-home > img,
.right-order > img {
  width: 0.3rem;
  height: 0.3rem;
}
.left-home span,
.right-order span {
  padding-left: 0.1rem;
}
.psychicai-navbar-header span {
  color: #314a46;
  font-size: 0.26rem;
  line-height: 0.26rem;
  text-align: center;
  height: 0.26rem;
  margin-top: 0.02rem;
}
.psychicai-navbar-header .title > span {
  font-size: 0.36rem;
}

.psychicai-navbar-banner .van-tabs__line {
  height: 2px;
}
.bar-box {
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.bold-text {
  font-weight: 700;
}
.divider-line {
  width: 7.5rem;
  height: 0.06rem;
}
.logo-name {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}
</style>
<template>
  <div class="bar-box">
    <div class="psychicai-navbar-header" style="position: relative">
      <div
        class="left-home"
        @click="goRoute('/index', 'h5_home')"
        style="vertical-align: middle"
      >
        <img
          src="../../src/assets/img/navtation_bar_icon/h5_icon_home.webp"
          alt=""
        />
        <span style="display: block" class="bold-text">{{ tips1 }}</span>
      </div>
      <div class="title logo-name">
        <span
          :style="{
            height: '0.36rem',
            'line-height': '0.36rem',
            'font-size': '0.36rem',
          }"
          class="bold-text"
          >{{ tips2 }}</span
        >
      </div>
      <div
        class="right-order"
        style="vertical-align: middle"
        @click="goRoute('/history_order', 'h5_order')"
      >
        <img
          src="../../src/assets/img/navtation_bar_icon/h5_icon_dingdan.webp"
          alt=""
        />
        <span class="bold-text">{{ tips3 }}</span>
      </div>
    </div>
    <img
      src="../assets/img/navtation_bar_icon/daohang_img_jianbian.webp"
      class="divider-line"
      alt=""
    />
    <nav class="psychicai-navbar-banner">
      <van-tabs v-model="activeKey" @change="skipPage">
        <van-tab
          v-for="item in tabList"
          :title="item.value"
          :name="item.key"
          :key="item.key"
        />
      </van-tabs>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { url_enums, reportName, tabEventEnums } from '../../src/libs/enum';
import utils from '../../src/libs/utils';

const tipsArr1 = {
  'zh-CN': '首页',
  'zh-TW': '首頁',
};
const tipsArr2 = {
  'zh-CN': '命理寻真',
  'zh-TW': '命理尋真',
};
const tipsArr3 = {
  'zh-CN': '我的订单',
  'zh-TW': '我的訂單',
};
export default {
  props: {
    callback: Function,
  },

  data() {
    return {
      activeKey: '',
      pathname: '',
      origin: '',
      tabList: [],
      channel: utils.getFBChannel(),
      tips1: tipsArr1[utils.getLanguage()],
      tips2: tipsArr2[utils.getLanguage()],
      tips3: tipsArr3[utils.getLanguage()],
    };
  },

  created() {
    this.dataInit();
    for (let key in url_enums) {
      if (this.pathname.includes(url_enums[key])) {
        this.activeKeySync(key);
        return false;
      }
    }
  },
  methods: {
    activeKeySync(key) {
      this.activeKey = key;
    },
    dataInit() {
      //待处理语言
      const { pathname, origin } = location;
      this.pathname = pathname.split('/').pop();
      this.origin = origin;
      let languageLower = utils.getLanguage().toLowerCase();
      let language = languageLower.includes('tw') ? 'tw' : 'cn';
      const list = [];
      for (const key in reportName) {
        list.push({ key, value: reportName[key][language] });
      }
      this.tabList = list;
    },
    async skipPage() {
      await utils.asleep(500);
      const { c_id, e_name } = tabEventEnums[this.activeKey];
      this.sendEventFbq();
      utils.firebaseLogEvent('10007', c_id, e_name, 'click', {
        args_name: e_name,
        channel: utils.getFBChannel(),
      });
      const url = `${this.origin}/${this.channel}/${
        url_enums[this.activeKey]
      }.html`;
      location.href = url;
    },
    goRoute(routeName, key) {
      const { c_id, e_name } = tabEventEnums[key];
      this.sendEventFbq();
      utils.firebaseLogEvent('10007', c_id, e_name, 'click', {
        args_name: e_name,
        channel: utils.getFBChannel(),
      });
      const url = `${this.origin}/${this.channel}${routeName}.html`;
      location.href = url;
    },
    async sendEventFbq() {
      if (utils.isProd()) {
        
        try {
          utils.isFBChannel() && fbq && fbq('track', 'CompleteRegistration');
        } catch (err) {
          console.error('CompleteRegistration  error message:', err);
        }
      }
    },
  },
};
</script>
