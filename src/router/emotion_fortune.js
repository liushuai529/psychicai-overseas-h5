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
Vue.use(Router);

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
        if (utils.getEndStr(utils.getFBChannel(), 2) === '03') {
          checkCurrentCountry(next)
        } else {
          next()
        }
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      beforeEnter: (to, from, next) => {
        if (utils.getEndStr(utils.getFBChannel(), 2) === '03') {
          checkCurrentCountry(next)
        } else {
          next()
        }
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      beforeEnter: (to, from, next) => {
        if (utils.getEndStr(utils.getFBChannel(), 2) === '03') {
          checkCurrentCountry(next)
        } else {
          next()
        }
      }
    },
    {
      path: '*',
      redirect: '/',
      beforeEnter: (to, from, next) => {
        if (utils.getEndStr(utils.getFBChannel(), 2) === '03') {
          checkCurrentCountry(next)
        } else {
          next()
        }
      }
    },
  ],
});
