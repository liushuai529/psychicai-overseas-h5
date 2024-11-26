
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/emotion_fate13/home/index.vue';
import detail from '../pages/emotion_fate13/detail/index.vue';
import result from '../pages/emotion_fate13/result/index.vue';
import order from '../pages/emotion_fate13/order/index.vue';
import {getBaseInfoAPI} from '../api/api';
import request from '../api/request';
import utils from '../libs/utils';
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
    utils.isFBChannel() && fbq && fbq('init', utils.getFbId()[utils.getFBChannel()], {'external_id': localStorage.getItem('mlxz_outer_visitor_id')|| ''});
    // console.log('首次登录');
  }
  checkCurrentCountry(callback)
};

const validateCurrentCountry = () => {
  let currencies = [
    { iso_code: 'MY', area_code: '60', symbol: 'RM' },
    { iso_code: 'TW', area_code: '886', symbol: 'NT$' },
  ];
  const current_country = JSON.parse(localStorage.getItem('current_country'))
  if(!currencies.find(item => item.iso_code === current_country.iso_code)) {
    localStorage.setItem('current_country', JSON.stringify({ iso_code: 'MY', area_code: '60' }))
  }
}

const checkCurrentCountry = async (callback) => {
  if (localStorage.getItem('current_country')) {
    validateCurrentCountry();
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
      path: '/order',
      name: 'order',
      component: order,
      beforeEnter: (to, from, next) => {
        visitorLoginAPI({}, next)
      }
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

