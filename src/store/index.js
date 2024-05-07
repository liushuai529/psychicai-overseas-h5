/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang
 * @LastEditTime: 2024-01-13 16:14:18
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import state from './state.js';
import mutations from './mutations.js';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: false,
  state,
  mutations,
  modules: {
    common,
  },
});
