/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-07 21:03:37
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-22 15:39:36
 * @Description:
 */
import Vue from 'vue';
import App from './emotion_voice.vue';
import router from '../../router/emotion_voice.js';
import store from '../../store/index.js';
import FastClick from 'fastclick';
import VueResource from 'vue-resource';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueI18n from 'vue-i18n';
import { Dialog, ActionSheet } from 'vant';
import 'vant/lib/index.css';
Vue.use(Dialog);
Vue.use(ActionSheet);
Vue.use(VueI18n);
Vue.use(MintUI);
Vue.use(VueResource);
FastClick.prototype.focus = function (targetElement) {
  var length;
  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  if (
    targetElement.setSelectionRange &&
    targetElement.type.indexOf('date') !== 0 &&
    targetElement.type !== 'time' &&
    targetElement.type !== 'month'
  ) {
    length = targetElement.value.length;
    // 修复不弹出键盘，令其强制弹出键盘
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      FastClick.attach(document.body);
    },
    false
  );
}

import CN from '../../locale/emotion_fate/cn.js';
import TW from '../../locale/emotion_fate/tw.js';
import util from '../../libs/utils.js';

let _language = util.getLanguage();
let _enum = {
  'zh-CN': 'cn',
  'zh-TW': 'tw',
};
let _locale = _enum[_language];

const i18n = new VueI18n({
  locale: _locale, // 设置地区
  messages: {
    cn: CN,
    tw: TW,
  }, // 设置地区信息
});

document.body.style.backgroundColor = '#FFDAF5';
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
});
