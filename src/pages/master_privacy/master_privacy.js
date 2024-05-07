/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-04 10:06:24
 * @LastEditors: wujiang
 * @LastEditTime: 2024-02-27 10:28:09
 * @Description:
 */
import Vue from 'vue';
import App from './master_privacy.vue';
import store from '../../store/index.js';
import FastClick from 'fastclick';

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

Vue.config.productionTip = false;
document.body.style.backgroundColor = '#fff';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
