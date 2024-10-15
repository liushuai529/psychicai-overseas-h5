/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 13:51:13
 * @LastEditors: wujiang
 * @LastEditTime: 2023-10-30 10:27:48
 * @Description:2024年财运
 */
import Vue from 'vue';
import Router from 'vue-router';

import index from '../pages/lucky_year_report/home/index.vue';
import detail from '../pages/lucky_year_report/detail/index.vue';
import result from '../pages/lucky_year_report/result/index.vue';
import utils from '../libs/utils';
import request from '../api/request';

Vue.use(Router);

const visitorLoginAPI = async (data, callback) => {
  if (
    localStorage.getItem('mlxz_outer_open_uid') ||
    localStorage.getItem('mlxz_outer_access_token') ||
    localStorage.getItem('mlxz_outer_visitor_id')
  ) {
    // console.log('已登录');
    callback && callback();
  }
  else {
    const res = await request('/web/login/visitor', 'POST', data);
    if (res.status !== 1000) return;
    localStorage.setItem('mlxz_outer_open_uid', res.data.open_uid);
    localStorage.setItem('mlxz_outer_access_token', res.data.access_token);
    localStorage.setItem('mlxz_outer_visitor_id', res.data.visitor_id);
    fbq('init', utils.getFbId()[utils.getFBChannel()], {'external_id': localStorage.getItem('mlxz_outer_visitor_id')|| ''});
    callback && callback();
    // console.log('首次登录');
  }
 
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      beforeEnter: (to, from, next) => {
        // 在进入路由之前，发起接口请求
        visitorLoginAPI({}, next)
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      beforeEnter: (to, from, next) => {
        // 在进入路由之前，发起接口请求
        visitorLoginAPI({}, next)
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      beforeEnter: (to, from, next) => {
        // 在进入路由之前，发起接口请求
        visitorLoginAPI({}, next)
      }
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
