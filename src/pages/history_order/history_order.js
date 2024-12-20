/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-25 14:39:07
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-22 10:43:30
 * @Description: 历史订单
 */
import Vue from 'vue';
import App from './history_order.vue';
import store from './../../store/index.js';
import FastClick from 'fastclick';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import '../../components/infinite-scroll/infinite-scroll';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
Vue.use(MintUI);

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
import CN from '../../locale/history_order/cn.js';
import TW from '../../locale/history_order/tw.js';
import util from '../../libs/utils';

let language = util.getLanguage('language');
let _enum = {
  'zh-CN': 'cn',
  'zh-TW': 'tw',
};
let _locale = _enum[language];

const i18n = new VueI18n({
  locale: _locale, // 设置地区
  messages: {
    cn: CN,
    tw: TW,
  }, // 设置地区信息
});
Vue.config.productionTip = false;
// document.body.style.backgroundColor = '#D2E7DE';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  template: '<App/>',
  components: { App },
});
