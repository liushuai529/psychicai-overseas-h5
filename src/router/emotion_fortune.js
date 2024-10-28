/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-22 10:10:01
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-22 15:39:14
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from './../pages/emotion_fortune/home/index.vue';
import detail from './../pages/emotion_fortune/detail/index.vue';
import result from './../pages/emotion_fortune/result/index.vue';
import utils from '../libs/utils';
import request from '../api/request';
import {getBaseInfoAPI} from '../api/api';
Vue.use(Router);

const visitorLoginAPI = async (data, callback) => {
  if (
    localStorage.getItem('mlxz_outer_open_uid') ||
    localStorage.getItem('mlxz_outer_access_token') ||
    localStorage.getItem('mlxz_outer_visitor_id')
  ) {

  }
  else {
    const res = await request('/web/login/visitor', 'POST', data);
    if (res.status !== 1000) return;
    localStorage.setItem('mlxz_outer_open_uid', res.data.open_uid);
    localStorage.setItem('mlxz_outer_access_token', res.data.access_token);
    localStorage.setItem('mlxz_outer_visitor_id', res.data.visitor_id);
    utils.getFBChannel().indexOf('google') < 0 && utils.getFBChannel().indexOf('google') < 0 && fbq && fbq('init', utils.getFbId()[utils.getFBChannel()], {'external_id': localStorage.getItem('mlxz_outer_visitor_id')|| ''});
    // console.log('首次登录');
  }
  if (utils.getEndStr(utils.getFBChannel(), 2) === '03' || utils.getEndStr(utils.getFBChannel(), 2) === '05') {
    checkCurrentCountry(callback)
  } else {
    callback()
  }
 
};

const checkCurrentCountry = async (callback) => {
  if (localStorage.getItem('current_country')) {
    callback && callback();
  } else {
    callback && callback();
    setTimeout(async () => {
      const res = await getBaseInfoAPI();
      if (res.status !== 1000) return;
      localStorage.setItem('current_country', JSON.stringify({ area_code: res.data.current_country.code, iso_code: res.data.current_country.iso_code }))
    }, 3000);
  }

};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      beforeEnter: (to, from, next) => {
        visitorLoginAPI({}, next)
       
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      beforeEnter: (to, from, next) => {
        visitorLoginAPI({}, next)
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      beforeEnter: (to, from, next) => {
        visitorLoginAPI({}, next)
      }
    },
    {
      path: '*',
      redirect: '/',
      beforeEnter: (to, from, next) => {
        visitorLoginAPI({}, next)
      }
    },
  ],
});
