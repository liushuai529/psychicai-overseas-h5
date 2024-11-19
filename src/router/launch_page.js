
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/launch_page/home/index.vue';
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
    utils.getFBChannel().indexOf('google') < 0 && fbq && fbq('init', utils.getFbId()[utils.getFBChannel()], {'external_id': localStorage.getItem('mlxz_outer_visitor_id')|| ''});
    // console.log('首次登录');
  }
  callback && callback();
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
      path: '*',
      redirect: '/',
    },
  ],
});
