/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:33:50
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-16 11:01:43
 * @Description: 24年年运
 */
import Vue from 'vue';
import App from './year_of_lucky_2024.vue';
import router from '../../router/year_of_lucky_2024';
import store from '../../store/index.js';
import FastClick from 'fastclick';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
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
      setTimeout(scrollTo, 0, 0, 0);
    },
    false
  );
}
import CN from '../../locale/year_of_lucky_2024/cn.js';
import TW from '../../locale/year_of_lucky_2024/tw.js';
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
document.body.style.backgroundColor = '#FFAA41';
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
});
