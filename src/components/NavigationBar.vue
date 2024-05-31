<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-07 21:00:52
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-31 12:38:58
 * @Description: 
-->
<style coped>
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
}
.psychicai-navbar-banner .van-tab--active {
  color: #e3453d;
}
.psychicai-navbar-banner .van-nav-bar__text {
  color: #314a46;
  font-size: 0.26rem;
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
  line-height: 0.3rem;
  text-align: center;
  height: 0.3rem;
}
.psychicai-navbar-header .title > span {
  font-size: 0.36rem;
}
.bar-box {
  width: 100%;
  background: #fff;
}
</style>
<template>
  <div class="bar-box">
    <div class="psychicai-navbar-header">
      <div
        class="left-home"
        @click="goRoute('/index', 'h5_home')"
        style="vertical-align: middle"
      >
        <img
          src="../../src/assets/img/navtation_bar_icon/h5_icon_home.png"
          alt=""
        />
        <span style="display: block">首页</span>
      </div>
      <div class="title">
        <span>命理寻真</span>
      </div>
      <div
        class="right-order"
        style="vertical-align: middle"
        @click="goRoute('/history_order', 'h5_order')"
      >
        <img
          src="../../src/assets/img/navtation_bar_icon/h5_icon_dingdan.png"
          alt=""
        />
        <span>我的订单</span>
      </div>
    </div>
    <nav class="psychicai-navbar-banner">
      <van-tabs v-model="activeKey" @change="skipPage()">
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
    };
  },

  created() {
    this.dataInit();
    for (let key in url_enums) {
      if (this.pathname.includes(url_enums[key])) {
        console.log(key);
        this.activeKeySync(key);
        return false;
      }
    }
  },
  methods: {
    activeKeySync(key) {
      console.log(key);
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
    skipPage() {
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
        await utils.checkFB();
        try {
          fbq('track', 'CompleteRegistration');
        } catch (err) {
          console.error('CompleteRegistration  error message:', err);
        }
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
