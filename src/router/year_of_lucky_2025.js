import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/year_of_lucky_2025/home/index.vue';
import detail from '../pages/year_of_lucky_2025/detail/index.vue';
import result from '../pages/year_of_lucky_2025/result/index.vue';
import utils from '../libs/utils';
import request from '../api/request';

Vue.use(Router);

const visitorLoginAPI_year = async (data, callback) => {
  if (
    localStorage.getItem('mlxz_outer_open_uid') ||
    localStorage.getItem('mlxz_outer_access_token') ||
    localStorage.getItem('mlxz_outer_visitor_id')
  ) {
    callback && callback();
  }
  else {
    const res = await request('/web/login/visitor', 'POST', data);
    if (res.status !== 1000) return;
    localStorage.setItem('mlxz_outer_open_uid', res.data.open_uid);
    localStorage.setItem('mlxz_outer_access_token', res.data.access_token);
    localStorage.setItem('mlxz_outer_visitor_id', res.data.visitor_id);
    utils.getFBChannel().indexOf('google') < 0 && fbq && fbq('init', utils.getFbId()[utils.getFBChannel()], {'external_id': localStorage.getItem('mlxz_outer_visitor_id')|| ''});
    callback && callback();
  }
  checkCurrentCountry(callback);
};

const checkCurrentCountry = async (callback) => {
  if (localStorage.getItem('current_country')) {
    callback && callback();
  } else {
    callback && callback(); 
    setTimeout(async () => {
      const res = await getBaseInfoAPI();
      if (res.status !== 1000) return;
      localStorage.setItem('current_country', JSON.stringify({area_code: res.data.current_country.code, iso_code: res.data.current_country.iso_code}))
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
        // 在进入路由之前，发起接口请求
        visitorLoginAPI_year({}, next)
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      beforeEnter: (to, from, next) => {
        // 在进入路由之前，发起接口请求
        visitorLoginAPI_year({}, next)
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      beforeEnter: (to, from, next) => {
        // 在进入路由之前，发起接口请求
        visitorLoginAPI_year({}, next)
      }
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
