/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-08 18:54:47
 * @Description:
 */

import { getProductionsAPI, payOrderAPI } from '../../api/api';
import { Indicator } from 'mint-ui';
import utils from '../../libs/utils';
import { reportEnum } from '../../libs/enum';
export default {
  namespaced: true,
  state: {
    curLang: 'zh-CN',
    productList: [],
    order_id: '',
  },
  mutations: {
    setData(state, payload) {
      state[payload.key] = payload.value;
    },
  },
  actions: {
    changeLanguage: function ({ commit }, payload) {
      commit('setData', {
        key: 'curLang',
        value: curLang,
      });
    },
    getProduction: async function ({ commit }, payload) {
      const res = await getProductionsAPI('ceh5');
      if (res.status === 1000) {
        commit('setData', {
          key: 'productList',
          value: res.data,
        });
      }
    },
    reportOrderPay: async function ({ commit }, payload) {
      const { price, unit, product_id, google_goods_id, product_key } =
        payload.same;
      let params = {
        pay_method: 'google_pay',
        product_key: product_key,
        platform: 'ANDROID',
        product_id: product_id,
        extra_ce_suan: utils.getExtraParams(product_key, payload.querystring),
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id'),
        },
      };

      const res = await payOrderAPI(params);
      if (res.status === 1000) {
        Indicator.close();
        // this.order_id = res.data.id;
        commit('setData', {
          key: 'order_id',
          value: res.data.id,
        });
      }
    },
  },
};
